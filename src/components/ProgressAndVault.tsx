import React, { useState } from 'react';
import type { User } from 'firebase/auth';
import {
  CloudUpload,
  FileDown,
  FileText,
  GitBranch,
  Lock,
  LogOut,
  Play,
  RefreshCw,
  Shield,
  Trash2,
  UserCheck,
} from 'lucide-react';
import type { EncryptedBackupDoc, LocalPracticeSession, ProgressSummaryDoc } from '../types';
import type { Translations } from '../i18n/translations';
import {
  decryptJsonWithPassphrase,
  encryptJsonWithPassphrase,
} from '../lib/cryptoVault';
import {
  loginAnonymously,
  loginWithGoogle,
  loginWithUsername,
  logoutFirebase,
  registerWithUsername,
  uploadEncryptedBackupToFirestore,
  validatePasswordInput,
  validateUsernameInput,
} from '../lib/firebase';
import {
  exportSessionsToJson,
  exportSessionsToMarkdown,
  exportSessionsToPdf,
} from '../lib/pdfExport';

interface ProgressAndVaultProps {
  t: Translations;
  user: User | null;
  alias: string;
  sessions: LocalPracticeSession[];
  cloudBackups: EncryptedBackupDoc[];
  cloudSummaries: ProgressSummaryDoc[];
  onDeleteSession: (id: string) => Promise<void>;
  onRestoreSessions: (restored: LocalPracticeSession[]) => Promise<void>;
}

