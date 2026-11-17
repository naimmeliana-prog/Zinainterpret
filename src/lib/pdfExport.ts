import { jsPDF } from 'jspdf';
import type { LocalPracticeSession } from '../types';

export function exportSessionsToPdf(sessions: LocalPracticeSession[], alias: string): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 18;

  const addLine = (text: string, size = 10, bold = false, color: [number, number, number] = [30, 41, 59]) => {
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

  addLine('CABINA — INFORME DE PRÁCTICA EN INTERPRETACIÓN', 15, true, [2, 132, 199]);
  addLine(
    `Intérprete: ${alias || 'Anónimo'}  |  Sesiones registradas: ${sessions.length}  |  Generado: ${new Date().toLocaleString()}`,
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
      `Fecha: ${new Date(s.createdAt).toLocaleString()}  |  Duración: ${s.durationSec}s`,
      9,
      false,
      [71, 85, 105]
    );

    if (s.evaluation) {
      addLine(
        `Fluidez: ${s.evaluation.fluencyScore}/100  ·  Precisión: ${s.evaluation.precisionScore}/100  ·  Entonación: ${s.evaluation.intonationScore}/100  ·  Velocidad: ${s.evaluation.estimatedWpm} PPM`,
        10,
        true,
        [5, 150, 105]
      );
      if (s.evaluation.transcript) {
        addLine(`Transcripción registrada: "${s.evaluation.transcript}"`, 9, false, [30, 41, 59]);
      }
      if (s.evaluation.semanticFidelityFeedback) {
        addLine(`Fidelidad semántica: ${s.evaluation.semanticFidelityFeedback}`, 9, false, [51, 65, 85]);
      }
      if (s.evaluation.prosodyAndIntonationFeedback) {
        addLine(`Prosodia y entonación: ${s.evaluation.prosodyAndIntonationFeedback}`, 9, false, [51, 65, 85]);
      }
      if (s.evaluation.pauseAnalysis) {
        addLine(`Control de pausas: ${s.evaluation.pauseAnalysis}`, 9, false, [51, 65, 85]);
      }
    }

    if (s.notesText?.trim()) {
      addLine(`Notas consecutivas: ${s.notesText.trim()}`, 9, false, [71, 85, 105]);
    }
    y += 4;
  });

  doc.save(`cabina-informe-${new Date().toISOString().slice(0, 10)}.pdf`);
}

export function exportSessionsToJson(sessions: LocalPracticeSession[]): void {
  const sanitized = sessions.map((s) => ({
    ...s,
    // Keep downloadable bundle compact while preserving audio if present
    exportedAt: new Date().toISOString(),
  }));
  const blob = new Blob([JSON.stringify(sanitized, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cabina-sesiones-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportSessionsToMarkdown(sessions: LocalPracticeSession[], alias: string): void {
  const lines: string[] = [
    `# Cabina — Registro de Práctica (${alias || 'Anónimo'})`,
    `Exportado: ${new Date().toISOString()}`,
    '',
  ];
  sessions.forEach((s, idx) => {
    lines.push(`## ${idx + 1}. ${s.exerciseTitle}`);
    lines.push(`- **Modalidad**: ${s.mode} (${s.sourceLang.toUpperCase()} -> ${s.targetLang.toUpperCase()})`);
    lines.push(`- **Fecha**: ${s.createdAt}`);
    lines.push(`- **Duración**: ${s.durationSec}s`);
    if (s.evaluation) {
      lines.push(
        `- **Métricas**: Fluidez ${s.evaluation.fluencyScore}/100 · Precisión ${s.evaluation.precisionScore}/100 · Entonación ${s.evaluation.intonationScore}/100 · ${s.evaluation.estimatedWpm} PPM`
      );
      lines.push(`- **Transcripción**: ${s.evaluation.transcript}`);
      lines.push(`- **Fidelidad**: ${s.evaluation.semanticFidelityFeedback}`);
      lines.push(`- **Prosodia**: ${s.evaluation.prosodyAndIntonationFeedback}`);
    }
    if (s.notesText) {
      lines.push(`- **Notas**:\n\n\`\`\`\n${s.notesText}\n\`\`\``);
    }
    lines.push('');
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `cabina-notas-${new Date().toISOString().slice(0, 10)}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
