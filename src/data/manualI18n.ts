import type {
  NotebookWorkedExample,
  RozanAbbreviationItem,
  RozanConnectorItem,
  RozanHierarchyStep,
  TechniqueGuide,
  UiLang,
} from '../types';
import {
  NOTEBOOK_WORKED_EXAMPLES,
  ROZAN_ABBREVIATIONS,
  ROZAN_HIERARCHY_STEPS,
  ROZAN_LOGICAL_CONNECTORS,
  TECHNIQUE_GUIDES,
} from './techniquesAndSymbols';

export interface RozanPrincipleItem {
  num: string;
  title: string;
  detail: string;
}

export const ROZAN_SEVEN_PRINCIPLES_I18N: Record<UiLang, RozanPrincipleItem[]> = {
  es: [
    {
      num: '01',
      title: 'La idea y no la palabra',
      detail:
        'Anota el concepto subyacente en forma sintética (idealmente ya en la lengua meta o con símbolos universales), nunca palabras sueltas que aten tu sintaxis.',
    },
    {
      num: '02',
      title: 'Reglas de abreviación',
      detail:
        'Si una palabra tiene más de 4-5 letras, anota la raíz y añade la terminación en superíndice para marcar tiempo, género o número (ej. prodⁿ, desarrᵈᵒ).',
    },
    {
      num: '03',
      title: 'Encadenamiento lógico',
      detail:
        'Reserva el margen izquierdo de la página exclusivamente para los conectores argumentativos (∵, ∴, ∥, →, Si:) de modo que la estructura salte a la vista.',
    },
    {
      num: '04',
      title: 'La negación',
      detail:
        'Tacha el símbolo con una barra diagonal (╱) o antepón un marcador claro (✗ / ∅) antes del verbo o concepto negado para evitar invertir el sentido al leer.',
    },
    {
      num: '05',
      title: 'La acentuación (énfasis)',
      detail:
        'Subraya una vez los elementos importantes (_), usa doble subrayado (═) para puntos críticos y línea discontinua (┄) para matices atenuados o dudosos.',
    },
    {
      num: '06',
      title: 'El verticalismo',
      detail:
        'Apila las enumeraciones, elementos coordinados o ejemplos en columna vertical bajo un corchete (┌) en lugar de amontonarlos en horizontal.',
    },
    {
      num: '07',
      title: 'El escalonamiento diagonal',
      detail:
        'Distribuye cada proposición en tres escalones descendentes de izquierda a derecha: Sujeto arriba a la izquierda → Verbo en el centro → Objeto abajo a la derecha.',
    },
  ],
  fr: [
    {
      num: '01',
      title: 'La transposition de l’idée, non du mot',
      detail:
        'Notez le concept sous-jacent sous forme synthétique (idéalement déjà en langue cible ou par symboles universels), jamais des mots isolés qui figent la syntaxe.',
    },
    {
      num: '02',
      title: 'Les règles d’abréviation',
      detail:
        'Si un mot dépasse 4 ou 5 lettres, écrivez sa racine et ajoutez la terminaison en exposant pour marquer temps, genre ou nombre (ex. prodⁿ, dévᵖᵖᵉ).',
    },
    {
      num: '03',
      title: 'L’enchaînement logique',
      detail:
        'Réservez exclusivement la marge gauche de la page aux connecteurs argumentatifs (∵, ∴, ∥, →, Si:) afin que l’ossature du discours saute aux yeux.',
    },
    {
      num: '04',
      title: 'La négation',
      detail:
        'Barrez le symbole d’un trait oblique (╱) ou placez un marqueur net (✗ / ∅) devant le verbe ou la notion niée pour éviter tout contresens à la relecture.',
    },
    {
      num: '05',
      title: 'L’accentuation (emphase)',
      detail:
        'Soulignez d’un trait les éléments importants (_), doublez le trait (═) pour les points critiques et tracez des pointillés (┄) pour les nuances atténuées.',
    },
    {
      num: '06',
      title: 'Le verticalisme',
      detail:
        'Empilez les énumérations, termes coordonnés ou exemples en colonne verticale sous un crochet (┌) plutôt que de les serrer à l’horizontale.',
    },
    {
      num: '07',
      title: 'Le décalage (étagement diagonal)',
      detail:
        'Répartissez chaque proposition sur trois paliers descendants de gauche à droite : Sujet en haut à gauche → Verbe au centre → Objet en bas à droite.',
    },
  ],
  ar: [
    {
      num: '01',
      title: 'تدوين الفكرة لا الكلمة',
      detail:
        'سجّل المفهوم الجوهري بصورة مكثفة (يفضّل بلغة الهدف أو برموز عالمية)، وتجنب كتابة الكلمات المعزولة التي تقيّد صياغتك النحوية لاحقاً.',
    },
    {
      num: '02',
      title: 'قواعد الاختصار واللواحق',
      detail:
        'إذا تجاوزت الكلمة ٤ إلى ٥ أحرف، دوّن جذرها وأضف النهاية في موضع علوي للدلالة على الزمن أو الصفة أو الجمع (مثل prodⁿ أو تطوّʳ).',
    },
    {
      num: '03',
      title: 'التسلسل المنطقي في الهامش',
      detail:
        'خصّص الهامش الجانبي للصفحة حصراً للروابط الحجاجية (∵، ∴، ∥، →، Si:) حتى يتضح الهيكل المنطقي للخطاب من أول نظرة.',
    },
    {
      num: '04',
      title: 'النفي البصري المباشر',
      detail:
        'اشطب الرمز بخط مائل (╱) أو ضع علامة نفي واضحة (✗ / ∅) قبل الفعل أو المفهوم المنفي لتفادي عكس المعنى أثناء الاسترجاع.',
    },
    {
      num: '05',
      title: 'التوكيد والتدرج الدلالي',
      detail:
        'ضع خطاً واحداً تحت العناصر المهمة (_)، وخطاً مزدوجاً (═) للنقاط الجوهرية، وخطاً متقطعاً (┄) للتعبيرات المخففة أو الاحتمالية.',
    },
    {
      num: '06',
      title: 'العمودية في التعداد',
      detail:
        'كدّس القوائم والعناصر المتعاطفة والأمثلة عمودياً تحت حاصرة (┌) بدلاً من رصّها أفقياً في سطر واحد.',
    },
    {
      num: '07',
      title: 'التدرج القطري (فاعل ← فعل ← مفعول)',
      detail:
        'وزّع كل جملة على ثلاثة مستويات متدرجة: الفاعل في السطر الأول ← الفعل مزاحاً في الوسط ← المفعول أو الأرقام في الأسفل.',
    },
  ],
};

const HIERARCHY_FR: RozanHierarchyStep[] = [
  {
    level: 'Niveau 0 · Colonne de gauche (2–3 cm)',
    zone: 'Marge d’enchaînement logique',
    title: 'Architecture argumentative lisible d’un seul coup d’œil',
    rule: 'Réservez le tiers ou le quart gauche grâce à une ligne verticale imaginaire (ou tracée sur le canevas). Seuls les liens logiques (∵, ∴, ∥, ⊕, Si:) y figurent.',
    visualPattern: '∵  |  (cause hors du corps principal)',
    exampleText: 'Avant de parler, vous visualisez le squelette causal complet en moins d’une seconde.',
  },
  {
    level: 'Niveau 1 · Premier palier (Retrait 0)',
    zone: 'Sujet / Idée directrice / Thème',
    title: 'Ancrage thématique en haut à gauche',
    rule: 'Chaque nouvelle unité de sens débute juste après la marge par le sujet ou l’acteur principal. S’il se répète à la phrase suivante, tracez une simple flèche verticale ou des guillemets.',
    visualPattern: '   🏛 UE',
    exampleText: 'Évite de perdre l’agent de l’action même lorsque l’orateur multiplie les incises.',
  },
  {
    level: 'Niveau 2 · Deuxième palier (Retrait +1)',
    zone: 'Verbe / Relation / Modalité',
    title: 'Descente diagonale du noyau verbal',
    rule: 'Décalez légèrement le verbe vers le bas et la droite du sujet. Ajoutez les repères temporels (⏮ / ⏺ / ⏭) ou la négation (╱) contre le verbe.',
    visualPattern: '      → prop. (⏭ 2028)',
    exampleText: 'La diagonale guide naturellement le regard dans un ordre syntaxique fluide.',
  },
  {
    level: 'Niveau 3 · Troisième palier (Retrait +2)',
    zone: 'Objet / Chiffres / Destinataire',
    title: 'Isolement des compléments et données chiffrées',
    rule: 'Placez chiffres, pourcentages, destinataires et conséquences au troisième palier afin de lire les montants sans hésitation prosodique.',
    visualPattern: '         €4.2B → PME > 90%',
    exampleText: 'Les chiffres ne sont jamais noyés au milieu d’un texte compact.',
  },
  {
    level: 'Verticalisme · Énumérations empilées',
    zone: 'Crochet ou barre verticale (┌)',
    title: 'Colonnes parallèles pour les séries de 3 éléments ou plus',
    rule: 'Lorsque l’orateur énumère des secteurs ou mesures, empilez-les verticalement l’un sous l’autre au lieu de les séparer par des virgules.',
    visualPattern: '   couvre ┌ eau\n          │ assainiss.\n          └ cliniques',
    exampleText: 'Lors de la restitution, vous rythme chaque terme avec une intonation nette.',
  },
  {
    level: 'Clôture et emphase · Séparation des blocs',
    zone: 'Ligne de séparation (───) + Soulignements (_ / ═ / ┄)',
    title: 'Hiérarchisation visuelle de l’intensité',
    rule: 'Tracez un trait horizontal (───) après chaque bloc logique. Soulignez une fois l’important (_), deux fois l’essentiel (═) et en pointillés (┄) l’atténué.',
    visualPattern: '   DIH ═   vs.   reprise┄   |   ───',
    exampleText: 'Restitue la force rhétorique de l’orateur sans écrire d’adverbes longs.',
  },
];

