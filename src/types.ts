export type UiLang = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt';
export type SpeechLang = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' | 'ar' | 'zh';
export type ThemePreference = 'system' | 'dark' | 'light';
export type InterpretingMode = 'simultaneous' | 'consecutive';

export interface ConferenceExercise {
  id: string;
  stage: 1 | 2 | 3 | 4;
  mode: InterpretingMode;
  institution: string;
  difficulty: 'A1-Foundational' | 'B2-Intermediate' | 'C1-Advanced' | 'C2-BoothReady';
  targetWpm: number;
  durationLabel: string;
  titles: Record<UiLang, string>;
  objectives: Record<UiLang, string>;
  terminology: Array<{ term: string; note: string }>;
  scripts: Record<SpeechLang, string>;
}

export interface NoteSymbol {
  id: string;
  symbol: string;
  meaning: Record<UiLang, string>;
  category: 'logic' | 'diplomacy' | 'economy' | 'time' | 'stance';
  example: string;
}

export interface InstitutionalResource {
  id: string;
  category: 'un' | 'eu' | 'universities';
  name: string;
  organization: string;
  countryOrScope: string;
  url: string;
  descriptions: Record<UiLang, string>;
  tags: string[];
}

export interface VoiceEvaluation {
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

export interface LocalPracticeSession {
  id: string;
  createdAt: string;
  exerciseId: string;
  exerciseTitle: string;
  mode: InterpretingMode;
  sourceLang: SpeechLang;
  targetLang: SpeechLang;
  durationSec: number;
  decalageTargetSec?: number;
  userAudioBase64?: string;
  userAudioMimeType?: string;
  sourceAudioBase64?: string;
  notesText?: string;
  notesCanvasDataUrl?: string;
  evaluation?: VoiceEvaluation;
}

export interface UserProfileDoc {
  ownerId: string;
  alias: string;
  preferredUiLang: UiLang;
  preferredTheme: ThemePreference;
  defaultSourceLang: SpeechLang;
  defaultTargetLang: SpeechLang;
  cloudSyncEnabled: boolean;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface ProgressSummaryDoc {
  id?: string;
  ownerId: string;
  exerciseId: string;
  mode: InterpretingMode;
  sourceLang: SpeechLang;
  targetLang: SpeechLang;
  fluencyScore: number;
  precisionScore: number;
  intonationScore: number;
  wpm: number;
  durationSec: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}

export interface EncryptedBackupDoc {
  id?: string;
  ownerId: string;
  label: string;
  algorithm: 'AES-GCM-256';
  ciphertext: string;
  iv: string;
  salt: string;
  sessionCount: number;
  byteSize: number;
  createdAt?: unknown;
  updatedAt?: unknown;
}
