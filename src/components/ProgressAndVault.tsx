import React, { useRef, useState } from 'react';
import {
  Download,
  FileDown,
  FileText,
  Lock,
  Play,
  Shield,
  Trash2,
  Upload,
  UserCheck,
} from 'lucide-react';
import type { Translations } from '../i18n/translations';
import { decryptJsonWithPassphrase, encryptJsonWithPassphrase } from '../lib/cryptoVault';
import {
  exportSessionsToJson,
  exportSessionsToMarkdown,
  exportSessionsToPdf,
} from '../lib/pdfExport';
import type { EncryptedPortableBackup, LocalPracticeSession, UiLang } from '../types';

interface ProgressAndVaultProps {
  uiLang: UiLang;
  t: Translations;
  alias: string;
  onAliasChange: (nextAlias: string) => void;
  sessions: LocalPracticeSession[];
  onDeleteSession: (id: string) => Promise<void>;
  onRestoreSessions: (restored: LocalPracticeSession[]) => Promise<void>;
}

function validateAliasInput(raw: string, t: Translations): string | null {
  const clean = raw.trim();
  if (!clean) return t.aliasErrorEmpty;
  if (!/^[a-zA-Z0-9_-]{3,24}$/.test(clean)) {
    return t.aliasErrorInvalid;
  }
  return null;
}

export const ProgressAndVault: React.FC<ProgressAndVaultProps> = ({
  uiLang,
  t,
  alias,
  onAliasChange,
  sessions,
  onDeleteSession,
  onRestoreSessions,
}) => {
  const [aliasInput, setAliasInput] = useState(alias.startsWith('Anon-') ? '' : alias);
  const [aliasError, setAliasError] = useState('');
  const [aliasSaved, setAliasSaved] = useState('');

  const [backupPassphrase, setBackupPassphrase] = useState('');
  const [backupLabel, setBackupLabel] = useState(
    `Backup-${new Date().toISOString().slice(0, 10)}`
  );
  const [backupBusy, setBackupBusy] = useState(false);
  const [backupStatus, setBackupStatus] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      precision: Math.round(
        scored.reduce((a, b) => a + (b.evaluation?.precisionScore || 0), 0) / n
      ),
      intonation: Math.round(
        scored.reduce((a, b) => a + (b.evaluation?.intonationScore || 0), 0) / n
      ),
      wpm: Math.round(scored.reduce((a, b) => a + (b.evaluation?.estimatedWpm || 0), 0) / n),
    };
  })();

  const handleSaveAlias = (e: React.FormEvent) => {
    e.preventDefault();
    setAliasError('');
    setAliasSaved('');
    const err = validateAliasInput(aliasInput, t);
    if (err) {
      setAliasError(err);
      return;
    }
    const clean = aliasInput.trim();
    onAliasChange(clean);
    setAliasSaved(`${t.aliasSavedPrefix} ${clean}`);
  };

  const handleResetAnonymous = () => {
    setAliasError('');
    const anonAlias = `Anon-${Math.random().toString(36).slice(2, 8)}`;
    setAliasInput('');
    onAliasChange(anonAlias);
    setAliasSaved(`${t.anonActivatedPrefix} ${anonAlias}`);
  };

  const handleDownloadEncryptedBackup = async () => {
    if (backupPassphrase.length < 8) {
      setBackupStatus(t.backupErrPassphrase);
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
        label: backupLabel.trim() || 'Cabina-Backup',
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
      setBackupStatus(`${t.backupDownloadedPrefix} (${compactSessions.length})`);
    } catch (err) {
      setBackupStatus(err instanceof Error ? err.message : t.backupInvalidFile);
    } finally {
      setBackupBusy(false);
    }
  };

  const handleImportEncryptedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (backupPassphrase.length < 8) {
      setBackupStatus(t.backupErrPassphraseImport);
      return;
    }
    setBackupBusy(true);
    setBackupStatus('');
    try {
      const raw = await file.text();
      const parsed = JSON.parse(raw) as EncryptedPortableBackup;
      if (!parsed.ciphertext || !parsed.iv || !parsed.salt) {
        throw new Error(t.backupInvalidFile);
      }
      const decrypted = await decryptJsonWithPassphrase<LocalPracticeSession[]>(
        { ciphertext: parsed.ciphertext, iv: parsed.iv, salt: parsed.salt },
        backupPassphrase
      );
      await onRestoreSessions(decrypted);
      setBackupStatus(`${t.backupRestoredPrefix} ${decrypted.length} ${t.backupRestoredSuffix}`);
    } catch {
      setBackupStatus(t.backupWrongKey);
    } finally {
      setBackupBusy(false);
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
            onClick={() => exportSessionsToPdf(sessions, alias, uiLang)}
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
            onClick={() => exportSessionsToMarkdown(sessions, alias, uiLang)}
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
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {t.metricEncryptedSessions}
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
            {avgMetrics.count}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.metricAvgFluency}</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-sky-600 dark:text-sky-400 mt-1">
            {avgMetrics.fluency}%
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.metricAvgPrecision}</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
            {avgMetrics.precision}%
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.metricAvgIntonation}</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1">
            {avgMetrics.intonation}%
          </div>
        </div>
        <div className="col-span-2 md:col-span-1 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-4">
          <div className="text-xs text-slate-500 dark:text-slate-400">{t.metricAvgSpeed}</div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100 mt-1">
            {avgMetrics.wpm}{' '}
            <span className="text-xs font-normal text-slate-400">{t.wpmUnit}</span>
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
                    <span className="font-mono">
                      {s.mode === 'simultaneous' ? t.modeSimultaneous : t.modeConsecutive}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span dir="ltr" className="font-mono">
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
                      {t.fluencyLabel} {s.evaluation.fluencyScore}% · {t.precisionLabel}{' '}
                      {s.evaluation.precisionScore}% · {t.intonationLabel}{' '}
                      {s.evaluation.intonationScore}% · {s.evaluation.estimatedWpm} {t.wpmUnit}
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
                      <span>{playingId === s.id ? t.playingBtn : t.listenBtn}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => void onDeleteSession(s.id)}
                    className="p-2 rounded-lg text-slate-400 hover:text-rose-500 transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
                    aria-label={t.deleteSessionLabel}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Local Private Profile + Portable Encrypted Backup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  {alias.startsWith('Anon-') ? t.anonDeviceStatus : t.localAliasStatus}
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
        </div>

        {/* Portable AES-GCM-256 Encrypted File Backup Card */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" aria-hidden="true" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {t.cloudBackupTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.cloudBackupSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <input
              type="text"
              value={backupLabel}
              onChange={(e) => setBackupLabel(e.target.value)}
              placeholder={t.backupLabelPlaceholder}
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
    </section>
  );
};