const HIERARCHY_AR: RozanHierarchyStep[] = [
  {
    level: 'المستوى 0 · عمود الهامش (2–3 سم)',
    zone: 'هامش التسلسل المنطقي',
    title: 'بنية حجاجية مقروءة بنظرة واحدة',
    rule: 'خصّص الهامش الجانبي عبر خط عمودي واضعاً فيه حصراً الروابط المنطقية (∵، ∴، ∥، ⊕، Si:) دون كتابة الأسماء الأساسية داخله.',
    visualPattern: '∵  |  (السبب في الهامش خارج المتن)',
    exampleText: 'عند مراجعة الصفحة قبل التحدث، يظهر لك الهيكل السببي الكامل في أقل من ثانية.',
  },
  {
    level: 'المستوى 1 · الدرجة الأولى (بداية المتن)',
    zone: 'الفاعل / الفكرة المحورية / الموضوع',
    title: 'تثبيت الموضوع في أعلى الوحدة',
    rule: 'تبدأ كل وحدة دلالية جديدة مباشرة بعد خط الهامش بالفاعل أو الجهة الرئيسية. وإذا تكرر الفاعل، يكفي وضع سهم عمودي للأسفل.',
    visualPattern: '   🏛 UE',
    exampleText: 'يمنع نسيان الفاعل حتى عندما يدرج المتحدث جملاً اعتراضية طويلة.',
  },
  {
    level: 'المستوى 2 · الدرجة الثانية (إزاحة +1)',
    zone: 'الفعل / العلاقة / الصيغة',
    title: 'انحدار قطري للنواة الفعلية',
    rule: 'أزِح الفعل قليلاً إلى الأسفل والداخل مقارنة بالفاعل، وأضف بجانبه مؤشرات الزمن (⏮ / ⏺ / ⏭) أو النفي (╱).',
    visualPattern: '      → prop. (⏭ 2028)',
    exampleText: 'يوجّه التدرج القطري العين تلقائياً لقراءة الجملة بترتيب نحوي سلس.',
  },
  {
    level: 'المستوى 3 · الدرجة الثالثة (إزاحة +2)',
    zone: 'المفعول / الأرقام / المستفيد',
    title: 'عزل المتممات والبيانات الرقمية الدقيقة',
    rule: 'ضع الأرقام والنسب المئوية والجهات المستفيدة في الدرجة الثالثة لعزلها بصرياً ونطقها بثبات دون تلعثم.',
    visualPattern: '         €4.2B → PYMEs > 90%',
    exampleText: 'لا تضيع الأرقام أبداً وسط سطور متشابكة.',
  },
  {
    level: 'العمودية · القوائم المتراصة',
    zone: 'حاصرة عمودية (┌)',
    title: 'أعمدة متوازية لسلاسل من 3 عناصر فأكثر',
    rule: 'عندما يعدد المتحدث قطاعات أو تدابير متتالية، رصّها عمودياً الواحد تحت الآخر بدلاً من فصلها بفواصل أفقية.',
    visualPattern: '   يشمل ┌ مياه\n        │ صرف\n        └ عيادات',
    exampleText: 'تمنحك إيقاعاً خطابياً رصيناً عند سرد كل بند أثناء الاسترجاع.',
  },
  {
    level: 'الختام والتوكيد · الفصل بين الفقرات',
    zone: 'خط فاصل (───) + التسطير (_ / ═ / ┄)',
    title: 'ترتيب بصري لقوة الحجة وأهميتها',
    rule: 'ارسم خطاً أفقياً (───) عند انتهاء كل وحدة فكرية. ضع خطاً تحت المهم (_) وخطين للضروري (═) ومتقطعاً للتحفظ (┄).',
    visualPattern: '   DIH ═   vs.   recup.┄   |   ───',
    exampleText: 'ينقل النبرة الخطابية للمتحدث دون إضاعة وقت في كتابة الصفات.',
  },
];

const CONNECTORS_FR: RozanConnectorItem[] = [
  {
    symbol: '∵',
    name: 'Cause / Motif',
    placement: 'Marge gauche',
    spokenTriggers: 'Parce que, en raison de, puisque, étant donné / Porque, debido a / لأن، بسبب',
    sentenceExample: 'Les échanges ont reculé en raison de la hausse du fret.',
    notationExample: 'Éch. ↘   (marge : ∵ fret ↗)',
  },
  {
    symbol: '∴',
    name: 'Conséquence / Conclusion',
    placement: 'Marge gauche',
    spokenTriggers: 'Par conséquent, donc, ainsi / Por consiguiente / وبالتالي، لذلك',
    sentenceExample: 'Par conséquent, nous proposons de doubler le fonds d’urgence.',
    notationExample: '∴  |  prop. → fonds urg. ×2',
  },
  {
    symbol: '∥',
    name: 'Opposition / Concession',
    placement: 'Marge gauche',
    spokenTriggers: 'Cependant, toutefois, bien que, malgré / Sin embargo / غير أن، رغم',
    sentenceExample: 'Bien que l’inflation ait ralenti, les taux restent élevés.',
    notationExample: '∥  |  infl. ↘   →   taux élevés',
  },
  {
    symbol: '⊕',
    name: 'Addition / Accumulation',
    placement: 'Marge gauche',
    spokenTriggers: 'De plus, en outre, par ailleurs / Además / علاوة على ذلك',
    sentenceExample: 'En outre, des centres techniques régionaux seront financés.',
    notationExample: '⊕  |  €/$ → centres tech. 🗺',
  },
  {
    symbol: 'Si:',
    name: 'Condition / Hypothèse',
    placement: 'Marge gauche',
    spokenTriggers: 'Si, à condition que, pour autant que / Siempre que / شريطة أن، إذا',
    sentenceExample: 'Si toutes les parties coopèrent, nous signerons ce trimestre.',
    notationExample: 'Si:  ∀ parties coop.  ⇒  🤝 T1',
  },
  {
    symbol: '⇒',
    name: 'Implication / Exigence',
    placement: 'Centre diagonal (entre blocs)',
    spokenTriggers: 'Implique, exige, suppose / Implica, exige / يستلزم، يقتضي',
    sentenceExample: 'L’adhésion exige d’harmoniser les normes d’audit.',
    notationExample: 'Adhés.  ⇒  ≡ normes audit',
  },
  {
    symbol: '⇔',
    name: 'Équivalence / Réciprocité',
    placement: 'Centre diagonal',
    spokenTriggers: 'Équivaut à, mutuellement / Equivale a / يعادل، بالتبادل',
    sentenceExample: 'L’inaction prolongée équivaut à accepter la dégradation.',
    notationExample: 'Inaction ∞  ⇔  ✓ dégrad.',
  },
  {
    symbol: '→/',
    name: 'Finalité / Objectif',
    placement: 'Marge ou connecteur de but',
    spokenTriggers: 'Afin de, pour que, dans le but de / Con el fin de / من أجل، بغية',
    sentenceExample: 'Nous adoptons cette mesure afin de protéger les consommateurs.',
    notationExample: '⚙ mesure  →/  🛡 consom.',
  },
  {
    symbol: '”',
    name: 'Attribution / Citation',
    placement: 'Marge ou près de l’émetteur',
    spokenTriggers: 'Selon, a affirmé que, a souligné / Según, afirmó / وفقاً لـ، صرّح',
    sentenceExample: 'Selon le rapport technique, la demande croîtra de 4%.',
    notationExample: '” Rap. tech. :  demande ↗ 4%',
  },
  {
    symbol: '⊂',
    name: 'Exemplification / Inclusion',
    placement: 'Retrait sous terme générique',
    spokenTriggers: 'Par exemple, notamment, inclut / Por ejemplo / مثلاً، لا سيما',
    sentenceExample: 'Le paquet inclut des mesures fiscales, notamment des crédits verts.',
    notationExample: 'Paquet ⊂ mes. fisc. (créd. verts)',
  },
];

