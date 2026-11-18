import type { ConferenceExercise, InstitutionalResource, NoteSymbol, SpeechLang } from '../types';

export const SPEECH_LANGUAGES: Array<{ code: SpeechLang; label: string; native: string }> = [
  { code: 'es', label: 'Español', native: 'Español' },
  { code: 'fr', label: 'Francés', native: 'Français' },
  { code: 'ar', label: 'Árabe', native: 'العربية' },
];

export const PROGRESSIVE_EXERCISES: ConferenceExercise[] = [
  {
    id: 'stage1-shadowing-un',
    stage: 1,
    mode: 'simultaneous',
    institution: 'ONU · Asamblea General',
    difficulty: 'A1-Foundational',
    targetWpm: 110,
    durationLabel: '2 min',
    titles: {
      es: 'Etapa 1 · Shadowing y Control de Décalage: Apertura Diplomática',
      fr: 'Étape 1 · Shadowing et Décalage : Ouverture Diplomatique',
      ar: 'المرحلة 1 · التظليل الصوتي وضبط الفارق الزمني: افتتاح دبلوماسي',
    },
    objectives: {
      es: 'Mantén un desfase constante de 2 a 3 segundos sin cortar tus propias frases ni omitir marcadores de cortesía institucional.',
      fr: 'Maintenir un décalage stable de 2 à 3 secondes sans couper les propositions ni omettre les formules protocolaires.',
      ar: 'حافظ على فارق زمني ثابت من ثانيتين إلى ثلاث ثوانٍ دون بتر الجمل أو إغفال عبارات المجاملة المؤسسية.',
    },
    terminology: [
      {
        term: 'Cooperación multilateral',
        note: {
          es: 'Coop. multilateral (ONU)',
          fr: 'Coopération multilatérale',
          ar: 'التعاون متعدد الأطراف',
        },
      },
      {
        term: 'Presidencia',
        note: {
          es: 'Señora Presidenta / Presidencia',
          fr: 'Madame la Présidente / Présidence',
          ar: 'السيدة الرئيسة / الرئاسة',
        },
      },
      {
        term: 'Desarrollo sostenible',
        note: {
          es: 'Agenda 2030 / ODS',
          fr: 'Développement durable',
          ar: 'التنمية المستدامة',
        },
      },
      {
        term: 'Cadenas de suministro',
        note: {
          es: 'Suministro esencial',
          fr: 'Chaînes d’approvisionnement',
          ar: 'سلاسل الإمداد الأساسية',
        },
      },
    ],
    scripts: {
      es: 'Señora Presidenta, distinguidos delegados. Al abrir este periodo de sesiones sobre cooperación multilateral, debemos recordar que ninguna nación puede afrontar en solitario los desafíos climáticos y energéticos de nuestra década. Proponemos reforzar los mecanismos de financiación transparente, proteger las cadenas de suministro esenciales y garantizar que las comunidades más vulnerables participen en la toma de decisiones desde hoy mismo.',
      fr: 'Madame la Présidente, mesdames et messieurs les délégués. En ouvrant cette session consacrée à la coopération multilatérale, nous devons rappeler qu’aucune nation ne peut affronter seule les défis climatiques et énergétiques de notre décennie. Nous proposons de renforcer les mécanismes de financement transparents, de sécuriser les chaînes d’approvisionnement essentielles et de garantir dès aujourd’hui la participation des communautés les plus vulnérables aux décisions.',
      ar: 'السيدة الرئيسة، أصحاب السعادة المندوبون الكرام. في مستهل هذه الدورة المخصصة للتعاون متعدد الأطراف، نؤكد أن أياً من دولنا لا تستطيع بمفردها مواجهة التحديات المناخية وتحديات الطاقة في هذا العقد. ومن هذا المنطلق، نقترح تعزيز آليات التمويل الشفاف، وحماية سلاسل الإمداد الحيوية، وضمان إشراك المجتمعات الأكثر هشاشة في صنع القرار بدءاً من اليوم.',
    },
  },
  {
    id: 'stage2-consecutive-rozan',
    stage: 2,
    mode: 'consecutive',
    institution: 'UE · DG SCIC',
    difficulty: 'B2-Intermediate',
    targetWpm: 125,
    durationLabel: '3 min',
    titles: {
      es: 'Etapa 2 · Toma de Notas Estructurada: Transición Digital Europea',
      fr: 'Étape 2 · Prise de Notes Structurée : Transition Numérique Européenne',
      ar: 'المرحلة 2 · تدوين الملاحظات المنهجي: التحول الرقمي الأوروبي',
    },
    objectives: {
      es: 'Aplica el escalonamiento diagonal de Rozan (Sujeto-Verbo-Objeto), subraya énfasis y utiliza flechas causales para reconstruir el discurso sin leer palabras aisladas.',
      fr: 'Appliquez l’étagement diagonal de Rozan (Sujet-Verbe-Objet) et les flèches causales pour restituer le discours avec fluidité.',
      ar: 'طبّق التدرج القطري لروزان (فاعل-فعل-مفعول) وضع خطاً للتوكيد واستخدم أسهم السببية لإعادة صياغة الخطاب بسلاسة.',
    },
    terminology: [
      {
        term: 'Interoperabilidad',
        note: {
          es: 'Compatibilidad entre sistemas',
          fr: 'Interopérabilité des systèmes',
          ar: 'قابلية التشغيل البيني',
        },
      },
      {
        term: 'Gobernanza de datos',
        note: {
          es: 'Marco regulatorio digital',
          fr: 'Gouvernance des données',
          ar: 'حوكمة البيانات',
        },
      },
      {
        term: 'PYMEs / PME',
        note: {
          es: 'Pequeñas y medianas empresas',
          fr: 'Petites et moyennes entreprises',
          ar: 'الشركات الصغيرة والمتوسطة',
        },
      },
      {
        term: 'Ciberresiliencia',
        note: {
          es: 'Protección de infraestructuras',
          fr: 'Cyberrésilience',
          ar: 'المرونة السيبرانية',
        },
      },
    ],
    scripts: {
      es: 'En primer lugar, la transición digital en Europa exige un equilibrio claro entre innovación abierta y protección de derechos fundamentales. Aunque las pequeñas y medianas empresas representan más del noventa por ciento del tejido productivo, muchas carecen aún de infraestructura segura. Por consiguiente, la Comisión propone destinar cuatro mil doscientos millones de euros hasta 2028 a centros regionales de formación técnica, reduciendo así la brecha de competencias digitales.',
      fr: 'Tout d’abord, la transition numérique en Europe exige un équilibre clair entre innovation ouverte et protection des droits fondamentaux. Bien que les petites et moyennes entreprises représentent plus de quatre-vingt-dix pour cent du tissu productif, beaucoup manquent encore d’infrastructures sûres. Par conséquent, la Commission propose d’allouer quatre milliards deux cents millions d’euros d’ici 2028 aux pôles régionaux de formation technique.',
      ar: 'أولاً، يتطلب التحول الرقمي تحقيق توازن واضح بين الابتكار المفتوح وحماية الحقوق الأساسية. وعلى الرغم من أن المؤسسات الصغيرة والمتوسطة تمثل أكثر من تسعين في المائة من النسيج الإنتاجي، فإن كثيراً منها لا يزال يفتقر إلى بنية تحتية رقمية آمنة. وبناءً على ذلك، نقترح تخصيص أربعة مليارات ومئتي مليون يورو حتى عام ألفين وثمانية وعشرين لمراكز التدريب التقني الإقليمية لتقليص الفجوة الرقمية.',
    },
  },
  {
    id: 'stage3-numbers-simultaneous',
    stage: 3,
    mode: 'simultaneous',
    institution: 'FAO / OMC · Comité Técnico',
    difficulty: 'C1-Advanced',
    targetWpm: 140,
    durationLabel: '3 min',
    titles: {
      es: 'Etapa 3 · Cifras, Siglas y Reformulación Sintáctica',
      fr: 'Étape 3 · Chiffres, Sigles et Reformulation Syntaxique',
      ar: 'المرحلة 3 · الأرقام والاختصارات وإعادة الصياغة النحوية',
    },
    objectives: {
      es: 'Precisión absoluta en porcentajes, fechas y magnitudes económicas combinada con segmentación activa ante subordinadas largas.',
      fr: 'Précision stricte des pourcentages, dates et montants, associée au saucissonnage actif des subordonnées denses.',
      ar: 'دقة تامة في النسب المئوية والتواريخ والأرقام الاقتصادية مع التقطيع النشط للجمل المتداخلة الطويلة.',
    },
    terminology: [
      {
        term: 'Interanual',
        note: {
          es: 'Comparación año tras año',
          fr: 'En glissement annuel',
          ar: 'على أساس سنوي',
        },
      },
      {
        term: 'Toneladas métricas',
        note: {
          es: 'Unidad de comercio agrícola',
          fr: 'Tonnes métriques',
          ar: 'أطنان مترية',
        },
      },
      {
        term: 'Flete marítimo',
        note: {
          es: 'Coste de transporte por mar',
          fr: 'Fret maritime',
          ar: 'الشحن البحري',
        },
      },
      {
        term: 'Restricciones fitosanitarias',
        note: {
          es: 'Control sanitario en frontera',
          fr: 'Restrictions phytosanitaires',
          ar: 'القيود الصحية النباتية',
        },
      },
    ],
    scripts: {
      es: 'Según el informe técnico publicado el diecisiete de noviembre, las exportaciones mundiales de cereales aumentaron un tres coma cuatro por ciento interanual, alcanzando cuatrocientas ochenta y cinco millones de toneladas métricas. Sin embargo, debido al encarecimiento del transporte marítimo en un dieciocho por ciento y a las restricciones fitosanitarias en catorce puertos estratégicos, el índice de precios de la FAO se situó en ciento veintisiete coma seis puntos.',
      fr: 'Selon le rapport technique publié le dix-sept novembre, les exportations mondiales de céréales ont progressé de trois virgule quatre pour cent en glissement annuel, atteignant quatre cent quatre-vingt-cinq millions de tonnes métriques. Toutefois, en raison d’une hausse de dix-huit pour cent du fret maritime et de restrictions phytosanitaires dans quatorze ports stratégiques, l’indice de la FAO s’est établi à cent vingt-sept virgule six points.',
      ar: 'وفقاً للتقرير الفني الصادر في السابع عشر من نوفمبر، ارتفعت صادرات الحبوب العالمية بنسبة ثلاثة فاصلة أربعة في المائة على أساس سنوي، لتبلغ أربعمئة وخمسة وثمانين مليون طن متري. غير أنه نظراً لارتفاع تكاليف الشحن البحري بنسبة ثمانية عشر في المائة والقيود الصحية النباتية في أربعة عشر ميناءً استراتيجياً، استقر مؤشر أسعار منظمة الأغذية والزراعة عند مئة وسبعة وعشرين فاصلة ست نقاط.',
    },
  },
  {
    id: 'stage4-diplomatic-consecutive',
    stage: 4,
    mode: 'consecutive',
    institution: 'Consejo de Seguridad · ONU',
    difficulty: 'C2-BoothReady',
    targetWpm: 145,
    durationLabel: '4 min',
    titles: {
      es: 'Etapa 4 · Consecutiva de Alta Densidad: Derecho Internacional Humanitario',
      fr: 'Étape 4 · Consécutive Haute Densité : Droit International Humanitaire',
      ar: 'المرحلة 4 · التتبعية عالية الكثافة: القانون الدولي الإنساني',
    },
    objectives: {
      es: 'Restitución completa de un discurso jurídico-diplomático con matices modales, entonación firme y cadencia de orador profesional.',
      fr: 'Restitution complète d’un discours juridico-diplomatique en préservant les nuances modales et l’intonation assertive.',
      ar: 'إعادة إنتاج كاملة لخطاب قانوني دبلوماسي مع صون الدلالات المعنوية والتنغيم الحازم وإيقاع الخطيب المحترف.',
    },
    terminology: [
      {
        term: 'Resolución vinculante',
        note: {
          es: 'Obligatoria según la Carta',
          fr: 'Résolution contraignante',
          ar: 'قرار ملزم',
        },
      },
      {
        term: 'Corredor humanitario',
        note: {
          es: 'Acceso seguro para ayuda',
          fr: 'Couloir humanitaire',
          ar: 'ممر إنساني آمن',
        },
      },
      {
        term: 'Rendición de cuentas',
        note: {
          es: 'Mecanismo independiente',
          fr: 'Mécanisme de responsabilité',
          ar: 'آلية المساءلة المستقلة',
        },
      },
      {
        term: 'Principio de proporcionalidad',
        note: {
          es: 'Norma esencial del DIH',
          fr: 'Principe de proportionnalité',
          ar: 'مبدأ التناسب',
        },
      },
    ],
    scripts: {
      es: 'Excelencias, la credibilidad de esta institución reside en nuestra capacidad colectiva para hacer cumplir el derecho internacional humanitario sin excepciones selectivas. Cuando la población civil queda privada de acceso médico, agua potable y corredores seguros, la inacción equivale a complicidad. Instamos a todas las partes a respetar el principio de proporcionalidad, facilitar la labor imparcial del personal humanitario y respaldar un mecanismo independiente de rendición de cuentas ante esta Asamblea.',
      fr: 'Excellences, la crédibilité de cette institution repose sur notre capacité collective à faire respecter le droit international humanitaire sans exceptions sélectives. Lorsque les populations civiles sont privées de soins médicaux, d’eau potable et de couloirs sûrs, l’inaction équivaut à une complicité. Nous exhortons toutes les parties à respecter le principe de proportionnalité et à soutenir un mécanisme indépendant de reddition des comptes devant cette Assemblée.',
      ar: 'أصحاب السعادة، إن مصداقية هذه المؤسسة تقوم على قدرتنا الجماعية على إنفاذ القانون الدولي الإنساني دون استثناءات انتقائية. فعندما يُحرم المدنيون من الرعاية الطبية والمياه الصالحة للشرب والممرات الآمنة، فإن التقاعس يغدو تواطؤاً. إننا نحث جميع الأطراف على احترام مبدأ التناسب، وتيسير العمل المحايد للطواقم الإنسانية، ودعم آلية مستقلة للمساءلة أمام هذه الجمعية.',
    },
  },
  {
    id: 'stage2b-simultaneous-chunking',
    stage: 2,
    mode: 'simultaneous',
    institution: 'Parlamento Europeo · Pleno',
    difficulty: 'B2-Intermediate',
    targetWpm: 135,
    durationLabel: '3 min',
    titles: {
      es: 'Etapa 2B · Segmentación y Anticipación en Debates Parlamentarios',
      fr: 'Étape 2B · Saucissonnage et Anticipation en Plénière',
      ar: 'المرحلة 2ب · التقطيع والاستباق في المناقشات البرلمانية',
    },
    objectives: {
      es: 'Aplica segmentación activa (saucissonnage) ante subordinadas incrustadas y anticipa estructuras concesivas sin perder el hilo principal.',
      fr: 'Appliquez le saucissonnage actif aux subordonnées imbriquées et anticipez les structures concessives.',
      ar: 'طبّق التقطيع النشط على الجمل الموصولة المتداخلة واستبق التراكيب الاستدراكية دون فقدان الفعل الرئيسي.',
    },
    terminology: [
      {
        term: 'Ponente parlamentario',
        note: {
          es: 'Autor del informe de comisión',
          fr: 'Rapporteur parlementaire',
          ar: 'المقرر البرلماني',
        },
      },
      {
        term: 'Objetivo vinculante',
        note: {
          es: 'Meta legalmente exigible',
          fr: 'Objectif contraignant',
          ar: 'هدف ملزم قانوناً',
        },
      },
      {
        term: 'Subsidiariedad',
        note: {
          es: 'Reparto competencial',
          fr: 'Principe de subsidiarité',
          ar: 'مبدأ التبعية والتفريع',
        },
      },
      {
        term: 'Enmienda conjunta',
        note: {
          es: 'Texto transaccional de grupos',
          fr: 'Amendement commun',
          ar: 'تعديل مشترك',
        },
      },
    ],
    scripts: {
      es: 'Señoría, aunque comprendemos las reservas expresadas ayer por la comisión de industria, que teme un incremento de los costes administrativos para los operadores locales, no podemos posponer la directiva sobre eficiencia energética. Cuanto antes armonicemos los estándares de auditoría, antes reduciremos la dependencia de combustibles importados y ofreceremos seguridad jurídica a quienes ya están invirtiendo en redes inteligentes.',
      fr: 'Chers collègues, bien que nous comprenions les réserves exprimées hier par la commission de l’industrie, qui craint une hausse des coûts administratifs pour les opérateurs locaux, nous ne pouvons pas reporter la directive sur l’efficacité énergétique. Plus tôt nous harmoniserons les normes d’audit, plus vite nous réduirons notre dépendance aux combustibles importés.',
      ar: 'السيدات والسادة النواب، على الرغم من تفهمنا للتحفظات التي أبدتها لجنة الصناعة بالأمس خشية ارتفاع التكاليف الإدارية على المشغلين المحليين، فإنه لا يمكننا تأجيل توجيه كفاءة الطاقة. فكلما أسرعنا في توحيد معايير التدقيق، تمكّنا بصورة أسرع من تقليص اعتمادنا على الوقود المستورد ومنح اليقين القانوني للمستثمرين في الشبكات الذكية.',
    },
  },
  {
    id: 'stage3b-consecutive-vertical',
    stage: 3,
    mode: 'consecutive',
    institution: 'PNUMA / UNEP · Foro Ambiental',
    difficulty: 'C1-Advanced',
    targetWpm: 130,
    durationLabel: '3.5 min',
    titles: {
      es: 'Etapa 3B · Verticalismo y Enumeraciones: Economía Circular Urbana',
      fr: 'Étape 3B · Verticalisme et Énumérations : Économie Circulaire',
      ar: 'المرحلة 3ب · الترتيب العمودي والتعداد: الاقتصاد الدائري الحضري',
    },
    objectives: {
      es: 'Entrena el sexto principio de Rozan (verticalismo) anotando listas de cuatro ejes en columna con conectores temporales y cifras porcentuales.',
      fr: 'Pratiquez le 6e principe de Rozan (verticalisme) en empilant quatre axes politiques en colonne.',
      ar: 'تدرّب على المبدأ السادس لروزان (العمودية) بتكديس أربعة محاور في عمود واحد مع المؤشرات الزمنية والنسب المئوية.',
    },
    terminology: [
      {
        term: 'Contratación pública circular',
        note: {
          es: 'Licitaciones sostenibles',
          fr: 'Marchés publics circulaires',
          ar: 'المشتريات العامة الدائرية',
        },
      },
      {
        term: 'Responsabilidad ampliada',
        note: {
          es: 'Ciclo completo del envase',
          fr: 'Responsabilité élargie du producteur',
          ar: 'المسؤولية الممتدة للمنتج',
        },
      },
      {
        term: 'Desvío de vertedero',
        note: {
          es: 'Reducción de residuos finales',
          fr: 'Réduction de la mise en décharge',
          ar: 'الحد من طمر النفايات',
        },
      },
      {
        term: 'Materias primas secundarias',
        note: {
          es: 'Materiales reciclados recuperados',
          fr: 'Matières premières secondaires',
          ar: 'المواد الخام الثانوية المستعادة',
        },
      },
    ],
    scripts: {
      es: 'Para transformar nuestras áreas metropolitanas antes de 2030, la estrategia municipal se apoya en cuatro pilares concretos: primero, contratación pública circular en todos los edificios nuevos; segundo, responsabilidad ampliada del productor para envases industriales; tercero, recuperación de materias primas secundarias en residuos electrónicos; y cuarto, reducción del sesenta por ciento en los envíos a vertedero. Sin una fiscalidad coherente, estos cuatro ejes quedarían en meras declaraciones.',
      fr: 'Pour transformer nos zones métropolitaines avant 2030, la stratégie municipale repose sur quatre piliers concrets : premièrement, les marchés publics circulaires pour tous les bâtiments neufs ; deuxièmement, la responsabilité élargie du producteur ; troisièmement, la récupération des matières premières secondaires ; et quatrièmement, une réduction de soixante pour cent de la mise en décharge. Sans fiscalité cohérente, ces quatre axes resteraient lettre morte.',
      ar: 'لتحويل مناطقنا الحضرية قبل عام ألفين وثلاثين، ترتكز الاستراتيجية البلدية على أربع ركائز ملموسة: أولاً، المشتريات العامة الدائرية في جميع المباني الجديدة؛ ثانياً، المسؤولية الممتدة للمنتج عن العبوات الصناعية؛ ثالثاً، استعادة المواد الخام الثانوية من النفايات الإلكترونية؛ ورابعاً، خفض طمر النفايات بنسبة ستين في المائة. ودون سياسة ضريبية متسقة، ستبقى هذه المحاور الأربعة مجرد تصريحات.',
    },
  },
];

