/* Травник: ядро (данные, общие элементы, справочник растений, источники, маршрутизация).
   Остальные разделы лежат в отдельных файлах и регистрируются через CORE.page(name, fn). */
(function () {
  const D = window.DATA;
  const { DISEASE_LAT, DISEASE_ICD, DISEASE_SYN, COUNTRIES, SOURCES, DISEASES, PLANTS, METHODS, ACTIONS } = D;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const app = $("#app");
  if (window.TEXTS) Object.assign(SOURCES, TEXTS.sources);
  for (const extra of [window.LEGACY, window.MECH, window.DINFO, window.ETHNO]) if (extra && extra.sources) {
    for (const [k, v] of Object.entries(extra.sources)) if (!SOURCES[k]) SOURCES[k] = v;
  }
  const byId = Object.fromEntries(PLANTS.map((p) => [p.id, p]));
  const EV = { ema: "EMA", text: "учебник", ethno: "народное", hist: "историческое" };
  const EV_LONG = { ema: "Монография EMA (ЕС)", text: "Учебная фармакогнозия", ethno: "Народное применение", hist: "Историческая пропись" };

  // ---------- Хранилище (только удобства одного читателя) ----------
  const store = {
    get(k, d) { try { const v = localStorage.getItem("travnik." + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem("travnik." + k, JSON.stringify(v)); } catch {} },
  };
  const state = { countries: store.get("countries", []) };

  // ---------- Болезни: индекс ----------
  const diseaseIndex = {};
  (function walk(nodes, parent, sys) {
    for (const n of nodes) {
      diseaseIndex[n.id] = { ...n, parent, sys: sys || n.id };
      if (n.children) walk(n.children, n.id, sys || n.id);
    }
  })(DISEASES, null, null);
  const descendants = (id) => {
    const out = [id], n = diseaseIndex[id];
    (n?.children || []).forEach((c) => out.push(...descendants(c.id)));
    return out;
  };
  const diseasePath = (id) => { const p = []; let n = diseaseIndex[id]; while (n) { p.unshift(n); n = diseaseIndex[n.parent]; } return p; };

  // ---------- Сверка с источниками: уточнения текстов, страницы, удаление неподтверждённого ----------
  if (window.TEXTS) {
    for (const p of PLANTS) {
      const k = TEXTS.plants[p.id]?.kuses;
      if (k) p.uses.push(...k.filter((u) => diseaseIndex[u.c] && !p.uses.some((x) => x.c === u.c && x.s.some((z) => z.id === "karpuk")))
        .map((u) => ({ c: u.c, ev: "text", t: u.t, s: u.s })));
    }
    const starts = (t, m) => m && t.replace(/\s+/g, " ").startsWith(m.replace(/\s+/g, " "));
    for (const x of TEXTS.patches || []) {
      const p = byId[x.plant]; if (!p) continue;
      const pools = x.kind === "use" ? [p.uses] : x.kind === "caution" ? [p.cautions] : [p.uses, p.cautions];
      for (const pool of pools) {
        for (let i = pool.length - 1; i >= 0; i--) {
          const e = pool[i];
          if (!starts(e.t, x.match) || (x.c && e.c && x.c !== e.c)) continue;
          const srcId = x.src || "ema";
          if (x.action === "remove") {
            const rest = e.s.filter((z) => z.id !== srcId);
            if (rest.length) e.s = rest; else pool.splice(i, 1);
          } else {
            if (x.action === "replace" && x.t) e.t = x.t;
            if (x.s && x.s[0] && x.s[0].id) e.s = [...e.s.filter((z) => z.id !== srcId), ...x.s];
          }
        }
      }
    }
  }

  const inCountries = (p) => !state.countries.length || state.countries.some((c) => p.countries[c]);
  function plantsFor(diseaseId, { evs } = {}) {
    const ids = new Set(descendants(diseaseId));
    return PLANTS.filter(inCountries).filter((p) => p.uses.some((u) => ids.has(u.c) && (!evs || evs.includes(u.ev))));
  }

  // ---------- Мелочи интерфейса ----------
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const norm = (s) => String(s || "").toLowerCase().replace(/ё/g, "е");
  function toast(html, ms = 3200) {
    $$(".toast").forEach((t) => t.remove());
    const t = document.createElement("div");
    t.className = "toast"; t.setAttribute("role", "status"); t.innerHTML = html; document.body.appendChild(t);
    setTimeout(() => t.remove(), ms);
  }
  const CODE = { pl: "PL", de: "DE", sk: "SK", by: "BY" };
  const flags = (p) => {
    const ks = Object.keys(COUNTRIES).filter((c) => p.countries[c]);
    return ks.length === 4 ? "" : `<span class="cc" title="Встречается только в этих странах">${ks.map((c) => CODE[c]).join(" ")}</span>`;
  };
  function srcList(list) {
    return list.map((s) => {
      const src = SOURCES[s.id]; if (!src) return "";
      const url = s.id === "ema" && s.search ? `https://www.ema.europa.eu/en/search?search_api_fulltext=${encodeURIComponent(s.search)}` : (s.url || src.url);
      const label = `${esc(src.full || src.short)}${s.loc ? ` <b>${esc(s.loc)}</b>` : ""}`;
      return url ? `${label} <a href="${esc(url)}" target="_blank" rel="noopener">открыть</a>` : label;
    }).filter(Boolean).join("<br>");
  }
  function cite(list) {
    if (!list || !list.length) return "";
    const body = srcList(list); if (!body) return "";
    return `<span class="src"><button class="src-tog" type="button" aria-expanded="false">источник</button><span class="src-body" hidden>${body}</span></span>`;
  }
  const prose = (segs, cls = "prose") => segs && segs.length ? `<p class="${cls}">${segs.map((g) => `${g.t} ${cite(g.s)}`).join(" ")}</p>` : "";
  const items = (segs) => (segs || []).map((g) => `<p class="prose">${g.t} ${cite(g.s)}</p>`).join("");
  document.addEventListener("click", (e) => {
    const b = e.target.closest(".src-tog"); if (!b) return;
    const body = b.nextElementSibling; body.hidden = !body.hidden;
    b.classList.toggle("open", !body.hidden); b.setAttribute("aria-expanded", String(!body.hidden));
  });
  function countryChips() {
    return `<div class="chips" id="cf" role="group" aria-label="Страны">${Object.entries(COUNTRIES).map(([k, c]) =>
      `<button class="chip ${state.countries.includes(k) ? "on" : ""}" data-c="${k}" type="button">${c.ru}</button>`).join("")}
      <button class="chip ${state.countries.length ? "" : "on"}" data-c="" type="button">Все страны</button></div>`;
  }
  function bindChips(rerender) {
    $("#cf")?.addEventListener("click", (e) => {
      const b = e.target.closest("[data-c]"); if (!b) return;
      const c = b.dataset.c;
      if (!c) state.countries = [];
      else state.countries = state.countries.includes(c) ? state.countries.filter((x) => x !== c) : [...state.countries, c];
      store.set("countries", state.countries);
      rerender();
    });
  }
  const latName = (id) => DISEASE_LAT[id] ? ` <i class="lat muted">${DISEASE_LAT[id]}</i>` : "";
  const icd = (id) => DISEASE_ICD[id] ? `<span class="icd" title="Код МКБ-10">${DISEASE_ICD[id]}</span>` : "";

  // Классы веществ — метки сырья
  const TAG_COLORS = {
    "эфирное масло": "#4f6d3a", "дубильные вещества": "#6b4a2e", "слизи": "#3e6470", "горечи": "#7a5a1e",
    "флавоноиды": "#7a6a1e", "сапонины": "#5b4a7a", "фенологликозиды": "#7a3e3e", "кумарины": "#3e5a7a",
    "витамины": "#7a4a1e", "иридоиды": "#4a5a3e", "кремниевая кислота": "#5a5a5a", "жирное масло": "#6a5a2e",
    "полисахариды": "#3e6a5a", "алкалоиды": "#6a2e4a", "антраценпроизводные": "#7a2e2e",
  };
  const TAG_RULES = [
    ["эфирное масло", /эфирн/i], ["дубильные вещества", /дубильн/i], ["слизи", /слиз/i], ["горечи", /гореч/i],
    ["флавоноиды", /флавоно/i], ["сапонины", /сапонин/i], ["фенологликозиды", /арбутин|фенолгликоз|фенологликоз/i],
    ["кумарины", /кумарин/i], ["витамины", /витамин|каротино/i], ["иридоиды", /иридоид/i], ["кремниевая кислота", /кремни/i],
    ["жирное масло", /жирное масло/i], ["полисахариды", /инулин|пектин|полисахар/i],
  ];
  const tagsOf = (p) => (window.TEXTS?.plants?.[p.id]?.tags) || TAG_RULES.filter(([, re]) => re.test(p.compounds)).map(([t]) => t);
  const classOfTag = (t) => (window.MECH?.classes || []).find((c) => c.tag === t);
  const tagPill = (t, n) => {
    const c = classOfTag(t);
    const inner = `${n ? "+" + n + " " : ""}${t}`;
    return c ? `<a class="tag" style="--tc:${TAG_COLORS[t] || "#555"};text-decoration:none" href="#/pharm/${c.id}">${inner}</a>` : `<span class="tag" style="--tc:${TAG_COLORS[t] || "#555"}">${inner}</span>`;
  };
  const photoOf = (p, i = 0) => window.INAT?.plants?.[p.id]?.photos?.[i];
  const thumb = (p) => { const ph = photoOf(p); return ph ? `<img src="${ph.file}" alt="" loading="lazy">` : ART.draw(p); };

  const C2 = () => window.CORE;
  // ---------- Регистрация разделов ----------
  const PAGES = {};
  const page = (name, fn) => (PAGES[name] = fn);

  const NAV = [
    ["plants", "Растения", "leaf"], ["diseases", "Болезни", "cross"], ["pharm", "Механизмы", "mortar"],
    ["sim", "Провизор", "flask"], ["heritage", "Наследие", "scroll"], ["map", "Карта", "map"],
    ["book", "Рецепты", "book"], ["latin", "Латынь", "scroll"], ["sources", "Источники", "library"], ["pot", "Котелок", "pot"],
  ];
  const TABS = [["plants", "Растения", "leaf"], ["diseases", "Болезни", "cross"], ["sim", "Провизор", "flask"], ["heritage", "Наследие", "scroll"], ["map", "Карта", "map"], ["", "Ещё", "library"]];
  $("#logo").innerHTML = `${ICON("leaf")} Травник`;
  $("#srch").innerHTML = ICON("search");
  $("#nav").innerHTML = NAV.map(([h, t]) => `<a href="#/${h}" class="${h === "pot" ? "fun" : ""}">${t}</a>`).join("");
  $("#tabbar").innerHTML = TABS.map(([h, t, i]) => `<a href="#/${h}">${ICON(i)}<span>${t}</span></a>`).join("");

  // ---------- Главная ----------
  page("", function home() {
    const nLeaves = Object.values(diseaseIndex).filter((d) => !d.children).length;
    const nHist = (window.LEGACY?.mixtures?.length || 0) + (window.LEGACY?.remedies?.length || 0);
    const tiles = [
      ["plants", "leaf", "Растения", "Монографии: сырьё, химия, механизм действия, применение, приготовление, предосторожности."],
      ["diseases", "cross", "Болезни", "По системам органов и МКБ-10: этиология, патогенез, лечение и место фитотерапии."],
      ["pharm", "mortar", "Механизмы", "Классы действующих веществ: химия, фармакология, безопасность."],
      ["sim", "flask", "Симулятор провизора", "Курс из уроков и рабочая смена по рецептам: от прописи до этикетки, три уровня."],
      ["heritage", "scroll", "Наследие", "Старинные аптечные сборы, народные смеси, исторические аптеки и рецепты, проверенные наукой."],
      ["map", "map", "Карта", "Где растения встречаются чаще: регионы четырёх стран по наблюдениям iNaturalist."],
      ["book", "book", "Книга рецептов", "Все сборы и средства, которые можно приготовить, с пометкой сваренных."],
      ["catalog", "search", "Каталог", "Алфавитный указатель растений, сырья, болезней и веществ."],
      ["latin", "scroll", "Латинский словарь", "Части растений, лекарственные формы, рецептура, роды и эпитеты; выбор языка названий."],
      ["sources", "library", "Источники", "Монографии EMA, учебник, фармакопеи, статьи."],
      ["pot", "pot", "Котелок", "Свободная игра: смешай сырьё и узнай, что получилось."],
    ];
    app.innerHTML = `
      <div class="hero">
        <div class="hero-art" aria-hidden="true">${["chamomile", "valerian", "stjohns", "linden", "plantain_lanc", "calendula", "yarrow", "bilberry", "sage"].map((id) => ART.draw(byId[id])).join("")}</div>
        <h1>Травник Старого Света</h1>
        <p>Фармакогнозия европейской традиции: лекарственные растения Польши, Германии, Словакии и Беларуси. Учебник и быстрый справочник; у каждого утверждения есть источник.</p>
        <div class="stats-line"><span><b>${PLANTS.length}</b>растений</span><span><b>${nLeaves}</b>состояний по МКБ-10</span><span><b>${(window.MECH?.classes || []).length || "—"}</b>классов веществ</span><span><b>${nHist || "—"}</b>исторических рецептов</span><span><b>${Object.keys(SOURCES).length}</b>источников</span></div>
      </div>
      <input class="search" id="gq" placeholder="Быстрый поиск: растение, латынь, болезнь, код МКБ, вещество" autocomplete="off" aria-label="Поиск по справочнику">
      <div id="gres" class="results"></div>
      <div class="menu">${tiles.map(([h, i, t, d]) => `<a href="#/${h}" class="card tile ${h === "pot" ? "fun" : ""}">${ICON(i)}<div><b>${t}</b><span>${d}</span></div></a>`).join("")}</div>
      <p class="notice">Учебное приложение, не медицинская рекомендация. Перед применением растительных средств посоветуйтесь с врачом или фармацевтом.</p>`;
    $("#gq").addEventListener("input", (e) => {
      const q = e.target.value;
      $("#gres").innerHTML = q.trim().length >= 2 ? `<div class="card">${C2().search.resultsHtml(q, { limit: 30, compact: true })}<div class="btn-row"><a class="btn ghost small" href="#/search/${encodeURIComponent(q)}">Все результаты</a></div></div>` : "";
    });
  });

  // ---------- Справочник растений ----------
  const PARTS = { flower: "Цветки", leaf: "Листья", herb: "Трава", root: "Корни и корневища", bark: "Кора", berry: "Плоды и семена", seed: "Плоды и семена", thallus: "Слоевища", bulb: "Луковицы", bud: "Почки", shoot: "Побеги", cone: "Шишки", resin: "Смола", sap: "Сок (пасока)" };
  const partsOf = (p) => (p.parts && p.parts.length ? p.parts : p.part ? [p.part] : []);
  const partsText = (p) => [...new Set(partsOf(p).map((k) => PARTS[k]).filter(Boolean))].join(", ");
  page("plants", function plantsList() {
    let q = store.get("plantsQ", ""), part = "", view = store.get("plantsView", "cards");
    const render = () => {
      const qq = norm(q.trim());
      const list = PLANTS.filter(inCountries).filter((p) => (!part || partsOf(p).some((k) => PARTS[k] === part)) && (!qq ||
        norm([p.ru, p.lat, p.drug.ru, p.drug.lat, p.fam, p.compounds, tagsOf(p).join(" ")].join(" ")).includes(qq) ||
        p.uses.some((u) => norm(diseaseIndex[u.c].ru + " " + (DISEASE_SYN[u.c] || "")).includes(qq))));
      if (view === "table") {
        $("#plist").className = "";
        $("#plist").innerHTML = list.length ? `<div class="card table-wrap"><table class="htable"><thead><tr><th>Растение</th><th>Сырьё</th><th>Ведущие вещества</th><th>Показания (EMA / учебник)</th><th>Форма</th></tr></thead><tbody>${list.map((p) => {
          const cs = [...new Set(p.uses.filter((u) => u.ev !== "ethno").map((u) => u.c))];
          const mm = METHODS[p.prep];
          return `<tr><td><a href="#/plant/${p.id}"><b><span class="n-ru">${p.ru}</span><i class="n-only-lat">${p.lat}</i></b></a><span class="n-only-both"><br><i class="muted">${p.lat}</i></span></td><td><i class="n-lat">${p.drug.lat}</i><span class="n-only-ru">${p.drug.ru}</span></td><td>${tagsOf(p).join(", ")}</td><td>${cs.map((c) => `<a href="#/diseases/${c}">${diseaseIndex[c].ru}</a>${p.uses.some((u) => u.c === c && u.ev === "ema") ? ` <span class="badge ema">EMA</span>` : ""}`).join("<br>")}</td><td>${mm ? mm.ru : ""}</td></tr>`;
        }).join("")}</tbody></table></div>` : `<p>Ничего не нашлось.</p>`;
        $("#pcount").textContent = `${list.length} из ${PLANTS.length}`;
        return;
      }
      $("#plist").className = "grid";
      $("#plist").innerHTML = list.length ? list.map((p) => `
        <a class="card pcard" href="#/plant/${p.id}">
          <div class="thumb">${thumb(p)}</div>
          <div class="body"><span class="name"><span class="n-ru">${p.ru}</span><i class="n-only-lat">${p.lat}</i></span><span class="lat n-only-both">${p.lat}</span><span class="muted n-lat" style="font-size:.85rem">${p.drug.lat}</span><span class="muted n-only-ru" style="font-size:.85rem">${p.drug.ru}</span>${partsText(p) ? `<span class="muted" style="font-size:.85rem">Части: ${partsText(p).toLowerCase()}</span>` : ""}${flags(p) ? `<span class="flags">${flags(p)}</span>` : ""}</div>
        </a>`).join("") : `<p>Ничего не нашлось.</p>`;
      $("#pcount").textContent = `${list.length} из ${PLANTS.length}`;
    };
    app.innerHTML = `
      <h1>Растения</h1>
      <p class="lead">Лекарственное растительное сырьё европейской традиции. Поиск по русскому и латинскому названию, веществу или болезни.</p>
      <div class="toolbar">
        <div class="search-row"><input class="search" id="q" placeholder="Например: Hyperici herba, дубильные, кашель" value="${esc(q)}" autocomplete="off" aria-label="Поиск растений"><div class="seg" id="vw">${[["cards", "Карточки"], ["table", "Таблица"]].map(([k, t]) => `<button type="button" data-v="${k}" class="${view === k ? "on" : ""}">${t}</button>`).join("")}</div></div>
        <div class="chips" id="parts"><button class="chip on" data-part="" type="button">Всё сырьё</button>${[...new Set(Object.values(PARTS))].map((t) => `<button class="chip" data-part="${t}" type="button">${t}</button>`).join("")}</div>
        ${countryChips()}
      </div>
      <p class="hint" id="pcount"></p>
      <div class="grid" id="plist"></div>`;
    $("#q").addEventListener("input", (e) => { q = e.target.value; store.set("plantsQ", q); render(); });
    $("#vw").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (!b) return; view = b.dataset.v; store.set("plantsView", view); $$("#vw button").forEach((x) => x.classList.toggle("on", x === b)); render(); });
    $("#parts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-part]"); if (!b) return;
      part = b.dataset.part; $$("#parts .chip").forEach((c) => c.classList.toggle("on", c === b)); render();
    });
    bindChips(() => PAGES.plants());
    render();
  });

  // Единая метка старинного рецепта: ставится везде, где такой рецепт появляется.
  const legacyMark = (short) => `<span class="badge legacy" title="Старинный рецепт из раздела «Наследие»">${short ? "старинный" : "Старинный рецепт"}</span>`;
  function heritageFor(id) {
    const L = window.LEGACY; if (!L) return [];
    const X = window.POTX?.legacy || {};
    const alias = byId[id]?.potx;   // то же сырьё в котелке под другим id
    return [...(L.mixtures || []), ...(L.remedies || [])].filter((m) => (m.plant_ids || []).includes(id) || X[m.id]?.ing.includes(id) || (alias && X[m.id]?.ing.includes(alias)));
  }

  page("plant", function plantPage(id) {
    const p = byId[id];
    if (!p) return (app.innerHTML = "<p>Растение не найдено.</p>");
    const groups = {};
    p.uses.forEach((u) => (groups[u.c] = groups[u.c] || []).push(u));
    const m = METHODS[p.prep];
    const T = (window.TEXTS && TEXTS.plants[p.id]) || {};
    const I = (window.INAT && INAT.plants[p.id]) || {};
    const K = (window.K3 && K3.plants[p.id]) || {};
    const MC = window.MECH?.plants?.[p.id];
    const photos = I.photos || [];
    const her = heritageFor(p.id);
    const inatSrc = { id: "inat", loc: I.via ? `${I.via}, данные на ${I.retrieved}` : `данные получены ${window.INAT ? INAT.retrieved : ""}` };
    const fig = (ph) => `<figure><img src="${ph.file}" alt="${esc(p.ru)}: ${esc(ph.caption)}" loading="lazy">
      <figcaption>${esc(ph.caption)}. Фото: ${esc(ph.author)}, ${ph.license_url ? `<a href="${ph.license_url}" target="_blank" rel="noopener">${esc(ph.license)}</a>` : esc(ph.license)}, <a href="${ph.obs_url}" target="_blank" rel="noopener">наблюдение iNaturalist</a></figcaption></figure>`;
    const emaC = [...new Set(p.uses.filter((u) => u.ev === "ema").map((u) => u.c))];
    const txtC = [...new Set(p.uses.filter((u) => u.ev === "text").map((u) => u.c))].filter((c) => !emaC.includes(c));
    const quick = `<dl class="quick">
      ${tagsOf(p).length ? `<dt>Вещества</dt><dd>${tagsOf(p).map((t) => tagPill(t)).join(" ")}</dd>` : ""}
      ${emaC.length ? `<dt>Показания EMA</dt><dd>${emaC.map((c) => `<a href="#/diseases/${c}">${diseaseIndex[c].ru}</a>`).join("; ")}</dd>` : ""}
      ${txtC.length ? `<dt>По учебнику</dt><dd>${txtC.map((c) => `<a href="#/diseases/${c}">${diseaseIndex[c].ru}</a>`).join("; ")}</dd>` : ""}
      ${m ? `<dt>Форма</dt><dd>${m.ru} (<i>${m.lat}</i>)${p.prep === "valerian" ? ", 1:30" : p.prep === "mucilage" ? "" : ", 1:10"}${D.METHOD_NOTES?.[p.id] ? `<br><span class="hint">${D.METHOD_NOTES[p.id].t} ${cite(D.METHOD_NOTES[p.id].s)}</span>` : ""}</dd>` : ""}
      ${p.cautions.length ? `<dt>Главное</dt><dd>${p.cautions[0].t}</dd>` : ""}
    </dl>`;
    const sec = [];
    const add = (key, title, html) => html && sec.push({ key, title, html });
    const E = window.ETHNO?.plants?.[p.id] || {};
    add("desc", "Описание", (T.desc ? prose(T.desc) : "")
      + (E.names?.length ? `<p class="prose"><b class="lbl">Народные названия.</b> ${E.names.map((g) => `${g.t} ${cite(g.s)}`).join(" ")}</p>` : "")
      + (E.facts?.length ? `<h4>Любопытно</h4>${items(E.facts)}` : ""));
    add("ident", "Как распознать", (T.ident ? prose(T.ident) : "") + (photos.length > 1 ? `<div class="gallery">${photos.slice(1).map(fig).join("")}</div>` : ""));
    add("where", "Где растёт и как заготавливают", (K.habitat?.length || K.harvest?.length || window.MAPCORE) ? `
      ${K.habitat?.length ? `<h4>Местообитание</h4>${items(K.habitat)}` : ""}
      ${K.harvest?.length ? `<h4>Сбор, сушка, хранение</h4>${items(K.harvest)}` : ""}
      ${window.MAPCORE ? `<h4>Где наблюдали чаще</h4>${MAPDATA.counts[p.id] ? MAPCORE.mini(p.id) : `<p class="muted">Карта наблюдений для этого вида пока не загружена.</p>`}` : ""}` : "");
    add("chem", "Биохимия и действующие вещества", `${T.chem ? prose(T.chem) : ""}${T.chemK ? `<p class="prose sub">${T.chem ? "По данным белорусского учебника фармакогнозии:" : ""}</p>` + prose(T.chemK) : ""}
      ${!T.chem && !T.chemK ? (p.compounds ? `<p class="prose">${p.compounds} ${cite([{ id: "karpuk", loc: T.page || "" }])}</p>` : `<p class="muted">Состав в использованных источниках не описан.</p>`) : ""}
      ${tagsOf(p).length ? `<div class="cp-tags">${tagsOf(p).map((t) => tagPill(t)).join("")}</div>` : ""}`);
    const mols = C2().course ? C2().course.compoundsFor((m) => (m.plants || []).includes(p.id)) : [];
    add("mols", "Ключевые молекулы", mols.length ? C2().course.molGrid(mols, { plants: false }) + `<p class="hint">Формулы и структуры по PubChem. Подробнее в <a href="#/sim">курсе симулятора</a>.</p>` : "");
    add("mech", "Механизм действия", MC ? items(MC) + `<p class="hint">Подробнее о классах веществ в разделе <a href="#/pharm">«Механизмы»</a>.</p>` : "");
    // Применение: научное, учебное и народное в одном списке по болезням; рецепты с этим растением (проверенные и народные)
    const useRow = (u) => `<p class="use ${u.ev}"><span class="badge ${u.ev}">${EV[u.ev]}</span>${u.t} ${cite(u.s)}</p>`;
    const folkRow = (u) => `<p class="use ethno"><span class="badge ethno">${EV.ethno}</span>${u.r ? `<span class="use-reg">${esc(u.r)}</span>` : ""}${u.t} ${cite(u.s)}</p>`;
    const byC = {}, folkOther = [];
    const put = (c, kind, row) => ((byC[c] = byC[c] || { sci: [], folk: [] })[kind].push(row));
    p.uses.forEach((u) => put(u.c, u.ev === "ethno" ? "folk" : "sci", useRow(u)));
    (E.uses || []).forEach((u) => (u.c && diseaseIndex[u.c] ? put(u.c, "folk", folkRow(u)) : folkOther.push(folkRow(u))));
    if (p.ethnoNote) folkOther.unshift(useRow({ ev: "ethno", t: p.ethnoNote, s: p.ethnoSrc }));
    const order = Object.keys(diseaseIndex);
    const keys = [...Object.keys(groups), ...Object.keys(byC).filter((c) => !groups[c]).sort((x, y) => order.indexOf(x) - order.indexOf(y))];
    const anyFolk = folkOther.length || keys.some((c) => byC[c].folk.length);
    const blends = D.BLENDS.filter((b) => b.items.includes(p.id));
    const herKind = (h) => (h.modern ? "science" : ["folk", "herbal"].includes(h.kind) ? "folk" : "official");
    const herLi = (h) => `<li>${legacyMark(true)}<a href="#/heritage/${h.id}">${h.ru}</a>${h.lat || h.orig ? ` <i class="muted">${esc(h.lat || h.orig)}</i>` : ""} <span class="meta-line">${esc(window.CORE.originOf ? window.CORE.originOf(h) : [h.edition || h.period || h.date, h.region || h.place].filter(Boolean).join(" · "))}</span></li>`;
    const gen = (T.usesGen || []).map((u) => useRow({ ev: "text", t: u.t, s: u.s }));
    const proven = [...blends.map((b) => `<li><a href="#/book/blend:${b.id}">${esc(b.ru)}</a> <span class="badge text">учебник</span> <span class="meta-line">${esc(b.goal || "")}</span></li>`), ...her.filter((h) => herKind(h) !== "folk").map(herLi)];
    const folkRx = her.filter((h) => herKind(h) === "folk").map(herLi);
    add("use", "Применение",
      (anyFolk ? `<p class="hint">Пометка <span class="badge ethno">${EV.ethno}</span> значит, что так растение применяют или применяли в народе (место и годы записи указаны рядом); это не доказательство действия. Народные болезни не всегда совпадают с медицинскими, поэтому такие записи отнесены к ближайшей группе ${cite([{ id: "eth_staub2015", loc: "с. 514–515" }])}.</p>` : "")
      + (gen.length ? `<div class="usegroup"><b>Общее действие по учебнику</b>${gen.join("")}</div>` : "")
      + keys.map((c) => `
      <div class="usegroup"><b>${diseasePath(c).map((n) => `<a href="#/diseases/${n.id}">${n.ru}</a>`).join(" / ")}</b> ${icd(c)}
      ${byC[c].sci.join("")}${byC[c].folk.join("")}</div>`).join("")
      + (folkOther.length ? `<div class="usegroup"><b>Другое народное применение</b> <span class="muted">(пища, обряды, ветеринария и прочее)</span>${folkOther.join("")}</div>` : "")
      + (E.warn || []).map((w) => `<p class="caution">${w.t} ${cite(w.s)}</p>`).join("")
      + (proven.length || folkRx.length ? `<h4>Рецепты с этим растением</h4>
        ${proven.length ? `<p class="prose"><b class="lbl">Учебные, аптечные и проверенные наукой</b></p><ul>${proven.join("")}</ul>` : ""}
        ${folkRx.length ? `<p class="prose"><b class="lbl">Народные и из старинных травников</b></p><ul>${folkRx.join("")}</ul>` : ""}` : ""));
    add("hist", "История применения", window.CORE.hist ? window.CORE.hist.block("drug:" + p.id, { bare: true }) : "");
    add("prep", m ? `Как готовят: ${m.ru} (${m.lat})` : "", m ? `<p class="prose">${m.why} ${cite(m.src)}</p>
      <ol class="steps">${m.steps.map((s) => `<li>${ACTIONS[s].ru}</li>`).join("")}</ol>
      <p class="prose">${D.STORAGE.t} ${cite(D.STORAGE.s)}</p>
      <div class="btn-row"><a class="btn" href="#/sim/free/${p.id}">${ICON("flask")} Приготовить в симуляторе</a></div>` : "");
    add("caution", "Осторожно", p.cautions.map((c) => `<p class="caution">${c.t} ${cite(c.s)}</p>`).join(""));
    add("gaps", "Чего здесь нет", p.gaps ? `<p class="prose">${esc(p.gaps)}</p>` : "");
    add("obs", "Наблюдения в природе", `${I.counts ? `<p class="prose">Подтверждённые сообществом наблюдения iNaturalist (исследовательский уровень) по странам ${cite([inatSrc])}</p>
      <div class="obs">${Object.entries(COUNTRIES).map(([k, c]) => `<span class="chip static">${c.ru}: <b>${(I.counts[k] ?? 0).toLocaleString("ru")}</b></span>`).join("")}</div>` : ""}
      <div class="btn-row">${window.MAPDATA?.counts?.[p.id] ? `<a class="btn ghost small" href="#/map/${p.id}">${ICON("map")} Карта по регионам</a>` : ""}<a class="btn ghost small" target="_blank" rel="noopener" href="https://www.inaturalist.org/taxa/search?q=${encodeURIComponent(p.lat.replace("×", "x"))}">Открыть в iNaturalist</a></div>`);

    app.innerHTML = `
      <a class="back" href="#/plants">${ICON("back")} Все растения</a>
      <article class="card" style="margin-top:10px">
        <div class="plant-head">
          <div>${photos[0] ? `<div class="gallery" style="margin:0">${fig(photos[0])}</div>` : ART.draw(p)}</div>
          <div>
            <h1><span class="n-ru">${p.ru}</span><i class="n-only-lat">${p.lat}</i></h1>
            <div><span class="n-only-both">${window.CORE.latT(p.lat)} </span>${p.fam ? `<span class="muted">· ${p.fam}</span> ${cite(p.famSrc || [{ id: "powo", loc: p.lat }])}` : ""}</div>
            <p class="drug">Сырьё: ${window.CORE.nm(p.drug.ru, p.drug.lat, { b: true, btn: true, muted: false })} ${cite(T.drugSrc || (p.uses.some((u) => u.ev === "ema") ? [{ id: "ema", loc: "монография " + p.drug.lat, search: p.drug.lat }] : [{ id: "karpuk", loc: T.page || "" }]))}</p>
            ${partsText(p) ? `<p class="drug">Используемые части: <b>${partsText(p).toLowerCase()}</b></p>` : ""}
            <p class="dist">${(() => {
              const ks = Object.keys(COUNTRIES).filter((c) => p.countries[c]);
              const cult = ks.every((c) => p.countries[c] === "c");
              if (!ks.length) return "Распространение по четырём странам в использованных источниках не указано";
              return (ks.length === 4 ? (cult ? "Во всех четырёх странах только в культуре" : "Дико растёт во всех четырёх странах")
                : `${cult ? "В культуре" : "Встречается"}: ${ks.map((c) => CODE[c]).join(", ")}`) + " " + cite(p.distSrc || [{ id: "powo", loc: "распространение " + p.lat }]);
            })()}</p>
            ${quick}
            <nav class="toc" aria-label="Разделы статьи">${sec.filter((s) => s.title).map((s) => `<a href="#/plant/${p.id}" data-sec="${s.key}">${s.title.split(":")[0]}</a>`).join("")}</nav>
          </div>
        </div>
        ${sec.filter((s) => s.title).map((s) => `<section class="section" id="s-${s.key}"><h3>${s.title}</h3>${s.html}</section>`).join("")}
      </article>`;
    $(".toc").addEventListener("click", (e) => {
      const a = e.target.closest("[data-sec]"); if (!a) return;
      e.preventDefault(); document.getElementById("s-" + a.dataset.sec)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    C2().course?.drawStructures(app);
  });

  // ---------- Источники ----------
  page("sources", function sourcesPage() {
    const kinds = {};
    Object.entries(SOURCES).forEach(([k, s]) => (kinds[s.kind || "Прочее"] = kinds[s.kind || "Прочее"] || []).push([k, s]));
    app.innerHTML = `<h1>Источники</h1>
      <p class="lead">Тексты написаны своими словами по источникам; фрагменты книг не воспроизводятся. Страницы учебника Карпука указаны по печатному изданию.</p>
      <div class="ev-legend">${Object.keys(EV).map((k) => `<div><span class="badge ${k}">${EV[k]}</span>${EV_LONG[k]}</div>`).join("")}</div>
      ${Object.entries(kinds).map(([kind, arr]) => `<h3>${esc(kind)}</h3><div class="src-list">${arr.map(([, s]) => `<div class="card">
        <b style="font-family:var(--f-ui)">${esc(s.short)}</b><p>${esc(s.full)}</p>
        ${s.note ? `<p class="muted" style="font-size:.88rem">${esc(s.note)}</p>` : ""}
        ${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener" style="overflow-wrap:anywhere;font-size:.88rem">${esc(s.url)}</a>` : ""}</div>`).join("")}</div>`).join("")}`;
  });

  // ---------- Маршрутизация ----------
  function route() {
    const h = location.hash.replace(/^#\/?/, "");
    const [pg, ...args] = h.split("/");
    const name = PAGES[pg] ? pg : "";
    const navKey = { plant: "plants", disease: "diseases" }[name] || name;
    $$("nav.main a, .tabbar a").forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#/" + navKey));
    window.scrollTo(0, 0);
    if (pg === "disease") return (location.hash = "#/diseases/" + (args[0] || ""));
    const dec = (x) => { try { return decodeURIComponent(x); } catch { return x; } };
    (PAGES[name] || PAGES[""])(...args.map(dec));
  }

  // Разбор ответа в заданиях часто появляется ниже края экрана (особенно на телефоне): плавно подводим к нему
  const FB = new Set(["fb", "qfb", "lfb", "cfb", "pfb", "rfb"]);
  new MutationObserver((ms) => { for (const m of ms) { const t = m.target; if (t.id && FB.has(t.id) && t.firstElementChild) { t.scrollIntoView({ block: "nearest", behavior: "smooth" }); break; } } }).observe(app, { childList: true, subtree: true });

  // ---------- Тема и музыка ----------
  const tb = $("#theme");
  const isDark = () => (document.documentElement.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")) === "dark";
  const syncTheme = () => { tb.innerHTML = ICON(isDark() ? "sun" : "moon"); tb.title = isDark() ? "Светлая тема" : "Тёмная тема"; };
  tb.addEventListener("click", () => { const t = isDark() ? "light" : "dark"; document.documentElement.dataset.theme = t; store.set("theme", t); syncTheme(); });
  syncTheme();
  const mb = $("#music");
  const syncMusic = () => { mb.innerHTML = ICON(MUSIC.playing ? "note" : "mute"); mb.title = MUSIC.playing ? "Выключить музыку" : "Включить музыку"; };
  // Музыка: только включить или выключить; темы идут в случайном порядке (js/music.js)
  mb.addEventListener("click", () => { if (MUSIC.playing) MUSIC.stop(); else MUSIC.start(); syncMusic(); });
  mb.addEventListener("musicsync", syncMusic);
  syncMusic();

  window.CORE = {
    D, $, $$, app, esc, norm, shuffle, toast, store, state, byId, EV, EV_LONG, diseaseIndex, descendants, diseasePath, plantsFor, inCountries,
    flags, cite, prose, items, countryChips, bindChips, latName, icd, tagsOf, tagPill, TAG_COLORS, photoOf, thumb, PARTS, partsOf, partsText, page, PAGES, heritageFor, legacyMark, CODE,
  };
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && !/input|textarea|select/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); location.hash = "#/search"; }
  });
  window.addEventListener("hashchange", route);
  document.addEventListener("DOMContentLoaded", route);
  if ("serviceWorker" in navigator && location.protocol === "https:" && !/claude|anthropic/.test(location.hostname)) navigator.serviceWorker.register("sw.js").catch(() => {});
})();
