import type {
  ConferenceVoiceName,
  ConferenceVoiceStyle,
  NoteSymbolCategory,
  SpeechLang,
  UiLang,
} from '../types';

export const UI_LANGUAGE_LABELS: Record<UiLang, string> = {
  es: 'Español (ES)',
  fr: 'Français (FR)',
  ar: 'العربية (AR)',
};

export const SPEECH_LANGUAGE_NAMES: Record<UiLang, Record<SpeechLang, string>> = {
  es: { es: 'Español', fr: 'Francés', ar: 'Árabe' },
  fr: { es: 'Espagnol', fr: 'Français', ar: 'Arabe' },
  ar: { es: 'الإسبانية', fr: 'الفرنسية', ar: 'العربية' },
};

export const SPEECH_LANGUAGE_NATIVE: Record<SpeechLang, string> = {
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
};

export const SYMBOL_CATEGORY_LABELS_I18N: Record<
  UiLang,
  Record<NoteSymbolCategory | 'all', string>
> = {
  es: {
    all: 'Todos',
    logic: 'Lógica y conectores',
    diplomacy: 'Diplomacia y entes',
    economy: 'Economía y cifras',
    time: 'Tiempo y modalidad',
    stance: 'Postura y énfasis',
    verbs: 'Verbos frecuentes',
    modifiers: 'Reglas Rozan',
  },
  fr: {
    all: 'Tous',
    logic: 'Logique et connecteurs',
    diplomacy: 'Diplomatie et organes',
    economy: 'Économie et chiffres',
    time: 'Temps et modalité',
    stance: 'Position et emphase',
    verbs: 'Verbes fréquents',
    modifiers: 'Règles Rozan',
  },
  ar: {
    all: 'الكل',
    logic: 'المنطق والروابط',
    diplomacy: 'الدبلوماسية والمؤسسات',
    economy: 'الاقتصاد والأرقام',
    time: 'الزمن والصيغة',
    stance: 'الموقف والتوكيد',
    verbs: 'الأفعال المتكررة',
    modifiers: 'قواعد روزان',
  },
};

export const VOICE_PERSONA_OPTIONS: Array<{
  id: ConferenceVoiceName;
  labels: Record<UiLang, string>;
}> = [
  {
    id: 'Zephyr',
    labels: {
      es: 'Elena — Delegada diplomática (cálida y serena)',
      fr: 'Hélène — Déléguée diplomatique (chaleureuse et posée)',
      ar: 'ليلى — مندوبة دبلوماسية (دافئة ومتزنة)',
    },
  },
  {
    id: 'Charon',
    labels: {
      es: 'Carlos — Orador plenario (voz grave y natural)',
      fr: 'Charles — Orateur plénier (voix grave et naturelle)',
      ar: 'طارق — متحدث في الجلسة العامة (نبرة رخيمة وطبيعية)',
    },
  },
  {
    id: 'Kore',
    labels: {
      es: 'Sofía — Ponente técnica (clara y expresiva)',
      fr: 'Sophie — Rapporteure technique (claire et expressive)',
      ar: 'سلمى — مقررة فنية (واضحة ومعبرة)',
    },
  },
  {
    id: 'Puck',
    labels: {
      es: 'Mateo — Intervención de debate (ágil y cercana)',
      fr: 'Mathieu — Intervention en débat (vive et spontanée)',
      ar: 'كريم — مداخلة حوارية (حية وقريبة من الطبيعة)',
    },
  },
  {
    id: 'Fenrir',
    labels: {
      es: 'Javier — Presidente de sesión (firme y pausada)',
      fr: 'Xavier — Président de séance (ferme et mesurée)',
      ar: 'نديم — رئيس الجلسة (رصينة ومتمهلة)',
    },
  },
];

export const VOICE_STYLE_OPTIONS: Array<{
  id: ConferenceVoiceStyle;
  labels: Record<UiLang, string>;
}> = [
  {
    id: 'natural',
    labels: {
      es: 'Habla humana natural (con respiraciones)',
      fr: 'Voix humaine naturelle (avec respirations)',
      ar: 'إلقاء بشري طبيعي (مع وقفات تنفس)',
    },
  },
  {
    id: 'diplomatic',
    labels: {
      es: 'Plenario diplomático cálido',
      fr: 'Plénière diplomatique chaleureuse',
      ar: 'خطاب دبلوماسي دافئ في قاعة المؤتمرات',
    },
  },
  {
    id: 'measured',
    labels: {
      es: 'Cadencia pausada para consecutiva',
      fr: 'Cadence posée pour consécutive',
      ar: 'إيقاع متمهل للتتبعية',
    },
  },
];