const CONNECTORS_AR: RozanConnectorItem[] = [
  {
    symbol: '∵',
    name: 'السبب / التعليل',
    placement: 'الهامش الجانبي',
    spokenTriggers: 'لأن، بسبب، نظراً لـ / Porque, debido a / En raison de',
    sentenceExample: 'تراجعت التجارة بسبب ارتفاع تكاليف الشحن البحري.',
    notationExample: 'تجارة ↘   (هامش: ∵ شحن ↗)',
  },
  {
    symbol: '∴',
    name: 'النتيجة / الاستنتاج',
    placement: 'الهامش الجانبي',
    spokenTriggers: 'وبالتالي، بناءً عليه، لذا / Por consiguiente / Par conséquent',
    sentenceExample: 'وبالتالي نقترح مضاعفة صندوق الطوارئ.',
    notationExample: '∴  |  اقتراح → صندوق طوارئ ×2',
  },
  {
    symbol: '∥',
    name: 'الاستدراك / التعارض',
    placement: 'الهامش الجانبي',
    spokenTriggers: 'غير أن، مع ذلك، رغم أن / Sin embargo / Cependant, malgré',
    sentenceExample: 'رغم تراجع التضخم، لا تزال أسعار الفائدة مرتفعة.',
    notationExample: '∥  |  تضخم ↘   →   فائدة مرتفعة',
  },
  {
    symbol: '⊕',
    name: 'الإضافة / التراكم',
    placement: 'الهامش الجانبي',
    spokenTriggers: 'علاوة على ذلك، فضلاً عن / Además / De plus, en outre',
    sentenceExample: 'علاوة على ذلك، سيتم تمويل مراكز تقنية إقليمية.',
    notationExample: '⊕  |  €/$ → مراكز تق. 🗺',
  },
  {
    symbol: 'Si:',
    name: 'الشرط / الفرضية',
    placement: 'الهامش الجانبي',
    spokenTriggers: 'إذا، شريطة أن، طالما / Siempre que / À condition que',
    sentenceExample: 'إذا تعاونت جميع الأطراف، فسنوقّع خلال هذا الربع.',
    notationExample: 'Si:  ∀ أطراف تعا.  ⇒  🤝 Q1',
  },
  {
    symbol: '⇒',
    name: 'الاستلزام / الاقتضاء',
    placement: 'المركز القطري (بين الكتل)',
    spokenTriggers: 'يستلزم، يقتضي، يتطلب / Implica, exige / Implique, exige',
    sentenceExample: 'العضوية تقتضي توحيد معايير التدقيق.',
    notationExample: 'عضوية  ⇒  ≡ معايير تدقيق',
  },
  {
    symbol: '⇔',
    name: 'التكافؤ / التبادل',
    placement: 'المركز القطري',
    spokenTriggers: 'يعادل، يغدو بمثابة، متبادل / Equivale a / Équivaut à',
    sentenceExample: 'التقاعس الطويل يعادل القبول بالتدهور.',
    notationExample: 'تقاعس ∞  ⇔  ✓ تدهور',
  },
  {
    symbol: '→/',
    name: 'الغاية / الهدف',
    placement: 'الهامش أو رابط الغاية',
    spokenTriggers: 'بغية، من أجل، لكي / Con el fin de / Afin de',
    sentenceExample: 'نعتمد هذا التدبير بغية حماية المستهلكين.',
    notationExample: '⚙ تدبير  →/  🛡 مستهلك',
  },
  {
    symbol: '”',
    name: 'الإسناد / الاقتباس',
    placement: 'الهامش أو بجانب المصدر',
    spokenTriggers: 'وفقاً لـ، صرّح، أكد أن / Según, afirmó / Selon, a souligné',
    sentenceExample: 'وفقاً للتقرير الفني، سينمو الطلب بنسبة ٤٪.',
    notationExample: '” تق. فني:  طلب ↗ 4%',
  },
  {
    symbol: '⊂',
    name: 'التمثيل / الشمول',
    placement: 'إزاحة تحت المفهوم العام',
    spokenTriggers: 'على سبيل المثال، لا سيما، يشمل / Por ejemplo / Notamment',
    sentenceExample: 'تشمل الحزمة تدابير مالية، ولا سيما قروضاً خضراء.',
    notationExample: 'حزمة ⊂ تدابير مالية (قروض خضراء)',
  },
];

