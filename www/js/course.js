/* Учебный курс «Химия лекарственных растений»: классы веществ от распространённых к редким,
   способы извлечения, обнаружение, молекулярные механизмы, формулы и структуры (SMILES из PubChem). */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, byId, cite, items, store, D } = C;
  const CH = window.CHEM || { compounds: [], lessons: [] };
  const CMP = Object.fromEntries(CH.compounds.map((c) => [c.id, c]));
  const LV = { 1: "Основы", 2: "Углублённо", 3: "Частная фармакогнозия" };
  const st = () => store.get("chem", {});
  const PUB = (cid) => `https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`;
  if (CH.compounds.length) D.SOURCES.pubchem = D.SOURCES.pubchem || { short: "PubChem", full: "PubChem, National Center for Biotechnology Information (NCBI), U.S. National Library of Medicine. Сведения о соединениях: брутто-формула, молярная масса, SMILES.", url: "https://pubchem.ncbi.nlm.nih.gov/", kind: "База данных" };

  D.SOURCES.nci_cir = D.SOURCES.nci_cir || { short: "NCI/CADD Resolver", full: "NCI/CADD Chemical Identifier Resolver, National Cancer Institute, CADD Group. Структуры соединений в записи SMILES.", url: "https://cactus.nci.nih.gov/chemical/structure", kind: "База данных" };
  // Брутто-формула с нижними индексами: C15H10O5 → C₁₅H₁₀O₅
  const formula = (f) => esc(f || "").replace(/(\d+)/g, "<sub>$1</sub>");

  // Структурные формулы рисует SmilesDrawer (js/vendor, MIT) прямо в SVG; тема берётся из страницы.
  function drawStructures(root) {
    if (!window.SmilesDrawer) return;
    const dark = document.documentElement.dataset.theme === "dark" || (!document.documentElement.dataset.theme && matchMedia("(prefers-color-scheme: dark)").matches);
    $$("svg[data-smiles]", root).forEach((svg) => {
      if (svg.dataset.done) return;
      svg.dataset.done = "1";
      try {
        const d = new SmilesDrawer.SvgDrawer({ width: 260, height: 200, bondThickness: 1.1, fontSizeLarge: 9, fontSizeSmall: 6, padding: 8, compactDrawing: false });
        SmilesDrawer.parse(svg.dataset.smiles, (tree) => d.draw(tree, svg, dark ? "dark" : "light"), () => svg.replaceWith(Object.assign(document.createElement("p"), { className: "hint", textContent: "Структуру нарисовать не удалось." })));
      } catch (e) { svg.remove(); }
    });
  }

  function compoundCard(c, { plants = true } = {}) {
    if (!c) return "";
    const pl = plants ? (c.plants || []).filter((id) => byId[id]) : [];
    return `<figure class="mol">
      ${c.smiles ? `<svg class="mol-svg" data-smiles="${esc(c.smiles)}" viewBox="0 0 260 200" role="img" aria-label="Структурная формула: ${esc(c.ru)}"></svg>` : ""}
      <figcaption><b>${esc(c.ru)}</b> <i class="muted">${esc(c.name || "")}</i>
        <div class="mol-f">${formula(c.formula)}${c.mw ? ` · M = ${String(c.mw).replace(".", ",")} г/моль` : ""} ${c.cid ? `<a href="${PUB(c.cid)}" target="_blank" rel="noopener">PubChem CID ${c.cid}</a>` : ""}</div>
        ${c.role ? `<div class="mol-role">${esc(c.role.t)} ${cite(c.role.s)}</div>` : ""}
        ${pl.length ? `<div class="herbs">${pl.map((id) => `<a class="chip" href="#/plant/${id}">${byId[id].ru}</a>`).join("")}</div>` : ""}
      </figcaption></figure>`;
  }
  const compoundsFor = (pred) => CH.compounds.filter(pred);
  const molGrid = (list, opt) => (list.length ? `<div class="mol-grid">${list.map((c) => compoundCard(c, opt)).join("")}</div>` : "");

  // ---------- Единый курс: теория и практика вперемешку, от общего к частному ----------
  // Путь провизора: четыре ступени от простого к сложному; в конце ступени смена и/или зачёт
  const STAGES = [
    { id: "s1", title: "Ступень 1. Ученик", desc: "Что такое действующие вещества и водное извлечение, как готовят настой и отвар, первые классы веществ.",
      items: ["c:c_intro", "l:l1", "c:c_methods", "l:l2", "l:l3", "c:c_essential_oils", "l:l4", "t:photo1", "c:c_tannins", "s:student"] },
    { id: "s2", title: "Ступень 2. Ассистент", desc: "Исключения из правил, слизи и плоды, сборы и следующие классы веществ.",
      items: ["l:l5", "c:c_mucilages", "l:l6", "c:c_flavonoids", "l:l7", "t:case1", "c:c_bitters", "c:c_saponins", "c:c_phenol_glycosides", "t:lab1", "s:assistant", "e:mid"] },
    { id: "s3", title: "Ступень 3. Провизор", desc: "Латинская пропись, хранение, редкие классы веществ, сильнодействующее и ядовитое сырьё.",
      items: ["l:l8", "t:photo2", "c:c_coumarins", "c:c_iridoids", "c:c_anthocyanins", "l:l9", "c:c_anthranoids", "t:lab2", "c:c_rosmarinic_acid", "c:c_silicic_acid", "c:c_cardiac", "c:c_alkaloids", "t:case2", "s:provisor"] },
    { id: "s4", title: "Ступень 4. Частная фармакогнозия", desc: "Молекулярные механизмы отдельных растений: рецепторы, ферменты, взаимодействия.",
      items: ["c:c_valerenic", "c:c_hypericum", "c:c_calendula", "c:c_chamomile", "c:c_thujone", "c:c_hawthorn", "e:final"] },
  ];
  const ORDER = STAGES.flatMap((x) => x.items);
  const CHECKS = {
    "s:student": { title: "Рабочая смена ученика", sub: "Пять заказов с подсказками и правом на ошибку", href: "#/sim/shift/student", done: (p) => p.shift.student },
    "s:assistant": { title: "Рабочая смена ассистента", sub: "Без подсказок; рецепты и посетители с жалобами", href: "#/sim/shift/assistant", done: (p) => p.shift.assistant },
    "s:provisor": { title: "Рабочая смена провизора", sub: "Прописи без массы, сборы, отзыв только в конце", href: "#/sim/shift/provisor", done: (p) => p.shift.provisor },
    "e:mid": { title: "Промежуточный зачёт", sub: "10 вопросов: сырьё, классы веществ, показания, способы, предостережения", href: "#/sim/exam/mid", done: (p) => p.examMid >= 8 },
    "t:photo1": { kind: "photo", title: "Приёмка сырья по внешнему виду", sub: "Восемь партий от сборщиков: определить растение по фото, отличить от похожих", href: "#/sim/photo/1", done: (p) => (p.x?.photo?.[1] || 0) >= 6, topics: ["base", "safety"] },
    "t:photo2": { kind: "photo", title: "Приёмка сырья по латинским названиям", sub: "Растение по фото, затем латинское название сырья и заготавливаемая часть", href: "#/sim/photo/2", done: (p) => (p.x?.photo?.[2] || 0) >= 6, topics: ["base", "rx"] },
    "t:lab1": { kind: "lab", title: "Контрольная лаборатория", sub: "Неизвестная партия: выбрать качественные реакции и определить сырьё", href: "#/sim/lab/1", done: (p) => (p.x?.lab?.[1] || 0) >= 4, topics: ["subst"] },
    "t:lab2": { kind: "lab", title: "Контрольная лаборатория: экономия реактивов", sub: "Меньше реакций, больше похожих кандидатов", href: "#/sim/lab/2", done: (p) => (p.x?.lab?.[2] || 0) >= 4, topics: ["subst"] },
    "t:case1": { kind: "case", title: "Консультации посетителей", sub: "Жалобы, сопутствующие болезни и лекарства: посоветовать, отказать или направить к врачу", href: "#/sim/case/1", done: (p) => (p.x?.case?.[1] || 0) >= 4, topics: ["safety"] },
    "t:case2": { kind: "case", title: "Трудные консультации", sub: "Взаимодействия, беременность, дети, тревожные признаки", href: "#/sim/case/2", done: (p) => (p.x?.case?.[2] || 0) >= 4, topics: ["safety", "mech"] },
    "e:final": { title: "Итоговый зачёт", sub: "10 вопросов по всему курсу, включая формулы и механизмы", href: "#/sim/exam/final", done: (p) => p.examFinal >= 8 },
  };
  const TOPICS = { base: "Основы", subst: "Вещества", tech: "Технология", rx: "Рецептура", mech: "Механизмы", safety: "Безопасность", check: "Смены и зачёты" };
  const TOPIC_OF = { "c:c_intro": ["base", "subst"], "l:l1": ["base", "tech"], "c:c_methods": ["base", "tech"], "l:l2": ["tech"], "l:l3": ["tech"], "l:l4": ["tech"], "l:l5": ["tech", "subst"], "l:l6": ["tech"],
    "l:l7": ["rx", "tech"], "l:l8": ["rx"], "l:l9": ["rx", "safety"], "c:c_cardiac": ["subst", "safety"], "c:c_alkaloids": ["subst", "safety"], "c:c_thujone": ["mech", "safety"], "c:c_hypericum": ["mech", "safety"] };
  // Связи практических уроков с уроками о веществах
  const PRAC_LINKS = { l1: ["c_intro", "c_methods"], l2: ["c_methods"], l3: ["c_tannins"], l4: ["c_methods"], l5: ["c_phenol_glycosides", "c_tannins"], l6: ["c_mucilages", "c_essential_oils"], l7: ["c_methods"], l8: ["c_methods"], l9: ["c_essential_oils"] };
  const GROUP = { infusion: "inf", valerian: "inf", seed_infusion: "inf", decoction: "dec", leaf_decoction: "dec", mucilage: "muc" };
  const GROUP_RU = { inf: "Настой", dec: "Отвар", muc: "Слизь (набухание)" };
  const plantsOfLesson = (l) => {
    const cls = l.cls && (window.MECH?.classes || []).find((c) => c.id === l.cls);
    const s = new Set([...(cls?.plants || []), ...(l.compounds || []).flatMap((x) => CMP[x]?.plants || [])]);
    if (l.id === "c_anthranoids") s.add("frangula");
    return [...s].filter((id) => byId[id]);
  };
  function course() {
    const out = [];
    for (const key of ORDER) {
      const [t, id] = key.split(":");
      if (t === "c") {
        const l = CH.lessons.find((x) => x.id === id); if (!l) continue;
        const sc = st()[l.id];
        out.push({ key, kind: "chem", title: l.title, sub: l.sections.map((x) => x.h).slice(0, 4).join(" · "), href: `#/sim/chem/${l.id}`, done: sc >= 0.8, score: sc,
          topics: TOPIC_OF[key] || ((l.level || 1) >= 3 && l.cls && !["silicic_acid", "rosmarinic_acid"].includes(l.cls) ? ["mech"] : ["subst"]), plants: plantsOfLesson(l), n: (l.quiz || []).length });
      } else if (t === "s" || t === "e" || t === "t") {
        const ch = CHECKS[key], pr = C.simProgress ? C.simProgress() : { shift: {} };
        if (!ch) continue;
        if (t === "t" && (!(C.simx && C.simx[ch.kind]) || (ch.kind === "lab" && !(window.SIMX?.tests || []).length) || (ch.kind === "case" && !(window.SIMX?.cases || []).length))) continue;
        out.push({ key, kind: t === "s" ? "shift" : t === "e" ? "exam" : ch.kind, title: ch.title, sub: ch.sub, href: ch.href, done: !!ch.done(pr), topics: ch.topics || ["check", t === "s" ? "rx" : "subst"], plants: [] });
      } else {
        const l = (C.simLessons || []).find((x) => x.id === id); if (!l) continue;
        const pl = l.plant ? [l.plant] : (D.BLENDS.find((b) => b.id === l.blend)?.items || []);
        out.push({ key, kind: "prac", title: l.title, sub: l.sub, href: `#/sim/lesson/${l.id}`, done: l.done(), topics: TOPIC_OF[key] || ["tech"], plants: pl });
      }
    }
    // уроки, не попавшие в порядок, идут в конец
    CH.lessons.filter((l) => !ORDER.includes("c:" + l.id)).forEach((l) => out.push({ key: "c:" + l.id, kind: "chem", title: l.title, sub: "", href: `#/sim/chem/${l.id}`, done: (st()[l.id] || 0) >= 0.8, topics: ["subst"], plants: plantsOfLesson(l), n: (l.quiz || []).length }));
    return out;
  }
  const next = (key) => { const c = course(), i = c.findIndex((x) => x.key === key); return i >= 0 ? c[i + 1] : null; };
  const numOf = (key) => course().findIndex((x) => x.key === key) + 1;

  // ---------- Хаб курса (встраивается в экран симулятора) ----------
  let hubTopic = "", hubPlant = "";
  const stageOf = (key) => STAGES.find((x) => x.items.includes(key));
  const KIND = { prac: "практика", shift: "смена", exam: "зачёт", photo: "приёмка", lab: "анализ", case: "консультация" };
  function listHtml() {
    const all = course();
    const vis = (x) => (!hubTopic || x.topics.includes(hubTopic)) && (!hubPlant || x.plants.includes(hubPlant));
    let html = "", stage = null;
    all.forEach((x, i) => {
      if (!vis(x)) return;
      const sg = stageOf(x.key);
      if (sg && sg !== stage) {
        stage = sg; const its = all.filter((y) => sg.items.includes(y.key));
        html += `<div class="stage-head"><h3>${sg.title}</h3><span class="muted">${its.filter((y) => y.done).length} из ${its.length}</span><p class="hint">${sg.desc}</p></div>`;
      }
      html += `<a class="card lesson ${x.done ? "done" : ""} k-${x.kind}" href="${x.href}"><span class="n">${x.done ? ICON("check") : i + 1}</span><div><b>${esc(x.title)}</b><span>${esc(x.sub)}</span>
        <span class="lesson-tags">${x.topics.map((t) => `<span class="ltag">${TOPICS[t]}</span>`).join("")}</span></div>
        <span class="muted" style="font-family:var(--f-ui);font-size:.82rem;text-align:right">${KIND[x.kind] || (x.score != null ? Math.round(x.score * 100) + "%" : `теория, ${x.n} вопр.`)}</span></a>`;
    });
    return html || `<p class="muted">Под этот фильтр ничего нет.</p>`;
  }
  function hubHtml() {
    if (!CH.lessons.length) return "";
    const all = course(), done = all.filter((x) => x.done).length, nx = all.find((x) => !x.done);
    const pls = [...new Set(all.flatMap((x) => x.plants))].filter((id) => byId[id]).sort((a, b) => byId[a].ru.localeCompare(byId[b].ru, "ru"));
    return `<div class="card path-now"><div><p class="kicker" style="margin-top:0">Путь провизора · пройдено ${done} из ${all.length}</p>
        <div class="path-bar"><span style="width:${Math.round((done / all.length) * 100)}%"></span></div>
        ${nx ? `<p style="margin:.4em 0 0">Следующий шаг: <b>${esc(nx.title)}</b> <span class="muted">(${stageOf(nx.key)?.title || ""})</span></p>` : `<p>Путь пройден целиком.</p>`}</div>
        ${nx ? `<a class="btn" href="${nx.href}">${ICON("chev")} Продолжить</a>` : ""}</div>
      <div class="chips" id="ctop"><button class="chip ${hubTopic ? "" : "on"}" type="button" data-t="">Всё по порядку</button>${Object.entries(TOPICS).map(([k, t]) => `<button class="chip ${hubTopic === k ? "on" : ""}" type="button" data-t="${k}">${t}</button>`).join("")}</div>
      <div class="filter-row"><label for="cpl">Растение</label><select class="sel" id="cpl"><option value="">любое</option>${pls.map((id) => `<option value="${id}" ${hubPlant === id ? "selected" : ""}>${byId[id].ru}</option>`).join("")}</select></div>
      <div class="lesson-list" id="clist">${listHtml()}</div>`;
  }
  function bindHub() {
    const top = $("#ctop"); if (!top) return;
    top.addEventListener("click", (e) => { const b = e.target.closest("[data-t]"); if (!b) return; hubTopic = b.dataset.t; $$("#ctop .chip").forEach((x) => x.classList.toggle("on", x === b)); $("#clist").innerHTML = listHtml(); });
    $("#cpl").addEventListener("change", (e) => { hubPlant = e.target.value; $("#clist").innerHTML = listHtml(); });
  }

  // ---------- Перекрёстные ссылки: растения, рецепты книги, сборы, старинные прописи ----------
  function recipesFor(plants) {
    const rec = new Map();
    plants.map((id) => byId[id]).filter((p) => GROUP[p.prep]).forEach((p) => p.uses.filter((u) => u.ev !== "ethno" && C.diseaseIndex[u.c]).forEach((u) => {
      const k = u.c + "|" + GROUP[p.prep];
      rec.set(k, { key: k, title: `${GROUP_RU[GROUP[p.prep]]}: ${C.diseaseIndex[u.c].ru.toLowerCase()}`, n: (rec.get(k)?.n || 0) + 1 });
    }));
    return [...rec.values()].sort((a, b) => b.n - a.n);
  }
  function crossHtml(plants, { title = "Примеры в справочнике" } = {}) {
    if (!plants.length) return "";
    const recs = recipesFor(plants).slice(0, 10);
    const blends = D.BLENDS.filter((b) => b.items.some((id) => plants.includes(id)));
    const leg = [...(window.LEGACY?.mixtures || []), ...(window.LEGACY?.remedies || [])].filter((m) => window.POTX?.legacy?.[m.id]?.ok && window.POTX.legacy[m.id].ing.some((id) => plants.includes(id))).slice(0, 6);
    return `<section class="section" id="cross"><h2>${title}</h2>
      <h4>Растения</h4><div class="herbs">${plants.map((id) => `<a class="chip" href="#/plant/${id}">${byId[id].ru}</a>`).join("")}</div>
      ${recs.length || blends.length ? `<h4>Рецепты книги с этим сырьём</h4><div class="herbs">${blends.map((b) => `<a class="chip" href="#/book/blend:${b.id}">Сбор: ${esc(b.ru)}</a>`).join("")}${recs.map((r) => `<a class="chip" href="#/book/${encodeURIComponent(r.key)}">${esc(r.title)}</a>`).join("")}</div>` : ""}
      ${leg.length ? `<h4>Старинные рецепты</h4><div class="herbs">${leg.map((m) => `<a class="chip" href="#/heritage/${m.id}">${C.legacyMark(true)}${esc(m.ru)}</a>`).join("")}</div>` : ""}
    </section>`;
  }
  // Дополнения к практическому уроку симулятора
  function pracExtras(id) {
    const l = (C.simLessons || []).find((x) => x.id === id); if (!l) return "";
    const pl = l.plant ? [l.plant] : (D.BLENDS.find((b) => b.id === l.blend)?.items || []);
    const rel = (PRAC_LINKS[id] || []).map((x) => CH.lessons.find((y) => y.id === x)).filter(Boolean);
    return `${rel.length ? `<section class="section"><h2>Связанные уроки</h2><div class="herbs">${rel.map((x) => `<a class="chip" href="#/sim/chem/${x.id}">${esc(x.title)}</a>`).join("")}</div></section>` : ""}${crossHtml(pl.filter((x) => byId[x]), { title: "Сырьё урока" })}`;
  }

  // ---------- Урок ----------
  function lesson(id) {
    const l = CH.lessons.find((x) => x.id === id);
    const back = `<a class="back" href="#/sim">${ICON("back")} Симулятор</a>`;
    if (!l) { app.innerHTML = `${back}<p>Урок не найден.</p>`; return; }
    const key = "c:" + l.id, nx = next(key), num = numOf(key), total = course().length;
    const pls = plantsOfLesson(l);
    const cls = l.cls && (window.MECH?.classes || []).find((c) => c.id === l.cls);
    const mols = (l.compounds || []).map((x) => CMP[x]).filter(Boolean);
    app.innerHTML = `${back}<p class="kicker">Шаг пути ${num} из ${total} · ${(course()[num - 1]?.topics || []).map((t) => TOPICS[t]).join(", ")}</p><h1>${esc(l.title)}</h1>
      ${cls ? `<p class="hint">Справка по классу: <a href="#/pharm/${cls.id}">${esc(cls.ru)}</a>${cls.lat ? ` <i>(${esc(cls.lat)})</i>` : ""}</p>` : ""}
      <nav class="toc">${l.sections.map((x, i) => `<a href="#/sim/chem/${l.id}" data-go="s${i}">${esc(x.h)}</a>`).join("")}${mols.length ? `<a href="#/sim/chem/${l.id}" data-go="mols">Молекулы</a>` : ""}${pls.length ? `<a href="#/sim/chem/${l.id}" data-go="cross">Растения и рецепты</a>` : ""}${(l.quiz || []).length ? `<a href="#/sim/chem/${l.id}" data-go="quiz">Проверка</a>` : ""}</nav>
      ${l.sections.map((x, i) => `<section class="section" id="s${i}"><h2>${esc(x.h)}</h2>${items(x.items)}</section>`).join("")}
      ${mols.length ? `<section class="section" id="mols"><h2>Молекулы</h2><p class="hint">Брутто-формула и номер соединения по PubChem ${cite([{ id: "pubchem", loc: "страницы соединений" }])}; структура нарисована по записи SMILES из NCI/CADD Chemical Identifier Resolver ${cite([{ id: "nci_cir", loc: "запросы по названию или CAS" }])}. Где в записи нет стереохимии, она не показана.</p>${molGrid(mols)}</section>` : ""}
      ${crossHtml(pls)}
      ${(l.quiz || []).length ? `<section class="section" id="quiz"><h2>Проверка</h2><div id="qz"></div></section>` : ""}
      <div class="btn-row">${nx ? `<a class="btn" href="${nx.href}">Следующий урок: ${esc(nx.title)}</a>` : `<a class="btn" href="#/sim">К симулятору</a>`}</div>`;
    $("nav.toc").addEventListener("click", (e) => { const a = e.target.closest("[data-go]"); if (!a) return; e.preventDefault(); document.getElementById(a.dataset.go)?.scrollIntoView({ behavior: "smooth" }); });
    drawStructures(app);
    if ((l.quiz || []).length) quiz(l);
  }

  function quiz(l) {
    let i = 0, right = 0;
    const qs = l.quiz;
    const show = () => {
      if (i >= qs.length) {
        const sc = right / qs.length, s = st();
        s[l.id] = Math.max(s[l.id] || 0, sc); store.set("chem", s);
        MUSIC.sfx(sc >= 0.8 ? "good" : "bad");
        $("#qz").innerHTML = `<div class="card"><p class="verdict">${sc >= 0.8 ? "Урок пройден" : "Нужно повторить"}</p><p>Верно ${right} из ${qs.length}.${sc >= 0.8 ? "" : " Для зачёта нужно 80 %."}</p><button class="btn ghost" id="qagain" type="button">Пройти проверку ещё раз</button></div>`;
        $("#qagain").onclick = () => { i = 0; right = 0; show(); };
        return;
      }
      const q = qs[i];
      const order = C.shuffle(q.options.map((t, j) => ({ t, j })));
      $("#qz").innerHTML = `<div class="card"><p class="kicker">Вопрос ${i + 1} из ${qs.length}</p><p class="prose" style="margin-top:0"><b>${esc(q.q)}</b></p>
        <div class="opts">${order.map((o) => `<button class="opt" type="button" data-j="${o.j}">${esc(o.t)}</button>`).join("")}</div><div id="qwhy"></div></div>`;
      $("#qz .opts").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || $("#qz .opts").dataset.done) return;
        $("#qz .opts").dataset.done = "1";
        const ok = +b.dataset.j === q.a; if (ok) right++;
        MUSIC.sfx(ok ? "good" : "bad");
        $$("#qz .opt").forEach((x) => { if (+x.dataset.j === q.a) x.classList.add("right"); else if (x === b) x.classList.add("wrong"); });
        $("#qwhy").innerHTML = `<p class="feedback ${ok ? "good" : "bad"}">${ok ? "Верно." : "Неверно."} ${q.why ? `${esc(q.why.t)} ${cite(q.why.s)}` : ""}</p><button class="btn" id="qnext" type="button">${i + 1 < qs.length ? "Дальше" : "Итог"}</button>`;
        $("#qnext").onclick = () => { i++; show(); };
      });
    };
    show();
  }

  // Класс веществ → урок провизора о нём (котелок, карточки)
  const TAG_LESSON = { "эфирное масло": "c_essential_oils", "флавоноиды": "c_flavonoids", "кумарины": "c_coumarins", "слизи": "c_mucilages", "полисахариды": "c_mucilages", "дубильные вещества": "c_tannins", "иридоиды": "c_iridoids", "антраценпроизводные": "c_anthranoids", "горечи": "c_bitters", "сапонины": "c_saponins", "кремниевая кислота": "c_silicic_acid", "фенологликозиды": "c_phenol_glycosides", "алкалоиды": "c_alkaloids" };
  C.tagLesson = (t) => { const id = TAG_LESSON[t]; return id && CH.lessons.some((l) => l.id === id) ? id : null; };
  C.tagLink = (t, n) => {
    const id = C.tagLesson(t), inner = `${n ? `<span class="tag-n">+${n}</span> ` : ""}<span>${esc(t)}</span>`, st = `--tc:${C.TAG_COLORS[t] || "#555"}`;
    return id ? `<a class="tag tag-link" style="${st}" href="#/sim/chem/${id}" title="Урок провизора: ${esc(CH.lessons.find((l) => l.id === id).title)}">${inner}</a>` : `<span class="tag" style="${st}">${inner}</span>`;
  };
  C.course = { hubHtml, bindHub, next, numOf, course, pracExtras, crossHtml, lesson, compoundCard, molGrid, compoundsFor, drawStructures, formula, lessons: CH.lessons, compounds: CH.compounds };
})();
