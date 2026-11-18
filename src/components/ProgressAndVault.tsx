import React, { useRef, useState } from 'react';
import {
  Download,
  FileDown,
  FileText,
  GitBranch,
  Lock,
  Play,
  Shield,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';
import type { EncryptedPortableBackup, LocalPracticeSession } from '../types';
import type { Translations } from '../i18n/translations';
import {
  decryptJsonWithPassphrase,
  encryptJsonWithPassphrase,
} from '../lib/cryptoVault';
import {
  exportSessionsToJson,
  exportSessionsToMarkdown,
  exportSessionsToPdf,
} from '../lib/pdfExport';

interface ProgressAndVaultProps {
  t: Translations;
  alias: string;
  onAliasChange: (nextAlias: string) => void;
  sessions: LocalPracticeSession[];
  onDeleteSession: (id: string) => Promise<void>;
  onRestoreSessions: (restored: LocalPracticeSession[]) => Promise<void>;
}

function validateAliasInput(raw: string): string | null {
  const clean = raw.trim();
  if (!clean) return 'Introduce un alias entre 3 y 24 caracteres (letras, números, _ o -).';
  if (!/^[a-zA-Z0-9_-]{3,24}$/.test(clean)) {
    return 'Solo se permiten entre 3 y 24 caracteres alfanuméricos, guiones o guiones bajos.';
  }
  return null;
}

export const ProgressAndVault: React.FC<ProgressAndVaultProps> = ({
  t,
  alias,
  onAliasChange,
  sessions,
  onDeleteSession,
  onRestoreSessions,
}) => {
  // Local private alias state (100% on-device, zero external auth)
  const [aliasInput, setAliasInput] = useState(alias.startsWith('Anon-') ? '' : alias);
  const [aliasError, setAliasError] = useState('');
  const [aliasSaved, setAliasSaved] = useState('');

  // Encrypted Portable Backup (.enc.json via AES-GCM-256)
  const [backupPassphrase, setBackupPassphrase] = useState('');
  const [backupLabel, setBackupLabel] = useState(`Respaldo-${new Date().toISOString().slice(0, 10)}`);
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // GitHub Gist / Repo Export Sync
  const [githubToken, setGithubToken] = useState('');
  const [githubSyncMsg, setGithubSyncMsg] = useState('');
  const [githubSyncing, setGithubSyncing] = useState(false);

  // Audio playback for saved sessions
  const [playingId, setPlayingId] = useState<string | null>(null);

  const avgMetrics = (() => {
    const scored = sessions.filter((s) => s.evaluation);
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

  const handleSaveAlias = (e: React.FormEvent) => {
    e.preventDefault();
    setAliasError('');
    setAliasSaved('');
    const err = validateAliasInput(aliasInput);
    if (err) {
      setAliasError(err);
      return;
    }
    const clean = aliasInput.trim();
    onAliasChange(clean);
    setAliasSaved(`Alias local activo: ${clean}`);
  };

  const handleResetAnonymous = () => {
    setAliasError('');
    const anonAlias = `Anon-${Math.random().toString(36).slice(2, 8)}`;
    setAliasInput('');
    onAliasChange(anonAlias);
    setAliasSaved(`Sesión anónima local activada (${anonAlias}).`);
  };

  const handleDownloadEncryptedBackup = async () => {
    if (backupPassphrase.length < 8) {
      setBackupStatus('La clave maestra de cifrado debe tener al menos 8 caracteres.');
      return;
    }
    setBackupBusy(true);
    setBackupStatus('');
    try {
      const compactSessions = sessions.map((s) => ({
        ...s,
        sourceAudioBase64: undefined,
      }));
      const enc = await encryptJsonWithPassphrase(compactSessions, backupPassphrase);
      const bundle: EncryptedPortableBackup = {
        label: backupLabel.trim() || 'Respaldo-Cabina',
        algorithm: 'AES-GCM-256',
        exportedAt: new Date().toISOString(),
        ciphertext: enc.ciphertext,
        iv: enc.iv,
        salt: enc.salt,
        sessionCount: compactSessions.length,
        byteSize: enc.byteSize,
      };
      const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${bundle.label.replace(/[^a-zA-Z0-9_-]/g, '_')}.cabina.enc.json`;
      a.click();
      URL.revokeObjectURL(url);
      setBackupStatus(
        `Copia cifrada AES-GCM-256 descargada (${compactSessions.length} sesiones).`
      );
    } catch (err) {
      setBackupStatus(err instanceof Error ? err.message : 'Error al generar copia cifrada.');
    } finally {
      setBackupBusy(false);
    }
  };

  const handleImportEncryptedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (backupPassphrase.length < 8) {
      setBackupStatus('Introduce primero la clave maestra usada para cifrar el archivo.');
      return;
    }
    setBackupBusy(true);
    setBackupStatus('');
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as EncryptedPortableBackup;
      if (!parsed.ciphertext || !parsed.iv || !parsed.salt) {
        throw new Error('Formato de archivo cifrado no válido.');
      }
      const decrypted = await decryptJsonWithPassphrase<LocalPracticeSession[]>(
        { ciphertext: parsed.ciphertext, iv: parsed.iv, salt: parsed.salt },
        backupPassphrase
      );
      await onRestoreSessions(decrypted);
      setBackupStatus(`Restauradas ${decrypted.length} sesiones en tu bóveda local cifrada.`);
    } catch {
      setBackupStatus('Clave maestra incorrecta o archivo cifrado dañado.');
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

      {/* Local Private Profile + Portable Encrypted Backup & GitHub/Vercel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Local Alias & Portable AES-GCM-256 Backup */}
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

          <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] px-4 py-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <UserCheck className="w-4 h-4 text-emerald-500 shrink-0" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {alias}
                </div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  {alias.startsWith('Anon-') ? 'Sesión anónima en dispositivo' : 'Perfil local sin datos personales'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetAnonymous}
              className="text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-sky-500 px-2.5 py-2 min-h-[38px] whitespace-nowrap shrink-0"
            >
              {t.anonymousBtn}
            </button>
          </div>

          <form onSubmit={handleSaveAlias} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={aliasInput}
              onChange={(e) => setAliasInput(e.target.value)}
              placeholder={t.usernameLabel}
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] px-3.5 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 min-h-[42px]"
            />
            <button
              type="submit"
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
            >
              {t.loginBtn}
            </button>
          </form>

          {aliasError && (
            <p className="text-xs text-amber-600 dark:text-amber-400">{aliasError}</p>
          )}
          {aliasSaved && (
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{aliasSaved}</p>
          )}

          {/* Portable AES-GCM-256 Encrypted File Backup */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
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

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => void handleDownloadEncryptedBackup()}
                disabled={backupBusy || sessions.length === 0}
                className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors disabled:opacity-45 min-h-[42px]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>{t.createEncryptedBackup}</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={(e) => void handleImportEncryptedFile(e)}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={backupBusy}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 px-4 py-2.5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-45 min-h-[42px]"
              >
                <Upload className="w-4 h-4" aria-hidden="true" />
                <span>{t.restoreEncryptedBackup}</span>
              </button>
            </div>

            {backupStatus && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400">{backupStatus}</p>
            )}
          </div>
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