const ABBR_FR: RozanAbbreviationItem[] = [
  { id: 'abbr-gdp', domain: 'economy', concept: 'Produit Intérieur Brut', abbreviation: 'PIB', rozanRule: 'Sigle standard universel en français et espagnol', exampleInContext: 'Dette < 60% PIB' },
  { id: 'abbr-fdi', domain: 'economy', concept: 'Investissement Direct Étranger', abbreviation: 'IDE', rozanRule: 'Sigle fixe pour les flux de capitaux transfrontaliers', exampleInContext: '↗ IDE énerg. prop.' },
  { id: 'abbr-inflation', domain: 'economy', concept: 'Inflation / Inflationniste', abbreviation: 'inflⁿ / inflᵗ', rozanRule: 'Racine de 4 lettres + exposant nominal ou adjectival', exampleInContext: 'Pression inflᵗ ↘' },
  { id: 'abbr-prod', domain: 'economy', concept: 'Production / Productivité', abbreviation: 'prodⁿ / prodᵗⁱᵛ', rozanRule: 'Racine commune + terminaison haute pour éviter toute confusion', exampleInContext: '↗ prodᵗⁱᵛ 🏭 rurale' },
  { id: 'abbr-dev', domain: 'economy', concept: 'Développement / Développé', abbreviation: 'dévᵖ / dévᵖᵉ', rozanRule: 'Terminaison en exposant distinguant processus et état', exampleInContext: '□s en dévᵖ' },
  { id: 'abbr-budget', domain: 'economy', concept: 'Budget / Budgétaire', abbreviation: 'budg. / budgʳᵉ', rozanRule: 'Troncation claire + exposant adjectival', exampleInContext: '∑ budg. UE 2027' },
  { id: 'abbr-tariff', domain: 'economy', concept: 'Droit de douane / Tarifaire', abbreviation: 'tarif. / ╱tarif.', rozanRule: 'Racine brève ; barre devant indique « sans droits de douane »', exampleInContext: '⏸ tarif. agro' },
  { id: 'abbr-sme', domain: 'economy', concept: 'Petites et Moyennes Entreprises', abbreviation: 'PME', rozanRule: 'Acronyme établi dans les sessions UE/OMC', exampleInContext: 'PME > 90% tissu prod.' },
  { id: 'abbr-deficit', domain: 'economy', concept: 'Déficit / Excédent', abbreviation: 'déf. (-) / exc. (+)', rozanRule: 'Abréviation combinée au signe mathématique de polarité', exampleInContext: 'déf. (-) budg. < 3%' },
  { id: 'abbr-supply', domain: 'economy', concept: 'Chaîne d’approvisionnement', abbreviation: 'ch. appro.', rozanRule: 'Collocation figée tronquée à 3–5 lettres par mot', exampleInContext: '🛡 ch. appro. crit.' },
  { id: 'abbr-subsidy', domain: 'economy', concept: 'Subvention / Aide publique', abbreviation: 'subvⁿ', rozanRule: 'Racine courte + exposant nominal', exampleInContext: '⏹ subvⁿ fossiles' },
  { id: 'abbr-compet', domain: 'economy', concept: 'Compétitivité / Compétitif', abbreviation: 'compᵗⁱᵛ / compᵗ', rozanRule: 'Distingue la notion abstraite de l’adjectif opérationnel', exampleInContext: '↗ compᵗⁱᵛ glob.' },
  { id: 'abbr-gov', domain: 'politics', concept: 'Gouvernement / Gouvernemental', abbreviation: 'gouvᵗ / gouvᵃˡ', rozanRule: 'Racine de 4 lettres + exposant (-t / -al)', exampleInContext: 'gouvᵗ central ✓ plan' },
  { id: 'abbr-parl', domain: 'politics', concept: 'Parlement / Parlementaire', abbreviation: 'parlᵗ / parlʳᵉ', rozanRule: 'Se combine volontiers avec l’icône 🏛 en plénière', exampleInContext: '🏛 parlᵗ adopte §4' },
  { id: 'abbr-sovereignty', domain: 'politics', concept: 'Souveraineté / Souverain', abbreviation: 'souverⁿ / souverᵒ', rozanRule: 'Racine + exposant pour un concept juridique fréquent', exampleInContext: 'resp. souverⁿ 🗺' },
  { id: 'abbr-constit', domain: 'politics', concept: 'Constitution / Constitutionnel', abbreviation: 'constⁿ / constᵃˡ', rozanRule: 'L’exposant évite de confondre texte fondamental et « constitutif »', exampleInContext: '⚖ cour constᵃˡ' },
  { id: 'abbr-diplom', domain: 'politics', concept: 'Diplomatie / Diplomatique', abbreviation: 'diplⁿ / diplᶜᵒ', rozanRule: 'Racine brève + exposant distinguant discipline et acteur', exampleInContext: 'voie diplⁿ ═' },
  { id: 'abbr-sanctions', domain: 'politics', concept: 'Sanctions / Sanctionner', abbreviation: 'sancˢ / sancʳ', rozanRule: 'Pluriel en exposant (-s) pour des mesures restrictives multiples', exampleInContext: '🔒 sancˢ sectorielles' },
  { id: 'abbr-resolution', domain: 'politics', concept: 'Résolution / Mandat', abbreviation: 'résolⁿ / mandᵗ', rozanRule: 'Terme récurrent au Conseil de sécurité et à l’Assemblée générale', exampleInContext: '⚙ résolⁿ 2728' },
  { id: 'abbr-human-rights', domain: 'politics', concept: 'Droits humains / DIH', abbreviation: 'DH / DIH', rozanRule: 'Sigles ONU standards associés au symbole ⚖', exampleInContext: '⚖ DH ∀ civils' },
  { id: 'abbr-treaty', domain: 'politics', concept: 'Traité / Ratification', abbreviation: 'traité / ratifⁿ', rozanRule: 'Accompagné de ✓ indique une ratification achevée', exampleInContext: '✓ ratifⁿ traité climat' },
  { id: 'abbr-jurisd', domain: 'politics', concept: 'Juridiction / Contraignant', abbreviation: 'juridⁿ / contrᵗ', rozanRule: 'Utile en arbitrage international et droit européen', exampleInContext: 'règle contrᵗ ∀ □s' },
  { id: 'abbr-elect', domain: 'politics', concept: 'Élections / Électoral', abbreviation: 'élecˢ / élecᵃˡ', rozanRule: 'Pluriel élevé pour le scrutin face à l’adjectif institutionnel', exampleInContext: '👁 processus élecᵃˡ' },
  { id: 'abbr-multilat', domain: 'politics', concept: 'Multilatéralisme / Unilatéral', abbreviation: 'multil. / unil.', rozanRule: 'Abréviation de préfixe polaire ; ajoutez ═ si thème central', exampleInContext: '🛡 multil. vs unil.' },
];

const ABBR_AR: RozanAbbreviationItem[] = [
  { id: 'abbr-gdp', domain: 'economy', concept: 'الناتج المحلي الإجمالي', abbreviation: 'PIB / GDP', rozanRule: 'اختصار دولي موحد في المنظمات الاقتصادية', exampleInContext: 'دَيْن < 60% PIB' },
  { id: 'abbr-fdi', domain: 'economy', concept: 'الاستثمار الأجنبي المباشر', abbreviation: 'IED / FDI', rozanRule: 'اختصار ثابت لتدفقات رؤوس الأموال العابرة للحدود', exampleInContext: '↗ IED طاقة نظيفة' },
  { id: 'abbr-inflation', domain: 'economy', concept: 'التضخم / تضخمي', abbreviation: 'تضخⁿ / تضخᵃʳ', rozanRule: 'جذر مختصر + لاحقة علوية لتمييز الاسم عن الصفة', exampleInContext: 'ضغوط تضخᵃʳ ↘' },
  { id: 'abbr-prod', domain: 'economy', concept: 'الإنتاج / الإنتاجية', abbreviation: 'إنتⁿ / إنتᵗⁱᵛ', rozanRule: 'جذر مشترك + نهاية علوية لمنع الالتباس', exampleInContext: '↗ إنتᵗⁱᵛ 🏭 ريفية' },
  { id: 'abbr-dev', domain: 'economy', concept: 'التنمية / متطور', abbreviation: 'تنمº / متطᵈᵒ', rozanRule: 'اللاحقة العلوية تفرق بين المسار والحالة', exampleInContext: '□s في طور تنمº' },
  { id: 'abbr-budget', domain: 'economy', concept: 'الميزانية / ميزانياتي', abbreviation: 'ميز. / ميزᵃʳ', rozanRule: 'اقتطاع واضح + لاحقة وصفية', exampleInContext: '∑ ميز. UE 2027' },
  { id: 'abbr-tariff', domain: 'economy', concept: 'التعريفة الجمركية / معفى جمركياً', abbreviation: 'جمرك. / ╱جمرك.', rozanRule: 'شرطة النفي أمام الرمز تعني «معفى من الرسوم»', exampleInContext: '⏸ جمرك. زراعي' },
  { id: 'abbr-sme', domain: 'economy', concept: 'الشركات الصغيرة والمتوسطة', abbreviation: 'PYMEs / SMEs', rozanRule: 'اختصار معتمد في جلسات الأمم المتحدة والتجارة', exampleInContext: 'SMEs > 90% اقتصاد' },
  { id: 'abbr-deficit', domain: 'economy', concept: 'العجز / الفائض', abbreviation: 'عجز (-) / فائض (+)', rozanRule: 'دمج الاختصار مع إشارة رياضية للاتجاه', exampleInContext: 'عجز (-) مالي < 3%' },
  { id: 'abbr-supply', domain: 'economy', concept: 'سلسلة الإمداد', abbreviation: 'سل. إمد.', rozanRule: 'متلازمة لفظية مختصرة إلى ٣ أحرف لكل لفظ', exampleInContext: '🛡 سل. إمد. حيوية' },
  { id: 'abbr-subsidy', domain: 'economy', concept: 'الدعم المالي / الإعانة', abbreviation: 'دعمⁿ', rozanRule: 'لفظ موجز + لاحقة اسمية علوية', exampleInContext: '⏹ دعمⁿ وقود أحفوري' },
  { id: 'abbr-compet', domain: 'economy', concept: 'التنافسية / تنافسي', abbreviation: 'تنافᵗⁱᵛ / تنافº', rozanRule: 'يميز بين المفهوم الاقتصادي المجرد والصفة', exampleInContext: '↗ تنافᵗⁱᵛ 🌐' },
  { id: 'abbr-gov', domain: 'politics', concept: 'الحكومة / حكومي', abbreviation: 'حكº / حكᵃˡ', rozanRule: 'جذر من حرفين + لاحقة علوية', exampleInContext: 'حكº مركزية ✓ خطة' },
  { id: 'abbr-parl', domain: 'politics', concept: 'البرلمان / برلماني', abbreviation: 'برلº / برلᵃʳ', rozanRule: 'يُدمج غالباً مع الرمز 🏛 في الجلسات العامة', exampleInContext: '🏛 برلº يعتمد §4' },
  { id: 'abbr-sovereignty', domain: 'politics', concept: 'السيادة / سيادي', abbreviation: 'سيادⁿ / سيادº', rozanRule: 'جذر مختصر + لاحقة لمفهوم قانوني متكرر', exampleInContext: 'احترام سيادⁿ 🗺' },
  { id: 'abbr-constit', domain: 'politics', concept: 'الدستور / دستوري', abbreviation: 'دستⁿ / دستᵃˡ', rozanRule: 'اللاحقة تميز الدستور عن الصفة القانونية', exampleInContext: '⚖ محكمة دستᵃˡ' },
  { id: 'abbr-diplom', domain: 'politics', concept: 'الدبلوماسية / دبلوماسي', abbreviation: 'دبلⁿ / دبلᶜᵒ', rozanRule: 'تمييز سريع بين المسار الدبلوماسي والمبعوث', exampleInContext: 'مسار دبلⁿ ═' },
  { id: 'abbr-sanctions', domain: 'politics', concept: 'العقوبات / فرض عقوبة', abbreviation: 'عقوبˢ / عقوبʳ', rozanRule: 'علامة الجمع العلوية (ˢ) لتعدد التدابير التقييدية', exampleInContext: '🔒 عقوبˢ قطاعية' },
  { id: 'abbr-resolution', domain: 'politics', concept: 'القرار / التفويض', abbreviation: 'قرارⁿ / تفوº', rozanRule: 'متكرر في قرارات مجلس الأمن والجمعية العامة', exampleInContext: '⚙ قرارⁿ 2728' },
  { id: 'abbr-human-rights', domain: 'politics', concept: 'حقوق الإنسان / القانون الدولي الإنساني', abbreviation: 'DDHH / DIH', rozanRule: 'اختصارات أممية قياسية تقترن برمز الميزان ⚖', exampleInContext: '⚖ DIH ∀ مدنيين' },
  { id: 'abbr-treaty', domain: 'politics', concept: 'المعاهدة / التصديق', abbreviation: 'معاهº / تصدⁿ', rozanRule: 'عند اقترانه بـ ✓ يدل على إتمام التصديق', exampleInContext: '✓ تصدⁿ معاهº مناخ' },
  { id: 'abbr-jurisd', domain: 'politics', concept: 'الاختصاص القضائي / ملزم', abbreviation: 'قضⁿ / ملزᵗᵉ', rozanRule: 'عملي في التحكيم الدولي والقانون الأوروبي', exampleInContext: 'قاعدة ملزᵗᵉ ∀ □s' },
  { id: 'abbr-elect', domain: 'politics', concept: 'الانتخابات / انتخابي', abbreviation: 'انتخˢ / انتخᵃˡ', rozanRule: 'تمييز الاقتراع عن المسار الانتخابي', exampleInContext: '👁 مسار انتخᵃˡ' },
  { id: 'abbr-multilat', domain: 'politics', concept: 'التعددية / الأحادية', abbreviation: 'تعد. / أحاد.', rozanRule: 'اختصار البادئة الدلالية مع خط مزدوج ═ للتوكيد', exampleInContext: '🛡 تعد. vs أحاد.' },
];

