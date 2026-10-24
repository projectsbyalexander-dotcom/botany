/* Карточки для заучивания рецептов (режим провизора, #/sim/cards).
   Наборы строятся по практическим урокам и по классам веществ; три уровня сложности; интервальное повторение как в Obsidian SR.
   Каждый ответ с источником и ссылками на уроки. */
(function () {
  const C = window.CORE;
  const { $, app, esc, D, byId, store, cite, shuffle } = C;
  const ICON = window.ICON;
  const { PLANTS, METHODS, BLENDS } = D;
  const T = (id) => window.TEXTS?.plants?.[id] || {};
  const tech = (topic) => (window.K3?.tech || []).filter((x) => x.topic === topic);
  // Состояние интервального повторения, как в плагине Spaced Repetition для Obsidian:
  // srs["id@уровень"] = { due: номер дня, ivl: интервал в днях, ease: лёгкость в % }
  const srs = store.get("srs", {});
  const saveSrs = () => store.set("srs", srs);
  const LEVELS = {
    1: { ru: "Лёгкий", desc: "Русские названия, только основное сырьё учебника." },
    2: { ru: "Средний", desc: "Латинские названия сырья, все растения справочника; добавляются латинские прописи и старинные рецепты." },
    3: { ru: "Трудный", desc: "Латынь и обратные карточки: по прописи или составу назвать средство; ответ полный." },
  };
  let level = store.get("cardsLevel", 1);
  const BASE = new Set(PLANTS.slice(0, 27).map((p) => p.id));
  const withM = (lv) => PLANTS.filter((p) => METHODS[p.prep] && (lv > 1 || BASE.has(p.id)));
  const name = (p, lv) => (lv === 1 ? esc(p.drug.ru) : `<i>${esc(p.drug.lat)}</i>`);
  const sub = (p, lv) => (lv === 1 ? `<i>${esc(p.drug.lat)}</i>` : esc(p.drug.ru));
  const ratio = (p) => (p.prep === "valerian" ? "1:30" : "1:10");
  const firstSrc = (arr) => (arr[0] ? arr[0].s : []);
  const lessonL = (id) => { const l = (C.simLessons || []).find((x) => x.id === id); return l ? { href: `#/sim/lesson/${id}`, t: `Урок: ${l.title}` } : null; };
  const chemL = (id) => { const l = C.course?.lessons?.find((x) => x.id === id); return l ? { href: `#/sim/chem/${id}`, t: `Урок: ${l.title}` } : null; };
  const plantL = (p) => ({ href: `#/plant/${p.id}`, t: p.ru });
  const tagLinks = (p) => C.tagLink ? C.tagsOf(p).map((t) => C.tagLink(t)).join(" ") : esc(C.tagsOf(p).join(", "));

  // Пояснение к способу; для сырья-исключения (отвар не из корней и коры) общее правило не подходит
  const whyOf = (p) => {
    const m = METHODS[p.prep];
    if (D.METHOD_NOTES?.[p.id]) return `${m.why} ${D.METHOD_NOTES[p.id].t} ${cite(D.METHOD_NOTES[p.id].s)}`;
    if (p.prep === "decoction" && !["root", "bark"].includes(p.part)) return `По общему правилу учебника отвары готовят из корней, корневищ и коры. Это сырьё (${esc((C.PARTS[p.part] || "").toLowerCase())}) в справочнике записано как отвар в виде исключения; отдельного источника на способ для него в приложении пока нет.`;
    return m.why;
  };

  // ---------- Наборы ----------
  const SETS = [
    { id: "l1", lesson: "l1", ru: "Настой или отвар", q: "Какую лекарственную форму готовят?", cards: (lv) => withM(lv).map((p) => {
      const m = METHODS[p.prep];
      return { id: "l1:" + p.id, p, front: name(p, lv), back: `<b>${esc(m.ru)}</b> <i>(${esc(m.lat)})</i>`, more: `${whyOf(p)} ${cite(m.src)}`, links: [lessonL("l1"), chemL("c_methods"), plantL(p)] };
    }) },
    { id: "l2", lesson: "l2", ru: "Соотношение сырья и воды", q: "В каком соотношении берут сырьё и воду?", cards: (lv) => withM(lv).map((p) => (
      { id: "l2:" + p.id, p, front: name(p, lv), back: `<b>${ratio(p)}</b>`, more: `${p.prep === "valerian" ? "Корневища с корнями валерианы берут в соотношении 1:30." : "Обычное соотношение для водных извлечений 1:10."} ${cite(firstSrc(tech("ratio")))}`, links: [lessonL("l2"), plantL(p)] })) },
    { id: "l3", lesson: "l3", ru: "Измельчение", q: "До какого размера измельчают сырьё?", cards: (lv) => withM(lv).map((p) => (
      { id: "l3:" + p.id, p, front: name(p, lv), back: `<b>${esc(C.SIZE_RU ? C.SIZE_RU(p) : "")}</b>`, more: `Чем плотнее ткань сырья, тем мельче частицы. ${cite(firstSrc(tech("particle")))}`, links: [lessonL("l3"), plantL(p)] })) },
    { id: "l5", lesson: "l5", ru: "Листья: настой или отвар", q: "Как готовят извлечение из этих листьев?", cards: (lv) => withM(lv).filter((p) => p.part === "leaf").map((p) => {
      const m = METHODS[p.prep];
      return { id: "l5:" + p.id, p, front: name(p, lv), back: `<b>${esc(m.ru)}</b>`, more: p.prep === "leaf_decoction" ? `${METHODS.leaf_decoction.why} ${cite(METHODS.leaf_decoction.src)}${D.METHOD_NOTES?.[p.id] ? ` ${D.METHOD_NOTES[p.id].t} ${cite(D.METHOD_NOTES[p.id].s)}` : ""}` : `Нежные листья с эфирным маслом или слизью готовят как настой. ${cite(m.src)}`, links: [lessonL("l5"), chemL("c_phenol_glycosides"), plantL(p)] };
    }) },
    { id: "l6", lesson: "l6", ru: "Плоды, семена и слизи", q: "Как готовят и до какого размера измельчают?", cards: (lv) => withM(lv).filter((p) => ["seed", "berry"].includes(p.part) || p.prep === "mucilage").map((p) => {
      const m = METHODS[p.prep];
      return { id: "l6:" + p.id, p, front: name(p, lv), back: `<b>${esc(m.ru)}</b>; ${esc(C.SIZE_RU ? C.SIZE_RU(p) : "")}`, more: `${whyOf(p)} ${cite(m.src)}`, links: [lessonL("l6"), chemL(p.prep === "mucilage" ? "c_mucilages" : "c_essential_oils"), plantL(p)] };
    }) },
    { id: "l7", lesson: "l7", recipe: true, ru: "Сборы: состав", q: "Из чего состоит сбор?", cards: (lv) => [
      ...BLENDS.map((b) => ({ id: "l7:" + b.id, front: esc(b.ru), back: `${b.items.map((id) => (lv === 1 ? esc(byId[id].drug.ru) : `<i>${esc(byId[id].drug.lat)}</i>`)).join(", ")}, поровну (<i>ana partes aequales</i>)`, more: `${b.why || ""} ${cite(b.src)}`, links: [lessonL("l7"), { href: `#/book/blend:${b.id}`, t: "Карточка рецепта" }] })),
      ...(lv > 1 ? (window.K3?.species || []).map((s, i) => [s, i]).filter(([s]) => (s.composition || []).length).map(([s, i]) => ({ id: "l7:k3:" + i, front: esc(s.name), back: s.composition.map((c) => `${esc(c.ru)} ${blank(c.parts) ? "" : esc(c.parts)}`).join(", "), more: `${esc(s.use || "")} ${cite(s.s)}`, links: [lessonL("l7"), { href: `#/book/k3:${i}`, t: "Карточка рецепта" }] })) : []),
    ] },
    { id: "l8", lesson: "l8", recipe: true, ru: "Латинская пропись", q: "Что выписано в рецепте?", minLevel: 2, cards: (lv) => withM(lv).map((p) => {
      const m = METHODS[p.prep], rx = C.rxName ? C.rxName(p) : m.lat;
      return { id: "l8:" + p.id, p, front: `Rp.: <i>${esc(rx)}</i>`, back: `<b>${esc(m.ru)}: ${esc(p.drug.ru.toLowerCase())}</b>, ${ratio(p)}`, more: `Название формы стоит в родительном падеже: ${esc(rx)}. ${C.latT ? C.latT(rx, "Разобрать по словам") : ""}`, links: [lessonL("l8"), { href: "#/latin", t: "Латинский словарь" }, plantL(p)] };
    }) },
    { id: "l9", lesson: "l9", ru: "Сроки хранения сырья", q: "Сколько хранится сырьё?", cards: (lv) => withM(lv).filter((p) => T(p.id).storage?.t).map((p) => (
      { id: "l9:" + p.id, p, front: name(p, lv), back: `<b>${esc(T(p.id).storage.t)}</b>`, more: `Срок годности сырья по учебнику. ${cite([{ id: "karpuk", loc: T(p.id).storage.loc || "" }])}`, links: [lessonL("l9"), plantL(p)] })) },
    { id: "subst", chem: "c_intro", ru: "Действующие вещества", q: "Какие классы веществ ведущие?", cards: (lv) => withM(lv).filter((p) => C.tagsOf(p).length).map((p) => (
      { id: "subst:" + p.id, p, front: name(p, lv), back: tagLinks(p), more: `${esc(p.compounds)} ${cite([{ id: "karpuk", loc: T(p.id).page || "" }])}`, links: [chemL("c_intro"), plantL(p)] })) },
    { id: "uses", chem: "c_methods", ru: "Показания по EMA", q: "При каких состояниях применяют?", cards: (lv) => withM(lv).filter((p) => p.uses.some((u) => u.ev === "ema")).map((p) => {
      const us = p.uses.filter((u) => u.ev === "ema");
      return { id: "uses:" + p.id, p, front: name(p, lv), back: [...new Set(us.map((u) => C.diseaseIndex[u.c]?.ru))].filter(Boolean).map(esc).join("; "), more: `${us[0].t} ${cite(us[0].s)}`, links: [plantL(p), { href: `#/diseases/${us[0].c}`, t: "Болезнь" }] };
    }) },
  ];
  // Трудный уровень: полная пропись одной карточкой и обратные карточки
  const FULL = { id: "full", recipe: true, ru: "Полная пропись", q: "Форма, соотношение, измельчение, срок хранения", minLevel: 3, cards: () => withM(3).map((p) => {
    const m = METHODS[p.prep];
    return { id: "full:" + p.id, p, front: `<i>${esc(p.drug.lat)}</i>`, back: `<b>${esc(m.ru)}</b> ${ratio(p)}; ${esc(C.SIZE_RU ? C.SIZE_RU(p) : "")}${T(p.id).storage?.t ? `; хранить ${esc(T(p.id).storage.t)}` : ""}`, more: `${whyOf(p)} ${cite(m.src)}`, links: [lessonL("l1"), lessonL("l2"), lessonL("l3"), lessonL("l9"), plantL(p)] };
  }) };
  const REV = { id: "rev", ru: "Узнать сырьё по описанию", q: "Какое это сырьё?", minLevel: 3, cards: () => {
    const ps = withM(3).filter((p) => C.tagsOf(p).length);
    const desc = (p) => `${esc(METHODS[p.prep].ru)}, ${ratio(p)}; вещества: ${esc(C.tagsOf(p).join(", "))}; часть: ${esc(C.partsText(p).toLowerCase())}`;
    const cnt = {}; ps.forEach((p) => (cnt[desc(p)] = (cnt[desc(p)] || 0) + 1));
    // одинаковое описание у двух видов (мята и берёза): добавляем семейство, чтобы ответ был один
    return ps.map((p) => ({ id: "rev:" + p.id, p, front: desc(p) + (cnt[desc(p)] > 1 && p.fam ? `; семейство: ${esc(p.fam)}` : ""), back: `<b>${esc(p.drug.ru)}</b> <i>(${esc(p.drug.lat)})</i>`, more: `${esc(p.compounds)} ${cite([{ id: "karpuk", loc: T(p.id).page || "" }])}`, links: [plantL(p), chemL("c_intro")] }));
  } };

  // ---------- Рецепты целиком: название → состав, болезнь → рецепт ----------
  const V = 200;
  const mass = (p) => (Math.round((p.prep === "valerian" ? V / 30 : V / 10) * 10) / 10).toFixed(1).replace(".", ",");
  const heat = (p) => (/decoction/.test(p.prep) ? "водяная баня 30 мин, охладить 10 мин" : "водяная баня 15 мин, охладить 45 мин");
  const rcpName = (p) => `${METHODS[p.prep].ru}: ${p.drug.ru.toLowerCase()}`;
  const ingr = (p, lv) => p.prep === "mucilage"
    ? `<ul class="fc-ing"><li>${name(p, lv)}, целые или надломленные</li><li>вода комнатной температуры</li></ul><p class="fc-step">Без нагревания: оставить до полного набухания семян, процедить.</p>`
    : `<ul class="fc-ing"><li>${name(p, lv)}: ${mass(p)} г, ${esc(C.SIZE_RU ? C.SIZE_RU(p) : "")}</li><li>вода: до ${V} мл (${ratio(p)})</li></ul><p class="fc-step">${heat(p)}; процедить, отжать, довести кипячёной водой до ${V} мл.</p>`;
  const SINGLE = { id: "rsingle", recipe: true, lesson: "l1", ru: "Рецепт из одного сырья", q: "Что входит и как готовить? (на 200 мл)", cards: (lv) => withM(lv).map((p) => (
    { id: "rsingle:" + p.id, p, front: lv === 1 ? esc(rcpName(p)) : `<i>${esc(C.rxName ? C.rxName(p) : METHODS[p.prep].lat)}</i> ${p.prep === "mucilage" ? "" : V + " ml"}`, back: ingr(p, lv), more: `${whyOf(p)} ${cite(METHODS[p.prep].src)}`, links: [lessonL("l1"), lessonL("l2"), lessonL("l4"), plantL(p)] })) };
  const recipesByIll = (lv) => {
    const out = {};
    withM(lv).forEach((p) => p.uses.filter((u) => u.ev === "ema" || u.ev === "text").forEach((u) => {
      if (!C.diseaseIndex[u.c]) return;
      const r = (out[u.c] = out[u.c] || { c: u.c, items: [] });
      if (!r.items.some((x) => x.p === p)) r.items.push({ p, u });
    }));
    return Object.values(out);
  };
  const ILL = { id: "ill", recipe: true, ru: "Болезнь → рецепт", q: "Какие рецепты применяют? Назовите состав.", cards: (lv) => recipesByIll(lv).map((r) => {
    const d = C.diseaseIndex[r.c], items = r.items.slice(0, 6);
    return { id: "ill:" + r.c, front: `${esc(d.ru)}${lv > 1 && D.DISEASE_LAT?.[r.c] ? `<div class="fc-sub"><i>${esc(D.DISEASE_LAT[r.c])}</i></div>` : ""}`,
      back: `<ul class="fc-ing">${items.map(({ p }) => `<li><b>${esc(METHODS[p.prep].ru)}</b>: ${name(p, lv)}${p.prep === "mucilage" ? "" : `, ${mass(p)} г на ${V} мл (${ratio(p)})`}</li>`).join("")}</ul>${r.items.length > items.length ? `<p class="hint">и ещё ${r.items.length - items.length}</p>` : ""}`,
      more: `${esc(items[0].u.t)} ${cite(items[0].u.s)}`,
      links: [{ href: `#/diseases/${r.c}`, t: d.ru }, ...[...new Set(items.map(({ p }) => /decoction/.test(p.prep) ? "dec" : p.prep === "mucilage" ? "muc" : "inf"))].map((g) => ({ href: `#/book/${encodeURIComponent(r.c + "|" + g)}`, t: `Книга рецептов: ${{ inf: "настой", dec: "отвар", muc: "слизь" }[g]}` })), lessonL("l1")] };
  }) };
  const legacyList = () => [...(window.LEGACY?.mixtures || []), ...(window.LEGACY?.remedies || [])].filter((m) => (m.composition || []).length >= 2);
  const blank = (x) => !x || /^(—|-|не указано)$/i.test(String(x).trim());
  const legUse = (m) => m.use || m.text?.[0]?.t || "";
  const legSrc = (m) => (m.s && m.s.length ? m.s : (m.text || []).flatMap((x) => x.s || []));
  const compLine = (c, lv) => `${lv === 1 || blank(c.lat) ? esc(c.ru) : `<i>${esc(c.lat)}</i> <span class="muted">${esc(c.ru)}</span>`}${!blank(c.parts) ? ` <span class="fc-parts">${esc(c.parts)}${/^[\d.,\s]+$/.test(c.parts) ? " ч." : ""}</span>` : ""}`;
  const LEG = { id: "legacy", recipe: true, ru: "Старинные рецепты: состав", q: "Из чего состоит средство?", minLevel: 2, cards: (lv) => legacyList().map((m) => (
    { id: "legacy:" + m.id, front: `${esc(m.ru)}${m.lat ? `<div class="fc-sub"><i>${esc(m.lat)}</i></div>` : ""}<div class="fc-sub">${esc([m.edition, m.date, m.period].filter(Boolean)[0] || "")}</div>`,
      back: `<ul class="fc-ing">${m.composition.map((c) => `<li>${compLine(c, lv)}</li>`).join("")}</ul>`, more: `${esc(legUse(m).slice(0, 220))}${legUse(m).length > 220 ? "…" : ""} ${cite(legSrc(m))}`,
      links: [{ href: `#/heritage/${m.id}`, t: "Страница средства" }, lessonL("l7")] })) };
  const RREV = { id: "rrev", recipe: true, ru: "Узнать рецепт по составу", q: "Как называется этот рецепт?", minLevel: 3, cards: () => [
    ...BLENDS.map((b) => ({ id: "rrev:" + b.id, front: b.items.map((id) => `<i>${esc(byId[id].drug.lat)}</i>`).join(", "), back: `<b>${esc(b.ru)}</b>`, more: `${esc(b.goal || "")} ${cite(b.src)}`, links: [lessonL("l7"), { href: `#/book/blend:${b.id}`, t: "Карточка рецепта" }] })),
    ...(window.K3?.species || []).map((sp, i) => [sp, i]).filter(([sp]) => (sp.composition || []).length).map(([sp, i]) => ({ id: "rrev:k3:" + i, front: sp.composition.map((c) => `<i>${esc(blank(c.lat) ? c.ru : c.lat)}</i> ${blank(c.parts) ? "" : esc(c.parts)}`).join(", "), back: `<b>${esc(sp.name)}</b>`, more: `${esc(sp.use || "")} ${cite(sp.s)}`, links: [lessonL("l7"), { href: `#/book/k3:${i}`, t: "Карточка рецепта" }] })),
    ...legacyList().map((m) => ({ id: "rrev:" + m.id, front: m.composition.map((c) => `<i>${esc(blank(c.lat) ? c.ru : c.lat)}</i>${!blank(c.parts) ? " " + esc(c.parts) : ""}`).join(", "), back: `<b>${esc(m.ru)}</b>${m.lat ? ` <i>(${esc(m.lat)})</i>` : ""}<div class="fc-sub">${esc([m.edition, m.date, m.period].filter(Boolean)[0] || "")}</div>`, more: cite(legSrc(m)), links: [{ href: `#/heritage/${m.id}`, t: "Страница средства" }] })),
  ] };
  // Народная традиция: страна выбирается в колоде; карточки без страны относятся ко всей Европе и видны при «Все страны»
  const EC = () => window.ETHNO?.COUNTRIES || {};
  let ethC = store.get("ethCountry", "");
  const inC = (x) => !ethC || (x.cc || []).includes(ethC);
  const ETH_FACTS = { id: "eth_facts", ru: "Народные названия и факты", q: "Вспомните ответ", cards: () => (window.ETHNO?.cards || []).filter(inC).map((c) => ({
    id: "eth:" + c.id, front: esc(c.front), back: `<b>${esc(c.back)}</b>`, more: cite(c.s), links: [c.plant && byId[c.plant] ? plantL(byId[c.plant]) : null] })) };
  const ETH_USES = { id: "eth_uses", ru: "Народное применение по регионам", q: "Как применяли растение в этом регионе?", cards: (lv) => Object.entries(window.ETHNO?.plants || {}).flatMap(([pid, E]) => (E.uses || []).filter(inC).map((u, i) => ({
    id: `ethu:${pid}:${i}`, p: byId[pid], front: `${lv === 1 ? esc(byId[pid].ru) : `<i>${esc(byId[pid].lat)}</i>`}<div class="fc-sub">${esc(u.r)}</div>`, back: esc(u.t), more: cite(u.s), links: [plantL(byId[pid])] }))) };
  const ALL_SETS = [SINGLE, ILL, ...SETS, LEG, FULL, REV, RREV, ETH_FACTS, ETH_USES];
  // Уровень выбирается свободно, но определяет состав колод: латинские прописи и старинные рецепты со среднего, обратные карточки на трудном
  const atLevel = (s) => (s.minLevel || 1) <= level;
  const DECKS = {
    all: { ru: "Всё", sub: "Все наборы карточек этого уровня", sets: () => ALL_SETS.filter(atLevel) },
    rx: { ru: "Рецепты", sub: "Только рецепты: состав, пропись, болезнь → рецепт", sets: () => ALL_SETS.filter((s) => s.recipe && atLevel(s)) },
    ethno: { ru: "Народная традиция", sub: "Народные названия, факты и применение; выберите страну, традицию которой изучаете", sets: () => [ETH_FACTS, ETH_USES] },
  };
  const cardsOf = (s) => s.cards(level).map((c) => ({ ...c, q: s.q, set: s, links: (c.links || []).filter(Boolean) }));
  const keyOf = (c) => c.id + "@" + level;

  // ---------- Алгоритм (параметры по умолчанию плагина: лёгкость 250 %, бонус «легко» 1,3, «трудно» ×0,5) ----------
  const BASE_EASE = 250, EASY_BONUS = 1.3, HARD_FACTOR = 0.5, MAX_IVL = 36525, NEW_PER_SESSION = 20;
  const today = () => { const d = new Date(); return Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000); };
  function schedule(st, grade) {
    const ivl0 = st ? st.ivl : 1, ease0 = st ? st.ease : BASE_EASE;
    const late = st ? Math.max(0, today() - st.due) : 0;
    let ivl, ease = ease0;
    if (grade === "again") return { ivl: 0, ease: Math.max(130, ease0 - 20) };
    if (grade === "hard") { ease = Math.max(130, ease0 - 20); ivl = Math.max(1, (ivl0 + late / 4) * HARD_FACTOR); }
    if (grade === "good") ivl = ((ivl0 + late / 2) * ease) / 100;
    if (grade === "easy") { ease = ease0 + 20; ivl = (((ivl0 + late / 2) * ease) / 100) * EASY_BONUS; }
    return { ivl: Math.min(MAX_IVL, Math.max(1, Math.round(ivl))), ease };
  }
  const fuzz = (ivl) => (ivl < 7 ? ivl : Math.max(1, ivl + Math.round((Math.random() * 2 - 1) * Math.max(1, ivl * 0.05))));
  const dayWord = (n) => { const a = n % 10, b = n % 100; return a === 1 && b !== 11 ? "день" : a >= 2 && a <= 4 && (b < 10 || b >= 20) ? "дня" : "дней"; };
  const fmtIvl = (n) => (n <= 0 ? "сейчас" : n < 30 ? `${n} ${dayWord(n)}` : n < 365 ? `${Math.round(n / 30)} мес.` : `${(n / 365).toFixed(1).replace(".", ",")} г.`);
  const isDue = (c, t) => { const st = srs[keyOf(c)]; return st && st.due <= t; };
  const isNew = (c) => !srs[keyOf(c)];
  function countsOf(sets) {
    const t = today(), seen = new Set(); let due = 0, nw = 0, total = 0;
    sets.forEach((s) => cardsOf(s).forEach((c) => { if (seen.has(c.id)) return; seen.add(c.id); total++; if (isNew(c)) nw++; else if (isDue(c, t)) due++; }));
    return { due, nw, total };
  }

  // ---------- Список колод ----------
  const openDecks = new Set(store.get("deckOpen", []));
    const pill = (n, cls, t) => `<span class="fc-pill ${cls} ${n ? "" : "zero"}" title="${t}">${n}</span>`;
  function subRow(sx) {
    const n = countsOf([sx]);
    return `<a class="fc-sub-row" href="#/sim/cards/${sx.id}"><span class="fc-sub-name">${esc(sx.ru)}</span>${pill(n.due, "due", "К повторению")}${pill(n.nw, "new", "Новые")}<span class="fc-tot">${n.total}</span></a>`;
  }
  function decksHtml() {
    return Object.entries(DECKS).map(([id, d]) => {
      const n = countsOf(d.sets()), open = openDecks.has(id), todo = n.due + Math.min(n.nw, NEW_PER_SESSION);
      return `<section class="fc-deck fc-deck-${id}">
        <div class="fc-deck-top"><div><p class="fc-deck-kicker">Колода</p><h3>${esc(d.ru)}</h3><p class="hint" style="margin:0">${esc(d.sub)}</p></div></div>
        ${id === "ethno" ? `<div class="chips fc-eth" role="group" aria-label="Страна традиции">${[["", "Все страны"], ...Object.entries(EC())].map(([k, t]) => `<button class="chip ${k === ethC ? "on" : ""}" type="button" data-ec="${k}">${esc(t)}</button>`).join("")}</div>` : ""}
        <div class="fc-counts"><span class="due"><b>${n.due}</b>повторить</span><span class="new"><b>${n.nw}</b>новые</span><span><b>${n.total}</b>всего</span></div>
        <div class="fc-deck-act"><a class="btn" href="#/sim/cards/${id}">${todo ? `Учить · ${todo}` : "На сегодня всё"}</a>
          <button class="btn ghost small" type="button" data-tg="${id}" aria-expanded="${open}">${open ? "Скрыть наборы" : `Наборы (${d.sets().length})`}</button></div>
        ${open ? `<div class="fc-subs"><div class="fc-sub-row head"><span class="fc-sub-name">Набор</span><span class="fc-pill due">повт.</span><span class="fc-pill new">нов.</span><span class="fc-tot">всего</span></div>${d.sets().map(subRow).join("")}</div>` : ""}
      </section>`;
    }).join("");
  }
  function hubHtml() {
    return `<div class="card fc-hub"><h2 style="margin-top:0">Карточки</h2>
      <p class="hint">Интервальное повторение, как в Obsidian: сначала карточки, которые пора повторить, потом новые. После ответа оцените, насколько легко было вспомнить, и карточка вернётся через подходящий интервал. На обороте источник и ссылки на уроки.</p>
      <div class="fc-levels" id="fcl">${Object.entries(LEVELS).map(([k, L]) => `<button type="button" class="chip ${+k === level ? "on" : ""}" data-l="${k}" title="${esc(L.desc)}">${L.ru}</button>`).join("")}</div>
      <p class="hint" id="fcd">${LEVELS[level].desc} У каждого уровня свои интервалы.</p>
      <div class="fc-decks" id="fcs">${decksHtml()}</div></div>`;
  }
  function bindHub() {
    const el = document.getElementById("fcl"); if (!el) return;
    el.addEventListener("click", (e) => {
      const b = e.target.closest("[data-l]"); if (!b) return;
      level = +b.dataset.l; store.set("cardsLevel", level);
      el.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
      $("#fcd").textContent = LEVELS[level].desc + " У каждого уровня свои интервалы."; $("#fcs").innerHTML = decksHtml();
    });
    $("#fcs").addEventListener("click", (e) => {
      const ec = e.target.closest("[data-ec]");
      if (ec) { ethC = ec.dataset.ec; store.set("ethCountry", ethC); $("#fcs").innerHTML = decksHtml(); return; }
      const b = e.target.closest("[data-tg]"); if (!b) return;
      const id = b.dataset.tg; openDecks.has(id) ? openDecks.delete(id) : openDecks.add(id); store.set("deckOpen", [...openDecks]);
      $("#fcs").innerHTML = decksHtml();
    });
  }

  // ---------- Повторение ----------
  function review(target, cram) {
    const deck = DECKS[target], set = ALL_SETS.find((s) => s.id === target);
    const back = `<a class="back" href="#/sim/cards">${ICON("back")} Колоды</a>`;
    if (!deck && !set) return cards();
    const ethT = ["ethno", "eth_facts", "eth_uses"].includes(target) ? ` · ${ethC ? EC()[ethC] : "все страны"}` : "";
    const title = (deck ? deck.ru : set.ru) + ethT, sets = deck ? deck.sets() : [set];
    const seen = new Set(), pool = [];
    sets.forEach((s) => cardsOf(s).forEach((c) => { if (!seen.has(c.id)) { seen.add(c.id); pool.push(c); } }));
    const t = today();
    let queue;
    if (cram) queue = shuffle(pool.filter((c) => !isNew(c))).slice(0, 20);
    else queue = [...shuffle(pool.filter((c) => isDue(c, t))).sort((a, b) => srs[keyOf(a)].due - srs[keyOf(b)].due), ...shuffle(pool.filter(isNew)).slice(0, NEW_PER_SESSION)];
    if (!queue.length) {
      const anySeen = pool.some((c) => !isNew(c));
      const next = pool.filter((c) => !isNew(c)).map((c) => srs[keyOf(c)].due).sort((a, b) => a - b)[0];
      app.innerHTML = `${back}<div class="card"><p class="verdict">${esc(title)}</p><h2 style="margin-top:.1em">На сегодня всё</h2>
        <p>${next != null ? `Следующее повторение через ${fmtIvl(next - t)}.` : pool.length ? "Изученных карточек пока нет: начните с обычного повторения." : "В этой колоде нет карточек."}</p>
        ${cram && !anySeen && pool.length ? `<div class="btn-row"><a class="btn" href="#/sim/cards/${target}">Учить новые</a></div>` : ""}
        <div class="btn-row">${anySeen ? `<a class="btn" href="#/sim/cards/cram.${target}">Повторить досрочно</a>` : ""}<a class="btn ghost" href="#/sim/cards">Колоды</a></div>
        ${anySeen ? `<p class="hint">При досрочном повторении интервалы не меняются.</p>` : ""}</div>`;
      return;
    }
    const stats = { again: 0, hard: 0, good: 0, easy: 0 }, done = [];
        const show = () => {
      if (!queue.length) return end();
      const c = queue[0], st = srs[keyOf(c)];
      const nDue = queue.filter((x) => !isNew(x)).length, nNew = queue.length - nDue;
      const opts = ["again", "hard", "good", "easy"].map((g) => ({ g, ivl: schedule(st, g).ivl }));
      const RU = { again: "Заново", hard: "Трудно", good: "Хорошо", easy: "Легко" };
      const pct = Math.round((done.length / (done.length + queue.length)) * 100);
      app.innerHTML = `${back}<div class="fc-top"><p class="kicker" style="margin:0">${esc(title)}${cram ? " · досрочно" : ""} · ${LEVELS[level].ru}</p>
          <span class="fc-left">${pill(nDue, "due", "К повторению")}${pill(nNew, "new", "Новые")}</span></div>
        <div class="fc-prog" aria-hidden="true"><span style="width:${pct}%"></span></div>
        <div class="fc-card" id="fc">
          <p class="fc-q"><span>${esc(c.set.ru)}</span>${st ? `<span class="fc-ivl">интервал ${fmtIvl(st.ivl)}</span>` : `<span class="fc-newtag">новая</span>`}</p>
          <p class="fc-ask">${esc(c.q)}</p>
          <div class="fc-main">${c.front}</div>${level === 1 && c.p && !c.front.includes(c.p.drug.lat) ? `<p class="hint" style="text-align:center;margin:0">${sub(c.p, level)}</p>` : ""}
          <div class="fc-backside" hidden><div class="fc-orn" aria-hidden="true"><span>❦</span></div><div class="fc-ans">${c.back}</div><p class="prose fc-more">${c.more || ""}</p>
            ${c.links.length ? `<div class="subs">${c.links.map((l) => `<a class="chip" href="${l.href}">${esc(l.t)}</a>`).join("")}</div>` : ""}</div>
        </div>
        <div class="btn-row fc-btns" id="fcshow"><button class="btn" type="button" id="fcs1">Показать ответ</button></div>
        <div class="fc-grades" id="fcg" hidden>${opts.map(({ g, ivl }) => `<button class="btn ${g === "good" ? "" : "ghost"} fc-g-${g}" type="button" data-g="${g}"><b>${RU[g]}</b><small>${cram ? "без изменения" : fmtIvl(g === "again" ? 0 : ivl)}</small></button>`).join("")}</div>
        <p class="hint fc-keys">Клавиши: пробел — ответ; 1 заново, 2 трудно, 3 хорошо, 4 легко.</p>`;
      const reveal = () => { if (!$("#fcg").hidden) return; $("#fc .fc-backside").hidden = false; $("#fcshow").hidden = true; $("#fcg").hidden = false; window.MUSIC?.sfx("plop"); };
      const grade = (g) => {
        stats[g]++;
        queue.shift();
        if (!cram) {
          const r = schedule(st, g), ivl = g === "again" ? 0 : fuzz(r.ivl);
          srs[keyOf(c)] = { due: today() + ivl, ivl: Math.max(1, ivl), ease: r.ease }; saveSrs();
        }
        if (g === "again") queue.push(c); else done.push(c);
        show();
      };
      $("#fcs1").addEventListener("click", reveal);
      $("#fc").addEventListener("click", (e) => { if (!e.target.closest("a, button, .src-body")) reveal(); });
      $("#fcg").addEventListener("click", (e) => { const b = e.target.closest("[data-g]"); if (b) grade(b.dataset.g); });
      keyH = (e) => {
        if (e.target.closest("input, textarea, select")) return;
        if (e.key === " " || e.key === "Enter") { if ($("#fcg")?.hidden) { e.preventDefault(); reveal(); } return; }
        const g = { 1: "again", 2: "hard", 3: "good", 4: "easy" }[e.key];
        if (g && $("#fcg") && !$("#fcg").hidden) { e.preventDefault(); grade(g); }
      };
    };
    const end = () => {
      keyH = null;
      window.MUSIC?.sfx(stats.again <= done.length * 0.2 ? "good" : "plop");
      const lessons = [...new Map(done.flatMap((c) => c.links).filter((l) => /#\/sim\/(lesson|chem)\//.test(l.href)).map((l) => [l.href, l])).values()].slice(0, 12);
      const left = countsOf(sets);
      app.innerHTML = `${back}<div class="card"><p class="verdict">${esc(title)}${cram ? " · досрочно" : ""}</p><h2 style="margin-top:.1em">Повторено карточек: ${done.length}</h2>
        <p class="fc-stat"><span>Заново ${stats.again}</span><span>Трудно ${stats.hard}</span><span>Хорошо ${stats.good}</span><span>Легко ${stats.easy}</span></p>
        ${lessons.length ? `<h4>Повторить теорию</h4><div class="subs">${lessons.map((l) => `<a class="chip" href="${l.href}">${esc(l.t)}</a>`).join("")}</div>` : ""}
        <div class="btn-row">${!cram && left.nw ? `<a class="btn" href="#/sim/cards/${target}?r=${Date.now()}">Ещё ${Math.min(NEW_PER_SESSION, left.nw)} новых</a>` : ""}<a class="btn ghost" href="#/sim/cards">Колоды</a></div></div>`;
    };
    show();
  }
  let keyH = null;
  document.addEventListener("keydown", (e) => { if (keyH && document.getElementById("fcg")) keyH(e); });

  function cards(arg) {
    if (arg && arg.startsWith("cram.")) return review(arg.slice(5), true);
    if (arg === "mix") return review("all");
    if (arg) return review(arg);
    app.innerHTML = `<a class="back" href="#/sim">${ICON("back")} Провизор</a>${hubHtml()}`;
    bindHub();
  }
  if (C.simx) C.simx.cards = cards;
  C.flash = { hubHtml, bindHub, setFor: (lessonId) => SETS.find((s) => s.lesson === lessonId) };
})();
