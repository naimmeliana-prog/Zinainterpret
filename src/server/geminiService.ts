import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

let cachedAi: GoogleGenAI | null = null;
let cachedTtsAi: GoogleGenAI | null = null;

export class GeminiServiceError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = 'GeminiServiceError';
    this.status = status;
  }
}

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiServiceError('GEMINI_API_KEY is not configured in the server environment.', 500);
  }
  if (!cachedAi) {
    cachedAi = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedAi;
}

export function getTtsGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new GeminiServiceError('GEMINI_API_KEY is not configured in the server environment.', 500);
  }
  if (!cachedTtsAi) {
    // @google/genai 3.4 defaults to v1; speechConfig and speechMetadata require v1beta
    cachedTtsAi = new GoogleGenAI({
      apiKey,
      apiVersion: 'v1beta',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return cachedTtsAi;
}

function parseUpstreamError(err: unknown): { code: number; message: string; transient: boolean } {
  const raw = err instanceof Error ? err.message : String(err || 'Upstream error');
  let code = 500;
  let message = raw;
  let statusStr = '';

  const obj = err as Record<string, unknown> | null;
  if (obj && typeof obj.status === 'number') {
    code = obj.status;
  }

  try {
    const parsed = JSON.parse(raw) as {
      error?: { code?: number; message?: string; status?: string };
    };
    if (parsed?.error) {
      if (typeof parsed.error.code === 'number') code = parsed.error.code;
      if (typeof parsed.error.message === 'string') message = parsed.error.message;
      if (typeof parsed.error.status === 'string') statusStr = parsed.error.status;
    }
  } catch {
    const match = raw.match(/"code"\s*:\s*(\d{3})/);
    if (match) code = Number(match[1]);
  }

  const transient =
    code === 503 ||
    code === 502 ||
    code === 504 ||
    statusStr === 'UNAVAILABLE' ||
    /high demand|unavailable|overloaded|try again later|temporarily/i.test(message);

  return { code, message, transient };
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<T>((_resolve, reject) => {
        timer = setTimeout(() => {
          reject(new GeminiServiceError(`${label}: Tiempo de espera agotado (503).`, 503));
        }, timeoutMs);
      }),
    ]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function withTransientRetry<T>(
  fn: () => Promise<T>,
  delaysMs: number[] = [400],
  timeoutMs = 18000,
  label = 'Gemini'
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 0; attempt <= delaysMs.length; attempt++) {
    try {
      return await withTimeout(fn(), timeoutMs, label);
    } catch (err) {
      lastErr = err;
      const parsed = parseUpstreamError(err);
      if (!parsed.transient || attempt === delaysMs.length) {
        throw err;
      }
      await sleep(delaysMs[attempt]);
    }
  }
  throw lastErr;
}

function toCleanServiceError(err: unknown, contextLabel: string): GeminiServiceError {
  if (err instanceof GeminiServiceError) return err;
  const parsed = parseUpstreamError(err);
  if (parsed.transient) {
    return new GeminiServiceError(
      `${contextLabel}: El servicio de IA tiene alta demanda temporal (503). Inténtalo de nuevo en unos segundos.`,
      503
    );
  }
  if (parsed.code === 429) {
    return new GeminiServiceError(
      `${contextLabel}: Límite temporal de solicitudes alcanzado (429). Espera unos segundos e inténtalo de nuevo.`,
      429
    );
  }
  return new GeminiServiceError(parsed.message || `${contextLabel} failed.`, parsed.code || 500);
}

export interface EvaluateRequestPayload {
  audioBase64?: string;
  mimeType?: string;
  userTextOverride?: string;
  sourceTranscript: string;
  sourceLang: string;
  targetLang: string;
  uiLang: string;
  mode: 'simultaneous' | 'consecutive';
  durationSec: number;
  notesSummary?: string;
}

export interface EvaluationResult {
  transcript: string;
  fluencyScore: number;
  precisionScore: number;
  intonationScore: number;
  estimatedWpm: number;
  pauseAnalysis: string;
  prosodyAndIntonationFeedback: string;
  semanticFidelityFeedback: string;
  actionableRecommendations: string[];
  suggestedSymbols: Array<{
    concept: string;
    symbol: string;
    category: string;
  }>;
}

function buildHumanConferenceVoiceDirection(
  lang: string,
  deliveryStyle: string
): { stylePrompt: string; useBreathCues: boolean } {
  const normalizedLang = lang === 'fr' || lang === 'ar' ? lang : 'es';

  const langVoiceTrait: Record<'es' | 'fr' | 'ar', string> = {
    es: 'Native Spanish speaker speaking authentically with warm chest resonance, natural Iberian or international diplomatic accent, subtle micro-variations in pitch and tempo, organic pauses to take a quiet breath between clauses, zero synthetic flatness or robotic cadence.',
    fr: 'Native French speaker speaking spontaneously at an international assembly with warm human timbre, smooth natural liaison, authentic French prosody, gentle breathing pauses between thoughts, expressive emphasis, never mechanical or synthetic.',
    ar: 'Native Arabic speaker delivering Modern Standard Arabic naturally with resonant human warmth, authentic Arabic articulation and organic phrasing, subtle breathing pauses at sentence boundaries, lively natural inflection, zero robotic monotone.',
  };

  if (deliveryStyle === 'measured') {
    return {
      stylePrompt: `${langVoiceTrait[normalizedLang]} Unhurried, thoughtful live consecutive speech with natural pauses for breathing and clear phrase endings as if speaking live to interpreters in the room.`,
      useBreathCues: true,
    };
  }

  if (deliveryStyle === 'diplomatic') {
    return {
      stylePrompt: `${langVoiceTrait[normalizedLang]} Warm, earnest, persuasive human delegate addressing colleagues in person without reading stiffly off a teleprompter.`,
      useBreathCues: true,
    };
  }

  return {
    stylePrompt: `${langVoiceTrait[normalizedLang]} Natural conversational live human speech with spontaneous rhythm, genuine human breath pacing, soft organic inflection, and realistic human presence.`,
    useBreathCues: true,
  };
}

function shapeTextWithNaturalBreathing(text: string): string {
  // Add natural breath marks between distinct sentences for gemini-3.8-flash-tts
  // so long plenary paragraphs sound genuinely human rather than breathless AI readout.
  const sentences = text
    .split(/(?<=[.!?؟])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (sentences.length <= 1) return text;
  return sentences
    .map((sentence, idx) => (idx > 0 && idx % 1 === 0 ? `<breath> ${sentence}` : sentence))
    .join(' ');
}

export async function generateConferenceSpeechAudio(params: {
  text: string;
  lang: string;
  voiceName?: string;
  style?: string;
}) {
  const ai = getTtsGeminiClient();
  const cleanText = params.text.trim().slice(0, 4500);
  if (!cleanText) {
    throw new GeminiServiceError('Speech text cannot be empty.', 400);
  }

  const allowedVoices = new Set(['Zephyr', 'Kore', 'Puck', 'Charon', 'Fenrir']);
  const voice = params.voiceName && allowedVoices.has(params.voiceName) ? params.voiceName : 'Zephyr';
  const deliveryKey = params.style || 'natural';
  const { stylePrompt, useBreathCues } = buildHumanConferenceVoiceDirection(params.lang, deliveryKey);
  const flagshipText = useBreathCues ? shapeTextWithNaturalBreathing(cleanText) : cleanText;

  const callTts = async (
    model: 'gemini-3.8-flash-tts' | 'gemini-3.8-flash-lite-tts',
    textBody: string,
    includeStyleMetadata = true
  ) =>
    ai.models.generateContent({
      model,
      contents: [
        {
          role: 'user',
          parts: [
            includeStyleMetadata
              ? {
                  text: textBody,
                  speechMetadata: {
                    style: stylePrompt,
                  },
                }
              : {
                  text: textBody,
                },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice },
          },
        },
      },
    });

  try {
    let response;
    try {
      // Flagship Voice Design TTS model for genuinely natural human prosody and <breath> phrasing
      response = await withTransientRetry(
        () => callTts('gemini-3.8-flash-tts', flagshipText, true),
        [],
        16000,
        'Síntesis vocal'
      );
    } catch (primaryErr) {
      const parsed = parseUpstreamError(primaryErr);
      const schemaReject =
        parsed.code === 400 && /speechMetadata|breath|Unsupported/i.test(parsed.message);
      if (parsed.transient || schemaReject) {
        // Fallback to high-efficiency TTS if flagship is temporarily busy or schema-restricted
        response = await withTransientRetry(
          () => callTts('gemini-3.8-flash-lite-tts', cleanText, !schemaReject),
          [400],
          15000,
          'Síntesis vocal'
        );
      } else {
        throw primaryErr;
      }
    }

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new GeminiServiceError('TTS model did not return audio data.', 502);
    }

    return {
      audioBase64: base64Audio,
      mimeType: 'audio/wav',
    };
  } catch (err) {
    throw toCleanServiceError(err, 'Síntesis de voz');
  }
}

