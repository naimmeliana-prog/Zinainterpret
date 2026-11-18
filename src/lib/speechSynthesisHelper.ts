import type { ConferenceVoiceStyle, SpeechLang } from '../types';

export interface NaturalSpeechController {
  stop: () => void;
}

const LANG_BCP47: Record<SpeechLang, string> = {
  es: 'es-ES',
  fr: 'fr-FR',
  ar: 'ar-SA',
};

export function scoreBrowserVoiceNaturalness(voice: SpeechSynthesisVoice): number {
  const name = voice.name.toLowerCase();
  let score = 0;

  // Prefer Microsoft Edge / Windows Neural & Online Natural voices
  if (name.includes('natural')) score += 70;
  if (name.includes('online')) score += 50;
  if (name.includes('neural') || name.includes('wavenet') || name.includes('studio')) score += 45;
  // Prefer Google network voices and Apple Siri / Enhanced voices
  if (name.includes('google')) score += 35;
  if (name.includes('enhanced') || name.includes('premium') || name.includes('siri')) score += 30;

  // Known expressive human-sounding OS voice personas for ES, FR, AR
  if (
    /elena|alvaro|álvaro|paloma|irene|mónica|monica|jorge|lucía|lucia|raul|raúl|laura|dalia|jorge|amélie|amelie|thomas|henri|denise|vivienne|aurélie|aurelie|paul|céline|celine|maged|laila|tarik|zariyah|salma|hoda|shakir|hameed|fatima|layla/.test(
      name
    )
  ) {
    score += 20;
  }

  // Non-local voices are usually higher-quality cloud neural synthesizers
  if (!voice.localService) score += 12;

  // Penalize robotic legacy engines
  if (/espeak|festival|mbrola|pico|compact|fred|albert|zarvox/.test(name)) {
    score -= 40;
  }

  return score;
}

export function getRankedVoicesForLang(
  voices: SpeechSynthesisVoice[],
  lang: SpeechLang
): SpeechSynthesisVoice[] {
  const prefix = lang === 'es' ? 'es' : lang === 'fr' ? 'fr' : 'ar';
  const matching = voices.filter((v) => v.lang.toLowerCase().startsWith(prefix));
  return [...matching].sort(
    (a, b) => scoreBrowserVoiceNaturalness(b) - scoreBrowserVoiceNaturalness(a)
  );
}

export function pickBestNaturalVoice(
  voices: SpeechSynthesisVoice[],
  lang: SpeechLang,
  preferredVoiceURI?: string
): SpeechSynthesisVoice | undefined {
  const ranked = getRankedVoicesForLang(voices, lang);
  if (ranked.length === 0) return undefined;
  if (preferredVoiceURI) {
    const chosen = ranked.find((v) => v.voiceURI === preferredVoiceURI);
    if (chosen) return chosen;
  }
  return ranked[0];
}

function splitSpeechIntoNaturalClauses(text: string): string[] {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return [];

  // Split at natural punctuation boundaries so browser synthesis breathes naturally
  // and avoids Chrome's ~15-second single-utterance flattening/cutoff.
  const rawSentences = normalized
    .split(/(?<=[.!?؟;:])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  for (const sentence of rawSentences) {
    if (sentence.length <= 210) {
      chunks.push(sentence);
    } else {
      // Gently break overly long plenary sentences at commas/connectors
      const subParts = sentence
        .split(/(?<=[,،])\s+/)
        .map((p) => p.trim())
        .filter(Boolean);
      let acc = '';
      for (const part of subParts) {
        if (!acc) {
          acc = part;
        } else if (acc.length + part.length + 1 <= 190) {
          acc = `${acc} ${part}`;
        } else {
          chunks.push(acc);
          acc = part;
        }
      }
      if (acc) chunks.push(acc);
    }
  }
  return chunks.length > 0 ? chunks : [normalized];
}

export function speakWithNaturalCadence(params: {
  text: string;
  lang: SpeechLang;
  playbackRate?: number;
  style?: ConferenceVoiceStyle;
  preferredVoiceURI?: string;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: () => void;
}): NaturalSpeechController {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    params.onError?.();
    return { stop: () => {} };
  }

  window.speechSynthesis.cancel();

  const clauses = splitSpeechIntoNaturalClauses(params.text);
  if (clauses.length === 0) {
    params.onEnd?.();
    return { stop: () => {} };
  }

  let cancelled = false;
  let pauseTimer: number | null = null;

  const style = params.style || 'natural';
  const baseRate = params.playbackRate ?? 1.0;
  const styleRateFactor = style === 'measured' ? 0.92 : style === 'diplomatic' ? 0.97 : 1.0;
  const effectiveRate = Math.min(1.5, Math.max(0.65, Number((baseRate * styleRateFactor).toFixed(2))));
  const pauseMs = style === 'measured' ? 520 : style === 'diplomatic' ? 340 : 230;
  const voices = window.speechSynthesis.getVoices();
  const voice = pickBestNaturalVoice(voices, params.lang, params.preferredVoiceURI);

  const stop = () => {
    cancelled = true;
    if (pauseTimer !== null) {
      window.clearTimeout(pauseTimer);
      pauseTimer = null;
    }
    window.speechSynthesis.cancel();
  };

  const speakNext = (index: number) => {
    if (cancelled) return;
    if (index >= clauses.length) {
      params.onEnd?.();
      return;
    }

    const utter = new SpeechSynthesisUtterance(clauses[index]);
    utter.lang = voice?.lang || LANG_BCP47[params.lang];
    if (voice) utter.voice = voice;
    utter.rate = effectiveRate;
    // Slight natural inflection variance across clauses prevents flat monotonic readout
    utter.pitch = index % 2 === 0 ? 1.0 : 0.98;
    utter.volume = 1.0;

    utter.onend = () => {
      if (cancelled) return;
      if (index + 1 >= clauses.length) {
        params.onEnd?.();
        return;
      }
      pauseTimer = window.setTimeout(() => {
        speakNext(index + 1);
      }, pauseMs);
    };

    utter.onerror = (ev) => {
      if (cancelled) return;
      // 'interrupted' / 'canceled' happen during intentional stop()
      if (ev.error === 'interrupted' || ev.error === 'canceled') return;
      params.onError?.();
    };

    window.speechSynthesis.speak(utter);
  };

  params.onStart?.();
  speakNext(0);

  return { stop };
}
