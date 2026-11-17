import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDocFromServer,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
  limit,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import type {
  EncryptedBackupDoc,
  ProgressSummaryDoc,
  SpeechLang,
  ThemePreference,
  UiLang,
  UserProfileDoc,
} from '../types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export async function testConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Firebase connection offline or misconfigured.');
    }
    return false;
  }
}

void testConnection();

// Blueprint-synchronized input validators (verbatim from firebase-blueprint.json)
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,24}$/;
const ID_PATTERN = /^[a-zA-Z0-9_-]+$/;
const ALIAS_PATTERN = /^[a-zA-Z0-9_\- ]+$/;

export function validateUsernameInput(username: string): string | null {
  const clean = username.trim();
  if (!USERNAME_PATTERN.test(clean)) {
    return 'El usuario debe tener entre 3 y 24 caracteres alfanuméricos, guiones o guiones bajos.';
  }
  return null;
}

export function validatePasswordInput(password: string): string | null {
  if (password.length < 8 || password.length > 128) {
    return 'La contraseña debe tener entre 8 y 128 caracteres.';
  }
  return null;
}

function usernameToSyntheticEmail(username: string): string {
  return `u_${username.trim().toLowerCase()}@cabina.local`;
}

export async function registerWithUsername(username: string, password: string): Promise<User> {
  const uErr = validateUsernameInput(username);
  if (uErr) throw new Error(uErr);
  const pErr = validatePasswordInput(password);
  if (pErr) throw new Error(pErr);

  const syntheticEmail = usernameToSyntheticEmail(username);
  const cred = await createUserWithEmailAndPassword(auth, syntheticEmail, password);
  await ensureUserProfile(cred.user, username.trim());
  return cred.user;
}

export async function loginWithUsername(username: string, password: string): Promise<User> {
  const uErr = validateUsernameInput(username);
  if (uErr) throw new Error(uErr);
  const pErr = validatePasswordInput(password);
  if (pErr) throw new Error(pErr);

  const syntheticEmail = usernameToSyntheticEmail(username);
  const cred = await signInWithEmailAndPassword(auth, syntheticEmail, password);
  await ensureUserProfile(cred.user, username.trim());
  return cred.user;
}

export async function loginAnonymously(): Promise<User> {
  const cred = await signInAnonymously(auth);
  await ensureUserProfile(cred.user, `Anon-${cred.user.uid.slice(0, 6)}`);
  return cred.user;
}

export async function loginWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider();
  const cred = await signInWithPopup(auth, provider);
  await ensureUserProfile(cred.user, `Cabina-${cred.user.uid.slice(0, 6)}`);
  return cred.user;
}

export async function logoutFirebase(): Promise<void> {
  await signOut(auth);
}