export interface Translations {
  brand: string;
  navAriaLabel: string;
  navMobileAriaLabel: string;
  uiLangAriaLabel: string;
  navCurriculum: string;
  navStudio: string;
  navRepositories: string;
  navProgress: string;
  navCta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStartSimultaneous: string;
  heroStartConsecutive: string;
  heroImageAlt: string;
  heroBoothBadge: string;
  heroTechBadge: string;
  curriculumTitle: string;
  curriculumSubtitle: string;
  stageLabel: string;
  modeSimultaneous: string;
  modeConsecutive: string;
  exerciseActiveBadge: string;
  loadExerciseBtn: string;
  editorialRozanTag: string;
  editorialRozanTitle: string;
  editorialRozanDesc: string;
  editorialRozanTags: string;
  editorialReposTag: string;
  editorialReposTitle: string;
  editorialReposDesc: string;
  editorialReposTags: string;
  studioTitle: string;
  sourceLangLabel: string;
  targetLangLabel: string;
  voicePersonaLabel: string;
  voiceStyleLabel: string;
  originalChannelLabel: string;
  interpreterBoothLabel: string;
  showScriptBtn: string;
  hideScriptBtn: string;
  generateSpeechBtn: string;
  generatingSpeech: string;
  conferenceAudioReady: string;
  speechFallbackHint: string;
  playOriginal: string;
  pauseAudio: string;
  playbackSpeed: string;
  decalageLabel: string;
  recordStart: string;
  recordStop: string;
  recordingActive: string;
  resetRecordingBtn: string;
  micUnavailableError: string;
  manualTranscriptLabel: string;
  manualTranscriptPlaceholder: string;
  compareTitle: string;
  playMyRecording: string;
  analyzeAiBtn: string;
  analyzingAi: string;
  saveLocalEncrypted: string;
  savedLocally: string;
  detectedTranscriptLabel: string;
  glossaryTitle: string;
  glossaryTip1Prefix: string;
  glossaryTip1Suffix: string;
  glossaryTip2: string;
  glossaryTip3: string;
  glossaryManualLink: string;
  notesTitle: string;
  notesTabCanvas: string;
  notesTabStructured: string;
  notesMarginHint: string;
  notesDiagonalHint: string;
  notesTemplateBtn: string;
  notesUndoBtn: string;
  notesPlaceholder: string;
  clearCanvas: string;
  aiSymbolSuggestions: string;
  suggestingSymbols: string;
  retryBtn: string;
  symbolPaletteTitle: string;
  evaluationTitle: string;
  fluencyLabel: string;
  precisionLabel: string;
  intonationLabel: string;
  wpmLabel: string;
  wpmUnit: string;
  pauseAnalysisLabel: string;
  prosodyLabel: string;
  fidelityLabel: string;
  recommendationsLabel: string;
  repositoriesTitle: string;
  repositoriesSubtitle: string;
  repoAll: string;
  repoUn: string;
  repoEu: string;
  repoUniversities: string;
  visitResource: string;
  progressTitle: string;
  progressSubtitle: string;
  exportPdfBtn: string;
  exportJsonBtn: string;
  exportMarkdownBtn: string;
  metricEncryptedSessions: string;
  metricAvgFluency: string;
  metricAvgPrecision: string;
  metricAvgIntonation: string;
  metricAvgSpeed: string;
  emptyHistoryTitle: string;
  emptyHistoryDesc: string;
  listenBtn: string;
  playingBtn: string;
  deleteSessionLabel: string;
  vaultTitle: string;
  vaultSubtitle: string;
  authTitle: string;
  authSubtitle: string;
  anonDeviceStatus: string;
  localAliasStatus: string;
  usernameLabel: string;
  passwordLabel: string;
  loginBtn: string;
  registerBtn: string;
  anonymousBtn: string;
  aliasErrorEmpty: string;
  aliasErrorInvalid: string;
  aliasSavedPrefix: string;
  anonActivatedPrefix: string;
  cloudBackupTitle: string;
  cloudBackupSubtitle: string;
  backupLabelPlaceholder: string;
  backupPassphraseLabel: string;
  createEncryptedBackup: string;
  restoreEncryptedBackup: string;
  backupErrPassphrase: string;
  backupErrPassphraseImport: string;
  backupDownloadedPrefix: string;
  backupRestoredPrefix: string;
  backupRestoredSuffix: string;
  backupInvalidFile: string;
  backupWrongKey: string;
  offlineBanner: string;
  installApp: string;
  iosInstallTitle: string;
  iosInstallStep1: string;
  iosInstallStep2: string;
  closeLabel: string;
  themeSystem: string;
  themeDark: string;
  themeLight: string;
  privacyNotice: string;
  openSourceNotice: string;
  errorBoundaryTitle: string;
  errorBoundaryReload: string;
  // Manual & Symbol Library UI
  manualTitle: string;
  manualSubtitlePrefix: string;
  manualSubtitleSuffix: string;
  manualTabSimultaneous: string;
  manualTabConsecutive: string;
  manualTabExamples: string;
  manualTabSymbols: string;
  rozanPrinciplesHeading: string;
  rozanPrinciplesSub: string;
  openPadInStudio: string;
  rozanHierarchyTag: string;
  rozanHierarchyHeading: string;
  rozanHierarchySub: string;
  rozanConnectorsTag: string;
  rozanConnectorsHeading: string;
  exploreSymbolsGrid: string;
  colSymbol: string;
  colLogicPlacement: string;
  colTriggers: string;
  colSentenceNotation: string;
  rozanAbbrTag: string;
  rozanAbbrHeading: string;
  rozanAbbrSub: string;
  abbrAll: string;
  abbrEconomy: string;
  abbrPolitics: string;
  abbrDomainEconomy: string;
  abbrDomainPolitics: string;
  abbrExamplePrefix: string;
  guideWhenToUse: string;
  guideSpeakerInput: string;
  guideRecommendedOutput: string;
  guideCommonPitfall: string;
  guideBoothDrill: string;
  practiceInModePrefix: string;
  workedPracticeCanvas: string;
  workedOriginalSpeech: string;
  workedMarginHeader: string;
  workedVisualReading: string;
  symLibBadge: string;
  symLibSymbolsCount: string;
  symLibCategoriesCount: string;
  symLibHeading: string;
  symLibSub: string;
  symLibSearchPlaceholder: string;
  symLibSearchAria: string;
  symLibCopy: string;
  symLibCopied: string;
  symLibCopyTitle: string;
  symLibUsageCriterion: string;
  symLibConferenceSentence: string;
  symLibNotebookNotation: string;
  symLibAbbreviated: string;
  symLibShowingPrefix: string;
  symLibShowingOf: string;
  symLibTryInPad: string;
  symLibNoMatchesPrefix: string;
  symLibResetFilters: string;
}

