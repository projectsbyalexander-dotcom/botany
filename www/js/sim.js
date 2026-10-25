/* Симулятор провизора: курс уроков, рабочая смена по рецептам и запросам, свободное приготовление.
   Правила технологии водных извлечений — по Карпуку (с. 67–71); показания — по монографиям EMA и учебнику. */
(function () {
  const C = window.CORE;
  // строчная только первая буква: аббревиатуры (ОРВИ) остаются прописными
  const lc1 = (x) => (x ? x.charAt(0).toLowerCase() + x.slice(1) : "");
  const { $, $$, app, esc, D, byId, store, toast, diseaseIndex, cite, items, shuffle, EV, icd } = C;
  const { PLANTS, METHODS, BLENDS, STORAGE } = D;
  const K = (loc) => [{ id: "karpuk", loc }];
  const sim = store.get("sim", { lessons: [], best: {}, shifts: 0, level: "student" });
  const save = () => store.set("sim", sim);
  // «Латынь на время симулятора»: названия только по-латыни и без русских подписей на банках; при выходе прежний режим возвращается
  const latOn = () => store.get("simLat", false);
  const simLatApply = () => {
    const inSim = /^#\/sim\b/.test(location.hash), prev = store.get("simLatPrev", null);
    if (inSim && latOn() && C.latin) { if (C.latin.mode() !== "lat") { store.set("simLatPrev", C.latin.mode()); C.latin.setMode("lat"); } }
    else if (prev && C.latin) { store.set("simLatPrev", null); C.latin.setMode(prev); }
  };
  window.addEventListener("hashchange", simLatApply);
  const latBtn = () => `<button class="chip sim-lat ${latOn() ? "on" : ""}" type="button" data-simlat title="Временно показывать названия только по-латыни">${latOn() ? "Латынь включена" : "Включить латынь"}</button>`;
  const latToggle = (after) => { store.set("simLat", !latOn()); simLatApply(); after && after(); };

  const LEVELS = {
    student: { ru: "Ученик", desc: "Пропись с массой сырья и русскими пояснениями. Подсказки и объяснение после каждого шага, можно исправить ошибку.", hints: true, retry: true, ruLabels: true, mass: true, timer: false },
    assistant: { ru: "Ассистент", desc: "Латинские этикетки на банках, массу сырья указывает врач. Объяснение после ответа, без повторной попытки.", hints: false, retry: false, ruLabels: false, mass: true, timer: false },
    provisor: { ru: "Провизор", desc: "Пропись без массы сырья: соотношение нужно знать. Сборы, запросы посетителей, таймер, разбор только в конце.", hints: false, retry: false, ruLabels: false, mass: false, timer: true, endOnly: true },
  };

  // ---------- Латынь прописи ----------
  const GEN = { folium: "foliorum", flos: "florum", herba: "herbae", radix: "radicis", cortex: "corticis", fructus: "fructuum", semen: "seminum", rhizoma: "rhizomatis", flores: "florum", gemmae: "gemmarum" };
  function rxName(p) {
    if (p.id === "flax") return "Mucilaginis seminum Lini";
    if (p.id === "valerian") return "Infusi rhizomatum cum radicibus Valerianae";
    if (p.id === "dandelion") return "Decocti radicis et herbae Taraxaci";
    if (p.id === "guelder") return "Decocti corticis Viburni";
    if (p.id === "hawthorn") return "Infusi foliorum cum floribus Crataegi";
    if (p.id === "bilberry") return "Decocti fructuum Myrtilli";
    if (p.id === "inula") return "Decocti rhizomatum et radicum Inulae";
    const w = p.drug.lat.split(" "), noun = w.pop().toLowerCase();
    const form = { infusion: "Infusi", valerian: "Infusi", seed_infusion: "Infusi", decoction: "Decocti", leaf_decoction: "Decocti", mucilage: "Mucilaginis" }[p.prep];
    return `${form} ${GEN[noun] || noun} ${w.join(" ")}`;
  }
  C.rxName = rxName;
  C.SIZE_RU = (p, inBlend) => SIZE_RU[sizeOf(p, inBlend)] || "";
  const WRONG_PART = { folium: "herba", flos: "folium", herba: "folium", radix: "herba", cortex: "folium", fructus: "folium", rhizoma: "herba", semen: "herba", flores: "folium", gemmae: "folium", radices: "herba" };
  const CONFUSE = { plantain_lanc: "plantain_major", plantain_major: "plantain_lanc", bearberry: "lingonberry", lingonberry: "bearberry", peppermint: "melissa", melissa: "peppermint", chamomile: "calendula", calendula: "chamomile", oak: "guelder", guelder: "oak", tormentil: "valerian", valerian: "tormentil", thyme_wild: "stjohns", stjohns: "yarrow", yarrow: "wormwood", wormwood: "yarrow", linden: "elder", elder: "linden", caraway: "flax", flax: "caraway", sage: "melissa", nettle: "birch", birch: "nettle", horsetail: "stjohns", dandelion: "valerian", bilberry: "guelder", hawthorn: "linden", althaea: "inula", inula: "althaea", tussilago: "plantain_major", leonurus: "valerian", bidens: "yarrow", origanum: "thyme_wild", frangula: "oak", rosa: "hawthorn", helichrysum: "calendula", polygonum: "horsetail", capsella: "yarrow", pinus: "birch" };
  const fmt = (x) => (Math.round(x * 10) / 10).toFixed(1).replace(".", ",");
  const ratioOf = (p) => (p.prep === "valerian" ? 30 : 10);
  const SIZE = { leaf: 5, flower: 5, herb: 5, root: 3, bark: 3, berry: 0.5, seed: 0.5 };
  // в сборе: цветки, плоды и семена не измельчают, остальное до измельчённости 5600 (около 5 мм), если ФС не указывает иначе (Карпук, с. 71)
  const sizeOf = (p, inBlend) => (p.prep === "mucilage" ? 0 : inBlend && ["flower", "berry", "seed"].includes(p.part) ? 0 : inBlend ? 5 : p.id === "guelder" ? 3 : SIZE[p.part]);
  const SIZE_RU = { 5: "около 5 мм", 3: "не более 3 мм", 0.5: "не более 0,5 мм", 0: "не измельчать" };

  // ---------- Задание ----------
  function makeTask({ plant, blend, level, volume, order }) {
    const L = LEVELS[level];
    const V = volume || [100, 150, 200][Math.floor(Math.random() * 3)];
    if (blend) {
      const b = BLENDS.find((x) => x.id === blend);
      const herbs = b.items.map((id) => byId[id]);
      const total = V / 10, each = Math.round((total / herbs.length) * 10) / 10;
      const method = b.steps.some((s) => s.a === "bath30") ? "decoction" : "infusion";
      return { kind: "blend", level, L, V, blend: b, herbs, method: METHODS[method], ratio: 10, masses: herbs.map(() => each), order,
        title: b.ru, rxLat: `${method === "decoction" ? "Decocti" : "Infusi"} ex speciebus`, sign: b.goal };
    }
    const p = byId[plant];
    const m = METHODS[p.prep];
    const mass = p.prep === "mucilage" ? null : Math.round((V / ratioOf(p)) * 10) / 10;
    return { kind: "single", level, L, V, herbs: [p], method: m, ratio: ratioOf(p), masses: [mass], order, title: `${m.ru}: ${p.drug.ru.toLowerCase()}`, rxLat: rxName(p) };
  }
  function rxHtml(t) {
    const p = t.herbs[0], showMass = t.L.mass;
    const date = new Date().toLocaleDateString("ru");
    let body;
    if (t.kind === "blend") {
      body = `<div><span class="rp">Rp.:</span> ${t.herbs.map((h, i) => `${h.drug.lat.replace(/ (folium|flos|herba|radix|cortex|fructus|semen|rhizoma)$/i, (m) => m)} ${showMass ? fmt(t.masses[i]) : "ana partes aequales"}`).join("<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${C.latT ? C.latT("Misce, fiat species.") : "Misce, fiat species."}</div>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${C.latT ? C.latT(t.rxLat) : t.rxLat} — ${t.V} ml</div>`;
    } else if (p.prep === "mucilage") {
      body = `<div><span class="rp">Rp.:</span> ${C.latT ? C.latT(t.rxLat) : t.rxLat} ${t.V} ml</div>`;
    } else {
      body = `<div><span class="rp">Rp.:</span> ${C.latT ? C.latT(t.rxLat) : t.rxLat} ${showMass ? `ex ${fmt(t.masses[0])} — ` : ""}${t.V} ml</div>`;
    }
    return `<div class="rx"><div class="rx-h"><span>Recipe</span><span>${date}</span></div>${body}
      <div>${C.latT ? C.latT("D. S.") : "D. S."} По указанию врача.</div>
      ${t.L.ruLabels ? `<div class="tr">Перевод: ${t.kind === "blend" ? `сбор «${esc(t.title)}», приготовить ${t.method.ru.toLowerCase()} ${t.V} мл` : `${t.method.ru.toLowerCase()} (${p.drug.ru.toLowerCase()})${showMass && t.masses[0] ? ` из ${fmt(t.masses[0])} г сырья` : ""}, ${t.V} мл`}.</div>` : ""}</div>`;
  }

  // ---------- Этапы ----------
  function stagesFor(t) {
    const p = t.herbs[0], m = t.method, muc = p.prep === "mucilage";
    const st = [];
    st.push({ id: "read", ru: "Пропись", q: "Что нужно приготовить по этой прописи?", kind: "opts",
      opts: () => {
        const right = t.kind === "blend" ? `${m.ru} из сбора: ${t.herbs.map((h) => h.ru.toLowerCase()).join(", ")}` : `${m.ru}: ${p.drug.ru.toLowerCase()}`;
        const alt = t.kind === "blend" ? [`${m.ru === "Настой" ? "Отвар" : "Настой"} из сбора: ${t.herbs.map((h) => h.ru.toLowerCase()).join(", ")}`, `Настойка на спирте: ${t.herbs.map((h) => h.ru.toLowerCase()).join(", ")}`]
          : [`${muc ? "Настой" : m.ru === "Настой" || m.ru.startsWith("Настой") ? "Отвар" : "Настой"}: ${p.drug.ru.toLowerCase()}`, `Настойка на спирте: ${p.drug.ru.toLowerCase()}`, `${m.ru}: ${byId[CONFUSE[p.id]]?.drug.ru.toLowerCase() || "трава зверобоя"}`];
        return [[right, true], ...alt.map((a) => [a, false])];
      },
      explain: `${t.kind === "blend" ? "Species — сбор; Infusum — настой, Decoctum — отвар, Mucilago — слизь." : `${C.latT ? C.latT(t.rxLat) : t.rxLat}: ${m.ru.toLowerCase()} (${m.lat}). Infusum — настой, Decoctum — отвар, Mucilago — слизь, Tinctura — спиртовая настойка.`}`, src: K("с. 67–68, 70") });
    st.push({ id: "shelf", ru: "Сырьё", q: t.kind === "blend" ? "Возьмите с полки все компоненты сбора." : "Возьмите с полки нужное сырьё.", kind: "shelf",
      explain: t.herbs.map((h) => `${h.drug.lat} — ${h.drug.ru.toLowerCase()}`).join("; ") + ".", src: [{ id: "ema", loc: "названия сырья по монографиям", search: p.drug.lat }] });
    if (!muc) st.push({ id: "mass", ru: "Расчёт", q: t.kind === "blend" ? `Сколько граммов каждого компонента отвесить на ${t.V} мл?` : `Сколько граммов сырья отвесить на ${t.V} мл?`, kind: "mass",
      explain: t.kind === "blend" ? `Сбор берут в соотношении 1:10: ${t.V} мл / 10 = ${fmt(t.V / 10)} г, поровну на ${t.herbs.length} компонента, то есть по ${fmt(t.masses[0])} г.`
        : `Если масса не указана, берут 1:10; для валерианы 1:30. Здесь ${t.V} мл / ${t.ratio} = ${fmt(t.masses[0])} г.`, src: K("с. 67") });
    st.push({ id: "grind", ru: "Измельчение", q: t.kind === "blend" ? "Как измельчить каждый компонент сбора?" : "До какого размера измельчить сырьё?", kind: "grind",
      explain: "Листья и цветки измельчают примерно до 5 мм; стебли, кору, корни и корневища не более чем до 3 мм; плоды и семена не более чем до 0,5 мм. В сборах цветки, плоды и семена не измельчают, остальные компоненты измельчают каждый отдельно до измельчённости 5600 (в учебнике единицы не названы; это около 5 мм), если ФС не указывает иначе. Семена льна для слизи не измельчают.", src: [...K("с. 67, 71"), ...K("с. 86")] });
    st.push({ id: "extract", ru: "Извлечение", q: "Задайте режим извлечения.", kind: "extract",
      explain: muc ? "Слизь получают без нагревания: семена заливают водой и оставляют до полного набухания." : "Сырьё заливают водой комнатной температуры и нагревают на кипящей водяной бане при частом помешивании: настои 15 минут, отвары 30 минут. Затем охлаждают при комнатной температуре: настои не менее 45 минут, отвары 10 минут.",
      src: muc ? [...K("с. 86"), { id: "ema", loc: "Lini semen, разд. 4.2", search: "Lini semen" }] : K("с. 67") });
    st.push({ id: "strain", ru: "Процеживание", q: "Что делать после охлаждения?", kind: "opts",
      opts: () => muc ? [["Процедить, отделив семена", true], ["Процедить с сильным отжатием семян", false], ["Довести кипятком до объёма и прокипятить", false]]
        : [[`Процедить с отжатием и довести кипячёной водой до ${t.V} мл`, true], [`Процедить без отжатия и отпустить как есть`, false], [`Довести водой до ${t.V} мл, не процеживая`, false], [`Процедить и упарить до ${t.V} мл`, false]],
      explain: muc ? "Набухшие семена отделяют процеживанием." : "Извлечение процеживают с отжатием набухшего сырья (или фильтруют через вату), затем добавляют кипячёную воду до нужного объёма.", src: muc ? K("с. 86") : K("с. 67") });
    st.push({ id: "label", ru: "Хранение", q: "Что указать при отпуске о хранении?", kind: "opts",
      opts: () => [["Хранить в прохладном тёмном месте не более 2 суток", true], ["Хранить при комнатной температуре до 2 недель", false], ["Срок годности 1 год", false], ["Хранить в морозильной камере", false]],
      explain: STORAGE.t + " Настои и отвары быстро портятся, поэтому лучше готовить их ежедневно.", src: K("с. 68") });
    return st;
  }

  // ---------- Запросы посетителей (Провизор и смена) ----------
  function makeRequest(level) {
    const leaves = Object.values(diseaseIndex).filter((d) => !d.children && PLANTS.some((p) => p.uses.some((u) => u.c === d.id && u.ev !== "ethno") && METHODS[p.prep] && p.id !== "guelder"));
    const d = leaves[Math.floor(Math.random() * leaves.length)];
    const good = shuffle(PLANTS.filter((p) => METHODS[p.prep] && p.id !== "guelder" && p.uses.some((u) => u.c === d.id && u.ev !== "ethno")));
    const bad = shuffle(PLANTS.filter((p) => !p.uses.some((u) => u.c === d.id || u.c === d.parent || diseaseIndex[u.c]?.parent === d.id)));
    const right = good[0];
    return { kind: "request", d, right, opts: shuffle([right, ...bad.slice(0, 3)]), level };
  }

  // ---------- Экран выполнения ----------
  function runTask(t, { onDone, header = "" } = {}) {
    const baseL = t.L, withLat = () => (t.L = latOn() ? { ...baseL, ruLabels: false } : baseL);
    t = { ...t }; withLat();
    const stages = stagesFor(t);
    let i = 0, mistakes = 0, log = [], started = Date.now(), tick;
    const res = stages.map(() => null), tries = {};
    const render = () => {
      const s = stages[i];
      app.innerHTML = `${header}
        <div class="sim">
          <div class="card">
            <div class="score-line"><span>Уровень: <b>${t.L.ru}</b></span>${t.order ? `<span>Заказ <b>${t.order}</b></span>` : ""}<span>Ошибок: <b id="mist">${t.L.endOnly ? "—" : mistakes}</b></span>${t.L.timer ? `<span class="timer" id="tm">0:00</span>` : ""}${latBtn()}</div>
            <ol class="stepper" style="margin-top:10px">${stages.map((x, k) => `<li class="${k < i ? (res[k] === false && !t.L.endOnly ? "bad" : "done") : k === i ? "now" : ""}">${k + 1}. ${x.ru}</li>`).join("")}</ol>
          </div>
          ${rxHtml(t)}
          <div class="card stage" id="stage"><h2>${s.q}</h2><div id="body"></div><div id="fb"></div><div class="btn-row sim-skip"><button class="btn ghost small" id="skip" type="button">Пропустить шаг</button><span class="hint" id="skiphint">Без штрафа: шаг не засчитывается, но и ошибкой не считается.</span></div></div>
          ${log.length ? `<div class="card"><h4 style="margin-top:0">Журнал</h4><ol class="journal">${log.map((l) => `<li class="${t.L.endOnly ? "" : l.ok ? "ok" : "err"}">${l.t}</li>`).join("")}</ol></div>` : ""}
        </div>`;
      if (t.L.timer) { clearInterval(tick); const up = () => { const s2 = Math.floor((Date.now() - started) / 1000); const el = $("#tm"); if (!el) return clearInterval(tick); el.textContent = `${Math.floor(s2 / 60)}:${String(s2 % 60).padStart(2, "0")}`; }; up(); tick = setInterval(up, 1000); }
      STAGE[s.kind](s);
      $("[data-simlat]")?.addEventListener("click", () => latToggle(() => { withLat(); render(); }));
      // пропуск: сначала подтверждение, затем верный ответ с объяснением, без штрафа
      $("#skip").addEventListener("click", () => {
        const b = $("#skip");
        if (!b.classList.contains("sure")) { b.classList.add("sure"); b.textContent = "Точно пропустить?"; return; }
        if (res[i] === null) res[i] = "skip";
        log.push({ ok: true, skip: true, t: "Шаг пропущен" });
        $(".sim-skip")?.remove(); lock(true);
        $("#fb").innerHTML = `<div class="feedback"><b>Шаг пропущен.</b> ${s.explain} ${cite(s.src)}<div class="btn-row"><button class="btn" id="go" type="button">Дальше</button></div></div>`;
        $("#go").addEventListener("click", next); $("#go").focus({ preventScroll: true });
      });
    };
    const next = () => { i++; if (i < stages.length) render(); else finish(); };
    const judge = (s, ok, detail) => {
      if (res[i] === null) res[i] = ok;
      if (!ok) { mistakes++; tries[i] = (tries[i] || 0) + 1; }
      log.push({ ok, t: `${s.ru}: ${detail}` });
      MUSIC.sfx(ok ? "plop" : "bad");
      if (t.L.endOnly) return next();
      const expl = `${s.explain} ${cite(s.src)}`;
      $("#fb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : "Неверно."}</b> ${ok || !t.L.retry ? expl : (t.L.hints ? (tries[i] >= 2 ? `<span class="hintbox" style="display:block;margin-top:6px"><b>Подсказка.</b> ${expl}</span>` : `<span class="hint" style="display:block;margin-top:6px">Подумайте ещё раз; после второй ошибки появится подсказка.</span>`) : "")}
        <div class="btn-row">${ok || !t.L.retry ? `<button class="btn" id="go" type="button">Дальше</button>` : `<button class="btn ghost" id="again" type="button">Попробовать ещё раз</button>`}</div></div>`;
      $("#go")?.addEventListener("click", next);
      // повтор: этап рисуется заново (новый #body без старых обработчиков и выбранных банок)
      $("#again")?.addEventListener("click", () => { $("#fb").innerHTML = ""; const nb = $("#body").cloneNode(false); $("#body").replaceWith(nb); STAGE[s.kind](s); });
      lock(true);
      if (ok || !t.L.retry) $(".sim-skip")?.remove();
      ($("#go") || $("#again"))?.focus({ preventScroll: true });
      const m = $("#mist"); if (m) m.textContent = mistakes;
    };
    const lock = (on) => $$("#body button, #body input, #body select").forEach((b) => { if (b.id !== "go") b.disabled = on; });

    const STAGE = {
      opts(s) {
        const opts = shuffle(s.opts());
        $("#body").innerHTML = `<div class="opts">${opts.map(([txt, ok], k) => `<button class="opt" type="button" data-ok="${ok}"><span class="k">${"АБВГД"[k]}</span>${esc(txt)}</button>`).join("")}</div>`;
        $("#body").addEventListener("click", (e) => {
          const b = e.target.closest(".opt"); if (!b || b.disabled) return;
          const ok = b.dataset.ok === "true"; b.classList.add(ok ? "right" : "wrong");
          judge(s, ok, b.textContent.slice(1));
        });
      },
      shelf(s) {
        const need = t.herbs.map((h) => h.id);
        const pool = new Set(need);
        need.forEach((id) => CONFUSE[id] && pool.add(CONFUSE[id]));
        shuffle(PLANTS.filter((p) => !pool.has(p.id))).slice(0, Math.max(0, 8 - pool.size - (t.level === "provisor" ? 1 : 0))).forEach((p) => pool.add(p.id));
        const jars = [...pool].map((id) => ({ id, lat: byId[id].drug.lat, ru: byId[id].drug.ru, p: byId[id] }));
        if (t.level === "provisor") {
          const h = t.herbs[0], w = h.drug.lat.split(" "), noun = w[w.length - 1].toLowerCase();
          if (WRONG_PART[noun]) jars.push({ id: "fake", lat: [...w.slice(0, -1), WRONG_PART[noun]].join(" "), ru: "другая часть растения", p: h });
        }
        const picked = new Set();
        $("#body").innerHTML = `<div class="shelf">${shuffle(jars).map((j) => `<button class="jar" type="button" data-id="${j.id}">${jarArt(j.p)}<span class="lbl">${esc(j.lat)}</span>${t.L.ruLabels ? `<span class="ru">${esc(j.ru)}</span>` : ""}</button>`).join("")}</div>
          <div class="btn-row"><button class="btn" id="take" type="button" disabled>Взять выбранное</button><span class="hint" id="cnt">Выбрано: 0 из ${need.length}</span></div>`;
        $("#body").addEventListener("click", (e) => {
          const j = e.target.closest(".jar"); if (j && !j.disabled) {
            picked.has(j.dataset.id) ? picked.delete(j.dataset.id) : picked.add(j.dataset.id);
            j.classList.toggle("on", picked.has(j.dataset.id));
            $("#cnt").textContent = `Выбрано: ${picked.size} из ${need.length}`; $("#take").disabled = !picked.size;
          }
          if (e.target.closest("#take") && !e.target.closest("#take").disabled) {
            const ok = picked.size === need.length && need.every((id) => picked.has(id));
            $$(".jar").forEach((b) => { if (picked.has(b.dataset.id) && !need.includes(b.dataset.id)) b.classList.add("bad"); });
            judge(s, ok, [...picked].map((id) => jars.find((x) => x.id === id).lat).join(", "));
          }
        });
      },
      mass(s) {
        $("#body").innerHTML = `${t.L.hints ? `<p class="hintbox"><b>Правило.</b> Если масса сырья в прописи не указана, берут соотношение 1:10, для валерианы 1:30 ${cite(K("с. 67"))}</p>` : ""}
          ${t.herbs.map((h, k) => `<div class="numrow" style="margin:10px 0"><label for="m${k}">${t.L.ruLabels ? h.drug.ru : h.drug.lat}, г</label><input id="m${k}" inputmode="decimal" autocomplete="off" placeholder="0,0"><span class="readout" id="r${k}">0,0 г</span></div>`).join("")}
          <div class="btn-row"><button class="btn" id="weigh" type="button">${ICON("scale")} Отвесить</button></div>`;
        const val = (k) => parseFloat(String($("#m" + k).value).replace(",", "."));
        t.herbs.forEach((_, k) => $("#m" + k).addEventListener("input", () => { const v = val(k); $("#r" + k).textContent = (isFinite(v) ? fmt(v) : "0,0") + " г"; }));
        t.herbs.forEach((_, k) => $("#m" + k).addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); $("#weigh").click(); } }));
        $("#weigh").addEventListener("click", () => {
          const vals = t.herbs.map((_, k) => val(k));
          if (vals.some((v) => !isFinite(v))) return toast("Введите массу числом, например 20 или 6,7.");
          const ok = vals.every((v, k) => Math.abs(v - t.masses[k]) <= 0.15);
          judge(s, ok, vals.map(fmt).join(" г, ") + " г");
        });
      },
      grind(s) {
        const muc = t.herbs[0].prep === "mucilage";
        const sizes = [5, 3, 0.5, 0];
        $("#body").innerHTML = `${t.herbs.map((h, k) => `<div style="margin:12px 0"><b style="font-family:var(--f-ui)">${t.L.ruLabels ? h.drug.ru : h.drug.lat}</b>
          <div class="chips" data-k="${k}">${sizes.map((z) => `<button class="chip" type="button" data-z="${z}">${SIZE_RU[z]}</button>`).join("")}</div></div>`).join("")}
          <div class="btn-row"><button class="btn" id="g" type="button" disabled>${ICON("mortar")} Измельчить</button></div>`;
        const pick = {};
        $("#body").addEventListener("click", (e) => {
          const c = e.target.closest(".chip[data-z]"); if (c && !c.disabled) {
            const k = c.parentElement.dataset.k; pick[k] = +c.dataset.z;
            $$(".chip", c.parentElement).forEach((x) => x.classList.toggle("on", x === c));
            $("#g").disabled = Object.keys(pick).length < t.herbs.length;
          }
          if (e.target.closest("#g") && !e.target.closest("#g").disabled) {
            const ok = t.herbs.every((h, k) => pick[k] === sizeOf(h, t.kind === "blend"));
            judge(s, ok, t.herbs.map((h, k) => `${h.ru.toLowerCase()}: ${SIZE_RU[pick[k]]}`).join("; "));
          }
        });
        void muc;
      },
      extract(s) {
        const muc = t.herbs[0].prep === "mucilage";
        const sel = (id, label, opts) => `<div class="numrow" style="margin:8px 0"><label for="${id}" style="min-width:11em">${label}</label><select class="sel" id="${id}"><option value="">выберите</option>${opts.map(([v, txt]) => `<option value="${v}">${txt}</option>`).join("")}</select></div>`;
        $("#body").innerHTML = `
          ${sel("w", "Вода", [["room", "комнатной температуры"], ["boil", "кипяток"], ["cold", "ледяная"]])}
          ${sel("h", "Нагрев", [["none", "без нагрева"], ["b15", "кипящая водяная баня, 15 мин"], ["b30", "кипящая водяная баня, 30 мин"], ["fire", "кипятить на открытом огне 5 мин"]])}
          ${sel("c", "Охлаждение / настаивание", [["c10", "10 мин"], ["c45", "45 мин"], ["swell", "до полного набухания"], ["c0", "сразу процедить"]])}
          <div class="water" style="margin:12px 0"><i id="wl"></i></div><p class="hint" id="wt">Водяная баня готова.</p>
          <div class="btn-row"><button class="btn" id="run" type="button">${ICON("clock")} Запустить</button></div>`;
        $("#run").addEventListener("click", () => {
          const w = $("#w").value, h = $("#h").value, c = $("#c").value;
          if (!w || !h || !c) return toast("Выберите воду, нагрев и охлаждение.");
          const want = muc ? { w: "room", h: "none", c: "swell" } : { w: "room", h: t.method.steps.includes("bath30") ? "b30" : "b15", c: t.method.steps.includes("cool10") ? "c10" : "c45" };
          const ok = w === want.w && h === want.h && c === want.c;
          $("#run").disabled = true; let k = 0;
          const anim = setInterval(() => { k += 5; const wl = $("#wl"); if (!wl) return clearInterval(anim); wl.style.width = Math.min(100, k) + "%"; $("#wt").textContent = k < 60 ? "Нагрев на водяной бане…" : "Охлаждение…"; if (k >= 100) { clearInterval(anim); $("#wt").textContent = "Готово."; judge(s, ok, [$("#w").selectedOptions[0].text, $("#h").selectedOptions[0].text, $("#c").selectedOptions[0].text].join(", ")); } }, 60);
        });
      },
    };
    const finish = () => {
      clearInterval(tick);
      const secs = Math.round((Date.now() - started) / 1000);
      const right = res.filter((r) => r === true).length, skipped = res.filter((r) => r === "skip").length, score = Math.max(0, right * 10 - (t.L.endOnly ? 0 : mistakes * 2) + (t.L.timer && secs < 150 && right === stages.length ? 10 : 0));
      MUSIC.sfx(right === stages.length ? "good" : "bad");
      const report = stages.map((s, k) => `<li class="${res[k] === true ? "ok" : res[k] === "skip" ? "" : "err"}"><span><b>${s.ru}.</b> ${res[k] === "skip" ? "<i>Пропущено.</i> " : ""}${res[k] === true ? "" : `${s.explain} ${cite(s.src)}`}</span></li>`).join("");
      const html = `<div class="card"><p class="verdict">${right === stages.length ? "Пропись выполнена без ошибок" : "Пропись выполнена"}</p><h2 style="margin-top:.1em">${esc(t.title)}</h2>
        <div class="score-line"><span>Верных этапов: <b>${right} из ${stages.length}</b></span>${skipped ? `<span>Пропущено: <b>${skipped}</b></span>` : ""}<span>Баллы: <b>${score}</b></span>${t.L.timer ? `<span>Время: <b>${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")}</b></span>` : ""}</div>
        <h4>Разбор</h4><ol class="journal">${report}</ol>
        <div class="label-card" style="margin-top:12px">Аптека учебная<br>${t.kind === "blend" ? `${esc(t.title)}<br>${esc(t.rxLat)} ${t.V} ml` : `${esc(t.rxLat)} ${t.V} ml`}<br>По указанию врача.<br>Хранить в прохладном месте не более 2 суток.</div></div>`;
      onDone ? onDone({ score, right, total: stages.length - skipped, skipped, html, secs }) : (app.innerHTML = `${back}${html}<div class="btn-row"><a class="btn" href="#/sim">К симулятору</a></div>`);
    };
    render();
  }

  function jarArt(p) {
    return `<svg viewBox="0 0 54 64" aria-hidden="true"><rect x="14" y="2" width="26" height="8" rx="2" fill="#6b4a2e"/><path d="M10 12h34a4 4 0 0 1 4 4v40a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V16a4 4 0 0 1 4-4z" fill="rgba(200,220,210,.18)" stroke="currentColor" stroke-opacity=".45"/>
      ${ART.draw(p).replace(/^<svg viewBox="0 0 200 190"[^>]*>/, '<svg x="8" y="15" width="38" height="44" viewBox="0 0 200 190">')}</svg>`;
  }

  // ---------- Уроки ----------
  // Каждый урок: развёрнутая теория (главное, текст учебника, разбор примера), затем проверка без теории на экране:
  // шесть вопросов на другом сырье (правило нужно применить, а не найти в тексте) и одна пропись целиком на случайном сырье.
  const TECH = window.K3?.tech || [];
  const T = (topic) => TECH.filter((x) => x.topic === topic);
  const TX = (re) => TECH.filter((x) => re.test(x.t));
  // калину не берём: в справочнике её сырьё «кора и плоды», способ и измельчение зависят от части
  const WM = () => PLANTS.filter((p) => METHODS[p.prep] && p.id !== "guelder");
  const kindOf = (p) => (/decoction/.test(p.prep) ? "Отвар" : p.prep === "mucilage" ? "Слизь" : "Настой");
  const latOrRu = (p, i) => (i % 2 ? `<i>${esc(p.drug.lat)}</i>` : `«${esc(p.drug.ru)}»`);
  const sizeRu = (p, inBlend) => SIZE_RU[sizeOf(p, inBlend)];
  const SIZE_OPTS = ["около 5 мм", "не более 3 мм", "не более 0,5 мм", "не измельчать"];
  const opt = (right, wrong) => shuffle([[right, true], ...wrong.filter((w) => w !== right).slice(0, 3).map((w) => [w, false])]);
  const num = (q, ans, unit, ex, s) => ({ kind: "num", q, ans, unit, ex, s });
  const choice = (q, right, wrong, ex, s) => ({ kind: "opts", q, opts: opt(right, wrong), ex, s });
  const ruleKind = (p) => (p.part === "leaf" || p.part === "flower" || p.part === "herb" ? "Листья, цветки и травы обычно готовят как настой." : p.part === "root" || p.part === "bark" ? "Корни, корневища и кору обычно готовят как отвар." : "Плоды и семена: способ зависит от сырья.");
  const excNote = (p) => ({ bearberry: "Исключение: кожистые листья толокнянки готовят как отвар.", lingonberry: "Исключение: кожистые листья брусники готовят как отвар.", valerian: "Исключение: валериану готовят как настой в соотношении 1:30.", horsetail: "В справочнике траву хвоща записали отваром, как исключение из общего правила.", bilberry: "Плоды черники в справочнике записаны отваром.", flax: "Семена льна не настаивают на водяной бане: из них получают слизь без нагревания." }[p.id] || "");
  const kindEx = (p) => `${p.drug.ru}: ${METHODS[p.prep].ru.toLowerCase()} (${METHODS[p.prep].lat}). ${ruleKind(p)} ${excNote(p)}`;
  const qKind = (p, i) => choice(`Какое водное извлечение готовят из сырья ${latOrRu(p, i)}?`, kindOf(p), ["Настой", "Отвар", "Слизь", "Настойка на спирте"], kindEx(p), METHODS[p.prep].src);
  const qSize = (p, i) => choice(`До какого размера измельчают сырьё ${latOrRu(p, i)} для водного извлечения?`, sizeRu(p), SIZE_OPTS,
    `${p.drug.ru}: ${sizeRu(p)}. Листья и цветки около 5 мм; стебли, кору, корни и корневища не более 3 мм; плоды и семена не более 0,5 мм.${p.prep === "mucilage" ? " Семена льна для слизи берут целыми или надломленными." : ""}`, K("с. 67"));
  const qMass = (p, i) => { const V = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)], r = ratioOf(p);
    return num(`Сколько граммов сырья ${latOrRu(p, i)} отвесить на ${V} мл ${kindOf(p) === "Отвар" ? "отвара" : "настоя"}, если масса в прописи не указана?`, Math.round((V / r) * 10) / 10, "г",
      `Соотношение ${r === 30 ? "для валерианы 1:30" : "по общему правилу 1:10"}: ${V} / ${r} = ${fmt(V / r)} г.`, K("с. 67")); };
  const pickN = (arr, n, notId) => shuffle(arr.filter((p) => p.id !== notId)).slice(0, n);

  const LESSONS = [
    { id: "l1", ru: "Настои и отвары", sub: "Что такое водные извлечения, из чего их готовят, нагрев и охлаждение", ex: "chamomile",
      key: [{ t: "Настой (Infusum) готовят из нежных частей растения: листьев, цветков, травы. Отвар (Decoctum) готовят из плотных: корней, корневищ, коры.", s: K("с. 67") },
        { t: "Нагрев на кипящей водяной бане при частом помешивании: настой 15 минут, отвар 30 минут. Охлаждение при комнатной температуре: настой не менее 45 минут, отвар 10 минут.", s: K("с. 67") },
        { t: "Настои и отвары это свежеприготовленные водные извлечения; их готовят также из сборов и растворов экстрактов.", s: K("с. 67") }],
      theory: () => [...TECH.slice(0, 1), ...T("heating"), ...T("cooling"), { t: METHODS.infusion.why, s: METHODS.infusion.src }, { t: METHODS.decoction.why, s: METHODS.decoction.src }, ...TX(/^Домашний способ|^Чай:/), ...TX(/^Настойки —/)],
      example: () => { const p = byId.chamomile; return `Цветки ромашки нежные, значит настой. Сырьё заливают водой комнатной температуры, держат на кипящей водяной бане 15 минут, охлаждают не менее 45 минут, процеживают с отжатием и доводят кипячёной водой до объёма.`; },
      // в первом уроке только сырьё по общему правилу; исключения (толокнянка, брусника, валериана, хвощ, черника) разбирают позже
      quiz: () => { const w = WM().filter((p) => p.id !== "chamomile" && p.prep !== "mucilage" && ((kindOf(p) === "Отвар" && ["root", "bark"].includes(p.part)) || (kindOf(p) === "Настой" && ["leaf", "flower", "herb"].includes(p.part) && p.prep !== "valerian"))); const dec = pickN(w.filter((p) => kindOf(p) === "Отвар"), 2), inf = pickN(w.filter((p) => kindOf(p) === "Настой"), 2);
        const tk = Math.random() < 0.5 ? ["настой", 15, 45] : ["отвар", 30, 10];
        return [...shuffle([...dec, ...inf]).map(qKind),
          num(`Сколько минут держат ${tk[0]} на кипящей водяной бане?`, tk[1], "мин", "Настой 15 минут, отвар 30 минут.", K("с. 67")),
          num(`Сколько минут охлаждают ${tk[0] === "настой" ? "отвар" : "настой"} при комнатной температуре?`, tk[0] === "настой" ? 10 : 45, "мин", "Настой охлаждают не менее 45 минут, отвар 10 минут.", K("с. 67"))]; },
      final: { pool: () => WM().filter((p) => p.id !== "chamomile" && p.prep !== "mucilage"), level: "assistant" } },

    { id: "l2", ru: "Соотношение сырья и воды", sub: "1:10, валериана 1:30, сильнодействующее сырьё 1:400; расчёт массы", ex: "valerian",
      key: [{ t: "Если масса сырья не указана, его берут по соотношению: обычно 1:10, для валерианы и горицвета 1:30, для сырья с сильнодействующими веществами 1:400.", s: K("с. 67") },
        { t: "Масса сырья = объём извлечения / вторая цифра соотношения. Например, 200 мл при 1:10 это 20 г.", s: K("с. 67"), derived: true },
        { t: "Настои для приёма внутрь делают менее концентрированными, для наружного применения более концентрированными.", s: K("с. 67") }],
      theory: () => [...T("ratio"), ...TX(/^Настойки —/)],
      example: () => `Пропись: настой валерианы, 150 мл. Валериану берут 1:30, значит 150 / 30 = 5,0 г корневищ с корнями. Для ромашки на те же 150 мл было бы 150 / 10 = 15,0 г.`,
      quiz: () => { const w = WM().filter((p) => p.id !== "valerian" && p.prep !== "mucilage");
        return [...pickN(w, 3).map(qMass), qMass(byId.valerian, 1),
          choice("В каком соотношении готовят водное извлечение из сырья с сильнодействующими веществами, если ФС не указывает иначе?", "1:400", ["1:10", "1:30", "1:100", "1:400"], "Общее правило 1:10, валериана и горицвет 1:30, сильнодействующее сырьё 1:400.", K("с. 67")),
          choice("Каким делают настой для наружного применения по сравнению с настоем для приёма внутрь?", "Более концентрированным", ["Менее концентрированным", "Таким же", "Более концентрированным", "Его разводят спиртом"], "Для приёма внутрь настои делают менее концентрированными (1:30 или 1:40), для наружного применения более концентрированными.", K("с. 67"))]; },
      final: { pool: () => WM().filter((p) => p.prep !== "mucilage" && p.id !== "valerian"), level: "assistant" } },

    { id: "l3", ru: "Измельчение", sub: "Размер частиц для листьев, корней, коры, плодов; сырьё в сборе", ex: "oak",
      key: [{ t: "Листья и цветки измельчают примерно до 5 мм; стебли, кору, корни, корневища не более чем до 3 мм; плоды и семена не более чем до 0,5 мм.", s: K("с. 67") },
        { t: "Закономерность: чем плотнее ткань сырья, тем мельче частицы.", s: K("с. 67"), derived: true },
        { t: "В сборе компоненты измельчают и просеивают раздельно; цветки, семена и плоды в сборе не измельчают.", s: K("с. 71") }],
      theory: () => [...T("particle")],
      example: () => `Кора дуба плотная, поэтому её измельчают не более чем до 3 мм и готовят отвар. Если бы та же кора была в сборе, её всё равно измельчали бы отдельно от остальных компонентов.`,
      quiz: () => { const w = WM().filter((p) => p.id !== "oak"); const parts = ["leaf", "flower", "herb", "root", "berry", "seed"];
        const ps = shuffle(parts).slice(0, 5).map((pt) => shuffle(w.filter((p) => p.part === pt))[0]).filter(Boolean);
        const bls = BLENDS.filter((b) => b.items.some((id) => ["flower", "berry", "seed"].includes(byId[id].part))), bl = shuffle(bls)[0], fl = bl.items.map((id) => byId[id]).find((p) => ["flower", "berry", "seed"].includes(p.part));
        return [...ps.map(qSize), choice(`В сборе «${bl.ru}» есть ${fl.drug.ru.toLowerCase()}. Как их готовят для сбора?`, "не измельчать", SIZE_OPTS, "Цветки, семена и плоды в сборе не измельчают; остальные компоненты измельчают и просеивают раздельно.", K("с. 71"))].slice(0, 6); },
      final: { pool: () => WM().filter((p) => p.id !== "oak"), level: "assistant" } },

    { id: "l4", ru: "Процеживание и доведение до объёма", sub: "Отжатие, фильтрование через вату, кипячёная вода, аппаратура", ex: "tormentil",
      key: [{ t: "После охлаждения извлечение процеживают с отжатием набухшего сырья или фильтруют через вату.", s: K("с. 67") },
        { t: "Затем добавляют кипячёную воду до нужного объёма: набухшее сырьё удерживает часть воды, и без доведения доза будет неверной.", s: K("с. 67"), derived: true },
        { t: "В аптеке используют инфундирный аппарат; допустим стеклянный, фарфоровый или эмалированный металлический сосуд на кипящей водяной бане.", s: K("с. 67") }],
      theory: () => [...T("straining"), ...T("volume"), ...T("equipment"), ...TX(/^Домашний способ/)],
      example: () => `Отвар корневищ лапчатки на 100 мл: после охлаждения его процеживают с отжатием. Набухшее сырьё удержало воду, и получилось, например, 82 мл. Добавляют 18 мл кипячёной воды до 100 мл.`,
      quiz: () => { const V = [100, 150, 200][Math.floor(Math.random() * 3)], got = V - (8 + Math.floor(Math.random() * 25));
        return shuffle([
          choice("Что делают с извлечением сразу после охлаждения?", "Процеживают с отжатием набухшего сырья или фильтруют через вату", ["Доводят до объёма и процеживают без отжатия", "Кипятят ещё 5 минут", "Отпускают вместе с сырьём"], "Процеживают с отжатием набухшего сырья или фильтруют через вату, затем доводят до объёма.", K("с. 67")),
          choice("Какой водой доводят извлечение до нужного объёма?", "Кипячёной водой", ["Водой из-под крана", "Спиртом 40 %", "Горячим отваром того же сырья"], "После процеживания добавляют кипячёную воду до нужного объёма.", K("с. 67")),
          choice("В каком аппарате готовят настои и отвары в аптеке?", "Инфундирный аппарат", ["Перколятор", "Автоклав", "Дистиллятор"], "В аптеке используют инфундирный аппарат.", K("с. 67")),
          choice("Какой сосуд допустим вместо инфундирного аппарата?", "Стеклянный, фарфоровый или эмалированный на кипящей водяной бане", ["Алюминиевый на открытом огне", "Любой металлический на открытом огне", "Пластиковый в микроволновой печи"], "Допустим другой стеклянный, фарфоровый или эмалированный металлический сосуд на кипящей водяной бане.", K("с. 67")),
          choice("Как готовят настой домашним способом?", "Заливают крутым кипятком, укутывают и томят 4–6 часов", ["Кипятят 5 минут на открытом огне", "Настаивают 7 дней на спирте", "Заливают холодной водой на ночь"], "Домашний способ: сырьё заливают крутым кипятком, плотно закрывают, укутывают и томят 4–6 ч, затем отжимают и процеживают.", K("с. 67")),
        ]).slice(0, 5).concat([num(`Выписано ${V} мл. После процеживания с отжатием получилось ${got} мл. Сколько миллилитров кипячёной воды добавить?`, V - got, "мл", `${V} − ${got} = ${V - got} мл кипячёной воды.`, K("с. 67"))]); },
      final: { pool: () => WM().filter((p) => p.prep !== "mucilage" && p.id !== "tormentil"), level: "assistant" } },

    { id: "l5", ru: "Листья: настой или отвар", sub: "Общее правило для листьев и исключения: толокнянка и брусника", ex: "lingonberry",
      key: [{ t: "Листья по общему правилу готовят как настой и измельчают примерно до 5 мм.", s: K("с. 67") },
        { t: METHODS.leaf_decoction.why, s: METHODS.leaf_decoction.src },
        { t: "В сборах листья толокнянки и брусники измельчают по особой норме (2400), а не как прочее сырьё для настоев и отваров (5600).", s: K("с. 71") }],
      theory: () => [{ t: METHODS.leaf_decoction.why, s: METHODS.leaf_decoction.src }, ...byId.bearberry.cautions.slice(0, 1), ...TX(/листья толокнянки и брусники/)],
      example: () => `Листья брусники кожистые и плотные, поэтому вода плохо проникает в них за 15 минут. Их готовят как отвар: 30 минут на водяной бане, 10 минут охлаждения.`,
      quiz: () => { const leaves = WM().filter((p) => p.part === "leaf" && p.id !== "lingonberry" && p.id !== "pinus"); const sel = [byId.bearberry, ...pickN(leaves.filter((p) => p.id !== "bearberry"), 4)];
        return [...shuffle(sel).map(qKind), choice("Почему листья толокнянки и брусники готовят как отвар?", "Это кожистые плотные листья", ["В них есть эфирное масло, которое нужно отогнать", "Их всегда берут в соотношении 1:30", "Это исключение для детей", "Это кожистые плотные листья"], METHODS.leaf_decoction.why, METHODS.leaf_decoction.src)]; },
      final: { pool: () => WM().filter((p) => p.part === "leaf" && p.id !== "lingonberry" && p.id !== "pinus"), level: "assistant" } },

    { id: "l6", ru: "Плоды, семена и слизи", sub: "Мелкое измельчение плодов; слизь (Mucilago) из семян льна без нагревания", ex: "caraway",
      key: [{ t: "Плоды и семена для настоя измельчают мельче всего остального сырья, не более чем до 0,5 мм.", s: K("с. 67") },
        { t: METHODS.mucilage.why, s: METHODS.mucilage.src },
        { t: "В сборах плоды и семена не измельчают.", s: K("с. 71") }],
      theory: () => [{ t: METHODS.seed_infusion.why, s: METHODS.seed_infusion.src }, { t: METHODS.mucilage.why, s: METHODS.mucilage.src }, ...T("particle").slice(0, 1)],
      example: () => `Плоды тмина для настоя измельчают не более чем до 0,5 мм, иначе эфирное масло из плотных плодов почти не перейдёт в воду. Дальше как обычный настой: 1:10, 15 минут бани, 45 минут охлаждения.`,
      quiz: () => { const seeds = WM().filter((p) => ["seed", "berry"].includes(p.part) && p.id !== "caraway");
        return [...seeds.map(qSize), ...seeds.map(qKind).slice(0, 2),
          choice("Нагревают ли семена льна, когда готовят слизь?", "Нет, заливают водой и оставляют до полного набухания", ["Да, 15 минут на водяной бане", "Да, кипятят 30 минут", "Нет, их растирают в порошок с сахаром"], METHODS.mucilage.why, METHODS.mucilage.src),
          choice("Плоды или семена входят в сбор. Как их готовят для сбора?", "не измельчать", SIZE_OPTS, "Компоненты сбора измельчают и просеивают раздельно, но цветки, семена и плоды в сборе не измельчают.", K("с. 71"))].slice(0, 6); },
      final: { pool: () => WM().filter((p) => ["seed", "berry"].includes(p.part) && p.id !== "caraway"), level: "assistant" } },

    { id: "l7", ru: "Сборы", sub: "Основа, вспомогательные компоненты, корригенты; измельчение и расчёт", ex: "chest",
      key: [{ t: "Сбор (species) состоит из основы (basis), вспомогательных компонентов (adjuvans; в 2–3 раза меньше основы) и корригентов (corrigens; ещё вдвое меньше).", s: K("с. 70–71") },
        { t: "Компоненты измельчают и просеивают раздельно; цветки, семена и плоды не измельчают. Затем перемешивают до однородности.", s: K("с. 71") },
        { t: "Из сбора готовят настой или отвар по самому плотному компоненту; сбор берут 1:10 от объёма, при равных долях масса делится поровну.", s: K("с. 67, 71"), derived: true }],
      theory: () => [...TX(/^Сборы \(species\)/), ...TX(/^Компоненты сбора/), ...T("particle").slice(1), ...TX(/^Урологический сбор/)],
      example: () => { const b = BLENDS.find((x) => x.id === "chest"); return `Грудной сбор: ${b.items.map((id) => byId[id].drug.ru.toLowerCase()).join(", ")}. Листья подорожника и траву чабреца измельчают каждый отдельно, цветки липы не измельчают. На 200 мл берут 20 г сбора, по ${fmt(20 / 3)} г каждого компонента. Все компоненты нежные, поэтому готовят настой.`; },
      quiz: () => { const others = BLENDS.filter((b) => b.id !== "chest");
        const b1 = shuffle(others)[0], V = [100, 150, 200, 300][Math.floor(Math.random() * 4)], n = b1.items.length, dec = b1.steps.some((s) => s.a === "bath30");
        const hard = b1.items.map((id) => byId[id]).find((p) => ["root", "bark"].includes(p.part));
        return [
          num(`Сколько граммов каждого компонента сбора «${b1.ru}» отвесить на ${V} мл, если компоненты взяты поровну?`, Math.round((V / 10 / n) * 10) / 10, "г", `${V} / 10 = ${fmt(V / 10)} г сбора, поровну на ${n}: по ${fmt(V / 10 / n)} г.`, K("с. 67")),
          choice(`Что готовят из сбора «${b1.ru}»: ${b1.items.map((id) => byId[id].drug.ru.toLowerCase()).join(", ")}?`, dec ? "Отвар" : "Настой", ["Настой", "Отвар", "Слизь", "Настойка на спирте"], dec ? `В сборе есть плотное сырьё (${(hard || byId[b1.items[0]]).drug.ru.toLowerCase()}), поэтому весь сбор готовят как отвар.` : "Все компоненты нежные (листья, цветки, травы), поэтому готовят настой.", K("с. 67")),
          choice("Как называется часть сбора, доля которой ещё вдвое меньше вспомогательных компонентов?", "Корригенты (corrigens)", ["Основа (basis)", "Вспомогательные компоненты (adjuvans)", "Второстепенные добавки (minoritis)"], "Основа (basis), вспомогательные компоненты (adjuvans; в 2–3 раза меньше основы), корригенты (corrigens; ещё вдвое меньше), второстепенные добавки (minoritis).", K("с. 70–71")),
          choice("Во сколько раз вспомогательных компонентов (adjuvans) обычно меньше, чем основы?", "В 2–3 раза", ["В 10 раз", "Поровну", "В 2–3 раза", "В 50 раз"], "Вспомогательные компоненты в 2–3 раза меньше основы: 50, 30, 25 или 15–17 %.", K("с. 70")),
          choice("Как вносят эфирное масло в сбор?", "Опрыскивают раствором в спирте 1:10", ["Вливают неразбавленным", "Растирают с сахаром", "Добавляют в воду при заваривании"], "Эфирное масло вносят опрыскиванием раствором в спирте 1:10, соль насыщенным раствором.", K("с. 71")),
          choice("Как готовят компоненты сбора перед смешением?", "Измельчают и просеивают каждый отдельно", ["Измельчают все вместе", "Не измельчают ничего", "Варят каждый отдельно"], "Компоненты сбора измельчают и просеивают раздельно, затем перемешивают до однородности.", K("с. 71")),
        ]; },
      final: { blend: true, level: "assistant" } },

    { id: "l8", ru: "Латинская пропись без массы", sub: "Прочитать Rp., понять форму и сырьё, рассчитать массу самому", ex: "peppermint",
      key: [{ t: "В прописи названия формы и сырья стоят в родительном падеже: Infusi (настоя), Decocti (отвара), Mucilaginis (слизи); затем сырьё: foliorum (листьев), florum (цветков), herbae (травы), radicis (корня), corticis (коры), fructuum (плодов), seminum (семян).", s: [{ id: "rsmu", loc: "латинские лекарственные формы, части растений" }] },
        { t: "Если масса не указана, её считают по соотношению: 1:10, валериана 1:30.", s: K("с. 67") },
        { t: "В учебнике латинских прописей нет; есть только латинские названия сырья и термины species, recens, siccum. Формы прописей в приложении составлены по общим правилам рецептурной латыни.", s: K("с. 70") }],
      theory: () => [...T("prescription"), ...T("ratio").slice(0, 1)],
      example: () => `Rp.: ${C.latT ? C.latT(rxName(byId.peppermint)) : rxName(byId.peppermint)} 200 ml. Infusi значит «настоя», дальше сырьё: листья мяты перечной. Масса не указана, значит 1:10: 200 / 10 = 20,0 г.`,
      quiz: () => { const ps = pickN(WM().filter((p) => p.prep !== "mucilage"), 3, "peppermint");
        return ps.flatMap((p, i) => { const V = [100, 150, 200][i % 3], others = pickN(WM(), 6, p.id);
          return [choice(`Rp.: <i>${esc(rxName(p))}</i> ${V} ml. Что выписано?`, `${kindOf(p)}: ${p.drug.ru.toLowerCase()}`, [`${kindOf(p) === "Настой" ? "Отвар" : "Настой"}: ${p.drug.ru.toLowerCase()}`, ...others.map((o) => `${kindOf(p)}: ${o.drug.ru.toLowerCase()}`)], `${rxName(p)}: ${METHODS[p.prep].ru.toLowerCase()}, ${p.drug.ru.toLowerCase()} (${p.drug.lat}).`, [{ id: "ema", loc: "названия сырья", search: p.drug.lat }]),
            num(`Rp.: <i>${esc(rxName(p))}</i> ${V} ml. Сколько граммов сырья отвесить?`, Math.round((V / ratioOf(p)) * 10) / 10, "г", `${V} / ${ratioOf(p)} = ${fmt(V / ratioOf(p))} г.`, K("с. 67"))]; }); },
      final: { pool: () => WM().filter((p) => p.id !== "peppermint"), level: "provisor" } },

    { id: "l9", ru: "Хранение", sub: "Готовые извлечения, склад, сроки годности сырья", ex: "linden",
      key: [{ t: STORAGE.t + " Настои и отвары быстро портятся, особенно летом, в тепле и на свету, поэтому лучше готовить их ежедневно.", s: K("с. 68") },
        { t: "Склад сырья: сухой, чистый, проветриваемый, без прямого солнца, 10–12 °C. Эфиромасличное сырьё и сборы хранят отдельно; ядовитое и сильнодействующее в отдельном помещении под замком.", s: K("с. 29–31") },
        { t: "Ориентировочные сроки годности: подземные органы 3–6 лет, плоды 2–4 года, листья, травы и цветки 2–3 года, кора 3–4 года.", s: K("с. 33") }],
      theory: () => [...T("storage_finished"), ...T("storage_raw")],
      example: () => `Настой цветков липы отпускают с указанием: хранить в прохладном тёмном месте не более 2 суток. Сами цветки липы на складе хранят в сухом проветриваемом помещении без прямого солнца.`,
      quiz: () => { const st = shuffle(WM().filter((p) => p.id !== "linden" && T0(p)?.t && !/—|\(/.test(T0(p).t)));
        const terms = [...new Set(st.map((p) => T0(p).t))];
        return [choice("Сколько можно хранить готовый настой или отвар?", "Не более 2 суток в прохладном тёмном месте", ["До 2 недель при комнатной температуре", "1 год", "7 дней на свету"], STORAGE.t, STORAGE.s),
          choice("Почему эфиромасличное сырьё хранят отдельно?", "Оно передаёт и впитывает запахи", ["Оно ядовито", "Оно быстро намокает", "Так требует только мелисса"], "Эфиромасличное сырьё хранят отдельно, так как оно передаёт и впитывает запахи.", K("с. 121")),
          num("При какой температуре (°C, верхняя граница) держат сухое сырьё на складе по учебнику: 10–…?", 12, "°C", "Склад: 10–12 °C, влажность воздуха 13 %.", K("с. 29")),
          choice("Где хранят ядовитое и сильнодействующее сырьё?", "В отдельном помещении, в запирающихся сейфах или металлических шкафах", ["Вместе с эфиромасличным", "На общих стеллажах", "В холодильнике с готовыми настоями"], "Ядовитое (список А) и сильнодействующее (список Б) сырьё хранят в отдельном помещении, в запирающихся сейфах или металлических шкафах.", K("с. 31")),
          // неверные варианты: другой верхний срок и короткая формулировка, чтобы не было двух верных («3 года» и «до 3 лет»)
          ...st.slice(0, 2).map((p, i) => { const top = (x) => (x.match(/\d+/g) || []).map(Number).pop(), r = T0(p).t;
            return choice(`Какой срок годности сырья ${latOrRu(p, i)} по учебнику?`, r, shuffle(terms.filter((x) => x !== r && top(x) !== top(r) && x.length <= 24)), `${p.drug.ru}: ${r}.`, K(T0(p).loc || "")); })]; },
      final: { pool: () => WM().filter((p) => p.id !== "linden"), level: "provisor" } },
  ];
  const T0 = (p) => window.TEXTS?.plants?.[p.id]?.storage;

  C.simLessons = LESSONS.map((l) => ({ id: l.id, title: l.ru, sub: l.sub, plant: byId[l.ex] ? l.ex : null, blend: byId[l.ex] ? null : l.ex, level: l.final.level, done: () => sim.lessons.includes(l.id) }));
  C.simProgress = () => ({ shift: sim.shiftPass || {}, examMid: sim.examMid || 0, examFinal: sim.examFinal || 0, x: C.simxProgress ? C.simxProgress() : { photo: {}, lab: {}, case: {} } });
  const hub = () => {
    const lvl = sim.level;
    app.innerHTML = `
      <h1>Провизор</h1>
      <p class="lead">Учебная аптека и курс фармакогнозии одним путём, от самого простого к самому частному. Теория с проверочными вопросами чередуется с практикой у аптечного стола: читаете пропись, берёте сырьё с полки, рассчитываете массу, измельчаете, готовите извлечение и отпускаете с указаниями о хранении. Каждая ступень заканчивается рабочей сменой или зачётом. Правила по учебнику фармакогнозии ${cite(K("с. 67–71"))}</p>
      <div class="card sim-lat-card"><div><b>Латынь на время симулятора</b><p class="hint">Без перевода задания честнее: названия сырья, этикетки на банках и прописи только по-латыни. Когда вы выйдете из симулятора, прежний режим названий вернётся.</p></div>${latBtn()}</div>
      ${C.flash ? C.flash.hubHtml() : ""}
      ${C.course ? C.course.hubHtml() : ""}
      <h2>Свободная практика</h2>
      <p class="hint">Вне пути: любое сырьё или сбор, на выбранном уровне сложности. Смен пройдено: ${sim.shifts}.</p>
      <div class="levels" id="lv">${Object.entries(LEVELS).map(([k, L]) => `<button class="card level ${k === lvl ? "on" : ""}" type="button" data-l="${k}"><b>${L.ru}</b><span>${L.desc}</span>${sim.best[k] ? `<span>Лучшая смена: ${sim.best[k]} баллов</span>` : ""}</button>`).join("")}</div>
      <div class="card"><div class="numrow"><label for="fp">Сырьё</label><select class="sel" id="fp">${PLANTS.filter((p) => METHODS[p.prep] && p.id !== "guelder").sort((a, b) => a.ru.localeCompare(b.ru, "ru")).map((p) => `<option value="${p.id}">${p.drug.ru} (${p.drug.lat})</option>`).join("")}${BLENDS.map((b) => `<option value="blend:${b.id}">Сбор: ${b.ru}</option>`).join("")}</select><button class="btn" id="fgo" type="button">Приготовить</button></div>
        <div class="btn-row"><a class="btn ghost small" href="#/sim/shift/${lvl}">${ICON("rx")} Смена на этом уровне</a><a class="btn ghost small" href="#/sim/exam/final">${ICON("cap")} Зачёт</a></div></div>
      ${C.simx ? `<div class="card"><h4 style="margin-top:0">Другие задания</h4><p class="hint">Приёмка сырья по фото, контрольная лаборатория с качественными реакциями и консультации посетителей. Каждое задание есть в двух вариантах сложности.</p>
        <div class="btn-row"><a class="btn ghost small" href="#/sim/photo/1">Приёмка сырья</a><a class="btn ghost small" href="#/sim/photo/2">Приёмка: латынь</a>${(window.SIMX?.tests || []).length ? `<a class="btn ghost small" href="#/sim/lab/1">Лаборатория</a><a class="btn ghost small" href="#/sim/lab/2">Лаборатория: мало реактивов</a>` : ""}${(window.SIMX?.cases || []).length ? `<a class="btn ghost small" href="#/sim/case/1">Консультации</a><a class="btn ghost small" href="#/sim/case/2">Трудные консультации</a>` : ""}</div></div>` : ""}`;
    C.course?.bindHub();
    C.flash?.bindHub();
    $("[data-simlat]")?.addEventListener("click", () => latToggle(hub));
    $("#lv").addEventListener("click", (e) => { const b = e.target.closest("[data-l]"); if (!b) return; sim.level = b.dataset.l; save(); hub(); });
    $("#fgo").addEventListener("click", () => (location.hash = "#/sim/free/" + $("#fp").value));
  };
  const back = `<a class="back" href="#/sim">${ICON("back")} Симулятор</a>`;

  function lesson(id) {
    const l = LESSONS.find((x) => x.id === id); if (!l) return hub();
    const num0 = C.course?.numOf("l:" + l.id);
    const keyHtml = l.key.map((k) => `<li>${k.t} ${cite(k.s)}${k.derived ? ` <span class="muted lbl">вывод из правил</span>` : ""}</li>`).join("");
    app.innerHTML = `${back}${num0 ? `<p class="kicker">Шаг пути ${num0} из ${C.course.course().length} · практика</p>` : ""}<h1>${l.ru}</h1><p class="lead">${l.sub}</p>
      <div class="card lesson-th">
        <h3 style="margin-top:0">Главное</h3><ul class="key-list">${keyHtml}</ul>
        <h3>Из учебника</h3>${items(l.theory())}
        <h3>Разбор примера</h3><p class="prose">${l.example()}</p>
        <div class="check-note"><b>Проверка.</b> Теория на время проверки скрывается. Сначала шесть вопросов на другом сырье: правило нужно применить, ответа в тексте нет. Затем одна пропись целиком на случайном сырье, уровень «${LEVELS[l.final.level].ru}» (без подсказок). Урок засчитывается при 5 верных ответах из 6 и безошибочной прописи.</div>
        <div class="btn-row"><button class="btn" id="prac" type="button">${ICON("flask")} Начать проверку</button>${C.flash?.setFor(l.id) ? `<a class="btn ghost" href="#/sim/cards/${l.id}">Карточки по уроку</a>` : ""}</div>
      </div>${C.course ? C.course.pracExtras(l.id) : ""}`;
    $("#prac").addEventListener("click", () => quiz(l));
  }

  function quiz(l) {
    const qs = l.quiz().filter(Boolean).slice(0, 6);
    let k = 0, right = 0, skipped = 0;
    const head = () => `${back}<p class="kicker">Проверка · ${esc(l.ru)} · вопрос ${k + 1} из ${qs.length}</p>`;
    const ask = () => {
      if (k >= qs.length) return finalTask(l, right, qs.length - skipped);
      const q = qs[k];
      app.innerHTML = `${head()}<div class="sim"><div class="card"><div class="score-line"><span>Вопрос <b>${k + 1} из ${qs.length}</b></span><span>Верно: <b>${right}</b></span><span>Затем: пропись целиком</span></div></div>
        <div class="card stage"><h2>${q.q}</h2>${q.kind === "opts"
          ? `<div class="opts" id="qo">${q.opts.map(([t, ok], i) => `<button class="opt" type="button" data-ok="${ok}"><span class="k">${"АБВГ"[i]}</span>${esc(t)}</button>`).join("")}</div>`
          : `<form class="numrow" id="qn"><input id="qv" inputmode="decimal" autocomplete="off" placeholder="0" aria-label="Ответ"><span class="muted">${q.unit}</span><button class="btn" type="submit">Проверить</button></form>`}
        <div id="qfb"></div><div class="btn-row sim-skip"><button class="btn ghost small" id="qskip" type="button">Пропустить вопрос</button><span class="hint">Без штрафа: вопрос не идёт в счёт.</span></div></div></div>
        <div class="sim-lat-row">${latBtn()}</div>`;
      $("[data-simlat]")?.addEventListener("click", () => latToggle(ask));
      $("#qskip").addEventListener("click", () => {
        const b = $("#qskip");
        if (!b.classList.contains("sure")) { b.classList.add("sure"); b.textContent = "Точно пропустить?"; return; }
        skipped++; $(".sim-skip")?.remove();
        $$("#qo .opt").forEach((x) => { x.disabled = true; if (x.dataset.ok === "true") x.classList.add("right"); });
        if ($("#qv")) { $("#qv").disabled = true; $("#qn button").disabled = true; }
        $("#qfb").innerHTML = `<div class="feedback"><b>Вопрос пропущен.</b> ${q.kind === "opts" ? "" : `Правильно: ${String(q.ans).replace(".", ",")} ${q.unit}. `}${q.ex} ${cite(q.s)}<div class="btn-row"><button class="btn" id="qnext" type="button">${k + 1 < qs.length ? "Следующий вопрос" : "К прописи"}</button></div></div>`;
        $("#qnext").addEventListener("click", () => { k++; ask(); }); $("#qnext").focus();
      });
      const fb = (ok, extra = "") => {
        $(".sim-skip")?.remove();
        if (ok) right++;
        MUSIC.sfx(ok ? "plop" : "bad");
        $("#qfb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : "Неверно."}</b> ${extra}${q.ex} ${cite(q.s)}<div class="btn-row"><button class="btn" id="qnext" type="button">${k + 1 < qs.length ? "Следующий вопрос" : "К прописи"}</button></div></div>`;
        $("#qnext").addEventListener("click", () => { k++; ask(); }); $("#qnext").focus();
      };
      if (q.kind === "opts") $("#qo").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || b.disabled) return;
        const ok = b.dataset.ok === "true";
        $$("#qo .opt").forEach((x) => { x.disabled = true; if (x.dataset.ok === "true") x.classList.add("right"); }); if (!ok) b.classList.add("wrong");
        fb(ok);
      });
      else { $("#qv").focus(); $("#qn").addEventListener("submit", (e) => {
        e.preventDefault(); if ($("#qv").disabled) return;
        const v = parseFloat($("#qv").value.replace(",", ".")); if (isNaN(v)) return toast("Введите число.");
        $("#qv").disabled = true; $("#qn button").disabled = true;
        const ok = Math.abs(v - q.ans) <= Math.max(0.05, Math.abs(q.ans) * 0.01);
        fb(ok, ok ? "" : `Правильно: ${String(q.ans).replace(".", ",")} ${q.unit}. `);
      }); }
    };
    ask();
  }

  function finalTask(l, qRight, qTotal) {
    const f = l.final;
    const t = f.blend ? makeTask({ blend: shuffle(BLENDS)[0].id, level: f.level }) : makeTask({ plant: shuffle(f.pool())[0].id, level: f.level });
    runTask(t, { header: `${back}<p class="kicker">Проверка · ${esc(l.ru)} · пропись целиком · вопросы: ${qRight} из ${qTotal}</p>`, onDone: (r) => {
      const qOk = qRight >= qTotal - 1, tOk = r.right === r.total && r.right > 0, pass = qOk && tOk;
      if (pass && !sim.lessons.includes(l.id)) { sim.lessons.push(l.id); save(); }
      const nx = C.course?.next("l:" + l.id);
      app.innerHTML = `${back}<div class="card"><p class="verdict">${pass ? "Урок пройден" : "Урок не засчитан"}</p>
          <p>Вопросы: <b>${qRight} из ${qTotal}</b> ${qOk ? "(достаточно)" : "(нужно не меньше " + (qTotal - 1) + ")"}. Пропись: <b>${r.right} из ${r.total}</b> этапов ${tOk ? "без ошибок" : "с ошибками"}.</p></div>
        ${r.html}<div class="btn-row">${pass ? `<span class="done-mark">урок пройден</span>` : `<a class="btn ghost" href="#/sim/lesson/${l.id}?r=${Date.now()}">Перечитать теорию и пройти снова</a>`}${nx ? `<a class="btn" href="${nx.href}">Следующий урок: ${esc(nx.title)}</a>` : `<a class="btn" href="#/sim">К симулятору</a>`}</div>`;
    } });
  }

  function shift(lv) {
    const level = LEVELS[lv] ? lv : sim.level, L = LEVELS[level];
    const orders = [];
    const pool = shuffle(PLANTS.filter((p) => METHODS[p.prep] && p.id !== "guelder"));
    for (let k = 0; k < 5; k++) {
      if (level !== "student" && k % 2 === 1) orders.push({ type: "request" });
      else if (level === "provisor" && k === 4) orders.push({ type: "blend", blend: shuffle(BLENDS)[0].id });
      else orders.push({ type: "rx", plant: pool[k].id });
    }
    let n = 0, total = 0;
    const results = [];
    const head = () => `${back}<p class="kicker">Рабочая смена · ${L.ru} · заказ ${n + 1} из ${orders.length} · баллы ${total}</p>`;
    const nextOrder = () => {
      if (n >= orders.length) return end();
      const o = orders[n];
      if (o.type === "request") return request(o);
      runTask(makeTask({ plant: o.plant, blend: o.blend, level, order: `${n + 1}/${orders.length}` }), { header: head(), onDone: done });
    };
    const done = (r) => {
      total += r.score; results.push(r);
      app.innerHTML = `${head()}${r.html}<div class="btn-row"><button class="btn" id="nx" type="button">${n + 1 < orders.length ? "Следующий заказ" : "Закрыть смену"}</button></div>`;
      $("#nx").addEventListener("click", () => { n++; nextOrder(); });
    };
    const request = () => {
      const q = makeRequest(level);
      app.innerHTML = `${head()}<div class="sim"><div class="card"><p class="verdict">Посетитель</p>
        <h2 style="margin-top:.1em">«Посоветуйте что-нибудь от состояния: ${esc(lc1(q.d.ru))}»</h2>
        <p class="meta-line">${esc(diseaseIndex[q.d.parent]?.ru || "")} ${icd(q.d.id)}</p>
        ${q.d.note ? `<p class="caution">${q.d.note}</p>` : ""}
        <p>Выберите сырьё, у которого это показание есть в монографии EMA или в учебнике.</p>
        <div class="opts" id="ro">${q.opts.map((p, k) => `<button class="opt" type="button" data-id="${p.id}"><span class="k">${"АБВГ"[k]}</span>${L.ruLabels ? `${p.drug.ru} <i class="muted">${p.drug.lat}</i>` : `<i>${p.drug.lat}</i>`}</button>`).join("")}</div><div id="rfb"></div></div></div>`;
      $("#ro").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || b.disabled) return;
        $$("#ro .opt").forEach((x) => (x.disabled = true));
        const p = byId[b.dataset.id];
        const u = p.uses.find((x) => x.c === q.d.id && x.ev !== "ethno");
        const ok = !!u; b.classList.add(ok ? "right" : "wrong");
        if (!ok) $$("#ro .opt").forEach((x) => { if (x.dataset.id === q.right.id) x.classList.add("right"); });
        const ru = q.right.uses.find((x) => x.c === q.d.id && x.ev !== "ethno");
        const sc = ok ? 15 : 0; total += sc; MUSIC.sfx(ok ? "good" : "bad");
        const chosen = ok ? p : q.right, cu = ok ? u : ru;
        $("#rfb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : `Неверно. Подходит: ${q.right.drug.ru.toLowerCase()}.`}</b>
          <p class="use ${cu.ev}"><span class="badge ${cu.ev}">${EV[cu.ev]}</span>${cu.t} ${cite(cu.s)}</p>
          ${chosen.cautions.slice(0, 2).map((c) => `<p class="caution">${c.t} ${cite(c.s)}</p>`).join("")}
          <div class="btn-row"><button class="btn" id="prep" type="button">Приготовить: ${esc(chosen.drug.ru.toLowerCase())}</button></div></div>`;
        $("#prep").addEventListener("click", () => runTask(makeTask({ plant: chosen.id, level, order: `${n + 1}/${orders.length}` }), { header: head(), onDone: done }));
      });
    };
    const end = () => {
      sim.shifts++; sim.best[level] = Math.max(sim.best[level] || 0, total);
      const clean = results.filter((r) => r.right === r.total).length, passed = clean >= Math.ceil(results.length * 0.6);
      if (passed) { sim.shiftPass = sim.shiftPass || {}; sim.shiftPass[level] = true; }
      save();
      app.innerHTML = `${back}<div class="card"><p class="verdict">Смена закрыта</p><h2 style="margin-top:.1em">Итог: ${total} баллов</h2>
        <div class="score-line"><span>Уровень: <b>${L.ru}</b></span><span>Лучший результат: <b>${sim.best[level]}</b></span><span>Рецептов без ошибок: <b>${results.filter((r) => r.right === r.total).length} из ${results.length}</b></span></div>
        <p>${passed ? "Смена засчитана в пути провизора." : "Чтобы смена засчиталась в пути, без ошибок нужно приготовить не меньше 60 % заказов."}</p>
        <div class="btn-row"><a class="btn" href="#/sim/shift/${level}?r=${Date.now()}">Новая смена</a>${passed && C.course?.next("s:" + level) ? `<a class="btn" href="${C.course.next("s:" + level).href}">Дальше по пути: ${esc(C.course.next("s:" + level).title)}</a>` : ""}<a class="btn ghost" href="#/sim">К пути провизора</a></div></div>`;
    };
    nextOrder();
  }


  // ---------- Зачёт по фармакогнозии ----------
  function exam(kind) {
    kind = kind === "mid" ? "mid" : "final";
    const pool = PLANTS.slice();
    const pick = (arr, n, not) => shuffle(arr.filter((x) => !not.includes(x))).slice(0, n);
    const allTags = [...new Set(PLANTS.flatMap(C.tagsOf))];
    const GEN = [
      // Вопросы из курса химии и брутто-формулы молекул (js/chemcourse.js)
      () => { const Q = (C.course?.lessons || []).flatMap((l) => l.quiz || []); if (!Q.length) return null; const q = shuffle(Q)[0];
        return { q: esc(q.q), opts: shuffle(q.options.map((t, i) => [t, i === q.a])), ex: esc(q.why?.t || ""), s: q.why?.s || [] }; },
      () => { const M = (C.course?.compounds || []).filter((c) => c.formula && c.cid); if (M.length < 4) return null; const m = shuffle(M)[0]; const o = pick([...new Map(M.filter((x) => x.formula !== m.formula).map((x) => [x.formula, x])).values()], 3, []);
        return { q: `Какая брутто-формула у вещества «${esc(m.ru)}»?`, opts: shuffle([[m.formula, true], ...o.map((x) => [x.formula, false])]), ex: `${esc(m.ru)}: ${m.formula}, молярная масса ${m.mw} г/моль.`, s: [{ id: "pubchem", loc: "CID " + m.cid }] }; },
      () => { const p = shuffle(pool.filter((x) => x.drug.lat))[0]; const o = pick(pool, 3, [p]); return { q: `Какое растение даёт сырьё <i>${p.drug.lat}</i>?`, opts: shuffle([[p.ru + ` (${p.lat})`, true], ...o.map((x) => [x.ru + ` (${x.lat})`, false])]), ex: `${p.drug.lat} — ${p.drug.ru.toLowerCase()}, растение ${p.ru} (${p.lat}).`, s: [{ id: "ema", loc: p.drug.lat, search: p.drug.lat }] }; },
      () => { const p = shuffle(pool.filter((x) => C.tagsOf(x).length))[0]; const t = shuffle(C.tagsOf(p))[0]; const o = pick(allTags, 3, C.tagsOf(p)); return { q: `Какой класс веществ характерен для сырья «${p.drug.ru}»?`, opts: shuffle([[t, true], ...o.map((x) => [x, false])]), ex: `${p.drug.ru}: ${p.compounds}`, s: [{ id: "karpuk", loc: window.TEXTS?.plants?.[p.id]?.page || "" }] }; },
      () => { const ds = Object.values(diseaseIndex).filter((d) => !d.children && PLANTS.some((p) => p.uses.some((u) => u.c === d.id && u.ev === "ema"))); const d = shuffle(ds)[0];
        const good = shuffle(PLANTS.filter((p) => p.uses.some((u) => u.c === d.id && u.ev === "ema")))[0]; const bad = pick(PLANTS.filter((p) => !p.uses.some((u) => u.c === d.id || u.c === d.parent || diseaseIndex[u.c]?.parent === d.id)), 3, []);
        const u = good.uses.find((x) => x.c === d.id && x.ev === "ema");
        return { q: `У какого сырья есть показание по монографии EMA: «${lc1(d.ru)}»?`, opts: shuffle([[good.drug.ru, true], ...bad.map((x) => [x.drug.ru, false])]), ex: `${good.drug.ru}: ${u.t}`, s: u.s }; },
      () => { const p = shuffle(pool.filter((x) => METHODS[x.prep] && x.id !== "guelder"))[0]; const m = METHODS[p.prep]; const K4 = ["Настой (Infusum)", "Отвар (Decoctum)", "Слизь (Mucilago)", "Настойка на спирте (Tinctura)"];
        const right = K4.find((x) => x.startsWith(kindOf(p)));
        return { q: `Как готовят водное извлечение из сырья «${p.drug.ru}»?`, opts: shuffle(K4.map((x) => [x, x === right])), ex: `${m.ru} (${m.lat}). ${m.why}`, s: m.src }; },
      () => { const stem = (w) => w.toLowerCase().split(/[\s-]+/).filter((x) => x.length > 3).map((x) => x.slice(0, Math.max(4, x.length - 3)));
        const names = (x) => [...stem(x.ru), ...stem(x.drug.ru).filter((w) => !/^(лист|цвет|трав|корн|кора|плод|семе|почк)/.test(w))];
        // предостережения, в тексте которых названо само растение, дают ответ; такие не берём
        const fair = (x) => x.cautions.length && !/Гибрид|сырью могут/.test(x.cautions[0].t) && !names(x).some((w) => x.cautions[0].t.toLowerCase().includes(w));
        const p = shuffle(pool.filter(fair))[0]; const c = p.cautions[0];
        const others = shuffle(pool.filter((x) => x.id !== p.id && x.cautions.length)).slice(0, 3);
        return { q: `К какому сырью относится предостережение: «${c.t}»`, opts: shuffle([[p.drug.ru, true], ...others.map((x) => [x.drug.ru, false])]), ex: `${p.drug.ru}: ${c.t}`, s: c.s }; },
      () => { const cl = shuffle((window.MECH?.classes || []).filter((x) => x.mech?.length && (x.plants || []).length))[0]; if (!cl) return null; const pid = shuffle(cl.plants.filter((id) => byId[id]))[0];
        const tagRu = cl.ru.toLowerCase(), hasTag = (p) => C.tagsOf(p).some((t) => tagRu.includes(t.toLowerCase().slice(0, 6)) || t.toLowerCase().includes(tagRu.slice(0, 6)));
        const bad = pick(PLANTS.filter((p) => !(cl.plants || []).includes(p.id) && !hasTag(p) && !(p.compounds || "").toLowerCase().includes(tagRu.slice(0, 6))), 3, []);
        return { q: `В каком сырье ведущую роль играет класс веществ «${cl.ru.toLowerCase()}»?`, opts: shuffle([[byId[pid].drug.ru, true], ...bad.map((x) => [x.drug.ru, false])]), ex: cl.mech[0].t, s: cl.mech[0].s }; },
    ];
    // Промежуточный зачёт: только сырьё, показания, способы, предостережения (без курса химии и формул)
    const GENS = kind === "mid" ? GEN.slice(2) : GEN;
    const N = 10; let k = 0, right = 0;
    const ask = () => {
      if (k >= N) {
        sim.exam = Math.max(sim.exam || 0, right);
        if (kind === "mid") sim.examMid = Math.max(sim.examMid || 0, right); else sim.examFinal = Math.max(sim.examFinal || 0, right);
        save(); MUSIC.sfx(right >= 8 ? "good" : "bad");
        app.innerHTML = `${back}<div class="card"><p class="verdict">Зачёт</p><h2 style="margin-top:.1em">${right} из ${N}</h2><p>${right >= 8 ? "Зачтено." : "Не зачтено: нужно 8 верных ответов из 10."} Лучший результат: ${kind === "mid" ? sim.examMid : sim.examFinal}.</p>
          <div class="btn-row"><a class="btn" href="#/sim/exam/${kind}?r=${Date.now()}">Ещё раз</a>${right >= 8 && C.course?.next("e:" + kind) ? `<a class="btn" href="${C.course.next("e:" + kind).href}">Дальше по пути</a>` : ""}<a class="btn ghost" href="#/sim">К симулятору</a></div></div>`;
        return;
      }
      let qq = null; while (!qq) qq = GENS[Math.floor(Math.random() * GENS.length)]();
      app.innerHTML = `${back}<div class="sim"><div class="card"><div class="score-line"><span>Вопрос <b>${k + 1} из ${N}</b></span><span>Верно: <b>${right}</b></span></div></div>
        <div class="card stage"><h2>${qq.q}</h2><div class="opts" id="eo">${qq.opts.map(([t, ok], i) => `<button class="opt" type="button" data-ok="${ok}"><span class="k">${"АБВГ"[i]}</span>${esc(t)}</button>`).join("")}</div><div id="efb"></div></div></div>`;
      $("#eo").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || b.disabled) return;
        const ok = b.dataset.ok === "true"; if (ok) right++;
        $$("#eo .opt").forEach((x) => { x.disabled = true; if (x.dataset.ok === "true") x.classList.add("right"); }); if (!ok) b.classList.add("wrong");
        MUSIC.sfx(ok ? "plop" : "bad");
        $("#efb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : "Неверно."}</b> ${qq.ex} ${cite(qq.s)}<div class="btn-row"><button class="btn" id="en" type="button">${k + 1 < N ? "Следующий вопрос" : "Итог"}</button></div></div>`;
        $("#en").addEventListener("click", () => { k++; ask(); });
      });
    };
    ask();
  }

  C.page("sim", function simPage(mode, arg) {
    simLatApply();
    if (mode && mode.includes("?")) mode = mode.split("?")[0];
    if (arg && arg.includes("?")) arg = arg.split("?")[0];
    if (mode === "lesson") return lesson(arg);
    if (mode === "chem" && C.course) return C.course.lesson(arg);
    if (mode === "shift") return shift(arg);
    if (mode === "exam") return exam(arg);
    if (C.simx && ["photo", "lab", "case", "cards"].includes(mode) && C.simx[mode]) return C.simx[mode](arg);
    if (mode === "free" && arg) {
      const t = arg.startsWith("blend:") ? makeTask({ blend: arg.slice(6), level: sim.level }) : byId[arg] && METHODS[byId[arg].prep] ? makeTask({ plant: arg, level: sim.level }) : null;
      if (t) return runTask(t, { header: back });
    }
    hub();
  });
})();
