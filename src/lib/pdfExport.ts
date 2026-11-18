import { jsPDF } from 'jspdf';
import type { LocalPracticeSession, UiLang } from '../types';

interface ExportCopy {
  pdfTitle: string;
  interpreter: string;
  anonymous: string;
  recordedSessions: string;
  generated: string;
  date: string;
  duration: string;
  fluency: string;
  precision: string;
  intonation: string;
  speed: string;
  wpmUnit: string;
  transcript: string;
  fidelity: string;
  prosody: string;
  pauseControl: string;
  notes: string;
  mdHeading: string;
  exported: string;
  mode: string;
  metrics: string;
}

const EXPORT_COPY: Record<UiLang, ExportCopy> = {
  es: {
    pdfTitle: 'CABINA — INFORME DE PRÁCTICA EN INTERPRETACIÓN',
    interpreter: 'Intérprete',
    anonymous: 'Anónimo',
    recordedSessions: 'Sesiones registradas',
    generated: 'Generado',
    date: 'Fecha',
    duration: 'Duración',
    fluency: 'Fluidez',
    precision: 'Precisión',
    intonation: 'Entonación',
    speed: 'Velocidad',
    wpmUnit: 'PPM',
    transcript: 'Transcripción registrada',
    fidelity: 'Fidelidad semántica',
    prosody: 'Prosodia y entonación',
    pauseControl: 'Control de pausas',
    notes: 'Notas consecutivas',
    mdHeading: 'Cabina — Registro de Práctica',
    exported: 'Exportado',
    mode: 'Modalidad',
    metrics: 'Métricas',
  },
  fr: {
    pdfTitle: 'CABINA — RAPPORT DE PRATIQUE EN INTERPRÉTATION',
    interpreter: 'Interprète',
    anonymous: 'Anonyme',
    recordedSessions: 'Séances enregistrées',
    generated: 'Généré le',
    date: 'Date',
    duration: 'Durée',
    fluency: 'Fluidité',
    precision: 'Précision',
    intonation: 'Intonation',
    speed: 'Débit',
    wpmUnit: 'MPM',
    transcript: 'Transcription enregistrée',
    fidelity: 'Fidélité sémantique',
    prosody: 'Prosodie et intonation',
    pauseControl: 'Gestion des pauses',
    notes: 'Notes consécutives',
    mdHeading: 'Cabina — Journal de Pratique',
    exported: 'Exporté le',
    mode: 'Modalité',
    metrics: 'Indicateurs',
  },
  ar: {
    pdfTitle: 'CABINA — تقرير التدريب على الترجمة الفورية والتتبعية',
    interpreter: 'المترجم',
    anonymous: 'مجهول',
    recordedSessions: 'الجلسات المسجلة',
    generated: 'تاريخ الإنشاء',
    date: 'التاريخ',
    duration: 'المدة',
    fluency: 'الطلاقة',
    precision: 'الدقة',
    intonation: 'التنغيم',
    speed: 'السرعة',
    wpmUnit: 'كلمة/د',
    transcript: 'النص المفرغ المسجل',
    fidelity: 'الأمانة الدلالية',
    prosody: 'النبرة والتنغيم',
    pauseControl: 'ضبط الوقفات',
    notes: 'ملاحظات الترجمة التتبعية',
    mdHeading: 'Cabina — سجل التدريب',
    exported: 'تاريخ التصدير',
    mode: 'الوضع',
    metrics: 'المؤشرات',
  },
};

const HAS_ARABIC_REGEX = /[\u0600-\u06FF]/;