export const ProgressAndVault: React.FC<ProgressAndVaultProps> = ({
  t,
  user,
  alias,
  sessions,
  cloudBackups,
  cloudSummaries,
  onDeleteSession,
  onRestoreSessions,
}) => {
  // Auth state
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Encrypted Cloud Backup
  const [backupPassphrase, setBackupPassphrase] = useState('');
  const [backupLabel, setBackupLabel] = useState(`Respaldo-${new Date().toISOString().slice(0, 10)}`);
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');

  // GitHub Gist / Repo Export Sync
  const [githubToken, setGithubToken] = useState('');
  const [githubSyncMsg, setGithubSyncMsg] = useState('');
  const [githubSyncing, setGithubSyncing] = useState(false);

  // Audio playback for saved sessions
  const [playingId, setPlayingId] = useState<string | null>(null);

  const avgMetrics = (() => {
    const scored = sessions.filter((s) => s.evaluation);
    if (scored.length === 0 && cloudSummaries.length > 0) {
      const n = cloudSummaries.length;
      return {
        count: n,
        fluency: Math.round(cloudSummaries.reduce((a, b) => a + b.fluencyScore, 0) / n),
        precision: Math.round(cloudSummaries.reduce((a, b) => a + b.precisionScore, 0) / n),
        intonation: Math.round(cloudSummaries.reduce((a, b) => a + b.intonationScore, 0) / n),
        wpm: Math.round(cloudSummaries.reduce((a, b) => a + b.wpm, 0) / n),
      };
    }
    if (scored.length === 0) {
      return { count: sessions.length, fluency: 0, precision: 0, intonation: 0, wpm: 0 };
    }
    const n = scored.length;
    return {
      count: sessions.length,
      fluency: Math.round(scored.reduce((a, b) => a + (b.evaluation?.fluencyScore || 0), 0) / n),
      precision: Math.round(scored.reduce((a, b) => a + (b.evaluation?.precisionScore || 0), 0) / n),
      intonation: Math.round(scored.reduce((a, b) => a + (b.evaluation?.intonationScore || 0), 0) / n),
      wpm: Math.round(scored.reduce((a, b) => a + (b.evaluation?.estimatedWpm || 0), 0) / n),
    };
  })();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const uErr = validateUsernameInput(username);
    if (uErr) {
      setAuthError(uErr);
      return;
    }
    const pErr = validatePasswordInput(password);
    if (pErr) {
      setAuthError(pErr);
      return;
    }

    setAuthLoading(true);
    try {
      if (authMode === 'register') {
        await registerWithUsername(username, password);
      } else {
        await loginWithUsername(username, password);
      }
      setPassword('');
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('operation-not-allowed')) {
        setAuthError(
          'Habilita el proveedor "Email/Password" en Firebase Console > Authentication > Sign-in method para activar cuentas de usuario sin correo personal.'
        );
      } else {
        setAuthError(msg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAnonymousAuth = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await loginAnonymously();
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('operation-not-allowed') || msg.includes('admin-restricted-operation')) {
        setAuthError(
          'Habilita el proveedor "Anonymous" en Firebase Console > Authentication > Sign-in method para el acceso anónimo instantáneo.'
        );
      } else {
        setAuthError(msg);
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError('');
    setAuthLoading(true);
    try {
      await loginWithGoogle();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleUploadEncryptedBackup = async () => {
    if (!user) return;
    if (backupPassphrase.length < 8) {
      setBackupStatus('La clave maestra de cifrado debe tener al menos 8 caracteres.');
      return;
    }
    setBackupBusy(true);
    setBackupStatus('');
    try {
      // Strip raw audio blobs if oversized to fit well inside 700KB Firestore document limit
      const compactSessions = sessions.map((s) => ({
        ...s,
        userAudioBase64: s.userAudioBase64 && s.userAudioBase64.length < 180000 ? s.userAudioBase64 : undefined,
        sourceAudioBase64: undefined,
      }));
      const enc = await encryptJsonWithPassphrase(compactSessions, backupPassphrase);
      await uploadEncryptedBackupToFirestore({
        userId: user.uid,
        backupId: `bk-${Date.now()}`,
        label: backupLabel.trim() || 'Respaldo',
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        salt: enc.salt,
        sessionCount: compactSessions.length,
        byteSize: enc.byteSize,
      });
      setBackupStatus('Copia cifrada AES-GCM-256 subida a Firestore correctamente.');
    } catch (err) {
      setBackupStatus(err instanceof Error ? err.message : 'Error al subir copia cifrada.');
    } finally {
      setBackupBusy(false);
    }
  };

  const handleRestoreBackup = async (bk: EncryptedBackupDoc) => {
    if (backupPassphrase.length < 8) {
      setBackupStatus('Introduce la clave maestra de cifrado usada para crear esta copia.');
      return;
    }
    setBackupBusy(true);
    setBackupStatus('');
    try {
      const decrypted = await decryptJsonWithPassphrase<LocalPracticeSession[]>(
        { ciphertext: bk.ciphertext, iv: bk.iv, salt: bk.salt },
        backupPassphrase
      );
      await onRestoreSessions(decrypted);
      setBackupStatus(`Restauradas ${decrypted.length} sesiones en tu bóveda local cifrada.`);
    } catch {
      setBackupStatus('Clave maestra incorrecta o copia dañada.');
    } finally {
      setBackupBusy(false);
    }
  };

  const handlePushGitHubGist = async () => {
    if (!githubToken.trim()) {
      setGithubSyncMsg('Introduce un GitHub Personal Access Token (scope: gist) o usa la exportación JSON.');
      return;
    }
    setGithubSyncing(true);
    setGithubSyncMsg('');
    try {
      const payload = sessions.map(({ userAudioBase64: _u, sourceAudioBase64: _s, ...rest }) => rest);
      const res = await fetch('https://api.github.com/gists', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${githubToken.trim()}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: `Cabina Practice Sessions Export (${new Date().toISOString()})`,
          public: false,
          files: {
            'cabina-sessions.json': {
              content: JSON.stringify(payload, null, 2),
            },
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'GitHub API error');
      setGithubSyncMsg(`Sincronizado en GitHub Gist privado: ${data.html_url}`);
      setGithubToken('');
    } catch (err) {
      setGithubSyncMsg(err instanceof Error ? err.message : 'Error al conectar con GitHub.');
    } finally {
      setGithubSyncing(false);
    }
  };

  const playSavedAudio = (session: LocalPracticeSession) => {
    if (!session.userAudioBase64) return;
    const audio = new Audio(
      `data:${session.userAudioMimeType || 'audio/webm'};base64,${session.userAudioBase64}`
    );
    setPlayingId(session.id);
    audio.onended = () => setPlayingId(null);
    void audio.play();
  };

  return (
    <section id="progress" className="space-y-8 scroll-mt-20">
      {/* Header + Export Actions */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            {t.progressTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.progressSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => exportSessionsToPdf(sessions, alias)}
            disabled={sessions.length === 0}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors disabled:opacity-45 min-h-[44px]"
          >
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span>{t.exportPdfBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => exportSessionsToJson(sessions)}
            disabled={sessions.length === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-45 min-h-[44px]"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>{t.exportJsonBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => exportSessionsToMarkdown(sessions, alias)}
            disabled={sessions.length === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-45 min-h-[44px]"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>{t.exportMarkdownBtn}</span>
          </button>
        </div>
      </div>

      {/* Quantitative Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">Sesiones cifradas</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
            {avgMetrics.count}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.fluencyLabel} media</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-1">
            {avgMetrics.fluency}%
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.precisionLabel} media</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {avgMetrics.precision}%
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.intonationLabel} media</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1">
            {avgMetrics.intonation}%
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">Velocidad media</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
            {avgMetrics.wpm} <span className="text-xs font-normal text-slate-400">PPM</span>
          </div>
        </div>
      </div>

      {/* Local Encrypted Vault Sessions */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-500" aria-hidden="true" />
            <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {t.vaultTitle}
            </h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">{t.vaultSubtitle}</span>
        </div>

        {sessions.length === 0 ? (
          <div className="py-10 text-center space-y-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {t.emptyHistoryTitle}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {t.emptyHistoryDesc}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800">
            {sessions.map((s) => (
              <div
                key={s.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono">{s.mode}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">
                      {s.sourceLang.toUpperCase()} → {s.targetLang.toUpperCase()}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{s.durationSec}s</span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(s.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                    {s.exerciseTitle}
                  </div>
                  {s.evaluation && (
                    <div className="text-xs font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
                      Fluidez {s.evaluation.fluencyScore}% · Precisión {s.evaluation.precisionScore}% ·
                      Entonación {s.evaluation.intonationScore}% · {s.evaluation.estimatedWpm} PPM
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {s.userAudioBase64 && (
                    <button
                      type="button"
                      onClick={() => playSavedAudio(s)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[40px]"
                    >
                      <Play className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{playingId === s.id ? 'Reproduciendo...' : 'Escuchar'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void onDeleteSession(s.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                    aria-label="Eliminar sesión"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Auth + Encrypted Cloud Backup + GitHub & Vercel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Privacy-First Firebase Auth & Cloud Backup */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-sky-500" aria-hidden="true" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.authTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.authSubtitle}
            </p>
          </div>

          {!user ? (
            <div className="space-y-4">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 w-fit">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.registerBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    authMode === 'login'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {t.loginBtn}
                </button>
              </div>

              <form onSubmit={(e) => void handleAuthSubmit(e)} className="space-y-3">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t.usernameLabel}
                  autoComplete="username"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordLabel}
                  autoComplete={authMode === 'register' ? 'new-password' : 'current-password'}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
                />
                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors disabled:opacity-50 min-h-[44px]"
                >
                  {authMode === 'register' ? t.registerBtn : t.loginBtn}
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => void handleAnonymousAuth()}
                  disabled={authLoading}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                >
                  {t.anonymousBtn}
                </button>
                <button
                  type="button"
                  onClick={() => void handleGoogleAuth()}
                  disabled={authLoading}
                  className="rounded-lg border border-slate-300 dark:border-slate-700 px-3 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                >
                  {t.googleFallbackBtn}
                </button>
              </div>

              {authError && (
                <p className="text-xs text-amber-600 dark:text-amber-400 leading-relaxed">
                  {authError}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] px-4 py-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                      {alias}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {user.isAnonymous ? 'Sesión anónima cifrada' : 'Cuenta privada sin email'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => void logoutFirebase()}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-500 px-2.5 py-2 min-h-[40px]"
                >
                  <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.signOutBtn}</span>
                </button>
              </div>

              {/* Encrypted Firestore Cloud Backup */}
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {t.cloudBackupTitle}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={backupLabel}
                    onChange={(e) => setBackupLabel(e.target.value)}
                    placeholder="Etiqueta de respaldo"
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
                  />
                  <input
                    type="password"
                    value={backupPassphrase}
                    onChange={(e) => setBackupPassphrase(e.target.value)}
                    placeholder={t.backupPassphraseLabel}
                    className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void handleUploadEncryptedBackup()}
                  disabled={backupBusy || sessions.length === 0}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors disabled:opacity-45 min-h-[42px]"
                >
                  <CloudUpload className="w-4 h-4" aria-hidden="true" />
                  <span>{t.createEncryptedBackup}</span>
                </button>

                {backupStatus && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">{backupStatus}</p>
                )}

                {cloudBackups.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Copias cifradas en tiempo real (Firestore):
                    </div>
                    {cloudBackups.map((bk) => (
                      <div
                        key={bk.id}
                        className="flex items-center justify-between gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-slate-900 dark:text-slate-100 truncate">
                            {bk.label}
                          </div>
                          <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                            {bk.sessionCount} sesiones · AES-GCM-256
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => void handleRestoreBackup(bk)}
                          disabled={backupBusy}
                          className="inline-flex items-center gap-1 rounded-md border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 min-h-[36px]"
                        >
                          <RefreshCw className="w-3 h-3" aria-hidden="true" />
                          <span>{t.restoreEncryptedBackup}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* GitHub & Vercel Deployment & Sync Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.githubVercelTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.githubVercelSubtitle}
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3.5 space-y-1.5 font-mono">
              <div>1. git push origin main (.github/workflows/ci-deploy.yml)</div>
              <div>2. vercel --prod (vercel.json + api/gemini/[action].ts)</div>
              <div>3. Env var en Vercel: GEMINI_API_KEY</div>
            </div>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Exportación automática a GitHub Gist privado (opcional, token de un solo uso):
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value)}
                placeholder="GitHub Personal Access Token (gist)"
                className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
              <button
                type="button"
                onClick={() => void handlePushGitHubGist()}
                disabled={githubSyncing || sessions.length === 0}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-45 whitespace-nowrap min-h-[42px]"
              >
                <GitBranch className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{githubSyncing ? 'Sincronizando...' : 'Sincronizar en GitHub'}</span>
              </button>
            </div>
            {githubSyncMsg && (
              <p className="text-xs text-sky-600 dark:text-sky-400 break-all">{githubSyncMsg}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
