import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

let cachedAi: GoogleGenAI | null = null;

export function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the server environment.');
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

export async function generateConferenceSpeechAudio(params: {
  text: string;
  lang: string;
  voiceName?: string;
  style?: string;
}) {
  const ai = getGeminiClient();
  const cleanText = params.text.trim().slice(0, 4500);
  if (!cleanText) {
    throw new Error('Speech text cannot be empty.');
  }

  const voice = params.voiceName || 'Charon';
  const style =
    params.style ||
    `Formal international conference delegate speaking clearly in ${params.lang} at measured diplomatic cadence`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash-lite-tts',
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: cleanText,
            speechMetadata: {
              style,
            },
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

  const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!base64Audio) {
    throw new Error('TTS model did not return audio data.');
  }

  return {
    audioBase64: base64Audio,
    mimeType: 'audio/wav',
  };
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
    const transcribeRes = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: {
        parts: [
          audioPart,
          {
            text: `Transcribe this conference interpretation recording accurately in ${payload.targetLang}. Preserve hesitations, self-corrections, or incomplete clauses verbatim.`,
          },
        ],
      },
    });
    userTranscript = (transcribeRes.text || '').trim();
  }

  if (!userTranscript) {
    throw new Error('No speech was detected in the recording. Please record or enter an interpretation.');
  }

  const wordCount = userTranscript.split(/\s+/).filter(Boolean).length;
  const safeDuration = Math.max(payload.durationSec || 30, 5);
  const measuredWpm = Math.round((wordCount / safeDuration) * 60);

  const feedbackLang = payload.uiLang || 'es';

  const prompt = `Evaluate this ${payload.mode} conference interpretation performance.
Respond in language code "${feedbackLang}".

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

  const evalRes = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: prompt,
    config: {
      systemInstruction:
        'You are a senior UN and EU Directorate-General for Interpretation (DG SCIC) conference interpreting examiner. Be precise, encouraging, and strictly grounded in the provided transcripts.',
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
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
    throw new Error('Excerpt is required for note symbol suggestions.');
  }

  const res = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: `Extract 6 high-frequency consecutive interpreting note-taking symbols (following Jean-François Rozan's 7 principles and Matyssek notation) for this speech excerpt in ${params.sourceLang}. Explain concepts and usage in language code "${params.uiLang || 'es'}".\n\nExcerpt:\n"""${excerpt}"""`,
    config: {
      thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
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

  return JSON.parse((res.text || '{"suggestions":[],"layoutTip":""}').trim());
}