export async function evaluateInterpretation(
  payload: EvaluateRequestPayload
): Promise<EvaluationResult> {
  const ai = getGeminiClient();
  let userTranscript = (payload.userTextOverride || '').trim();

  if (payload.audioBase64 && payload.mimeType) {
    const audioPart = {
      inlineData: {
        mimeType: payload.mimeType,
        data: payload.audioBase64,
      },
    };
    try {
      const transcribeRes = await withTransientRetry(() =>
        ai.models.generateContent({
          model: 'gemini-3.5-transcribe',
          contents: {
            parts: [
              audioPart,
              {
                text: `Transcribe this conference interpretation recording accurately in ${payload.targetLang}. Preserve hesitations, self-corrections, or incomplete clauses verbatim.`,
              },
            ],
          },
        })
      );
      userTranscript = (transcribeRes.text || '').trim();
    } catch (err) {
      throw toCleanServiceError(err, 'Transcripción de audio');
    }
  }

  if (!userTranscript) {
    throw new GeminiServiceError(
      'No speech was detected in the recording. Please record or enter an interpretation.',
      400
    );
  }

  const wordCount = userTranscript.split(/\s+/).filter(Boolean).length;
  const safeDuration = Math.max(payload.durationSec || 30, 5);
  const measuredWpm = Math.round((wordCount / safeDuration) * 60);

  const feedbackLang = payload.uiLang || 'es';

  const prompt = `Evaluate this ${payload.mode} conference interpretation performance.
Respond in language code "${feedbackLang}" (es = Spanish, fr = French, ar = Arabic).

Source language: ${payload.sourceLang}
Target language: ${payload.targetLang}
Recording duration: ${safeDuration} seconds
Measured speaking rate: ${measuredWpm} WPM

Original Source Speech (${payload.sourceLang}):
"""
${payload.sourceTranscript.slice(0, 4000)}
"""

Interpreter Output Transcript (${payload.targetLang}):
"""
${userTranscript.slice(0, 4000)}
"""
${payload.notesSummary ? `\nConsecutive Note-taking Summary:\n${payload.notesSummary.slice(0, 1000)}` : ''}

Provide an objective, constructive pedagogical assessment covering:
1. fluencyScore (0-100): smoothness, ear-voice span / decalage control, lack of disruptive fillers.
2. precisionScore (0-100): semantic fidelity, diplomatic terminology, numbers, and register accuracy.
3. intonationScore (0-100): prosody, assertive conference delivery, cadence, and sentence closure.
4. estimatedWpm: realistic speaking rate integer (close to ${measuredWpm}).
5. pauseAnalysis: concise assessment of pacing, silences, and breath control.
6. prosodyAndIntonationFeedback: specific guidance on tone, stress, and vocal stability.
7. semanticFidelityFeedback: concrete comparison with the original speech (omissions, shifts, register).
8. actionableRecommendations: 3 concrete drills for the next practice session.
9. suggestedSymbols: 4 high-utility consecutive note-taking symbols (Rozan/Matyssek style) for key concepts in this source speech.`;

  const runEval = async (modelName: 'gemini-4-hydrogen' | 'gemini-3.1-flash-lite') =>
    ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        systemInstruction:
          'You are a senior UN and EU Directorate-General for Interpretation (DG SCIC) conference interpreting examiner. Be precise, encouraging, and strictly grounded in the provided transcripts.',
        thinkingConfig: {
          thinkingLevel:
            modelName === 'gemini-4-hydrogen' ? ThinkingLevel.LOW : ThinkingLevel.MINIMAL,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            fluencyScore: { type: Type.INTEGER },
            precisionScore: { type: Type.INTEGER },
            intonationScore: { type: Type.INTEGER },
            estimatedWpm: { type: Type.INTEGER },
            pauseAnalysis: { type: Type.STRING },
            prosodyAndIntonationFeedback: { type: Type.STRING },
            semanticFidelityFeedback: { type: Type.STRING },
            actionableRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            suggestedSymbols: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concept: { type: Type.STRING },
                  symbol: { type: Type.STRING },
                  category: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

  let evalRes;
  try {
    try {
      evalRes = await withTransientRetry(() => runEval('gemini-4-hydrogen'));
    } catch (primaryErr) {
      const parsed = parseUpstreamError(primaryErr);
      if (parsed.transient) {
        evalRes = await withTransientRetry(() => runEval('gemini-3.1-flash-lite'), [500]);
      } else {
        throw primaryErr;
      }
    }
  } catch (err) {
    throw toCleanServiceError(err, 'Evaluación vocal');
  }

  const parsed = JSON.parse((evalRes.text || '{}').trim());
  const clamp = (n: unknown, min: number, max: number, fallback: number) => {
    const val = typeof n === 'number' && Number.isFinite(n) ? Math.round(n) : fallback;
    return Math.max(min, Math.min(max, val));
  };

  return {
    transcript: userTranscript,
    fluencyScore: clamp(parsed.fluencyScore, 0, 100, 75),
    precisionScore: clamp(parsed.precisionScore, 0, 100, 75),
    intonationScore: clamp(parsed.intonationScore, 0, 100, 75),
    estimatedWpm: clamp(parsed.estimatedWpm, 0, 400, measuredWpm),
    pauseAnalysis: String(parsed.pauseAnalysis || ''),
    prosodyAndIntonationFeedback: String(parsed.prosodyAndIntonationFeedback || ''),
    semanticFidelityFeedback: String(parsed.semanticFidelityFeedback || ''),
    actionableRecommendations: Array.isArray(parsed.actionableRecommendations)
      ? parsed.actionableRecommendations.map(String).slice(0, 5)
      : [],
    suggestedSymbols: Array.isArray(parsed.suggestedSymbols)
      ? parsed.suggestedSymbols.slice(0, 6).map((s: Record<string, unknown>) => ({
          concept: String(s.concept || ''),
          symbol: String(s.symbol || ''),
          category: String(s.category || 'Concept'),
        }))
      : [],
  };
}

export async function suggestNoteSymbols(params: {
  excerpt: string;
  sourceLang: string;
  uiLang: string;
}) {
  const ai = getGeminiClient();
  const excerpt = params.excerpt.trim().slice(0, 1500);
  if (!excerpt) {
    throw new GeminiServiceError('Excerpt is required for note symbol suggestions.', 400);
  }

  const runSuggest = async (modelName: 'gemini-4-hydrogen' | 'gemini-3.1-flash-lite') =>
    ai.models.generateContent({
      model: modelName,
      contents: `Extract 6 high-frequency consecutive interpreting note-taking symbols (following Jean-François Rozan's 7 principles and Matyssek notation) for this speech excerpt in ${params.sourceLang}. Explain concepts and usage in language code "${params.uiLang || 'es'}" (es = Spanish, fr = French, ar = Arabic).\n\nExcerpt:\n"""${excerpt}"""`,
      config: {
        thinkingConfig: {
          thinkingLevel:
            modelName === 'gemini-4-hydrogen' ? ThinkingLevel.LOW : ThinkingLevel.MINIMAL,
        },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concept: { type: Type.STRING },
                  symbol: { type: Type.STRING },
                  abbreviation: { type: Type.STRING },
                  principle: { type: Type.STRING },
                },
              },
            },
            layoutTip: { type: Type.STRING },
          },
        },
      },
    });

  try {
    let res;
    try {
      res = await withTransientRetry(() => runSuggest('gemini-4-hydrogen'), [], 9000, 'Sugerencias');
    } catch (primaryErr) {
      const parsed = parseUpstreamError(primaryErr);
      if (parsed.transient) {
        res = await withTransientRetry(
          () => runSuggest('gemini-3.1-flash-lite'),
          [350],
          10000,
          'Sugerencias'
        );
      } else {
        throw primaryErr;
      }
    }
    return JSON.parse((res.text || '{"suggestions":[],"layoutTip":""}').trim());
  } catch (err) {
    throw toCleanServiceError(err, 'Sugerencias de símbolos');
  }
}
