/* Растения из подборки статей (волна 4): виды без учебной монографии в подборке, с записанным применением.
   Устроено как plants6.js: народное применение по статьям, учебные поля пустые, если источника нет.
   Подключается после plants6.js и до parts.js. */
(function () {
  const D = window.DATA, E = window.ETHNO;
  const add = (o, k, v) => { if (o && !(k in o)) o[k] = v; };
  const s = (id, loc) => [{ id, loc }];
  const PK = (loc) => s("eth_poliksenova2020", loc);
  const LW = (lat, p) => s("by2017", `Table 1, ${lat}, с. ${p}`);   // Любань, дикорастущие (2016)
  const LWp = (p) => s("by2017", `с. ${p}`);
  const F = (lat, p) => s("pl2017", `Table 3, ${lat}, с. ${p}`);       // архив Фишера
  const P = (lat) => s("eth_kustosz2018", "Załącznik 1, hasło " + lat); // Подгале
  const M = (lat) => s("fk_petkevicius2014", "Tab. 1, " + lat);        // рынок в Вильно и фабрики
  const M2 = (lat) => s("fk_petkevicius2014", "Tab. 2, " + lat);       // только фабрики
  const FAL = (p) => s("eth_kozlowska2018", "Table 3" + (p ? `, с. ${p}` : ""));  // травник Фалимижа, Краков, 1534
  const L7 = (p) => s("eth_luczaj2007", `с. ${p}`);
  const L8 = (p) => s("eth_luczaj2008", `с. ${p}`);
  const B3 = (lat) => s("eth_prakofjewa2023", "Table 2, " + lat);
  const t = (text, src) => ({ t: text, s: src });

  const VIL = "Вильно, рынок трав (1927–1928)";
  const SVE = "Свенцяны, фабрика Тарасейских (1927–1928)";
  const FIS = "Пограничье PL-LT-BY, архив Фишера (1929–1935)";
  const POD = "Польша, Подгале";
  const MAN = "Подгале, Польша (Маньовы)";
  const LUB = "Любань, Минская обл., Беларусь (2016)";
  const PL48 = "Польша, анкеты 1948 г.";
  const BOR = "Пограничье PL-LT-BY (2018–2019)";
  const PLR = "Польша (обзор Łuczaj, Szymański, 2007)";

  const NOMONO = "Учебной монографии по этому виду в использованных источниках нет, поэтому описание, состав, сбор и сушка не заполнены.";

  const PL = [
    { id: "uliginosum", ru: "Голубика", lat: "Vaccinium uliginosum", fam: "Вересковые (Ericaceae)", famSrc: P("Vaccinium uliginosum"),
      drug: { ru: "Плоды голубики", lat: "" }, part: "berry", countries: { pl: "w", by: "w" },
      distSrc: [...L7("16"), ...LW("Vaccinium uliginosum", "17")],
      art: { kind: "berry", berry: "#3d4f8a", leaf: "#7f9a8a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой называет голубику только как возможную примесь к плодам черники." },
    { id: "mentha_wild", ru: "Мята (дикорастущие виды)", lat: "Mentha spp.", fam: "Яснотковые (Lamiaceae)", famSrc: P("Mentha arvensis"),
      drug: { ru: "Трава, листья и цветки мяты", lat: "" }, part: "herb", countries: { pl: "w" },
      distSrc: P("Mentha arvensis"),
      art: { kind: "leaf", shape: "ovate", pairs: 4, leaf: "#5d8f4a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Страница собирает записи о мяте полевой, курчавой (колосистой), длиннолистной и о мяте без указания вида; мята перечная — отдельная страница. Вид указан в каждой записи, где источник его называет." },
    { id: "artemisia_v", ru: "Полынь обыкновенная", lat: "Artemisia vulgaris", fam: "Сложноцветные (Asteraceae)", famSrc: P("Artemisia vulgaris"),
      drug: { ru: "Трава и корневища полыни обыкновенной", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...P("Artemisia vulgaris"), ...LW("Artemisia vulgaris", "9")],
      art: { kind: "leaf", shape: "lanceolate", pairs: 4, leaf: "#6f8064" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "potentilla_ans", ru: "Лапчатка гусиная", lat: "Potentilla anserina", fam: "Розовые (Rosaceae)", famSrc: P("Potentilla anserina"),
      drug: { ru: "Трава и корни лапчатки гусиной", lat: "" }, part: "herb", countries: { pl: "w" },
      distSrc: [...P("Potentilla anserina"), ...L7("19")],
      art: { kind: "flower", petal: "#f2d23c", center: "#d4a51c", petals: 5, small: true, leaf: "#9fb3a0" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "thymus_pul", ru: "Тимьян блошиный", lat: "Thymus pulegioides", fam: "Яснотковые (Lamiaceae)", famSrc: P("Thymus pulegioides"),
      drug: { ru: "Трава тимьяна блошиного", lat: "" }, part: "herb", countries: { pl: "w" },
      distSrc: [...P("Thymus pulegioides"), ...L7("17")],
      art: { kind: "flower", petal: "#c98fc0", center: "#9a5f92", petals: 4, small: true, leaf: "#6f8f5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " В народе его не отличают от тимьяна ползучего (чабреца), который описан отдельной страницей: по Łuczaj (2007), на Подгале «macierzanka» — именно тимьян блошиный." },
    { id: "carlina", ru: "Колючник бесстебельный", lat: "Carlina acaulis", fam: "Сложноцветные (Asteraceae)", famSrc: P("Carlina acaulis"),
      drug: { ru: "Корни, листья и трава колючника", lat: "" }, part: "root", countries: { pl: "w" },
      distSrc: [...P("Carlina acaulis"), ...L7("12")],
      art: { kind: "flower", petal: "#efe8d6", center: "#c9a96a", petals: 16, leaf: "#7f8f6a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Лекарственное применение в источниках названо только в общем виде («для лечения людей и животных»); гораздо подробнее описана обрядовая роль." },
    { id: "nuphar", ru: "Кубышка жёлтая", lat: "Nuphar lutea", fam: "",
      drug: { ru: "Листья, цветки и корневища кубышки", lat: "" }, part: "leaf", countries: {},
      art: { kind: "flower", petal: "#f0cf2c", center: "#c49a14", petals: 5, leaf: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Семейство в источниках подборки не названо. Записи только из Литвы и пограничья, поэтому страны не отмечены. В архиве Фишера одна запись сделана с оговоркой: «кубышка или лилия»." },
    { id: "urtica_urens", ru: "Крапива жгучая", lat: "Urtica urens", fam: "Крапивные (Urticaceae)", famSrc: P("Urtica urens"),
      drug: { ru: "Трава крапивы жгучей", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...P("Urtica urens"), ...LW("Urtica urens", "30")],
      art: { kind: "leaf", shape: "ovate", pairs: 3, leaf: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой упоминает её только как недопустимую примесь к листьям крапивы двудомной." },
    { id: "lycopodium", ru: "Плаун булавовидный", lat: "Lycopodium clavatum", fam: "Плауновые (Lycopodiaceae)", famSrc: P("Lycopodium clavatum"),
      drug: { ru: "Трава плауна", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...P("Lycopodium clavatum"), ...PK("с. 13")],
      art: { kind: "horsetail", leaf: "#3f6a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой называет плаун булавовидный среди важнейших дикорастущих лекарственных растений Беларуси, но монографии не даёт. О ядовитости плауна источники подборки ничего не пишут; это не значит, что он безопасен." },
    { id: "populus", ru: "Осина", lat: "Populus tremula", fam: "Ивовые (Salicaceae)", famSrc: P("Populus tremula"),
      drug: { ru: "Кора, почки и листья осины", lat: "" }, part: "bark", countries: { pl: "w", by: "w" },
      distSrc: [...P("Populus tremula"), ...LW("Populus tremula", "18")],
      art: { kind: "bark", bark: "#8f9a86", leaf: "#7f9a5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "acer", ru: "Клён остролистный", lat: "Acer platanoides", fam: "Кленовые (Aceraceae)", famSrc: L7("12"),
      drug: { ru: "Листья и сок клёна", lat: "" }, part: "leaf", countries: { pl: "w", by: "w" },
      distSrc: [...L7("12"), ...LW("Acer platanoides", "28")],
      art: { kind: "leaf", shape: "ovate", pairs: 2, leaf: "#6f9a3f" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
    { id: "polypodium", ru: "Многоножка обыкновенная", lat: "Polypodium vulgare", fam: "Многоножковые (Polypodiaceae)", famSrc: P("Polypodium vulgare"),
      drug: { ru: "Корневища многоножки", lat: "" }, part: "root", countries: { pl: "w" },
      distSrc: [...P("Polypodium vulgare"), ...L7("18")],
      art: { kind: "root", root: "#8a6a42", top: "#4f7a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
  ];

  const T = {
    uliginosum: { drugSrc: L7("16"), ident: [t("Голубика названа среди возможных примесей к плодам черники.", PK("с. 56"))] },
    mentha_wild: { drugSrc: P("Mentha sp.") },
    artemisia_v: { drugSrc: M("Artemisia vulgaris") },
    potentilla_ans: { drugSrc: P("Potentilla anserina") },
    thymus_pul: { drugSrc: P("Thymus pulegioides") },
    carlina: { drugSrc: P("Carlina acaulis") },
    nuphar: { drugSrc: [...F("Nuphar lutea", "9"), ...M("Nuphar lutea")] },
    urtica_urens: { drugSrc: P("Urtica urens"), ident: [t("Крапива жгучая — недопустимая примесь к листьям крапивы двудомной.", PK("с. 50"))] },
    lycopodium: { drugSrc: P("Lycopodium clavatum") },
    populus: { drugSrc: LW("Populus tremula", "18") },
    acer: { drugSrc: [...LW("Acer platanoides", "28"), ...L7("12")] },
    polypodium: { drugSrc: P("Polypodium vulgare") },
  };

  const ETH = {
    uliginosum: {
      names: [t("Польск. borówka bagienna (книжн.), pijanica, łochynia, wochynia, bagnówka; на Подгале czarcie borówki, solanki; в анкетах 1948 г. также włochynia, łochina, mochynia, wołochy, zajęcza jagoda; бел. буякі, галубіка (Любань); в пограничье польск. pjanicy, литов. galubika, girtuoklės.", [...L7("16"), ...P("Vaccinium uliginosum"), ...L8("16"), ...LW("Vaccinium uliginosum", "17"), ...B3("Vaccinium uliginosum")])],
      uses: [
        { r: MAN, c: null, t: "Голубикой лечили отравления; плоды на Подгале едят.", s: P("Vaccinium uliginosum") },
        { r: LUB, c: null, t: "Свежие плоды едят прямо с куста (21 запись), варят варенье (19) и компот; компот пьют при малокровии и «плохой крови», сушёные плоды — при простуде, чай из плодов — как мочегонное.", s: LW("Vaccinium uliginosum", "17") },
        { r: PLR, c: null, t: "Плоды ели сырыми и в заготовках, часто подмешивали к чернике. Их хмельное действие, похожее на алкогольное, широко известно и отражено в названиях (pijanica — «пьяница»), а отношение к съедобности разное в разных деревнях. В 1960-х голубику собирали широко, теперь реже; в Поморье из плодов варили суп.", s: L7("16") },
        { r: PL48, c: null, t: "Плоды ели сырыми, делали сок, варенье, суп и компот (10 местностей).", s: L8("16") },
        { r: BOR, c: null, t: "Компот, варенье, десерт.", s: B3("Vaccinium uliginosum") },
      ],
      facts: [t("В Любани голубику назвали 48 собеседников, больше, чем землянику (45); почти все говорили о ней как о еде.", LWp("37"))],
    },
    mentha_wild: {
      names: [t("Польск. mięta, miętka; мята полевая — mięta polna; в Вильно мята курчавая — «Mięta kędzierzawa», мята длиннолистная — «Mięta puchowa»; в пограничье польск. mėta, miata, mięta, miedzinaja, литов. mėta, pipirmėtė, mėtos; в травнике Фалимижа (Краков, 1534) мята колосистая — «Menta», «miętka».", [...P("Mentha sp."), ...P("Mentha arvensis"), ...M("Mentha spicata"), ...M("Mentha longifolia"), ...B3("Mentha spp."), ...FAL("13")])],
      uses: [
        { r: MAN, c: "diarrhea", t: "От боли в животе и поноса пьют крепкий настой по стакану несколько раз в день, пока не пройдёт. Мяту пьют также при скарлатине и после рвоты, при болезнях пищеварения, «катаре желудка», для печени и лучшего пищеварения.", s: P("Mentha sp.") },
        { r: POD, c: "gi", t: "Щепотку ромашки, золототысячника и мяты бросают в кипяток и пьют слегка остывшим при резях в животе (Janota, Nowicki, 1865); от боли в желудке пьют мяту, сваренную в воде (Kantor, 1907). Мяту прикладывают и к ранам.", s: P("Mentha sp.") },
        { r: VIL, c: "gi", t: "Траву мяты курчавой продавали «od bólów żołądka» — от болей в желудке; с тем же назначением продавали листья мяты длиннолистной.", s: [...M("Mentha spicata"), ...M("Mentha longifolia")] },
        { r: POD, c: null, t: "Мятой заправляют чесночный суп «czosnianka» из картофеля, чеснока и лука и яичницу (Zegadłówna, 1985); мята полевая шла в кислую молочную похлёбку (Jostowa, 1967).", s: [...P("Mentha sp."), ...P("Mentha arvensis")] },
        { r: PLR, c: null, t: "Листья мяты полевой — приправа к супу «warmuz» из мари и крапивы до начала или середины XX в. (Малопольша).", s: L7("16") },
        { r: BOR, c: null, t: "Сушёную траву заваривают как повседневный чай, ею приправляют еду и берёзовый сок.", s: B3("Mentha spp.") },
      ],
      facts: [
        t("Udziela (1891) записал на Подгале обратное: отвар мяты при болезнях желудка вызывает рвоту.", P("Mentha sp.")),
        t("Мяту святили в букетах на Матерь Божью Зельную; освящёнными травами потом окуривали коров на святую Люцию и перед первым выгоном, чтобы ведьмы не отняли молоко (Jostowa, 1978).", P("Mentha sp.")),
      ],
    },
    artemisia_v: {
      names: [t("Польск. bylica pospolita (книжн.), bylica; на Подгале bielica; бел. чарнабыльнік, чорны палын, быльнік (Любань); литов. kietis.", [...P("Artemisia vulgaris"), ...F("Artemisia vulgaris", "6"), ...LW("Artemisia vulgaris", "9"), ...M("Artemisia vulgaris")])],
      uses: [
        { r: POD, c: "gi", t: "Отвар пьют при параличе (Gustawicz, 1882). При кровавом поносе едят полынь, подорожник, щавель, тмин, яйца и брынзу, поджаренные на масле (Kujawska и др., 2016).", s: P("Artemisia vulgaris") },
        { r: FIS, c: null, t: "От общей слабости и от испуга (народная болезнь) (Гибы).", s: F("Artemisia vulgaris", "6") },
        { r: VIL, c: "resp", t: "Траву продавали «przy duszności» — при одышке. Фабрика Тарасейских закупила травы по 1 т в 1927 и 1928 гг.; корневища тоже были в продаже.", s: M("Artemisia vulgaris") },
        { r: LUB, c: "diarrhea", t: "Чай из травы пьют от поноса; свежую заваривают как повседневный чай; сушёную дают коровам при крови в моче.", s: LW("Artemisia vulgaris", "9") },
        { r: POD, c: null, t: "Полынь варят с капустным рассолом и дают коровам и овцам, если после родов не отходит послед (Gustawicz, 1882).", s: P("Artemisia vulgaris") },
      ],
      facts: [
        t("На Подгале полынь святили на Матерь Божью Зельную и вместе с укропом и васильком окуривали ею от сглаза (Gustawicz, 1882). Особенно она связана с днём святого Яна: освящённой в канун Яна окуривали людей и скот (Bazińska, 1967).", P("Artemisia vulgaris")),
        t("Чтобы отогнать ведьм, до восхода солнца шли на девятую межу, собирали полынь, тимьян и колокольчики, сушили их и окуривали хлев.", [...P("Artemisia vulgaris"), ...P("Thymus pulegioides")]),
      ],
    },
    potentilla_ans: {
      names: [t("Польск. pięciornik gęsi (книжн.); на Подгале srebrnik, kurze ziele; в Вильно «Pięciornik»; литов. sidabražolė.", [...L7("19"), ...P("Potentilla anserina"), ...M("Potentilla anserina"), ...M2("Potentilla anserina")])],
      uses: [
        { r: POD, c: "gi", t: "Корень, сваренный в молоке, пьют при разных расстройствах и болях в желудке (Kujawska и др., 2016); маленьким детям от грыжи давали приправленный корень, жаренный на масле.", s: P("Potentilla anserina") },
        { r: VIL, c: "gastritis", t: "Траву продавали «od kataru żołądka» — от катара желудка. В таблице растение рынка записано как Potentilla argentea; авторы относят его к лапчатке гусиной с оговоркой.", s: M("Potentilla anserina") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила травы 1,2 т в 1927 г. и 3 т в 1928 г.", s: M2("Potentilla anserina") },
        { r: PLR, c: null, t: "Молодые побеги ели сырыми как салат в середине XX в. (Подляшье).", s: L7("19") },
      ],
      facts: [t("На Подгале лапчатку святили для скота; если молоко не сбивалось в масло, освящённую лапчатку клали под мутовку (Kujawska и др., 2016).", P("Potentilla anserina"))],
    },
    thymus_pul: {
      names: [t("Польск. macierzanka zwyczajna (книжн.), macierzanka; на Подгале также macierzyduszka; в архиве Фишера macierzanka (Гибы), czombor (Оляны); в пограничье czambor, czamborek, čabrjelaj, chabrets.", [...L7("17"), ...P("Thymus pulegioides"), ...F("Thymus pulegioides", "10"), ...B3("Thymus pulegioides")])],
      uses: [
        { r: POD, c: "gi", t: "Окуривание тимьяном помогает при болях под грудью и ниже; от боли в желудке пьют тимьян, сваренный в воде; при «колотье» внутри делают из него компрессы (Gustawicz, 1882; Kantor, 1907).", s: P("Thymus pulegioides") },
        { r: POD, c: "skin", t: "Настой пили, в нём купались и делали сидячие ванночки; ванны особенно делали младенцам с сыпью (Tylkowa, 2000).", s: P("Thymus pulegioides") },
        { r: MAN, c: "joint_pain", t: "Отвар — «лучшее средство» от ревматизма; ванны с тимьяном берегли детей от рахита и помогали при боли в ногах. Чаем лечили туберкулёз, боли в животе и болезни почек, цветками — женские болезни.", s: P("Thymus pulegioides") },
        { r: FIS, c: "resp", t: "Тимьян — «от всех болезней» (Гибы) и от воспаления лёгких (Оляны).", s: F("Thymus pulegioides", "10") },
        { r: PLR, c: null, t: "Листья ели вместе с листьями бодяка, ошпарив, вероятно как приправу, до рубежа XIX–XX вв. (Малопольша).", s: L7("17") },
        { r: BOR, c: null, t: "Чай и приправа.", s: B3("Thymus pulegioides") },
      ],
      facts: [
        t("Освящённый на Божье Тело тимьян вплетали в венки, которые хранили дома от грозы (Маньовы); им окуривали овец перед первым выпасом (Bazińska, 1967), и он входил в травы, которыми кормили корову после отёла (Köhler, 2018).", P("Thymus pulegioides")),
        t("В Гибах тимьян святили на Матерь Божью Зельную.", F("Thymus pulegioides", "10")),
      ],
    },
    carlina: {
      names: [t("Польск. dziewięćsił bezłodygowy (книжн.), dziewięćsił, dziewięcioł, rzepik; на Подгале dziewięciornik, dziewierciok; в анкетах 1948 г. oset; в травнике Фалимижа (Краков, 1534) — «Herba victorialis», «dziewięsił».", [...L7("12"), ...P("Carlina acaulis"), ...L8("15"), ...FAL("11")])],
      uses: [
        { r: POD, c: null, t: "Колючником лечили людей и животных (Kantor, 1991); подробностей источник не даёт.", s: P("Carlina acaulis") },
        { r: POD, c: null, t: "Рубленые листья варили с другими травами в «warmuz»; корень ели в голод (Kolberg).", s: P("Carlina acaulis") },
        { r: PLR, c: null, t: "Корни ели до середины XIX в., цветоложа — дети-пастухи до рубежа XIX–XX вв. (Малопольша, Силезия).", s: L7("12") },
      ],
      facts: [
        t("Название dziewięćsił значит «девять сил»: освящённым корнем окуривали скот, и это, по поверью, действовало как девять других трав (Gustawicz, 1882); колючник святили до девяти раз (Kujawska и др., 2016).", P("Carlina acaulis")),
        t("Освящённым на Зельную колючником окуривали коров на святую Люцию и перед первым выгоном, крошили его в воду коровам после отёла, а бача обходил с ним загон, чтобы ведьмы не отняли молоко (Jostowa, 1978).", P("Carlina acaulis")),
        t("Цветок колючника — один из любимых мотивов подгальского орнамента.", P("Carlina acaulis")),
      ],
    },
    nuphar: {
      names: [t("В архиве Фишера łoteć, а также gribilija, żółta lilja (кубышка или лилия); в Вильно «Żółta róża wodna» (жёлтая водяная роза); в травнике Фалимижа (Краков, 1534) — «Ungula caballina», «końskie kopyto, grazel».", [...F("Nuphar lutea", "9"), ...M("Nuphar lutea"), ...FAL("13")])],
      uses: [
        { r: "Янов-над-Вилией, архив Фишера (1929–1935)", c: "wounds", t: "«Большие листья этого жёлтого цветка кладут на рану: они холодные и вытягивают жар».", s: F("Nuphar lutea", "9") },
        { r: "Гибы, архив Фишера (1929–1935)", c: "women", t: "Отвар кубышки (или лилии) вместе с ясноткой белой и клевером ползучим — от головной боли, кожных воспалений, «рожи» и белей.", s: F("Nuphar lutea or Lilium sp.", "9") },
        { r: VIL, c: null, t: "Цветки и корневища продавали «od bezpłodności i od róży» — от бесплодия и от «рожи». Корневища белой кувшинки («Biała róża wodna») продавали от «рожи».", s: [...M("Nuphar lutea"), ...M("Nymphaea alba")] },
      ],
      facts: [t("На Подгале записано, что белую кувшинку прикладывали к ранам (Udziela, 1891), но автор перечня сомневается: на Подгале этот вид не растёт.", P("Nymphaea alba"))],
    },
    urtica_urens: {
      names: [t("Польск. pokrzywa żegawka (книжн.); на Подгале żegawica, żygawica; в архиве Фишера rzerzuszka; бел. крапіва пякучка, крапіва жыжка (Любань); литов. dirgalas.", [...P("Urtica urens"), ...F("Urtica urens", "11"), ...LW("Urtica urens", "30"), ...B3("Urtica urens")])],
      uses: [
        { r: POD, c: null, t: "От зубной боли (Köhler, 2018); прикладывают при коликах, а отвар пьют, когда внутри «колет» (Gustawicz, 1882).", s: P("Urtica urens") },
        { r: "Граужишки, архив Фишера (1929–1935)", c: "joint_pain", t: "От паралича, наружных язв и ревматизма.", s: F("Urtica urens", "11") },
        { r: LUB, c: null, t: "Отваром моют волосы; свежую траву кладут в суп (4 записи) и перекладывают ею продукты, чтобы не портились; дают цыплятам и индюшатам.", s: LW("Urtica urens", "30") },
        { r: BOR, c: null, t: "Листья варят в суп.", s: B3("Urtica urens") },
      ],
      facts: [t("Чтобы масло хорошо сбивалось и молоко не сглазили, на Подгале вшивали листья жгучей крапивы в цедилку и через неё цедили молоко (Bazińska, 1967).", P("Urtica urens"))],
    },
    lycopodium: {
      names: [t("Польск. widłak goździsty (книжн.); на Подгале mech ziemny; в архиве Фишера widlak-dziercza; в травнике Фалимижа (Краков, 1534) — «Spica celtica», «widłak, babimur».", [...P("Lycopodium clavatum"), ...F("Lycopodium clavatum", "8"), ...FAL("13")])],
      uses: [
        { r: POD, c: "skin", t: "Из плауна делают мазь от всех кожных болезней (Tylkowa, 2000).", s: P("Lycopodium clavatum") },
        { r: "Оляны, архив Фишера (1929–1935)", c: "wounds", t: "От ран.", s: F("Lycopodium clavatum", "8") },
      ],
      facts: [
        t("Плаун, по подгальскому поверью, «заговаривает» всех глистов и червячков (Bazińska, 1967); его собирали на продажу подгальские корнейщики (Eljasz-Radzikowski, 1897).", P("Lycopodium clavatum")),
        t("Учебник Поликсеновой называет плаун булавовидный среди важнейших дикорастущих лекарственных растений Беларуси.", PK("с. 13")),
      ],
    },
    populus: {
      names: [t("Польск. osika; бел. асіна, тополь (Любань).", [...P("Populus tremula"), ...LW("Populus tremula", "18")])],
      uses: [
        { r: LUB, c: "joint_pain", t: "Компресс из коры и настойка почек — при боли в суставах; растёртую кору едят при болезнях почек (2 записи); отвар и настойку коры считают средством «от всего», чай — для иммунитета. Листья прикладывают к ранам, палки кладут в постель при боли в ногах.", s: LW("Populus tremula", "18") },
        { r: "Оляны, архив Фишера (1929–1935)", c: null, t: "Осиной дезинфицировали дом.", s: F("Populus tremula", "9") },
        { r: POD, c: null, t: "Знахари готовили лекарства для овец на огне из осиновых дров (Bazińska, 1967).", s: P("Populus tremula") },
      ],
      facts: [t("Осиновым колом, по подгальскому поверью, пригвождали к земле чёрта в человеческом облике или колдуна, а ведьму — за косу; им же пробивали сердце покойнику, заподозренному в упырстве (Bazińska, 1967).", P("Populus tremula"))],
    },
    acer: {
      names: [t("Польск. klon zwyczajny, klon pospolity (книжн.), klon; бел. клён (Любань).", [...L7("12"), ...LW("Acer platanoides", "28")])],
      uses: [
        { r: LUB, c: "wounds", t: "Сушёные листья с веток, освящённых на Троицу, прикладывали к ранам. Свежий сок пьют (10 записей), из него делают квас и сироп; листья кладут под хлеб при выпечке, веточками парятся в бане «для здоровья».", s: LW("Acer platanoides", "28") },
        { r: PLR, c: null, t: "Сок пили свежим, по меньшей мере до 1960-х; переселенцы из Литвы и Беларуси сбраживали его в пиво. До начала XX в. дети ели камбий и плоды, а раскрывающиеся почки квасили для супа (Мазовия); листья клали в печь под хлеб.", s: L7("12") },
        { r: PL48, c: null, t: "Сок пили сырым (3 местности).", s: L8("15") },
      ],
      facts: [t("Лечение ран листьями с освящённых на Троицу веток авторы любанского исследования считают одним из немногих остатков «магического мышления» в практичной домашней медицине Беларуси.", LWp("39"))],
    },
    polypodium: {
      names: [t("Польск. paprotka zwyczajna (книжн.), słodyczka; на Подгале słodki korzeń, paprótka; в анкетах 1948 г. paproć, paprótka; в травнике Фалимижа (Краков, 1534) — «Polipodium», «paprotka».", [...L7("18"), ...P("Polypodium vulgare"), ...L8("18"), ...FAL("14")])],
      uses: [
        { r: POD, c: "cold", t: "При простуде корневищем увлажняют рот (Köhler, 2018). Отвар корней пьют от головокружения, а освящённую многоножку прикладывают при зубной боли (Gustawicz, 1882).", s: P("Polypodium vulgare") },
        { r: POD, c: null, t: "Дети-пастухи ели корневище как сладко-горькое лакомство; ели его и в голод.", s: P("Polypodium vulgare") },
        { r: PLR, c: null, t: "Сырые корневища — лакомство пастухов до середины XX в. (Мазовия, Малопольша).", s: L7("18") },
        { r: PL48, c: null, t: "Корневища — детское лакомство (3 местности на Подгале и рядом).", s: L8("18") },
      ],
      facts: [
        t("Многоножкой, по поверью, больше всего любят питаться дзивожоны — демонические существа, вредящие роженицам и девушкам (Goszczyński, 1853; Stęczyński, 1860).", P("Polypodium vulgare")),
        t("Собранную в канун святого Яна и освящённую многоножку держали от зла и ею лечили коров (Bazińska, 1967).", P("Polypodium vulgare")),
      ],
    },
  };

  const GAPS = "Способ приготовления и показания EMA не заполнены: в использованных источниках их нет, а сайт EMA сейчас недоступен.";
  for (const p of PL) { p.gaps = [GAPS, p.note2].filter(Boolean).join(" "); if (!D.PLANTS.some((x) => x.id === p.id)) D.PLANTS.push(p); }
  for (const k in T) add(window.TEXTS.plants, k, T[k]);
  if (E) for (const k in ETH) add(E.plants, k, ETH[k]);
})();
