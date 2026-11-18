import React, { useMemo, useState } from 'react';
import { BookOpenCheck, Check, Copy, Search } from 'lucide-react';
import {
  EXTENDED_NOTE_SYMBOLS,
  SYMBOL_CATEGORY_LABELS,
} from '../data/techniquesAndSymbols';
import type { NoteSymbol, NoteSymbolCategory, UiLang } from '../types';

interface SymbolLibraryProps {
  uiLang: UiLang;
  onJumpToStudio?: (mode: 'simultaneous' | 'consecutive') => void;
}

export const SymbolLibrary: React.FC<SymbolLibraryProps> = ({
  uiLang,
  onJumpToStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NoteSymbolCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbolId, setSelectedSymbolId] = useState<string>(
    EXTENDED_NOTE_SYMBOLS[0].id
  );
  const [copiedId, setCopiedId] = useState<string>('');

  const categoryCounts = useMemo(() => {
    const counts: Record<NoteSymbolCategory | 'all', number> = {
      all: EXTENDED_NOTE_SYMBOLS.length,
      logic: 0,
      diplomacy: 0,
      economy: 0,
      time: 0,
      stance: 0,
      verbs: 0,
      modifiers: 0,
    };
    for (const item of EXTENDED_NOTE_SYMBOLS) {
      counts[item.category] += 1;
    }
    return counts;
  }, []);

  const filteredSymbols = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return EXTENDED_NOTE_SYMBOLS.filter((item) => {
      const catMatch = selectedCategory === 'all' || item.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        item.symbol.toLowerCase().includes(q) ||
        item.meaning[uiLang].toLowerCase().includes(q) ||
        item.meaning.es.toLowerCase().includes(q) ||
        (item.applicationSentence || '').toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery, uiLang]);

  const activeSymbol: NoteSymbol = useMemo(() => {
    return (
      EXTENDED_NOTE_SYMBOLS.find((s) => s.id === selectedSymbolId) ||
      filteredSymbols[0] ||
      EXTENDED_NOTE_SYMBOLS[0]
    );
  }, [selectedSymbolId, filteredSymbols]);

  const handleCopySymbol = async (sym: NoteSymbol) => {
    try {
      await navigator.clipboard.writeText(sym.symbol);
      setCopiedId(sym.id);
      window.setTimeout(() => setCopiedId(''), 1500);
    } catch {
      // Clipboard API unavailable in restricted context; ignore silently
    }
  };

  return (
    <div className="space-y-5">
      {/* Header & Search Controls */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              <span>Biblioteca Interactiva</span>
              <span aria-hidden="true">·</span>
              <span>{EXTENDED_NOTE_SYMBOLS.length} símbolos esenciales</span>
              <span aria-hidden="true">·</span>
              <span>7 categorías</span>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 text-balance">
              Repertorio visual de símbolos para interpretación consecutiva
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Haz clic en cualquier símbolo de la cuadrícula para consultar su significado exacto,
              regla de uso y un ejemplo completo de aplicación en frase institucional.
            </p>
          </div>

          <label className="relative w-full lg:w-72 shrink-0">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar símbolo, concepto o frase..."
              aria-label="Buscar símbolo de toma de notas"
              className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/40 min-h-[42px]"
            />
          </label>
        </div>

        {/* Category Filter Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
          {(Object.keys(SYMBOL_CATEGORY_LABELS) as Array<NoteSymbolCategory | 'all'>).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 min-h-[36px] tabular-nums ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {SYMBOL_CATEGORY_LABELS[cat]} ({categoryCounts[cat]})
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Interactive Sandbox: Grid (7 cols) + Active Symbol Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Symbol Inspector (top on mobile, sticky right on desktop) */}
        <aside
          aria-live="polite"
          className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-20 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 sm:p-6 space-y-5"
        >
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-16 h-16 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0F17] flex items-center justify-center font-mono text-3xl font-bold text-sky-600 dark:text-sky-400 shrink-0">
                {activeSymbol.symbol}
              </div>
              <div className="min-w-0 space-y-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {SYMBOL_CATEGORY_LABELS[activeSymbol.category]}
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {activeSymbol.meaning[uiLang]}
                </h4>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleCopySymbol(activeSymbol)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
              title="Copiar símbolo al portapapeles"
            >
              {copiedId === activeSymbol.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
              ) : (
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
              )}
              <span>{copiedId === activeSymbol.id ? 'Copiado' : 'Copiar'}</span>
            </button>
          </div>

          <div className="space-y-4 text-sm">
            {activeSymbol.usageNote && (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Criterio de toma de notas
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {activeSymbol.usageNote}
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Frase de conferencia (origen oral)
              </div>
              <p className="text-slate-800 dark:text-slate-200 italic leading-relaxed text-sm">
                “{activeSymbol.applicationSentence}”
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                  Notación en cuaderno
                </span>
                <span className="font-mono">Abreviado: {activeSymbol.example}</span>
              </div>
              <pre className="font-mono text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 whitespace-pre-wrap leading-relaxed">
                {activeSymbol.applicationNotation}
              </pre>
            </div>
          </div>

          {onJumpToStudio && (
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
                Mostrando {filteredSymbols.length} de {EXTENDED_NOTE_SYMBOLS.length}
              </span>
              <button
                type="button"
                onClick={() => onJumpToStudio('consecutive')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3.5 py-2 text-xs font-medium text-white hover:bg-sky-500 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
              >
                <BookOpenCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Probar en cuaderno</span>
              </button>
            </div>
          )}
        </aside>

        {/* Interactive 84+ Symbol Grid */}
        <div className="order-2 lg:order-1 lg:col-span-7">
          {filteredSymbols.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-8 text-center space-y-2">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                No hay símbolos que coincidan con “{searchQuery}”.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {filteredSymbols.map((sym) => {
                const isSelected = sym.id === activeSymbol.id;
                return (
                  <button
                    key={sym.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedSymbolId(sym.id)}
                    className={`group rounded-xl border p-3 text-left transition-all flex flex-col justify-between gap-2 min-h-[86px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-500/10 dark:bg-sky-500/15'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] hover:border-sky-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 w-full">
                      <span
                        className={`font-mono text-2xl font-bold leading-none ${
                          isSelected
                            ? 'text-sky-600 dark:text-sky-300'
                            : 'text-sky-600 dark:text-sky-400'
                        }`}
                      >
                        {sym.symbol}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate">
                        {sym.example.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug">
                      {sym.meaning[uiLang]}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