function exportViaCanvasRtlPdf(
  sessions: LocalPracticeSession[],
  alias: string,
  uiLang: UiLang,
  copy: ExportCopy
): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidthPx = 1240;
  const pageHeightPx = 1754;
  const marginX = 84;
  const maxWidth = pageWidthPx - marginX * 2;
  const isRtl = uiLang === 'ar';

  const createPageCanvas = (): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } => {
    const canvas = document.createElement('canvas');
    canvas.width = pageWidthPx;
    canvas.height = pageHeightPx;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageWidthPx, pageHeightPx);
    ctx.direction = isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = isRtl ? 'right' : 'left';
    ctx.textBaseline = 'top';
    return { canvas, ctx };
  };

  let { canvas, ctx } = createPageCanvas();
  let y = 84;
  let pageCount = 0;

  const commitPage = () => {
    if (pageCount > 0) doc.addPage();
    doc.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pageCount += 1;
  };

  const wrapLines = (text: string, font: string): string[] => {
    ctx.font = font;
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let current = '';
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (ctx.measureText(candidate).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = candidate;
      }
    }
    if (current) lines.push(current);
    return lines.length > 0 ? lines : [''];
  };

  const drawText = (text: string, sizePx: number, bold: boolean, color: string, gapAfter = 10) => {
    const fontFamily = '"IBM Plex Sans Arabic", "Plus Jakarta Sans", system-ui, sans-serif';
    const font = `${bold ? '700' : '400'} ${sizePx}px ${fontFamily}`;
    const lines = wrapLines(text, font);
    const lineHeight = Math.round(sizePx * 1.48);

    ctx.font = font;
    ctx.fillStyle = color;
    ctx.direction = HAS_ARABIC_REGEX.test(text) || isRtl ? 'rtl' : 'ltr';
    ctx.textAlign = ctx.direction === 'rtl' ? 'right' : 'left';
    const drawX = ctx.direction === 'rtl' ? pageWidthPx - marginX : marginX;

    for (const line of lines) {
      if (y + lineHeight > pageHeightPx - 84) {
        commitPage();
        ({ canvas, ctx } = createPageCanvas());
        ctx.font = font;
        ctx.fillStyle = color;
        ctx.direction = HAS_ARABIC_REGEX.test(text) || isRtl ? 'rtl' : 'ltr';
        ctx.textAlign = ctx.direction === 'rtl' ? 'right' : 'left';
        y = 84;
      }
      ctx.fillText(line, drawX, y);
      y += lineHeight;
    }
    y += gapAfter;
  };

  drawText(copy.pdfTitle, 34, true, '#0284c7', 12);
  drawText(
    `${copy.interpreter}: ${alias || copy.anonymous}  |  ${copy.recordedSessions}: ${sessions.length}  |  ${copy.generated}: ${new Date().toLocaleString(uiLang)}`,
    22,
    false,
    '#64748b',
    24
  );

  sessions.forEach((s, index) => {
    drawText(
      `${index + 1}. ${s.exerciseTitle} (${s.mode.toUpperCase()} · ${s.sourceLang.toUpperCase()} → ${s.targetLang.toUpperCase()})`,
      26,
      true,
      '#0f172a',
      8
    );
    drawText(
      `${copy.date}: ${new Date(s.createdAt).toLocaleString(uiLang)}  |  ${copy.duration}: ${s.durationSec}s`,
      21,
      false,
      '#475569',
      10
    );

    if (s.evaluation) {
      drawText(
        `${copy.fluency}: ${s.evaluation.fluencyScore}/100  ·  ${copy.precision}: ${s.evaluation.precisionScore}/100  ·  ${copy.intonation}: ${s.evaluation.intonationScore}/100  ·  ${copy.speed}: ${s.evaluation.estimatedWpm} ${copy.wpmUnit}`,
        22,
        true,
        '#059669',
        10
      );
      if (s.evaluation.transcript) {
        drawText(`${copy.transcript}: "${s.evaluation.transcript}"`, 21, false, '#1e293b', 8);
      }
      if (s.evaluation.semanticFidelityFeedback) {
        drawText(
          `${copy.fidelity}: ${s.evaluation.semanticFidelityFeedback}`,
          21,
          false,
          '#334155',
          8
        );
      }
      if (s.evaluation.prosodyAndIntonationFeedback) {
        drawText(
          `${copy.prosody}: ${s.evaluation.prosodyAndIntonationFeedback}`,
          21,
          false,
          '#334155',
          8
        );
      }
      if (s.evaluation.pauseAnalysis) {
        drawText(`${copy.pauseControl}: ${s.evaluation.pauseAnalysis}`, 21, false, '#334155', 8);
      }
    }

    if (s.notesText?.trim()) {
      drawText(`${copy.notes}: ${s.notesText.trim()}`, 20, false, '#475569', 16);
    } else {
      y += 14;
    }
  });

  commitPage();
  doc.save(`cabina-report-${uiLang}-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportSessionsToPdf(
  sessions: LocalPracticeSession[],
  alias: string,
  uiLang: UiLang = 'es'
): void {
  const copy = EXPORT_COPY[uiLang] ?? EXPORT_COPY.es;

  const containsArabic =
    uiLang === 'ar' ||
    HAS_ARABIC_REGEX.test(alias) ||
    sessions.some(
      (s) =>
        HAS_ARABIC_REGEX.test(s.exerciseTitle) ||
        HAS_ARABIC_REGEX.test(s.notesText || '') ||
        HAS_ARABIC_REGEX.test(s.evaluation?.transcript || '') ||
        HAS_ARABIC_REGEX.test(s.evaluation?.semanticFidelityFeedback || '')
    );

  if (containsArabic && typeof document !== 'undefined') {
    exportViaCanvasRtlPdf(sessions, alias, uiLang, copy);
    return;
  }

  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  const addLine = (
    text: string,
    size = 10,
    bold = false,
    color: [number, number, number] = [30, 41, 59]
  ) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, pageWidth - 28);
    for (const line of lines) {
      if (y > 275) {
        doc.addPage();
        y = 18;
      }
      doc.text(line, 14, y);
      y += size * 0.46;
    }
    y += 2;
  };

  addLine(copy.pdfTitle, 15, true, [2, 132, 199]);
  addLine(
    `${copy.interpreter}: ${alias || copy.anonymous}  |  ${copy.recordedSessions}: ${sessions.length}  |  ${copy.generated}: ${new Date().toLocaleString(uiLang)}`,
    9,
    false,
    [100, 116, 139]
  );
  y += 4;

  sessions.forEach((s, index) => {
    addLine(
      `${index + 1}. ${s.exerciseTitle} (${s.mode.toUpperCase()} · ${s.sourceLang.toUpperCase()} → ${s.targetLang.toUpperCase()})`,
      11,
      true,
      [15, 23, 42]
    );
    addLine(
      `${copy.date}: ${new Date(s.createdAt).toLocaleString(uiLang)}  |  ${copy.duration}: ${s.durationSec}s`,
      9,
      false,
      [71, 85, 105]
    );

    if (s.evaluation) {
      addLine(
        `${copy.fluency}: ${s.evaluation.fluencyScore}/100  ·  ${copy.precision}: ${s.evaluation.precisionScore}/100  ·  ${copy.intonation}: ${s.evaluation.intonationScore}/100  ·  ${copy.speed}: ${s.evaluation.estimatedWpm} ${copy.wpmUnit}`,
        10,
        true,
        [5, 150, 105]
      );
      if (s.evaluation.transcript) {
        addLine(`${copy.transcript}: "${s.evaluation.transcript}"`, 9, false, [30, 41, 59]);
      }
      if (s.evaluation.semanticFidelityFeedback) {
        addLine(
          `${copy.fidelity}: ${s.evaluation.semanticFidelityFeedback}`,
          9,
          false,
          [51, 65, 85]
        );
      }
      if (s.evaluation.prosodyAndIntonationFeedback) {
        addLine(
          `${copy.prosody}: ${s.evaluation.prosodyAndIntonationFeedback}`,
          9,
          false,
          [51, 65, 85]
        );
      }
      if (s.evaluation.pauseAnalysis) {
        addLine(`${copy.pauseControl}: ${s.evaluation.pauseAnalysis}`, 9, false, [51, 65, 85]);
      }
    }

    if (s.notesText?.trim()) {
      addLine(`${copy.notes}: ${s.notesText.trim()}`, 9, false, [71, 85, 105]);
    }
    y += 4;
  });

  doc.save(`cabina-report-${uiLang}-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportSessionsToJson(sessions: LocalPracticeSession[]): void {
  const sanitized = sessions.map((s) => ({
    ...s,
    exportedAt: new Date().toISOString(),
  }));
  const blob = new Blob([JSON.stringify(sanitized, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cabina-sessions-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSessionsToMarkdown(
  sessions: LocalPracticeSession[],
  alias: string,
  uiLang: UiLang = 'es'
): void {
  const copy = EXPORT_COPY[uiLang] ?? EXPORT_COPY.es;
  const lines: string[] = [
    `# ${copy.mdHeading} (${alias || copy.anonymous})`,
    `${copy.exported}: ${new Date().toISOString()}`,
    '',
  ];
  sessions.forEach((s, idx) => {
    lines.push(`## ${idx + 1}. ${s.exerciseTitle}`);
    lines.push(
      `- **${copy.mode}**: ${s.mode} (${s.sourceLang.toUpperCase()} -> ${s.targetLang.toUpperCase()})`
    );
    lines.push(`- **${copy.date}**: ${s.createdAt}`);
    lines.push(`- **${copy.duration}**: ${s.durationSec}s`);
    if (s.evaluation) {
      lines.push(
        `- **${copy.metrics}**: ${copy.fluency} ${s.evaluation.fluencyScore}/100 · ${copy.precision} ${s.evaluation.precisionScore}/100 · ${copy.intonation} ${s.evaluation.intonationScore}/100 · ${s.evaluation.estimatedWpm} ${copy.wpmUnit}`
      );
      lines.push(`- **${copy.transcript}**: ${s.evaluation.transcript}`);
      lines.push(`- **${copy.fidelity}**: ${s.evaluation.semanticFidelityFeedback}`);
      lines.push(`- **${copy.prosody}**: ${s.evaluation.prosodyAndIntonationFeedback}`);
    }
    if (s.notesText) {
      lines.push(`- **${copy.notes}**:\n\n\`\`\`\n${s.notesText}\n\`\`\``);
    }
    lines.push('');
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cabina-notes-${uiLang}-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
