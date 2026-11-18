import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookMarked,
  Check,
  Download,
  Pencil,
  Plus,
  Search,
  Trash2,
  Volume2,
  X,
} from 'lucide-react';
import {
  DEFAULT_THEMATIC_GLOSSARY,
  GLOSSARY_DOMAIN_LABELS,
} from '../data/thematicGlossary';
import type { Translations } from '../i18n/translations';
import {
  speakWithNaturalCadence,
  type NaturalSpeechController,
} from '../lib/speechSynthesisHelper';
import type { GlossaryDomain, GlossaryTerm, SpeechLang, UiLang } from '../types';

interface ThematicGlossaryProps {
  uiLang: UiLang;
  t: Translations;
}

const CUSTOM_TERMS_STORAGE_KEY = 'cabina_custom_glossary_v1';
const MASTERED_IDS_STORAGE_KEY = 'cabina_glossary_mastered_v1';

const DOMAIN_ORDER: GlossaryDomain[] = [
  'diplomacy',
  'economy',
  'climate',
  'law',
  'health',
  'tech',
];

function loadStoredCustomTerms(): GlossaryTerm[] {
  try {
    const raw = localStorage.getItem(CUSTOM_TERMS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as GlossaryTerm[]) : [];
  } catch {
    return [];
  }
}

