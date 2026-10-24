/* Растения из подборки статей (волна 4, вторая часть): виды без учебной монографии в подборке, с записанным применением.
   Устроено как plants7.js. Подключается после plants7.js и до parts.js. */
(function () {
  const D = window.DATA, E = window.ETHNO;
  const add = (o, k, v) => { if (o && !(k in o)) o[k] = v; };
  const s = (id, loc) => [{ id, loc }];
  const PK = (loc) => s("eth_poliksenova2020", loc);
  const LW = (lat, p) => s("by2017", `Table 1, ${lat}, с. ${p}`);   // Любань, дикорастущие (2016)
  const LWp = (p) => s("by2017", `с. ${p}`);
  const LB = (lat) => s("eth_soukand2017b", "Table 1, " + lat);        // Любань, огородные
  const F = (lat, p) => s("pl2017", `Table 3, ${lat}, с. ${p}`);       // архив Фишера
  const P = (lat) => s("eth_kustosz2018", "Załącznik 1, hasło " + lat); // Подгале
  const M = (lat) => s("fk_petkevicius2014", "Tab. 1, " + lat);        // рынок в Вильно и фабрики
  const FAL = (p) => s("eth_kozlowska2018", "Table 3" + (p ? `, с. ${p}` : ""));  // травник Фалимижа, Краков, 1534
  const L7 = (p) => s("eth_luczaj2007", `с. ${p}`);
  const L8 = (p) => s("eth_luczaj2008", `с. ${p}`);
  const B3 = (lat) => s("eth_prakofjewa2023", "Table 2, " + lat);
  const t = (text, src) => ({ t: text, s: src });

  const VIL = "Вильно, рынок трав (1927–1928)";
  const POD = "Польша, Подгале";
  const MAN = "Подгале, Польша (Маньовы)";
  const LUB = "Любань, Минская обл., Беларусь (2016)";
  const LUBG = "Любань, Минская обл., Беларусь (огороды, 2016)";
  const PL48 = "Польша, анкеты 1948 г.";
  const BOR = "Пограничье PL-LT-BY (2018–2019)";
  const PLR = "Польша (обзор Łuczaj, Szymański, 2007)";
  const fis = (place) => `${place}, архив Фишера (1929–1935)`;

  const NOMONO = "Учебной монографии по этому виду в использованных источниках нет, поэтому описание, состав, сбор и сушка не заполнены.";
  const NOFAM = " Семейство в источниках подборки не названо.";
  const NOCTRY = " Записи только из Литвы и пограничья, поэтому страны не отмечены.";

  const PL = [
    { id: "allium_urs", ru: "Черемша (лук медвежий)", lat: "Allium ursinum", fam: "",
      drug: { ru: "Листья черемши", lat: "" }, part: "leaf", countries: { pl: "w", by: "w" },
      distSrc: [...L7("17"), ...LW("Allium ursinum", "7–8")],
      art: { kind: "leaf", shape: "lanceolate", pairs: 2, leaf: "#4f8a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM },
    { id: "syringa", ru: "Сирень обыкновенная", lat: "Syringa vulgaris", fam: "",
      drug: { ru: "Цветки, почки и листья сирени", lat: "" }, part: "flower", countries: { by: "w" },
      distSrc: LW("Syringa vulgaris", "20–21"),
      art: { kind: "flower", petal: "#b79ad6", center: "#8a6bb8", petals: 4, small: true, leaf: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM },
    { id: "prunus_sp", ru: "Тёрн (слива колючая)", lat: "Prunus spinosa", fam: "Розовые (Rosaceae)", famSrc: P("Prunus spinosa"),
      drug: { ru: "Плоды тёрна", lat: "" }, part: "berry", countries: { pl: "w" },
      distSrc: [...P("Prunus spinosa"), ...L7("19")],
      art: { kind: "berry", berry: "#3a4a78", leaf: "#5d7f42", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "primula", ru: "Первоцвет весенний", lat: "Primula veris", fam: "",
      drug: { ru: "Трава и цветки первоцвета", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#f2d23c", center: "#d98a1c", petals: 5, small: true, leaf: "#6f9a4f" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + NOCTRY },
    { id: "ledum", ru: "Багульник болотный", lat: "Ledum palustre", fam: "",
      drug: { ru: "Трава багульника", lat: "" }, part: "herb", countries: { by: "w" },
      distSrc: [...LW("Ledum palustre", "15"), ...PK("с. 18")],
      art: { kind: "flower", petal: "#f4f1e4", center: "#d8d0a8", petals: 5, small: true, leaf: "#5d6f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + " В iNaturalist вид числится как Rhododendron tomentosum." },
    { id: "melilotus", ru: "Донник лекарственный", lat: "Melilotus officinalis", fam: "",
      drug: { ru: "Трава донника", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#f0d84a", center: "#c9a91c", petals: 5, small: true, leaf: "#6f8f5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + NOCTRY },
    { id: "linaria", ru: "Льнянка обыкновенная", lat: "Linaria vulgaris", fam: "",
      drug: { ru: "Трава льнянки", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#f4e27a", center: "#f09a1c", petals: 5, small: true, leaf: "#7f9a6a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + NOCTRY },
    { id: "sedum", ru: "Очиток большой", lat: "Sedum maximum", fam: "",
      drug: { ru: "Корни очитка", lat: "" }, part: "root", countries: { pl: "w" },
      distSrc: L8("18"),
      art: { kind: "flower", petal: "#e8e2c0", center: "#b8a86a", petals: 5, small: true, leaf: "#8aa07a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + " Для лечебной записи из архива Фишера часть растения не указана; корни названы только в пищевой записи 1948 г. В iNaturalist вид числится как Hylotelephium maximum." },
    { id: "chimaphila", ru: "Зимолюбка зонтичная", lat: "Chimaphila umbellata", fam: "",
      drug: { ru: "Трава зимолюбки", lat: "" }, part: "herb", countries: { by: "w" },
      distSrc: LW("Chimaphila umbellata", "15"),
      art: { kind: "flower", petal: "#f0d6dc", center: "#c98f9c", petals: 5, small: true, leaf: "#3f6a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM },
    { id: "daphne", ru: "Волчеягодник обыкновенный (волчье лыко)", lat: "Daphne mezereum", fam: "Волчеягодниковые (Thymelaeaceae)", famSrc: P("Daphne mezereum"),
      drug: { ru: "Кора волчеягодника", lat: "" }, part: "bark", countries: { pl: "w" },
      distSrc: P("Daphne mezereum"),
      art: { kind: "berry", berry: "#c4222e", leaf: "#6f8f5a", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Данных о токсичности в использованных источниках нет, поэтому раздел предостережений пуст; подгальская запись ниже говорит, что этим растением можно было погубить человека." },
    { id: "fraxinus", ru: "Ясень обыкновенный", lat: "Fraxinus excelsior", fam: "Маслиновые (Oleaceae)", famSrc: P("Fraxinus excelsior"),
      drug: { ru: "Кора ясеня", lat: "" }, part: "bark", countries: { pl: "w" },
      distSrc: P("Fraxinus excelsior"),
      art: { kind: "bark", bark: "#9a9a8a", leaf: "#6f9a4f" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "ruta", ru: "Рута душистая", lat: "Ruta graveolens", fam: "",
      drug: { ru: "Трава руты", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#e8d84a", center: "#b8a01c", petals: 4, small: true, leaf: "#7f9a8a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + NOCTRY },
    { id: "nepeta", ru: "Котовник кошачий", lat: "Nepeta cataria", fam: "Яснотковые (Lamiaceae)", famSrc: P("Nepeta cataria"),
      drug: { ru: "Трава и листья котовника", lat: "" }, part: "herb", countries: { pl: "w", by: "c" },
      distSrc: [...P("Nepeta cataria"), ...LB("Nepeta cataria")],
      art: { kind: "leaf", shape: "ovate", pairs: 3, leaf: "#8aa07a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "arnica", ru: "Арника горная", lat: "Arnica montana", fam: "",
      drug: { ru: "Цветки и листья арники", lat: "" }, part: "flower", countries: { by: "w" },
      distSrc: LW("Arnica montana", "9"),
      art: { kind: "flower", petal: "#f2b81c", center: "#c98a14", petals: 12, leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM },
    { id: "stellaria", ru: "Звездчатка средняя (мокрица)", lat: "Stellaria media", fam: "Гвоздичные (Caryophyllaceae)", famSrc: P("Stellaria media"),
      drug: { ru: "Трава звездчатки", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...P("Stellaria media"), ...LW("Stellaria media", "14")],
      art: { kind: "flower", petal: "#f6f4ee", center: "#c9c08a", petals: 10, small: true, leaf: "#7fae5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "heracleum", ru: "Борщевик обыкновенный", lat: "Heracleum sphondylium", fam: "Зонтичные (Apiaceae)", famSrc: P("Heracleum sphondylium"),
      drug: { ru: "Корни и цветки борщевика", lat: "" }, part: "root", countries: { pl: "w" },
      distSrc: [...P("Heracleum sphondylium"), ...L8("15")],
      art: { kind: "umbel", petal: "#efeadb", center: "#b8b08a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "papaver", ru: "Мак снотворный", lat: "Papaver somniferum", fam: "",
      drug: { ru: "Незрелые коробочки мака", lat: "Fructus Papaveris immaturi" }, part: "berry", countries: {},
      art: { kind: "flower", petal: "#d9a0c0", center: "#3a2f4a", petals: 4, leaf: "#8aa0a0" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + NOCTRY + " Источники описывают исторический обычай; сведений о дозах и безопасности в них нет." },
    { id: "vinca", ru: "Барвинок малый", lat: "Vinca minor", fam: "Кутровые (Apocynaceae)", famSrc: P("Vinca minor"),
      drug: { ru: "Побеги барвинка", lat: "" }, part: "shoot", countries: { pl: "w" },
      distSrc: [...P("Vinca minor"), ...PK("с. 99")],
      art: { kind: "flower", petal: "#7f8fd6", center: "#e8e8f0", petals: 5, leaf: "#2f5a2a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "pyrus", ru: "Груша лесная (дичка)", lat: "Pyrus pyraster", fam: "",
      drug: { ru: "Плоды дикой груши", lat: "" }, part: "berry", countries: { pl: "w", by: "w" },
      distSrc: [...L7("19"), ...LW("Pyrus pyraster", "25–26")],
      art: { kind: "berry", berry: "#a5893f", leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + NOFAM + " По Łuczaj (2007), плоды дикой и одичавшей груши собирают, не различая виды. В iNaturalist лесная груша — подвид Pyrus communis pyraster." },
    { id: "rosa_canina", ru: "Шиповник собачий", lat: "Rosa canina", fam: "Розовые (Rosaceae)", famSrc: P("Rosa canina"),
      drug: { ru: "Плоды и цветки шиповника собачьего", lat: "" }, part: "berry", countries: { pl: "w" },
      distSrc: [...P("Rosa canina"), ...L8("18")],
      art: { kind: "berry", berry: "#d23a1e", leaf: "#5d7f42", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Шиповник майский (коричный) описан отдельной страницей." },
    { id: "epilobium", ru: "Иван-чай узколистный", lat: "Chamaenerion angustifolium", fam: "Кипрейные (Onagraceae)", famSrc: P("Chamaenerion angustifolium"),
      drug: { ru: "Трава, цветки и листья иван-чая", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...P("Chamaenerion angustifolium"), ...LW("Epilobium angustifolium", "21")],
      art: { kind: "flower", petal: "#d0609a", center: "#9c3a6e", petals: 4, small: true, leaf: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Синоним: Epilobium angustifolium." },
    { id: "nymphaea", ru: "Кувшинка белая", lat: "Nymphaea alba", fam: "Кувшинковые (Nymphaeaceae)", famSrc: P("Nymphaea alba"),
      drug: { ru: "Корневища кувшинки", lat: "" }, part: "root", countries: {},
      art: { kind: "flower", petal: "#f8f6f0", center: "#f1d36b", petals: 16, leaf: "#3f6a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Подгальская запись сомнительна (вид там не растёт), поэтому страны не отмечены." },
  ];

  const T = {
    allium_urs: { drugSrc: LW("Allium ursinum", "7–8") },
    syringa: { drugSrc: LW("Syringa vulgaris", "20–21") },
    prunus_sp: { drugSrc: P("Prunus spinosa") },
    primula: { drugSrc: M("Primula veris") },
    ledum: { drugSrc: [...M("Ledum palustre"), ...PK("с. 22")] },
    melilotus: { drugSrc: M("Melilotus officinalis") },
    linaria: { drugSrc: M("Linaria vulgaris") },
    sedum: { drugSrc: L8("18") },
    chimaphila: { drugSrc: [...LW("Chimaphila umbellata", "15"), ...M("Chimaphila umbellata")] },
    daphne: { drugSrc: M("Daphne mezereum") },
    fraxinus: { drugSrc: M("Fraxinus excelsior"), ident: [t("Кора ясеня — возможная примесь к коре дуба: она матовая, серая и легко отличается по внешним и микроскопическим признакам (прерывистый механический пояс с немногими каменистыми клетками, волокна без кристаллоносной обкладки).", PK("с. 48"))] },
    ruta: { drugSrc: M("Ruta graveolens") },
    nepeta: { drugSrc: [...LB("Nepeta cataria"), ...B3("Nepeta cataria")] },
    arnica: { drugSrc: M("Arnica montana") },
    stellaria: { drugSrc: LW("Stellaria media", "14") },
    heracleum: { drugSrc: P("Heracleum sphondylium") },
    papaver: { drugSrc: M("Papaver somniferum") },
    vinca: { drugSrc: P("Vinca minor") },
    pyrus: { drugSrc: [...LW("Pyrus pyraster", "25–26"), ...B3("Pyrus pyraster")] },
    rosa_canina: { drugSrc: P("Rosa canina"), ident: [t("Шиповник собачий относится к секции Canina: аскорбиновой кислоты в плодах до 1 %, чашелистики опадают при созревании, на верхушке плода остаётся пятиугольная площадка.", PK("с. 48"))] },
    epilobium: { drugSrc: LW("Epilobium angustifolium", "21") },
    nymphaea: { drugSrc: M("Nymphaea alba") },
  };

  const ETH = {
    allium_urs: {
      names: [t("Польск. czosnek niedźwiedzi (книжн.), zajęczy czosnek; бел. дзікі часнок, чарамша, мядзведжы лук (Любань).", [...L7("17"), ...LW("Allium ursinum", "7–8")])],
      uses: [
        { r: LUB, c: null, t: "Свежие листья едят в салатах (11 записей), как закуску (5), в супе и как приправу, в том числе к мясу; листья сушат, морозят и маринуют. Одна запись — «для витаминов», ещё одна — свежие корни как закуска.", s: LW("Allium ursinum", "7–8") },
        { r: PLR, c: null, t: "Луковицы — приправа к мясу (Лапше-Нижне, 1980-е). Сырые листья понемногу едят как закуску; этот обычай новый и пришёл из СМИ.", s: L7("17") },
      ],
      facts: [t("В Любани черемшу назвали 22 собеседника; из 28 подробных записей 27 пищевые и только одна лечебная.", LWp("37"))],
    },
    syringa: {
      names: [t("Польск. bez (архив Фишера); бел. бэз (белы), сірэнь (белая) (Любань).", [...F("Syringa vulgaris", "10"), ...LW("Syringa vulgaris", "20–21")])],
      uses: [
        { r: LUB, c: "joint_pain", t: "Настойку цветков втирают при ревматических болях (6 записей), боли в суставах (5), в ногах и спине; настойку почек и отвар цветков тоже берут при боли в суставах. Настойку цветков пьют при боли в желудке, свежие листья прикладывают к порезам.", s: LW("Syringa vulgaris", "20–21") },
        { r: fis("Оляны и Поляны"), c: "cough", t: "От кашля (Оляны) и от лёгочной инфекции (Поляны).", s: F("Syringa vulgaris", "10") },
      ],
      facts: [
        t("В учебнике Поликсеновой сирень названа среди жаропонижающих растений.", PK("с. 25")),
        t("В Любани сирень назвали 20 собеседников, и 18 из них — как лекарство.", LWp("37")),
      ],
    },
    prunus_sp: {
      names: [t("Польск. śliwa tarnina (книжн.), tarnina, tarka, ciarka; на Подгале tarnina (плоды — tarki); в анкетах 1948 г. также torki, ciarki, ciorki, kocierypka, tarcyna, ciernie, dzika śliwka.", [...L7("19"), ...P("Prunus spinosa"), ...L8("18")])],
      uses: [
        { r: MAN, c: "cold", t: "Тёрн — от простуды и астмы; в воде, где варили тёрн, отмачивают больные суставы. Плоды едят и ставят на вино.", s: P("Prunus spinosa") },
        { r: POD, c: null, t: "Плоды едят после первых заморозков (Köhler, 2018).", s: P("Prunus spinosa") },
        { r: PLR, c: null, t: "Из плодов делали вино, сок (чаще всего вываривая их с водой), компоты и варенье, дети ели их сырыми. Так было по всей стране, чаще на юге и юго-востоке; варенье — в основном под Красником.", s: L7("19") },
        { r: PL48, c: null, t: "Плоды — детское лакомство, из них делали сок, варенье и вино (27 местностей).", s: L8("18") },
      ],
    },
    primula: {
      names: [t("Польск. kluczyki (Вильно, архив Фишера), литов. petrarakčiai; в травнике Фалимижа (Краков, 1534) — «Herba paralisis», «paraliżowe, pierwiosnek».", [...M("Primula veris"), ...F("Primula veris", "9"), ...FAL("14")])],
      uses: [
        { r: VIL, c: "cough", t: "Траву и цветки продавали «od zaflegmienia płuc» — при мокроте в лёгких. Фабрика Тарасейских закупила травы 0,3 т в 1927 г. и 0,5 т в 1928 г., цветков — 0,5 т в 1928 г.", s: M("Primula veris") },
        { r: fis("Оляны"), c: "cough", t: "От кашля.", s: F("Primula veris", "9") },
      ],
      facts: [t("Первоцвет весенний, как и медуница, накапливает марганец (растение-манганофил).", PK("с. 26"))],
    },
    ledum: {
      names: [t("Польск. rozmaryn leśny, bagno (архив Фишера); в Вильно Bahun, литов. gailiai; бел. багон, багоўнік, буячнік (Любань).", [...F("Ledum palustre", "8"), ...M("Ledum palustre"), ...LW("Ledum palustre", "15")])],
      uses: [
        { r: LUB, c: "cough", t: "Чай пьют от кашля (3 записи) и «для нервов»; отвар — при поносе и бронхите, а также при поносе у телят и коров. Дымом окуривают от клещей; сушёную траву заваривают как чай.", s: LW("Ledum palustre", "15") },
        { r: VIL, c: "menstrual", t: "Траву продавали «od zatrzymania periodów» — при задержке месячных — и для ванн при ревматизме. Фабрика Тарасейских закупила 0,5 т в 1927 г. и 0,2 т в 1928 г.", s: M("Ledum palustre") },
        { r: fis("Окрестности Вильно"), c: null, t: "Как возбуждающую добавку подмешивали в пиво; использовали как репеллент.", s: F("Ledum palustre", "8") },
      ],
      facts: [t("По учебнику Поликсеновой, багульник — одно из примерно 80 растений, сырьё которых в Беларуси заготавливают через аптеки из дикорастущих зарослей; траву собирают в период плодоношения.", PK("с. 18, 22"))],
    },
    melilotus: {
      names: [t("Польск. «borlenin (?) żółty» (архив Фишера, название читается с трудом); в Вильно Burkun, литов. jondobilis; в травнике Фалимижа (Краков, 1534) — «Mellilotum», «nostrzyk, melot».", [...F("Melilotus officinalis", "8"), ...M("Melilotus officinalis"), ...FAL("13")])],
      uses: [
        { r: fis("Гибы"), c: "women", t: "При женских болезнях, язвах и опухолях.", s: F("Melilotus officinalis", "8") },
        { r: VIL, c: null, t: "Траву продавали «od przelęknienia» — от испуга. Фабрика Тарасейских закупила 0,5 т в 1928 г.", s: M("Melilotus officinalis") },
      ],
    },
    linaria: {
      names: [t("Польск. lonnica (архив Фишера); в Вильно Podlicznik, литов. bambažolė; в травнике Фалимижа (Краков, 1534) — «Linaria», «Matki Bożey len, lnica».", [...F("Linaria vulgaris", "8"), ...M("Linaria vulgaris"), ...FAL("13")])],
      uses: [
        { r: VIL, c: "skin", t: "Траву продавали «od piegów» — от веснушек. Фабрика Тарасейских закупила 0,1 т в 1927 г. и 1,5 т в 1928 г.", s: M("Linaria vulgaris") },
        { r: fis("Граужишки"), c: null, t: "От оспы.", s: F("Linaria vulgaris", "8") },
      ],
    },
    sedum: {
      names: [t("Польск. zajęcza kapusta (архив Фишера), zajace pyry (анкеты 1948 г.).", [...F("Sedum maximum", "10"), ...L8("18")])],
      uses: [
        { r: fis("Оляны"), c: null, t: "От народной болезни «poddźwignięcie», или «ochwat».", s: F("Sedum maximum", "10") },
        { r: PL48, c: null, t: "Толстые корни ели (1 местность, Нове-Крамско).", s: L8("18") },
      ],
    },
    chimaphila: {
      names: [t("Польск. stanawnik (архив Фишера), в Вильно Stanownik; бел. станаўнік (Любань).", [...F("Chimaphila umbellata", "7"), ...M("Chimaphila umbellata"), ...LW("Chimaphila umbellata", "15")])],
      uses: [
        { r: LUB, c: "gi", t: "Чай и настойку травы пьют при боли в желудке.", s: LW("Chimaphila umbellata", "15") },
        { r: fis("Поляны"), c: null, t: "От народной болезни «poruszenie».", s: F("Chimaphila umbellata", "7") },
        { r: VIL, c: null, t: "Траву продавали «od sekretnej choroby u mężczyzn» — от «тайной болезни» у мужчин.", s: M("Chimaphila umbellata") },
      ],
    },
    daphne: {
      names: [t("Польск. wawrzynek wilczełyko (книжн.), wilcze łyko; в Вильно Wilcze łyko, литов. meškalunkis; в травнике Фалимижа (Краков, 1534) — «Laurcola», «wilcże łyko, wawrzynek».", [...P("Daphne mezereum"), ...M("Daphne mezereum"), ...FAL("11")])],
      uses: [
        { r: MAN, c: null, t: "Глотали сырым как рвотное — при отравлениях; какую часть, запись не уточняет.", s: P("Daphne mezereum") },
        { r: VIL, c: "joint_pain", t: "Кору продавали «do wcierań i od darcia» — для растираний и от ломоты. Фабрика Тарасейских её тоже закупала, но сколько — неизвестно.", s: M("Daphne mezereum") },
      ],
      facts: [t("По подгальскому поверью, чтобы погубить человека, достаточно было дать ему это растение — спасти его потом было уже нельзя (Bazińska, 1967).", P("Daphne mezereum"))],
    },
    fraxinus: {
      names: [t("Польск. jesion wyniosły (книжн.), jesion, jasień; в Вильно Jesion; в травнике Фалимижа (Краков, 1534) — «Frarimus», «jesion».", [...P("Fraxinus excelsior"), ...M("Fraxinus excelsior"), ...FAL("12")])],
      uses: [
        { r: MAN, c: null, t: "От укуса гадюки.", s: P("Fraxinus excelsior") },
        { r: VIL, c: "gi", t: "Кору продавали «od kataru żołądka» — при катаре желудка.", s: M("Fraxinus excelsior") },
      ],
      facts: [t("На Подгале ясень служил громоотводом; из него делали дышла, детали возов и саней, табуреты, пастушьи палки, смычки и дудки, а из нароста на стволе вырезали голову козы для волынки.", P("Fraxinus excelsior"))],
    },
    ruta: {
      names: [t("Польск. ruta (архив Фишера), rutka (Вильно); в травнике Фалимижа (Краков, 1534) — «ruta».", [...F("Ruta graveolens", "10"), ...M("Ruta graveolens"), ...FAL("14")])],
      uses: [
        { r: fis("Гибы"), c: null, t: "От зубной боли. В Ковно руту выращивали в огородах.", s: F("Ruta graveolens", "10") },
        { r: VIL, c: "gi", t: "Траву продавали «na żołądek i wątrobę» — для желудка и печени.", s: M("Ruta graveolens") },
      ],
    },
    nepeta: {
      names: [t("Польск. kocimiętka właściwa (книжн.); бел. меліса (Любань); литов. citrininė katažolė, melisa.", [...P("Nepeta cataria"), ...LB("Nepeta cataria"), ...B3("Nepeta cataria")])],
      uses: [
        { r: LUBG, c: "stress", t: "Чай из травы пьют как успокоительное, при болезнях почек, боли в желудке, раке и «от всего». В Любани котовник называют «мелисой».", s: LB("Nepeta cataria") },
        { r: BOR, c: null, t: "Сушёные листья заваривают как чай (3 записи) и кладут как приправу.", s: B3("Nepeta cataria") },
        { r: POD, c: null, t: "Котовник добавляли в похлёбку из кислого молока, сваренного с чесноком или луком; её ели с картошкой (Jostowa, 1967).", s: P("Nepeta cataria") },
      ],
    },
    arnica: {
      names: [t("В Вильно Arnika, литов. arnykai; бел. арніка горная (Любань).", [...M("Arnica montana"), ...LW("Arnica montana", "9")])],
      uses: [
        { r: LUB, c: "cardio", t: "Чай из целого растения — при болезнях сердца и «для нервов».", s: LW("Arnica montana", "9") },
        { r: VIL, c: null, t: "Цветки продавали «przy stłuczeniach» — при ушибах, листья — при болезнях желудка. Фабрика Тарасейских закупила цветков по 0,6 т в 1927 и 1928 гг.", s: M("Arnica montana") },
      ],
      facts: [t("Учебник Поликсеновой называет арнику горную перспективным растением для введения в культуру в Беларуси.", PK("с. 97"))],
    },
    stellaria: {
      names: [t("Польск. gwiazdnica pospolita (книжн.); на Подгале muszec, muszcz; бел. макрэц, макрыца, звесчатка (Любань).", [...P("Stellaria media"), ...LW("Stellaria media", "14")])],
      uses: [
        { r: LUB, c: "joint_pain", t: "Свежую траву и настойку прикладывают при ревматических болях, свежую траву — к болячкам на ногах и при головной боли; отвар пьют при раке. Свежую траву едят в салате.", s: LW("Stellaria media", "14") },
        { r: POD, c: null, t: "Ели для вкуса и вместо шпината (Köhler, 2018).", s: P("Stellaria media") },
      ],
    },
    heracleum: {
      names: [t("Польск. barszcz zwyczajny (книжн.), barszcz; в анкетах 1948 г. burak dziki, borszczek; в пограничье польск. boršč, литов. barščiai, grobūzdai, barštis.", [...P("Heracleum sphondylium"), ...L8("15"), ...B3("Heracleum sphondylium")])],
      uses: [
        { r: POD, c: "cold", t: "Отвар цветков пили как потогонное при насморке (Udziela, 1891). Отвар корня, по поверью, защищал от холеры во время эпидемии (Gustawicz, 1882; Udziela, 1891).", s: P("Heracleum sphondylium") },
        { r: PL48, c: null, t: "Зелёные части ели в голод и варили из них суп — до Первой мировой войны (Рабка-Здруй).", s: L8("15") },
        { r: BOR, c: null, t: "Листья варят, сушат и солят для супа.", s: B3("Heracleum sphondylium") },
      ],
    },
    papaver: {
      names: [t("Польск. mak (Граужишки, Поляны), macrek (Янов-над-Вилией); в Вильно Mak; в травнике Фалимижа (Краков, 1534) — «Opium, papaver», «mak lekarski».", [...F("Papaver somniferum", "9"), ...M("Papaver somniferum"), ...FAL("13")])],
      uses: [
        { r: VIL, c: "sleep", t: "Сухие коробочки продавали «na sen dla dzieci» — чтобы дети спали. Фабрика Тарасейских закупила по 1 т в 1927 и 1928 гг.", s: M("Papaver somniferum") },
        { r: fis("Граужишки, Поляны, Янов-над-Вилией"), c: null, t: "От зубной боли (Граужишки). Мак клали в рождественскую кутью (Поляны) и выращивали в огородах (Янов-над-Вилией).", s: F("Papaver somniferum", "9") },
      ],
    },
    vinca: {
      names: [t("Польск. barwinek pospolity (книжн.); на Подгале barwinek, barbinek.", P("Vinca minor"))],
      uses: [
        { r: POD, c: "joint_pain", t: "Девять веточек заливали вином и пили по рюмке в день от ревматизма («gościec», Tylkowa, 2000). Вымоченный барвинок применяли против колтуна (Gustawicz, 1882).", s: P("Vinca minor") },
      ],
      facts: [
        t("Барвинок освящали на Успение (Matki Boskiej Zielnej) и давали коровам после первого отёла, чтобы у них появилось молоко (Gustawicz, 1882; Kwaśniewicz, 2000).", P("Vinca minor")),
        t("В учебнике Поликсеновой барвинок назван среди растений, понижающих кровяное давление.", PK("с. 24")),
      ],
    },
    pyrus: {
      names: [t("Польск. grusza, ulęgałka, dzika grusza; бел. грушы дзікія, дзічка (Любань); в пограничье польск. grusza, hruša, литов. kriaušė, laukinė kriaušė.", [...L7("19"), ...LW("Pyrus pyraster", "25–26"), ...B3("Pyrus pyraster")])],
      uses: [
        { r: LUB, c: "diarrhea", t: "Отвар плодов пьют при поносе (5 записей) и дают при поносе коровам; сушёные плоды и компот — при поносе, простуде и боли в желудке. Плоды едят свежими и сушёными, варят компот, варенье и квас.", s: LW("Pyrus pyraster", "25–26") },
        { r: PLR, c: null, t: "Плоды ели сырыми, сушили для компотов, варили и мариновали в уксусе — в большинстве регионов, широко до недавнего времени.", s: L7("19") },
        { r: BOR, c: null, t: "Сушёные цветки заваривают как чай, из плодов варят компот.", s: B3("Pyrus pyraster") },
      ],
      facts: [t("В Любани дикую грушу назвали 16 собеседников; 6 из них используют её и в пищу, и как лекарство.", LWp("37"))],
    },
    rosa_canina: {
      names: [t("Польск. róża dzika (книжн.); на Подгале głóg; в анкетах 1948 г. dzika róża, głóg, polna róża, szyp, koralina, supsyna; в травнике Фалимижа (Краков, 1534) — «Rosa», «roża».", [...P("Rosa canina"), ...L8("18"), ...FAL("14")])],
      uses: [
        { r: POD, c: "skin_infl", t: "Цветками и плодами окуривали и обкладывали больного при «różyczka» (Tylkowa, 2000).", s: P("Rosa canina") },
        { r: PL48, c: null, t: "Плоды (в основном шиповника собачьего) ели сырыми, варили из них варенье и вино (21 местность).", s: L8("18") },
      ],
    },
    epilobium: {
      names: [t("Польск. wierzbówka kiprzyca (книжн.); на Подгале kiprzyna; бел. іван-чай (Любань).", [...P("Chamaenerion angustifolium"), ...LW("Epilobium angustifolium", "21")])],
      uses: [
        { r: LUB, c: "hypertension", t: "Отвар и чай из цветков пьют при повышенном давлении, головной боли, болезнях почек. Сушёную траву и листья заваривают как чай, траву берут в баню.", s: LW("Epilobium angustifolium", "21") },
        { r: POD, c: null, t: "В отваре купают детей при рахите (Radwańska-Paryska, 1992).", s: P("Chamaenerion angustifolium") },
      ],
    },
    nymphaea: {
      names: [t("Польск. grzybień biały (книжн.), nenufar; в Вильно «Biała róża wodna»; в травнике Фалимижа (Краков, 1534) — «Nenufar», «grzybienie».", [...P("Nymphaea alba"), ...M("Nymphaea alba"), ...FAL("13")])],
      uses: [
        { r: VIL, c: "skin_infl", t: "Корневища продавали «od róży» — от рожи.", s: M("Nymphaea alba") },
        { r: POD, c: "wounds", t: "Прикладывали к ранам (Udziela, 1891). Автор обзора считает запись сомнительной: на Подгале этот вид не растёт.", s: P("Nymphaea alba") },
      ],
    },
  };

  const GAPS = "Способ приготовления и показания EMA не заполнены: в использованных источниках их нет, а сайт EMA сейчас недоступен.";
  for (const p of PL) { p.gaps = [GAPS, p.note2].filter(Boolean).join(" "); if (!D.PLANTS.some((x) => x.id === p.id)) D.PLANTS.push(p); }
  for (const k in T) add(window.TEXTS.plants, k, T[k]);
  if (E) for (const k in ETH) add(E.plants, k, ETH[k]);
})();