const GUIDES_FR: TechniqueGuide[] = [
  {
    id: 'sim-decalage',
    mode: 'simultaneous',
    title: 'Maîtrise dynamique du Décalage (Ear-Voice Span)',
    subtitle: 'Distance temporelle entre écoute et restitution',
    principle:
      'Le décalage idéal oscille entre 2 et 4 secondes (environ 5 à 8 mots). Il est souple : on le raccourcit devant les chiffres, énumérations et noms propres, et on l’allonge légèrement quand la langue source rejette le verbe ou le noyau en fin de phrase.',
    whenToUse:
      'Dans tout discours simultané ; essentiel face aux phrases longues à propositions incrustées.',
    exampleSource:
      '« Les mesures présentées hier soir par la Commission et déjà critiquées par plusieurs États membres entreront en vigueur en janvier. »',
    exampleOutput:
      '« Las medidas que la Comisión presentó anoche —y que ya critican varios Estados— entrarán en vigor en enero. » (Gardez 2 à 3s de recul pour saisir le noyau).',
    commonPitfall:
      'Coller à l’orateur (< 1,5s), ce qui oblige à calquer la syntaxe source et provoque des blocages.',
    drillTip:
      'Entraînez-vous à l’Étape 1 en réglant le curseur de décalage de 2s à 4s et en fermant des phrases courtes.',
  },
  {
    id: 'sim-chunking',
    mode: 'simultaneous',
    title: 'Saucissonnage actif (Segmentación / Chunking)',
    subtitle: 'Découper les phrases complexes en unités autonomes',
    principle:
      'Consiste à scinder les longues phrases à subordonnées multiples en propositions indépendantes courtes en langue cible, tout en gardant la logique par des connecteurs légers.',
    whenToUse:
      'Face à des discours lus à syntaxe écrite dense ou à relatives emboîtées.',
    exampleSource:
      '« Bien que les coûts du fret maritime, qui ont augmenté de 18% au dernier trimestre en raison des retards portuaires, aient pesé sur les chaînes, les exportations ont crû. »',
    exampleOutput:
      '« El flete marítimo subió un 18% el último trimestre por los retrasos portuarios. Esto presionó las cadenas. Aun así, las exportaciones crecieron. »',
    commonPitfall:
      'Attendre la fin d’une phrase interminable avant de parler et saturer sa mémoire de travail.',
    drillTip:
      'Marquez une pause descendante nette à la fin de chaque micro-phrase pour libérer votre mémoire.',
  },
  {
    id: 'sim-anticipation',
    mode: 'simultaneous',
    title: 'Anticipation syntaxique et collocationnelle',
    subtitle: 'Prévoir l’orientation de l’énoncé avant sa clôture',
    principle:
      'En combinant connaissance du dossier, protocole institutionnel et indices grammaticaux (« non seulement… », « bien que… »), l’interprète prépare le cadre syntaxique cible avant la fin de la proposition.',
    whenToUse:
      'Discours ONU/UE à formules codifiées ou interventions rapides (> 140 MPM).',
    exampleSource: '« Nous condamnons non seulement la suspension unilatérale de… »',
    exampleOutput:
      'Préparez « No solo condenamos…, sino también… » sans figer le complément avant de l’entendre.',
    commonPitfall:
      'Deviner un mot précis à tort (« espoir » au lieu d’« inquiétude »). Anticipez la structure, jamais les faits.',
    drillTip:
      'Lisez toujours le glossaire de cabine avant d’appuyer sur Lecture pour activer les collocations.',
  },
  {
    id: 'sim-compression',
    mode: 'simultaneous',
    title: 'Compression, synthèse et généralisation maîtrisée',
    subtitle: 'Gestion des débits rapides (> 150 MPM)',
    principle:
      'Lorsque l’orateur lit vite, élaguez redondances rhétoriques et doublons synonymiques tout en préservant le sujet, l’action, les chiffres et la polarité.',
    whenToUse:
      'Temps de parole contraints en plénière ou délégués lisant sans respirer.',
    exampleSource:
      '« À ce stade précis de nos travaux, je souhaiterais saisir cette occasion pour exprimer notre gratitude la plus profonde… »',
    exampleOutput:
      '« En este momento, agradecemos sinceramente a… » (équivalence pragmatique à 100%).',
    commonPitfall:
      'Accélérer votre propre voix jusqu’à devenir incompréhensible au lieu de compresser l’expression.',
    drillTip:
      'Réglez la vitesse de lecture sur 1.20x dans le studio et privilégiez la clarté vocale.',
  },
  {
    id: 'sim-numbers',
    mode: 'simultaneous',
    title: 'Gestion des chiffres, sigles et noms propres',
    subtitle: 'Décharge visuelle rapide sur papier en cabine',
    principle:
      'Les chiffres n’ont aucune redondance contextuelle : notés aussitôt sur papier dès l’écoute, ils libèrent l’esprit pour formuler le contexte grammatical.',
    whenToUse:
      'Rapports FAO/OMC, budgets européens, résolutions chiffrées et dates.',
    exampleSource: '« 4,2 milliards d’euros » → « cuatro mil doscientos millones de euros ».',
    exampleOutput:
      'Notez « 4.2B€ » sur votre bloc, adaptez l’échelle et énoncez d’une voix assurée.',
    commonPitfall:
      'Hésiter sur les grands ordres de grandeur ou confondre milliards et billions entre langues.',
    drillTip:
      'Entraînez-vous avec l’Étape 3 en notant uniquement chiffres et unités au fil de l’écoute.',
  },
  {
    id: 'con-phases',
    mode: 'consecutive',
    title: 'Modèle en 3 phases de l’interprétation consécutive',
    subtitle: 'Analyse cognitive avant la prise de notes mécanique',
    principle:
      '1) Écoute analytique et prise de notes (~70% attention au sens, ~30% au geste) ; 2) Balayage visuel de 1–2s à la fin ; 3) Restitution orale communicative face à l’auditoire.',
    whenToUse:
      'Conférences de presse, entretiens bilatéraux, tribunaux et réunions sans cabine.',
    exampleSource: 'Intervention continue de 2 à 5 minutes sans pause de l’orateur.',
    exampleOutput:
      'L’interprète garde le contact visuel à 80%, s’appuie brièvement sur chaque palier diagonal et restitue à ≈ 75% de la durée source.',
    commonPitfall:
      'Vouloir tout sténographier mot à mot : cela brise la compréhension globale.',
    drillTip:
      'Écoutez d’abord un paragraphe complet en ne notant que 4 à 6 symboles pivots.',
  },
  {
    id: 'con-rozan',
    mode: 'consecutive',
    title: 'Les 7 Principes de Rozan et le Décalage Diagonal',
    subtitle: 'Architecture spatiale de la page (Jean-François Rozan, 1956)',
    principle:
      '1) Idée plutôt que mot ; 2) Abréviation + exposant ; 3) Enchaînement en marge gauche ; 4) Négation claire ; 5) Emphase par soulignement ; 6) Verticalisme des listes ; 7) Étagement Sujet → Verbe → Objet.',
    whenToUse:
      'Socle universel de la prise de notes professionnelle à la DG SCIC, à l’ONU et dans les masters EMCI.',
    exampleSource:
      '« Bien que les PME représentent plus de 90% du tissu productif, la Commission propose d’allouer 4,2 milliards d’euros. »',
    exampleOutput:
      'Marge : ∥ | PME > 90% écon. | Marge : ∴ | 🏛 UE → prop. → 4.2B€.',
    commonPitfall:
      'Écrire en lignes horizontales continues comme une dictée scolaire.',
    drillTip:
      'Utilisez le canevas tactile du studio en respectant la ligne de marge gauche (∵, ∴, ∥).',
  },
  {
    id: 'con-matyssek',
    mode: 'consecutive',
    title: 'Symbologie combinatoire (Système Matyssek)',
    subtitle: 'Symboles racines + suffixes morphologiques',
    principle:
      'Un noyau restreint de 30 à 50 symboles se combine à des marques brèves pour exprimer pluriel, temps ou catégorie (ex. □ = État, □s = États, □^al = étatique).',
    whenToUse:
      'Discours longs (4–8 min) où l’écriture en toutes lettres créerait un retard critique.',
    exampleSource:
      '« Tous les États membres doivent approuver d’urgence un mécanisme indépendant. »',
    exampleOutput: '∀ □s → ⏱ ✓ → méc. indép. (5 tracés au lieu de 11 mots).',
    commonPitfall:
      'Inventer à chaud des symboles méconnaissables au moment de relire ses notes.',
    drillTip:
      'Consolidez d’abord un répertoire stable dans la Bibliothèque de Symboles avant de créer les vôtres.',
  },
  {
    id: 'con-memory-delivery',
    mode: 'consecutive',
    title: 'Restitution communicative, prosodie et chutes de phrase',
    subtitle: 'L’art oratoire face à la lecture de notes',
    principle:
      'Le carnet n’est qu’un déclencheur mnésique ; la cohérence prosodique, les pauses maîtrisées et les intonations descendantes assurent autorité et clarté.',
    whenToUse:
      'Pendant l’enregistrement en mode Consécutive et lors de l’analyse des scores d’intonation.',
    exampleSource: 'Notes schématiques avec flèches, chiffres et sigles.',
    exampleOutput:
      'Phrases complètes bien fermées, sans hésitations vocales ni fins de phrase suspendues.',
    commonPitfall:
      'Laisser la voix monter en suspens à la fin d’une phrase en cherchant le symbole suivant.',
    drillTip:
      'Consultez l’indicateur d’Intonation et d’Analyse des pauses après chaque enregistrement IA.',
  },
];

