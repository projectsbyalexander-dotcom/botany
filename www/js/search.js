/* Поиск по всему справочнику и алфавитный каталог. */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, norm, D, byId, diseaseIndex, diseasePath, store } = C;
  const { PLANTS, DISEASE_LAT, DISEASE_ICD, DISEASE_SYN, SOURCES } = D;
  // На другом языке ищем и по переводу (js/i18n.js): названия на обоих языках, текст в переводе
  const T = window.I18N && I18N.lang !== "ru" ? (s) => I18N.t(String(s)) : null;
  const txt = (segs) => (segs || []).map((g) => (T ? T(g.t) : g.t)).join(" ");
  // рецепты в выдаче идут выше растений
  const TYPES = { disease: "Болезни", recipe: "Рецепты", legacy: "Наследие", plant: "Растения", class: "Вещества", place: "Аптеки", source: "Источники" };

  let INDEX = null;
  function build() {
    const out = [];
    for (const p of PLANTS) {
      const T = window.TEXTS?.plants?.[p.id] || {}, K = window.K3?.plants?.[p.id] || {};
      out.push({ type: "plant", title: p.ru, sub: `${p.lat} · ${p.drug.lat}`, href: `#/plant/${p.id}`, letter: p.ru,
        names: [p.ru, p.lat, p.drug.ru, p.drug.lat, p.fam],
        body: [p.compounds, txt(T.desc), txt(T.chem), txt(T.chemK), txt(T.ident), p.uses.map((u) => u.t + " " + diseaseIndex[u.c].ru).join(" "), p.cautions.map((c) => c.t).join(" "), txt(K.habitat), txt(K.harvest), txt(window.MECH?.plants?.[p.id]), (C.tagsOf(p) || []).join(" "),
          ...["names", "uses", "facts", "warn"].map((k) => txt(window.ETHNO?.plants?.[p.id]?.[k])), (window.ETHNO?.plants?.[p.id]?.uses || []).map((u) => u.r).join(" ")] });
    }
    for (const d of Object.values(diseaseIndex)) {
      const I = window.DINFO?.diseases?.[d.id] || {};
      out.push({ type: "disease", title: d.ru, sub: [DISEASE_LAT[d.id], DISEASE_ICD[d.id] && "МКБ-10 " + DISEASE_ICD[d.id], d.parent && diseasePath(d.id)[0].ru].filter(Boolean).join(" · "), href: `#/diseases/${d.id}`, letter: d.ru,
        names: [d.ru, DISEASE_LAT[d.id], DISEASE_ICD[d.id], DISEASE_SYN[d.id]], body: [d.note, ...Object.values(I).map(txt)] });
    }
    for (const c of window.MECH?.classes || []) out.push({ type: "class", title: c.ru, sub: c.lat || "", href: `#/pharm/${c.id}`, letter: c.ru, names: [c.ru, c.lat, c.tag], body: [txt(c.chem), txt(c.mech), txt(c.effects), txt(c.safety)] });
    for (const r of C.potRecipeList ? C.potRecipeList() : []) out.push({ type: "recipe", letter: r.title, ...r });
    const L = window.LEGACY || {};
    for (const m of [...(L.mixtures || []), ...(L.remedies || [])]) out.push({ type: "legacy", title: m.ru, sub: [m.lat || m.orig, m.edition || m.period || m.date].filter(Boolean).join(" · "), href: `#/heritage/${m.id}`, letter: m.ru,
      names: [m.ru, m.lat, m.orig], body: [m.use, txt(m.text), txt(m.modern), (m.composition || []).map((c) => `${c.lat} ${c.ru}`).join(" "), m.region, m.place] });
    for (const p of L.places || []) out.push({ type: "place", title: p.name, sub: [p.where, p.years].filter(Boolean).join(" · "), href: `#/heritage/${p.id}`, letter: p.name, names: [p.name, p.where], body: [txt(p.text)] });
    for (const [k, s] of Object.entries(SOURCES)) out.push({ type: "source", title: s.short, sub: s.kind || "", href: "#/sources", letter: s.short, names: [s.short], body: [s.full] });
    if (T) out.forEach((e) => { e.names = [...e.names, ...e.names.filter(Boolean).map(T)]; e.body = e.body.filter(Boolean).map(T); });
    // названия на всех языках приложения: ромашку находит и «chamomile», и «Kamille», и «rumianek» при любом языке интерфейса
    out.forEach((e) => { e.names = [...e.names, ...e.names.map((x) => window.I18N_NAMES?.[x])]; });
    out.forEach((e) => { e.n = norm(e.names.filter(Boolean).join(" | ")); e.b = norm(e.body.filter(Boolean).join(" ")); e.raw = e.body.filter(Boolean).join(" "); });
    return out;
  }
  function search(q) {
    INDEX = INDEX || build();
    const toks = norm(q).split(/[\s,.;]+/).filter((t) => t.length >= 2);
    if (!toks.length) return [];
    const res = [];
    for (const e of INDEX) {
      let score = 0, ok = true;
      for (const t of toks) {
        const words = e.n.split(/[\s|()·,]+/);
        if (e.n.startsWith(t)) score += 100;
        else if (words.some((w) => w.startsWith(t))) score += 60;
        else if (e.n.includes(t)) score += 40;
        else if (e.b.includes(t)) score += 8 + Math.min(10, e.b.split(t).length);
        else { ok = false; break; }
      }
      if (ok) res.push({ e, score: score + (e.type === "plant" ? 5 : e.type === "disease" ? 4 : 0) });
    }
    return res.sort((a, b) => b.score - a.score).map((x) => x.e);
  }
  function snippet(e, q) {
    const t = norm(q).split(/\s+/).filter((x) => x.length >= 2)[0];
    if (!t || e.n.includes(t)) return "";
    const i = norm(e.raw).indexOf(t); if (i < 0) return "";
    const a = Math.max(0, i - 60), s = e.raw.slice(a, i + t.length + 80);
    const j = norm(s).indexOf(t);
    return `<div class="muted" style="font-size:.86rem;font-family:var(--f-text)">${a ? "…" : ""}${esc(s.slice(0, j))}<mark>${esc(s.slice(j, j + t.length))}</mark>${esc(s.slice(j + t.length))}…</div>`;
  }
  function resultsHtml(q, { limit = 60, compact = false } = {}) {
    const r = search(q);
    if (!r.length) return `<p class="muted">Ничего не нашлось. Попробуйте латинское название, синоним или код МКБ-10.</p>`;
    const by = {}; r.slice(0, limit).forEach((e) => (by[e.type] = by[e.type] || []).push(e));
    return Object.keys(TYPES).filter((k) => by[k]).map((k) => `<div class="res-group"><h4>${TYPES[k]} <span class="muted">${by[k].length}</span></h4>
      ${by[k].slice(0, compact ? 6 : 99).map((e) => `<a class="res" href="${e.href}" style="display:block"><span style="display:flex;gap:10px;align-items:baseline"><b>${e.type === "legacy" ? C.legacyMark(true) : ""}${esc(e.title)}</b><small class="muted">${esc(e.sub)}</small></span>${snippet(e, q)}</a>`).join("")}</div>`).join("");
  }
  C.search = { resultsHtml, search };

  C.page("search", function searchPage(q0) {
    let q = q0 || store.get("lastQ", "");
    app.innerHTML = `<h1>Поиск</h1>
      <p class="lead">Ищет по названиям, латыни, синонимам, кодам МКБ-10 и по всему тексту статей: описаниям, химии, механизмам, показаниям, предосторожностям, старинным прописям.</p>
      <input class="search" id="sq" value="${esc(q)}" placeholder="Например: арбутин, Tiliae flos, K29, бессонница, туйон" autocomplete="off" aria-label="Поиск" autofocus>
      <div class="btn-row"><a class="btn ghost small" href="#/catalog">Алфавитный каталог</a></div>
      <div class="card results" id="sr" style="margin-top:12px"></div>`;
    const run = () => { store.set("lastQ", q); $("#sr").innerHTML = q.trim().length >= 2 ? resultsHtml(q) : `<p class="muted">Введите хотя бы две буквы.</p>`; };
    $("#sq").addEventListener("input", (e) => { q = e.target.value; run(); });
    run(); $("#sq").focus();
  });

  C.page("catalog", function catalogPage(type) {
    INDEX = INDEX || build();
    const kinds = [["plant", "Растения"], ["drug", "Сырьё (латынь)"], ["disease", "Болезни"], ["class", "Вещества"], ["legacy", "Наследие"]];
    type = kinds.some((k) => k[0] === type) ? type : "plant";
    let rows;
    if (type === "drug") rows = PLANTS.filter((p) => p.drug.lat).map((p) => ({ title: p.drug.lat, sub: `${p.drug.ru} · ${p.lat}`, href: `#/plant/${p.id}`, letter: p.drug.lat }));
    else rows = INDEX.filter((e) => e.type === type).map((e) => ({ ...e }));
    if (type === "plant") rows.push(...PLANTS.map((p) => ({ title: p.lat, sub: p.ru, href: `#/plant/${p.id}`, letter: p.lat, lat: true })));
    // На другом языке: русские названия заменяются переводом, буквы и порядок по нему
    if (T) rows.forEach((r) => { if (!r.lat && r.type !== "drug") { r.title = T(r.title); r.letter = T(r.letter); } });
    rows.sort((a, b) => a.letter.localeCompare(b.letter, T ? I18N.lang : "ru"));
    const groups = {};
    rows.forEach((r) => { const L = r.letter.trim()[0].toUpperCase(); (groups[L] = groups[L] || []).push(r); });
    const letters = Object.keys(groups);
    app.innerHTML = `<h1>Каталог</h1>
      <p class="lead">Полный алфавитный указатель. Растения перечислены и по-русски, и по-латыни.</p>
      <div class="tabs">${kinds.map(([k, t]) => `<a href="#/catalog/${k}" class="${k === type ? "on" : ""}">${t}</a>`).join("")}</div>
      <div class="chips" id="az" data-noi18n>${letters.map((L) => `<button class="chip" type="button" data-l="${L}">${L}</button>`).join("")}</div>
      <div class="card">${letters.map((L) => `<h3 id="az-${L}" style="scroll-margin-top:70px" data-noi18n>${L}</h3>${groups[L].map((r) => `<a class="res" href="${r.href}"><span>${r.type === "legacy" ? C.legacyMark(true) : ""}${r.lat ? `<i>${esc(r.title)}</i>` : esc(r.title)}</span><small class="muted">${esc(r.sub)}</small></a>`).join("")}`).join("")}</div>`;
    $("#az").addEventListener("click", (e) => { const b = e.target.closest("[data-l]"); if (b) document.getElementById("az-" + b.dataset.l)?.scrollIntoView({ behavior: "smooth" }); });
  });
})();
