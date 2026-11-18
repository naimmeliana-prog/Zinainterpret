import React, { useState } from 'react';
import { BookOpenCheck, Compass, Headphones, Layers, PenTool } from 'lucide-react';
import {
  getRozanAbbreviations,
  getRozanConnectors,
  getRozanHierarchySteps,
  getTechniqueGuides,
  getWorkedExamples,
  ROZAN_SEVEN_PRINCIPLES_I18N,
} from '../data/manualI18n';
import { EXTENDED_NOTE_SYMBOLS } from '../data/techniquesAndSymbols';
import type { Translations } from '../i18n/translations';
import type { UiLang } from '../types';
import { SymbolLibrary } from './SymbolLibrary';

interface TechniquesAndManualProps {
  uiLang: UiLang;
  t: Translations;
  onJumpToStudio: (mode: 'simultaneous' | 'consecutive') => void;
}

export const TechniquesAndManual: React.FC<TechniquesAndManualProps> = ({
  uiLang,
  t,
  onJumpToStudio,
}) => {
  const [activeTab, setActiveTab] = useState<
    'simultaneous' | 'consecutive' | 'examples' | 'symbols'
  >('consecutive');
  const [abbrDomain, setAbbrDomain] = useState<'all' | 'economy' | 'politics'>('all');

  const guides = getTechniqueGuides(uiLang);
  const simultaneousGuides = guides.filter((g) => g.mode === 'simultaneous');
  const consecutiveGuides = guides.filter((g) => g.mode === 'consecutive');
  const rozanPrinciples = ROZAN_SEVEN_PRINCIPLES_I18N[uiLang];
  const hierarchySteps = getRozanHierarchySteps(uiLang);
  const logicalConnectors = getRozanConnectors(uiLang);
  const abbreviations = getRozanAbbreviations(uiLang);
  const workedExamples = getWorkedExamples(uiLang);

  const visibleAbbreviations =
    abbrDomain === 'all'
      ? abbreviations
      : abbreviations.filter((item) => item.domain === abbrDomain);

  const economyCount = abbreviations.filter((item) => item.domain === 'economy').length;
  const politicsCount = abbreviations.filter((item) => item.domain === 'politics').length;

  return (
    <section id="techniques" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            {t.manualTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.manualSubtitlePrefix} {EXTENDED_NOTE_SYMBOLS.length} {t.manualSubtitleSuffix}
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 overflow-x-auto max-w-full self-start">
          <button
            type="button"
            onClick={() => setActiveTab('simultaneous')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] tabular-nums ${
              activeTab === 'simultaneous'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {t.manualTabSimultaneous} ({simultaneousGuides.length})
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('consecutive')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'consecutive'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <PenTool className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.manualTabConsecutive}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('examples')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
              activeTab === 'examples'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.manualTabExamples}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('symbols')}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] tabular-nums ${
              activeTab === 'symbols'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" aria-hidden="true" />
            <span>
              {t.manualTabSymbols} ({EXTENDED_NOTE_SYMBOLS.length})
            </span>
          </button>
        </div>
      </div>

      {/* Tab 1 & Tab 2: Detailed Technique Cards + Deep Rozan Breakdown */}
      {(activeTab === 'simultaneous' || activeTab === 'consecutive') && (
        <div className="space-y-6">
          {activeTab === 'consecutive' && (
            <>
              {/* 1. Los 7 Principios de Rozan */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {t.rozanPrinciplesHeading}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t.rozanPrinciplesSub}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onJumpToStudio('consecutive')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                  >
                    <BookOpenCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t.openPadInStudio}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {rozanPrinciples.map((p) => (
                    <div
                      key={p.num}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 space-y-1.5"
                    >
                      <div className="font-mono text-xs font-semibold text-sky-600 dark:text-sky-400 tabular-nums">
                        {p.num}. {p.title}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {p.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Jerarquías de Ideas y Arquitectura de la Página */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
                <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {t.rozanHierarchyTag}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    {t.rozanHierarchyHeading}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {t.rozanHierarchySub}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {hierarchySteps.map((step) => (
                    <div
                      key={step.level}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 flex flex-col justify-between gap-3"
                    >
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-mono text-sky-600 dark:text-sky-400">
                          {step.level}
                        </div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {step.title}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {step.zone}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                          {step.rule}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                        <pre
                          dir="ltr"
                          className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 whitespace-pre-wrap leading-relaxed"
                        >
                          {step.visualPattern}
                        </pre>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {step.exampleText}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Símbolos de Conectores Lógicos */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {t.rozanConnectorsTag}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                      {t.rozanConnectorsHeading}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('symbols')}
                    className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline self-start sm:self-auto whitespace-nowrap shrink-0"
                  >
                    {t.exploreSymbolsGrid} ({EXTENDED_NOTE_SYMBOLS.length})
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                        <th className="py-2.5 pe-4 font-medium">{t.colSymbol}</th>
                        <th className="py-2.5 pe-4 font-medium">{t.colLogicPlacement}</th>
                        <th className="py-2.5 pe-4 font-medium">{t.colTriggers}</th>
                        <th className="py-2.5 font-medium">{t.colSentenceNotation}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                      {logicalConnectors.map((conn) => (
                        <tr key={conn.symbol} className="align-top">
                          <td className="py-3 pe-4">
                            <span className="font-mono text-xl font-bold text-sky-600 dark:text-sky-400">
                              {conn.symbol}
                            </span>
                          </td>
                          <td className="py-3 pe-4">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {conn.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {conn.placement}
                            </div>
                          </td>
                          <td className="py-3 pe-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                            {conn.spokenTriggers}
                          </td>
                          <td className="py-3 space-y-1">
                            <div className="text-xs italic text-slate-600 dark:text-slate-300">
                              “{conn.sentenceExample}”
                            </div>
                            <div
                              dir="ltr"
                              className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400"
                            >
                              {conn.notationExample}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 4. Abreviaturas Comunes para Conceptos Económicos y Políticos */}
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      {t.rozanAbbrTag}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                      {t.rozanAbbrHeading} ({abbreviations.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {t.rozanAbbrSub}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900 self-start">
                    <button
                      type="button"
                      onClick={() => setAbbrDomain('all')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                        abbrDomain === 'all'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {t.abbrAll} ({abbreviations.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAbbrDomain('economy')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                        abbrDomain === 'economy'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {t.abbrEconomy} ({economyCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setAbbrDomain('politics')}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 tabular-nums ${
                        abbrDomain === 'politics'
                          ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                      }`}
                    >
                      {t.abbrPolitics} ({politicsCount})
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {visibleAbbreviations.map((abbr) => (
                    <div
                      key={abbr.id}
                      className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {abbr.domain === 'economy'
                              ? t.abbrDomainEconomy
                              : t.abbrDomainPolitics}
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {abbr.concept}
                          </div>
                        </div>
                        <span
                          dir="ltr"
                          className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400 shrink-0"
                        >
                          {abbr.abbreviation}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {abbr.rozanRule}
                      </p>
                      <div
                        dir="ltr"
                        className="pt-2 border-t border-slate-200/80 dark:border-slate-800 font-mono text-xs text-emerald-700 dark:text-emerald-400"
                      >
                        {t.abbrExamplePrefix} {abbr.exampleInContext}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Technique Guides Grid (Simultaneous or Consecutive Methodology) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {(activeTab === 'simultaneous' ? simultaneousGuides : consecutiveGuides).map(
              (guide, idx) => (
                <article
                  key={guide.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono text-sky-600 dark:text-sky-400 tabular-nums">
                        0{idx + 1}.{' '}
                        {guide.mode === 'simultaneous' ? t.modeSimultaneous : t.modeConsecutive}
                      </span>
                      <span>{guide.subtitle}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      {guide.title}
                    </h3>

                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {guide.principle}
                    </p>

                    <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      <span className="font-semibold text-slate-900 dark:text-slate-200">
                        {t.guideWhenToUse}{' '}
                      </span>
                      {guide.whenToUse}
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3.5 space-y-2 text-xs">
                      <div>
                        <div className="font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                          {t.guideSpeakerInput}
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 italic">
                          {guide.exampleSource}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-0.5">
                          {t.guideRecommendedOutput}
                        </div>
                        <div className="text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed">
                          {guide.exampleOutput}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                    <div className="text-amber-700 dark:text-amber-400">
                      <span className="font-semibold">{t.guideCommonPitfall} </span>
                      {guide.commonPitfall}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">{t.guideBoothDrill} </span>
                      {guide.drillTip}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onJumpToStudio(activeTab)}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-xs font-medium text-white hover:bg-sky-500 transition-colors min-h-[42px]"
            >
              <span>
                {t.practiceInModePrefix}{' '}
                {activeTab === 'simultaneous' ? t.modeSimultaneous : t.modeConsecutive}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Worked Rozan Notebook Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-5">
          {workedExamples.map((ex) => (
            <div
              key={ex.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-6 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {ex.institution}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {ex.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => onJumpToStudio('consecutive')}
                  className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline self-start sm:self-auto"
                >
                  {t.workedPracticeCanvas}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    {t.workedOriginalSpeech}
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    {ex.sourceSpeech}
                  </p>
                  <p className="text-xs text-sky-700 dark:text-sky-300 pt-2 border-t border-slate-200 dark:border-slate-800">
                    {ex.restitutionTip}
                  </p>
                </div>

                <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] overflow-hidden">
                  <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <span>{t.workedMarginHeader}</span>
                    <span>{t.workedVisualReading}</span>
                  </div>
                  <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                    {ex.rozanLines.map((line, i) => (
                      <div key={i} className="grid grid-cols-12 items-center text-xs sm:text-sm">
                        <div className="col-span-2 px-3 py-2.5 font-mono font-semibold text-amber-600 dark:text-amber-400 border-e border-slate-200 dark:border-slate-800 text-center">
                          {line.margin || '·'}
                        </div>
                        <div className="col-span-10 px-4 py-2.5 space-y-0.5">
                          <div
                            dir="ltr"
                            className={`font-mono font-semibold text-slate-900 dark:text-slate-100 ${
                              line.indent === 0 ? 'pl-0' : line.indent === 1 ? 'pl-6' : 'pl-12'
                            }`}
                          >
                            {line.notation}
                          </div>
                          <div
                            className={`text-[11px] text-slate-500 dark:text-slate-400 ${
                              line.indent === 0 ? 'ps-0' : line.indent === 1 ? 'ps-6' : 'ps-12'
                            }`}
                          >
                            {line.gloss}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Interactive 84-Symbol Library Component */}
      {activeTab === 'symbols' && (
        <SymbolLibrary uiLang={uiLang} t={t} onJumpToStudio={onJumpToStudio} />
      )}
    </section>
  );
};
