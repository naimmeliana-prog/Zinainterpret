import type { UiLang } from '../types';

export const UI_LANGUAGE_LABELS: Record<UiLang, string> = {
  es: 'Español',
  en: 'English',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
};

export interface Translations {
  brand: string;
  navCurriculum: string;
  navStudio: string;
  navRepositories: string;
  navProgress: string;
  navCta: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStartSimultaneous: string;
  heroStartConsecutive: string;
  curriculumTitle: string;
  curriculumSubtitle: string;
  stageLabel: string;
  modeSimultaneous: string;
  modeConsecutive: string;
  studioTitle: string;
  sourceLangLabel: string;
  targetLangLabel: string;
  generateSpeechBtn: string;
  generatingSpeech: string;
  playOriginal: string;
  pauseAudio: string;
  playbackSpeed: string;
  decalageLabel: string;
  recordStart: string;
  recordStop: string;
  recordingActive: string;
  compareTitle: string;
  playMyRecording: string;
  analyzeAiBtn: string;
  analyzingAi: string;
  saveLocalEncrypted: string;
  savedLocally: string;
  notesTitle: string;
  notesPlaceholder: string;
  clearCanvas: string;
  aiSymbolSuggestions: string;
  suggestingSymbols: string;
  symbolPaletteTitle: string;
  evaluationTitle: string;
  fluencyLabel: string;
  precisionLabel: string;
  intonationLabel: string;
  wpmLabel: string;
  pauseAnalysisLabel: string;
  prosodyLabel: string;
  fidelityLabel: string;
  recommendationsLabel: string;
  repositoriesTitle: string;
  repositoriesSubtitle: string;
  repoUn: string;
  repoEu: string;
  repoUniversities: string;
  visitResource: string;
  progressTitle: string;
  progressSubtitle: string;
  exportPdfBtn: string;
  exportJsonBtn: string;
  exportMarkdownBtn: string;
  emptyHistoryTitle: string;
  emptyHistoryDesc: string;
  vaultTitle: string;
  vaultSubtitle: string;
  authTitle: string;
  authSubtitle: string;
  usernameLabel: string;
  passwordLabel: string;
  loginBtn: string;
  registerBtn: string;
  anonymousBtn: string;
  googleFallbackBtn: string;
  signOutBtn: string;
  cloudBackupTitle: string;
  backupPassphraseLabel: string;
  createEncryptedBackup: string;
  restoreEncryptedBackup: string;
  githubVercelTitle: string;
  githubVercelSubtitle: string;
  offlineBanner: string;
  installApp: string;
  themeSystem: string;
  themeDark: string;
  themeLight: string;
  privacyNotice: string;
  openSourceNotice: string;
}

