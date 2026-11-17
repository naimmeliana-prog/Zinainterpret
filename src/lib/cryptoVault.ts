import type { LocalPracticeSession } from '../types';

const DB_NAME = 'cabina_vault_v1';
const STORE_NAME = 'encrypted_sessions';
const DEVICE_KEY_STORAGE = 'cabina_device_vault_secret_v1';

interface EncryptedEnvelope {
  id: string;
  createdAt: string;
  algorithm: 'AES-GCM-256';
  iv: string;
  salt: string;
  ciphertext: string;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function getOrCreateDeviceSecret(): string {
  let existing = localStorage.getItem(DEVICE_KEY_STORAGE);
  if (!existing) {
    const random = crypto.getRandomValues(new Uint8Array(32));
    existing = bytesToBase64(random);
    localStorage.setItem(DEVICE_KEY_STORAGE, existing);
  }
  return existing;
}

async function deriveAesKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    { name: 'PBKDF2' },
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as BufferSource,
      iterations: 120000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptJsonWithPassphrase(
  data: unknown,
  passphrase: string
): Promise<{ ciphertext: string; iv: string; salt: string; byteSize: number }> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAesKey(passphrase, salt);
  const encoded = new TextEncoder().encode(JSON.stringify(data));
  const encryptedBuf = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    encoded
  );
  const ciphertext = bytesToBase64(new Uint8Array(encryptedBuf));
  return {
    ciphertext,
    iv: bytesToBase64(iv),
    salt: bytesToBase64(salt),
    byteSize: ciphertext.length,
  };
}

export async function decryptJsonWithPassphrase<T>(
  payload: { ciphertext: string; iv: string; salt: string },
  passphrase: string
): Promise<T> {
  const salt = base64ToBytes(payload.salt);
  const iv = base64ToBytes(payload.iv);
  const ciphertext = base64ToBytes(payload.ciphertext);
  const key = await deriveAesKey(passphrase, salt);
  const decryptedBuf = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as BufferSource },
    key,
    ciphertext as BufferSource
  );
  const jsonStr = new TextDecoder().decode(decryptedBuf);
  return JSON.parse(jsonStr) as T;
}

function openVaultDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveEncryptedLocalSession(session: LocalPracticeSession): Promise<void> {
  const secret = getOrCreateDeviceSecret();
  const encrypted = await encryptJsonWithPassphrase(session, secret);
  const envelope: EncryptedEnvelope = {
    id: session.id,
    createdAt: session.createdAt,
    algorithm: 'AES-GCM-256',
    iv: encrypted.iv,
    salt: encrypted.salt,
    ciphertext: encrypted.ciphertext,
  };

  const db = await openVaultDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(envelope);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function loadAllLocalSessions(): Promise<LocalPracticeSession[]> {
  const secret = getOrCreateDeviceSecret();
  const db = await openVaultDb();
  const envelopes = await new Promise<EncryptedEnvelope[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).getAll();
    req.onsuccess = () => resolve((req.result || []) as EncryptedEnvelope[]);
    req.onerror = () => reject(req.error);
  });

  const sessions: LocalPracticeSession[] = [];
  for (const env of envelopes) {
    try {
      const decrypted = await decryptJsonWithPassphrase<LocalPracticeSession>(env, secret);
      sessions.push(decrypted);
    } catch {
      // Skip records created under a wiped device key
    }
  }
  return sessions.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function deleteLocalSession(id: string): Promise<void> {
  const db = await openVaultDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