function loadStoredMasteredIds(): string[] {
  try {
    const raw = localStorage.getItem(MASTERED_IDS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export const ThematicGlossary: React.FC<ThematicGlossaryProps> = ({ uiLang, t }) => {
  const [customTerms, setCustomTerms] = useState<GlossaryTerm[]>(() => loadStoredCustomTerms());
  const [masteredIds, setMasteredIds] = useState<string[]>(() => loadStoredMasteredIds());
  const [query, setQuery] = useState('');
  const [domainFilter, setDomainFilter] = useState<GlossaryDomain | 'all'>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'custom' | 'mastered'>('all');

  // Add / Edit form state
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formDomain, setFormDomain] = useState<GlossaryDomain>('diplomacy');
  const [formEs, setFormEs] = useState('');
  const [formFr, setFormFr] = useState('');
  const [formAr, setFormAr] = useState('');
  const [formNote, setFormNote] = useState('');
  const [formContext, setFormContext] = useState('');
  const [formError, setFormError] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Audio preview state
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const speechCtrlRef = useRef<NaturalSpeechController | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CUSTOM_TERMS_STORAGE_KEY, JSON.stringify(customTerms));
    } catch {
      // Ignore storage quota errors
    }
  }, [customTerms]);

  useEffect(() => {
    try {
      localStorage.setItem(MASTERED_IDS_STORAGE_KEY, JSON.stringify(masteredIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [masteredIds]);

  useEffect(() => {
    window.speechSynthesis?.getVoices?.();
    return () => {
      speechCtrlRef.current?.stop();
    };
  }, []);

  const allTerms = useMemo(() => {
    const customMap = new Map<string, GlossaryTerm>();
    for (const term of customTerms) {
      customMap.set(term.id, { ...term, isCustom: true });
    }
    const mergedBuiltIn = DEFAULT_THEMATIC_GLOSSARY.map((item) =>
      customMap.has(item.id) ? customMap.get(item.id)! : item
    );
    const builtInIds = new Set(DEFAULT_THEMATIC_GLOSSARY.map((item) => item.id));
    const addedCustom = customTerms
      .filter((item) => !builtInIds.has(item.id))
      .map((item) => ({ ...item, isCustom: true }));

    return [...addedCustom, ...mergedBuiltIn];
  }, [customTerms]);

  const masteredSet = useMemo(() => new Set(masteredIds), [masteredIds]);

  const filteredTerms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allTerms.filter((term) => {
      if (domainFilter !== 'all' && term.domain !== domainFilter) return false;
      if (scopeFilter === 'custom' && !term.isCustom) return false;
      if (scopeFilter === 'mastered' && !masteredSet.has(term.id)) return false;
      if (!q) return true;

      const haystack = [
        term.es,
        term.fr,
        term.ar,
        term.registerNote.es,
        term.registerNote.fr,
        term.registerNote.ar,
        term.contextSentence?.es || '',
        term.contextSentence?.fr || '',
        term.contextSentence?.ar || '',
        GLOSSARY_DOMAIN_LABELS[uiLang][term.domain],
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allTerms, domainFilter, scopeFilter, masteredSet, query, uiLang]);

  const domainCounts = useMemo(() => {
    const counts: Record<GlossaryDomain | 'all', number> = {
      all: allTerms.length,
      diplomacy: 0,
      economy: 0,
      climate: 0,
      law: 0,
      health: 0,
      tech: 0,
    };
    for (const term of allTerms) {
      counts[term.domain] += 1;
    }
    return counts;
  }, [allTerms]);

  const resetForm = () => {
    setEditingId(null);
    setFormDomain('diplomacy');
    setFormEs('');
    setFormFr('');
    setFormAr('');
    setFormNote('');
    setFormContext('');
    setFormError('');
    setFormOpen(false);
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormDomain(domainFilter === 'all' ? 'diplomacy' : domainFilter);
    setFormEs('');
    setFormFr('');
    setFormAr('');
    setFormNote('');
    setFormContext('');
    setFormError('');
    setFormOpen(true);
  };

  const openEditForm = (term: GlossaryTerm) => {
    setEditingId(term.id);
    setFormDomain(term.domain);
    setFormEs(term.es);
    setFormFr(term.fr);
    setFormAr(term.ar);
    setFormNote(term.registerNote[uiLang] || term.registerNote.es || '');
    setFormContext(term.contextSentence?.[uiLang] || '');
    setFormError('');
    setFormOpen(true);
  };

  const handleSaveTerm = (e: React.FormEvent) => {
    e.preventDefault();
    const esVal = formEs.trim();
    const frVal = formFr.trim();
    const arVal = formAr.trim();

    if (!esVal || !frVal || !arVal) {
      setFormError(t.glossaryValidationErr);
      return;
    }

    const noteVal = formNote.trim();
    const contextVal = formContext.trim();

    if (editingId) {
      const existing = allTerms.find((item) => item.id === editingId);
      const updated: GlossaryTerm = {
        id: editingId,
        domain: formDomain,
        es: esVal,
        fr: frVal,
        ar: arVal,
        registerNote: {
          es: uiLang === 'es' ? noteVal : existing?.registerNote.es || noteVal,
          fr: uiLang === 'fr' ? noteVal : existing?.registerNote.fr || noteVal,
          ar: uiLang === 'ar' ? noteVal : existing?.registerNote.ar || noteVal,
        },
        contextSentence: contextVal
          ? {
              es: uiLang === 'es' ? contextVal : existing?.contextSentence?.es || contextVal,
              fr: uiLang === 'fr' ? contextVal : existing?.contextSentence?.fr || contextVal,
              ar: uiLang === 'ar' ? contextVal : existing?.contextSentence?.ar || contextVal,
            }
          : existing?.contextSentence,
        isCustom: true,
      };
      setCustomTerms((prev) => {
        const existsInCustom = prev.some((item) => item.id === editingId);
        return existsInCustom
          ? prev.map((item) => (item.id === editingId ? updated : item))
          : [updated, ...prev];
      });
    } else {
      const newTerm: GlossaryTerm = {
        id: `gl-custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        domain: formDomain,
        es: esVal,
        fr: frVal,
        ar: arVal,
        registerNote: {
          es: noteVal,
          fr: noteVal,
          ar: noteVal,
        },
        contextSentence: contextVal
          ? {
              es: contextVal,
              fr: contextVal,
              ar: contextVal,
            }
          : undefined,
        isCustom: true,
      };
      setCustomTerms((prev) => [newTerm, ...prev]);
    }

    resetForm();
  };

  const handleDeleteCustom = (id: string) => {
    setCustomTerms((prev) => prev.filter((item) => item.id !== id));
    setMasteredIds((prev) => prev.filter((mId) => mId !== id));
    setPendingDeleteId(null);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const speakTerm = (termId: string, lang: SpeechLang, text: string) => {
    const key = `${termId}-${lang}`;
    if (speakingKey === key) {
      speechCtrlRef.current?.stop();
      setSpeakingKey(null);
      return;
    }

    speechCtrlRef.current?.stop();
    speechCtrlRef.current = speakWithNaturalCadence({
      text,
      lang,
      style: 'diplomatic',
      playbackRate: 0.96,
      onStart: () => setSpeakingKey(key),
      onEnd: () => setSpeakingKey((cur) => (cur === key ? null : cur)),
      onError: () => setSpeakingKey((cur) => (cur === key ? null : cur)),
    });
  };

  const exportGlossaryJson = () => {
    const blob = new Blob([JSON.stringify(allTerms, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cabina-glossary-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-sky-600 dark:text-sky-400 font-mono">
            <BookMarked className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.glossaryBadge}</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            {t.glossaryHeading}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.glossarySub}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={exportGlossaryJson}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.glossaryExportBtn}</span>
          </button>
          <button
            type="button"
            onClick={() => (formOpen ? resetForm() : openAddForm())}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors min-h-[40px]"
          >
            {formOpen ? (
              <X className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span>{formOpen ? t.glossaryCancelBtn : t.glossaryAddBtn}</span>
          </button>
        </div>
      </div>

      {/* Add / Edit Term Form */}
      {formOpen && (
        <form
          onSubmit={handleSaveTerm}
          className="rounded-xl border border-sky-200 dark:border-sky-900/60 bg-slate-50 dark:bg-[#0B0F17] p-5 space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryDomainLabel}
              </span>
              <select
                value={formDomain}
                onChange={(e) => setFormDomain(e.target.value as GlossaryDomain)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              >
                {DOMAIN_ORDER.map((dom) => (
                  <option key={dom} value={dom}>
                    {GLOSSARY_DOMAIN_LABELS[uiLang][dom]}
                  </option>
                ))}
              </select>
            </label>

            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryEsLabel}
              </span>
              <input
                type="text"
                dir="ltr"
                value={formEs}
                onChange={(e) => setFormEs(e.target.value)}
                placeholder="Ej. Soberanía digital"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
            </label>

            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryFrLabel}
              </span>
              <input
                type="text"
                dir="ltr"
                value={formFr}
                onChange={(e) => setFormFr(e.target.value)}
                placeholder="Ex. Souveraineté numérique"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
            </label>

            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryArLabel}
              </span>
              <input
                type="text"
                dir="rtl"
                value={formAr}
                onChange={(e) => setFormAr(e.target.value)}
                placeholder="مثال: السيادة الرقمية"
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryNoteLabel}
              </span>
              <input
                type="text"
                value={formNote}
                onChange={(e) => setFormNote(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
            </label>

            <label className="space-y-1.5">
              <span className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                {t.glossaryContextLabel}
              </span>
              <input
                type="text"
                value={formContext}
                onChange={(e) => setFormContext(e.target.value)}
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#131A26] px-3 py-2 text-xs text-slate-900 dark:text-slate-100 min-h-[42px]"
              />
            </label>
          </div>

          {formError && <p className="text-xs text-rose-600 dark:text-rose-400">{formError}</p>}

          <div className="flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg border border-slate-300 dark:border-slate-700 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 min-h-[38px]"
            >
              {t.glossaryCancelBtn}
            </button>
            <button
              type="submit"
              className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-500 min-h-[38px]"
            >
              {editingId ? t.glossaryUpdateTermBtn : t.glossarySaveTermBtn}
            </button>
          </div>
        </form>
      )}

      {/* Search + Scope + Domain Filters */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search
              className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.glossarySearchPlaceholder}
              aria-label={t.glossarySearchAria}
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] ps-9 pe-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 min-h-[42px]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between lg:justify-end">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900">
              {(['all', 'custom', 'mastered'] as const).map((scope) => (
                <button
                  key={scope}
                  type="button"
                  onClick={() => setScopeFilter(scope)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 min-h-[34px] ${
                    scopeFilter === scope
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {scope === 'all'
                    ? t.glossaryFilterAll
                    : scope === 'custom'
                      ? `${t.glossaryFilterCustom} (${customTerms.length})`
                      : `${t.glossaryFilterMastered} (${masteredIds.length})`}
                </button>
              ))}
            </div>

            <div className="text-xs font-mono text-slate-500 dark:text-slate-400 tabular-nums">
              {t.glossaryShowingPrefix} {filteredTerms.length} · {t.glossaryMasteredLabel}{' '}
              {masteredIds.length}
            </div>
          </div>
        </div>

        {/* Thematic Domain Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 overflow-x-auto max-w-full">
          {(['all', ...DOMAIN_ORDER] as const).map((dom) => (
            <button
              key={dom}
              type="button"
              onClick={() => setDomainFilter(dom)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums min-h-[36px] ${
                domainFilter === dom
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {GLOSSARY_DOMAIN_LABELS[uiLang][dom]} ({domainCounts[dom]})
            </button>
          ))}
        </div>
      </div>

      {/* Trilingual Glossary Cards */}
      {filteredTerms.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-8 text-center space-y-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">{t.glossaryEmptyState}</p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setDomainFilter('all');
              setScopeFilter('all');
            }}
            className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
          >
            {t.symLibResetFilters}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filteredTerms.map((term) => {
            const isMastered = masteredSet.has(term.id);
            return (
              <article
                key={term.id}
                className={`rounded-xl border p-4 sm:p-5 space-y-3.5 transition-colors ${
                  isMastered
                    ? 'border-emerald-300/80 dark:border-emerald-800/70 bg-emerald-50/30 dark:bg-emerald-950/15'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17]'
                }`}
              >
                {/* Top metadata & action strip */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span className="text-sky-600 dark:text-sky-400 font-semibold">
                      {GLOSSARY_DOMAIN_LABELS[uiLang][term.domain]}
                    </span>
                    <span className="text-slate-400" aria-hidden="true">
                      ·
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">
                      {term.isCustom ? t.glossaryCustomBadge : t.glossaryCuratedBadge}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleMastered(term.id)}
                      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium transition-colors min-h-[30px] ${
                        isMastered
                          ? 'bg-emerald-600 text-white'
                          : 'border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Check className="w-3 h-3" aria-hidden="true" />
                      <span>{isMastered ? t.glossaryUnmarkMastered : t.glossaryMarkMastered}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => openEditForm(term)}
                      title={t.glossaryEditBtn}
                      aria-label={t.glossaryEditBtn}
                      className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800 min-w-[30px] min-h-[30px]"
                    >
                      <Pencil className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>

                    {term.isCustom &&
                      (pendingDeleteId === term.id ? (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustom(term.id)}
                          className="rounded-md bg-rose-600 px-2 py-1 text-[11px] font-medium text-white hover:bg-rose-500 min-h-[30px]"
                        >
                          {t.glossaryConfirmDelete}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setPendingDeleteId(term.id)}
                          title={t.glossaryDeleteBtn}
                          aria-label={t.glossaryDeleteBtn}
                          className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 p-1.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 min-w-[30px] min-h-[30px]"
                        >
                          <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      ))}
                  </div>
                </div>

                {/* Trilingual Equivalents Grid (ES / FR / AR) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {(
                    [
                      { lang: 'es', label: 'ES', value: term.es, dir: 'ltr' },
                      { lang: 'fr', label: 'FR', value: term.fr, dir: 'ltr' },
                      { lang: 'ar', label: 'AR', value: term.ar, dir: 'rtl' },
                    ] as const
                  ).map((col) => {
                    const isActiveSpeak = speakingKey === `${term.id}-${col.lang}`;
                    return (
                      <div
                        key={col.lang}
                        className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-3 flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-mono text-[10px] font-semibold text-slate-400">
                            {col.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => speakTerm(term.id, col.lang, col.value)}
                            aria-label={`${t.glossaryListenLabel} (${col.label}): ${col.value}`}
                            title={t.glossaryListenLabel}
                            className={`inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
                              isActiveSpeak
                                ? 'bg-sky-600 text-white'
                                : 'text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40'
                            }`}
                          >
                            <Volume2 className="w-3 h-3" aria-hidden="true" />
                            <span>{col.label}</span>
                          </button>
                        </div>
                        <div
                          dir={col.dir}
                          className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-snug"
                        >
                          {col.value}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Register Note & Context Sentence */}
                {(term.registerNote[uiLang] || term.contextSentence?.[uiLang]) && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                    {term.registerNote[uiLang] && (
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {term.registerNote[uiLang]}
                      </p>
                    )}
                    {term.contextSentence?.[uiLang] && (
                      <p className="text-slate-500 dark:text-slate-400 italic leading-relaxed">
                        “{term.contextSentence[uiLang]}”
                      </p>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
