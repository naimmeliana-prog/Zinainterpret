export type UiLang = 'es' | 'fr' | 'ar';
export type SpeechLang = 'es' | 'fr' | 'ar';
export type ThemePreference = 'system' | 'dark' | 'light';
export type InterpretingMode = 'simultaneous' | 'consecutive';
export type ConferenceVoiceName = 'Zephyr' | 'Kore' | 'Puck' | 'Charon' | 'Fenrir';
export type ConferenceVoiceStyle = 'natural' | 'diplomatic' | 'measured';

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
  terminology: Array<{ term: string; note: Record<UiLang, string> }>;
  scripts: Record<SpeechLang, string>;
}

export type NoteSymbolCategory =
  | 'logic'
  | 'diplomacy'
  | 'economy'
  | 'time'
  | 'stance'
  | 'verbs'
  | 'modifiers';

export interface NoteSymbol {
  id: string;
  symbol: string;
  meaning: Record<UiLang, string>;
  category: NoteSymbolCategory;
  example: string;
  usageNote?: string | Record<UiLang, string>;
  applicationSentence?: string | Record<UiLang, string>;
  applicationNotation?: string;
}

export interface RozanHierarchyStep {
  level: string;
  zone: string;
  title: string;
  rule: string;
  visualPattern: string;
  exampleText: string;
}

export interface RozanConnectorItem {
  symbol: string;
  name: string;
  placement: string;
  spokenTriggers: string;
  sentenceExample: string;
  notationExample: string;
}

export interface RozanAbbreviationItem {
  id: string;
  domain: 'economy' | 'politics';
  concept: string;
  abbreviation: string;
  rozanRule: string;
  exampleInContext: string;
}

export interface TechniqueGuide {
  id: string;
  mode: InterpretingMode;
  title: string;
  subtitle: string;
  principle: string;
  whenToUse: string;
  exampleSource: string;
  exampleOutput: string;
  commonPitfall: string;
  drillTip: string;
}

export interface NotebookWorkedExample {
  id: string;
  title: string;
  institution: string;
  sourceSpeech: string;
  rozanLines: Array<{
    margin: string;
    indent: 0 | 1 | 2;
    notation: string;
    gloss: string;
  }>;
  restitutionTip: string;
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

export interface EncryptedPortableBackup {
  label: string;
  algorithm: 'AES-GCM-256';
  exportedAt: string;
  ciphertext: string;
  iv: string;
  salt: string;
  sessionCount: number;
  byteSize: number;
}