const GUIDES_AR: TechniqueGuide[] = [
  {
    id: 'sim-decalage',
    mode: 'simultaneous',
    title: 'الضبط الديناميكي للفارق الزمني (Décalage / Ear-Voice Span)',
    subtitle: 'المسافة الزمنية بين الاستماع والإنتاج الصوتي',
    principle:
      'يتراوح الفارق الزمني المثالي بين ٢ و٤ ثوانٍ (نحو ٥ إلى ٨ كلمات). وهو مرن: يُقصّر عند الأرقام والتعداد وأسماء الأعلام، ويُمدَّد قليلاً عند التراكيب التي يتأخر فيها الفعل أو الفاعل.',
    whenToUse: 'في جميع الخطب الفورية، ولا سيما في الجمل الطويلة أو المتباينة بين العربية واللغات الأوروبية.',
    exampleSource: '«قدّمت اللجنة مساء أمس تدابير أثارت تحفظات عدة دول أعضاء وستدخل حيز النفاذ في يناير.»',
    exampleOutput: 'احتفظ بفارق ٢.٥ ثانية لالتقاط النواة الفعلية كاملة قبل بدء الصياغة في لغة الهدف.',
    commonPitfall: 'الالتصاق الحرفي بالمتحدث (< ١.٥ ثانية)، مما يفرض محاكاة البنية الأجنبية ويؤدي إلى التوقف المفاجئ.',
    drillTip: 'تدرّب في المرحلة ١ عبر تحريك مؤشر الفارق الزمني من ٢ إلى ٤ ثوانٍ مع إغلاق جمل قصيرة متماسكة.',
  },
  {
    id: 'sim-chunking',
    mode: 'simultaneous',
    title: 'التقطيع النشط للجمل (Saucissonnage / Chunking)',
    subtitle: 'تفكيك الجمل المركبة إلى وحدات دلالية مستقلة',
    principle:
      'يقوم على تقسيم الجمل المتشعبة الطويلة إلى جمل قصيرة مستقلة ومتعاطفة في لغة الهدف مع الحفاظ على العلاقة المنطقية بأدوات ربط خفيفة.',
    whenToUse: 'عند قراءة متحدث لنص مكتوب كثيف مليء بالجمل الموصولة والاعتراضية.',
    exampleSource: '«على الرغم من أن تكاليف الشحن البحري، التي ارتفعت ١٨٪ بسبب الازدحام، ضغطت على الإمدادات، فقد نمت الصادرات.»',
    exampleOutput: '«ارتفعت تكاليف الشحن البحري بنسبة ١٨٪ بسبب الازدحام. وقد ضغط ذلك على الإمدادات. ومع ذلك، نمت الصادرات.»',
    commonPitfall: 'الانتظار حتى نهاية جملة طويلة جداً قبل النطق، مما يرهق الذاكرة العاملة.',
    drillTip: 'احرص على نبرة ختامية هابطة عند نهاية كل وحدة قصيرة لتحرير ذاكرتك فوراً.',
  },
  {
    id: 'sim-anticipation',
    mode: 'simultaneous',
    title: 'الاستباق النحوي والدلالي',
    subtitle: 'استشراف مسار الجملة قبل اكتمالها',
    principle:
      'بدمج المعرفة بالموضوع والبروتوكول الدبلوماسي والمؤشرات النحوية («لا يقتصر على…»، «رغم أن…»)، يهيّئ المترجم القالب التركيبي في لغة الهدف قبل سماع نهاية العبارة.',
    whenToUse: 'خطابات الأمم المتحدة والاتحاد الأوروبي ذات الصيغ المتوقعة والمداخلات السريعة.',
    exampleSource: '«لا ندين التعليق الأحادي فحسب، بل…»',
    exampleOutput: 'جهّز قالب التوازي «No solo condenamos…, sino también…» دون استباق المفعول قبل سماعه.',
    commonPitfall: 'تخمين مضمون محدد خطأً؛ استبق الوظيفة النحوية المحايدة لا المعلومة.',
    drillTip: 'اطّلع دائماً على مسرد المقصورة قبل تشغيل الصوت لتنشيط المتلازمات اللفظية.',
  },
  {
    id: 'sim-compression',
    mode: 'simultaneous',
    title: 'التكثيف والإيجاز المنضبط',
    subtitle: 'التعامل مع الإلقاء السريع (> ١٥٠ كلمة/دقيقة)',
    principle:
      'عندما يقرأ المتحدث بسرعة، اختصر الحشو البلاغي والترادف التكراري مع صون الفاعل والفعل والأرقام والقطبية الدلالية كاملة.',
    whenToUse: 'الجلسات المقيدة بوقت ضيق أو المتحدثين الذين يقرؤون نصوصاً كثيفة دون وقفات.',
    exampleSource: '«في هذه المرحلة بالذات، أود أن أغتنم الفرصة لأعرب عن عميق امتناننا…»',
    exampleOutput: '«نشكر بصدق…» (تكافؤ تداولي بنسبة ١٠٠٪ بست كلمات فقط).',
    commonPitfall: 'تسريع نطقك حتى يصبح غير مفهوم بدلاً من تكثيف الصياغة.',
    drillTip: 'جرّب سرعة ١.٢٠x في الاستوديو وقدّم وضوح النطق على الحرفية.',
  },
  {
    id: 'sim-numbers',
    mode: 'simultaneous',
    title: 'إدارة الأرقام والاختصارات وأسماء الأعلام',
    subtitle: 'تفريغ فوري على الورق داخل المقصورة',
    principle:
      'لا تقبل الأرقام التخمين من السياق؛ دوّن الرقم على الورق لحظة سماعه بينما تنطق السياق اللفظي المحيط به.',
    whenToUse: 'التقارير الاقتصادية والميزانيات والقرارات الدولية والتواريخ.',
    exampleSource: '«٤.٢ مليار يورو» ← «4.2B €».',
    exampleOutput: 'سجّل «4.2B€» فوراً على الورق وتحقق من المقياس العددي ونطقه بثبات.',
    commonPitfall: 'التردد في المراتب العددية أو الخلط بين المليار والتريليون بين اللغات.',
    drillTip: 'تدرّب على المرحلة ٣ بتدوين الأرقام والوحدات فقط أمام الميكروفون.',
  },
  {
    id: 'con-phases',
    mode: 'consecutive',
    title: 'نموذج المراحل الثلاث في الترجمة التتبعية',
    subtitle: 'التحليل الذهني قبل الكتابة الآلية',
    principle:
      '١) الاستماع التحليلي والتدوين (٧٠٪ للفهم و٣٠٪ للتدوين)؛ ٢) مسح بصري لثانية أو ثانيتين؛ ٣) الإلقاء التواصلي مع النظر إلى الجمهور.',
    whenToUse: 'المؤتمرات الصحفية والمفاوضات الثنائية والمحاكم واللقاءات دون مقصورات.',
    exampleSource: 'مداخلة متصلة من دقيقتين إلى خمس دقائق.',
    exampleOutput: 'يحافظ المترجم على التواصل البصري بنسبة ٨٠٪ ويستعين بنظرة خاطفة إلى البنية القطرية.',
    commonPitfall: 'التحول إلى ناسخ يحاول تدوين كل كلمة، مما يدمر الفهم الشامل.',
    drillTip: 'استمع أولاً إلى فقرة كاملة مسجلاً ٤ إلى ٦ رموز محورية فقط.',
  },
  {
    id: 'con-rozan',
    mode: 'consecutive',
    title: 'مبادئ روزان السبعة والتدرج القطري',
    subtitle: 'الهندسة البصرية للصفحة (جان فرانسوا روزان، ١٩٥٦)',
    principle:
      '١) الفكرة لا الكلمة؛ ٢) الاختصار واللواحق؛ ٣) الروابط في الهامش؛ ٤) النفي الواضح؛ ٥) التسطير للتوكيد؛ ٦) العمودية للقوائم؛ ٧) التدرج القطري فاعل ← فعل ← مفعول.',
    whenToUse: 'الأساس المعتمد في الأمم المتحدة ومؤسسات الاتحاد الأوروبي وكليات الترجمة.',
    exampleSource: '«رغم أن الشركات الصغرى تمثل ٩٠٪، تقترح اللجنة تخصيص ٤.٢ مليار يورو.»',
    exampleOutput: 'هامش: ∥ | SMEs > 90% | هامش: ∴ | 🏛 UE → prop. → 4.2B€.',
    commonPitfall: 'الكتابة الأفقية المتصلة كالإملاء المدرسي مما يخفي العلاقات النحوية.',
    drillTip: 'استخدم لوح التدوين مع الالتزام بخط الهامش المخصص للروابط (∵، ∴، ∥).',
  },
  {
    id: 'con-matyssek',
    mode: 'consecutive',
    title: 'الرموز التركيبية (منهج ماتيسيك)',
    subtitle: 'رموز جذرية + لواحق صرفية موفرة للوقت',
    principle:
      'مجموعة ثابتة من ٣٠ إلى ٥٠ رمزاً أساسياً تندمج مع علامات سريعة للتعبير عن الجمع أو الصفة أو الزمن بشكل مستقل عن اللغة.',
    whenToUse: 'الخطب الطويلة (٤–٨ دقائق) حيث تؤدي الكتابة الكاملة إلى تأخير متراكم.',
    exampleSource: '«يجب على جميع الدول الأعضاء اعتماد آلية مستقلة على وجه السرعة.»',
    exampleOutput: '∀ □s → ⏱ ✓ → آلية مستقلة.',
    commonPitfall: 'اختراع رموز ارتجالية أثناء الخطاب يعجز المترجم عن قراءتها لاحقاً.',
    drillTip: 'احفظ نواة ثابتة من الرموز عبر مكتبة الرموز التفاعلية قبل إضافة رموزك الخاصة.',
  },
  {
    id: 'con-memory-delivery',
    mode: 'consecutive',
    title: 'الإلقاء التواصلي والتنغيم وإغلاق الجمل',
    subtitle: 'خطابة المترجم الفوري مقابل القراءة الآلية',
    principle:
      'الدفتر مجرد محفّز للذاكرة؛ أما التنغيم الواثق والوقفات المدروسة والنبرة الهابطة عند ختام الجمل فهي التي تمنح الترجمة مصداقية.',
    whenToUse: 'أثناء التسجيل في وضع التتبعية وعند مراجعة مؤشرات التنغيم والوقفات.',
    exampleSource: 'ملاحظات تخطيطية بالأسهم والأرقام والاختصارات.',
    exampleOutput: 'جمل تامة الإغلاق خالية من اللوازم الصوتية المترددة.',
    commonPitfall: 'ترك النبرة معلّقة نحو الأعلى في نهاية الجملة أثناء البحث عن الرمز التالي.',
    drillTip: 'راجع مؤشر التنغيم وتحليل الوقفات بعد كل تقييم بالذكاء الاصطناعي.',
  },
];

