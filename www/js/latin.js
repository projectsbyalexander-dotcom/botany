/* Латинский словарь: раздел #/latin, всплывающая карточка по кнопкам с латынью и переключатель названий
   (только латынь / латынь и русский / только русский). Словарные статьи: js/latindata.js (window.LATIN). */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, D, byId, store, cite, norm } = C;
  const ICON = window.ICON;
  const L = window.LATIN || { sources: {}, terms: [] };
  if (L.sources) for (const [k, v] of Object.entries(L.sources)) if (!D.SOURCES[k]) D.SOURCES[k] = v;

  // ---------- Режим названий ----------
  const MODES = { lat: "Латынь", both: "Латынь и русский", ru: "Русский" };
  let mode = store.get("names", "both");
  if (!MODES[mode]) mode = "both";
  const applyMode = () => { const r = document.documentElement; r.classList.remove("names-lat", "names-ru", "names-both"); r.classList.add("names-" + mode); };
  applyMode();
  const setMode = (m) => { if (!MODES[m]) return; mode = m; store.set("names", m); applyMode(); $$(".nm-switch button").forEach((b) => b.classList.toggle("on", b.dataset.nm === m)); $$("select.nm-aware").forEach((s) => s.dispatchEvent(new Event("nm"))); };
  const switchHtml = () => `<div class="nm-switch" role="group" aria-label="Как показывать названия">${Object.entries(MODES).map(([k, t]) => `<button type="button" class="chip ${k === mode ? "on" : ""}" data-nm="${k}">${t}</button>`).join("")}</div>`;
  document.addEventListener("click", (e) => { const b = e.target.closest(".nm-switch [data-nm]"); if (b) setMode(b.dataset.nm); });

  // Латинская кнопка: открывает карточку словаря
  const latT = (phrase, inner) => `<button type="button" class="lat-t" data-lat="${esc(phrase)}" title="Латинский словарь"><i>${inner || esc(phrase)}</i></button>`;
  // Пара названий: скрытие частей задаётся классом на <html>
  function nm(ru, lat, o = {}) {
    if (!lat) return o.b ? `<b>${ru}</b>` : ru;
    const r = o.b ? `<b>${ru}</b>` : ru;
    const l = o.btn ? latT(lat) : `<i>${esc(lat)}</i>`;
    return `<span class="nm"><span class="n-ru">${r}</span><span class="n-lat${o.muted === false ? "" : " muted"}">${l}</span></span>`;
  }
  // Ссылка с названием: в режиме латыни текст ссылки латинский, в смешанном латынь идёт следом
  const nmA = (href, ru, lat, o = {}) => `<a href="${href}"${o.cls ? ` class="${o.cls}"` : ""}>${o.b ? "<b>" : ""}<span class="n-ru">${ru}</span><i class="n-only-lat">${esc(lat || ru)}</i>${o.b ? "</b>" : ""}</a><span class="n-only-both"> <i class="muted" style="font-weight:400">${esc(lat)}</i></span>`;
  // Строка состава старинной прописи: латынь главная, русское пояснение рядом
  const fLat = (c) => { const lat = c.lat && c.lat !== "—" ? c.lat : ""; if (!lat || !c.ru) return esc(lat || c.ru || ""); return `<span class="n-lat">${esc(lat)}</span><span class="n-only-ru">${esc(c.ru)}</span> <span class="ru n-only-both">${esc(c.ru)}</span>`; };
  const nmText = (ru, lat) => (!lat ? ru : mode === "lat" ? lat : mode === "ru" ? ru : `${ru} (${lat})`);

  // ---------- Индекс словаря ----------
  const lower = (s) => String(s || "").toLowerCase().replace(/[^a-zа-яё\- ]/gi, " ").trim();
  const IDX = new Map();
  const add = (w, t, short) => { w = lower(w); if ((w.length >= 2 || short) && w && !IDX.has(w)) IDX.set(w, t); };
  for (const t of L.terms) {
    add(t.lat, t);
    String(t.lat).split(/[\s/,]+/).forEach((w) => (w.length > 3 || t.cat === "rx") && add(w.replace(/\.$/, ""), t, t.cat === "rx"));
    String(t.forms || "").split(/[;,]/).forEach((chunk) => {
      chunk.split(/\s+/).forEach((w) => { w = w.trim(); if (t.cat === "rx" && /^[A-Za-z]{1,5}\.([A-Za-z]{1,4}\.)*$/.test(w)) add(w.replace(/\./g, " ").trim(), t, true); if (/^[a-z][a-z-]{2,}$/i.test(w) && !/^(gen|pl|sg|nom|acc|abl)$/.test(w)) add(w, t); });
    });
  }
  // Сырьё приложения: название сырья ведёт к растению
  const DRUGS = new Map(D.PLANTS.filter((p) => p.drug.lat).map((p) => [lower(p.drug.lat), p]));
  const BIN = new Map(D.PLANTS.map((p) => [lower(p.lat), p]));
  function lookup(w) {
    const k = lower(w); if (!k) return null;
    if (IDX.has(k)) return IDX.get(k);
    // окончания: родительный падеж, множественное число
    for (const [a, b] of [["ae", "a"], ["i", "us"], ["i", "um"], ["is", "is"], ["orum", "um"], ["arum", "a"], ["um", "us"], ["es", "is"], ["a", "um"], ["ii", "ium"], ["is", "a"], ["ibus", ""], ["ae", "ae"]]) {
      if (k.endsWith(a)) { const s = k.slice(0, -a.length) + b; if (IDX.has(s)) return IDX.get(s); }
    }
    // ближайшая основа: самый длинный общий префикс, не короче 4 букв и 60 % слова
    let best = null, bl = 0;
    for (const [key, t] of IDX) {
      if (key.includes(" ")) continue;
      let i = 0; while (i < key.length && i < k.length && key[i] === k[i]) i++;
      if (i >= 4 && i >= 0.6 * Math.min(key.length, k.length) && i > bl) { best = t; bl = i; }
    }
    return best;
  }
  const CAT = { part: "Части растений", form: "Лекарственные формы", tech: "Технология и состояние сырья", rx: "Рецептура", epithet: "Видовые эпитеты", genus: "Роды растений", other: "Другое" };
  const entryHtml = (t, o = {}) => `<div class="lat-entry" id="lt-${esc(t.id)}">
      <p class="lat-head"><b><i>${esc(t.lat)}</i></b>${t.forms ? ` <span class="muted">${esc(t.forms)}</span>` : ""}</p>
      <p class="lat-ru">${esc(t.ru)} ${o.cat ? `<span class="ltag">${CAT[t.cat] || ""}</span>` : ""}</p>
      ${t.note ? `<p class="lat-note">${esc(t.note)} ${cite(t.s)}</p>` : cite(t.s)}
      ${(t.ex || []).length ? `<p class="lat-ex">${t.ex.map((x) => `<i>${esc(x)}</i>`).join(" · ")}</p>` : ""}</div>`;

  // Компактная строка раздела: латынь и перевод, статья раскрывается по нажатию
  const rowHtml = (t) => `<details class="lat-row" id="lt-${esc(t.id)}"><summary><i>${esc(t.lat)}</i> <span class="muted">${esc(t.forms || "")}</span><span class="lat-row-ru">${esc(t.ru)}</span></summary>
      ${t.note ? `<p class="lat-note">${esc(t.note)} ${cite(t.s)}</p>` : `<p>${cite(t.s)}</p>`}${(t.ex || []).length ? `<p class="lat-ex">${t.ex.map((x) => latT(x)).join(" · ")}</p>` : ""}</details>`;
  function phraseHtml(phrase) {
    const k = lower(phrase), p = DRUGS.get(k) || BIN.get(k);
    const words = String(phrase).replace(/[.,:;()«»"]/g, " ").split(/\s+/).filter((w) => /[a-z]/i.test(w));
    const seen = new Set();
    const parts = words.map((w) => { const t = lookup(w); if (t && seen.has(t.id)) return ""; if (t) seen.add(t.id); return t ? entryHtml(t) : /^(et|cum|ex|ad|in|pro|sine)$/i.test(w) ? "" : `<div class="lat-entry"><p class="lat-head"><b><i>${esc(w)}</i></b></p><p class="muted">Нет в словаре.</p></div>`; }).join("");
    return `${p ? `<p class="lat-plant">${DRUGS.get(k) ? "Сырьё" : "Растение"}: <a href="#/plant/${p.id}">${esc(DRUGS.get(k) ? p.drug.ru : p.ru)}</a></p>` : ""}${parts}`;
  }

  // ---------- Всплывающая карточка ----------
  let pop = null;
  function open(html, title) {
    close();
    pop = document.createElement("div");
    pop.className = "lat-pop";
    pop.innerHTML = `<div class="lat-box" role="dialog" aria-modal="true" aria-label="Латинский словарь">
      <div class="lat-bar"><b>${title || "Латинский словарь"}</b><button type="button" class="iconbtn lat-x" aria-label="Закрыть">×</button></div>
      <div class="lat-body">${html}</div>
      <div class="lat-foot">${switchHtml()}<a class="btn ghost small" href="#/latin">Весь словарь</a></div></div>`;
    document.body.appendChild(pop);
    pop.addEventListener("click", (e) => { if (e.target === pop || e.target.closest(".lat-x") || e.target.closest("a[href]")) close(); });
    pop.querySelector(".lat-x").focus();
  }
  function close() { if (pop) { pop.remove(); pop = null; } }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".lat-t"); if (!b) return;
    e.preventDefault(); e.stopPropagation();
    open(phraseHtml(b.dataset.lat), `<i>${esc(b.dataset.lat)}</i>`);
  });
  window.addEventListener("hashchange", close);
  // Быстрый поиск из шапки
  function quick() {
    open(`<input class="search" id="lq" placeholder="Латинское слово или название сырья" autocomplete="off" aria-label="Поиск в словаре"><div id="lqr"></div>`);
    const inp = $("#lq"); inp.focus();
    inp.addEventListener("input", () => { $("#lqr").innerHTML = listHtml(inp.value, "", 12); });
  }

  // ---------- Раздел словаря ----------
  // перевод термина ищется на всех языках приложения
  const match = (t, q) => !q || norm([t.lat, t.forms, C.ml(t.ru), ...(t.ex || [])].join(" ")).includes(norm(q));
  function listHtml(q, cat, limit) {
    let ts = L.terms.filter((t) => (!cat || t.cat === cat) && match(t, q));
    const drugs = q ? D.PLANTS.filter((p) => norm([p.drug.lat, p.lat, C.ml(p.drug.ru, p.ru)].join(" ")).includes(norm(q))) : [];
    if (limit) ts = ts.slice(0, limit);
    return `${drugs.slice(0, limit || 99).map((p) => `<div class="lat-entry"><p class="lat-head">${latT(p.drug.lat)} <span class="muted">· ${latT(p.lat)}</span></p><p class="lat-ru"><a href="#/plant/${p.id}">${esc(p.drug.ru)}</a>, ${esc(p.ru.toLowerCase())}</p></div>`).join("")}
      ${limit ? ts.map((t) => entryHtml(t, { cat: !cat })).join("") : Object.keys(CAT).filter((c) => ts.some((t) => t.cat === c)).map((c) => `<h3 class="lat-cat">${CAT[c]} <span class="muted">${ts.filter((t) => t.cat === c).length}</span></h3>${ts.filter((t) => t.cat === c).sort((a, b) => a.lat.localeCompare(b.lat)).map(rowHtml).join("")}`).join("") || (drugs.length ? "" : `<p class="muted">Ничего не найдено.</p>`)}`;
  }
  let cat = "", q = "";
  C.page("latin", function latinPage(id) {
    app.innerHTML = `<h1>Латинский словарь</h1>
      <p class="lead">Латынь аптечных названий: части растений, лекарственные формы, термины рецептуры, роды и видовые эпитеты. Название сырья строится так: род в родительном падеже и часть растения в именительном (<i>Matricariae flos</i>, цветки ромашки). Любое латинское название в приложении, выделенное пунктиром, открывает карточку словаря.</p>
      <div class="card"><h4 style="margin-top:0">Как показывать названия растений и сырья</h4>${switchHtml()}<p class="hint">Действует на справочник, страницы растений, болезни, механизмы, котелок и книгу рецептов. В симуляторе язык этикеток задаёт уровень сложности.</p></div>
      <input class="search" id="lsq" placeholder="Поиск: folium, отвар, officinalis…" value="${esc(q)}" autocomplete="off" aria-label="Поиск в словаре">
      <div class="chips" id="lcat">${[["", "Все"], ...Object.entries(CAT)].filter(([k]) => !k || L.terms.some((t) => t.cat === k)).map(([k, t]) => `<button class="chip ${k === cat ? "on" : ""}" data-c="${k}" type="button">${t}</button>`).join("")}</div>
      <div id="lres" class="lat-list"></div>
      <h2>Названия сырья в приложении</h2>
      <div class="table-wrap card"><table class="lat-tbl"><thead><tr><th>Сырьё</th><th>Русское название</th><th>Растение</th></tr></thead><tbody>
        ${D.PLANTS.filter((p) => p.drug.lat).sort((a, b) => a.drug.lat.localeCompare(b.drug.lat)).map((p) => `<tr><td>${latT(p.drug.lat)}</td><td><a href="#/plant/${p.id}">${esc(p.drug.ru)}</a></td><td>${latT(p.lat)}</td></tr>`).join("")}</tbody></table></div>`;
    const draw = () => { $("#lres").innerHTML = listHtml(q, cat); };
    $("#lsq").addEventListener("input", (e) => { q = e.target.value; draw(); });
    $("#lcat").addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (!b) return; cat = b.dataset.c; $$("#lcat .chip").forEach((x) => x.classList.toggle("on", x === b)); draw(); });
    draw();
    if (id) { const el = document.getElementById("lt-" + id); if (el) { el.open = true; el.scrollIntoView({ block: "center" }); el.classList.add("hl"); } }
  });

  Object.assign(C, { nm, nmA, fLat, nmText, latT, latin: { open: quick, phraseHtml, lookup, setMode, mode: () => mode } });
  const hb = document.getElementById("latbtn");
  if (hb) hb.addEventListener("click", quick);
})();
