import React, { useState } from 'react';
import { BookOpenCheck, Compass, Headphones, Layers, PenTool } from 'lucide-react';
import {
  EXTENDED_NOTE_SYMBOLS,
  NOTEBOOK_WORKED_EXAMPLES,
  ROZAN_ABBREVIATIONS,
  ROZAN_HIERARCHY_STEPS,
  ROZAN_LOGICAL_CONNECTORS,
  TECHNIQUE_GUIDES,
} from '../data/techniquesAndSymbols';
import type { UiLang } from '../types';
import { SymbolLibrary } from './SymbolLibrary';

interface TechniquesAndManualProps {
  uiLang: UiLang;
  onJumpToStudio: (mode: 'simultaneous' | 'consecutive') => void;
}

const ROZAN_SEVEN_PRINCIPLES = [
  {
    num: '01',
    title: 'La idea y no la palabra',
    detail:
      'Anota el concepto subyacente en forma sintética (idealmente ya en la lengua meta o con símbolos universales), nunca palabras sueltas que aten tu sintaxis.',
  },
  {
    num: '02',
    title: 'Reglas de abreviación',
    detail:
      'Si una palabra tiene más de 4-5 letras, anota la raíz y añade la terminación en superíndice para marcar tiempo, género o número (ej. prodⁿ, desarrᵈᵒ).',
  },
  {
    num: '03',
    title: 'Encadenamiento lógico',
    detail:
      'Reserva el margen izquierdo de la página exclusivamente para los conectores argumentativos (∵, ∴, ∥, →, Si:) de modo que la estructura salte a la vista.',
  },
  {
    num: '04',
    title: 'La negación',
    detail:
      'Tacha el símbolo con una barra diagonal (╱) o antepón un marcador claro (✗ / ∅) antes del verbo o concepto negado para evitar invertir el sentido al leer.',
  },
  {
    num: '05',
    title: 'La acentuación (énfasis)',
    detail:
      'Subraya una vez los elementos importantes (_), usa doble subrayado (═) para puntos críticos y línea discontinua (┄) para matices atenuados o dudosos.',
  },
  {
    num: '06',
    title: 'El verticalismo',
    detail:
      'Apila las enumeraciones, elementos coordinados o ejemplos en columna vertical bajo un corchete (┌) en lugar de amontonarlos en horizontal.',
  },
  {
    num: '07',
    title: 'El escalonamiento diagonal',
    detail:
      'Distribuye cada proposición en tres escalones descendentes de izquierda a derecha: Sujeto arriba a la izquierda → Verbo en el centro → Objeto abajo a la derecha.',
  },
];