const EXAMPLES_FR: NotebookWorkedExample[] = [
  {
    id: 'ex-un-ihl',
    title: 'Discours Diplomatique ONU — Droit International Humanitaire',
    institution: 'Conseil de sécurité · ONU',
    sourceSpeech:
      '« La crédibilité de cette institution repose sur notre capacité collective à faire respecter le droit international humanitaire sans exceptions. Lorsque les civils manquent d’eau potable et de couloirs sûrs, l’inaction équivaut à une complicité. Nous exhortons donc toutes les parties à soutenir un mécanisme indépendant. »',
    rozanLines: [
      { margin: '', indent: 0, notation: 'crédib. 🏛 ═', gloss: 'Sujet + double emphase (crédibilité de l’institution)' },
      { margin: '→', indent: 1, notation: 'dépend ∀ cap. ⚙ ⚖ DIH (✗ excep.)', gloss: 'Verbe diagonal + complément + négation des exceptions' },
      { margin: 'Si:', indent: 0, notation: '👥 civ.  ∅ eau / couloirs 🛡', gloss: 'Condition en verticalisme (eau et couloirs sûrs)' },
      { margin: '⇒', indent: 1, notation: 'inaction ⇔ complic.', gloss: 'Équivalence logique directe' },
      { margin: '∴', indent: 0, notation: '” ∀ parties  →  ⏱ ✓ méc. indép.', gloss: 'Conclusion en marge + exhortation urgente' },
    ],
    restitutionTip:
      'Observez comment chaque idée occupe un palier diagonal net tandis que la marge gauche porte toute la progression logique (Si: → ⇒ → ∴).',
  },
  {
    id: 'ex-eu-digital',
    title: 'Commission européenne — Transition numérique et financement PME',
    institution: 'Union européenne · DG SCIC',
    sourceSpeech:
      '« Bien que les petites et moyennes entreprises représentent plus de quatre-vingt-dix pour cent du tissu productif, beaucoup manquent d’infrastructures sûres. Par conséquent, la Commission propose d’allouer 4,2 milliards d’euros d’ici 2028 à des pôles régionaux de formation. »',
    rozanLines: [
      { margin: '∥', indent: 0, notation: 'PME > 90% écon.', gloss: 'Opposition initiale dans la marge gauche (∥)' },
      { margin: '', indent: 1, notation: 'bcp  ∅ infra. 🛡', gloss: 'Manque noté par ensemble vide (∅) + bouclier (sécurité)' },
      { margin: '∴', indent: 0, notation: '🏛 UE  →  prop.', gloss: 'Acteur institutionnel + verbe de proposition' },
      { margin: '', indent: 1, notation: '€4.2B  (⏭ 2028)', gloss: 'Montant isolé + échéance temporelle entre parenthèses' },
      { margin: '', indent: 2, notation: '→  pôles rég. form. tech.', gloss: 'Destinataire final au troisième palier diagonal' },
    ],
    restitutionTip:
      'Les chiffres (€4.2B et 2028) sont isolés sur leur propre palier pour être lus d’un trait sans hésitation.',
  },
  {
    id: 'ex-fao-trade',
    title: 'Comité technique FAO/OMC — Marchés céréaliers et fret maritime',
    institution: 'FAO / OMC',
    sourceSpeech:
      '« Selon le rapport de novembre, les exportations mondiales de céréales ont crû de 3,4% sur un an pour atteindre 485 millions de tonnes. Toutefois, en raison d’une hausse de 18% du fret maritime, l’indice des prix s’est établi à 127,6 points. »',
    rozanLines: [
      { margin: '”', indent: 0, notation: 'Rap. nov. :', gloss: 'Source citée par les guillemets d’attribution' },
      { margin: '', indent: 1, notation: '🌐 exp. céréales  ↗ 3.4% / an  (→ 485M t)', gloss: 'Tendance haussière + volume final' },
      { margin: '∥', indent: 0, notation: '∵ fret marit. ↗ 18%', gloss: 'Contraste (∥) + cause (∵) enchaînés dans la marge' },
      { margin: '→', indent: 1, notation: 'indice FAO  ⏺ 127.6 pts', gloss: 'Résultat actuel (⏺) avec décimale exacte' },
    ],
    restitutionTip:
      'Combiner ∥ et ∵ en marge permet de noter « Toutefois, en raison de… » en deux tracés instantanés.',
  },
];