const es: Translations = {
  brand: 'Cabina',
  navCurriculum: 'Currículo',
  navStudio: 'Estudio',
  navRepositories: 'Repositorios',
  navProgress: 'Progreso',
  navCta: 'Practicar ahora',
  heroTitle: 'Formación progresiva en interpretación simultánea y consecutiva',
  heroSubtitle:
    'Entrena con discursos diplomáticos multilingües, lienzo de toma de notas con símbolos, grabación comparativa A/B, análisis de voz con IA y cifrado local AES-GCM sin salir de tu dispositivo.',
  heroStartSimultaneous: 'Cabina Simultánea',
  heroStartConsecutive: 'Estudio Consecutiva',
  curriculumTitle: 'Itinerario Progresivo por Etapas',
  curriculumSubtitle:
    'Desde el shadowing inicial y control de décalage hasta discursos completos de Naciones Unidas y la Unión Europea.',
  stageLabel: 'Etapa',
  modeSimultaneous: 'Simultánea',
  modeConsecutive: 'Consecutiva',
  studioTitle: 'Estudio de Práctica Activa',
  sourceLangLabel: 'Idioma de entrada',
  targetLangLabel: 'Idioma de salida',
  generateSpeechBtn: 'Sintetizar discurso',
  generatingSpeech: 'Generando audio...',
  playOriginal: 'Reproducir original',
  pauseAudio: 'Pausar',
  playbackSpeed: 'Velocidad',
  decalageLabel: 'Décalage objetivo',
  recordStart: 'Grabar interpretación',
  recordStop: 'Detener grabación',
  recordingActive: 'Grabando en alta fidelidad',
  compareTitle: 'Comparación Original vs. Interpretación',
  playMyRecording: 'Escuchar mi grabación',
  analyzeAiBtn: 'Analizar voz con IA',
  analyzingAi: 'Transcribiendo y evaluando...',
  saveLocalEncrypted: 'Guardar en bóveda cifrada',
  savedLocally: 'Cifrado localmente (AES-GCM)',
  notesTitle: 'Cuaderno de Toma de Notas Consecutiva',
  notesPlaceholder: 'Anota estructura S-V-O, conectores lógicos o transcribe tu síntesis...',
  clearCanvas: 'Limpiar lienzo',
  aiSymbolSuggestions: 'Sugerir símbolos con IA',
  suggestingSymbols: 'Analizando conceptos...',
  symbolPaletteTitle: 'Símbolos habituales (Rozan / Matyssek)',
  evaluationTitle: 'Evaluación Vocal y Terminológica',
  fluencyLabel: 'Fluidez',
  precisionLabel: 'Precisión',
  intonationLabel: 'Entonación',
  wpmLabel: 'Velocidad',
  pauseAnalysisLabel: 'Control de pausas y ritmo',
  prosodyLabel: 'Prosodia y entonación',
  fidelityLabel: 'Fidelidad semántica',
  recommendationsLabel: 'Ejercicios recomendados',
  repositoriesTitle: 'Repositorios Oficiales y Facultades',
  repositoriesSubtitle:
    'Acceso directo a bancos de discursos de Naciones Unidas, Comisión y Parlamento Europeo, y departamentos universitarios de Traducción e Interpretación.',
  repoUn: 'Naciones Unidas',
  repoEu: 'Unión Europea',
  repoUniversities: 'Universidades',
  visitResource: 'Abrir recurso oficial',
  progressTitle: 'Métricas, Exportación y Sincronización',
  progressSubtitle:
    'Tu historial completo se cifra localmente en IndexedDB. Exporta informes en PDF o crea copias de seguridad cifradas en la nube.',
  exportPdfBtn: 'Exportar informe PDF',
  exportJsonBtn: 'Exportar sesión JSON',
  exportMarkdownBtn: 'Exportar notas MD',
  emptyHistoryTitle: 'Sin sesiones guardadas todavía',
  emptyHistoryDesc:
    'Completa una práctica en el estudio y guárdala en tu bóveda cifrada local para visualizar tu evolución.',
  vaultTitle: 'Bóveda Local AES-GCM-256 y Privacidad',
  vaultSubtitle:
    'Ningún audio ni dato personal abandona tu dispositivo sin cifrado previo de extremo a extremo.',
  authTitle: 'Acceso Privado sin Datos Personales',
  authSubtitle:
    'Regístrate solo con usuario y contraseña (sin email) o entra en modo anónimo instantáneo.',
  usernameLabel: 'Nombre de usuario',
  passwordLabel: 'Contraseña (mín. 8 caracteres)',
  loginBtn: 'Iniciar sesión',
  registerBtn: 'Crear usuario privado',
  anonymousBtn: 'Entrar en modo anónimo',
  googleFallbackBtn: 'Continuar con Google',
  signOutBtn: 'Cerrar sesión',
  cloudBackupTitle: 'Copia de Seguridad Cifrada en la Nube',
  backupPassphraseLabel: 'Clave maestra de cifrado para respaldo',
  createEncryptedBackup: 'Subir copia cifrada a Firestore',
  restoreEncryptedBackup: 'Restaurar copia',
  githubVercelTitle: 'Sincronización GitHub y Despliegue Vercel',
  githubVercelSubtitle:
    'Repositorio preparado con CI/CD, funciones serverless y licencia MIT de código abierto.',
  offlineBanner: 'Modo sin conexión — Bóveda local cifrada activa',
  installApp: 'Instalar app',
  themeSystem: 'Auto',
  themeDark: 'Oscuro',
  themeLight: 'Claro',
  privacyNotice: 'Cero correo personal · Cifrado local AES-GCM-256',
  openSourceNotice: 'Software gratuito y de código abierto (MIT)',
};

