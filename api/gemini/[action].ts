import type { IncomingMessage, ServerResponse } from 'http';
import {
  evaluateInterpretation,
  generateConferenceSpeechAudio,
  suggestNoteSymbols,
} from '../../src/server/geminiService.js';

interface VercelReq extends IncomingMessage {
  body?: Record<string, unknown>;
  query?: Record<string, string | string[]>;
  method?: string;
}

interface VercelRes extends ServerResponse {
  status: (code: number) => VercelRes;
  json: (data: unknown) => void;
}

export default async function handler(req: VercelReq, res: VercelRes) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const action = Array.isArray(req.query?.action) ? req.query?.action[0] : req.query?.action;
  const body = (req.body || {}) as Record<string, unknown>;

  try {
    if (action === 'tts') {
      const audio = await generateConferenceSpeechAudio({
        text: String(body.text || ''),
        lang: String(body.lang || 'en'),
        voiceName: typeof body.voiceName === 'string' ? body.voiceName : undefined,
        style: typeof body.style === 'string' ? body.style : undefined,
      });
      return res.status(200).json(audio);
    }

    if (action === 'evaluate') {
      const result = await evaluateInterpretation({
        audioBase64: typeof body.audioBase64 === 'string' ? body.audioBase64 : undefined,
        mimeType: typeof body.mimeType === 'string' ? body.mimeType : undefined,
        userTextOverride: typeof body.userTextOverride === 'string' ? body.userTextOverride : undefined,
        sourceTranscript: String(body.sourceTranscript || ''),
        sourceLang: String(body.sourceLang || 'en'),
        targetLang: String(body.targetLang || 'es'),
        uiLang: String(body.uiLang || 'es'),
        mode: body.mode === 'consecutive' ? 'consecutive' : 'simultaneous',
        durationSec: typeof body.durationSec === 'number' ? body.durationSec : 30,
        notesSummary: typeof body.notesSummary === 'string' ? body.notesSummary : undefined,
      });
      return res.status(200).json(result);
    }

    if (action === 'note-symbols') {
      const result = await suggestNoteSymbols({
        excerpt: String(body.excerpt || ''),
        sourceLang: String(body.sourceLang || 'en'),
        uiLang: String(body.uiLang || 'es'),
      });
      return res.status(200).json(result);
    }

    return res.status(404).json({ error: 'Unknown Gemini endpoint action' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    return res.status(500).json({ error: message });
  }
}
