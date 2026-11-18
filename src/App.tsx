import React, { useEffect, useState } from 'react';
import { BookOpen, Globe2, Headphones, LineChart, Monitor, Moon, Sun } from 'lucide-react';
import { PROGRESSIVE_EXERCISES } from './data/curriculumAndRepos';
import { TRANSLATIONS, UI_LANGUAGE_LABELS } from './i18n/translations';
import {
  deleteLocalSession,
  loadAllLocalSessions,
  saveEncryptedLocalSession,
} from './lib/cryptoVault';
import type {
  ConferenceExercise,
  InterpretingMode,
  LocalPracticeSession,
  SpeechLang,
  ThemePreference,
  UiLang,
} from './types';
import { CurriculumAndRepos } from './components/CurriculumAndRepos';
import { ErrorBoundary } from './components/ErrorBoundary';
import { InterpretingStudio } from './components/InterpretingStudio';
import { OfflineBanner, PWAInstallButton } from './components/PWAInstallButton';
import { ProgressAndVault } from './components/ProgressAndVault';
import { TechniquesAndManual } from './components/TechniquesAndManual';

export default function App() {
  const [uiLang, setUiLang] = useState<UiLang>(() => {
    const saved = localStorage.getItem('cabina_ui_lang') as UiLang | null;
    return saved && saved in TRANSLATIONS ? saved : 'es';
  });

  const [themePref, setThemePref] = useState<ThemePreference>(() => {
    const saved = localStorage.getItem('cabina_theme_pref') as ThemePreference | null;
    return saved === 'system' || saved === 'dark' || saved === 'light' ? saved : 'dark';
  });

  const [activeExercise, setActiveExercise] = useState<ConferenceExercise>(PROGRESSIVE_EXERCISES[0]);
  const [requestedStudioMode, setRequestedStudioMode] = useState<
    { mode: InterpretingMode; tick: number } | undefined
  >(undefined);
  const [sourceLang, setSourceLang] = useState<SpeechLang>('en');
  const [targetLang, setTargetLang] = useState<SpeechLang>('es');

  // Local Encrypted Vault & Private Alias State
  const [localSessions, setLocalSessions] = useState<LocalPracticeSession[]>([]);
  const [localAlias, setLocalAlias] = useState<string>(() => {
    const saved = localStorage.getItem('cabina_local_alias');
    return saved || `Anon-${Math.random().toString(36).slice(2, 8)}`;
  });

  const t = TRANSLATIONS[uiLang];

  // Apply theme preference (dark default + automatic system preference support)
  useEffect(() => {
    localStorage.setItem('cabina_theme_pref', themePref);
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      const shouldBeDark = themePref === 'dark' || (themePref === 'system' && mq.matches);
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme();
    mq.addEventListener('change', applyTheme);
    return () => mq.removeEventListener('change', applyTheme);
  }, [themePref]);

  useEffect(() => {
    localStorage.setItem('cabina_ui_lang', uiLang);
    document.documentElement.lang = uiLang;
  }, [uiLang]);

  // Load encrypted sessions from IndexedDB on boot
  useEffect(() => {
    void loadAllLocalSessions().then(setLocalSessions).catch(() => {});
  }, []);

  useEffect(() => {
    localStorage.setItem('cabina_local_alias', localAlias);
  }, [localAlias]);

  const handleSelectExercise = (ex: ConferenceExercise) => {
    setActiveExercise(ex);
    setRequestedStudioMode({ mode: ex.mode, tick: Date.now() });
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJumpToStudio = (mode: InterpretingMode) => {
    if (activeExercise.mode !== mode) {
      const match = PROGRESSIVE_EXERCISES.find((ex) => ex.mode === mode);
      if (match) {
        setActiveExercise(match);
      }
    }
    setRequestedStudioMode({ mode, tick: Date.now() });
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveSession = async (session: LocalPracticeSession) => {
    await saveEncryptedLocalSession(session);
    const refreshed = await loadAllLocalSessions();
    setLocalSessions(refreshed);
  };

  const handleDeleteSession = async (id: string) => {
    await deleteLocalSession(id);
    setLocalSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleRestoreSessions = async (restored: LocalPracticeSession[]) => {
    for (const s of restored) {
      await saveEncryptedLocalSession(s);
    }
    const refreshed = await loadAllLocalSessions();
    setLocalSessions(refreshed);
  };

  const handleThemeChange = (pref: ThemePreference) => {
    setThemePref(pref);
  };

  const handleUiLangChange = (lang: UiLang) => {
    setUiLang(lang);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-slate-100 pb-20 md:pb-10 transition-colors">
        {/* Strict 3-Zone Top Bar Contract */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#0B0F17]/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-8">
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 whitespace-nowrap shrink-0"
            >
              {t.brand}
            </a>

            <nav
              aria-label="Navegación principal"
              className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              <a
                href="#curriculum"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {t.navCurriculum}
              </a>
              <a
                href="#studio"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {t.navStudio}
              </a>
              <a
                href="#repositories"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {t.navRepositories}
              </a>
              <a
                href="#progress"
                className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                {t.navProgress}
              </a>
            </nav>

            <div className="shrink-0">
              <a
                href="#studio"
                className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
              >
                {t.navCta}
              </a>
            </div>
          </div>
        </header>

        <main id="top" className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 space-y-16">
          {/* Workspace Preferences Bar (Theme, Language, PWA Install) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span>{t.privacyNotice}</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{t.openSourceNotice}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-200/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => handleThemeChange('system')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[34px] ${
                    themePref === 'system'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.themeSystem}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[34px] ${
                    themePref === 'dark'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.themeDark}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[34px] ${
                    themePref === 'light'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.themeLight}</span>
                </button>
              </div>

              <select
                aria-label="Idioma de la interfaz"
                value={uiLang}
                onChange={(e) => handleUiLangChange(e.target.value as UiLang)}
                className="rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs font-medium text-slate-800 dark:text-slate-200 min-h-[40px]"
              >
                {(Object.keys(UI_LANGUAGE_LABELS) as UiLang[]).map((code) => (
                  <option key={code} value={code}>
                    {UI_LANGUAGE_LABELS[code]}
                  </option>
                ))}
              </select>

              <PWAInstallButton label={t.installApp} />
            </div>
          </div>

          {/* Hero Two-Column Split */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between gap-6 py-2">
              <div className="space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.12] text-balance">
                  {t.heroTitle}
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {t.heroSubtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSelectExercise(PROGRESSIVE_EXERCISES[0])}
                  className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-500 transition-colors min-h-[44px]"
                >
                  <Headphones className="w-4 h-4" aria-hidden="true" />
                  <span>{t.heroStartSimultaneous}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSelectExercise(PROGRESSIVE_EXERCISES[1])}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#131A26] px-5 py-3 text-sm font-medium text-slate-900 dark:text-slate-100 hover:border-sky-500/60 transition-colors min-h-[44px]"
                >
                  <BookOpen className="w-4 h-4 text-amber-500" aria-hidden="true" />
                  <span>{t.heroStartConsecutive}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 min-h-[260px]">
              <img
                src="/src/assets/images/hero_interpreting_booth_1794957054825.jpg"
                alt="Cabina de interpretación simultánea en conferencia internacional"
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-medium">Estudio de Cabina Dual · 8 Idiomas</span>
                <span className="font-mono text-slate-300">AES-GCM-256 · Offline PWA</span>
              </div>
            </div>
          </section>

          {/* Progressive Curriculum + Repositories */}
          <CurriculumAndRepos
            uiLang={uiLang}
            t={t}
            activeExerciseId={activeExercise.id}
            onSelectExercise={handleSelectExercise}
          />

          {/* Expanded Technical Manual: Simultaneous, Consecutive, Worked Rozan Notebooks & 36 Symbols */}
          <TechniquesAndManual uiLang={uiLang} onJumpToStudio={handleJumpToStudio} />

          {/* Active Interpreting Booth Studio */}
          <InterpretingStudio
            uiLang={uiLang}
            t={t}
            exercise={activeExercise}
            requestedMode={requestedStudioMode}
            sourceLang={sourceLang}
            targetLang={targetLang}
            onSourceLangChange={setSourceLang}
            onTargetLangChange={setTargetLang}
            onSaveSession={handleSaveSession}
          />

          {/* Progress Metrics, PDF Export, Encrypted Local Vault & Portable Backup */}
          <ProgressAndVault
            t={t}
            alias={localAlias}
            onAliasChange={setLocalAlias}
            sessions={localSessions}
            onDeleteSession={handleDeleteSession}
            onRestoreSessions={handleRestoreSessions}
          />
        </main>

        {/* Quiet Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>Cabina · {t.openSourceNotice}</span>
          <span>{t.privacyNotice}</span>
        </footer>

        {/* Mobile Bottom Thumb-Zone Navigation (4 destinations, 64px <= 15% viewport cap) */}
        <nav
          aria-label="Navegación móvil"
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 h-16 border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0B0F17]/95 backdrop-blur-md grid grid-cols-4 items-center"
        >
          <a
            href="#curriculum"
            className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 min-h-[44px]"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t.navCurriculum}</span>
          </a>
          <a
            href="#studio"
            className="flex flex-col items-center justify-center gap-1 text-sky-600 dark:text-sky-400 min-h-[44px]"
          >
            <Headphones className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t.navStudio}</span>
          </a>
          <a
            href="#repositories"
            className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 min-h-[44px]"
          >
            <Globe2 className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t.navRepositories}</span>
          </a>
          <a
            href="#progress"
            className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-300 hover:text-sky-500 min-h-[44px]"
          >
            <LineChart className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t.navProgress}</span>
          </a>
        </nav>

        <OfflineBanner message={t.offlineBanner} />
      </div>
    </ErrorBoundary>
  );
}
