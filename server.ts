import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import http from 'http';
import path from 'path';
import {
  evaluateInterpretation,
  generateConferenceSpeechAudio,
  suggestNoteSymbols,
} from './src/server/geminiService.ts';

async function startServer() {
  const app = express();
  const httpServer = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '25mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/gemini/tts', async (req, res) => {
    try {
      const { text, lang, voiceName, style } = req.body || {};
      if (typeof text !== 'string' || !text.trim()) {
        return res.status(400).json({ error: 'Missing required "text" field.' });
      }
      const audio = await generateConferenceSpeechAudio({
        text,
        lang: typeof lang === 'string' ? lang : 'en',
        voiceName: typeof voiceName === 'string' ? voiceName : undefined,
        style: typeof style === 'string' ? style : undefined,
      });
      return res.json(audio);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'TTS generation failed.';
      console.error('[/api/gemini/tts]', message);
      return res.status(500).json({ error: message });
    }
  });

  app.post('/api/gemini/evaluate', async (req, res) => {
    try {
      const body = req.body || {};
      if (typeof body.sourceTranscript !== 'string' || !body.sourceTranscript.trim()) {
        return res.status(400).json({ error: 'Missing required "sourceTranscript" field.' });
      }
      const result = await evaluateInterpretation({
        audioBase64: typeof body.audioBase64 === 'string' ? body.audioBase64 : undefined,
        mimeType: typeof body.mimeType === 'string' ? body.mimeType : undefined,
        userTextOverride:
          typeof body.userTextOverride === 'string' ? body.userTextOverride : undefined,
        sourceTranscript: body.sourceTranscript,
        sourceLang: typeof body.sourceLang === 'string' ? body.sourceLang : 'en',
        targetLang: typeof body.targetLang === 'string' ? body.targetLang : 'es',
        uiLang: typeof body.uiLang === 'string' ? body.uiLang : 'es',
        mode: body.mode === 'consecutive' ? 'consecutive' : 'simultaneous',
        durationSec: typeof body.durationSec === 'number' ? body.durationSec : 30,
        notesSummary: typeof body.notesSummary === 'string' ? body.notesSummary : undefined,
      });
      return res.json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Evaluation failed.';
      console.error('[/api/gemini/evaluate]', message);
      return res.status(500).json({ error: message });
    }
  });

  app.post('/api/gemini/note-symbols', async (req, res) => {
    try {
      const { excerpt, sourceLang, uiLang } = req.body || {};
      if (typeof excerpt !== 'string' || !excerpt.trim()) {
        return res.status(400).json({ error: 'Missing required "excerpt" field.' });
      }
      const data = await suggestNoteSymbols({
        excerpt,
        sourceLang: typeof sourceLang === 'string' ? sourceLang : 'en',
        uiLang: typeof uiLang === 'string' ? uiLang : 'es',
      });
      return res.json(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Symbol suggestion failed.';
      console.error('[/api/gemini/note-symbols]', message);
      return res.status(500).json({ error: message });
    }
  });

  const distDir = path.resolve(process.cwd(), 'dist');
  const isProd = process.env.NODE_ENV === 'production' && fs.existsSync(path.join(distDir, 'index.html'));

  if (!isProd) {
    const hmrEnabled = process.env.ENABLE_HMR === 'true';
    if (!hmrEnabled) {
      app.get('/@vite/client', (_req, res, next) => {
        const origEnd = res.end.bind(res);
        const chunks: Buffer[] = [];
        res.write = ((chunk: unknown) => {
          if (chunk) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
          }
          return true;
        }) as typeof res.write;
        res.end = ((chunk?: unknown) => {
          if (chunk && typeof chunk !== 'function') {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
          }
          let body = Buffer.concat(chunks).toString('utf-8');
          body = body
            .replace(/await wsTransport\.connect\(handlers\);/g, 'return;')
            .replace(/ws\.send\(JSON\.stringify\(data\)\);/g, 'ws?.send(JSON.stringify(data));')
            .replace(/wsTransport\.send\(data\);/g, 'return;');
          if (!res.headersSent) {
            res.setHeader('Content-Length', Buffer.byteLength(body));
          }
          return origEnd(body);
        }) as typeof res.end;
        next();
      });
    }

    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        ws: hmrEnabled ? { server: httpServer } : false,
        hmr: hmrEnabled ? { server: httpServer } : false,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Cabina server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
