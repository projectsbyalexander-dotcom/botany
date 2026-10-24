/* Растения из немецкоязычных книг (Künzle «Chrut und Uchrut»; Storl): виды, которых не было в справочнике,
   с записанным в книгах применением. Народные названия, применение и факты — в ethno_de.js.
   Устроено как plants8.js. Подключается после plants8.js и до parts.js. */
(function () {
  const D = window.DATA;
  const add = (o, k, v) => { if (o && !(k in o)) o[k] = v; };
  const s = (id, loc) => [{ id, loc }];
  const KH = (a) => s("eth_kunzle1962", "гл. «Heilkräuter», " + a);
  const KU = (a) => s("eth_kunzle1962", "гл. «Heilkräuter und Unkräuter», " + a);
  const KA = (a) => s("eth_kunzle1962a", a);
  const H = (p) => s("eth_storl2000", "PDF-с. " + p);

  const NOMONO = "Учебной монографии по этому виду в использованных источниках нет, поэтому описание, состав, сбор и сушка не заполнены.";
  const NOFAM = " Семейство в источниках не названо.";
  const NOCTRY = " Источники — швейцарские и немецкие книги, а распространение по Польше, Германии, Словакии и Беларуси в них не описано, поэтому страны не отмечены.";
  const NOINAT = " Фото и наблюдения iNaturalist для этого вида не собраны.";

  const PL = [
    { id: "alchemilla", ru: "Манжетка обыкновенная", lat: "Alchemilla vulgaris", fam: "",
      drug: { ru: "Трава манжетки", lat: "" }, part: "herb", countries: {},
      art: { kind: "leaf", shape: "round", pairs: 2, leaf: "#7f9f5a" } },
    { id: "filipendula", ru: "Лабазник вязолистный", lat: "Filipendula ulmaria", fam: "", potx: "x_filipendula",
      drug: { ru: "Цветки и листья лабазника", lat: "" }, part: "flower", parts: ["flower", "leaf"], countries: {},
      art: { kind: "umbel", petal: "#f4efd9", center: "#e3d9a8", feathery: true } },
    { id: "geum", ru: "Гравилат городской", lat: "Geum urbanum", fam: "",
      drug: { ru: "Корни и трава гравилата", lat: "" }, part: "root", parts: ["root", "herb"], countries: {},
      art: { kind: "flower", petal: "#f2d23c", center: "#c9a21c", petals: 5, small: true, leaf: "#5d7f42" } },
    { id: "geranium_r", ru: "Герань Роберта", lat: "Geranium robertianum", fam: "",
      drug: { ru: "Трава герани Роберта", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#d97aa8", center: "#b54f84", petals: 5, small: true, leaf: "#6f8a3a" } },
    { id: "pimpinella", ru: "Бедренец камнеломковый", lat: "Pimpinella saxifraga", fam: "",
      drug: { ru: "Корень бедренца", lat: "" }, part: "root", countries: {},
      art: { kind: "umbel", petal: "#f4f1e4", center: "#d8d0a8", feathery: true } },
    { id: "imperatoria", ru: "Горичник настурциевый", lat: "Peucedanum ostruthium", fam: "",
      drug: { ru: "Корень горичника", lat: "" }, part: "root", parts: ["root", "herb", "seed"], countries: {},
      art: { kind: "umbel", petal: "#f4f1e4", center: "#cfc6a0", feathery: false } },
    { id: "euphrasia", ru: "Очанка лекарственная", lat: "Euphrasia officinalis", fam: "",
      drug: { ru: "Трава очанки", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#f4f1f6", center: "#b9a3d6", petals: 5, small: true, leaf: "#5d7f42" } },
    { id: "solidago", ru: "Золотарник обыкновенный", lat: "Solidago virgaurea", fam: "", potx: "x_solidago",
      drug: { ru: "Трава золотарника", lat: "" }, part: "herb", countries: {},
      art: { kind: "umbel", petal: "#e9c93a", center: "#c9a21c", feathery: false } },
    { id: "aegopodium", ru: "Сныть обыкновенная", lat: "Aegopodium podagraria", fam: "Зонтичные (Apiaceae)", famSrc: H("104"),
      drug: { ru: "Трава сныти", lat: "" }, part: "herb", countries: {},
      art: { kind: "umbel", petal: "#f4f1e4", center: "#d8d0a8", feathery: false } },
    { id: "sempervivum", ru: "Молодило кровельное", lat: "Sempervivum tectorum", fam: "",
      drug: { ru: "Листья молодила", lat: "" }, part: "leaf", countries: {},
      art: { kind: "flower", petal: "#d98aa0", center: "#7f9f5a", petals: 12, small: false, leaf: "#7f9f5a" } },
    { id: "bellis", ru: "Маргаритка многолетняя", lat: "Bellis perennis", fam: "Астровые (Asteraceae)", famSrc: H("190"),
      drug: { ru: "Цветки маргаритки", lat: "" }, part: "flower", countries: {},
      art: { kind: "flower", petal: "#ffffff", center: "#f2d23c", petals: 14, small: true, leaf: "#5d7f42" } },
    { id: "hieracium", ru: "Ястребинка волосистая", lat: "Hieracium pilosella", fam: "",
      drug: { ru: "Трава ястребинки", lat: "" }, part: "herb", countries: {},
      art: { kind: "flower", petal: "#f2e03c", center: "#d9b21c", petals: 12, small: true, leaf: "#8fa67a" } },
    { id: "viola_odorata", ru: "Фиалка душистая", lat: "Viola odorata", fam: "",
      drug: { ru: "Цветки, листья и корни фиалки", lat: "" }, part: "flower", parts: ["flower", "leaf", "root"], countries: {},
      art: { kind: "flower", petal: "#6f4fb8", center: "#f2d23c", petals: 5, small: true, leaf: "#4f7a3a" } },
    { id: "ononis", ru: "Стальник колючий", lat: "Ononis spinosa", fam: "", potx: "x_ononis",
      drug: { ru: "Корни стальника", lat: "" }, part: "root", countries: {},
      art: { kind: "root", root: "#c9b08a", top: "#d98aa8" } },
    { id: "gentiana", ru: "Горечавка жёлтая", lat: "Gentiana lutea", fam: "", potx: "x_gentian",
      drug: { ru: "Корень горечавки", lat: "" }, part: "root", countries: {},
      art: { kind: "root", root: "#b8955e", top: "#e9c93a" } },
    { id: "galium", ru: "Подмаренник настоящий", lat: "Galium verum", fam: "",
      drug: { ru: "Трава подмаренника", lat: "" }, part: "herb", countries: {},
      art: { kind: "umbel", petal: "#f2e03c", center: "#d9c21c", feathery: true } },
  ];
  for (const p of PL) Object.assign(p, { compounds: "", uses: [], prep: null, cautions: [], note2: NOMONO + (p.fam ? "" : NOFAM) + NOCTRY + NOINAT });

  // Сырьё: откуда взята строка «Сырьё»
  const T = {
    alchemilla: { drugSrc: KH("Frauenmänteli") },
    filipendula: { drugSrc: KH("Wiesengeissbart") },
    geum: { drugSrc: KH("Bergbenediktenkraut") },
    geranium_r: { drugSrc: KH("Storchenschnabel") },
    pimpinella: { drugSrc: KH("Bibernelle") },
    imperatoria: { drugSrc: KH("Meisterwurz") },
    euphrasia: { drugSrc: KH("Augentrost") },
    solidago: { drugSrc: KH("Goldrute") },
    aegopodium: { drugSrc: KH("Gaissfuss") },
    sempervivum: { drugSrc: KH("Hauswurz") },
    bellis: { drugSrc: KH("Massliebchen") },
    hieracium: { drugSrc: KH("Habichtskraut") },
    viola_odorata: { drugSrc: KU("Heilsame Frühlingskräuter") },
    ononis: { drugSrc: [...KU("Wassersucht"), ...KA("Hauhechelwurzel")] },
    gentiana: { drugSrc: KH("Enzian") },
    galium: { drugSrc: KA("Labkraut") },
  };

  const GAPS = "Способ приготовления и показания EMA не заполнены: в использованных источниках их нет.";
  for (const p of PL) { p.gaps = [GAPS, p.note2].filter(Boolean).join(" "); if (!D.PLANTS.some((x) => x.id === p.id)) D.PLANTS.push(p); }
  for (const k in T) add(window.TEXTS.plants, k, T[k]);
})();