const es: Translations = {
  brand: 'Cabina',
  navAriaLabel: 'Navegación principal',
  navMobileAriaLabel: 'Navegación móvil',
  uiLangAriaLabel: 'Idioma de la interfaz',
  navCurriculum: 'Currículo',
  navStudio: 'Estudio',
  navRepositories: 'Repositorios',
  navProgress: 'Progreso',
  navCta: 'Practicar ahora',
  heroTitle: 'Formación progresiva en interpretación simultánea y consecutiva',
  heroSubtitle:
    'Entrena con discursos diplomáticos en español, francés y árabe, voces humanas de conferencia, lienzo de toma de notas con símbolos, grabación comparativa A/B, análisis de voz con IA y cifrado local AES-GCM.',
  heroStartSimultaneous: 'Cabina Simultánea',
  heroStartConsecutive: 'Estudio Consecutiva',
  heroImageAlt: 'Cabina de interpretación simultánea en conferencia internacional',
  heroBoothBadge: 'Estudio de Cabina Dual · ES · FR · AR',
  heroTechBadge: 'AES-GCM-256 · Offline PWA',
  curriculumTitle: 'Itinerario Progresivo por Etapas',
  curriculumSubtitle:
    'Desde el shadowing inicial y control de décalage hasta discursos completos de Naciones Unidas y la Unión Europea.',
  stageLabel: 'Etapa',
  modeSimultaneous: 'Simultánea',
  modeConsecutive: 'Consecutiva',
  exerciseActiveBadge: 'En estudio',
  loadExerciseBtn: 'Cargar ejercicio →',
  editorialRozanTag: 'Método Rozan & Matyssek',
  editorialRozanTitle: 'Toma de notas orientada al sentido',
  editorialRozanDesc:
    'La verticalidad y el desplazamiento diagonal permiten leer la estructura lógica de un discurso de un vistazo sin descifrar palabras sueltas.',
  editorialRozanTags:
    'Transposición de ideas · Abreviación · Conectores al margen izquierdo · Negación y énfasis',
  editorialReposTag: 'Práctica con material real',
  editorialReposTitle: 'Repositorios de Naciones Unidas y Unión Europea',
  editorialReposDesc:
    'Combina los ejercicios guiados de esta cabina con discursos reales de la ONU (DGACM) y la Comisión Europea (DG SCIC) para consolidar tu velocidad en condiciones reales.',
  editorialReposTags: 'UN Web TV · UNTERM · DG SCIC Speech Repository · IATE · Facultades EMCI',
  studioTitle: 'Estudio de Práctica Activa',
  sourceLangLabel: 'Idioma de entrada',
  targetLangLabel: 'Idioma de salida',
  voicePersonaLabel: 'Voz del orador (humana)',
  voiceStyleLabel: 'Registro y cadencia oral',
  originalChannelLabel: 'Audio de conferencia',
  interpreterBoothLabel: 'Cabina del Intérprete',
  showScriptBtn: 'Ver / editar texto del discurso',
  hideScriptBtn: 'Ocultar transcripción guía',
  generateSpeechBtn: 'Generar voz de conferencia',
  generatingSpeech: 'Sintetizando voz humana...',
  conferenceAudioReady: 'Audio humano de conferencia listo para reproducir.',
  speechFallbackHint: 'Modo de voz local del navegador disponible sin conexión.',
  playOriginal: 'Reproducir original',
  pauseAudio: 'Pausar',
  playbackSpeed: 'Velocidad',
  decalageLabel: 'Décalage objetivo',
  recordStart: 'Grabar interpretación',
  recordStop: 'Detener grabación',
  recordingActive: 'Grabando en alta fidelidad',
  resetRecordingBtn: 'Reiniciar',
  micUnavailableError:
    'Acceso al micrófono denegado o no disponible. Puedes escribir tu interpretación abajo para evaluarla.',
  manualTranscriptLabel:
    'Transcripción manual opcional (si practicas sin micrófono o deseas corregir texto):',
  manualTranscriptPlaceholder: 'Escribe o dicta tu interpretación en',
  compareTitle: 'Comparación Original vs. Interpretación',
  playMyRecording: 'Escuchar mi grabación',
  analyzeAiBtn: 'Analizar voz con IA',
  analyzingAi: 'Transcribiendo y evaluando...',
  saveLocalEncrypted: 'Guardar en bóveda cifrada',
  savedLocally: 'Cifrado localmente (AES-GCM)',
  detectedTranscriptLabel: 'Transcripción detectada:',
  glossaryTitle: 'Glosario de Cabina y Estrategia Simultánea',
  glossaryTip1Prefix: '1. Espera',
  glossaryTip1Suffix: 's para captar la unidad mínima de sentido (S+V).',
  glossaryTip2: '2. Transforma subordinadas largas en oraciones coordinadas cortas.',
  glossaryTip3: '3. Anota cifras y siglas breves mientras escuchas en el micrófono.',
  glossaryManualLink: 'Ver manual completo de técnicas (Simultánea y Rozan) →',
  notesTitle: 'Cuaderno de Toma de Notas Consecutiva',
  notesTabCanvas: 'Lienzo Táctil',
  notesTabStructured: 'Esquema S-V-O',
  notesMarginHint: 'Margen ∵ ∴ ∥',
  notesDiagonalHint: 'Escalonamiento diagonal: Margen → Sujeto → Verbo → Objeto',
  notesTemplateBtn: '+ Plantilla diagonal S-V-O',
  notesUndoBtn: 'Deshacer',
  notesPlaceholder: 'Anota estructura S-V-O, conectores lógicos o transcribe tu síntesis...',
  clearCanvas: 'Limpiar lienzo',
  aiSymbolSuggestions: 'Sugerir símbolos con IA',
  suggestingSymbols: 'Analizando conceptos...',
  retryBtn: 'Reintentar',
  symbolPaletteTitle: 'Símbolos habituales (Rozan / Matyssek)',
  evaluationTitle: 'Evaluación Vocal y Terminológica',
  fluencyLabel: 'Fluidez',
  precisionLabel: 'Precisión',
  intonationLabel: 'Entonación',
  wpmLabel: 'Velocidad',
  wpmUnit: 'PPM',
  pauseAnalysisLabel: 'Control de pausas y ritmo',
  prosodyLabel: 'Prosodia y entonación',
  fidelityLabel: 'Fidelidad semántica',
  recommendationsLabel: 'Ejercicios recomendados',
  repositoriesTitle: 'Repositorios Oficiales y Facultades',
  repositoriesSubtitle:
    'Acceso directo a bancos de discursos de Naciones Unidas, Comisión y Parlamento Europeo, y departamentos universitarios de Traducción e Interpretación.',
  repoAll: 'Todos',
  repoUn: 'Naciones Unidas',
  repoEu: 'Unión Europea',
  repoUniversities: 'Universidades',
  visitResource: 'Abrir recurso oficial',
  progressTitle: 'Métricas, Exportación y Respaldo Cifrado',
  progressSubtitle:
    'Tu historial completo se cifra localmente en IndexedDB. Exporta informes en PDF o genera copias de seguridad cifradas portables.',
  exportPdfBtn: 'Exportar informe PDF',
  exportJsonBtn: 'Exportar sesión JSON',
  exportMarkdownBtn: 'Exportar notas MD',
  metricEncryptedSessions: 'Sesiones cifradas',
  metricAvgFluency: 'Fluidez media',
  metricAvgPrecision: 'Precisión media',
  metricAvgIntonation: 'Entonación media',
  metricAvgSpeed: 'Velocidad media',
  emptyHistoryTitle: 'Sin sesiones guardadas todavía',
  emptyHistoryDesc:
    'Completa una práctica en el estudio y guárdala en tu bóveda cifrada local para visualizar tu evolución.',
  listenBtn: 'Escuchar',
  playingBtn: 'Reproduciendo...',
  deleteSessionLabel: 'Eliminar sesión',
  vaultTitle: 'Bóveda Local AES-GCM-256 y Privacidad',
  vaultSubtitle:
    'Ningún audio ni dato personal abandona tu dispositivo sin cifrado previo de extremo a extremo.',
  authTitle: 'Perfil Local Privado (Sin Datos Personales)',
  authSubtitle:
    'Trabaja en modo anónimo instantáneo o asigna un alias local para tus informes PDF, sin cuentas externas ni correo.',
  anonDeviceStatus: 'Sesión anónima en dispositivo',
  localAliasStatus: 'Perfil local sin datos personales',
  usernameLabel: 'Alias local opcional',
  passwordLabel: 'Contraseña (mín. 8 caracteres)',
  loginBtn: 'Guardar alias local',
  registerBtn: 'Guardar alias local',
  anonymousBtn: 'Modo anónimo local',
  aliasErrorEmpty: 'Introduce un alias entre 3 y 24 caracteres (letras, números, _ o -).',
  aliasErrorInvalid:
    'Solo se permiten entre 3 y 24 caracteres alfanuméricos, guiones o guiones bajos.',
  aliasSavedPrefix: 'Alias local activo:',
  anonActivatedPrefix: 'Sesión anónima local activada:',
  cloudBackupTitle: 'Copia de Seguridad Cifrada Portable (AES-GCM-256)',
  cloudBackupSubtitle:
    'Empaqueta todo tu historial cifrado con clave maestra PBKDF2 + AES-GCM-256 para trasladarlo de forma privada entre dispositivos sin servidores externos.',
  backupLabelPlaceholder: 'Etiqueta de respaldo',
  backupPassphraseLabel: 'Clave maestra de cifrado (mín. 8 caracteres)',
  createEncryptedBackup: 'Descargar copia cifrada (.enc.json)',
  restoreEncryptedBackup: 'Restaurar desde archivo cifrado',
  backupErrPassphrase: 'La clave maestra de cifrado debe tener al menos 8 caracteres.',
  backupErrPassphraseImport: 'Introduce primero la clave maestra usada para cifrar el archivo.',
  backupDownloadedPrefix: 'Copia cifrada AES-GCM-256 descargada',
  backupRestoredPrefix: 'Restauradas',
  backupRestoredSuffix: 'sesiones en tu bóveda local cifrada.',
  backupInvalidFile: 'Formato de archivo cifrado no válido.',
  backupWrongKey: 'Clave maestra incorrecta o archivo cifrado dañado.',
  offlineBanner: 'Modo sin conexión — Bóveda local cifrada activa',
  installApp: 'Instalar app',
  iosInstallTitle: 'Instalar en iPhone / iPad',
  iosInstallStep1: 'Pulsa el botón Compartir en la barra inferior de Safari.',
  iosInstallStep2: 'Selecciona Añadir a pantalla de inicio para activar el modo offline.',
  closeLabel: 'Cerrar',
  themeSystem: 'Auto',
  themeDark: 'Oscuro',
  themeLight: 'Claro',
  privacyNotice: 'Cero correo personal · Cifrado local AES-GCM-256',
  openSourceNotice: 'Software gratuito y de código abierto (MIT)',
  errorBoundaryTitle: 'Se ha producido una interrupción en la sesión',
  errorBoundaryReload: 'Recargar estudio',
  manualTitle: 'Manual Técnico: Simultánea, Consecutiva y Toma de Notas',
  manualSubtitlePrefix:
    'Metodología operativa paso a paso, desglose completo del método de Jean-François Rozan (jerarquía de ideas, conectores lógicos y abreviaturas), cuadernos resueltos y biblioteca interactiva de',
  manualSubtitleSuffix: 'símbolos esenciales.',
  manualTabSimultaneous: 'Simultánea',
  manualTabConsecutive: 'Consecutiva y Rozan',
  manualTabExamples: 'Cuaderno resuelto',
  manualTabSymbols: 'Símbolos',
  rozanPrinciplesHeading: '01. Los 7 Principios Fundamentales de Jean-François Rozan',
  rozanPrinciplesSub:
    'Sistema clásico de toma de notas consecutivas adoptado en ONU, DG SCIC y facultades europeas EMCI.',
  openPadInStudio: 'Abrir cuaderno en estudio',
  rozanHierarchyTag: '02. Jerarquías de ideas · Arquitectura espacial de la página',
  rozanHierarchyHeading:
    'Cómo jerarquizar argumentos principales, subordinación y énfasis visual',
  rozanHierarchySub:
    'En la técnica de Rozan el espacio en blanco aporta tanta información como el trazo: la posición vertical y la sangría horizontal indican qué idea manda y qué elementos dependen de ella.',
  rozanConnectorsTag: '03. Conectores lógicos · Columna de enlace argumentativo',
  rozanConnectorsHeading: 'Mapa de conectores lógicos y detonantes orales multilingües',
  exploreSymbolsGrid: 'Explorar símbolos en cuadrícula →',
  colSymbol: 'Símbolo',
  colLogicPlacement: 'Relación lógica y ubicación',
  colTriggers: 'Detonantes en discurso (ES / FR / AR)',
  colSentenceNotation: 'Frase y notación Rozan',
  rozanAbbrTag: '04. Abreviaturas Rozan · Superíndices y siglas de conferencia',
  rozanAbbrHeading: 'Abreviaturas comunes para conceptos económicos y políticos',
  rozanAbbrSub:
    'Aplica la regla de raíz corta + superíndice (ⁿ sustantivo, º adjetivo/estado, ˢ plural) para distinguir conceptos afines sin ambigüedad.',
  abbrAll: 'Todas',
  abbrEconomy: 'Economía',
  abbrPolitics: 'Política y Derecho',
  abbrDomainEconomy: 'Economía y Finanzas',
  abbrDomainPolitics: 'Política y Diplomacia',
  abbrExamplePrefix: 'Ej:',
  guideWhenToUse: 'Cuándo aplicarla:',
  guideSpeakerInput: 'Entrada del orador',
  guideRecommendedOutput: 'Resolución técnica recomendada',
  guideCommonPitfall: 'Error frecuente:',
  guideBoothDrill: 'Práctica en cabina:',
  practiceInModePrefix: 'Practicar técnica en modo',
  workedPracticeCanvas: 'Practicar en el lienzo →',
  workedOriginalSpeech: 'Discurso original escuchado',
  workedMarginHeader: 'Margen | Escalonamiento Diagonal S → V → O',
  workedVisualReading: 'Lectura visual',
  symLibBadge: 'Biblioteca Interactiva',
  symLibSymbolsCount: 'símbolos esenciales',
  symLibCategoriesCount: '7 categorías',
  symLibHeading: 'Repertorio visual de símbolos para interpretación consecutiva',
  symLibSub:
    'Haz clic en cualquier símbolo de la cuadrícula para consultar su significado exacto, regla de uso y un ejemplo completo de aplicación en frase institucional.',
  symLibSearchPlaceholder: 'Buscar símbolo, concepto o frase...',
  symLibSearchAria: 'Buscar símbolo de toma de notas',
  symLibCopy: 'Copiar',
  symLibCopied: 'Copiado',
  symLibCopyTitle: 'Copiar símbolo al portapapeles',
  symLibUsageCriterion: 'Criterio de toma de notas',
  symLibConferenceSentence: 'Frase de conferencia (origen oral)',
  symLibNotebookNotation: 'Notación en cuaderno',
  symLibAbbreviated: 'Abreviado:',
  symLibShowingPrefix: 'Mostrando',
  symLibShowingOf: 'de',
  symLibTryInPad: 'Probar en cuaderno',
  symLibNoMatchesPrefix: 'No hay símbolos que coincidan con',
  symLibResetFilters: 'Restablecer filtros',
};

