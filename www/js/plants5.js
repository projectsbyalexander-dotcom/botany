/* Растения из подборки статей (волна 3): виды, которых нет в учебниках подборки как монографий.
   Почти всё здесь — народное применение по статьям; учебные поля (состав, описание, сбор) пустые, потому что источника нет.
   Подключается после plants4.js и до app.js. */
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
  const KZ = (p) => s("eth_kozlowska2018", `с. ${p}`);
  const L7 = (p) => s("eth_luczaj2007", `с. ${p}`);
  const L8 = (p) => s("eth_luczaj2008", `с. ${p}`);
  const B3 = (lat) => s("eth_prakofjewa2023", "Table 2, " + lat);
  const B3p = (p) => s("eth_prakofjewa2023", `с. ${p}`);
  const P24 = (p) => s("eth_prakofjewa2024", `с. ${p}`);
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
    { id: "rubus", ru: "Малина обыкновенная", lat: "Rubus idaeus", fam: "Розовые (Rosaceae)", famSrc: s("eth_soukand2013", "Table 2"),
      drug: { ru: "Трава и плоды малины", lat: "" }, part: "berry", countries: { pl: "w", by: "w" },
      distSrc: [...L7("19"), ...LW("Rubus idaeus", "26")],
      art: { kind: "berry", berry: "#d8343a", leaf: "#5d7f42", cluster: true },
      compounds: "", uses: [tu("cold", "Малина названа среди жаропонижающих растений.", PK("с. 25"))], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет малину среди жаропонижающих растений." },
    { id: "cichorium", ru: "Цикорий обыкновенный", lat: "Cichorium intybus", fam: "Сложноцветные (Asteraceae)", famSrc: PK("с. 29–30"),
      drug: { ru: "Трава и корни цикория", lat: "" }, part: "root", countries: { pl: "w" },
      distSrc: L7("13"),
      art: { kind: "flower", petal: "#7d9be0", center: "#4c67b0", petals: 12, leaf: "#6f8f5a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Из учебного есть только одно: цикорий относится к официнальным растениям, содержащим инулин." },
    { id: "symphytum", ru: "Окопник лекарственный", lat: "Symphytum officinale", fam: "Бурачниковые (Boraginaceae)", famSrc: P("Symphytum officinale"),
      drug: { ru: "Корни окопника", lat: "" }, part: "root", countries: { pl: "w", by: "w" },
      distSrc: [...P("Symphytum officinale"), ...LW("Symphytum officinale", "13")],
      art: { kind: "flower", petal: "#8a4d8f", center: "#5c2f60", petals: 5, small: true, leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " О безопасности приёма окопника внутрь источники подборки ничего не пишут." },
    { id: "rumex", ru: "Щавель кислый", lat: "Rumex acetosa", fam: "Гречишные (Polygonaceae)", famSrc: [...P("Rumex acetosa"), ...B3("Rumex acetosa")],
      drug: { ru: "Листья щавеля", lat: "" }, part: "leaf", countries: { pl: "w", by: "w" },
      distSrc: [...L7("18"), ...LW("Rumex spp.", "24")],
      art: { kind: "leaf", shape: "lanceolate", pairs: 3, leaf: "#5d8f3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Щавель в статьях — прежде всего еда; в Любани его записали вместе с другими видами щавеля (Rumex spp.)." },
    { id: "chenopodium", ru: "Марь белая", lat: "Chenopodium album", fam: "Маревые (Chenopodiaceae)", famSrc: P("Chenopodium album"),
      drug: { ru: "Листья мари", lat: "" }, part: "leaf", countries: { pl: "w", by: "w" },
      distSrc: [...L7("14"), ...LW("Chenopodium album", "7")],
      art: { kind: "leaf", shape: "ovate", pairs: 3, leaf: "#8aa07a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " В любанской статье марь отнесена к амарантовым (Amaranthaceae), на Подгале — к маревым. Лекарственного применения в статьях почти нет: это голодная еда." },
    { id: "armoracia", ru: "Хрен обыкновенный", lat: "Armoracia rusticana", fam: "Крестоцветные (Brassicaceae)", famSrc: P("Armoracia rusticana"),
      drug: { ru: "Корни и листья хрена", lat: "" }, part: "root", countries: { pl: "w", by: "w" },
      distSrc: [...L7("14"), ...LW("Armoracia rusticana", "13")],
      art: { kind: "root", root: "#efe3c4", top: "#6f9a4f" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Польша отмечена как дикорастущий вид: по обзору 2007 г. корни обычно собирают в природе, а не в огороде." },
    { id: "oxycoccus", ru: "Клюква болотная", lat: "Vaccinium oxycoccos", fam: "Вересковые (Ericaceae)", famSrc: L8("16"),
      drug: { ru: "Плоды клюквы", lat: "" }, part: "berry", countries: { pl: "w", by: "w" },
      distSrc: [...L7("7"), ...LW("Vaccinium oxycoccos", "16")],
      art: { kind: "berry", berry: "#b3202d", leaf: "#4f6b3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " В таблице Петкявичюса и др. вид назван Oxycoccus palustris." },
    { id: "ribes", ru: "Смородина чёрная", lat: "Ribes nigrum", fam: "Крыжовниковые (Grossulariaceae)", famSrc: LB("Ribes nigrum"),
      drug: { ru: "Листья чёрной смородины", lat: "" }, part: "leaf", countries: { pl: "c", by: "c" },
      distSrc: [...L7("16"), ...LB("Ribes nigrum")],
      art: { kind: "berry", berry: "#2b2238", leaf: "#5d7f42", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой лишь называет смородину среди витаминоносных растений и среди возможных примесей к плодам черники. Страны отмечены как культура: листья для засолки берут почти только с садовых кустов, а любанская статья описывает огородные растения." },
    { id: "marrubium", ru: "Шандра обыкновенная", lat: "Marrubium vulgare", fam: "Яснотковые (Lamiaceae)", famSrc: P("Marrubium vulgare"),
      drug: { ru: "Листья шандры", lat: "" }, part: "leaf", countries: { pl: "w" },
      distSrc: P("Marrubium vulgare"),
      art: { kind: "flower", petal: "#f2f0e6", center: "#c9c4a8", petals: 5, small: true, leaf: "#9aa68a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Записей о шандре в статьях подборки мало: одна с Подгале и одно имя в травнике Фалимижа." },
    { id: "viscum", ru: "Омела белая", lat: "Viscum album", fam: "Санталовые (Santalaceae)", famSrc: [...LW("Viscum album", "28"), ...B3("Viscum album")],
      drug: { ru: "Трава омелы", lat: "" }, part: "herb", countries: { pl: "w", by: "w" },
      distSrc: [...L8("17"), ...LW("Viscum album", "28")],
      art: { kind: "berry", berry: "#f4f1e4", leaf: "#8f9f52", cluster: true },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " О ядовитости омелы источники подборки ничего не пишут, поэтому раздел осторожности пуст; это не значит, что омела безопасна." },
    { id: "padus", ru: "Черёмуха обыкновенная", lat: "Prunus padus", fam: "Розовые (Rosaceae)", famSrc: LW("Prunus padus", "25"),
      drug: { ru: "Кора и плоды черёмухи", lat: "" }, part: "bark", countries: { pl: "w", by: "w" },
      distSrc: [...L8("18"), ...LW("Prunus padus", "25")],
      art: { kind: "bark", bark: "#4e4136", leaf: "#5d7f42" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO + " Учебник Поликсеновой упоминает черёмуху только среди растений с конденсированными дубильными веществами и как примесь к коре крушины. В части источников вид назван Padus avium или Padus racemosa." },
    { id: "picea", ru: "Ель европейская", lat: "Picea abies", fam: "Сосновые (Pinaceae)", famSrc: P("Picea abies"),
      drug: { ru: "Смола, побеги и шишки ели", lat: "" }, part: "bark", countries: { pl: "w", by: "w" },
      distSrc: [...P("Picea abies"), ...LW("Picea abies", "22")],
      art: { kind: "bark", bark: "#5a4532", leaf: "#2f5a3a" },
      compounds: "", uses: [], prep: null, cautions: [],
      note2: NOMONO },
  ];

  // Только то немногое, что есть в учебнике Поликсеновой; остальное пусто
  const T = {
    rubus: { drugSrc: M("Rubus idaeus") },
    cichorium: { chemK: [t("Цикорий обыкновенный — одно из официнальных растений, содержащих инулин (вместе с топинамбуром и девясилом).", PK("с. 29–30"))], drugSrc: [...M2("Cichorium intybus"), ...L7("13")] },
    symphytum: { drugSrc: M("Symphytum officinale") },
    rumex: { drugSrc: L7("18") },
    chenopodium: { drugSrc: L7("14") },
    armoracia: { drugSrc: P("Armoracia rusticana") },
    oxycoccus: { drugSrc: M2("Vaccinium oxycoccos") },
    ribes: { drugSrc: M2("Ribes nigrum"), ident: [t("Смородина чёрная названа среди возможных примесей к плодам черники.", PK("с. 56"))] },
    marrubium: { drugSrc: P("Marrubium vulgare") },
    viscum: { drugSrc: M2("Viscum album") },
    padus: {
      drugSrc: [...M2("Prunus padus"), ...LW("Prunus padus", "25")],
      chemK: [t("Черёмуха названа среди растений с негидролизуемыми (конденсированными) дубильными веществами, которые дают красно-коричневые флобафены.", PK("с. 43"))],
      ident: [t("Кора черёмухи встречается как примесь к коре крушины.", PK("с. 49"))],
    },
    picea: { drugSrc: P("Picea abies") },
  };
  const MC = { ribes: [t("Смородина названа среди витаминоносных растений.", PK("с. 25"))] };

  const ETH = {
    rubus: {
      names: [t("Польск. malina (книжн. malina właściwa); в архиве Фишера malina, malinak; бел. маліна (лясная), маліннік (Любань); в Вильно malina, литов. avietės; в пограничье литов. также avietė, avytevuogės, malinykas; в травнике Фалимижа (Краков, 1534) — «Ribes», «maliny».", [...L7("19"), ...F("Rubus idaeus", "10"), ...LW("Rubus idaeus", "26"), ...M("Rubus idaeus"), ...B3("Rubus idaeus"), ...FAL("14")])],
      uses: [
        { r: VIL, c: "cold", t: "Траву продавали «na poty» — как потогонное. Фабрика Тарасейских закупила травы 1,5 т в 1927 г. и 1 т в 1928 г., плодов — 1,5 т и 2 т.", s: M("Rubus idaeus") },
        { r: FIS, c: "cold", t: "Малину записали от простуды (Гибы) и от жара (Оляны).", s: F("Rubus idaeus", "10") },
        { r: LUB, c: "cold", t: "Чай из надземной части пьют при простуде, кашле и боли в горле, сушёные плоды — при простуде, компот — от кашля. Вместе с липой малина — главное средство здесь при болезнях дыхательных путей; плодами и веточками малины лечили простуду и кашель у маленьких детей.", s: [...LW("Rubus idaeus", "26–27"), ...LWp("34"), ...LWp("39")] },
        { r: LUB, c: null, t: "Из свежих плодов чаще всего варят варенье (34 записи) и компот (11), едят их прямо с куста (16), настаивают на них крепкий алкоголь; сушёную надземную часть заваривают как повседневный чай.", s: LW("Rubus idaeus", "26–27") },
        { r: PLR, c: null, t: "Одно из самых часто собираемых дикорастущих растений во всех регионах: плоды едят сырыми, делают из них сок, сиропы, вина и десерты, добавляют в чёрный чай.", s: [...L7("19"), ...L7("9")] },
        { r: PL48, c: null, t: "Плоды ели сырыми, делали сок и варенье, листья сушили на чай; малину назвали в 32 местностях.", s: L8("18") },
        { r: BOR, c: null, t: "Варенье, компот, кисель, сок, вино, «сырое» замороженное варенье; сушёные стебли заваривают как чай и ими коптят мясо.", s: B3("Rubus idaeus") },
      ],
      facts: [
        t("В травнике Фалимижа (Краков, 1534) малина записана под латинским именем «Ribes», которым теперь называют смородину.", [...FAL("14"), ...PK("с. 56")]),
        t("В Любани малина — второе по популярности дикорастущее растение после черники: её назвали 85 из 134 собеседников.", LWp("37")),
        t("В пограничье Польши, Литвы и Беларуси малина — самое многофункциональное растение (9 категорий применения), а по культурной значимости уступает только чернике.", [...B3p("17"), ...B3p("20")]),
        t("По обзору повседневных чаёв Европы малину для чая назвали в 11 регионах, и все они в Восточной Европе.", s("eth_soukand2013", "Table 2")),
      ],
    },
    cichorium: {
      names: [t("Польск. cykoria (книжн. cykoria podróżnik), cykoryj; в архиве Фишера uraźnik; литов. trūkažolė; в травнике Фалимижа (Краков, 1534) — «Cicorea», «podrożnik».", [...L7("13"), ...B3("Cichorium intybus"), ...F("Cichorium intybus", "7"), ...M2("Cichorium intybus"), ...FAL("11")])],
      uses: [
        { r: FIS, c: "menstrual", t: "Цикорий записали от «внутренних болей» и болей при месячных (Гибы).", s: F("Cichorium intybus", "7") },
        { r: PLR, c: null, t: "В XVIII в. обжаренные корни шли на заменитель кофе, а корни без горькой сердцевины — в пищу как овощ; листья в конце XIX в. ели в голод (Малопольша).", s: L7("13") },
        { r: BOR, c: null, t: "Обжаренные корни — заменитель кофе.", s: [...B3("Cichorium intybus"), ...B3p("17")] },
        { r: SVE, c: null, t: "Траву цикория скупала фабрика Тарасейских (количество в таблице не указано).", s: M2("Cichorium intybus") },
      ],
      facts: [],
    },
    symphytum: {
      names: [t("Польск. żywokost (книжн. żywokost lekarski); на Подгале также żywochwast, zrost; в анкетах 1948 г. miodownik; бел. акопнік (Любань); в Вильно żywokost, литов. taukis; в пограничье литов. riebešaknis, živakostas; в травнике Фалимижа (Краков, 1534) — «Consolida maior minor», «kostywał, żywokost».", [...L7("14"), ...P("Symphytum officinale"), ...L8("15"), ...LW("Symphytum officinale", "13"), ...M("Symphytum officinale"), ...B3("Symphytum officinale"), ...FAL("15")])],
      uses: [
        { r: POD, c: null, t: "При переломах корень растирают в кашицу, часто с салом, и прикладывают. Так записано у многих авторов, от Gustawicz (1882) до Köhler (2018).", s: P("Symphytum officinale") },
        { r: POD, c: "wounds", t: "На порезы кладут повязку из листьев: под ней раны быстрее срастаются, отсюда местное название «zrost». Окопник жарят на масле как лечебную мазь, а жаренный на масле, освящённом в Страстную пятницу, служил лекарством от ран.", s: P("Symphytum officinale") },
        { r: POD, c: "gi", t: "От «оборвания желудка» (внутренних болезней) окопник жарят на жиру и несколько дней едят натощак.", s: P("Symphytum officinale") },
        { r: POD, c: "resp", t: "Отвар цветков советуют при болезнях дыхательных путей (запись Tylkowa, 2000).", s: P("Symphytum officinale") },
        { r: VIL, c: "wounds", t: "Корни продавали «do gojenia ran i na katar żołądka» — для заживления ран и от катара желудка.", s: M("Symphytum officinale") },
        { r: LUB, c: null, t: "Листья прикладывают к ушибам, настойку корней пьют, «чтобы срастались кости».", s: LW("Symphytum officinale", "13") },
        { r: PL48, c: null, t: "Дети высасывали нектар из цветков, листья шли в голодные супы (суп «szabaga» в Панталовицах).", s: L8("15") },
        { r: PLR, c: null, t: "Листья ели в голод до начала XX в.; под Ойцовом рубленые листья клали в оладьи.", s: L7("14") },
      ],
      facts: [t("На Подгале окопник святили на Матерь Божью Зельную (запись 1882 г.), а его листьями кормили свиней.", P("Symphytum officinale"))],
    },
    rumex: {
      names: [t("Польск. szczaw (книжн. szczaw zwyczajny), scow, kwasielec, kapuśnica; бел. шчаўе, шчавель, шчавер (Любань); литов. rūgštynės; в травнике Фалимижа (Краков, 1534) — «Acetoja, Lapathum», «szczaw».", [...L7("18"), ...LW("Rumex spp.", "24"), ...B3("Rumex acetosa"), ...FAL("14")])],
      uses: [
        { r: PLR, c: null, t: "Листья дети едят сырыми, а взрослые варят щавелевый суп с мукой, сметаной и яйцом, кашей или картофелем; это последний зелёный овощ, который ещё собирают в природе во всех регионах. По Клюку (XVIII в.), в голод из корня можно было печь хлеб.", s: L7("18") },
        { r: POD, c: null, t: "Из щавеля варят похлёбку и борщ; дети едят листья сырыми, старшие варят; на зиму щавель солят или закрывают в бутылках. Ели его и пастухи.", s: P("Rumex acetosa") },
        { r: LUB, c: null, t: "Свежие листья идут в суп (61 запись) и едят их прямо так (14); один собеседник назвал щавель средством при болезнях желудка.", s: LW("Rumex spp.", "24") },
        { r: BOR, c: null, t: "Суп из щавеля — самое частое употребление дикорастущего растения во всём пограничье (274 записи); щавель варят, квасят, сушат и замораживают на зиму.", s: [...B3("Rumex acetosa"), ...B3p("17")] },
        { r: "Беларусь, пограничье (поляк, 60 лет)", c: null, t: "«Весной на суп первым делом молодая крапива. А что ещё? Щавель, но щавель позже. […] И на зиму щавель ставим».", s: P24("9") },
      ],
      facts: [
        t("В пограничье Польши, Литвы и Беларуси щавель кислый — самое упоминаемое дикорастущее растение (280 записей), а в анкетах 1948 г. щавели (Rumex spp.) стоят на первом месте: 75 местностей.", [...B3p("17"), ...L8("8")]),
        t("Обычно щавель кислый не отличают от щавеля малого (Rumex acetosella): вкус у них почти одинаковый.", L7("18")),
      ],
    },
    chenopodium: {
      names: [t("Польск. lebioda, łoboda, komosa, warmuz, а в анкетах 1948 г. ещё lebida, łapucha, kumosa, jarmuż, faćka, bańdocha и др.; бел. лебяда, лябяда (Любань).", [...L7("14"), ...L8("16"), ...P("Chenopodium album"), ...LW("Chenopodium album", "7")])],
      uses: [
        { r: PLR, c: null, t: "Листья варили или жарили на масле и сале, клали в суп, мешали с картофелем или крупой — в основном как еду бедняков и голодную пищу, местами до 1960-х гг., во всех регионах.", s: L7("14") },
        { r: POD, c: null, t: "Из мари варили «вармуз»; её варили с салатом и подавали с сывороткой из кислого молока, ели вместо шпината и в голод Первой мировой войны.", s: P("Chenopodium album") },
        { r: FIS, c: null, t: "Голодная еда: вместо капусты (Нарбутовщизна), варёная с жиром (Гибы).", s: F("Chenopodium album", "7") },
        { r: LUB, c: null, t: "Надземную часть варят в супе (35 записей), реже едят в салате или просто так.", s: LW("Chenopodium album", "7") },
        { r: PL48, c: null, t: "Марь назвали в 50 местностях — второе место после щавеля. Листья недолго варили, отцеживали, жарили и заправляли сметаной или молоком; собирали в основном пожилые женщины.", s: [...L8("5"), ...L8("16")] },
      ],
      facts: [t("В пограничье Польши, Литвы и Беларуси марь вспоминают как голодную еду Второй мировой войны и послевоенных лет; теперь её так не едят.", B3p("22"))],
    },
    armoracia: {
      names: [t("Польск. chrzan, krzan, krzun, krzon; бел. хрэн (Любань); литов. krienai; в травнике Фалимижа (Краков, 1534) — «Radix», «chrzan».", [...L7("14"), ...L8("15"), ...P("Armoracia rusticana"), ...LW("Armoracia rusticana", "13"), ...B3("Armoracia rusticana"), ...FAL("10")])],
      uses: [
        { r: POD, c: "gi_spasm", t: "При коликах и зубной боли тёртый хрен смешивали с ржаной мукой 1:9 и прикладывали на тряпице, а не прямо на тело.", s: P("Armoracia rusticana") },
        { r: MAN, c: "joint_pain", t: "Компрессы из листьев кладут при головной боли, «простуженном желудке», воспалении суставов, ушибах и для снижения жара.", s: P("Armoracia rusticana") },
        { r: POD, c: null, t: "Конской болезни «zołzy» лечили хреном с овсом или с уксусом (запись Gustawicz, 1882).", s: P("Armoracia rusticana") },
        { r: FIS, c: "cough", t: "Хрен записали от кашля (Нарбутовщизна) и от слабости (Поляны).", s: F("Armoracia rusticana", "6") },
        { r: LUB, c: "joint_pain", t: "Листья прикладывают при боли в спине и суставах, но главное — это приправа: корень к мясу и салу, листья в засолку огурцов (8 записей).", s: LW("Armoracia rusticana", "13") },
        { r: PLR, c: null, t: "Корень едят сырым как приправу к солёным огурцам, с яйцами, в супах и к мясу, особенно на Пасху; его до сих пор широко используют и обычно собирают в природе, а не в огороде.", s: L7("14") },
        { r: BOR, c: null, t: "Хрен — третье по числу записей дикорастущее растение пограничья (223); тёртый хрен как приправа (215 записей), листья кладут в засолку огурцов.", s: [...B3("Armoracia rusticana"), ...B3p("17")] },
      ],
      facts: [t("На Подгале пасхальную трапезу начинали с молитвы, лизали соль и съедали кусочек корня хрена; тёртый хрен в больших количествах клали в пасхальный журек. Хрен святили на Пасху.", P("Armoracia rusticana"))],
    },
    oxycoccus: {
      names: [t("Польск. żurawina, żurawie, żurosie, zórowie, klukwa; бел. журавіны, клюква (Любань); в пограничье также spanguolės; в травнике Фалимижа (Краков, 1534) — «Moracelsi», «żorawiny».", [...L8("16"), ...LW("Vaccinium oxycoccos", "16"), ...B3("Vaccinium oxycoccos"), ...FAL("15")])],
      uses: [
        { r: LUB, c: "hypertension", t: "Свежие ягоды, морс и настойку пьют при повышенном давлении, свежие ягоды и морс — при простуде, морс — с похмелья.", s: LW("Vaccinium oxycoccos", "16") },
        { r: LUB, c: null, t: "Клюкву едят просто так (22 записи) и замороженной, варят варенье (11), кладут в квашеную капусту (9), хранят под водой; один собеседник при отравлении угарным газом закладывал свежую ягоду в ухо.", s: LW("Vaccinium oxycoccos", "16") },
        { r: PL48, c: null, t: "Ягоды шли в варенье и соусы; в Пшеросли (Сувалки) их помногу клали в квашеную капусту, реже варили кисель с мукой.", s: L8("16") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила 30 т ягод в 1927 г.", s: M2("Vaccinium oxycoccos") },
        { r: BOR, c: null, t: "Клюкву кладут в квашеную капусту, заливают водой на зиму, варят варенье и компот; в пограничье это одно из самых многофункциональных растений (8 категорий применения).", s: [...B3("Vaccinium oxycoccos"), ...B3p("17"), ...P24("9")] },
      ],
      facts: [t("Клюква входит в короткий список дикорастущих растений, которые в Польше всё ещё обычно собирают: в нём 15 видов плодов и семян.", [...L7("7"), ...L7("8")])],
    },
    ribes: {
      names: [t("Польск. porzeczka czarna, smrodynia, в анкетах 1948 г. также smurodina, smrodina, bździuchi; бел. смародзіна, чорная смародзіна (Любань); литов. juodasis serbentas.", [...L7("16"), ...L8("16"), ...LB("Ribes nigrum"), ...M2("Ribes nigrum")])],
      uses: [
        { r: LUBc, c: "cold", t: "Чай из листьев пьют при простуде и боли в горле, как мочегонное и «для иммунитета», чай из побегов и отвар веточек — при простуде; в отваре веточек купают детей при диатезе.", s: [...LB("Ribes nigrum"), ...s("eth_soukand2017b", "с. 7")] },
        { r: LUBc, c: "diarrhea", t: "Свежие ягоды едят при поносе, а также при повышенном давлении.", s: LB("Ribes nigrum") },
        { r: PLR, c: null, t: "Листья — основная приправа к солёным огурцам по всей Польше, почти всегда с садовых кустов; дикие ягоды собирали до середины XX в. (Лодзинское воеводство).", s: L7("16") },
        { r: PL48, c: null, t: "Ягоды смородины чёрной и колосистой ели сырыми, засыпали сахаром, делали сок и варенье; большинство записей с востока Польши.", s: L8("16") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила листьев 20 т в 1927 г. и 12 т в 1928 г.", s: M2("Ribes nigrum") },
      ],
      facts: [],
    },
    marrubium: {
      names: [t("Польск. szanta (книжн. szanta zwyczajna); в травнике Фалимижа (Краков, 1534) — «Maiorana», «szanta».", [...P("Marrubium vulgare"), ...FAL("13")])],
      uses: [{ r: POD, c: null, t: "Молоко варят с листьями шандры и дают пить при «отрясении» или «оборвании» (народные болезни) и когда болит под грудью (запись Gustawicz, 1882).", s: P("Marrubium vulgare") }],
      facts: [],
    },
    viscum: {
      names: [t("Польск. jemioła, imioła; бел. амяла (Любань); литов. amalas; в травнике Фалимижа (Краков, 1534) — «Viscus», «jemioła».", [...L8("17"), ...LW("Viscum album", "28"), ...M2("Viscum album"), ...B3("Viscum album"), ...FAL("15")])],
      uses: [
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила травы омелы 250 кг в 1927 г. и 300 кг в 1928 г.", s: M2("Viscum album") },
        { r: LUB, c: null, t: "Свежие листья — для «очищения организма» (один собеседник).", s: LW("Viscum album", "28") },
        { r: PL48, c: null, t: "Ягоды ели сырыми и дети, и взрослые; за ними охотились, когда валили деревья (Заржецин под Опочно).", s: L8("17") },
        { r: BOR, c: null, t: "Свежие листья добавляли в алкоголь для вкуса (литовская запись).", s: B3("Viscum album") },
      ],
      facts: [],
    },
    padus: {
      names: [t("Польск. czeremcha; бел. чаромха (Любань); литов. ieva.", [...F("Prunus padus", "9"), ...L8("18"), ...LW("Prunus padus", "25"), ...M2("Prunus padus")])],
      uses: [
        { r: FIS, c: "diarrhea", t: "Черёмуху записали от поноса (Поляны).", s: F("Prunus padus", "9") },
        { r: LUB, c: "diarrhea", t: "Свежие плоды, компот и настойку на плодах — от поноса и дизентерии; настойкой цветков растирают при боли в суставах и ревматизме; веточки ставят в воду «для дезинфекции».", s: LW("Prunus padus", "25") },
        { r: PL48, c: null, t: "Плоды — детское лакомство, сырыми (11 местностей).", s: L8("18") },
        { r: SVE, c: null, t: "Фабрика Тарасейских закупила коры 2,5 т в 1927 г. и 1,5 т в 1928 г.", s: M2("Prunus padus") },
      ],
      facts: [],
    },
    picea: {
      names: [t("На Подгале smrek, ostrewka; мужские шишечки — majki, смола — smoła; бел. елка (Любань).", [...P("Picea abies"), ...LW("Picea abies", "22")])],
      uses: [
        { r: POD, c: "wounds", t: "Смола с маслом и смальцем — «лучшее лекарство» для ран; смолу с освящённым воском и маслом мазали раны людям и скоту. Молодые побеги засыпали сахаром и делали сироп от кашля (Tylkowa, 2000).", s: P("Picea abies") },
        { r: POD, c: null, t: "Смолу жевали, чтобы чистить зубы; пастухи соскабливали под корой «мязгу» и жевали молодую жёлтую смолу как лакомство; в неурожай ели молодые шишки и хвою.", s: P("Picea abies") },
        { r: LUB, c: "cold", t: "Чай из молодых шишек — при простуде, из них же варят варенье и делают настойку «для здоровья»; хвою кладут в ножную ванну при боли в суставах, ветками парятся в бане.", s: LW("Picea abies", "22") },
        { r: "Бойки, Долинский район, Украина (запись Шнайдера, 1912)", c: null, t: "Зелёными еловыми шишками лечили сифилис.", s: KZ("7") },
      ],
      facts: [t("Еловое дерево на Подгале шло буквально на всё: стены и гонт, жёлоба к водяным колёсам, мебель и колыбели, детали гуслей и смычков.", P("Picea abies"))],
    },
  };

  const GAPS = "Способ приготовления и показания EMA не заполнены: в использованных источниках их нет, а сайт EMA сейчас недоступен.";
  for (const p of PL) { p.gaps = [GAPS, p.note2].filter(Boolean).join(" "); if (!D.PLANTS.some((x) => x.id === p.id)) D.PLANTS.push(p); }
  for (const k in T) add(window.TEXTS.plants, k, T[k]);
  for (const k in MC) add(window.MECH.plants, k, MC[k]);
  if (E) for (const k in ETH) add(E.plants, k, ETH[k]);
})();
