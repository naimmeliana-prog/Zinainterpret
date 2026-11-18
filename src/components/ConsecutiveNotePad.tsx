import React, { useEffect, useRef, useState } from 'react';
import { Eraser, Sparkles, Undo2 } from 'lucide-react';
import {
  EXTENDED_NOTE_SYMBOLS,
  SYMBOL_CATEGORY_LABELS,
} from '../data/techniquesAndSymbols';
import type { NoteSymbolCategory, SpeechLang, UiLang } from '../types';
import type { Translations } from '../i18n/translations';

interface SuggestedSymbol {
  concept: string;
  symbol: string;
  abbreviation?: string;
  principle?: string;
}

interface ConsecutiveNotePadProps {
  uiLang: UiLang;
  sourceLang: SpeechLang;
  sourceExcerpt: string;
  t: Translations;
  notesText: string;
  onNotesTextChange: (val: string) => void;
  onCanvasSnapshotChange: (dataUrl: string) => void;
}

export const ConsecutiveNotePad: React.FC<ConsecutiveNotePadProps> = ({
  uiLang,
  sourceLang,
  sourceExcerpt,
  t,
  notesText,
  onNotesTextChange,
  onCanvasSnapshotChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [aiSuggestions, setAiSuggestions] = useState<SuggestedSymbol[]>([]);
  const [layoutTip, setLayoutTip] = useState('');
  const [loadingSymbols, setLoadingSymbols] = useState(false);
  const [symbolError, setSymbolError] = useState('');
  const [activeTab, setActiveTab] = useState<'canvas' | 'structured'>('canvas');
  const [symbolFilter, setSymbolFilter] = useState<NoteSymbolCategory | 'all'>('all');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    drawPadGuides(ctx, rect.width, rect.height);
  }, [activeTab]);

  const drawPadGuides = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.16)';
    ctx.lineWidth = 1;
    // Rozan vertical left margin line for links & connectors
    ctx.beginPath();
    ctx.moveTo(54, 0);
    ctx.lineTo(54, h);
    ctx.stroke();
    // Horizontal ruled lines
    for (let y = 36; y < h; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.setPointerCapture(e.pointerId);

    const snap = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => [...prev.slice(-14), snap]);

    const { x, y } = getPoint(e);
    const isDark = document.documentElement.classList.contains('dark');
    ctx.strokeStyle = isDark ? '#F8FAFC' : '#0F172A';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getPoint(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (canvasRef.current) {
      onCanvasSnapshotChange(canvasRef.current.toDataURL('image/png'));
    }
  };

  const handleUndo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const last = history[history.length - 1];
    ctx.putImageData(last, 0, 0);
    setHistory((prev) => prev.slice(0, -1));
    onCanvasSnapshotChange(canvas.toDataURL('image/png'));
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    drawPadGuides(ctx, rect.width, rect.height);
    setHistory([]);
    onCanvasSnapshotChange('');
  };

  const insertSymbol = (sym: string) => {
    const next = notesText ? `${notesText} ${sym} ` : `${sym} `;
    onNotesTextChange(next);
    if (activeTab === 'canvas' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        const isDark = document.documentElement.classList.contains('dark');
        ctx.fillStyle = isDark ? '#38BDF8' : '#0284C7';
        ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
        const yPos = 32 + ((notesText.length * 7) % 180);
        const xPos = 68 + ((notesText.length * 13) % 160);
        ctx.fillText(sym, xPos, yPos);
        onCanvasSnapshotChange(canvasRef.current.toDataURL('image/png'));
      }
    }
  };

  const insertRozanTemplate = () => {
    const template =
      '[Margen: ∵ / ∥ / ∴]\n  Sujeto\n      → Verbo\n          Objeto / Cifra\n────────────────────────\n';
    onNotesTextChange(notesText ? `${notesText}\n${template}` : template);
  };

  const requestAiSymbols = async () => {
    setLoadingSymbols(true);
    setSymbolError('');
    try {
      const res = await fetch('/api/gemini/note-symbols', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excerpt: sourceExcerpt,
          sourceLang,
          uiLang,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error');
      setAiSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []);
      setLayoutTip(String(data.layoutTip || ''));
    } catch (err) {
      setSymbolError(err instanceof Error ? err.message : 'No disponible sin conexión');
    } finally {
      setLoadingSymbols(false);
    }
  };

  const filteredSymbols =
    symbolFilter === 'all'
      ? EXTENDED_NOTE_SYMBOLS
      : EXTENDED_NOTE_SYMBOLS.filter((s) => s.category === symbolFilter);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {t.notesTitle}
        </h3>
        <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-900">
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'canvas'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Lienzo Táctil
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('structured')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'structured'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Esquema S-V-O
          </button>
        </div>
      </div>

      {activeTab === 'canvas' ? (
        <div className="space-y-2.5">
          <div className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] overflow-hidden">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="w-full h-56 touch-none cursor-crosshair block"
            />
            <div className="absolute top-2 left-2 pointer-events-none text-[10px] font-mono text-slate-400">
              Margen ∵ ∴ ∥
            </div>
            <div className="absolute top-2 right-2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0}
                className="p-2 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 disabled:opacity-40 min-h-[38px] min-w-[38px] flex items-center justify-center"
                title="Deshacer"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 min-h-[38px]"
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>{t.clearCanvas}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Escalonamiento diagonal: Margen → Sujeto → Verbo → Objeto</span>
          <button
            type="button"
            onClick={insertRozanTemplate}
            className="text-xs font-medium text-sky-600 dark:text-sky-400 hover:underline whitespace-nowrap shrink-0"
          >
            + Plantilla diagonal S-V-O
          </button>
        </div>
      )}

      <textarea
        value={notesText}
        onChange={(e) => onNotesTextChange(e.target.value)}
        rows={activeTab === 'structured' ? 7 : 3}
        placeholder={t.notesPlaceholder}
        className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F17] px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 font-mono"
      />

      <div className="space-y-3 pt-1 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
            {t.symbolPaletteTitle} ({filteredSymbols.length})
          </span>
          <button
            type="button"
            onClick={() => void requestAiSymbols()}
            disabled={loadingSymbols}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/10 text-sky-700 dark:text-sky-300 border border-sky-500/30 text-xs font-medium hover:bg-sky-600/20 transition-colors disabled:opacity-50 whitespace-nowrap shrink-0 min-h-[36px]"
          >
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{loadingSymbols ? t.suggestingSymbols : t.aiSymbolSuggestions}</span>
          </button>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {(Object.keys(SYMBOL_CATEGORY_LABELS) as Array<NoteSymbolCategory | 'all'>).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSymbolFilter(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                symbolFilter === cat
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {SYMBOL_CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-60 overflow-y-auto pr-1">
          {filteredSymbols.map((item) => (
            <button
              key={item.id}
              type="button"
              title={`${item.meaning[uiLang]} — ${item.example}`}
              onClick={() => insertSymbol(item.symbol)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B0F17] px-2.5 py-2 text-left hover:border-sky-500/50 transition-colors min-h-[44px]"
            >
              <span className="font-mono text-base font-semibold text-sky-600 dark:text-sky-400 w-7 text-center shrink-0">
                {item.symbol}
              </span>
              <div className="min-w-0">
                <div className="text-xs text-slate-800 dark:text-slate-200 truncate">
                  {item.meaning[uiLang]}
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  {item.example}
                </div>
              </div>
            </button>
          ))}
        </div>

        {symbolError && (
          <p className="text-xs text-amber-600 dark:text-amber-400">{symbolError}</p>
        )}

        {aiSuggestions.length > 0 && (
          <div className="pt-2 space-y-2">
            {layoutTip && (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {layoutTip}
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {aiSuggestions.map((s, idx) => (
                <button
                  key={`${s.concept}-${idx}`}
                  type="button"
                  onClick={() => insertSymbol(s.symbol || s.abbreviation || s.concept)}
                  className="flex items-center justify-between gap-2 rounded-lg border border-sky-500/30 bg-sky-500/5 px-3 py-2 text-left hover:bg-sky-500/10 transition-colors min-h-[44px]"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-900 dark:text-slate-100 truncate">
                      {s.concept}
                    </div>
                    {s.principle && (
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {s.principle}
                      </div>
                    )}
                  </div>
                  <span className="font-mono text-sm font-semibold text-sky-600 dark:text-sky-400 shrink-0">
                    {s.symbol || s.abbreviation}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