export const CORE_NOTE_SYMBOLS: NoteSymbol[] = [
  {
    id: 'sym-because',
    symbol: '∵',
    meaning: {
      es: 'Porque / Debido a',
      fr: 'Parce que / En raison de',
      ar: 'لأن / بسبب',
    },
    category: 'logic',
    example: '∵ Δ costos → ↓ exp.',
  },
  {
    id: 'sym-therefore',
    symbol: '∴',
    meaning: {
      es: 'Por consiguiente / Así que',
      fr: 'Par conséquent',
      ar: 'وبالتالي / لذا',
    },
    category: 'logic',
    example: '∴ UE + €4.2B',
  },
  {
    id: 'sym-leads-to',
    symbol: '→',
    meaning: {
      es: 'Provoca / Conduce a / Dar',
      fr: 'Mène à / Entraîne',
      ar: 'يؤدي إلى / يفضي إلى',
    },
    category: 'logic',
    example: 'Inversión → empleo',
  },
  {
    id: 'sym-contrast',
    symbol: '≠ / ∥',
    meaning: {
      es: 'Sin embargo / En contraste',
      fr: 'Cependant / Par contre',
      ar: 'غير أن / في المقابل',
    },
    category: 'logic',
    example: '∥ falta infra.',
  },
  {
    id: 'sym-increase',
    symbol: '↗',
    meaning: {
      es: 'Aumento / Crecimiento',
      fr: 'Hausse / Croissance',
      ar: 'ارتفاع / نمو',
    },
    category: 'economy',
    example: 'Exp. cereales ↗ 3.4%',
  },
  {
    id: 'sym-decrease',
    symbol: '↘',
    meaning: {
      es: 'Descenso / Reducción',
      fr: 'Baisse / Réduction',
      ar: 'انخفاض / تراجع',
    },
    category: 'economy',
    example: 'Brecha digital ↘',
  },
  {
    id: 'sym-state',
    symbol: '□',
    meaning: {
      es: 'Estado / País / Nación',
      fr: 'État / Pays / Nation',
      ar: 'دولة / بلد / أمة',
    },
    category: 'diplomacy',
    example: '∀ □ coop. ONU',
  },
  {
    id: 'sym-assembly',
    symbol: '🏛',
    meaning: {
      es: 'Institución / Parlamento / Asamblea',
      fr: 'Institution / Assemblée',
      ar: 'مؤسسة / برلمان / جمعية',
    },
    category: 'diplomacy',
    example: '🏛 UE prop. 2028',
  },
  {
    id: 'sym-all',
    symbol: '∀',
    meaning: {
      es: 'Todos / Colectivo / Universal',
      fr: 'Tous / Collectif',
      ar: 'الجميع / شامل',
    },
    category: 'diplomacy',
    example: '∀ partes resp. DIH',
  },
  {
    id: 'sym-speech',
    symbol: '”',
    meaning: {
      es: 'Declarar / Afirmar / Sostener',
      fr: 'Déclarer / Affirmer',
      ar: 'صرح / أكد / أعلن',
    },
    category: 'stance',
    example: 'Del. ” urgencia',
  },
  {
    id: 'sym-approve',
    symbol: '✓',
    meaning: {
      es: 'Acuerdo / Aprobar / Respaldar',
      fr: 'Approuver / Soutenir',
      ar: 'موافقة / اعتماد / دعم',
    },
    category: 'stance',
    example: '✓ mecanismo indep.',
  },
  {
    id: 'sym-future',
    symbol: '⏭',
    meaning: {
      es: 'Futuro / Hasta / Plazo',
      fr: 'Futur / D’ici à',
      ar: 'مستقبل / بحلول / أجل',
    },
    category: 'time',
    example: '⏭ 2028',
  },
];