const fr: Translations = {
  brand: 'Cabina',
  navAriaLabel: 'Navigation principale',
  navMobileAriaLabel: 'Navigation mobile',
  uiLangAriaLabel: 'Langue de l’interface',
  navCurriculum: 'Parcours',
  navStudio: 'Studio',
  navRepositories: 'Répertoires',
  navProgress: 'Progrès',
  navCta: 'Pratiquer',
  heroTitle: 'Formation progressive en interprétation simultanée et consécutive',
  heroSubtitle:
    'Entraînez-vous avec des discours diplomatiques en espagnol, français et arabe, des voix de conférence naturelles, un bloc de prise de notes symbolique, l’enregistrement comparatif A/B, l’analyse vocale IA et le chiffrement local AES-GCM.',
  heroStartSimultaneous: 'Cabine Simultanée',
  heroStartConsecutive: 'Studio Consécutive',
  heroImageAlt: 'Cabine d’interprétation simultanée en conférence internationale',
  heroBoothBadge: 'Studio Double Cabine · ES · FR · AR',
  heroTechBadge: 'AES-GCM-256 · PWA Hors ligne',
  curriculumTitle: 'Parcours Progressif par Étapes',
  curriculumSubtitle:
    'Du shadowing initial et de la maîtrise du décalage jusqu’aux discours complets des Nations Unies et de l’Union européenne.',
  stageLabel: 'Étape',
  modeSimultaneous: 'Simultanée',
  modeConsecutive: 'Consécutive',
  exerciseActiveBadge: 'Actif au studio',
  loadExerciseBtn: 'Charger l’exercice →',
  editorialRozanTag: 'Méthode Rozan & Matyssek',
  editorialRozanTitle: 'Prise de notes axée sur le sens',
  editorialRozanDesc:
    'La verticalité et l’étagement diagonal permettent de saisir la structure logique d’un discours d’un seul coup d’œil sans déchiffrer des mots isolés.',
  editorialRozanTags:
    'Transposition des idées · Abréviation · Connecteurs en marge gauche · Négation et emphase',
  editorialReposTag: 'Entraînement sur sources réelles',
  editorialReposTitle: 'Répertoires des Nations Unies et de l’Union européenne',
  editorialReposDesc:
    'Associez les exercices guidés de cette cabine aux discours réels de l’ONU (DGACM) et de la Commission européenne (DG SCIC) pour consolider votre débit.',
  editorialReposTags: 'UN Web TV · UNTERM · DG SCIC Speech Repository · IATE · Réseau EMCI',
  studioTitle: 'Studio de Pratique Active',
  sourceLangLabel: 'Langue source',
  targetLangLabel: 'Langue cible',
  voicePersonaLabel: 'Voix de l’orateur (humaine)',
  voiceStyleLabel: 'Registre et cadence orale',
  originalChannelLabel: 'Audio de conférence',
  interpreterBoothLabel: 'Cabine de l’Interprète',
  showScriptBtn: 'Afficher / modifier le texte source',
  hideScriptBtn: 'Masquer la transcription guide',
  generateSpeechBtn: 'Générer une voix de conférence',
  generatingSpeech: 'Synthèse vocale naturelle...',
  conferenceAudioReady: 'Audio humain de conférence prêt à être écouté.',
  speechFallbackHint: 'Synthèse locale du navigateur disponible hors ligne.',
  playOriginal: 'Écouter l’original',
  pauseAudio: 'Pause',
  playbackSpeed: 'Vitesse',
  decalageLabel: 'Décalage cible',
  recordStart: 'Enregistrer l’interprétation',
  recordStop: 'Arrêter l’enregistrement',
  recordingActive: 'Enregistrement haute fidélité en cours',
  resetRecordingBtn: 'Réinitialiser',
  micUnavailableError:
    'Accès au microphone refusé ou indisponible. Vous pouvez saisir votre interprétation ci-dessous pour l’évaluer.',
  manualTranscriptLabel:
    'Transcription manuelle facultative (sans microphone ou pour corriger le texte) :',
  manualTranscriptPlaceholder: 'Saisissez ou dictez votre interprétation en',
  compareTitle: 'Comparaison Original vs. Interprétation',
  playMyRecording: 'Écouter mon enregistrement',
  analyzeAiBtn: 'Analyser la voix (IA)',
  analyzingAi: 'Transcription et évaluation...',
  saveLocalEncrypted: 'Sauvegarder (coffre AES-GCM)',
  savedLocally: 'Chiffré localement (AES-GCM)',
  detectedTranscriptLabel: 'Transcription détectée :',
  glossaryTitle: 'Glossaire de Cabine et Stratégie Simultanée',
  glossaryTip1Prefix: '1. Attendez',
  glossaryTip1Suffix: 's pour saisir l’unité minimale de sens (S+V).',
  glossaryTip2: '2. Transformez les subordonnées longues en propositions coordonnées courtes.',
  glossaryTip3: '3. Notez brièvement chiffres et sigles tout en parlant au micro.',
  glossaryManualLink: 'Consulter le manuel complet (Simultanée et Rozan) →',
  notesTitle: 'Bloc de Prise de Notes Consécutive',
  notesTabCanvas: 'Canevas Tactile',
  notesTabStructured: 'Schéma S-V-O',
  notesMarginHint: 'Marge ∵ ∴ ∥',
  notesDiagonalHint: 'Étagement diagonal : Marge → Sujet → Verbe → Objet',
  notesTemplateBtn: '+ Modèle diagonal S-V-O',
  notesUndoBtn: 'Annuler',
  notesPlaceholder: 'Notez la structure S-V-O, les connecteurs ou votre synthèse...',
  clearCanvas: 'Effacer le canevas',
  aiSymbolSuggestions: 'Suggérer des symboles (IA)',
  suggestingSymbols: 'Analyse des concepts...',
  retryBtn: 'Réessayer',
  symbolPaletteTitle: 'Symboles usuels (Rozan / Matyssek)',
  evaluationTitle: 'Évaluation Vocale et Terminologique',
  fluencyLabel: 'Fluidité',
  precisionLabel: 'Précision',
  intonationLabel: 'Intonation',
  wpmLabel: 'Débit',
  wpmUnit: 'MPM',
  pauseAnalysisLabel: 'Gestion des pauses et du rythme',
  prosodyLabel: 'Prosodie et intonation',
  fidelityLabel: 'Fidélité sémantique',
  recommendationsLabel: 'Exercices recommandés',
  repositoriesTitle: 'Répertoires Officiels et Facultés',
  repositoriesSubtitle:
    'Accès direct aux banques de discours des Nations Unies, de la Commission et du Parlement européen, ainsi qu’aux facultés de Traduction et d’Interprétation.',
  repoAll: 'Tous',
  repoUn: 'Nations Unies',
  repoEu: 'Union européenne',
  repoUniversities: 'Universités',
  visitResource: 'Ouvrir la ressource officielle',
  progressTitle: 'Métriques, Exportation et Sauvegarde Chiffrée',
  progressSubtitle:
    'Votre historique complet reste chiffré localement dans IndexedDB. Exportez des dossiers PDF ou créez des sauvegardes portables chiffrées.',
  exportPdfBtn: 'Exporter le rapport PDF',
  exportJsonBtn: 'Exporter la session JSON',
  exportMarkdownBtn: 'Exporter les notes MD',
  metricEncryptedSessions: 'Sessions chiffrées',
  metricAvgFluency: 'Fluidité moyenne',
  metricAvgPrecision: 'Précision moyenne',
  metricAvgIntonation: 'Intonation moyenne',
  metricAvgSpeed: 'Débit moyen',
  emptyHistoryTitle: 'Aucune session enregistrée pour l’instant',
  emptyHistoryDesc:
    'Terminez un exercice au studio et enregistrez-le dans votre coffre local chiffré pour suivre votre progression.',
  listenBtn: 'Écouter',
  playingBtn: 'Lecture...',
  deleteSessionLabel: 'Supprimer la session',
  vaultTitle: 'Coffre Local AES-GCM-256 et Confidentialité',
  vaultSubtitle:
    'Aucun audio ni aucune donnée personnelle ne quitte votre appareil sans chiffrement de bout en bout.',
  authTitle: 'Profil Local Privé (Sans Données Personnelles)',
  authSubtitle:
    'Travaillez en mode anonyme instantané ou définissez un alias local pour vos rapports PDF, sans compte externe ni e-mail.',
  anonDeviceStatus: 'Session anonyme sur l’appareil',
  localAliasStatus: 'Profil local sans données personnelles',
  usernameLabel: 'Alias local facultatif',
  passwordLabel: 'Mot de passe (min. 8 caractères)',
  loginBtn: 'Enregistrer l’alias',
  registerBtn: 'Enregistrer l’alias',
  anonymousBtn: 'Mode anonyme local',
  aliasErrorEmpty: 'Saisissez un alias de 3 à 24 caractères (lettres, chiffres, _ ou -).',
  aliasErrorInvalid: 'Seuls 3 à 24 caractères alphanumériques, tirets ou _ sont autorisés.',
  aliasSavedPrefix: 'Alias local actif :',
  anonActivatedPrefix: 'Session anonyme locale activée :',
  cloudBackupTitle: 'Sauvegarde Chiffrée Portable (AES-GCM-256)',
  cloudBackupSubtitle:
    'Empaquetez votre historique chiffré avec une clé maître PBKDF2 + AES-GCM-256 pour le transférer en toute confidentialité entre appareils sans serveur externe.',
  backupLabelPlaceholder: 'Libellé de sauvegarde',
  backupPassphraseLabel: 'Clé maître de chiffrement (min. 8 car.)',
  createEncryptedBackup: 'Télécharger la sauvegarde (.enc.json)',
  restoreEncryptedBackup: 'Restaurer depuis un fichier chiffré',
  backupErrPassphrase: 'La clé maître doit contenir au moins 8 caractères.',
  backupErrPassphraseImport: 'Saisissez d’abord la clé maître utilisée pour chiffrer le fichier.',
  backupDownloadedPrefix: 'Sauvegarde chiffrée AES-GCM-256 téléchargée',
  backupRestoredPrefix: 'Restauration de',
  backupRestoredSuffix: 'sessions dans votre coffre local chiffré.',
  backupInvalidFile: 'Format de fichier chiffré non valide.',
  backupWrongKey: 'Clé maître incorrecte ou fichier chiffré endommagé.',
  offlineBanner: 'Mode hors ligne — Coffre local chiffré actif',
  installApp: 'Installer l’app',
  iosInstallTitle: 'Installer sur iPhone / iPad',
  iosInstallStep1: 'Appuyez sur le bouton Partager dans la barre inférieure de Safari.',
  iosInstallStep2: 'Sélectionnez Sur l’écran d’accueil pour activer le mode hors ligne.',
  closeLabel: 'Fermer',
  themeSystem: 'Auto',
  themeDark: 'Sombre',
  themeLight: 'Clair',
  privacyNotice: 'Zéro e-mail personnel · Chiffrement local AES-GCM-256',
  openSourceNotice: 'Logiciel gratuit et open source (MIT)',
  errorBoundaryTitle: 'Une interruption est survenue pendant la session',
  errorBoundaryReload: 'Recharger le studio',
  manualTitle: 'Manuel Technique : Simultanée, Consécutive et Prise de Notes',
  manualSubtitlePrefix:
    'Méthodologie étape par étape, analyse complète du système de Jean-François Rozan (hiérarchie des idées, connecteurs logiques et abréviations), carnets corrigés et bibliothèque interactive de',
  manualSubtitleSuffix: 'symboles essentiels.',
  manualTabSimultaneous: 'Simultanée',
  manualTabConsecutive: 'Consécutive & Rozan',
  manualTabExamples: 'Carnet corrigé',
  manualTabSymbols: 'Symboles',
  rozanPrinciplesHeading: '01. Les 7 Principes Fondamentaux de Jean-François Rozan',
  rozanPrinciplesSub:
    'Système classique de prise de notes consécutive adopté à l’ONU, à la DG SCIC et dans les facultés EMCI.',
  openPadInStudio: 'Ouvrir le bloc au studio',
  rozanHierarchyTag: '02. Hiérarchie des idées · Architecture spatiale de la page',
  rozanHierarchyHeading:
    'Comment hiérarchiser arguments principaux, subordination et emphase visuelle',
  rozanHierarchySub:
    'Dans la méthode Rozan, l’espace blanc informe autant que le trait : la position verticale et le retrait horizontal indiquent l’idée directrice et ses dépendances.',
  rozanConnectorsTag: '03. Connecteurs logiques · Colonne d’enchaînement argumentatif',
  rozanConnectorsHeading: 'Carte des connecteurs logiques et déclencheurs oraux multilingues',
  exploreSymbolsGrid: 'Explorer les symboles en grille →',
  colSymbol: 'Symbole',
  colLogicPlacement: 'Relation logique et emplacement',
  colTriggers: 'Déclencheurs oraux (ES / FR / AR)',
  colSentenceNotation: 'Phrase et notation Rozan',
  rozanAbbrTag: '04. Abréviations Rozan · Exposants et sigles de conférence',
  rozanAbbrHeading: 'Abréviations courantes pour les notions économiques et politiques',
  rozanAbbrSub:
    'Appliquez la règle racine courte + exposant (ⁿ nom, º adjectif/état, ˢ pluriel) pour distinguer sans ambiguïté des concepts proches.',
  abbrAll: 'Toutes',
  abbrEconomy: 'Économie',
  abbrPolitics: 'Politique & Droit',
  abbrDomainEconomy: 'Économie & Finances',
  abbrDomainPolitics: 'Politique & Diplomatie',
  abbrExamplePrefix: 'Ex :',
  guideWhenToUse: 'Quand l’appliquer :',
  guideSpeakerInput: 'Entrée de l’orateur',
  guideRecommendedOutput: 'Résolution technique recommandée',
  guideCommonPitfall: 'Erreur fréquente :',
  guideBoothDrill: 'Exercice en cabine :',
  practiceInModePrefix: 'Pratiquer en mode',
  workedPracticeCanvas: 'Pratiquer sur le canevas →',
  workedOriginalSpeech: 'Discours original entendu',
  workedMarginHeader: 'Marge | Étagement Diagonal S → V → O',
  workedVisualReading: 'Lecture visuelle',
  symLibBadge: 'Bibliothèque Interactive',
  symLibSymbolsCount: 'symboles essentiels',
  symLibCategoriesCount: '7 catégories',
  symLibHeading: 'Répertoire visuel des symboles pour l’interprétation consécutive',
  symLibSub:
    'Cliquez sur n’importe quel symbole de la grille pour consulter sa signification exacte, son critère d’usage et un exemple complet en phrase institutionnelle.',
  symLibSearchPlaceholder: 'Rechercher un symbole, une notion...',
  symLibSearchAria: 'Rechercher un symbole de prise de notes',
  symLibCopy: 'Copier',
  symLibCopied: 'Copié',
  symLibCopyTitle: 'Copier le symbole dans le presse-papiers',
  symLibUsageCriterion: 'Critère de prise de notes',
  symLibConferenceSentence: 'Phrase de conférence (source orale)',
  symLibNotebookNotation: 'Notation sur carnet',
  symLibAbbreviated: 'Abrégé :',
  symLibShowingPrefix: 'Affichage de',
  symLibShowingOf: 'sur',
  symLibTryInPad: 'Essayer dans le bloc',
  symLibNoMatchesPrefix: 'Aucun symbole ne correspond à',
  symLibResetFilters: 'Réinitialiser les filtres',
};

