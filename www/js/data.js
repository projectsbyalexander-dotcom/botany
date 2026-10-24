/*
  База данных приложения «Травник».
  Все тексты написаны своими словами по указанным источникам; цитаты из книг не копируются.
  Страны: pl — Польша, de — Германия, sk — Словакия, by — Беларусь.
  Статус в стране: "w" — дикорастущее, "c" — только в культуре.
  Уровень доказательности (ev):
    "ema"   — официальная монография EMA/HMPC (ЕС),
    "text"  — учебная фармакогнозия,
    "ethno" — народное применение по полевым исследованиям (не доказано клинически).
*/
window.DATA = (function () {
  const COUNTRIES = {
    pl: { ru: "Польша", flag: "🇵🇱", inat: "Poland" },
    de: { ru: "Германия", flag: "🇩🇪", inat: "Germany" },
    sk: { ru: "Словакия", flag: "🇸🇰", inat: "Slovakia" },
    by: { ru: "Беларусь", flag: "🇧🇾", inat: "Belarus" },
  };

  const SOURCES = {
    ema: {
      short: "EMA/HMPC",
      full: "European Medicines Agency, Committee on Herbal Medicinal Products (HMPC). European Union herbal monographs.",
      url: "https://www.ema.europa.eu/en/human-regulatory-overview/herbal-medicinal-products",
      kind: "Официальная фармакогнозия ЕС",
    },
    karpuk: {
      short: "Карпук, 2011",
      full: "Карпук В. В. Фармакогнозия: учеб. пособие для студентов высш. учеб. заведений по биол. специальностям. Минск: БГУ, 2011. 340 с.",
      url: "https://elib.bsu.by/",
      kind: "Учебник (Беларусь)",
      note: "Страницы указаны по печатному изданию.",
    },
    by2017: {
      short: "Sõukand et al., 2017",
      full: "Sõukand R., Hrynevich Y., Vasilyeva I., Prakofjewa J., et al., Kalle R. Multi-functionality of the few: current and past uses of wild plants for food and healing in Liubań region, Belarus. Journal of Ethnobiology and Ethnomedicine. 2017;13:10.",
      url: "https://doi.org/10.1186/s13002-017-0139-x",
      kind: "Этноботаника (Беларусь, полевое исследование)",
    },
    pl2017: {
      short: "Kujawska et al., 2017",
      full: "Kujawska M., Klepacki P., Łuczaj Ł. Fischer's Plants in folk beliefs and customs: a previously unknown contribution to the ethnobotany of the Polish-Lithuanian-Belarusian borderland. Journal of Ethnobiology and Ethnomedicine. 2017;13:20.",
      url: "https://doi.org/10.1186/s13002-017-0149-8",
      kind: "Этноботаника (Польша, пограничье)",
    },
    pieroni2010: {
      short: "Pardo-de-Santayana, Pieroni, Puri, 2010",
      full: "Pardo-de-Santayana M., Pieroni A., Puri R. K. (eds.) Ethnobotany in the New Europe: People, Health and Wild Plant Resources. New York; Oxford: Berghahn Books, 2010.",
      url: "https://www.berghahnbooks.com/title/Pardo-de-SantayanaEthnobotany",
      kind: "Европейская этноботаника (обзор)",
      note: "Книга платная; глав о Польше, Германии, Словакии и Беларуси в ней нет, используется как общий источник.",
    },
    gf11: {
      short: "ГФ XI",
      full: "Государственная фармакопея СССР. 11-е изд. Вып. 2. Общие методы анализа. Лекарственное растительное сырьё. М.: Медицина, 1990. Статья «Настои и отвары».",
      url: "",
      kind: "Фармакопея (технология настоев и отваров)",
      note: "Номер страницы нужно уточнить по изданию.",
    },
    inat: {
      short: "iNaturalist через GBIF",
      full: "iNaturalist Research-grade Observations. iNaturalist.org, набор данных в GBIF (doi:10.15468/ab3s5x). Число наблюдений и фотографии со ссылками на авторов.",
      url: "https://www.gbif.org/dataset/50c9509d-22c7-4a22-a47d-8c48425ef4a7",
      kind: "Наблюдения в природе",
    },
    icd10: {
      short: "МКБ-10",
      full: "Международная статистическая классификация болезней и проблем, связанных со здоровьем, 10-й пересмотр (МКБ-10). ВОЗ.",
      url: "https://icd.who.int/browse10/2019/en",
      kind: "Классификация болезней",
    },
    powo: {
      short: "POWO",
      full: "Plants of the World Online. Royal Botanic Gardens, Kew. Распространение видов.",
      url: "https://powo.science.kew.org/",
      kind: "Ботаническая база (распространение)",
    },
  };

  // Дерево болезней: система → болезнь → подтип
  const DISEASES = [
    { id: "gi", ru: "Пищеварительная система", icon: "🍲", children: [
      { id: "dyspepsia", ru: "Функциональная диспепсия", children: [
        { id: "bloating", ru: "Вздутие и метеоризм" },
        { id: "gi_spasm", ru: "Лёгкие спазмы кишечника" },
      ]},
      { id: "gastritis", ru: "Гастрит", children: [
        { id: "gastritis_noninf", ru: "Небактериальный гастрит: симптоматический дискомфорт", note: "Гастрит, вызванный Helicobacter pylori, лечит врач антибиотиками; травы здесь только облегчают симптомы." },
      ]},
      { id: "diarrhea", ru: "Острая неспецифическая диарея" },
      { id: "constipation", ru: "Запор" },
      { id: "appetite", ru: "Снижение аппетита" },
      { id: "bile", ru: "Нарушение желчеоттока (лёгкое)" },
    ]},
    { id: "resp", ru: "Дыхательная система", icon: "🌬️", children: [
      { id: "cold", ru: "Простуда (ОРВИ)" },
      { id: "cough", ru: "Кашель", children: [
        { id: "cough_dry", ru: "Сухой раздражающий кашель" },
        { id: "cough_wet", ru: "Влажный (продуктивный) кашель" },
      ]},
      { id: "throat", ru: "Воспаление рта и горла" },
    ]},
    { id: "uro", ru: "Мочевыделительная система", icon: "💧", children: [
      { id: "cystitis", ru: "Цистит: лёгкие повторяющиеся симптомы" },
      { id: "flush", ru: "Промывание мочевых путей при лёгких жалобах" },
    ]},
    { id: "nerv", ru: "Нервная система", icon: "🌙", children: [
      { id: "stress", ru: "Нервное напряжение, стресс" },
      { id: "sleep", ru: "Нарушения сна" },
      { id: "mood", ru: "Подавленное настроение", children: [
        { id: "depression_mild", ru: "Лёгкий и умеренный депрессивный эпизод" },
      ]},
    ]},
    { id: "cardio", ru: "Сердце и сосуды", icon: "❤️", children: [
      { id: "palpitation", ru: "Нервные сердечные жалобы (сердцебиение)" },
      { id: "hypertension", ru: "Повышенное давление", note: "Повышенное давление лечит врач; народные средства лечение не заменяют. Официальных монографий EMA для этого показания среди растений базы нет." },
    ]},
    { id: "skin", ru: "Кожа и раны", icon: "🩹", children: [
      { id: "wounds", ru: "Мелкие поверхностные раны" },
      { id: "skin_infl", ru: "Лёгкое воспаление кожи" },
      { id: "bleeding", ru: "Мелкие кровотечения" },
      { id: "sweating", ru: "Повышенная потливость" },
    ]},
    { id: "msk", ru: "Суставы и мышцы", icon: "🦴", children: [
      { id: "joint_pain", ru: "Лёгкие боли в суставах" },
    ]},
    { id: "women", ru: "Женское здоровье", icon: "🌸", children: [
      { id: "menstrual", ru: "Менструальные спазмы" },
    ]},
  ];


  // Латинские (медицинские) названия разделов и болезней
  const DISEASE_LAT = {
    gi: "Systema digestorium", dyspepsia: "Dyspepsia functionalis", bloating: "Meteorismus", gi_spasm: "Spasmus intestinalis",
    gastritis: "Gastritis", gastritis_noninf: "Gastritis non-infectiosa", diarrhea: "Diarrhoea acuta", constipation: "Obstipatio",
    appetite: "Inappetentia", bile: "Dyspepsia biliaris",
    resp: "Systema respiratorium", cold: "Infectio respiratoria acuta", cough: "Tussis", cough_dry: "Tussis sicca", cough_wet: "Tussis productiva",
    throat: "Stomatitis et pharyngitis",
    uro: "Systema urinarium", cystitis: "Cystitis", flush: "Irrigatio tractus urinarii",
    nerv: "Systema nervosum", stress: "Tensio nervosa", sleep: "Insomnia", mood: "Affectus depressivus", depression_mild: "Episodium depressivum leve et moderatum",
    cardio: "Systema cardiovasculare", palpitation: "Palpitatio cordis", hypertension: "Hypertensio arterialis",
    skin: "Cutis", wounds: "Vulnera superficialia", skin_infl: "Dermatitis levis", bleeding: "Haemorrhagia minor", sweating: "Hyperhidrosis",
    msk: "Systema musculoskeletale", joint_pain: "Arthralgia", women: "Gynaecologia", menstrual: "Dysmenorrhoea",
  };


  // Коды МКБ-10 (ВОЗ) и синонимы для поиска
  const DISEASE_ICD = {
    gi: "K00–K93", dyspepsia: "K30", bloating: "R14", gi_spasm: "K59.9", gastritis: "K29", gastritis_noninf: "K29 (кроме связанного с H. pylori)",
    diarrhea: "A09, K52.9", constipation: "K59.0", appetite: "R63.0", bile: "K82.8",
    resp: "J00–J99", cold: "J00", cough: "R05", cough_dry: "R05", cough_wet: "R05", throat: "K12, J02.9",
    uro: "N00–N99", cystitis: "N30",
    nerv: "F00–F99, G00–G99", stress: "Z73.3", sleep: "F51.0", depression_mild: "F32.0–F32.1",
    cardio: "I00–I99", palpitation: "R00.2", hypertension: "I10",
    skin: "L00–L99", wounds: "T14.1", skin_infl: "L30.9", bleeding: "R58", sweating: "R61",
    msk: "M00–M99", joint_pain: "M25.5", women: "N70–N98", menstrual: "N94.6",
  };
  const DISEASE_SYN = {
    bloating: "вздутие газы метеоризм флатуленция", gi_spasm: "колики спазмы кишечника боль в животе", dyspepsia: "несварение тяжесть в желудке",
    gastritis: "воспаление желудка", diarrhea: "понос расстройство кишечника", constipation: "запор обстипация", appetite: "нет аппетита анорексия",
    bile: "желчь желчегонное", cold: "орви простуда насморк грипп", cough: "кашель бронхит", cough_dry: "сухой кашель", cough_wet: "мокрота отхаркивающее",
    throat: "горло ангина стоматит рот десны полоскание", cystitis: "мочевой пузырь мочеиспускание", flush: "мочегонное диуретик почки",
    stress: "нервы тревога напряжение успокоительное", sleep: "бессонница сон инсомния", depression_mild: "депрессия настроение",
    palpitation: "сердцебиение сердце", hypertension: "давление гипертония", wounds: "рана порез ссадина заживление",
    skin_infl: "кожа дерматит ожог солнечный", bleeding: "кровотечение кровоостанавливающее гемостатик", sweating: "потливость пот",
    joint_pain: "суставы артралгия ревматизм", menstrual: "менструация месячные боль дисменорея",
  };

  const P = (o) => o;
  const ALL = { pl: "w", de: "w", sk: "w", by: "w" };
  const CULT = { pl: "c", de: "c", sk: "c", by: "c" };
  const ema = (drug, loc) => ({ id: "ema", loc: loc || drug, search: drug });
  const karpuk = (loc) => ({ id: "karpuk", loc: loc || "раздел о виде, стр. уточнить" });

  const PLANTS = [
    P({ id: "chamomile", ru: "Ромашка аптечная", lat: "Matricaria chamomilla", fam: "Астровые (Asteraceae)",
      drug: { ru: "Цветки ромашки", lat: "Matricariae flos" }, part: "flower",
      countries: ALL, art: { kind: "flower", petal: "#f6f1e1", center: "#e7b42c", petals: 14 },
      compounds: "Эфирное масло с хамазуленом и бисабололом, флавоноиды (апигенин), слизи.",
      uses: [
        { c: "bloating", ev: "ema", t: "Облегчает вздутие и лёгкие спазмы при нарушениях пищеварения (традиционное применение).", s: [ema("Matricariae flos")] },
        { c: "gi_spasm", ev: "ema", t: "Мягкое спазмолитическое действие на кишечник.", s: [ema("Matricariae flos")] },
        { c: "gastritis_noninf", ev: "text", t: "Настой применяют при воспалительных процессах слизистой желудка.", s: [karpuk("с. 141")] },
        { c: "cold", ev: "ema", t: "Паровые ингаляции для облегчения симптомов простуды.", s: [ema("Matricariae flos")] },
        { c: "throat", ev: "ema", t: "Полоскания при мелких язвочках и воспалении во рту и горле.", s: [ema("Matricariae flos")] },
        { c: "skin_infl", ev: "ema", t: "Наружно при лёгком воспалении кожи.", s: [ema("Matricariae flos")] },
      ],
      prep: "infusion",
      cautions: [{ t: "Возможна аллергия у людей, чувствительных к растениям семейства астровых (амброзия, полынь и др.).", s: [ema("Matricariae flos")] }],
      ethnoNote: "В книге Pieroni и соавторов есть отдельная глава о ромашках в Испании и путанице их народных названий.", ethnoSrc: [{ id: "pieroni2010", loc: "гл. 14 (Pardo-de-Santayana, Morales)" }],
    }),
    P({ id: "peppermint", ru: "Мята перечная", lat: "Mentha × piperita", fam: "Яснотковые (Lamiaceae)",
      drug: { ru: "Листья мяты перечной", lat: "Menthae piperitae folium" }, part: "leaf",
      countries: CULT, art: { kind: "leaf", leaf: "#5f8f4e", shape: "ovate", pairs: 3 },
      compounds: "Эфирное масло (ментол, ментон), флавоноиды, дубильные вещества.",
      uses: [
        { c: "bloating", ev: "ema", t: "Облегчение диспепсии и метеоризма (традиционное применение).", s: [ema("Menthae piperitae folium")] },
      ],
      prep: "infusion",
      cautions: [
        { t: "Может усиливать изжогу при гастроэзофагеальном рефлюксе.", s: [ema("Menthae piperitae folium")] },
        { t: "Гибрид, в дикой природе почти не встречается: выращивается во всех четырёх странах.", s: [{ id: "powo" }] },
      ],
    }),
    P({ id: "sage", ru: "Шалфей лекарственный", lat: "Salvia officinalis", fam: "Яснотковые (Lamiaceae)",
      drug: { ru: "Листья шалфея", lat: "Salviae officinalis folium" }, part: "leaf",
      countries: CULT, art: { kind: "leaf", leaf: "#8aa07a", shape: "lanceolate", pairs: 3 },
      compounds: "Эфирное масло (туйон, цинеол, камфора), дубильные вещества, розмариновая кислота.",
      uses: [
        { c: "throat", ev: "ema", t: "Полоскания при воспалении слизистой рта и горла.", s: [ema("Salviae officinalis folium")] },
        { c: "sweating", ev: "ema", t: "Уменьшает повышенную потливость (приём внутрь).", s: [ema("Salviae officinalis folium")] },
        { c: "bloating", ev: "ema", t: "Лёгкие диспепсические жалобы: изжога, вздутие.", s: [ema("Salviae officinalis folium")] },
        { c: "skin_infl", ev: "ema", t: "Наружно при лёгком воспалении кожи.", s: [ema("Salviae officinalis folium")] },
      ],
      prep: "infusion",
      cautions: [{ t: "Содержит туйон: не применять при беременности и кормлении, не принимать длительно внутрь.", s: [ema("Salviae officinalis folium")] }],
    }),
    P({ id: "thyme_wild", ru: "Чабрец (тимьян ползучий)", lat: "Thymus serpyllum", fam: "Яснотковые (Lamiaceae)",
      drug: { ru: "Трава чабреца", lat: "Serpylli herba" }, part: "herb",
      countries: ALL, art: { kind: "flower", petal: "#b77ab8", center: "#7d4b80", petals: 6, small: true },
      compounds: "Эфирное масло (тимол, карвакрол), флавоноиды, дубильные вещества.",
      uses: [
        { c: "cough_wet", ev: "ethno", t: "В Любанском районе Беларуси чай из травы чабреца пьют от кашля.", s: [{ id: "by2017", loc: "Thymus serpyllum" }] },
      ],
      prep: "infusion",
      cautions: [{ t: "Тимол малотоксичен, но может снижать функцию щитовидной железы. Монографии EMA на траву чабреца нет, поэтому детям препараты чабреца дают только после консультации врача.", s: [karpuk("с. 150")] }],
    }),
    P({ id: "valerian", ru: "Валериана лекарственная", lat: "Valeriana officinalis", fam: "Жимолостные (Caprifoliaceae)",
      drug: { ru: "Корневища с корнями валерианы", lat: "Valerianae radix" }, part: "root",
      countries: ALL, art: { kind: "root", root: "#a37b52", top: "#e9cfd8" },
      compounds: "Эфирное масло (борнилизовалерианат), валепотриаты, валереновые кислоты.",
      uses: [
        { c: "sleep", ev: "ema", t: "Облегчение лёгких нарушений сна (хорошо изученное применение экстрактов).", s: [ema("Valerianae radix")] },
        { c: "stress", ev: "ema", t: "Облегчение лёгкого нервного напряжения.", s: [ema("Valerianae radix")] },
      ],
      prep: "valerian",
      cautions: [{ t: "Может снижать внимание: осторожно за рулём. Не рекомендуется детям до 12 лет.", s: [ema("Valerianae radix")] }],
    }),
    P({ id: "stjohns", ru: "Зверобой продырявленный", lat: "Hypericum perforatum", fam: "Зверобойные (Hypericaceae)",
      drug: { ru: "Трава зверобоя", lat: "Hyperici herba" }, part: "herb",
      countries: ALL, art: { kind: "flower", petal: "#f2c230", center: "#d98b1c", petals: 5 },
      compounds: "Нафтодиантроны (гиперицин), флороглюцины (гиперфорин), флавоноиды.",
      uses: [
        { c: "depression_mild", ev: "ema", t: "Стандартизованные сухие экстракты: лёгкие и умеренные депрессивные эпизоды (хорошо изученное применение, только по назначению врача).", s: [ema("Hyperici herba")] },
        { c: "wounds", ev: "ema", t: "Наружно (масляный экстракт) при мелких ранах и лёгком воспалении кожи.", s: [ema("Hyperici herba")] },
        { c: "cold", ev: "ethno", t: "В Беларуси чай из зверобоя пьют от простуды, болей в желудке и как «средство от всех болезней».", s: [{ id: "by2017", loc: "Hypericum perforatum" }] },
      ],
      prep: "infusion",
      cautions: [
        { t: "Опасные взаимодействия: снижает действие многих лекарств (в том числе гормональных контрацептивов, антикоагулянтов, препаратов от ВИЧ).", s: [ema("Hyperici herba")] },
        { t: "Повышает чувствительность кожи к солнцу.", s: [ema("Hyperici herba")] },
      ],
    }),
    P({ id: "linden", ru: "Липа сердцевидная", lat: "Tilia cordata", fam: "Мальвовые (Malvaceae)",
      drug: { ru: "Цветки липы", lat: "Tiliae flos" }, part: "flower",
      countries: ALL, art: { kind: "flower", petal: "#efe39a", center: "#c7b347", petals: 5, bract: true },
      compounds: "Флавоноиды, слизи, эфирное масло, дубильные вещества.",
      uses: [
        { c: "cold", ev: "ema", t: "Облегчение симптомов простуды (традиционное применение).", s: [ema("Tiliae flos")] },
        { c: "stress", ev: "ema", t: "Облегчение лёгкого психического напряжения.", s: [ema("Tiliae flos")] },
        { c: "throat", ev: "ethno", t: "В Беларуси липовый цвет используют при простуде, кашле и боли в горле.", s: [{ id: "by2017", loc: "Tilia cordata" }] },
      ],
      prep: "infusion",
      cautions: [],
      ethnoNote: "В польско-литовско-белорусском пограничье цветки липы заваривали как чай.", ethnoSrc: [{ id: "pl2017", loc: "Tilia" }],
    }),
    P({ id: "elder", ru: "Бузина чёрная", lat: "Sambucus nigra", fam: "Адоксовые (Adoxaceae)",
      drug: { ru: "Цветки бузины", lat: "Sambuci flos" }, part: "flower",
      countries: ALL, art: { kind: "umbel", petal: "#f4efdc", center: "#e8d98a" },
      compounds: "Флавоноиды (рутин), фенолкарбоновые кислоты, эфирное масло.",
      uses: [
        { c: "cold", ev: "ema", t: "Облегчение начальных симптомов простуды (традиционное применение).", s: [ema("Sambuci flos")] },
      ],
      prep: "infusion",
      cautions: [],
    }),
    P({ id: "nettle", ru: "Крапива двудомная", lat: "Urtica dioica", fam: "Крапивные (Urticaceae)",
      drug: { ru: "Листья крапивы", lat: "Urticae folium" }, part: "leaf",
      countries: ALL, art: { kind: "leaf", leaf: "#4c7a3d", shape: "serrate", pairs: 4 },
      compounds: "Витамины K и C, хлорофилл, флавоноиды, минеральные соли.",
      uses: [
        { c: "flush", ev: "ema", t: "Увеличивает выделение мочи для промывания мочевых путей при лёгких жалобах.", s: [ema("Urticae folium")] },
        { c: "joint_pain", ev: "ema", t: "Вспомогательно при лёгких болях в суставах.", s: [ema("Urticae folium")] },
        { c: "bleeding", ev: "text", t: "Белорусский учебник относит листья крапивы к кровоостанавливающему сырью из-за витамина K. Европейское агентство такое показание не приняло: витамина K в суточной дозе слишком мало для заметного действия.", s: [karpuk("с. 111"), { id: "ema_ar_nettle", loc: "с. 10, 27" }] },
      ],
      prep: "infusion",
      cautions: [{ t: "Не применять для промывания при отёках из-за болезней сердца или почек.", s: [ema("Urticae folium")] }],
      ethnoNote: "В Беларуси отвар крапивы используют для мытья волос.", ethnoSrc: [{ id: "by2017", loc: "Urtica dioica" }],
    }),
    P({ id: "plantain_lanc", ru: "Подорожник ланцетный", lat: "Plantago lanceolata", fam: "Подорожниковые (Plantaginaceae)",
      drug: { ru: "Листья подорожника ланцетного", lat: "Plantaginis lanceolatae folium" }, part: "leaf",
      countries: ALL, art: { kind: "leaf", leaf: "#6b8f4a", shape: "rosette", pairs: 5 },
      compounds: "Иридоиды (аукубин), слизи, дубильные вещества.",
      uses: [
        { c: "cough_dry", ev: "ema", t: "Обволакивающее средство при раздражении горла и связанном с ним сухом кашле.", s: [ema("Plantaginis lanceolatae folium")] },
        { c: "throat", ev: "ema", t: "Смягчает раздражение слизистой рта и глотки.", s: [ema("Plantaginis lanceolatae folium")] },
      ],
      prep: "infusion",
      cautions: [],
    }),
    P({ id: "plantain_major", ru: "Подорожник большой", lat: "Plantago major", fam: "Подорожниковые (Plantaginaceae)",
      drug: { ru: "Листья подорожника большого", lat: "Plantaginis majoris folium" }, part: "leaf",
      countries: ALL, art: { kind: "leaf", leaf: "#58803f", shape: "rosette_round", pairs: 5 },
      compounds: "Иридоиды (аукубин), слизи, флавоноиды.",
      uses: [
        { c: "wounds", ev: "ethno", t: "В Беларуси свежие листья прикладывают к ранам, порезам, ожогам и нарывам.", s: [{ id: "by2017", loc: "Plantago major" }] },
        { c: "gastritis_noninf", ev: "text", t: "Препараты из листьев подорожника большого применяют при гастрите с нормальной и пониженной кислотностью.", s: [karpuk("с. 91")] },
      ],
      prep: "infusion",
      cautions: [],
      ethnoNote: "В польско-литовско-белорусском пограничье подорожник был одним из самых разносторонне используемых лекарственных растений.", ethnoSrc: [{ id: "pl2017", loc: "Plantago major" }],
    }),
    P({ id: "yarrow", ru: "Тысячелистник обыкновенный", lat: "Achillea millefolium", fam: "Астровые (Asteraceae)",
      drug: { ru: "Трава тысячелистника", lat: "Millefolii herba" }, part: "herb",
      countries: ALL, art: { kind: "umbel", petal: "#f3ece6", center: "#d9c9a8", feathery: true },
      compounds: "Эфирное масло (с хамазуленом), горечи (сесквитерпеновые лактоны), флавоноиды.",
      uses: [
        { c: "appetite", ev: "ema", t: "При временной потере аппетита (традиционное применение).", s: [ema("Millefolii herba")] },
        { c: "gi_spasm", ev: "ema", t: "При лёгких спазмах ЖКТ и вздутии.", s: [ema("Millefolii herba")] },
        { c: "menstrual", ev: "ema", t: "При лёгких спазмах во время менструации.", s: [ema("Millefolii herba")] },
        { c: "wounds", ev: "ema", t: "Наружно при мелких поверхностных ранах.", s: [ema("Millefolii herba")] },
        { c: "bleeding", ev: "ethno", t: "В Беларуси несколько информантов называли его кровоостанавливающим средством.", s: [{ id: "by2017", loc: "Achillea millefolium" }] },
      ],
      prep: "infusion",
      cautions: [{ t: "Аллергия на астровые.", s: [ema("Millefolii herba")] }],
    }),
    P({ id: "dandelion", ru: "Одуванчик лекарственный", lat: "Taraxacum officinale", fam: "Астровые (Asteraceae)",
      drug: { ru: "Корень с травой одуванчика", lat: "Taraxaci radix cum herba" }, part: "root",
      countries: ALL, art: { kind: "flower", petal: "#f4c21c", center: "#e09b12", petals: 22, thin: true },
      compounds: "Горечи (тараксацин), инулин, тритерпены, минеральные соли.",
      uses: [
        { c: "bloating", ev: "ema", t: "При лёгких нарушениях пищеварения (чувство переполнения, метеоризм, медленное пищеварение) вместе с временной потерей аппетита (традиционное применение).", s: [ema("Taraxaci radix cum herba")] },
        { c: "appetite", ev: "ema", t: "При временной потере аппетита.", s: [ema("Taraxaci radix cum herba")] },
        { c: "flush", ev: "ema", t: "Для промывания мочевых путей при лёгких жалобах.", s: [ema("Taraxaci radix cum herba")] },
        { c: "joint_pain", ev: "ethno", t: "В Беларуси одуванчик разными способами используют при жалобах на опорно-двигательный аппарат.", s: [{ id: "by2017", loc: "Taraxacum officinale" }] },
      ],
      prep: "decoction",
      cautions: [{ t: "Нельзя при закупорке желчных путей, желчнокаменной болезни и непроходимости кишечника.", s: [ema("Taraxaci radix cum herba")] }],
    }),
    P({ id: "birch", ru: "Берёза повислая", lat: "Betula pendula", fam: "Берёзовые (Betulaceae)",
      drug: { ru: "Листья берёзы", lat: "Betulae folium" }, part: "leaf",
      countries: ALL, art: { kind: "leaf", leaf: "#7aa04a", shape: "birch", pairs: 3 },
      compounds: "Флавоноиды (гиперозид), тритерпены, эфирное масло (в почках).",
      uses: [
        { c: "flush", ev: "ema", t: "Листья: увеличение мочеотделения для промывания мочевых путей при лёгких жалобах.", s: [ema("Betulae folium")] },
        { c: "flush", ev: "ethno", t: "В Беларуси настойку берёзовых почек используют при болезнях почек.", s: [{ id: "by2017", loc: "Betula" }] },
        { c: "diarrhea", ev: "ethno", t: "Там же: настойка почек при диарее и болях в желудке, для промывания ран.", s: [{ id: "by2017", loc: "Betula" }] },
      ],
      prep: "infusion",
      cautions: [{ t: "Не применять при отёках из-за сердечной или почечной недостаточности.", s: [ema("Betulae folium")] }],
    }),
    P({ id: "bilberry", ru: "Черника обыкновенная", lat: "Vaccinium myrtillus", fam: "Вересковые (Ericaceae)",
      drug: { ru: "Плоды черники сушёные", lat: "Myrtilli fructus siccus" }, part: "berry",
      countries: ALL, art: { kind: "berry", berry: "#2e3a6b", leaf: "#6a8f4c" },
      compounds: "Дубильные вещества, антоцианы, органические кислоты, пектин.",
      uses: [
        { c: "diarrhea", ev: "ema", t: "Сушёные плоды при лёгкой диарее (традиционное применение).", s: [ema("Myrtilli fructus siccus")] },
        { c: "throat", ev: "ema", t: "Полоскания при лёгком воспалении слизистой рта.", s: [ema("Myrtilli fructus siccus")] },
        { c: "diarrhea", ev: "ethno", t: "В Беларуси ягоды черники используют от диареи и считают полезными для зрения.", s: [{ id: "by2017", loc: "Vaccinium myrtillus" }] },
      ],
      prep: "decoction",
      cautions: [{ t: "Плоды черники не применяют при запорах.", s: [karpuk("с. 286")] }],
    }),
    P({ id: "oak", ru: "Дуб черешчатый", lat: "Quercus robur", fam: "Буковые (Fagaceae)",
      drug: { ru: "Кора дуба", lat: "Quercus cortex" }, part: "bark",
      countries: ALL, art: { kind: "bark", bark: "#7a5a3e", leaf: "#5c7f3a" },
      compounds: "Дубильные вещества (10–20 %), галловая и эллаговая кислоты.",
      uses: [
        { c: "diarrhea", ev: "ema", t: "Симптоматическое лечение острой диареи (традиционное применение).", s: [ema("Quercus cortex")] },
        { c: "throat", ev: "ema", t: "Полоскания при лёгком воспалении слизистой рта и горла.", s: [ema("Quercus cortex")] },
        { c: "skin_infl", ev: "ema", t: "Наружно при лёгком воспалении кожи.", s: [ema("Quercus cortex")] },
        { c: "diarrhea", ev: "ethno", t: "В Беларуси отвар коры дуба пьют от диареи.", s: [{ id: "by2017", loc: "Quercus robur" }] },
      ],
      prep: "decoction",
      cautions: [{ t: "Внутрь не дольше нескольких дней; при диарее дольше 3–4 дней нужен врач.", s: [ema("Quercus cortex")] }],
    }),
    P({ id: "tormentil", ru: "Лапчатка прямостоячая (калган)", lat: "Potentilla erecta", fam: "Розовые (Rosaceae)",
      drug: { ru: "Корневища лапчатки", lat: "Tormentillae rhizoma" }, part: "root",
      countries: ALL, art: { kind: "flower", petal: "#f0cf35", center: "#d2a21d", petals: 4 },
      compounds: "Дубильные вещества (до 20 % и больше), флавоноиды.",
      uses: [
        { c: "diarrhea", ev: "ema", t: "При лёгкой диарее (традиционное применение).", s: [ema("Tormentillae rhizoma")] },
        { c: "throat", ev: "ema", t: "Полоскания при лёгком воспалении слизистой рта.", s: [ema("Tormentillae rhizoma")] },
        { c: "gastritis_noninf", ev: "ethno", t: "В Беларуси настойку корня принимают от болей в желудке.", s: [{ id: "by2017", loc: "Potentilla erecta" }] },
      ],
      prep: "decoction",
      cautions: [],
    }),
    P({ id: "wormwood", ru: "Полынь горькая", lat: "Artemisia absinthium", fam: "Астровые (Asteraceae)",
      drug: { ru: "Трава полыни горькой", lat: "Absinthii herba" }, part: "herb",
      countries: ALL, art: { kind: "leaf", leaf: "#a3ad98", shape: "feathery", pairs: 4 },
      compounds: "Горечи (абсинтин), эфирное масло (туйон).",
      uses: [
        { c: "appetite", ev: "ema", t: "При временной потере аппетита (традиционное применение).", s: [ema("Absinthii herba")] },
        { c: "bloating", ev: "ema", t: "При лёгкой диспепсии.", s: [ema("Absinthii herba")] },
        { c: "diarrhea", ev: "ethno", t: "В Беларуси чай или отвар полыни пьют от диареи.", s: [{ id: "by2017", loc: "Artemisia absinthium" }] },
      ],
      prep: "infusion",
      cautions: [{ t: "Содержит туйон: не дольше 3–4 недель, не при беременности, кормлении и детям.", s: [ema("Absinthii herba")] }],
      ethnoNote: "В польско-литовско-белорусском пограничье полынь была одним из самых разносторонних лекарственных растений.", ethnoSrc: [{ id: "pl2017", loc: "Artemisia absinthium" }],
    }),
    P({ id: "horsetail", ru: "Хвощ полевой", lat: "Equisetum arvense", fam: "Хвощовые (Equisetaceae)",
      drug: { ru: "Трава хвоща полевого", lat: "Equiseti herba" }, part: "herb",
      countries: ALL, art: { kind: "horsetail", leaf: "#6c9a52" },
      compounds: "Кремниевая кислота, флавоноиды, минеральные соли.",
      uses: [
        { c: "flush", ev: "ema", t: "Промывание мочевых путей при лёгких жалобах (традиционное применение).", s: [ema("Equiseti herba")] },
        { c: "wounds", ev: "ema", t: "Наружно при мелких ранах.", s: [ema("Equiseti herba")] },
      ],
      prep: "decoction",
      cautions: [{ t: "При сборе к сырью могут попадать другие виды хвощей, например луговой и лесной; их нужно уметь отличать от хвоща полевого.", s: [karpuk("с. 217")] }],
    }),
    P({ id: "bearberry", ru: "Толокнянка обыкновенная", lat: "Arctostaphylos uva-ursi", fam: "Вересковые (Ericaceae)",
      drug: { ru: "Листья толокнянки", lat: "Uvae ursi folium" }, part: "leaf",
      countries: ALL, art: { kind: "berry", berry: "#c0392b", leaf: "#3f6b3a" },
      compounds: "Фенологликозиды (арбутин), дубильные вещества, флавоноиды.",
      uses: [
        { c: "cystitis", ev: "ema", t: "При лёгких повторяющихся симптомах инфекции нижних мочевых путей (жжение, частое мочеиспускание), после исключения серьёзных болезней врачом.", s: [ema("Uvae ursi folium")] },
      ],
      prep: "leaf_decoction",
      cautions: [{ t: "Источники расходятся в способе приготовления: белорусский учебник описывает отвар, а монография EMA допускает только настой кипятком или холодный мацерат, потому что отвар извлекает больше дубильных веществ, раздражающих желудок.", s: [karpuk("с. 174"), { id: "ema_ar_bearberry", loc: "с. 15" }] }, { t: "Не дольше недели, не детям и подросткам до 18 лет, не при беременности и кормлении.", s: [ema("Uvae ursi folium")] }],
    }),
    P({ id: "lingonberry", ru: "Брусника", lat: "Vaccinium vitis-idaea", fam: "Вересковые (Ericaceae)",
      drug: { ru: "Листья брусники", lat: "Vitis-idaeae folium" }, part: "leaf",
      countries: ALL, art: { kind: "berry", berry: "#b3242f", leaf: "#2f5e36" },
      compounds: "Арбутин, дубильные вещества, флавоноиды.",
      uses: [
        { c: "flush", ev: "text", t: "Листья брусники в восточноевропейской фармакогнозии используют как мочегонное и антисептическое средство мочевых путей (арбутин).", s: [karpuk("с. 172–173")] },
        { c: "cystitis", ev: "ethno", t: "В Беларуси листья брусники применяют при болезнях почек и мочевых путей.", s: [{ id: "by2017", loc: "Vaccinium vitis-idaea" }] },
      ],
      prep: "leaf_decoction",
      cautions: [],
    }),
    P({ id: "guelder", ru: "Калина обыкновенная", lat: "Viburnum opulus", fam: "Адоксовые (Adoxaceae)",
      drug: { ru: "Кора и плоды калины", lat: "Viburni opuli cortex / fructus" }, part: "berry",
      countries: ALL, art: { kind: "berry", berry: "#d6312b", leaf: "#5b8a3f", cluster: true },
      compounds: "Кора: дубильные вещества, иридоиды. Плоды: органические кислоты, витамин C.",
      uses: [
        { c: "bleeding", ev: "text", t: "Кору калины в учебной фармакогнозии относят к кровоостанавливающему сырью.", s: [karpuk("с. 114")] },
        { c: "hypertension", ev: "ethno", t: "В Беларуси настойку плодов используют при повышенном давлении (лечение у врача это не заменяет).", s: [{ id: "by2017", loc: "Viburnum opulus" }] },
        { c: "cold", ev: "ethno", t: "Там же: свежие ягоды при простуде.", s: [{ id: "by2017", loc: "Viburnum opulus" }] },
      ],
      prep: "decoction",
      cautions: [],
    }),
    P({ id: "hawthorn", ru: "Боярышник", lat: "Crataegus monogyna", fam: "Розовые (Rosaceae)",
      drug: { ru: "Листья с цветками боярышника", lat: "Crataegi folium cum flore" }, part: "flower",
      countries: ALL, art: { kind: "umbel", petal: "#fbf3f0", center: "#c94f6d" },
      compounds: "Флавоноиды (витексин, гиперозид), олигомерные процианидины.",
      uses: [
        { c: "palpitation", ev: "ema", t: "Облегчение временных нервных сердечных жалоб, например сердцебиения, после исключения серьёзных болезней врачом.", s: [ema("Crataegi folium cum flore")] },
        { c: "stress", ev: "ema", t: "При лёгком нервном напряжении и для облегчения засыпания.", s: [ema("Crataegi folium cum flore")] },
      ],
      prep: "infusion",
      cautions: [{ t: "Боли в сердце, одышка и отёки требуют срочного обращения к врачу.", s: [ema("Crataegi folium cum flore")] }],
    }),
    P({ id: "caraway", ru: "Тмин обыкновенный", lat: "Carum carvi", fam: "Сельдерейные (Apiaceae)",
      drug: { ru: "Плоды тмина", lat: "Carvi fructus" }, part: "seed",
      countries: ALL, art: { kind: "umbel", petal: "#f5f1e6", center: "#cbbf98", seeds: true },
      compounds: "Эфирное масло (карвон, лимонен), жирное масло.",
      uses: [
        { c: "bloating", ev: "ema", t: "При вздутии, метеоризме и лёгких спазмах (традиционное применение).", s: [ema("Carvi fructus")] },
      ],
      prep: "seed_infusion",
      cautions: [],
    }),
    P({ id: "flax", ru: "Лён посевной", lat: "Linum usitatissimum", fam: "Льновые (Linaceae)",
      drug: { ru: "Семена льна", lat: "Lini semen" }, part: "seed",
      countries: CULT, art: { kind: "flower", petal: "#7aa3d6", center: "#e7e0b8", petals: 5 },
      compounds: "Слизи, жирное масло (линоленовая кислота), лигнаны.",
      uses: [
        { c: "constipation", ev: "ema", t: "При привычном запоре (хорошо изученное применение); принимать с большим количеством воды.", s: [ema("Lini semen")] },
        { c: "gastritis_noninf", ev: "ema", t: "Слизь семян как обволакивающее средство при дискомфорте в желудке (традиционное применение).", s: [ema("Lini semen")] },
      ],
      prep: "mucilage",
      cautions: [{ t: "Нельзя при непроходимости кишечника; запивать достаточным количеством воды.", s: [ema("Lini semen")] }],
    }),
    P({ id: "calendula", ru: "Календула лекарственная", lat: "Calendula officinalis", fam: "Астровые (Asteraceae)",
      drug: { ru: "Цветки календулы", lat: "Calendulae flos" }, part: "flower",
      countries: CULT, art: { kind: "flower", petal: "#ef8a1e", center: "#b5560f", petals: 16 },
      compounds: "Тритерпеновые сапонины, каротиноиды, флавоноиды.",
      uses: [
        { c: "wounds", ev: "ema", t: "Наружно для заживления мелких ран.", s: [ema("Calendulae flos")] },
        { c: "skin_infl", ev: "ema", t: "Наружно при лёгком воспалении кожи, например солнечном ожоге.", s: [ema("Calendulae flos")] },
        { c: "throat", ev: "ema", t: "Полоскания при лёгком воспалении во рту и горле.", s: [ema("Calendulae flos")] },
      ],
      prep: "infusion",
      cautions: [{ t: "Аллергия на астровые.", s: [ema("Calendulae flos")] }],
    }),
    P({ id: "melissa", ru: "Мелисса лекарственная", lat: "Melissa officinalis", fam: "Яснотковые (Lamiaceae)",
      drug: { ru: "Листья мелиссы", lat: "Melissae folium" }, part: "leaf",
      countries: CULT, art: { kind: "leaf", leaf: "#7fb35a", shape: "ovate", pairs: 3 },
      compounds: "Эфирное масло (цитраль, цитронеллаль), розмариновая кислота.",
      uses: [
        { c: "stress", ev: "ema", t: "Облегчение лёгких симптомов психического напряжения (традиционное применение).", s: [ema("Melissae folium")] },
        { c: "sleep", ev: "ema", t: "Помогает заснуть.", s: [ema("Melissae folium")] },
        { c: "bloating", ev: "ema", t: "При лёгких желудочно-кишечных жалобах, вздутии.", s: [ema("Melissae folium")] },
      ],
      prep: "infusion",
      cautions: [],
    }),
  ];

  // Способы приготовления — для пошагового режима и котелка.
  // Каждый шаг: действие (a) и над какими ингредиентами (on): "all" или список id.
  const K67 = { id: "karpuk", loc: "с. 67" };
  const ACTIONS = {
    grind:    { ru: "Измельчить", icon: "🔪" },
    mix:      { ru: "Смешать", icon: "🥄" },
    water10:  { ru: "Залить водой комнатной температуры 1:10", icon: "🫗" },
    water30:  { ru: "Залить водой комнатной температуры 1:30", icon: "🫗" },
    bath15:   { ru: "Водяная баня 15 мин", icon: "♨️" },
    bath30:   { ru: "Водяная баня 30 мин", icon: "♨️" },
    cool45:   { ru: "Охладить 45 мин", icon: "🕰️" },
    cool10:   { ru: "Охладить 10 мин", icon: "🕰️" },
    swell:    { ru: "Залить водой комнатной температуры и выдержать без нагревания до полного набухания", icon: "💧" },
    strain:   { ru: "Процедить и отжать", icon: "🧺" },
    topup:    { ru: "Долить кипячёной водой до объёма", icon: "📏" },
  };

  const METHODS = {
    infusion: { lat: "Infusum", ru: "Настой",
      why: "Настои готовят из листьев, цветков и травы: сырьё измельчают примерно до 5 мм, заливают водой 1:10, держат 15 минут на кипящей водяной бане, охлаждают 45 минут, процеживают, отжимают и доводят кипячёной водой до нужного объёма.",
      steps: ["grind", "water10", "bath15", "cool45", "strain", "topup"], src: [K67] },
    decoction: { lat: "Decoctum", ru: "Отвар",
      why: "Отвары готовят из корней, корневищ и коры: их измельчают мельче, до 3 мм и меньше, нагревают на водяной бане 30 минут и охлаждают только 10 минут перед процеживанием.",
      steps: ["grind", "water10", "bath30", "cool10", "strain", "topup"], src: [K67] },
    leaf_decoction: { lat: "Decoctum foliorum", ru: "Отвар из листьев",
      why: "Исключение из общего правила: кожистые листья толокнянки и брусники готовят как отвар, хотя это листья.",
      steps: ["grind", "water10", "bath30", "cool10", "strain", "topup"], src: [K67, { id: "karpuk", loc: "с. 172–174" }] },
    valerian: { lat: "Infusum radicis Valerianae", ru: "Настой валерианы",
      why: "Корневища валерианы готовят как настой, причём в особом соотношении сырья и воды 1:30, а не 1:10.",
      steps: ["grind", "water30", "bath15", "cool45", "strain", "topup"], src: [K67, { id: "karpuk", loc: "с. 135" }] },
    seed_infusion: { lat: "Infusum fructuum", ru: "Настой плодов",
      why: "Для настоя плоды и семена измельчают мельче всего остального сырья, до 0,5 мм и меньше.",
      steps: ["grind", "water10", "bath15", "cool45", "strain", "topup"], src: [K67] },
    mucilage: { lat: "Mucilago seminum Lini", ru: "Слизь семян льна",
      why: "Слизь находится в наружных клетках семенной кожуры. Цельные или надломленные семена заливают водой и оставляют, пока они полностью не набухнут.",
      steps: ["swell", "strain"], src: [{ id: "karpuk", loc: "с. 86" }, { id: "ema", loc: "монография Lini semen, с. 4, разд. 4.2", search: "Lini semen" }] },
  };

  // Сборы: в сборах цветки, плоды и семена не измельчают, остальные компоненты измельчают каждый отдельно и только потом смешивают (Карпук, с. 71).
  const K71 = { id: "karpuk", loc: "с. 71" };
  // Где источники расходятся в способе приготовления: показываем обе версии рядом
  const METHOD_NOTES = {
    bearberry: { t: "По учебнику лист толокнянки готовят отваром. Монография EMA для травяного чая допускает настой кипятком или холодный мацерат, а не отвар: отвар извлекает больше танинов, раздражающих желудок.", s: [{ id: "karpuk", loc: "с. 174" }, { id: "ema", loc: "Uvae ursi folium", search: "Uvae ursi folium" }, { id: "ema_ar_bearberry", loc: "с. 15" }] },
  };
  const BLENDS = [
    { id: "chest", ru: "Грудной сбор от кашля", items: ["plantain_lanc", "linden", "thyme_wild"],
      goal: "Настой при кашле и раздражении горла во время простуды.",
      steps: [
        { a: "grind", on: ["plantain_lanc"] }, { a: "grind", on: ["thyme_wild"] }, { a: "mix", on: "all" }, { a: "water10", on: "all" },
        { a: "bath15", on: "all" }, { a: "cool45", on: "all" }, { a: "strain", on: "all" }, { a: "topup", on: "all" },
      ],
      why: "Листья и траву измельчают каждый компонент отдельно, цветки липы в сборе не измельчают. Дальше всё готовится как настой.", src: [K71, K67] },
    { id: "stomach", ru: "Желудочный сбор от вздутия", items: ["chamomile", "peppermint", "caraway"],
      goal: "Настой при вздутии и лёгких спазмах.",
      steps: [
        { a: "grind", on: ["peppermint"] }, { a: "mix", on: "all" }, { a: "water10", on: "all" },
        { a: "bath15", on: "all" }, { a: "cool45", on: "all" }, { a: "strain", on: "all" }, { a: "topup", on: "all" },
      ],
      why: "В сборе измельчают только листья мяты: цветки ромашки и плоды тмина оставляют целыми.", src: [K71, K67] },
    { id: "diarrhea_mix", ru: "Закрепляющий отвар", items: ["oak", "tormentil"],
      goal: "Отвар при лёгкой диарее.",
      steps: [
        { a: "grind", on: ["oak"] }, { a: "grind", on: ["tormentil"] }, { a: "mix", on: "all" }, { a: "water10", on: "all" },
        { a: "bath30", on: "all" }, { a: "cool10", on: "all" }, { a: "strain", on: "all" }, { a: "topup", on: "all" },
      ],
      why: "Кору дуба и корневища лапчатки измельчают по отдельности и готовят как отвар.", src: [K71, K67] },
  ];

  // Общие правила хранения готовых водных извлечений
  const STORAGE = { t: "Настои и отвары хранят в прохладном месте не более 2 суток.", s: [{ id: "karpuk", loc: "с. 68" }] };

  return { DISEASE_ICD, DISEASE_SYN, DISEASE_LAT, COUNTRIES, SOURCES, DISEASES, PLANTS, ACTIONS, METHODS, BLENDS, STORAGE, METHOD_NOTES };
})();