const en: Translations = {
  brand: 'Cabina',
  navCurriculum: 'Curriculum',
  navStudio: 'Studio',
  navRepositories: 'Repositories',
  navProgress: 'Progress',
  navCta: 'Start Practice',
  heroTitle: 'Progressive training in simultaneous and consecutive interpreting',
  heroSubtitle:
    'Train with multilingual diplomatic speeches, consecutive note-taking symbol canvas, A/B comparative recording, AI voice analysis, and AES-GCM local encryption.',
  heroStartSimultaneous: 'Simultaneous Booth',
  heroStartConsecutive: 'Consecutive Studio',
  curriculumTitle: 'Progressive Stage Curriculum',
  curriculumSubtitle:
    'From initial shadowing and ear-voice span control to full United Nations and European Union plenary speeches.',
  stageLabel: 'Stage',
  modeSimultaneous: 'Simultaneous',
  modeConsecutive: 'Consecutive',
  studioTitle: 'Active Practice Studio',
  sourceLangLabel: 'Source language',
  targetLangLabel: 'Target language',
  generateSpeechBtn: 'Synthesize speech',
  generatingSpeech: 'Generating audio...',
  playOriginal: 'Play original',
  pauseAudio: 'Pause',
  playbackSpeed: 'Speed',
  decalageLabel: 'Target décalage',
  recordStart: 'Record interpretation',
  recordStop: 'Stop recording',
  recordingActive: 'Recording in high fidelity',
  compareTitle: 'Original vs. Interpretation Comparison',
  playMyRecording: 'Play my recording',
  analyzeAiBtn: 'Analyze voice with AI',
  analyzingAi: 'Transcribing and evaluating...',
  saveLocalEncrypted: 'Save to encrypted vault',
  savedLocally: 'Locally encrypted (AES-GCM)',
  notesTitle: 'Consecutive Note-Taking Pad',
  notesPlaceholder: 'Write S-V-O structure, logical connectors, or summary notes...',
  clearCanvas: 'Clear canvas',
  aiSymbolSuggestions: 'Suggest symbols with AI',
  suggestingSymbols: 'Analyzing concepts...',
  symbolPaletteTitle: 'High-frequency symbols (Rozan / Matyssek)',
  evaluationTitle: 'Vocal & Terminological Evaluation',
  fluencyLabel: 'Fluency',
  precisionLabel: 'Precision',
  intonationLabel: 'Intonation',
  wpmLabel: 'Pace',
  pauseAnalysisLabel: 'Pause & cadence control',
  prosodyLabel: 'Prosody & intonation',
  fidelityLabel: 'Semantic fidelity',
  recommendationsLabel: 'Recommended drills',
  repositoriesTitle: 'Official Repositories & Academic Departments',
  repositoriesSubtitle:
    'Direct links to United Nations, European Commission & Parliament speech banks, and university Translation & Interpreting faculties.',
  repoUn: 'United Nations',
  repoEu: 'European Union',
  repoUniversities: 'Universities',
  visitResource: 'Open official resource',
  progressTitle: 'Metrics, Export & Cloud Sync',
  progressSubtitle:
    'Your entire practice log stays encrypted locally in IndexedDB. Export PDF dossiers or upload encrypted cloud backups.',
  exportPdfBtn: 'Export PDF report',
  exportJsonBtn: 'Export JSON session',
  exportMarkdownBtn: 'Export Markdown notes',
  emptyHistoryTitle: 'No saved sessions yet',
  emptyHistoryDesc:
    'Complete a studio exercise and save it to your local encrypted vault to track progress.',
  vaultTitle: 'AES-GCM-256 Local Vault & Privacy',
  vaultSubtitle: 'No raw audio or personal data ever leaves your device unencrypted.',
  authTitle: 'Private Access Without Personal Data',
  authSubtitle:
    'Register with username and password only (zero email required) or enter anonymous mode instantly.',
  usernameLabel: 'Username',
  passwordLabel: 'Password (min. 8 chars)',
  loginBtn: 'Sign in',
  registerBtn: 'Create private user',
  anonymousBtn: 'Enter anonymous mode',
  googleFallbackBtn: 'Continue with Google',
  signOutBtn: 'Sign out',
  cloudBackupTitle: 'Encrypted Cloud Backup',
  backupPassphraseLabel: 'Master encryption passphrase',
  createEncryptedBackup: 'Upload encrypted backup',
  restoreEncryptedBackup: 'Restore backup',
  githubVercelTitle: 'GitHub Sync & Vercel Deployment',
  githubVercelSubtitle:
    'Repository configured with CI/CD, serverless routes, and open-source MIT license.',
  offlineBanner: 'Offline mode — Local encrypted vault active',
  installApp: 'Install app',
  themeSystem: 'Auto',
  themeDark: 'Dark',
  themeLight: 'Light',
  privacyNotice: 'Zero personal email · AES-GCM-256 local encryption',
  openSourceNotice: 'Free & Open Source Software (MIT)',
};