const ar: Translations = {
  brand: 'Cabina',
  navAriaLabel: 'التنقل الرئيسي',
  navMobileAriaLabel: 'التنقل على الجوال',
  uiLangAriaLabel: 'لغة الواجهة',
  navCurriculum: 'المنهج',
  navStudio: 'الاستوديو',
  navRepositories: 'المصادر',
  navProgress: 'التقدم',
  navCta: 'ابدأ التدريب',
  heroTitle: 'التدريب التدريجي على الترجمة الفورية والتتبعية للمؤتمرات',
  heroSubtitle:
    'تدرّب باستخدام خطابات دبلوماسية بالإسبانية والفرنسية والعربية، وأصوات مؤتمرات بشرية طبيعية، ولوح تدوين الملاحظات بالرموز، والتسجيل المقارن، وتحليل الصوت بالذكاء الاصطناعي مع تشفير محلي AES-GCM.',
  heroStartSimultaneous: 'مقصورة الفورية',
  heroStartConsecutive: 'استوديو التتبعية',
  heroImageAlt: 'مقصورة ترجمة فورية في مؤتمر دولي',
  heroBoothBadge: 'استوديو المقصورة المزدوجة · ES · FR · AR',
  heroTechBadge: 'تشفير AES-GCM-256 · عمل دون إنترنت',
  curriculumTitle: 'المسار التدريبي التدرجي حسب المراحل',
  curriculumSubtitle:
    'من التظليل الصوتي الأولي وضبط الفارق الزمني حتى خطابات الأمم المتحدة والاتحاد الأوروبي الكاملة.',
  stageLabel: 'المرحلة',
  modeSimultaneous: 'الفورية',
  modeConsecutive: 'التتبعية',
  exerciseActiveBadge: 'نشط في الاستوديو',
  loadExerciseBtn: 'تحميل التمرين ←',
  editorialRozanTag: 'منهج روزان وماتيسيك',
  editorialRozanTitle: 'تدوين الملاحظات المرتكز على المعنى',
  editorialRozanDesc:
    'يتيح الترتيب العمودي والتدرج القطري قراءة البنية المنطقية للخطاب بنظرة واحدة دون فك رموز كلمات متفرقة.',
  editorialRozanTags:
    'نقل الفكرة لا الكلمة · الاختصار · الروابط في الهامش · النفي والتوكيد',
  editorialReposTag: 'تدريب على مواد حقيقية',
  editorialReposTitle: 'مستودعات الأمم المتحدة والاتحاد الأوروبي',
  editorialReposDesc:
    'اجمع بين التمارين الموجهة في هذه المقصورة والخطابات الرسمية للأمم المتحدة والمفوضية الأوروبية لترسيخ سرعتك في ظروف حقيقية.',
  editorialReposTags: 'UN Web TV · UNTERM · DG SCIC Speech Repository · IATE · شبكة EMCI',
  studioTitle: 'استوديو التدريب النشط',
  sourceLangLabel: 'لغة المصدر (الإدخال)',
  targetLangLabel: 'لغة الهدف (الإخراج)',
  voicePersonaLabel: 'صوت المتحدث (بشري طبيعي)',
  voiceStyleLabel: 'الأسلوب والإيقاع الصوتي',
  originalChannelLabel: 'صوت المؤتمر',
  interpreterBoothLabel: 'مقصورة المترجم الفوري',
  showScriptBtn: 'عرض / تعديل نص الخطاب',
  hideScriptBtn: 'إخفاء النص الإرشادي',
  generateSpeechBtn: 'توليد صوت المؤتمر',
  generatingSpeech: 'جارٍ توليد صوت بشري طبيعي...',
  conferenceAudioReady: 'تم إعداد صوت المؤتمر البشري بنجاح.',
  speechFallbackHint: 'يتوفر الصوت المحلي للمتصفح عند العمل دون اتصال.',
  playOriginal: 'تشغيل الأصل',
  pauseAudio: 'إيقاف مؤقت',
  playbackSpeed: 'السرعة',
  decalageLabel: 'الفارق الزمني المستهدف',
  recordStart: 'تسجيل الترجمة',
  recordStop: 'إيقاف التسجيل',
  recordingActive: 'تسجيل عالي الدقة قيد التشغيل',
  resetRecordingBtn: 'إعادة ضبط',
  micUnavailableError:
    'تم رفض الوصول إلى الميكروفون أو أنه غير متاح. يمكنك كتابة ترجمتك أدناه لتقييمها.',
  manualTranscriptLabel:
    'نص يدوي اختياري (إذا كنت تتدرب بدون ميكروفون أو ترغب في تعديل النص):',
  manualTranscriptPlaceholder: 'اكتب أو أمْلِ ترجمتك بلغة',
  compareTitle: 'مقارنة الأصل بالترجمة',
  playMyRecording: 'استمع إلى تسجيلي',
  analyzeAiBtn: 'تحليل الصوت بالذكاء الاصطناعي',
  analyzingAi: 'جارٍ التفريغ والتقييم...',
  saveLocalEncrypted: 'حفظ في الخزنة المشفرة',
  savedLocally: 'تم التشفير محلياً (AES-GCM)',
  detectedTranscriptLabel: 'النص الملتقط:',
  glossaryTitle: 'مسرد المقصورة واستراتيجية الفورية',
  glossaryTip1Prefix: '1. انتظر',
  glossaryTip1Suffix: 'ثوانٍ لالتقاط الوحدة الدلالية الدنيا (الفاعل + الفعل).',
  glossaryTip2: '2. حوّل الجمل الفرعية الطويلة إلى جمل معطوفة قصيرة وواضحة.',
  glossaryTip3: '3. دوّن الأرقام والاختصارات سريعاً على الورق أثناء التحدث في الميكروفون.',
  glossaryManualLink: 'عرض الدليل الكامل للتقنيات (الفورية وروزان) ←',
  notesTitle: 'دفتر تدوين الملاحظات التتبعية',
  notesTabCanvas: 'لوح الرسم اللمسي',
  notesTabStructured: 'مخطط الفاعل-الفعل-المفعول',
  notesMarginHint: 'الهامش ∵ ∴ ∥',
  notesDiagonalHint: 'التدرج القطري: الهامش ← الفاعل ← الفعل ← المفعول',
  notesTemplateBtn: '+ قالب التدرج القطري',
  notesUndoBtn: 'تراجع',
  notesPlaceholder: 'دوّن البنية القطرية والروابط المنطقية أو خلاصة الخطاب...',
  clearCanvas: 'مسح اللوح',
  aiSymbolSuggestions: 'اقتراح رموز بالذكاء الاصطناعي',
  suggestingSymbols: 'جارٍ تحليل المفاهيم...',
  retryBtn: 'إعادة المحاولة',
  symbolPaletteTitle: 'الرموز الشائعة (روزان / ماتيسيك)',
  evaluationTitle: 'التقييم الصوتي والمصطلحي',
  fluencyLabel: 'الطلاقة',
  precisionLabel: 'الدقة',
  intonationLabel: 'التنغيم',
  wpmLabel: 'السرعة',
  wpmUnit: 'كلمة/د',
  pauseAnalysisLabel: 'ضبط الوقفات والإيقاع',
  prosodyLabel: 'التنغيم والنبر الصوتي',
  fidelityLabel: 'الأمانة الدلالية',
  recommendationsLabel: 'تمارين مقترحة',
  repositoriesTitle: 'المستودعات الرسمية والكليات الأكاديمية',
  repositoriesSubtitle:
    'وصول مباشر إلى بنوك خطابات الأمم المتحدة والمفوضية والبرلمان الأوروبي وكليات الترجمة التحريرية والشفوية.',
  repoAll: 'الكل',
  repoUn: 'الأمم المتحدة',
  repoEu: 'الاتحاد الأوروبي',
  repoUniversities: 'الجامعات',
  visitResource: 'فتح المصدر الرسمي',
  progressTitle: 'المقاييس والتصدير والنسخ الاحتياطي المشفر',
  progressSubtitle:
    'يظل سجلك الكامل مشفراً محلياً في IndexedDB. صدّر تقارير PDF أو أنشئ نسخاً احتياطية مشفرة قابلة للنقل.',
  exportPdfBtn: 'تصدير تقرير PDF',
  exportJsonBtn: 'تصدير الجلسة JSON',
  exportMarkdownBtn: 'تصدير الملاحظات MD',
  metricEncryptedSessions: 'جلسات مشفرة',
  metricAvgFluency: 'متوسط الطلاقة',
  metricAvgPrecision: 'متوسط الدقة',
  metricAvgIntonation: 'متوسط التنغيم',
  metricAvgSpeed: 'متوسط السرعة',
  emptyHistoryTitle: 'لا توجد جلسات محفوظة بعد',
  emptyHistoryDesc:
    'أكمل تدريباً في الاستوديو واحفظه في خزنتك المحلية المشفرة لمتابعة تطورك.',
  listenBtn: 'استماع',
  playingBtn: 'قيد التشغيل...',
  deleteSessionLabel: 'حذف الجلسة',
  vaultTitle: 'الخزنة المحلية AES-GCM-256 والخصوصية',
  vaultSubtitle: 'لا يغادر أي تسجيل صوتي أو بيان شخصي جهازك دون تشفير مسبق من طرف إلى طرف.',
  authTitle: 'ملف محلي خاص (دون بيانات شخصية)',
  authSubtitle:
    'اعمل بوضع مجهول فوري أو خصص اسماً مستعاراً محلياً لتقاريرك، دون حسابات خارجية أو بريد إلكتروني.',
  anonDeviceStatus: 'جلسة مجهولة على الجهاز',
  localAliasStatus: 'ملف محلي خالٍ من البيانات الشخصية',
  usernameLabel: 'اسم مستعار محلي اختياري',
  passwordLabel: 'كلمة المرور (8 أحرف على الأقل)',
  loginBtn: 'حفظ الاسم المحلي',
  registerBtn: 'حفظ الاسم المحلي',
  anonymousBtn: 'الوضع المجهول المحلي',
  aliasErrorEmpty: 'أدخل اسماً مستعاراً من 3 إلى 24 حرفاً (أحرف لاتينية أو أرقام أو _ أو -).',
  aliasErrorInvalid: 'يُسمح فقط بـ 3 إلى 24 حرفاً وأرقاماً وشرطات.',
  aliasSavedPrefix: 'الاسم المستعار النشط:',
  anonActivatedPrefix: 'تم تفعيل الجلسة المجهولة:',
  cloudBackupTitle: 'نسخة احتياطية مشفرة محمولة (AES-GCM-256)',
  cloudBackupSubtitle:
    'اجمع سجلك المشفر بمفتاح رئيسي PBKDF2 + AES-GCM-256 لنقله بخصوصية تامة بين أجهزتك دون خوادم خارجية.',
  backupLabelPlaceholder: 'تسمية النسخة الاحتياطية',
  backupPassphraseLabel: 'المفتاح الرئيسي للتشفير (8 أحرف على الأقل)',
  createEncryptedBackup: 'تنزيل النسخة المشفرة (.enc.json)',
  restoreEncryptedBackup: 'استعادة من ملف مشفر',
  backupErrPassphrase: 'يجب أن يتكون المفتاح الرئيسي للتشفير من 8 أحرف على الأقل.',
  backupErrPassphraseImport: 'أدخل أولاً المفتاح الرئيسي المستخدم لتشفير الملف.',
  backupDownloadedPrefix: 'تم تنزيل النسخة المشفرة AES-GCM-256',
  backupRestoredPrefix: 'تمت استعادة',
  backupRestoredSuffix: 'جلسة في خزنتك المحلية المشفرة.',
  backupInvalidFile: 'تنسيق الملف المشفر غير صالح.',
  backupWrongKey: 'المفتاح الرئيسي غير صحيح أو الملف تالف.',
  offlineBanner: 'وضع عدم الاتصال — الخزنة المحلية المشفرة نشطة',
  installApp: 'تثبيت التطبيق',
  iosInstallTitle: 'التثبيت على iPhone / iPad',
  iosInstallStep1: 'اضغط على زر المشاركة في الشريط السفلي لمتصفح Safari.',
  iosInstallStep2: 'اختر الإضافة إلى الشاشة الرئيسية لتفعيل العمل دون اتصال.',
  closeLabel: 'إغلاق',
  themeSystem: 'تلقائي',
  themeDark: 'داكن',
  themeLight: 'فاتح',
  privacyNotice: 'دون بريد شخصي · تشفير محلي AES-GCM-256',
  openSourceNotice: 'برنامج مجاني ومفتوح المصدر (MIT)',
  errorBoundaryTitle: 'حدث انقطاع غير متوقع في الجلسة',
  errorBoundaryReload: 'إعادة تحميل الاستوديو',
  manualTitle: 'الدليل التقني: الفورية والتتبعية وتدوين الملاحظات',
  manualSubtitlePrefix:
    'منهجية عملية خطوة بخطوة، وتفصيل شامل لطريقة جان فرانسوا روزان (تسلسل الأفكار، الروابط المنطقية والاختصارات)، ودفاتر محلولة ومكتبة تفاعلية تضم',
  manualSubtitleSuffix: 'رمزاً أساسياً.',
  manualTabSimultaneous: 'الفورية',
  manualTabConsecutive: 'التتبعية وروزان',
  manualTabExamples: 'دفتر محلول',
  manualTabSymbols: 'الرموز',
  rozanPrinciplesHeading: '01. المبادئ السبعة الأساسية لجان فرانسوا روزان',
  rozanPrinciplesSub:
    'النظام الكلاسيكي لتدوين الملاحظات التتبعية المعتمد في الأمم المتحدة والاتحاد الأوروبي وكليات EMCI.',
  openPadInStudio: 'افتح الدفتر في الاستوديو',
  rozanHierarchyTag: '02. تسلسل الأفكار · البنية المكانية للصفحة',
  rozanHierarchyHeading: 'كيفية ترتيب الحجج الرئيسية والتبعية والتوكيد البصري',
  rozanHierarchySub:
    'في تقنية روزان، يقدّم الفراغ الأبيض معلومات بقدر الخط المكتوب: يحدد الموضع العمودي والإزاحة الأفقية الفكرة الحاكمة وما يتفرع عنها.',
  rozanConnectorsTag: '03. الروابط المنطقية · عمود الربط الحجاجي',
  rozanConnectorsHeading: 'خريطة الروابط المنطقية والمؤشرات الشفوية متعددة اللغات',
  exploreSymbolsGrid: 'استكشاف شبكة الرموز ←',
  colSymbol: 'الرمز',
  colLogicPlacement: 'العلاقة المنطقية والموضع',
  colTriggers: 'العبارات المفتاحية (ES / FR / AR)',
  colSentenceNotation: 'الجملة وتدوين روزان',
  rozanAbbrTag: '04. اختصارات روزان · اللواحق العلوية واختصارات المؤتمرات',
  rozanAbbrHeading: 'الاختصارات الشائعة للمفاهيم الاقتصادية والسياسية',
  rozanAbbrSub:
    'طبّق قاعدة الجذر القصير + اللاحقة العلوية (ⁿ اسم، º صفة/حالة، ˢ جمع) للتمييز الدقيق بين المفاهيم المتقاربة.',
  abbrAll: 'الكل',
  abbrEconomy: 'الاقتصاد',
  abbrPolitics: 'السياسة والقانون',
  abbrDomainEconomy: 'الاقتصاد والمالية',
  abbrDomainPolitics: 'السياسة والدبلوماسية',
  abbrExamplePrefix: 'مثال:',
  guideWhenToUse: 'متى تُستخدم:',
  guideSpeakerInput: 'مدخل المتحدث',
  guideRecommendedOutput: 'الحل التقني الموصى به',
  guideCommonPitfall: 'خطأ شائع:',
  guideBoothDrill: 'تمرين المقصورة:',
  practiceInModePrefix: 'تدرب بأسلوب',
  workedPracticeCanvas: 'التطبيق على اللوح ←',
  workedOriginalSpeech: 'الخطاب الأصلي المسموع',
  workedMarginHeader: 'الهامش | التدرج القطري: فاعل ← فعل ← مفعول',
  workedVisualReading: 'القراءة البصرية',
  symLibBadge: 'المكتبة التفاعلية',
  symLibSymbolsCount: 'رمزاً أساسياً',
  symLibCategoriesCount: '7 فئات',
  symLibHeading: 'المعجم البصري لرموز الترجمة التتبعية',
  symLibSub:
    'انقر على أي رمز في الشبكة لعرض معناه الدقيق ومعيار استخدامه ومثال تطبيقي كامل في جملة مؤسسية.',
  symLibSearchPlaceholder: 'ابحث عن رمز أو مفهوم أو جملة...',
  symLibSearchAria: 'البحث عن رمز لتدوين الملاحظات',
  symLibCopy: 'نسخ',
  symLibCopied: 'تم النسخ',
  symLibCopyTitle: 'نسخ الرمز إلى الحافظة',
  symLibUsageCriterion: 'معيار تدوين الملاحظات',
  symLibConferenceSentence: 'جملة مؤتمر (المصدر الشفوي)',
  symLibNotebookNotation: 'التدوين في الدفتر',
  symLibAbbreviated: 'اختصار:',
  symLibShowingPrefix: 'عرض',
  symLibShowingOf: 'من أصل',
  symLibTryInPad: 'تجربة في الدفتر',
  symLibNoMatchesPrefix: 'لا توجد رموز تطابق',
  symLibResetFilters: 'إعادة ضبط الفلاتر',
};

export const TRANSLATIONS: Record<UiLang, Translations> = {
  es,
  fr,
  ar,
};