const EXAMPLES_AR: NotebookWorkedExample[] = [
  {
    id: 'ex-un-ihl',
    title: 'خطاب دبلوماسي في الأمم المتحدة — القانون الدولي الإنساني',
    institution: 'مجلس الأمن · الأمم المتحدة',
    sourceSpeech:
      '«تقوم مصداقية هذه المؤسسة على قدرتنا الجماعية على إنفاذ القانون الدولي الإنساني دون استثناءات. وعندما يُحرم المدنيون من المياه والممرات الآمنة، فإن التقاعس يغدو تواطؤاً. لذا نحث جميع الأطراف على دعم آلية مستقلة.»',
    rozanLines: [
      { margin: '', indent: 0, notation: 'credib. 🏛 ═', gloss: 'الفاعل + توكيد مزدوج (مصداقية هذه المؤسسة)' },
      { margin: '→', indent: 1, notation: 'depende ∀ cap. ⚙ ⚖ DIH (✗ excep.)', gloss: 'فعل قطري + مفعول + نفي الاستثناءات' },
      { margin: 'Si:', indent: 0, notation: '👥 civ.  ∅ agua / corredores 🛡', gloss: 'شرط في الهامش مع تعداد عمودي (مياه وممرات آمنة)' },
      { margin: '⇒', indent: 1, notation: 'inacción ⇔ complic.', gloss: 'تكافؤ منطقي مباشر (التقاعس يغدو تواطؤاً)' },
      { margin: '∴', indent: 0, notation: '” ∀ partes  →  ⏱ ✓ mec. indep.', gloss: 'نتيجة في الهامش + دعوة عاجلة لدعم الآلية' },
    ],
    restitutionTip:
      'لاحظ كيف تشغل كل فكرة درجة قطرية واضحة بينما يحمل الهامش كامل البنية المنطقية (Si: ← ⇒ ← ∴).',
  },
  {
    id: 'ex-eu-digital',
    title: 'المفوضية الأوروبية — التحول الرقمي وتمويل الشركات الصغرى',
    institution: 'الاتحاد الأوروبي · DG SCIC',
    sourceSpeech:
      '«رغم أن المؤسسات الصغيرة والمتوسطة تمثل أكثر من ٩٠٪ من النسيج الإنتاجي، يفتقر كثير منها إلى بنية آمنة. وبالتالي تقترح المفوضية تخصيص ٤.٢ مليار يورو حتى عام ٢٠٢٨ لمراكز التدريب الإقليمية.»',
    rozanLines: [
      { margin: '∥', indent: 0, notation: 'PYMEs > 90% econ.', gloss: 'استدراك ابتدائي في الهامش (∥)' },
      { margin: '', indent: 1, notation: 'muchas  ∅ infra. 🛡', gloss: 'نقص ممثّل بالمجموعة الخالية (∅) + درع الأمن' },
      { margin: '∴', indent: 0, notation: '🏛 UE  →  prop.', gloss: 'الجهة المؤسسية + فعل الاقتراح' },
      { margin: '', indent: 1, notation: '€4.2B  (⏭ 2028)', gloss: 'المبلغ معزولاً + الأفق الزمني بين قوسين' },
      { margin: '', indent: 2, notation: '→  centros reg. form. téc.', gloss: 'المستفيد النهائي في الدرجة الثالثة' },
    ],
    restitutionTip:
      'عزل الأرقام (€4.2B و2028) في سطر مستقل متدرج يتيح قراءتها بسلاسة دون تردد.',
  },
  {
    id: 'ex-fao-trade',
    title: 'اللجنة الفنية FAO/OMC — أسواق الحبوب وتكاليف الشحن البحري',
    institution: 'منظمة الأغذية والزراعة / منظمة التجارة العالمية',
    sourceSpeech:
      '«وفقاً لتقرير نوفمبر، ارتفعت صادرات الحبوب العالمية بنسبة ٣.٤٪ سنوياً إلى ٤٨٥ مليون طن. غير أنه بسبب ارتفاع الشحن البحري ١٨٪، استقر مؤشر الأسعار عند ١٢٧.٦ نقطة.»',
    rozanLines: [
      { margin: '”', indent: 0, notation: 'Inf. nov.:', gloss: 'إسناد المصدر عبر علامة الاقتباس' },
      { margin: '', indent: 1, notation: '🌐 exp. cereales  ↗ 3.4% / año  (→ 485M t)', gloss: 'اتجاه صعودي + الكمية الإجمالية' },
      { margin: '∥', indent: 0, notation: '∵ flete marít. ↗ 18%', gloss: 'دمج الاستدراك (∥) والسبب (∵) في الهامش' },
      { margin: '→', indent: 1, notation: 'índice FAO  ⏺ 127.6 pts', gloss: 'النتيجة الراهنة (⏺) بالفاصل العشري الدقيق' },
    ],
    restitutionTip:
      'الجمع بين ∥ و ∵ في الهامش يختصر عبارة «غير أنه نظراً إلى…» برمزين فوريين.',
  },
];

export function getRozanHierarchySteps(lang: UiLang): RozanHierarchyStep[] {
  if (lang === 'fr') return HIERARCHY_FR;
  if (lang === 'ar') return HIERARCHY_AR;
  return ROZAN_HIERARCHY_STEPS;
}

export function getRozanConnectors(lang: UiLang): RozanConnectorItem[] {
  if (lang === 'fr') return CONNECTORS_FR;
  if (lang === 'ar') return CONNECTORS_AR;
  return ROZAN_LOGICAL_CONNECTORS;
}

export function getRozanAbbreviations(lang: UiLang): RozanAbbreviationItem[] {
  if (lang === 'fr') return ABBR_FR;
  if (lang === 'ar') return ABBR_AR;
  return ROZAN_ABBREVIATIONS;
}

export function getTechniqueGuides(lang: UiLang): TechniqueGuide[] {
  if (lang === 'fr') return GUIDES_FR;
  if (lang === 'ar') return GUIDES_AR;
  return TECHNIQUE_GUIDES;
}

export function getWorkedExamples(lang: UiLang): NotebookWorkedExample[] {
  if (lang === 'fr') return EXAMPLES_FR;
  if (lang === 'ar') return EXAMPLES_AR;
  return NOTEBOOK_WORKED_EXAMPLES;
}