export const TechniquesAndManual: React.FC<TechniquesAndManualProps> = ({
  uiLang,
  onJumpToStudio,
}) => {
  const [activeTab, setActiveTab] = useState<
    'simultaneous' | 'consecutive' | 'examples' | 'symbols'
  >('consecutive');
  const [abbrDomain, setAbbrDomain] = useState<'all' | 'economy' | 'politics'>('all');

  const simultaneousGuides = TECHNIQUE_GUIDES.filter((g) => g.mode === 'simultaneous');
  const consecutiveGuides = TECHNIQUE_GUIDES.filter((g) => g.mode === 'consecutive');
  const visibleAbbreviations =
    abbrDomain === 'all'
      ? ROZAN_ABBREVIATIONS
      : ROZAN_ABBREVIATIONS.filter((item) => item.domain === abbrDomain);

  return (
    <section id="techniques" className="space-y-6 scroll-mt-20">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 text-balance">
            Manual Técnico: Simultánea, Consecutiva y Toma de Notas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Metodología operativa paso a paso, desglose completo del método de Jean-François Rozan
            (jerarquía de ideas, conectores lógicos y abreviaturas), cuadernos resueltos y biblioteca
            interactiva de {EXTENDED_NOTE_SYMBOLS.length} símbolos esenciales.
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
            <span>Simultánea ({simultaneousGuides.length})</span>
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
            <span>Consecutiva y Rozan</span>
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
            <span>Cuaderno resuelto</span>
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
            <span>Símbolos ({EXTENDED_NOTE_SYMBOLS.length})</span>
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
                      01. Los 7 Principios Fundamentales de Jean-François Rozan
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Sistema clásico de toma de notas consecutivas adoptado en ONU, DG SCIC y
                      facultades europeas EMCI.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onJumpToStudio('consecutive')}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                  >
                    <BookOpenCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Abrir cuaderno en estudio</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {ROZAN_SEVEN_PRINCIPLES.map((p) => (
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
                    02. Jerarquías de ideas · Arquitectura espacial de la página
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                    Cómo jerarquizar argumentos principales, subordinación y énfasis visual
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    En la técnica de Rozan el espacio en blanco aporta tanta información como el
                    trazo: la posición vertical y la sangría horizontal indican qué idea manda y qué
                    elementos dependen de ella.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROZAN_HIERARCHY_STEPS.map((step) => (
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
                        <pre className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400 whitespace-pre-wrap leading-relaxed">
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
                      03. Conectores lógicos · Columna de enlace argumentativo
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                      Mapa de conectores lógicos y detonantes orales multilingües
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('symbols')}
                    className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline self-start sm:self-auto whitespace-nowrap shrink-0"
                  >
                    Explorar {EXTENDED_NOTE_SYMBOLS.length} símbolos en cuadrícula →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                        <th className="py-2.5 pr-4 font-medium">Símbolo</th>
                        <th className="py-2.5 pr-4 font-medium">Relación lógica y ubicación</th>
                        <th className="py-2.5 pr-4 font-medium">Detonantes en discurso (ES / EN / FR)</th>
                        <th className="py-2.5 font-medium">Frase y notación Rozan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                      {ROZAN_LOGICAL_CONNECTORS.map((conn) => (
                        <tr key={conn.symbol} className="align-top">
                          <td className="py-3 pr-4">
                            <span className="font-mono text-xl font-bold text-sky-600 dark:text-sky-400">
                              {conn.symbol}
                            </span>
                          </td>
                          <td className="py-3 pr-4">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {conn.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                              {conn.placement}
                            </div>
                          </td>
                          <td className="py-3 pr-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs">
                            {conn.spokenTriggers}
                          </td>
                          <td className="py-3 space-y-1">
                            <div className="text-xs italic text-slate-600 dark:text-slate-300">
                              “{conn.sentenceExample}”
                            </div>
                            <div className="font-mono text-xs font-semibold text-emerald-700 dark:text-emerald-400">
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
                      04. Abreviaturas Rozan · Superíndices y siglas de conferencia
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-1">
                      Abreviaturas comunes para conceptos económicos y políticos ({ROZAN_ABBREVIATIONS.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Aplica la regla de raíz corta + superíndice (ⁿ sustantivo, º adjetivo/estado, ˢ
                      plural) para distinguir conceptos afines sin ambigüedad.
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
                      Todas ({ROZAN_ABBREVIATIONS.length})
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
                      Economía (12)
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
                      Política y Derecho (12)
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
                              ? 'Economía y Finanzas'
                              : 'Política y Diplomacia'}
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {abbr.concept}
                          </div>
                        </div>
                        <span className="font-mono text-sm font-bold text-sky-600 dark:text-sky-400 shrink-0">
                          {abbr.abbreviation}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {abbr.rozanRule}
                      </p>
                      <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 font-mono text-xs text-emerald-700 dark:text-emerald-400">
                        Ej: {abbr.exampleInContext}
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
                        0{idx + 1}. {guide.mode === 'simultaneous' ? 'Simultánea' : 'Consecutiva'}
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
                        Cuándo aplicarla:{' '}
                      </span>
                      {guide.whenToUse}
                    </div>

                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-3.5 space-y-2 text-xs">
                      <div>
                        <div className="font-medium text-slate-500 dark:text-slate-400 mb-0.5">
                          Entrada del orador
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 italic">
                          {guide.exampleSource}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                        <div className="font-medium text-emerald-600 dark:text-emerald-400 mb-0.5">
                          Resolución técnica recomendada
                        </div>
                        <div className="text-slate-800 dark:text-slate-200 font-mono text-[11px] leading-relaxed">
                          {guide.exampleOutput}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                    <div className="text-amber-700 dark:text-amber-400">
                      <span className="font-semibold">Error frecuente: </span>
                      {guide.commonPitfall}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <span className="font-semibold">Práctica en cabina: </span>
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
                Practicar técnica en modo{' '}
                {activeTab === 'simultaneous' ? 'Simultánea' : 'Consecutiva'} →
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Worked Rozan Notebook Examples */}
      {activeTab === 'examples' && (
        <div className="space-y-5">
          {NOTEBOOK_WORKED_EXAMPLES.map((ex) => (
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
                  Practicar en el lienzo →
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Discurso original escuchado
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
                    <span>Margen | Escalonamiento Diagonal S → V → O</span>
                    <span>Lectura visual</span>
                  </div>
                  <div className="divide-y divide-slate-200/70 dark:divide-slate-800/70">
                    {ex.rozanLines.map((line, i) => (
                      <div
                        key={i}
                        className="grid grid-cols-12 items-center text-xs sm:text-sm"
                      >
                        <div className="col-span-2 px-3 py-2.5 font-mono font-semibold text-amber-600 dark:text-amber-400 border-r border-slate-200 dark:border-slate-800 text-center">
                          {line.margin || '·'}
                        </div>
                        <div className="col-span-10 px-4 py-2.5 space-y-0.5">
                          <div
                            className={`font-mono font-semibold text-slate-900 dark:text-slate-100 ${
                              line.indent === 0 ? 'pl-0' : line.indent === 1 ? 'pl-6' : 'pl-12'
                            }`}
                          >
                            {line.notation}
                          </div>
                          <div
                            className={`text-[11px] text-slate-500 dark:text-slate-400 ${
                              line.indent === 0 ? 'pl-0' : line.indent === 1 ? 'pl-6' : 'pl-12'
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
        <SymbolLibrary uiLang={uiLang} onJumpToStudio={onJumpToStudio} />
      )}
    </section>
  );
};