export const INSTITUTIONAL_RESOURCES: InstitutionalResource[] = [
  {
    id: 'un-speech-repo',
    category: 'un',
    name: 'UN Web TV & Official Plenary Recordings',
    organization: 'United Nations (DGACM)',
    countryOrScope: 'New York · Geneva · Vienna',
    url: 'https://webtv.un.org/',
    descriptions: {
      es: 'Retransmisiones y archivos multilingües de la Asamblea General, Consejo de Seguridad y comisiones en los 6 idiomas oficiales de la ONU.',
      fr: 'Archives et retransmissions multilingues de l’Assemblée générale et du Conseil de sécurité dans les 6 langues officielles de l’ONU.',
      ar: 'بث مباشر وأرشيف متعدد اللغات للجمعية العامة ومجلس الأمن واللجان باللغات الرسمية الست للأمم المتحدة (بما فيها العربية والفرنسية والإسبانية).',
    },
    tags: ['AR', 'FR', 'ES', 'EN'],
  },
  {
    id: 'un-careers-interpreters',
    category: 'un',
    name: 'UN Language Careers & Interpreting Exams (LCE)',
    organization: 'United Nations Careers',
    countryOrScope: 'Global UN Duty Stations',
    url: 'https://languagecareers.un.org/',
    descriptions: {
      es: 'Guías oficiales de preparación para oposiciones LCE de intérpretes de conferencias de Naciones Unidas y material de práctica.',
      fr: 'Guides officiels de préparation aux concours linguistiques (LCE) d’interprètes de conférence des Nations Unies.',
      ar: 'أدلة الإعداد الرسمية لمسابقات الأمم المتحدة التنافسية (LCE) لمترجمي المؤتمرات الفوريين ومواد التدريب.',
    },
    tags: ['LCE', 'Simultaneous', 'UNOG'],
  },
  {
    id: 'un-unterm',
    category: 'un',
    name: 'UNTERM — United Nations Terminology Database',
    organization: 'United Nations',
    countryOrScope: 'Terminología Multilingüe',
    url: 'https://unterm.un.org/',
    descriptions: {
      es: 'Base terminológica oficial de la ONU para preparar glosarios previos a cabina en derechos humanos, clima, desarme y economía.',
      fr: 'Base terminologique officielle de l’ONU pour la préparation de glossaires en cabine (droits humains, climat, économie).',
      ar: 'قاعدة المصطلحات الرسمية للأمم المتحدة لإعداد المسارد التحضيرية باللغات العربية والفرنسية والإسبانية قبل دخول المقصورة.',
    },
    tags: ['AR-FR-ES', 'Glossary'],
  },
  {
    id: 'eu-scic-repo',
    category: 'eu',
    name: 'DG SCIC Speech Repository (My Speech Repository)',
    organization: 'European Commission · DG Interpretation',
    countryOrScope: 'Brussels · 24+ Languages',
    url: 'https://speech-repository.ec.europa.eu/',
    descriptions: {
      es: 'El mayor banco pedagógico gratuito del mundo para practicar simultánea y consecutiva clasificado por nivel (básico, intermedio, avanzado, examen) e idioma.',
      fr: 'La banque de discours pédagogique de référence de la Commission européenne, classée par niveau et par langue.',
      ar: 'أكبر بنك خطابات تعليمي مجاني في العالم للتدرب على الفورية والتتبعية مصنفاً حسب المستوى واللغة.',
    },
    tags: ['DG SCIC', 'Simultaneous', 'Consecutive'],
  },
  {
    id: 'eu-ep-multimedia',
    category: 'eu',
    name: 'European Parliament Multimedia Centre & Plenaries',
    organization: 'European Parliament · DG LINC',
    countryOrScope: 'Strasbourg · Brussels',
    url: 'https://multimedia.europarl.europa.eu/',
    descriptions: {
      es: 'Debates reales del Parlamento Europeo con audio original y canales de interpretación simultánea en las 24 lenguas oficiales de la UE.',
      fr: 'Débats pléniers du Parlement européen avec canal original et interprétation simultanée dans les 24 langues officielles.',
      ar: 'مناقشات حقيقية للبرلمان الأوروبي بالصوت الأصلي وقنوات الترجمة الفورية بالفرنسية والإسبانية وسائر اللغات الرسمية.',
    },
    tags: ['ES / FR', 'Live Plenaries'],
  },
  {
    id: 'eu-iate',
    category: 'eu',
    name: 'IATE — Interactive Terminology for Europe',
    organization: 'European Union Interinstitutional',
    countryOrScope: 'EU Institutions',
    url: 'https://iate.europa.eu/',
    descriptions: {
      es: 'Base de datos terminológica interinstitucional de la Unión Europea indispensable para verificar equivalencias jurídicas, técnicas y económicas.',
      fr: 'Base terminologique interinstitutionnelle de l’UE indispensable pour vérifier les équivalences juridiques, techniques et économiques.',
      ar: 'قاعدة المصطلحات المشتركة بين مؤسسات الاتحاد الأوروبي للتحقق من المكافئات القانونية والتقنية والاقتصادية.',
    },
    tags: ['Terminology', 'EU Law'],
  },
  {
    id: 'uni-geneva-fti',
    category: 'universities',
    name: 'Faculté de Traduction et d’Interprétation (FTI)',
    organization: 'Université de Genève',
    countryOrScope: 'Ginebra, Suiza',
    url: 'https://www.unige.ch/fti/',
    descriptions: {
      es: 'Referente histórico mundial (ex-ETI) en formación de intérpretes de conferencias en estrecha colaboración con ONU Ginebra y organismos internacionales.',
      fr: 'Faculté de référence mondiale (anciennement ETI) en interprétation de conférence en lien étroit avec l’ONU à Genève.',
      ar: 'كلية مرجعية عالمية في تدريب مترجمي المؤتمرات بالتعاون الوثيق مع مقر الأمم المتحدة في جنيف والمنظمات الدولية.',
    },
    tags: ['MA Interpreting', 'EMCI'],
  },
  {
    id: 'uni-granada-fti',
    category: 'universities',
    name: 'Facultad de Traducción e Interpretación — UGR',
    organization: 'Universidad de Granada',
    countryOrScope: 'Granada, España',
    url: 'https://fti.ugr.es/',
    descriptions: {
      es: 'Departamento líder en España en grado y máster en Interpretación de Conferencias, investigación en toma de notas y cabinas ES-FR-AR.',
      fr: 'Faculté espagnole de référence en interprétation de conférence, prise de notes et combinaisons ES-FR-AR.',
      ar: 'كلية رائدة في إسبانيا في تخصصات الترجمة الفورية وتدوين الملاحظات مع مسارات متميزة في اللغات الإسبانية والفرنسية والعربية.',
    },
    tags: ['España', 'ES-FR-AR'],
  },
  {
    id: 'uni-sorbonne-esit',
    category: 'universities',
    name: 'ESIT — École Supérieure d’Interprètes et de Traducteurs',
    organization: 'Université Sorbonne Nouvelle',
    countryOrScope: 'París, Francia',
    url: 'https://www.sorbonne-nouvelle.fr/esit',
    descriptions: {
      es: 'Cuna de la Teoría Interpretativa del Sentido (Seleskovitch y Lederer), pilar metodológico de la consecutiva y simultánea moderna.',
      fr: 'Berceau de la Théorie Interprétative du Sens (Seleskovitch et Lederer), pilier de la formation en interprétation de conférence.',
      ar: 'مهد النظرية التأويلية للمعنى (سيليسكوفيتش وليديرير)، الركيزة المنهجية للترجمة التتبعية والفورية الحديثة.',
    },
    tags: ['EMCI', 'Paris', 'Methodology'],
  },
  {
    id: 'uni-uam-comillas',
    category: 'universities',
    name: 'Máster en Interpretación de Conferencias & EMCI Network',
    organization: 'Comillas / UAM / European Masters Consortium',
    countryOrScope: 'Madrid · Europa',
    url: 'https://www.emcinterpreting.org/',
    descriptions: {
      es: 'Red europea de másteres acreditados por DG SCIC y Parlamento Europeo con recursos didácticos abiertos, criterios de evaluación y pruebas de aptitud.',
      fr: 'Consortium européen de masters accrédités par la DG SCIC et le Parlement européen avec critères d’aptitude et ressources ouvertes.',
      ar: 'الشبكة الأوروبية لبرامج الماجستير المعتمدة لدى المفوضية والبرلمان الأوروبي مع موارد تعليمية مفتوحة ومعايير تقييم.',
    },
    tags: ['EMCI', 'Accredited', 'EU/UN'],
  },
];
