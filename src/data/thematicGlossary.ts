import type { GlossaryDomain, GlossaryTerm, UiLang } from '../types';

export const GLOSSARY_DOMAIN_LABELS: Record<UiLang, Record<GlossaryDomain | 'all', string>> = {
  es: {
    all: 'Todos los ámbitos',
    diplomacy: 'Diplomacia y tratados',
    economy: 'Economía y finanzas',
    climate: 'Clima y energía',
    law: 'Derecho y DD. HH.',
    health: 'Salud global',
    tech: 'Gobernanza digital e IA',
  },
  fr: {
    all: 'Tous les domaines',
    diplomacy: 'Diplomatie et traités',
    economy: 'Économie et finances',
    climate: 'Climat et énergie',
    law: 'Droit et droits humains',
    health: 'Santé mondiale',
    tech: 'Gouvernance numérique et IA',
  },
  ar: {
    all: 'جميع المجالات',
    diplomacy: 'الدبلوماسية والمعاهدات',
    economy: 'الاقتصاد والمالية',
    climate: 'المناخ والطاقة',
    law: 'القانون وحقوق الإنسان',
    health: 'الصحة العالمية',
    tech: 'الحوكمة الرقمية والذكاء الاصطناعي',
  },
};

export const DEFAULT_THEMATIC_GLOSSARY: GlossaryTerm[] = [
  // DIPLOMACIA Y TRATADOS
  {
    id: 'gl-dip-1',
    domain: 'diplomacy',
    es: 'Acuerdo jurídicamente vinculante',
    fr: 'Accord juridiquement contraignant',
    ar: 'اتفاق ملزم قانوناً',
    registerNote: {
      es: 'Evitar «acuerdo obligatorio» en textos ONU; usar «jurídicamente vinculante».',
      fr: 'Formule standard des résolutions onusiennes ; ne pas traduire par « obligatoire ».',
      ar: 'الصيغة المعتمدة في وثائق الأمم المتحدة لتمييزه عن التعهدات السياسية غير الملزمة.',
    },
    contextSentence: {
      es: 'Los Estados partes adoptaron un acuerdo jurídicamente vinculante sobre cooperación transfronteriza.',
      fr: 'Les États parties ont adopté un accord juridiquement contraignant sur la coopération transfrontalière.',
      ar: 'اعتمدت الدول الأطراف اتفاقاً ملزماً قانوناً بشأن التعاون عبر الحدود.',
    },
  },
  {
    id: 'gl-dip-2',
    domain: 'diplomacy',
    es: 'Consenso sin objeciones',
    fr: 'Consensus sans objection',
    ar: 'توافق في الآراء دون اعتراض',
    registerNote: {
      es: 'En plenario, significa aprobación tácita cuando ninguna delegación pide la palabra para oponerse.',
      fr: 'Approbation tacite en séance plénière lorsqu’aucune délégation ne s’oppose.',
      ar: 'يعني إقرار القرار دون تصويت إذا لم تبدِ أي دولة عضوة اعتراضاً صريحاً.',
    },
    contextSentence: {
      es: 'La presidencia declaró aprobada la resolución por consenso sin objeciones.',
      fr: 'La présidence a déclaré la résolution adoptée par consensus sans objection.',
      ar: 'أعلنت الرئاسة اعتماد القرار بتوافق الآراء دون اعتراض.',
    },
  },
  {
    id: 'gl-dip-3',
    domain: 'diplomacy',
    es: 'Cese al fuego humanitario inmediato',
    fr: 'Cessez-le-feu humanitaire immédiat',
    ar: 'وقف فوري لإطلاق النار لأغراض إنسانية',
    registerNote: {
      es: 'Distinguir «tregua» (temporal/local) de «cese al fuego» o «alto el fuego» en resoluciones del Consejo.',
      fr: 'Distinguer « trêve » (locale) de « cessez-le-feu humanitaire » dans les résolutions du Conseil.',
      ar: 'يجب التفريق بين الهدنة المؤقتة ووقف إطلاق النار الإنساني في قرارات مجلس الأمن.',
    },
    contextSentence: {
      es: 'El Consejo de Seguridad exhortó a las partes a respetar un cese al fuego humanitario inmediato.',
      fr: 'Le Conseil de sécurité a exhorté les parties à respecter un cessez-le-feu humanitaire immédiat.',
      ar: 'دعا مجلس الأمن الأطراف إلى الالتزام بوقف فوري لإطلاق النار لأغراض إنسانية.',
    },
  },
  {
    id: 'gl-dip-4',
    domain: 'diplomacy',
    es: 'Soberanía e integridad territorial',
    fr: 'Souveraineté et intégrité territoriale',
    ar: 'السيادة والسلامة الإقليمية',
    registerNote: {
      es: 'Fórmula fija de la Carta de la ONU (art. 2.4). Mantener la pareja exacta en cabina.',
      fr: 'Formule consacrée de la Charte des Nations Unies (art. 2.4). Conserver le binôme exact.',
      ar: 'تعبير ثابت في ميثاق الأمم المتحدة (المادة 2.4) يُنقل حرفياً في الخطاب الدبلوماسي.',
    },
    contextSentence: {
      es: 'Reafirmamos nuestro pleno respeto por la soberanía e integridad territorial de todos los Estados.',
      fr: 'Nous réaffirmons notre plein respect pour la souveraineté et l’intégrité territoriale de tous les États.',
      ar: 'نجدد تأكيدنا على الاحترام الكامل لسيادة جميع الدول وسلامتها الإقليمية.',
    },
  },
  {
    id: 'gl-dip-5',
    domain: 'diplomacy',
    es: 'Acreditación de plenipotenciarios',
    fr: 'Accréditation des plénipotentiaires',
    ar: 'اعتماد المفوضين ذوي الصلاحيات الكاملة',
    registerNote: {
      es: 'Término protocolario de cumbres y conferencias de firma de tratados.',
      fr: 'Terme protocolaire utilisé lors des conférences de signature des traités.',
      ar: 'مصطلح بروتوكولي يُستخدم في مؤتمرات التوقيع على المعاهدات الدولية.',
    },
    contextSentence: {
      es: 'La comisión de verificación revisó las cartas de acreditación de los plenipotenciarios.',
      fr: 'La commission de vérification a examiné les lettres d’accréditation des plénipotentiaires.',
      ar: 'راجعت لجنة التحقق وثائق اعتماد المفوضين قبل مراسم التوقيع.',
    },
  },

  // ECONOMÍA Y FINANZAS
  {
    id: 'gl-eco-1',
    domain: 'economy',
    es: 'Consolidación fiscal progresiva',
    fr: 'Assainissement budgétaire progressif',
    ar: 'ضبط الأوضاع المالية العامة تدريجياً',
    registerNote: {
      es: 'Falso amigo frecuente en francés: «assainissement budgétaire» equivale a saneamiento/consolidación fiscal.',
      fr: 'Équivalent de la consolidation budgétaire dans les rapports du FMI et de l’UE.',
      ar: 'المصطلح المعتمد في تقارير صندوق النقد الدولي للإشارة إلى خفض العجز المالي تدريجياً.',
    },
    contextSentence: {
      es: 'El banco central recomendó una consolidación fiscal progresiva que proteja la inversión pública.',
      fr: 'La banque centrale a recommandé un assainissement budgétaire progressif protégeant l’investissement public.',
      ar: 'أوصى البنك المركزي بضبط الأوضاع المالية العامة تدريجياً مع حماية الاستثمار العام.',
    },
  },
  {
    id: 'gl-eco-2',
    domain: 'economy',
    es: 'Tipo de interés de referencia',
    fr: 'Taux directeur',
    ar: 'سعر الفائدة المرجعي',
    registerNote: {
      es: 'En francés «taux directeur» es clave en comunicados del BCE; evitar traducir literalmente como «tasa directora».',
      fr: 'Terme officiel de la BCE et des banques centrales ; correspond au « policy rate ».',
      ar: 'السعر الأساسي الذي يحدده البنك المركزي لتوجيه أسعار الفائدة في السوق المصرفية.',
    },
    contextSentence: {
      es: 'La autoridad monetaria mantuvo sin cambios el tipo de interés de referencia durante este trimestre.',
      fr: 'L’autorité monétaire a maintenu son taux directeur inchangé au cours de ce trimestre.',
      ar: 'أبقت السلطة النقدية سعر الفائدة المرجعي دون تغيير خلال هذا الربع.',
    },
  },
  {
    id: 'gl-eco-3',
    domain: 'economy',
    es: 'Cadenas de suministro resilientes',
    fr: 'Chaînes d’approvisionnement résilientes',
    ar: 'سلاسل إمداد مرنة ومستدامة',
    registerNote: {
      es: 'Muy frecuente en debates de la OMC, UNCTAD y UE sobre comercio estratégico.',
      fr: 'Expression récurrente à l’OMC et au Parlement européen sur la souveraineté industrielle.',
      ar: 'مصطلح شائع في مؤتمرات التجارة العالمية للدلالة على قدرة التوريد على الصمود أمام الأزمات.',
    },
    contextSentence: {
      es: 'Diversificar los proveedores resulta esencial para garantizar cadenas de suministro resilientes.',
      fr: 'Diversifier les fournisseurs demeure essentiel pour garantir des chaînes d’approvisionnement résilientes.',
      ar: 'يُعد تنويع الموردين أمراً أساسياً لضمان سلاسل إمداد مرنة ومستقرة.',
    },
  },
  {
    id: 'gl-eco-4',
    domain: 'economy',
    es: 'Derechos compensatorios',
    fr: 'Droits compensateurs',
    ar: 'الرسوم التعويضية',
    registerNote: {
      es: 'No confundir con «medidas antidumping»; los derechos compensatorios responden a subvenciones estatales.',
      fr: 'À distinguer des droits antidumping : ils répondent aux subventions publiques étrangères.',
      ar: 'تُفرض لمواجهة الدعم الحكومي الأجنبي غير المتكافئ، وتختلف عن رسوم مكافحة الإغراق.',
    },
    contextSentence: {
      es: 'El panel arbitral evaluó la legalidad de los derechos compensatorios aplicados al acero.',
      fr: 'Le groupe spécial d’arbitrage a évalué la légalité des droits compensateurs appliqués à l’acier.',
      ar: 'قيّمت هيئة التحكيم مدى مشروعية الرسوم التعويضية المفروضة على واردات الصلب.',
    },
  },
  {
    id: 'gl-eco-5',
    domain: 'economy',
    es: 'Liquidez interbancaria',
    fr: 'Liquidité interbancaire',
    ar: 'السيولة بين البنوك',
    registerNote: {
      es: 'En notas Rozan abreviar como «liq. bq/bq» o «liq. intbq».',
      fr: 'En prise de notes, abréger « liq. interbq » pour gagner en vitesse.',
      ar: 'تُشير إلى توفر الأموال القابلة للتداول الفوري بين المؤسسات المصرفية.',
    },
    contextSentence: {
      es: 'Las tensiones en la liquidez interbancaria exigieron una línea extraordinaria de financiación.',
      fr: 'Les tensions sur la liquidité interbancaire ont nécessité une facilité de financement extraordinaire.',
      ar: 'استدعت الضغوط على السيولة بين البنوك توفير تسهيلات تمويلية استثنائية.',
    },
  },

  // CLIMA Y TRANSICIÓN ENERGÉTICA
  {
    id: 'gl-cli-1',
    domain: 'climate',
    es: 'Neutralidad climática',
    fr: 'Neutralité climatique',
    ar: 'الحياد المناخي',
    registerNote: {
      es: 'Abarca todos los gases de efecto invernadero, mientras que «neutralidad de carbono» suele centrarse en CO₂.',
      fr: 'Couvre l’ensemble des gaz à effet de serre, plus large que la seule neutralité carbone.',
      ar: 'يشمل جميع غازات الدفيئة، وهو أوسع نطاقاً من الحياد الكربوني المقتصر على ثاني أكسيد الكربون.',
    },
    contextSentence: {
      es: 'La hoja de ruta fija el objetivo vinculante de alcanzar la neutralidad climática antes de 2050.',
      fr: 'La feuille de route fixe l’objectif contraignant d’atteindre la neutralité climatique avant 2050.',
      ar: 'تحدد خارطة الطريق هدفاً ملزماً لتحقيق الحياد المناخي قبل عام 2050.',
    },
  },
  {
    id: 'gl-cli-2',
    domain: 'climate',
    es: 'Fondo de pérdidas y daños',
    fr: 'Fonds pour les pertes et préjudices',
    ar: 'صندوق الخسائر والأضرار المناخية',
    registerNote: {
      es: 'Término técnico oficial de las cumbres COP de la CMNUCC. Usar «préjudices» en francés.',
      fr: 'Terminologie officielle de la CCNUCC lors des sommets COP (« Loss and Damage »).',
      ar: 'المصطلح الرسمي المعتمد في مؤتمرات الأطراف للمناخ (COP) لتعويض الدول الأكثر هشاشة.',
    },
    contextSentence: {
      es: 'Los países vulnerables reclamaron aportaciones predecibles para el fondo de pérdidas y daños.',
      fr: 'Les pays vulnérables ont réclamé des contributions prévisibles pour le fonds pour les pertes et préjudices.',
      ar: 'طالبت الدول الهشة بمساهمات تمويلية مستدامة لصندوق الخسائر والأضرار المناخية.',
    },
  },
  {
    id: 'gl-cli-3',
    domain: 'climate',
    es: 'Transición energética justa',
    fr: 'Transition énergétique juste',
    ar: 'التحول الطاقي العادل',
    registerNote: {
      es: 'Subraya la reconversión laboral y la protección social de regiones dependientes de combustibles fósiles.',
      fr: 'Souligne la protection sociale et la reconversion des travailleurs des secteurs fossiles.',
      ar: 'يركز على حماية العمال والمجتمعات أثناء الانتقال من الوقود الأحفوري إلى الطاقة النظيفة.',
    },
    contextSentence: {
      es: 'Ninguna estrategia de descarbonización tendrá éxito sin una transición energética justa.',
      fr: 'Aucune stratégie de décarbonation ne réussira sans une transition énergétique juste.',
      ar: 'لن تنجح أي استراتيجية لإزالة الكربون دون ضمان تحول طاقي عادل للجميع.',
    },
  },
  {
    id: 'gl-cli-4',
    domain: 'climate',
    es: 'Mecanismo de ajuste en frontera por carbono',
    fr: 'Mécanisme d’ajustement carbone aux frontières',
    ar: 'آلية تعديل حدود الكربون',
    registerNote: {
      es: 'Sigla frecuente: MAFC (es) / MACF (fr) / CBAM (en). Identificar la sigla al inicio del turno.',
      fr: 'Sigle européen MACF (en anglais CBAM). À annoncer clairement dès la première occurrence.',
      ar: 'آلية أوروبية لفرض تسعيرة كربون عادلة على الواردات كثيفة الانبعاثات.',
    },
    contextSentence: {
      es: 'El mecanismo de ajuste en frontera por carbono busca evitar la fuga de emisiones industriales.',
      fr: 'Le mécanisme d’ajustement carbone aux frontières vise à éviter les fuites de carbone.',
      ar: 'تهدف آلية تعديل حدود الكربون إلى منع تسرب الانبعاثات الصناعية خارج الحدود.',
    },
  },
  {
    id: 'gl-cli-5',
    domain: 'climate',
    es: 'Descarbonización industrial',
    fr: 'Décarbonation industrielle',
    ar: 'إزالة الكربون من القطاع الصناعي',
    registerNote: {
      es: 'En francés usar «décarbonation» (preferido por la UE y la Academia frente a «décarbonisation»).',
      fr: 'Privilégier « décarbonation » dans les textes institutionnels européens.',
      ar: 'خفض انبعاثات الكربون في الصناعات الثقيلة كالإسمنت والصلب عبر تقنيات نظيفة.',
    },
    contextSentence: {
      es: 'La electrificación de procesos acelera la descarbonización industrial en el sector siderúrgico.',
      fr: 'L’électrification des procédés accélère la décarbonation industrielle dans la sidérurgie.',
      ar: 'يسرّع الاعتماد على الكهرباء النظيفة إزالة الكربون من القطاع الصناعي الثقيل.',
    },
  },

  // DERECHO INTERNACIONAL Y DERECHOS HUMANOS
  {
    id: 'gl-law-1',
    domain: 'law',
    es: 'Principio de no devolución',
    fr: 'Principe de non-refoulement',
    ar: 'مبدأ عدم الإعادة القسرية',
    registerNote: {
      es: 'Piedra angular de la Convención sobre el Estatuto de los Refugiados de 1951.',
      fr: 'Principe cardinal de la Convention de Genève de 1951 relative au statut des réfugiés.',
      ar: 'ركيزة أساسية في اتفاقية اللاجئين لعام 1951 تحظر ترحيل الأفراد إلى حيث يواجهون الخطر.',
    },
    contextSentence: {
      es: 'Toda política migratoria debe respetar estrictamente el principio de no devolución.',
      fr: 'Toute politique migratoire doit respecter strictement le principe de non-refoulement.',
      ar: 'يجب أن تلتزم كل سياسة للهجرة التزاماً صارماً بمبدأ عدم الإعادة القسرية.',
    },
  },
  {
    id: 'gl-law-2',
    domain: 'law',
    es: 'Garantías del debido proceso',
    fr: 'Garanties d’un procès équitable',
    ar: 'ضمانات المحاكمة العادلة',
    registerNote: {
      es: 'En francés jurídico institucional suele traducirse como «procès équitable» o «garanties procédurales».',
      fr: 'Équivalent juridique usuel de « due process » dans la jurisprudence européenne.',
      ar: 'تشمل حق الدفاع وعلنية الجلسات واستقلال القضاء في القضايا الجزائية والمدنية.',
    },
    contextSentence: {
      es: 'El tribunal subrayó que las sanciones deben respetar las garantías del debido proceso.',
      fr: 'La cour a souligné que les sanctions doivent respecter les garanties d’un procès équitable.',
      ar: 'شددت المحكمة على وجوب احترام ضمانات المحاكمة العادلة عند فرض أي عقوبات.',
    },
  },
  {
    id: 'gl-law-3',
    domain: 'law',
    es: 'Jurisdicción universal',
    fr: 'Compétence universelle',
    ar: 'الولاية القضائية العالمية',
    registerNote: {
      es: 'Falso amigo frecuente: en francés es «compétence universelle», no «juridiction universelle».',
      fr: 'Attention : le terme exact en droit français est « compétence universelle ».',
      ar: 'تتيح للمحاكم الوطنية ملاحقة الجرائم الدولية الجسيمة بغض النظر عن مكان وقوعها.',
    },
    contextSentence: {
      es: 'Varios tribunales nacionales abrieron diligencias bajo el principio de jurisdicción universal.',
      fr: 'Plusieurs juridictions nationales ont ouvert des enquêtes au titre de la compétence universelle.',
      ar: 'فتحت عدة محاكم وطنية تحقيقات استناداً إلى مبدأ الولاية القضائية العالمية.',
    },
  },
  {
    id: 'gl-law-4',
    domain: 'law',
    es: 'Medidas cautelares vinculantes',
    fr: 'Mesures conservatoires contraignantes',
    ar: 'تدابير تحفظية ملزمة',
    registerNote: {
      es: 'En la Corte Internacional de Justicia, «mesures conservatoires» equivale a medidas provisionales/cautelares.',
      fr: 'Terme exact utilisé par la Cour internationale de Justice (CIJ).',
      ar: 'تُصدرها محكمة العدل الدولية بصفة عاجلة لحماية الحقوق قبل الفصل في أصل النزاع.',
    },
    contextSentence: {
      es: 'La Corte Internacional de Justicia dictó medidas cautelares vinculantes de ejecución inmediata.',
      fr: 'La Cour internationale de Justice a ordonné des mesures conservatoires contraignantes d’application immédiate.',
      ar: 'أصدرت محكمة العدل الدولية تدابير تحفظية ملزمة واجبة النفاذ الفوري.',
    },
  },
  {
    id: 'gl-law-5',
    domain: 'law',
    es: 'Rendición de cuentas y reparación',
    fr: 'Reddition de comptes et réparation',
    ar: 'المساءلة وجبر الضرر',
    registerNote: {
      es: 'Equivalente habitual de «accountability and redress» en comisiones de derechos humanos.',
      fr: 'Traduction consacrée de « accountability and redress » aux Nations Unies.',
      ar: 'ثنائية أساسية في تقارير لجان التحقيق لضمان عدم الإفلات من العقاب وتعويض الضحايا.',
    },
    contextSentence: {
      es: 'El informe exige mecanismos independientes de rendición de cuentas y reparación para las víctimas.',
      fr: 'Le rapport exige des mécanismes indépendants de reddition de comptes et de réparation pour les victimes.',
      ar: 'يطالب التقرير بآليات مستقلة للمساءلة وجبر الضرر لصالح الضحايا.',
    },
  },

  // SALUD GLOBAL Y BIOÉTICA
  {
    id: 'gl-hea-1',
    domain: 'health',
    es: 'Vigilancia epidemiológica integrada',
    fr: 'Surveillance épidémiologique intégrée',
    ar: 'الرصد الوبائي المتكامل',
    registerNote: {
      es: 'Usar «vigilancia» en español y «surveillance» en francés (OMS). Evitar «supervisión».',
      fr: 'Terme OMS consacré (« surveillance épidémiologique »).',
      ar: 'نظام إنذار مبكر لمتابعة انتشار الأمراض المعدية عبر الشبكات الصحية الوطنية.',
    },
    contextSentence: {
      es: 'Reforzar la vigilancia epidemiológica integrada permite detectar brotes emergentes en horas.',
      fr: 'Le renforcement de la surveillance épidémiologique intégrée permet de détecter les foyers émergents en quelques heures.',
      ar: 'يتيح تعزيز الرصد الوبائي المتكامل اكتشاف البؤر الوبائية الناشئة خلال ساعات.',
    },
  },
  {
    id: 'gl-hea-2',
    domain: 'health',
    es: 'Resistencia a los antimicrobianos',
    fr: 'Résistance aux antimicrobiens',
    ar: 'مقاومة مضادات الميكروبات',
    registerNote: {
      es: 'Sigla oficial OMS: RAM (es/fr) / AMR (en). No limitar solo a «antibióticos».',
      fr: 'Sigle OMS : RAM. Englobe bactéries, virus, champignons et parasites.',
      ar: 'ظاهرة طبية عالمية تفقد فيها البكتيريا والفيروسات استجابتها للأدوية المعتادة.',
    },
    contextSentence: {
      es: 'La resistencia a los antimicrobianos amenaza la eficacia de cirugías y tratamientos esenciales.',
      fr: 'La résistance aux antimicrobiens menace l’efficacité des chirurgies et des traitements essentiels.',
      ar: 'تهدد مقاومة مضادات الميكروبات فعالية العمليات الجراحية والعلاجات الأساسية.',
    },
  },
  {
    id: 'gl-hea-3',
    domain: 'health',
    es: 'Acceso equitativo a contramedidas médicas',
    fr: 'Accès équitable aux contre-mesures médicales',
    ar: 'النفاذ العادل إلى التدابير الطبية المضادة',
    registerNote: {
      es: 'Incluye vacunas, diagnósticos y tratamientos en acuerdos sanitarios internacionales.',
      fr: 'Inclut vaccins, tests diagnostiques et traitements dans le traité sur les pandémies.',
      ar: 'يشمل اللقاحات والفحوصات والأدوية ضمن مفاوضات اتفاقية منظمة الصحة العالمية للأوبئة.',
    },
    contextSentence: {
      es: 'Las delegaciones negociaron cláusulas sobre acceso equitativo a contramedidas médicas.',
      fr: 'Les délégations ont négocié des dispositions sur l’accès équitable aux contre-mesures médicales.',
      ar: 'تفاوضت الوفود حول بنود تضمن النفاذ العادل إلى التدابير الطبية المضادة.',
    },
  },
  {
    id: 'gl-hea-4',
    domain: 'health',
    es: 'Consentimiento libre e informado',
    fr: 'Consentement libre et éclairé',
    ar: 'الموافقة الحرة والمستنيرة',
    registerNote: {
      es: 'En francés es «éclairé» (ilustrado/informado), nunca «informé» en contextos bioéticos.',
      fr: 'Formule juridique et bioéthique impérative : « libre et éclairé ».',
      ar: 'شرط أخلاقي وقانوني أساسي في التجارب السريرية والرعاية الصحية الدولية.',
    },
    contextSentence: {
      es: 'Todo ensayo clínico exige el consentimiento libre e informado previo de cada participante.',
      fr: 'Tout essai clinique exige le consentement libre et éclairé préalable de chaque participant.',
      ar: 'تتطلب كل تجربة سريرية الحصول المسبق على الموافقة الحرة والمستنيرة لكل مشارك.',
    },
  },
  {
    id: 'gl-hea-5',
    domain: 'health',
    es: 'Enfoque «Una sola salud»',
    fr: 'Approche « Une seule santé »',
    ar: 'نهج «صحة واحدة»',
    registerNote: {
      es: 'Vincula salud humana, sanidad animal y ecosistemas (traducción oficial de «One Health»).',
      fr: 'Traduction officielle de « One Health » adoptée par l’OMS, la FAO et l’OMSA.',
      ar: 'نهج متكامل يربط بين صحة الإنسان وصحة الحيوان وسلامة النظم البيئية.',
    },
    contextSentence: {
      es: 'El enfoque «Una sola salud» orienta la prevención conjunta de enfermedades zoonóticas.',
      fr: 'L’approche « Une seule santé » guide la prévention conjointe des maladies zoonotiques.',
      ar: 'يوجه نهج «صحة واحدة» الجهود المشتركة للوقاية من الأمراض الحيوانية المنشأ.',
    },
  },

  // GOBERNANZA DIGITAL E INTELIGENCIA ARTIFICIAL
  {
    id: 'gl-tec-1',
    domain: 'tech',
    es: 'Soberanía e integridad de los datos',
    fr: 'Souveraineté et intégrité des données',
    ar: 'سيادة البيانات وسلامتها',
    registerNote: {
      es: 'Clave en cumbres sobre nube pública, flujos transfronterizos y protección de privacidad.',
      fr: 'Notion centrale des débats européens sur l’informatique en nuage et les flux de données.',
      ar: 'مبدأ يحكم خضوع البيانات الرقمية للقوانين الوطنية وحمايتها من التلاعب.',
    },
    contextSentence: {
      es: 'La directiva refuerza la soberanía e integridad de los datos alojados en infraestructuras críticas.',
      fr: 'La directive renforce la souveraineté et l’intégrité des données hébergées sur des infrastructures critiques.',
      ar: 'يعزز التوجيه سيادة البيانات وسلامتها المستضافة ضمن البنى التحتية الحيوية.',
    },
  },
  {
    id: 'gl-tec-2',
    domain: 'tech',
    es: 'Trazabilidad y auditabilidad algorítmica',
    fr: 'Traçabilité et auditabilité algorithmiques',
    ar: 'قابلية تتبع الخوارزميات وتدقيقها',
    registerNote: {
      es: 'Exigencia de transparencia en sistemas de IA de alto riesgo (Reglamento europeo de IA).',
      fr: 'Exigence clé du Règlement européen sur l’intelligence artificielle pour les systèmes à haut risque.',
      ar: 'متطلب تنظيمي في تشريعات الذكاء الاصطناعي لضمان إمكانية فحص القرارات الآلية.',
    },
    contextSentence: {
      es: 'Los sistemas de alto riesgo deberán garantizar trazabilidad y auditabilidad algorítmica.',
      fr: 'Les systèmes à haut risque devront garantir la traçabilité et l’auditabilité algorithmiques.',
      ar: 'يتعين على الأنظمة عالية المخاطر ضمان قابلية تتبع الخوارزميات وتدقيقها.',
    },
  },
  {
    id: 'gl-tec-3',
    domain: 'tech',
    es: 'Ciberresiliencia de infraestructuras críticas',
    fr: 'Cyberrésilience des infrastructures critiques',
    ar: 'المرونة السيبرانية للبنى التحتية الحيوية',
    registerNote: {
      es: 'Más amplio que «ciberseguridad»: incluye continuidad operativa y recuperación rápida tras incidentes.',
      fr: 'Dépasse la seule prévention : inclut la continuité d’activité après cyberincident.',
      ar: 'تتجاوز الحماية الوقائية لتشمل استمرارية الخدمات الأساسية والتعافي السريع بعد الهجمات.',
    },
    contextSentence: {
      es: 'La cooperación regional mejora la ciberresiliencia de infraestructuras críticas energéticas.',
      fr: 'La coopération régionale améliore la cyberrésilience des infrastructures énergétiques critiques.',
      ar: 'يعزز التعاون الإقليمي المرونة السيبرانية للبنى التحتية الحيوية في قطاع الطاقة.',
    },
  },
  {
    id: 'gl-tec-4',
    domain: 'tech',
    es: 'Interoperabilidad transfronteriza',
    fr: 'Interopérabilité transfrontalière',
    ar: 'قابلية التشغيل البيني عبر الحدود',
    registerNote: {
      es: 'Permite validar certificados digitales, pagos o historiales entre administraciones de distintos países.',
      fr: 'Permet l’échange sécurisé de données et de certificats entre administrations nationales.',
      ar: 'تتيح للأنظمة الرقمية في مختلف الدول تبادل الشهادات والبيانات بسلاسة وأمان.',
    },
    contextSentence: {
      es: 'Los estándares abiertos aseguran la interoperabilidad transfronteriza de la identidad digital.',
      fr: 'Les normes ouvertes assurent l’interopérabilité transfrontalière de l’identité numérique.',
      ar: 'تضمن المعايير المفتوحة قابلية التشغيل البيني عبر الحدود للهوية الرقمية.',
    },
  },
  {
    id: 'gl-tec-5',
    domain: 'tech',
    es: 'Evaluación de impacto sobre derechos fundamentales',
    fr: 'Analyse d’impact sur les droits fondamentaux',
    ar: 'تقييم الأثر على الحقوق الأساسية',
    registerNote: {
      es: 'Documento previo exigido antes de desplegar sistemas automatizados en servicios públicos.',
      fr: 'Évaluation obligatoire avant le déploiement d’un système d’IA dans les services publics.',
      ar: 'دراسة مسبقة إلزامية قبل اعتماد أنظمة الذكاء الاصطناعي في المرافق العامة.',
    },
    contextSentence: {
      es: 'Toda autoridad pública realizará una evaluación de impacto sobre derechos fundamentales.',
      fr: 'Toute autorité publique réalisera une analyse d’impact sur les droits fondamentaux.',
      ar: 'تُجري كل سلطة عامة تقييماً للأثر على الحقوق الأساسية قبل تشغيل النظام.',
    },
  },
];
