/* Растения из подборки статей (волна 3, часть 2): виды без учебной монографии в подборке.
   Устроено так же, как plants5.js: народное применение по статьям, учебные поля пустые, если источника нет.
   Подключается после plants5.js и до app.js. */
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
  const M2 = (lat) => s("fk_petkevicius2014", "Tab. 2, " + lat);       // только фабрики
  const FAL = (p) => s("eth_kozlowska2018", "Table 3" + (p ? `, с. ${p}` : ""));  // травник Фалимижа, Краков, 1534
  const L7 = (p) => s("eth_luczaj2007", `с. ${p}`);
  const L8 = (p) => s("eth_luczaj2008", `с. ${p}`);
  const B3 = (lat) => s("eth_prakofjewa2023", "Table 2, " + lat);
  const t = (text, src) => ({ t: text, s: src });
  const tu = (c, text, src) => ({ c, ev: "text", t: text, s: src });

  const VIL = "Вильно, рынок трав (1927–1928)";
  const SVE = "Свенцяны, фабрика Тарасейских (1927–1928)";
  const FIS = "Пограничье PL-LT-BY, архив Фишера (1929–1935)";
  const POD = "Польша, Подгале";
  const MAN = "Подгале, Польша (Маньовы)";
  const LUB = "Любань, Минская обл., Беларусь (2016)";
  const LUBc = "Беларусь, Любань";
  const PL48 = "Польша, анкеты 1948 г.";
  const BOR = "Пограничье PL-LT-BY (2018–2019)";
  const PLR = "Польша (обзор Łuczaj, Szymański, 2007)";

  const NOMONO = "Учебной монографии по этому виду в использованных источниках нет, поэтому описание, состав, сбор и сушка не заполнены.";

  const PL = [
    { id: "trifolium", ru: "Клевер луговой", lat: "Trifolium pratense", fam: "Бобовые (Fabaceae)", famSrc: P("Trifolium pratense"),
      drug: { ru: "Цветки клевера", lat: "" }, part: "flower", countries: { pl: "w" },
      distSrc: P("Trifolium pratense"),
      art: { kind: "flower", petal: "#c9577f", center: "#9c3a5e", petals: 12, small: true, leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Часть записей относится к клеверу вообще (вид не уточнён); это сказано в тексте записи." },
    { id: "oxalis", ru: "Кислица обыкновенная", lat: "Oxalis acetosella", fam: "Кисличные (Oxalidaceae)", famSrc: P("Oxalis acetosella"),
      drug: { ru: "Листья кислицы", lat: "" }, part: "leaf", countries: { pl: "w", by: "w" },
      distSrc: [...L7("17"), ...LW("Oxalis acetosella", "21")],
      art: { kind: "flower", petal: "#f6f1ee", center: "#d9b8c4", petals: 5, small: true, leaf: "#6f9a4f" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Лекарственного применения в статьях нет: кислица — еда и детское лакомство." },
    { id: "glechoma", ru: "Будра плющевидная", lat: "Glechoma hederacea", fam: "Яснотковые (Lamiaceae)", famSrc: L8("17"), potx: "x_glechoma",
      drug: { ru: "Трава будры", lat: "" }, part: "herb", countries: { pl: "w" },
      distSrc: [...L7("16"), ...L8("17")],
      art: { kind: "flower", petal: "#8a6bb8", center: "#5c4685", petals: 5, small: true, leaf: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет будру среди тонизирующих средств." },
    { id: "elymus", ru: "Пырей ползучий", lat: "Elymus repens", fam: "Мятликовые (Poaceae)", famSrc: P("Elymus repens"), potx: "x_couch",
      drug: { ru: "Корневища пырея", lat: "" }, part: "root", countries: { pl: "w", by: "w" },
      distSrc: [...P("Elymus repens"), ...L7("18"), ...LW("Elymus repens", "23")],
      art: { kind: "root", root: "#e8dcb8", top: "#7f9a5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " В части источников вид назван Agropyron repens." },
    { id: "corylus", ru: "Лещина обыкновенная", lat: "Corylus avellana", fam: "Лещиновые (Corylaceae)", famSrc: [...P("Corylus avellana"), ...L8("16")],
      drug: { ru: "Орехи лещины", lat: "" }, part: "seed", countries: { pl: "w", by: "w" },
      distSrc: [...L7("15"), ...LW("Corylus avellana", "13")],
      art: { kind: "berry", berry: "#a5793f", leaf: "#5d7f42", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Лекарственного применения в статьях почти нет: лещина — еда и обрядовое растение." },
    { id: "centaurium", ru: "Золототысячник обыкновенный", lat: "Centaurium erythraea", fam: "Горечавковые (Gentianaceae)", famSrc: P("Centaurium erythraea"), potx: "x_centaury",
      drug: { ru: "Трава золототысячника", lat: "Herba Centaurii minoris" }, part: "herb", countries: { pl: "w" },
      distSrc: P("Centaurium erythraea"),
      art: { kind: "flower", petal: "#e07a9e", center: "#f1d36b", petals: 5, small: true, leaf: "#6f8f5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Из учебного есть только состав горечей (Поликсенова). Латинское название сырья — по Российской фармакопее 1910 г. (из таблицы Петкявичюса и др.)." },
    { id: "calluna", ru: "Вереск обыкновенный", lat: "Calluna vulgaris", fam: "Вересковые (Ericaceae)", famSrc: L7("15"),
      drug: { ru: "Трава и цветки вереска", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...L7("15"), ...LW("Calluna vulgaris", "15")],
      art: { kind: "flower", petal: "#c37bb0", center: "#8f4f80", petals: 4, small: true, leaf: "#4f6b3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет вереск среди седативных растений." },
    { id: "berberis", ru: "Барбарис обыкновенный", lat: "Berberis vulgaris", fam: "Барбарисовые (Berberidaceae)", famSrc: L7("13"),
      drug: { ru: "Плоды барбариса", lat: "" }, part: "berry", countries: { pl: "w" },
      distSrc: L7("13"),
      art: { kind: "berry", berry: "#c4222e", leaf: "#6f8f5a", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет берберин из барбариса среди желчегонных средств. Народного лекарственного применения в статьях нет." },
    { id: "veronica", ru: "Вероника лекарственная", lat: "Veronica officinalis", fam: "", potx: "x_veronica",
      drug: { ru: "Трава вероники", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#8fa8e0", center: "#f2f0e6", petals: 4, small: true, leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Вид есть только в одном источнике подборки (рынок в Вильно и фабрика Тарасейских); семейство и страны там не названы." },
    { id: "arctium", ru: "Лопух (род)", lat: "Arctium spp.", fam: "Сложноцветные (Asteraceae)", famSrc: P("Arctium lappa"), potx: "x_burdock",
      drug: { ru: "Корни и листья лопуха", lat: "" }, part: "root", countries: { pl: "w", by: "w" },
      distSrc: [...P("Arctium lappa"), ...LW("Arctium tomentosum", "8")],
      art: { kind: "root", root: "#6b4a2f", top: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Записи относятся к разным видам: лопух большой (A. lappa) на Подгале и в Литве, лопух паутинистый (A. tomentosum) в Любани и в пограничье, лопух малый (A. minus) в архиве Фишера; вид указан в каждой записи." },
    { id: "lamium", ru: "Яснотка белая", lat: "Lamium album", fam: "Яснотковые (Lamiaceae)", famSrc: L8("17"), potx: "x_lamium",
      drug: { ru: "Цветки яснотки", lat: "" }, part: "flower", countries: { pl: "w" },
      distSrc: L8("17"),
      art: { kind: "flower", petal: "#f4f1e4", center: "#d8d0a8", petals: 5, small: true, leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой упоминает яснотку только как недопустимую примесь к листьям крапивы." },
    { id: "petroselinum", ru: "Петрушка кудрявая", lat: "Petroselinum crispum", fam: "Зонтичные (Apiaceae)", famSrc: LB("Petroselinum crispum"), potx: "x_parsley",
      drug: { ru: "Корни и листья петрушки", lat: "" }, part: "root", countries: { by: "c" },
      distSrc: LB("Petroselinum crispum"),
      art: { kind: "umbel", petal: "#e6e2b8", center: "#a8a26a", feathery: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет петрушку среди жаропонижающих и понижающих давление растений." },
    { id: "abrotanum", ru: "Полынь лечебная", lat: "Artemisia abrotanum", fam: "", potx: "x_abrotanum",
      drug: { ru: "Трава полыни лечебной", lat: "" }, part: "herb", countries: {},
      art: { kind: "leaf", shape: "lanceolate", pairs: 4, leaf: "#8aa07a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Семейство для этого вида в источниках подборки не названо. Растение записано только в Литве (Вильно, Ковно) и в пограничье, поэтому страны не отмечены." },
  ];

  // Только то немногое, что есть в учебнике Поликсеновой; остальное пусто
  const T = {
    trifolium: { drugSrc: M2("Trifolium pratense") },
    oxalis: { drugSrc: L7("17") },
    glechoma: { drugSrc: M("Glechoma hederacea"), usesGen: [t("Будра названа среди тонизирующих и возбуждающих средств, действующих на центральную нервную систему.", PK("с. 24"))] },
    elymus: { drugSrc: [...M2("Elymus repens"), ...P("Elymus repens")] },
    corylus: { drugSrc: L7("15") },
    centaurium: { drugSrc: M("Centaurium erythraea"), chemK: [t("В траве золототысячника есть горькие монотерпеновые иридоиды: сверозид и генциопикрин.", PK("с. 35"))] },
    calluna: { drugSrc: [...M("Calluna vulgaris"), ...LW("Calluna vulgaris", "15")] },
    berberis: { drugSrc: L7("13") },
    veronica: { drugSrc: M("Veronica officinalis") },
    arctium: { drugSrc: [...M2("Arctium lappa"), ...P("Arctium lappa")], ident: [t("Лопух большой назван среди возможных примесей к листьям мать-и-мачехи.", PK("с. 73"))] },
    lamium: { drugSrc: M2("Lamium album"), ident: [t("Яснотка белая — недопустимая примесь к листьям крапивы.", PK("с. 50"))] },
    petroselinum: { drugSrc: M2("Petroselinum crispum"), usesGen: [t("Петрушка названа среди растений, понижающих кровяное давление.", PK("с. 24"))] },
    abrotanum: { drugSrc: M("Artemisia abrotanum") },
  };
  const TU = {
    calluna: [tu("stress", "Вереск назван среди седативных (успокаивающих) растений.", PK("с. 24"))],
    berberis: [tu("bile", "Берберин из барбариса назван среди желчегонных средств.", PK("с. 45"))],
    petroselinum: [tu("cold", "Петрушка названа среди жаропонижающих растений.", PK("с. 25"))],
  };

  const ETH = {
    trifolium: {
      names: [t("Польск. koniczyna łąkowa (книжн.), koniczyna; в анкетах 1948 г. также konicz, krasikoń, rosikoń; в архиве Фишера koniczyna dzika; литов. raudoni dobilai; в пограничье польск. koniuczyna, литов. dobilas, klever; в травнике Фалимижа (Краков, 1534) — «Trifolium», «konik, chwast».", [...P("Trifolium pratense"), ...L8("16"), ...F("Trifolium pratense", "10"), ...M2("Trifolium pratense"), ...B3("Trifolium pratense"), ...FAL("15")])],
      uses: [
        { r: FIS, c: null, t: "Клевер луговой («koniczyna dzika») пили как освежающий напиток и применяли при «внутренних болезнях» (Оляны).", s: F("Trifolium pratense", "10") },
        { r: POD, c: null, t: "Пастухи понемногу ели клевер луговой (Jostowa, 1967); клевер, вид не уточнён, ели весной в голод (Jostowa, 1954).", s: [...P("Trifolium pratense"), ...P("Trifolium sp.")] },
        { r: PLR, c: null, t: "Соцветия клевера (вероятно, ползучего и лугового) ели в голод до середины XX в.", s: L7("16") },
        { r: PL48, c: null, t: "Дети высасывали нектар из цветков клевера лугового, ползучего и горного (13 местностей).", s: L8("16") },
        { r: BOR, c: null, t: "Сушёные цветки заваривают как повседневный чай, свежие едят как лакомство и кладут в салат.", s: B3("Trifolium pratense") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила цветков 3 т в 1927 г. и 0,5 т в 1928 г.", s: M2("Trifolium pratense") },
      ],
      facts: [
        t("На Подгале верили: кто найдёт на растущем клевере два или четыре листка, будет счастлив (Gustawicz, 1882).", P("Trifolium pratense")),
        t("Если овцы наедятся клевера дома, у них бывает вздутие (Bazińska, 1967).", P("Trifolium sp.")),
        t("Łuczaj (2008) считает, что многие детские лакомства 1948 г. — забытая еда взрослых: цветки клевера ели в голод. Детский интерес к таким растениям был запасным списком съедобного на случай неурожая.", L8("12")),
      ],
    },
    oxalis: {
      names: [t("Польск. szczawik zajęczy (книжн.), zajęczy szczaw, zajęcza kapusta; на Подгале koniczyna zajęcowa, kapusta leśna, kapusta zajęcza; бел. заячы шчавель, кісліца, заячая капуста, верабейкаў шчавель (Любань).", [...L7("17"), ...P("Oxalis acetosella"), ...LW("Oxalis acetosella", "21")])],
      uses: [
        { r: POD, c: null, t: "Листья ели сырыми, в основном дети, раньше и взрослые; впрок не запасали. Весной кислицу ели в голод (Jostowa, 1954), ели её и пастухи (Jostowa, 1967).", s: P("Oxalis acetosella") },
        { r: PLR, c: null, t: "Листья ели сырыми и в супах. Широко ели до XIX–XX вв., теперь только как лакомство на лесной прогулке, но съедобность кислицы общеизвестна.", s: L7("17") },
        { r: LUB, c: null, t: "Свежие листья — лакомство (9 записей) и в салат (1).", s: LW("Oxalis acetosella", "21") },
      ],
      facts: [t("Łuczaj (2008) считает детское лакомство кислицей остатком забытой еды взрослых: из листьев раньше варили суп.", L8("12"))],
    },
    glechoma: {
      names: [t("Польск. bluszczyk kurdybanek (книжн.), kurdybanek, kudron; в анкетах 1948 г. также urbanek, bluszczyk; в Вильно «Szanta», литов. šilingė; в травнике Фалимижа (Краков, 1534) — «Edera terrestris», «bluszcz».", [...L7("16"), ...L8("17"), ...M("Glechoma hederacea"), ...FAL("12")])],
      uses: [
        { r: VIL, c: "throat", t: "Траву продавали «do płukania gardła w stanach zapalnych» — для полоскания горла при воспалении. Фабрика Тарасейских закупила 2 т в 1927 г. и 0,5 т в 1928 г.", s: M("Glechoma hederacea") },
        { r: PLR, c: null, t: "Листья — приправа к супам до начала XX в. (юг Польши).", s: L7("16") },
        { r: "Рабка-Здруй, Польша (анкеты 1948 г.)", c: null, t: "Листья и побеги жарили или клали в суп, сушили впрок.", s: L8("17") },
      ],
      facts: [],
    },
    elymus: {
      names: [t("Польск. perz właściwy (книжн.), perz; в анкетах 1948 г. также pyżowica; бел. пырай, пырей, пырэй (Любань); литов. varputis.", [...L7("18"), ...L8("17"), ...LW("Elymus repens", "23"), ...M2("Elymus repens")])],
      uses: [
        { r: POD, c: null, t: "Промытые и высушенные корневища резали, снова сушили и мололи в муку. Из неё варили на воде кашу, заправленную льняным маслом, суп «bryja perzowa» и пекли лепёшки «moskale». Это была мука бедняков, а в голодные годы её ели все; сбор пырея прекратился после Первой мировой войны, по мере того как деревня богатела.", s: P("Elymus repens") },
        { r: PLR, c: null, t: "Сушёные молотые корневища добавляли в муку для хлеба и лепёшек до середины XX в., варили из них кашу и суп. Хлеб из липового луба и корневищ пырея на Малопольше назывался «pachana»; до XVIII в. из пырея, возможно, варили пиво.", s: L7("18") },
        { r: PL48, c: null, t: "Только как голодная еда до начала XX в.: из муки корневищ пекли хлеб и варили густой суп (19 местностей).", s: L8("17") },
        { r: LUB, c: "joint_pain", t: "Листья прикладывают, а отвар и настойку корней используют при боли в суставах; корнями делают компресс при болезнях глаз. Свежие листья идут в салат, корни — в суп и как приправа к салату.", s: LW("Elymus repens", "23–24") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила корней 4,5 т в 1927 г. и 5 т в 1928 г.", s: M2("Elymus repens") },
      ],
      facts: [t("В Маньовах пырей — единственная трава, которую не святят на праздник Матери Божьей Зельной: «Матерь Божья поранила бы ногу», да и «это дьявольская трава, которая ничего не лечит».", P("Elymus repens"))],
    },
    corylus: {
      names: [t("Польск. leszczyna pospolita (книжн.), orzech laskowy, leszczyna, laska; на Подгале также liska, leszka, liszka; в анкетах 1948 г. orzech leskowy, lescyna, lyska, orzech leśny и др.; бел. арэх (лясны), фундук, арэшына (Любань); в пограничье на польской стороне также arešnik, arešyna, литов. lazdynas, riešutai.", [...L7("15"), ...P("Corylus avellana"), ...L8("16"), ...LW("Corylus avellana", "13"), ...B3("Corylus avellana")])],
      uses: [
        { r: MAN, c: null, t: "Лещиной лечили отмороженные руки и ноги.", s: P("Corylus avellana") },
        { r: POD, c: null, t: "Орехи ели, хранили на зиму и ели в праздники; из прутьев делали большие круглые сита (Маньовы).", s: P("Corylus avellana") },
        { r: PLR, c: null, t: "Орехи до недавнего времени широко собирали во всех регионах, ели сырыми и в десертах, сушили к Рождеству. Серёжки ели в голод по всей Польше; на Малопольше их сушили, мололи и пекли хлеб «obazina» как минимум до конца XIX в.", s: L7("15") },
        { r: PL48, c: null, t: "Сырые орехи, иногда сушёные к Рождеству (29 местностей).", s: L8("16") },
        { r: LUB, c: null, t: "Свежие и сушёные орехи — лакомство.", s: LW("Corylus avellana", "13") },
        { r: BOR, c: null, t: "Сушёные орехи — лакомство; древесиной коптят мясо.", s: B3("Corylus avellana") },
      ],
      facts: [
        t("На Подгале ветки лещины святили на Божье Тело и втыкали в щели стен, чтобы оберегали от молнии; ими украшали алтари вдоль пути процессии, и пепел сожжённых веток тоже защищал от молнии. По поверью, в грозу можно укрыться под лещиной: молния в неё никогда не бьёт.", P("Corylus avellana")),
        t("Раздвоенный лещинный прут, срезанный 25 марта, по рукописи, которую приводит Zdziarski (1901), указывал на клады, спрятанные в Татрах: «всегда показывает, наклоняясь».", P("Corylus avellana")),
        t("Лещину ставили в пасхальную «пальму» (Маньовы); по поверью, на поляне она прибавляет сена (Kujawska и др., 2016).", P("Corylus avellana")),
      ],
    },
    centaurium: {
      names: [t("Польск. centuria pospolita (книжн.), centuria; в архиве Фишера centurja; в Вильно Centurja, литов. širdažolė; в травнике Фалимижа (Краков, 1534) — «Centaurea», «centuria, tysiącznik».", [...P("Centaurium erythraea"), ...F("Centaurium sp.", "7"), ...M("Centaurium erythraea"), ...FAL("11")])],
      uses: [
        { r: POD, c: "gi", t: "Отвар пьют «на желудок» (Köhler, 2018; Маньовы). Щепотку ромашки, золототысячника и мяты варят в воде и, слегка остудив, пьют при резях в животе (Janota, Nowicki, 1865). Применяли и при женских болезнях (Bejnarowicz, 1969).", s: P("Centaurium erythraea") },
        { r: VIL, c: "appetite", t: "Траву продавали «na apetyt i od żołądka» — для аппетита и от желудка.", s: M("Centaurium erythraea") },
        { r: FIS, c: null, t: "Золототысячник записали от «порушения» (народная болезнь; Поляны, а золототысячник красивый — в Свенты Дух) и от боли в печени (Григеляны).", s: [...F("Centaurium sp.", "7"), ...F("Centaurium pulchellum", "7")] },
      ],
      facts: [],
    },
    calluna: {
      names: [t("Польск. wrzos pospolity, wrzos zwyczajny (книжн.), wrzos; бел. вереск (Любань); в Вильно Wrzos.", [...L7("15"), ...LW("Calluna vulgaris", "15"), ...M("Calluna vulgaris")])],
      uses: [
        { r: VIL, c: "joint_pain", t: "Траву продавали для ванн «przy łamaniu w kościach» — при ломоте в костях.", s: M("Calluna vulgaris") },
        { r: LUB, c: null, t: "Сушёные цветки заваривают как повседневный чай.", s: LW("Calluna vulgaris", "15") },
        { r: PLR, c: null, t: "Семена добавляли в голодный хлеб, «вяжущий и тёмный», до начала XX в. (Мазовия).", s: L7("15") },
      ],
      facts: [],
    },
    berberis: {
      names: [t("Польск. berberys zwyczajny, berberys pospolity (книжн.), berberys; в травнике Фалимижа (Краков, 1534) — «Berberus», «berberys, piwnik».", [...L7("13"), ...L8("15"), ...FAL("10")])],
      uses: [
        { r: PLR, c: null, t: "Плоды ели сырыми и делали из них варенье, сок и вино; в 1960-х в некоторых районах их собирали часто, главным образом в Люблинском, Свентокшиском и Мазовии. До середины XX в. плоды клали в капустные блюда вместо уксуса, в 1960-х делали из них наливку.", s: L7("13") },
        { r: PL48, c: null, t: "Плоды ели сырыми и заготавливали впрок, делали из них уксус (4 местности).", s: L8("15") },
      ],
      facts: [t("В Любани барбарис не использовали, и авторы исследования не встретили там ни одного куста.", LWp("31"))],
    },
    veronica: {
      names: [t("В Вильно «Spiwrzód, ziele św. Weroniki» (трава святой Вероники), литов. elprusė.", M("Veronica officinalis"))],
      uses: [
        { r: VIL, c: "gi", t: "Траву продавали «przy wrzodzie żołądka» — при язве желудка. Фабрика Тарасейских закупила 5 т в 1927 г. и 8,5 т в 1928 г.", s: M("Veronica officinalis") },
      ],
      facts: [t("В травнике Фалимижа (Краков, 1534) записана другая вероника, дубравная (Veronica chamaedrys): «Camedreos», «przetacznik».", FAL("15"))],
    },
    arctium: {
      names: [t("На Подгале лопух большой — «gorzki łopuch»; в архиве Фишера лопух малый — obrymaczki, лопух паутинистый — rzepnik; бел. лапух, лопух, ваўчкі, дзяды, дзядоўнік, рапейнік (Любань, лопух паутинистый); литов. varnalėša (лопух большой); в пограничье польск. łopian.", [...P("Arctium lappa"), ...F("Arctium minus", "6"), ...LW("Arctium tomentosum", "8"), ...M2("Arctium lappa"), ...B3("Arctium tomentosum")])],
      uses: [
        { r: POD, c: "skin_infl", t: "Листья лопуха большого — при гнойных болезнях кожи (Маньовы) и при опухоли (Gwiżdż, 1949).", s: P("Arctium lappa") },
        { r: POD, c: "gi", t: "Лист смазывали жиром и клали на живот, всегда черешком вверх, от боли в желудке, если съели что-то нехорошее (Tylkowa, 2000).", s: P("Arctium sp.") },
        { r: FIS, c: null, t: "Лопух малый — от испуга (народная болезнь) у людей и от опухания у коров (Гибы); лопух паутинистый — от «рожи» (народная болезнь; Свенты Дух).", s: [...F("Arctium minus", "6"), ...F("Arctium tomentosum", "6")] },
        { r: LUB, c: "joint_pain", t: "Свежие листья лопуха паутинистого прикладывают при боли в суставах (9 записей), в ногах, коленях и спине, при ревматических болях, ушибах и ранах; свежими корнями натирают больные суставы. Отваром корней и соцветий моют волосы; листья кладут под хлеб, когда пекут.", s: LW("Arctium tomentosum", "8–9") },
        { r: BOR, c: null, t: "Свежие листья лопуха паутинистого — в салат и чтобы сохранить свежее мясо.", s: B3("Arctium tomentosum") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила корней лопуха большого по 0,3 т в 1927 и 1928 гг.", s: M2("Arctium lappa") },
      ],
      facts: [
        t("Барышники на Подгале прицепляли лопух коням к хвостам или гривам, чтобы нашлось много покупателей (Gustawicz, 1882). Лопух иногда святили, но реже других трав.", P("Arctium lappa")),
        t("В Любани лопух паутинистый назвали 27 собеседников, и все 27 — как лекарство; в пищу его упомянул только один.", LWp("37")),
      ],
    },
    lamium: {
      names: [t("Польск. в анкетах 1948 г. martwa pokrzywa, głucha pokrzywa, dzika pokrzywa; в архиве Фишера głucha pokrzywa (Граужишки), porzywa biała (Нарбутовщизна); литов. notrelės.", [...L8("17"), ...F("Lamium album", "8"), ...M2("Lamium album")])],
      uses: [
        { r: FIS, c: "women", t: "Яснотку записали при болезнях сердца и малокровии (Граужишки) и от белей (Нарбутовщизна). В Гибах от белей пили отвар кубышки (или лилии) вместе с ясноткой и клевером ползучим.", s: [...F("Lamium album", "8"), ...F("Nuphar lutea or Lilium sp.", "9"), ...F("Trifolium repens", "10")] },
        { r: PL48, c: null, t: "Дети высасывали нектар из цветков (3 местности); в Панталовицах цветки сушили на чай, а побеги раньше шли в голодный суп.", s: L8("17") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила цветков по 0,3 т в 1927 и 1928 гг.", s: M2("Lamium album") },
      ],
      facts: [],
    },
    petroselinum: {
      names: [t("Бел. пятрушка (Любань); литов. petražolė; в травнике Фалимижа (Краков, 1534) — «Petrosilinum», «piotruszka».", [...LB("Petroselinum crispum"), ...M2("Petroselinum crispum"), ...FAL("13")])],
      uses: [
        { r: LUBc, c: null, t: "Свежую надземную часть и листья едят «для мужского здоровья» и для потенции.", s: LB("Petroselinum crispum") },
      ],
      facts: [],
    },
    abrotanum: {
      names: [t("Польск. boże drzewko (архив Фишера; Вильно); в травнике Фалимижа (Краков, 1534) — «Abrotanum», «boże drzewko».", [...F("Artemisia abrotanum", "6"), ...M("Artemisia abrotanum"), ...FAL("10")])],
      uses: [
        { r: VIL, c: "menstrual", t: "Траву продавали «przy zatrzymaniu miesięcznych krwawień» — при задержке месячных.", s: M("Artemisia abrotanum") },
        { r: FIS, c: "wounds", t: "От ран (Поляны). В таблице растение записано как Artemisia annua с пометкой [A. abrotanum].", s: F("Artemisia annua", "6") },
        { r: "Ковно, Литва (архив Фишера, 1929–1935)", c: null, t: "Выращивали в домашних огородах.", s: F("Artemisia abrotanum", "6") },
      ],
      facts: [],
    },
  };

  const GAPS = "Способ приготовления и показания EMA не заполнены: в использованных источниках их нет, а сайт EMA сейчас недоступен.";
  for (const p of PL) {
    if (TU[p.id]) p.uses = TU[p.id];
    p.gaps = [GAPS, p.note2].filter(Boolean).join(" ");
    if (!D.PLANTS.some((x) => x.id === p.id)) D.PLANTS.push(p);
  }
  for (const k in T) add(window.TEXTS.plants, k, T[k]);
  if (E) for (const k in ETH) add(E.plants, k, ETH[k]);
})();