export async function ensureUserProfile(user: User, preferredAlias?: string): Promise<void> {
  const path = `users/${user.uid}`;
  const ref = doc(db, 'users', user.uid);
  const safeAliasRaw = (preferredAlias || `User-${user.uid.slice(0, 6)}`)
    .replace(/[^a-zA-Z0-9_\- ]/g, '')
    .trim()
    .slice(0, 32);
  const alias = safeAliasRaw.length >= 2 && ALIAS_PATTERN.test(safeAliasRaw) ? safeAliasRaw : 'Interpreter';

  try {
    const snap = await getDocFromServer(ref).catch(() => null);
    if (!snap || !snap.exists()) {
      const payload: UserProfileDoc = {
        ownerId: user.uid,
        alias,
        preferredUiLang: 'es',
        preferredTheme: 'dark',
        defaultSourceLang: 'en',
        defaultTargetLang: 'es',
        cloudSyncEnabled: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };
      await setDoc(ref, payload);
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function updateUserPreferences(
  userId: string,
  updates: Partial<{
    alias: string;
    preferredUiLang: UiLang;
    preferredTheme: ThemePreference;
    defaultSourceLang: SpeechLang;
    defaultTargetLang: SpeechLang;
    cloudSyncEnabled: boolean;
  }>
): Promise<void> {
  const path = `users/${userId}`;
  const ref = doc(db, 'users', userId);
  try {
    await setDoc(
      ref,
      {
        ...updates,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function uploadEncryptedBackupToFirestore(params: {
  userId: string;
  backupId: string;
  label: string;
  ciphertext: string;
  iv: string;
  salt: string;
  sessionCount: number;
  byteSize: number;
}): Promise<void> {
  if (!ID_PATTERN.test(params.backupId) || params.backupId.length > 128) {
    throw new Error('Invalid backup identifier.');
  }
  if (params.ciphertext.length > 700000) {
    throw new Error('Encrypted backup exceeds 700KB Firestore document ceiling.');
  }

  const path = `users/${params.userId}/backups/${params.backupId}`;
  try {
    const docRef = doc(db, 'users', params.userId, 'backups', params.backupId);
    const payload: EncryptedBackupDoc = {
      ownerId: params.userId,
      label: params.label.slice(0, 64) || 'Backup',
      algorithm: 'AES-GCM-256',
      ciphertext: params.ciphertext,
      iv: params.iv.slice(0, 64),
      salt: params.salt.slice(0, 64),
      sessionCount: Math.max(0, Math.min(50000, Math.round(params.sessionCount))),
      byteSize: Math.max(0, Math.min(1000000, Math.round(params.byteSize))),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(docRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function syncProgressSummaryToFirestore(params: {
  userId: string;
  summaryId: string;
  exerciseId: string;
  mode: 'simultaneous' | 'consecutive';
  sourceLang: SpeechLang;
  targetLang: SpeechLang;
  fluencyScore: number;
  precisionScore: number;
  intonationScore: number;
  wpm: number;
  durationSec: number;
}): Promise<void> {
  const safeId = params.summaryId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 128);
  const safeExerciseId = params.exerciseId.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) || 'custom';
  const path = `users/${params.userId}/progressSummaries/${safeId}`;
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, Math.round(n)));

  try {
    await ensureUserProfile(auth.currentUser!);
    const ref = doc(db, 'users', params.userId, 'progressSummaries', safeId);
    const payload: ProgressSummaryDoc = {
      ownerId: params.userId,
      exerciseId: safeExerciseId,
      mode: params.mode,
      sourceLang: params.sourceLang.slice(0, 16) as SpeechLang,
      targetLang: params.targetLang.slice(0, 16) as SpeechLang,
      fluencyScore: clamp(params.fluencyScore, 0, 100),
      precisionScore: clamp(params.precisionScore, 0, 100),
      intonationScore: clamp(params.intonationScore, 0, 100),
      wpm: clamp(params.wpm, 0, 400),
      durationSec: clamp(params.durationSec, 0, 7200),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    await setDoc(ref, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeToEncryptedBackups(
  userId: string,
  onData: (items: EncryptedBackupDoc[]) => void
): () => void {
  const path = `users/${userId}/backups`;
  const q = query(
    collection(db, 'users', userId, 'backups'),
    where('ownerId', '==', userId),
    limit(20)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const rows: EncryptedBackupDoc[] = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as EncryptedBackupDoc),
        }))
        .sort((a, b) => (b.id || '').localeCompare(a.id || ''));
      onData(rows);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeToProgressSummaries(
  userId: string,
  onData: (items: ProgressSummaryDoc[]) => void
): () => void {
  const path = `users/${userId}/progressSummaries`;
  const q = query(
    collection(db, 'users', userId, 'progressSummaries'),
    where('ownerId', '==', userId),
    limit(50)
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const rows: ProgressSummaryDoc[] = snapshot.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as ProgressSummaryDoc),
        }))
        .sort((a, b) => (b.id || '').localeCompare(a.id || ''));
      onData(rows);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}