const fr: Translations = {
  ...en,
  navCurriculum: 'Parcours',
  navStudio: 'Studio',
  navRepositories: 'Répertoires',
  navProgress: 'Progrès',
  navCta: 'Pratiquer',
  heroTitle: 'Formation progressive en interprétation simultanée et consécutive',
  heroStartSimultaneous: 'Cabine Simultanée',
  heroStartConsecutive: 'Studio Consécutive',
  curriculumTitle: 'Parcours Progressif par Étapes',
  stageLabel: 'Étape',
  modeSimultaneous: 'Simultanée',
  modeConsecutive: 'Consécutive',
  sourceLangLabel: 'Langue source',
  targetLangLabel: 'Langue cible',
  generateSpeechBtn: 'Synthétiser le discours',
  playOriginal: 'Écouter l’original',
  recordStart: 'Enregistrer',
  recordStop: 'Arrêter',
  analyzeAiBtn: 'Analyser la voix (IA)',
  saveLocalEncrypted: 'Sauvegarder (AES-GCM)',
  exportPdfBtn: 'Exporter en PDF',
  themeSystem: 'Auto',
  themeDark: 'Sombre',
  themeLight: 'Clair',
};

const de: Translations = {
  ...en,
  navCurriculum: 'Lehrplan',
  navStudio: 'Studio',
  navRepositories: 'Archive',
  navProgress: 'Fortschritt',
  navCta: 'Jetzt üben',
  heroTitle: 'Progressives Training für Simultan- und Konsekutivdolmetschen',
  heroStartSimultaneous: 'Simultankabine',
  heroStartConsecutive: 'Konsekutivstudio',
  curriculumTitle: 'Stufenweiser Lehrplan',
  stageLabel: 'Stufe',
  modeSimultaneous: 'Simultan',
  modeConsecutive: 'Konsekutiv',
  sourceLangLabel: 'Ausgangssprache',
  targetLangLabel: 'Zielsprache',
  generateSpeechBtn: 'Rede synthetisieren',
  playOriginal: 'Original abspielen',
  recordStart: 'Aufnahme starten',
  recordStop: 'Aufnahme stoppen',
  analyzeAiBtn: 'KI-Stimmanalyse',
  saveLocalEncrypted: 'Verschlüsselt speichern',
  exportPdfBtn: 'PDF exportieren',
  themeSystem: 'System',
  themeDark: 'Dunkel',
  themeLight: 'Hell',
};

const it: Translations = {
  ...en,
  navCurriculum: 'Percorso',
  navStudio: 'Studio',
  navRepositories: 'Archivi',
  navProgress: 'Progressi',
  navCta: 'Esercitati',
  heroTitle: 'Formazione progressiva in interpretazione simultanea e consecutiva',
  heroStartSimultaneous: 'Cabina Simultanea',
  heroStartConsecutive: 'Studio Consecutiva',
  curriculumTitle: 'Percorso Progressivo a Tappe',
  stageLabel: 'Tappa',
  modeSimultaneous: 'Simultanea',
  modeConsecutive: 'Consecutiva',
  sourceLangLabel: 'Lingua di partenza',
  targetLangLabel: 'Lingua di arrivo',
  generateSpeechBtn: 'Sintetizza discorso',
  playOriginal: 'Riproduci originale',
  recordStart: 'Registra',
  recordStop: 'Ferma',
  analyzeAiBtn: 'Analisi vocale IA',
  saveLocalEncrypted: 'Salva cifrato',
  exportPdfBtn: 'Esporta PDF',
  themeSystem: 'Auto',
  themeDark: 'Scuro',
  themeLight: 'Chiaro',
};

const pt: Translations = {
  ...en,
  navCurriculum: 'Currículo',
  navStudio: 'Estúdio',
  navRepositories: 'Repositórios',
  navProgress: 'Progresso',
  navCta: 'Praticar',
  heroTitle: 'Formação progressiva em interpretação simultânea e consecutiva',
  heroStartSimultaneous: 'Cabine Simultânea',
  heroStartConsecutive: 'Estúdio Consecutiva',
  curriculumTitle: 'Currículo Progressivo por Etapas',
  stageLabel: 'Etapa',
  modeSimultaneous: 'Simultânea',
  modeConsecutive: 'Consecutiva',
  sourceLangLabel: 'Idioma de entrada',
  targetLangLabel: 'Idioma de saída',
  generateSpeechBtn: 'Sintetizar discurso',
  playOriginal: 'Ouvir original',
  recordStart: 'Gravar',
  recordStop: 'Parar',
  analyzeAiBtn: 'Analisar voz com IA',
  saveLocalEncrypted: 'Salvar criptografado',
  exportPdfBtn: 'Exportar PDF',
  themeSystem: 'Auto',
  themeDark: 'Escuro',
  themeLight: 'Claro',
};

export const TRANSLATIONS: Record<UiLang, Translations> = {
  es,
  en,
  fr,
  de,
  it,
  pt,
};
