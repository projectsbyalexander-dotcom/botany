/* Котелок (свободная игра) и открытая книга рецептов. */
(function () {
  const C = window.CORE;
  // строчная только первая буква: аббревиатуры (ОРВИ) остаются прописными
  const lc1 = (x) => (x ? x.charAt(0).toLowerCase() + x.slice(1) : "");
  const { $, $$, app, esc, D, byId, store, toast, diseaseIndex, diseasePath, descendants, cite, inCountries, countryChips, bindChips, tagsOf, tagPill, EV, PARTS, partsOf, latName } = C;
  const { METHODS, BLENDS, STORAGE, DISEASES, PLANTS } = D;
  const { legacyMark } = C;
  const GROUP = { infusion: "inf", valerian: "inf", seed_infusion: "inf", decoction: "dec", leaf_decoction: "dec", mucilage: "muc" };
  const POT_METHODS = [
    { id: "inf", ru: "Настой", lat: "Infusum", desc: "водяная баня 15 мин, охладить 45 мин", time: "60 мин", water: true },
    { id: "dec", ru: "Отвар", lat: "Decoctum", desc: "водяная баня 30 мин, охладить 10 мин", time: "40 мин", water: true },
    { id: "muc", ru: "Слизь (набухание)", lat: "Mucilago", desc: "без нагревания: семена заливают водой комнатной температуры и выдерживают до полного набухания, пока слизь из клеток кожуры не перейдёт в воду", time: "до набухания", water: true },
    { id: "mix", ru: "Сбор (смешение)", lat: "Species", desc: "сырьё нарезают, толкут и смешивают без воды; сбор заваривают позже", time: "сразу", old: true },
    { id: "mac", ru: "Мацерация (настаивание)", lat: "Maceratio", desc: "сырьё выдерживают несколько дней без нагревания в вине, спирте или уксусе, затем процеживают", time: "дни", old: true },
    { id: "ung", ru: "Мазь", lat: "Unguentum", desc: "растереть с жировой основой и наносить наружно", time: "сразу", old: true },
  ];
  const SLOTS = 8;
  // Необычные ингредиенты старинных рецептов и разметка этих рецептов (js/potextra.js)
  const PX = window.POTX || { extras: [], legacy: {} };
  const EX = Object.fromEntries(PX.extras.map((x) => [x.id, x]));
  const XGROUPS = { liquid: "Жидкости и основы", animal: "Животного происхождения", food: "Пища", herb: "Европейские травы вне справочника", import: "Привозное сырьё старых аптек", mineral: "Соли и минералы", vessel: "Посуда" };
  // Что выйдет из ингредиентов «Другого» (js/potfun.js)
  const PF = window.POTFUN;
  if (PF) for (const [k, v] of Object.entries(PF.sources)) if (!D.SOURCES[k]) D.SOURCES[k] = v;
  const funSrc = (e) => (Array.isArray(e.s) ? e.s : e.s?.note ? EX[e.s.note]?.note?.[e.s.i]?.s : null);
  const funHtml = (f, bare) => f.items.map((e) => `<div class="fun-box">${bare ? "" : `<b>${e.t}</b>`}<p>${e.d} ${cite(funSrc(e))}</p></div>`).join("");
  const ING = (id) => byId[id] || EX[id];
  const ingName = (id) => ING(id)?.ru || id;
  const XICON = { vessel: "mortar", liquid: "flask", animal: "scroll", mineral: "scale", food: "jar", import: "jar", herb: "leaf" };
  const artOf = (id) => byId[id] ? ART.draw(byId[id]) : PAGE_OF[id] ? ART.draw(PAGE_OF[id]) : window.XART?.has(id) ? XART.draw(id, EX[id]?.ru || "") : `<span class="x-art g-${EX[id]?.group}">${ICON(XICON[EX[id]?.group] || "jar", "ico")}</span>`;
  const ps = { book: store.get("potBook2", {}), method: "inf", grind: true, slots: Array(SLOTS).fill(null) };
  const officialConds = (p) => {
    const s = new Set();
    p.uses.filter((u) => u.ev !== "ethno").forEach((u) => diseasePath(u.c).forEach((n) => s.add(n.id)));
    return s;
  };
  const blendOf = (chosen) => BLENDS.find((b) => b.items.length === chosen.length && b.items.every((id) => chosen.includes(id)));
  const legacyAll = () => [...(window.LEGACY?.mixtures || []), ...(window.LEGACY?.remedies || [])].filter((m) => PX.legacy[m.id]?.ok);
  function legacyMatch(chosen) {
    const set = new Set(chosen);
    const exacts = [], near = [];
    for (const m of legacyAll()) {
      const ids = PX.legacy[m.id].ing;
      const overlap = ids.filter((x) => set.has(x)).length;
      if (overlap === ids.length && ids.length === set.size) { exacts.push(m); continue; }
      if (overlap >= 2 && chosen.every((x) => ids.includes(x))) near.push(m);
    }
    // один состав бывает в нескольких фармакопеях: показываем ещё не сваренный, остальные называем как «тот же состав»
    exacts.sort((a, b) => !!ps.book["legacy:" + a.id] - !!ps.book["legacy:" + b.id]);
    return { exact: exacts[0] || null, same: exacts.slice(1), near: near.slice(0, 3) };
  }
  // «Вы были близки»: состав отличается от известного рецепта на один ингредиент. Подсказка косвенная:
  // класс веществ или вид сырья недостающего компонента, но не его название.
  const PART_RU = { flower: "цветки", leaf: "листья", herb: "трава", root: "корни или корневища", bark: "кора", berry: "плоды", seed: "семена" };
  function nearMiss(chosen) {
    const set = new Set(chosen);
    const targets = [...BLENDS.map((b) => ({ ing: b.items, label: "к сбору из учебника", key: "blend:" + b.id })),
      ...legacyAll().map((m) => ({ ing: PX.legacy[m.id].ing, label: `к старинному рецепту (${legacyMeta(m)})`, key: "legacy:" + m.id, legacy: true }))];
    let best = null;
    for (const t of targets) {
      if (t.ing.length < 2) continue;
      const miss = t.ing.filter((x) => !set.has(x)), extra = chosen.filter((x) => !t.ing.includes(x));
      const d = miss.length + extra.length, overlap = t.ing.length - miss.length;
      // допустимо: не хватает одного, лишний один, или одна замена (только в рецептах из трёх и более компонентов)
      if (d === 0 || d > 2 || overlap < 1 || (d === 2 && !(miss.length === 1 && extra.length === 1 && t.ing.length >= 3))) continue;
      if (!best || d < best.d || (d === best.d && !t.legacy && best.legacy)) best = { ...t, miss, extra, d };
    }
    if (!best) return "";
    const clue = (id) => {
      if (byId[id]) { const p = byId[id]; const have = new Set(chosen.filter((x) => byId[x]).flatMap((x) => tagsOf(byId[x]))); const tg = tagsOf(p).filter((t) => !have.has(t)); return `сырьё, в котором ${tg.length ? `много веществ класса «${tg[0]}»` : `ведущие вещества: ${tagsOf(p).slice(0, 2).join(", ") || "другие"}`}; это ${PART_RU[p.part] || "растительное сырьё"}`; }
      const x = EX[id]; return x ? `ингредиент из группы «${XGROUPS[x.group]}»` : "ещё один ингредиент";
    };
    const parts = [];
    if (best.miss.length) parts.push(`Не хватает одного компонента: попробуйте добавить ${clue(best.miss[0])}.`);
    if (best.extra.length) parts.push(`Один компонент лишний${byId[best.extra[0]] ? `: это ${PART_RU[byId[best.extra[0]].part] || "сырьё"}` : EX[best.extra[0]] ? `: он из группы «${XGROUPS[EX[best.extra[0]].group]}»` : ""}.`);
    return `<div class="near-box">${best.legacy ? legacyMark(true) : ""}<b>Вы были близки ${best.label}.</b> ${parts.join(" ")} ${answerBtn(best.key)}</div>`;
  }
  // «Показать ответ»: кладёт в котелок верный состав и подсвечивает нужную обработку (обработчик в potPage)
  const answerBtn = (key) => `<button class="btn small ghost cp-answer" type="button" data-answer="${key}">Показать ответ</button>`;
  const legacyMethod = (m) => PX.legacy[m.id]?.method || "water";
  const methodOk = (m, method) => (legacyMethod(m) === "water" ? ["inf", "dec", "mix"].includes(method) : legacyMethod(m) === method);
  const methodName = (m) => legacyMethod(m) === "water" ? "смешать как сбор (Species) и заваривать настоем или отваром" : (() => { const x = POT_METHODS.find((y) => y.id === legacyMethod(m)); return `«${x.ru}» (${x.lat}): ${x.desc}`; })();
  // Необычный ингредиент, у которого есть своя страница растения
  const PAGE_OF = Object.fromEntries(PLANTS.filter((p) => p.potx).map((p) => [p.potx, p]));
  const extraNote = (x) => `<p class="use"><span class="badge hist">${XGROUPS[x.group] || ""}</span><b>${x.ru}</b> <i>(${x.lat})</i>${x.note?.length ? ": " + x.note.map((n) => `${esc(n.t)} ${cite(n.s)}`).join(" ") : "."}${PAGE_OF[x.id] ? ` <a href="#/plant/${PAGE_OF[x.id].id}">Страница растения</a>` : ""}</p>`;
  const legacyTitle = (m) => `${esc(m.ru)}${m.lat || m.orig ? ` <i class="muted">${esc(m.lat || m.orig)}</i>` : ""}`;
  const legacyMeta = (m) => esc([m.edition || m.period || m.date, m.region || m.where || m.place].filter(Boolean).join(", "));

  // трава справочника: своя или «Другое» с собственной страницей растения (id котелка вроде x_icemoss)
  const herbOf = (id) => byId[id] || (PAGE_OF[id]?.uses ? PAGE_OF[id] : null);
  function cook(chosen) {
    const r = cookBase(chosen);
    if (r.legacy || !PF) return r;
    const f = PF.result(chosen, ps.method, (id) => EX[id]?.group, !chosen.some(herbOf));
    if (!f.items.length) return r;
    if (!chosen.some(herbOf)) {
      // в котелке только «Другое»: показываем, что получилось на самом деле
      return { ...r, kind: "odd", title: f.items.length === 1 ? f.items[0].t : "Что получилось в котелке", cond: null, key: null, body: funHtml(f, f.items.length === 1) + r.body };
    }
    return { ...r, body: r.body + `<h4>Что ещё происходит в котелке</h4>` + funHtml(f) };
  }
  function cookBase(chosen) {
    const herbs = chosen.map(herbOf).filter(Boolean);
    const extras = chosen.filter((id) => EX[id] && !herbOf(id)).map((id) => EX[id]);
    const method = POT_METHODS.find((m) => m.id === ps.method);
    const blend = extras.length ? null : blendOf(chosen);
    const leg = legacyMatch(chosen);
    // Общее официальное показание (самое узкое) у трав справочника
    let cond = null, sys = null;
    if (herbs.length) {
      let common = officialConds(herbs[0]);
      herbs.slice(1).forEach((p) => { const s = officialConds(p); common = new Set([...common].filter((x) => s.has(x))); });
      sys = DISEASES.find((d) => common.has(d.id));
      DISEASES.forEach((d) => common.delete(d.id));
      cond = [...common].sort((a, b) => diseasePath(b).length - diseasePath(a).length)[0];
    }
    const wrongMethod = method.water ? herbs.filter((p) => p.prep && GROUP[p.prep] !== method.id) : [];
    const needGrind = herbs.some((p) => p.prep !== "mucilage" && !(chosen.length > 1 && ["flower", "berry", "seed"].includes(p.part)));
    const grindBad = !ps.grind && needGrind && method.id !== "mac";

    const whyHerb = (p) => {
      const u = p.uses.find((x) => x.ev !== "ethno" && cond && diseasePath(x.c).some((n) => n.id === cond));
      if (u) return `<p class="use ${u.ev}"><span class="badge ${u.ev}">${EV[u.ev]}</span>${C.nm(p.ru, p.drug.lat, { b: true })}: ${u.t} ${cite(u.s)}</p>`;
      const list = p.uses.filter((x) => x.ev !== "ethno");
      return `<p class="use">${C.nm(p.ru, p.drug.lat, { b: true })}: официально применяют при состояниях «${[...new Set(list.map((x) => lc1(diseaseIndex[x.c].ru)))].join("», «")}». ${cite(list[0]?.s)}</p>`;
    };
    const whyMethod = (p) => { const m = METHODS[p.prep]; return `<p class="use text"><b>${p.drug.ru}</b> готовят как «${m.ru}» (<i>${m.lat}</i>). ${m.why} ${cite(m.src)}</p>`; };
    const tags = {}; herbs.forEach((p) => tagsOf(p).forEach((t) => (tags[t] = (tags[t] || 0) + 1)));
    const mechLine = Object.keys(tags).length ? `<p class="hint">Ведущие вещества смеси: ${Object.entries(tags).sort((a, b) => b[1] - a[1]).map(([t, n]) => tagL(t, n)).join(" ")}</p>` : "";
    const extrasHtml = extras.length ? `<h4>Другие ингредиенты</h4>${extras.map(extraNote).join("")}` : "";
    const legacyHtml = () => {
      let h = "";
      if (leg.exact) h += `<div class="ok-box">${legacyMark()} <b>Вы повторили старинный рецепт:</b> ${legacyTitle(leg.exact)} <span class="meta-line">${legacyMeta(leg.exact)}</span>.${leg.same.length ? ` Тот же состав: ${leg.same.map((m) => `<a href="#/heritage/${m.id}">${esc(m.ru)}</a> <span class="meta-line">${legacyMeta(m)}</span>`).join("; ")}.` : ""} ${cite(leg.exact.s || leg.exact.text?.[0]?.s)} <a href="#/heritage/${leg.exact.id}">Открыть в «Наследии»</a></div>`;
      if (leg.near.length) h += `<p class="hint">${legacyMark(true)} Похожие старинные составы: ${leg.near.map((m) => `<a href="#/heritage/${m.id}">${esc(m.ru)}</a>`).join(", ")}.</p>`;
      return h;
    };
    const cautions = herbs.flatMap((p) => p.cautions.map((c) => `<p class="caution"><b>${p.ru}:</b> ${c.t} ${cite(c.s)}</p>`)).join("");
    const lat = `${method.lat} ${chosen.map((id) => byId[id] ? byId[id].drug.lat : EX[id].lat).join(" + ")}`;

    if (leg.exact) {
      const m = leg.exact, ok = methodOk(m, method.id);
      const modern = m.modern?.length ? `<h4>Что показали исследования</h4>${C.items(m.modern)}` : "";
      return { kind: !ok || grindBad ? "weak" : "known", legacy: true, title: m.ru, lat, cond: null, key: "legacy:" + m.id, keys: [m, ...leg.same].map((x) => "legacy:" + x.id),
        body: `${legacyHtml()}${ok ? "" : `<p class="caution">Состав верный, но готовили иначе. По источнику нужно ${methodName(m)}. ${answerBtn("legacy:" + m.id)}</p>`}${m.use && m.use.length > 30 ? `<p>${esc(m.use)}</p>` : ""}${modern}${herbs.map(whyHerb).join("")}${extrasHtml}${mechLine}${cautions}` };
    }
    const near = blend ? "" : nearMiss(chosen);
    const noPrep = herbs.filter((p) => !METHODS[p.prep]);
    if (noPrep.length && method.water) return { kind: "goop", title: "Способ в источниках не указан", lat, cond: null,
      body: `${near}<p>Для этого сырья в справочнике нет источника о способе приготовления водного извлечения: ${noPrep.map((p) => `<a href="#/plant/${p.id}">${esc(p.drug.ru.toLowerCase())}</a>`).join(", ")}. Поэтому котелок не может проверить обработку и обосновать средство.</p>${legacyHtml()}${cautions}` };
    if (wrongMethod.length) return { kind: "spoiled", title: "Неверная обработка", cond, body: `${near}<p>Это сырьё так не готовят:</p>${wrongMethod.map(whyMethod).join("")}${legacyHtml()}` };
    if (blend && (method.water || method.id === "mix")) {
      return { kind: grindBad ? "weak" : "known", title: blend.ru, lat, cond, key: "blend:" + blend.id,
        body: `<div class="ok-box"><b>Вы повторили сбор из учебника.</b> ${blend.why} ${cite(blend.src)}</div>${method.id === "mix" ? `<p class="hint">Сбор смешан; заваривают его по самому плотному компоненту. ${cite([{ id: "karpuk", loc: "с. 71" }])}</p>` : ""}${herbs.map(whyHerb).join("")}${mechLine}${legacyHtml()}${cautions}` };
    }
    if (method.old) {
      return { kind: "goop", title: `${method.ru}: рецепт неизвестен`, lat, cond: null,
        body: `${near}<p>«${method.ru}» (<i>${method.lat}</i>) ${method.desc}. Такую форму готовили в старых аптеках, но ни один записанный рецепт из «Наследия» не совпадает с этим составом, а современные источники её не обосновывают.</p>${herbs.map(whyHerb).join("")}${extrasHtml}${mechLine}${legacyHtml()}${cautions}` };
    }
    if (!cond) {
      const why = !herbs.length ? "В котелке нет ни одной травы справочника, поэтому обосновать смесь по монографиям EMA и учебнику нельзя." : `У этих видов сырья нет общего показания ни в монографиях EMA, ни в учебнике${sys ? `, их объединяет только система органов «${sys.ru.toLowerCase()}»` : ""}. Такую смесь трудно обосновать: каждое растение лучше применять по своему показанию.`;
      return { kind: "goop", title: "Смесь без общего показания", cond: null, lat,
        body: `${near}<p>${why}</p>${herbs.map(whyHerb).join("")}${extrasHtml}${mechLine}${legacyHtml()}${cautions}` };
    }
    let body = `<p>По источникам эту смесь можно обосновать при состоянии <a href="#/diseases/${cond}"><b>${lc1(diseaseIndex[cond].ru)}</b></a>${latName(cond)}: так или иначе это показание есть у каждой травы справочника в составе.</p>` + herbs.map(whyHerb).join("") + extrasHtml + mechLine;
    if (extras.length) body = `<p class="hint">Ингредиенты с полки «Другое» в обоснование не входят: для них нет монографий EMA и статей учебника о применении в смеси.</p>` + body;
    if (grindBad) body = `<p class="caution">Сырьё не измельчили, и вещества извлеклись хуже. Листья и цветки измельчают примерно до 5 мм, корни и кору до 3 мм, плоды и семена до 0,5 мм; в сборах цветки и плоды не измельчают. ${cite([{ id: "karpuk", loc: "с. 67, 71" }])}</p>` + body;
    body = near + body + legacyHtml() + cautions + `<p class="hint">${STORAGE.t} ${cite(STORAGE.s)}</p>`;
    return { kind: grindBad ? "weak" : "good", title: `${method.ru}: ${lc1(diseaseIndex[cond].ru)}`, lat, cond, key: extras.length ? null : cond + "|" + method.id, body };
  }

  function cupArt(kind) {
    const fill = { good: "#c9a43a", known: "#b9822a", weak: "#b8a77a", spoiled: "#4a2f1d", goop: "#5b5346", odd: "#6e2f4f" }[kind] || "#cfc3a3";
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><g filter="url(#wobble-cup)">
      <path d="M22,40 L78,40 L72,82 Q50,92 28,82 Z" fill="#efe4c8" stroke="#2a1f17" stroke-width="4"/>
      <path d="M26,48 L74,48 L70,78 Q50,86 30,78 Z" fill="${fill}"/>
      <path d="M78,50 q16,2 10,16 q-4,8 -14,6" fill="none" stroke="#2a1f17" stroke-width="4"/>
      ${kind === "goop" || kind === "spoiled" || kind === "odd" ? '<circle cx="42" cy="60" r="4" fill="#2a1f17"/><circle cx="58" cy="66" r="3" fill="#2a1f17"/>' : ""}
    </g></svg>`;
  }

  // Перетаскивание карточек: мышь сразу, палец после короткого удержания
  let dragJustEnded = false;
  function enableDrag(container, sel, onDrop) {
    container.addEventListener("pointerdown", (e) => {
      const card = e.target.closest(sel); if (!card || e.button > 0) return;
      const sx = e.clientX, sy = e.clientY, touch = e.pointerType !== "mouse";
      let ghost = null, ready = !touch, timer = null, last = e;
      const move = (ev) => { last = ev; if (ghost) { ghost.style.left = ev.clientX - 40 + "px"; ghost.style.top = ev.clientY - 30 + "px"; } };
      const start = () => { ghost = card.cloneNode(true); ghost.classList.add("drag-ghost"); ghost.style.width = card.offsetWidth + "px"; document.body.appendChild(ghost); move(last); };
      const onMove = (ev) => {
        const d = Math.hypot(ev.clientX - sx, ev.clientY - sy);
        if (!ghost) { if (touch && !ready) { if (d > 10) cleanup(); return; } if (d > 6) start(); }
        if (ghost) { ev.preventDefault(); move(ev); }
      };
      const onTouchMove = (ev) => { if (ghost) ev.preventDefault(); };
      const onUp = (ev) => {
        if (ghost) { ghost.remove(); ghost = null; const t = document.elementFromPoint(ev.clientX, ev.clientY); dragJustEnded = true; setTimeout(() => (dragJustEnded = false), 50); onDrop(card.dataset.id, t); }
        cleanup();
      };
      const cleanup = () => {
        clearTimeout(timer); ghost?.remove();
        window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", cleanup); window.removeEventListener("touchmove", onTouchMove);
      };
      if (touch) timer = setTimeout(() => { ready = true; start(); }, 280);
      window.addEventListener("pointermove", onMove, { passive: false });
      window.addEventListener("pointerup", onUp); window.addEventListener("pointercancel", cleanup);
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    });
  }

  // ---------- Теория в котелке: уроки провизора и карточки ----------
  const tagL = (t, n) => (C.tagLink ? C.tagLink(t, n) : tagPill(t, n));
  const courseItem = (key) => C.course?.course().find((x) => x.key === key);
  const lessonChip = (key) => { const x = courseItem(key); return x ? `<a class="chip ${x.done ? "on" : ""}" href="${x.href}">${x.done ? "✓ " : ""}${esc(x.title)}</a>` : ""; };
  const METHOD_LESSONS = { inf: ["l:l1", "c:c_methods", "l:l4"], dec: ["l:l1", "c:c_methods", "l:l4", "l:l5"], muc: ["l:l6", "c:c_mucilages"], mix: ["l:l7"] };
  const herbLessons = (p) => {
    const keys = ["l:l3"];
    if (p.part === "leaf") keys.push("l:l5");
    if (["seed", "berry"].includes(p.part) || p.prep === "mucilage") keys.push("l:l6");
    tagsOf(p).forEach((t) => { const id = C.tagLesson?.(t); if (id) keys.push("c:" + id); });
    // частные уроки о веществах одного-двух видов сырья (валереновая кислота, хамазулен и т. п.)
    (C.course?.course() || []).filter((x) => x.kind === "chem" && x.key !== "c:c_intro" && x.plants.length <= 2 && x.plants.includes(p.id)).forEach((x) => keys.push(x.key));
    return [...new Set(keys)];
  };
  const cardsLinks = () => (C.flash ? `<div class="herbs"><a class="chip" href="#/sim/cards/rx">Карточки: колода «Рецепты»</a><a class="chip" href="#/sim/cards/all">Колода «Всё»</a></div>` : "");
  function theoryHtml(chosen, methodId) {
    if (!C.course) return `<p>Курс провизора не загружен.</p>`;
    const m = POT_METHODS.find((x) => x.id === methodId);
    const herbs = chosen.filter((id) => byId[id]).map((id) => byId[id]);
    const base = ["l:l1", "c:c_methods", "l:l2", "l:l3", "l:l4", "l:l5", "l:l6", "l:l7", "l:l8", "l:l9"];
    return `<div class="card cp-theory"><h3>Как готовят водные извлечения</h3><p class="hint">Уроки курса провизора по порядку. Галочкой отмечены пройденные.</p><div class="herbs">${base.map(lessonChip).join("")}</div></div>
      <div class="card cp-theory"><h3>Выбранная обработка: ${esc(m.ru)} <i class="muted" style="font-weight:400">${esc(m.lat)}</i></h3>${METHOD_LESSONS[m.id] ? `<div class="herbs">${METHOD_LESSONS[m.id].map(lessonChip).join("")}</div>` : `<p class="hint">Старинная форма. В курсе провизора её нет: курс учит водным извлечениям по учебнику. Описание формы на полке «Способы».</p>`}</div>
      <div class="card cp-theory"><h3>Сырьё в котелке</h3>${herbs.length ? herbs.map((p) => `<div class="cp-th-herb"><b>${C.nm ? C.nm(p.drug.ru, p.drug.lat) : esc(p.drug.ru)}</b>${METHODS[p.prep] ? ` <span class="muted">${esc(METHODS[p.prep].ru.toLowerCase())}, ${p.prep === "valerian" ? "1:30" : "1:10"}${C.SIZE_RU ? ", " + esc(C.SIZE_RU(p)) : ""}</span>` : ""}<div class="herbs">${herbLessons(p).map(lessonChip).join("")}</div></div>`).join("") : `<p class="hint">Положите травы в котелок, и здесь появятся уроки о том, как их готовят и какие вещества в них действуют.</p>`}</div>
      <div class="card cp-theory"><h3>Заучить рецепты</h3><p class="hint">Карточки по урокам: форма, соотношение, измельчение, латинская пропись, сроки хранения, составы сборов. Три уровня сложности.</p>${cardsLinks()}</div>`;
  }
  function learnHtml(chosen, methodId) {
    if (!C.course) return "";
    const keys = [...new Set([...(METHOD_LESSONS[methodId] || []), ...chosen.filter((id) => byId[id]).flatMap((id) => herbLessons(byId[id]))])];
    const chips = keys.map(lessonChip).filter(Boolean);
    return chips.length ? `<div class="cp-learn"><h4>Чему научиться</h4><div class="herbs">${chips.join("")}</div>${cardsLinks()}</div>` : "";
  }

  // Цели котелка: сборы учебника и старинные рецепты, которые можно повторить
  const GOALS = () => [
    ...BLENDS.map((b) => ({ key: "blend:" + b.id, title: b.ru, meta: "Сбор из учебника", ing: b.items, method: b.items.some((id) => GROUP[byId[id].prep] === "dec") ? "dec" : "inf", legacy: false })),
    ...legacyAll().map((m) => ({ key: "legacy:" + m.id, title: m.ru, meta: legacyMeta(m), ing: PX.legacy[m.id].ing, method: legacyMethod(m) === "water" ? "mix" : legacyMethod(m), legacy: true, id: m.id })),
  ];
  // Любой рецепт книги по ключу: сбор, старинный рецепт или простое средство по показанию (все травы этого показания, до восьми)
  function goalFor(key) {
    const g = GOALS().find((x) => x.key === key); if (g) return g;
    const r = allRecipes()[key]; if (!r) return null;
    return { key, title: `${POT_METHODS.find((x) => x.id === r.method).ru}: ${lc1(diseaseIndex[r.cond].ru)}`, meta: "Простое средство по показанию", ing: [...r.herbs].slice(0, SLOTS), method: r.method, legacy: false };
  }
  const allKeys = () => [...GOALS().map((g) => g.key), ...Object.keys(allRecipes())];
  let lastRandom = null;
  function goalsHtml() {
    const gs = GOALS(), done = gs.filter((g) => ps.book[g.key]).length;
    const card = (g) => { const d = ps.book[g.key], meth = POT_METHODS.find((x) => x.id === g.method);
      return `<div class="card cp-goal ${d ? "done" : ""}"><h3>${g.legacy ? legacyMark(true) : ""}${g.legacy ? `<a href="#/heritage/${g.id}">${esc(g.title)}</a>` : `<a href="#/book/${g.key}">${esc(g.title)}</a>`}${d ? `<span class="done-mark">сварено</span>` : ""}</h3>
        <p class="meta-line">${g.meta} · компонентов: ${g.ing.length} · ${esc(meth.ru)}</p>
        <div class="cp-goal-ing herbs" hidden>${g.ing.map((id) => `<span class="chip static">${esc(ingName(id))}</span>`).join("")}</div>
        <div class="btn-row"><button class="btn small ghost" type="button" data-show>Показать состав</button><button class="btn small ghost" type="button" data-load="${g.key}">Загрузить в котелок</button></div></div>`; };
    return `<div class="cp-goal-sum"><b>Повторено ${done} из ${gs.length}</b><div class="fc-prog" aria-hidden="true"><span style="width:${Math.round((done / gs.length) * 100)}%"></span></div></div>
      <h3 class="cp-group">Сборы из учебника</h3>${gs.filter((g) => !g.legacy).map(card).join("")}
      <h3 class="cp-group">${legacyMark()} Старинные рецепты</h3>${gs.filter((g) => g.legacy).map(card).join("")}`;
  }

  C.page("pot", function potPage(load) {
    const slots = ps.slots;
    let q = "", lastResult = null, parts = [], tag = "", shelf = store.get("potShelf", "herbs");
    if (!["herbs", "extras", "goals", "methods", "theory"].includes(shelf)) shelf = "herbs";
    const allTags = [...new Set(PLANTS.flatMap(tagsOf))].sort();
    app.innerHTML = `
      <div class="cp">
        <h1 style="margin-bottom:.1em">Котелок</h1>
        <p class="hint" style="margin-bottom:12px">Свободная игра. Положите до восьми ингредиентов, выберите обработку и сварите. Котелок скажет, повторили ли вы сбор из учебника или ${legacyMark(true)} рецепт, и что по источникам может лечить такая смесь. Полка «Теория» ведёт к урокам провизора и карточкам по тому, что лежит в котелке.</p>
        <div class="cp-band">
          <div class="cp-preview" id="preview"></div>
          <div class="cp-slots" id="slots"></div>
          <div class="cp-names" id="slotnames" aria-hidden="true"></div>
          <div class="cp-proc">
            <button class="cp-chip ${ps.grind ? "on" : ""}" id="grind" type="button" aria-pressed="${ps.grind}">Измельчить</button>
            <span id="methods">${POT_METHODS.map((m) => `<button class="cp-chip ${m.old ? "old" : ""} ${ps.method === m.id ? "on" : ""}" data-m="${m.id}" type="button" title="${m.desc}">${m.ru}</button>`).join("")}</span>
            <button class="cp-chip" id="rand" type="button" title="Положить в котелок случайный рецепт и подсветить нужную обработку">Случайный рецепт</button>
            <button class="cp-chip" id="clear" type="button">Очистить</button>
          </div>
        </div>
        <div class="cp-mini" id="cpmini" hidden><span class="cp-mini-n"><span>В котелке:</span> <b id="cpminin">0</b></span><button class="btn small ghost" id="cpup" type="button">К котелку</button><button class="btn small" id="cpminicook" type="button">Приготовить</button></div>
        <div id="result"></div>
        <div class="tabs cp-tabs" id="shelf">${[["herbs", "Травы"], ["extras", "Другое"], ["goals", "Рецепты"], ["methods", "Способы"], ["theory", "Теория"]].map(([k, t]) => `<button type="button" data-s="${k}" class="${k === shelf ? "on" : ""}">${t}</button>`).join("")}</div>
        <div class="cp-tools" id="tools">
          <div class="search-row"><input class="search" id="q" placeholder="Найти сырьё" autocomplete="off" aria-label="Найти сырьё"><button class="filter-btn" id="ftog" type="button" aria-expanded="false">${ICON("filter")} Фильтры</button></div>
          <div id="filters" hidden>
            <div class="chips" id="parts" role="group" aria-label="Сырьё"><button class="chip on" data-part="" type="button">Всё сырьё</button>${[...new Set(Object.values(PARTS))].map((t) => `<button class="chip" data-part="${t}" type="button">${t}</button>`).join("")}</div>
            <div class="filter-row"><label for="tagsel">Вещества</label><select id="tagsel" class="sel"><option value="">любые</option>${allTags.map((t) => `<option>${t}</option>`).join("")}</select></div>
            ${countryChips()}
          </div>
        </div>
        <p class="hint" id="shelfhint"></p>
        <div class="cp-list" id="list"></div>
      </div>`;
    bindChips(() => { $$("#cf .chip").forEach((c) => c.classList.toggle("on", c.dataset.c ? C.state.countries.includes(c.dataset.c) : !C.state.countries.length)); draw(); });
    const preview = () => {
      const chosen = slots.filter(Boolean), left = SLOTS - chosen.length;
      if ($("#cpminin")) $("#cpminin").textContent = chosen.length;
      const method = POT_METHODS.find((m) => m.id === ps.method);
      let icon = ART.pot(), title, stats;
      if (lastResult) {
        icon = cupArt(lastResult.kind); title = lastResult.title;
        stats = [["Итог", { good: "обосновано", known: "известный рецепт", weak: "неполное извлечение (слабое)", spoiled: "нарушена технология (испорчено)", goop: "нет обоснования (не лекарство)", odd: "странный результат (не лекарство)" }[lastResult.kind]], ["Форма", method.lat]];
      } else if (!chosen.length) {
        title = "Добавьте сырьё"; stats = [["Форма", method.lat], ["Режим", method.desc]];
      } else {
        title = `${chosen.length} из ${SLOTS}`; stats = [["Форма", method.lat], ["Время", method.time], ["Места", left ? `ещё ${left}` : "нет"]];
      }
      const totals = {};
      chosen.filter((id) => byId[id]).forEach((id) => tagsOf(byId[id]).forEach((t) => (totals[t] = (totals[t] || 0) + 1)));
      $("#preview").innerHTML = `<div class="cp-icon">${icon}</div><div class="cp-info"><div class="cp-title">${title}</div>
        <div class="cp-stats">${stats.map(([k, v]) => `<span><small>${k}</small>${v}</span>`).join("")}</div>
        <div class="cp-tags">${Object.entries(totals).map(([t, n]) => tagL(t, n)).join("")}</div>${Object.keys(totals).some((t) => C.tagLesson?.(t)) ? `<div class="cp-tagnote">Нажмите на класс веществ, чтобы открыть урок о нём</div>` : ""}</div>`;
    };
    const row = (id, name, sub, right) => `<button class="cp-row ${slots.includes(id) ? "used" : ""}" data-id="${id}" type="button">
          <span class="cp-row-art">${artOf(id)}</span><span class="cp-row-name"><span class="${sub ? "n-ru" : ""}">${name}</span>${sub ? `<i class="n-only-lat">${sub}</i><small class="muted n-only-both">${sub}</small>` : ""}</span><span class="cp-row-tags">${right || ""}</span></button>`;
    const draw = () => {
      $("#slots").innerHTML = slots.map((s, i) => s
        ? `<button class="cp-slot" data-i="${i}" type="button" title="${esc(ingName(s))}: убрать" aria-label="${esc(ingName(s))}: убрать"><em class="cp-num">${i + 1}</em>${artOf(s)}<span>${esc(ingName(s))}</span></button>`
        : `<button class="cp-slot empty" data-i="${i}" type="button" aria-label="Пустое место">${ICON("plus")}</button>`).join("")
        + `<button class="cp-slot cp-cook" id="cook" type="button">Приготовить</button>`;
      // на телефоне ячейки слишком узки для названий: список под ячейками в том же порядке
      $("#slotnames").innerHTML = slots.map((s, i) => s ? `<span><b>${i + 1}</b> ${esc(ingName(s))}</span>` : "").join("");
      const qq = C.norm(q.trim());
      const hit = (arr) => !qq || C.norm(arr.filter(Boolean).join(" ")).includes(qq);
      $("#tools").hidden = shelf === "methods" || shelf === "theory" || shelf === "goals";
      $("#ftog").hidden = shelf !== "herbs"; if (shelf !== "herbs") $("#filters").hidden = true;
      $("#shelfhint").innerHTML = { goals: "Что можно повторить в котелке: сборы из учебника и старинные рецепты из «Наследия». Состав скрыт; если не получается, загрузите его в котелок.", herbs: "Травы справочника. Перетащите карточку в котелок или нажмите на неё.", extras: "Ингредиенты старинных рецептов, которых нет среди трав справочника: европейские травы, вино, мёд, желчь и привозное сырьё, которое закупали аптеки (корица, гвоздика, гваяковое дерево). Нажмите, чтобы положить в котелок.", methods: "Способы обработки. Первые три готовят водные извлечения по учебнику, остальные встречаются в старинных рецептах.", theory: "Теория из курса провизора: как готовят то, что лежит в котелке, и карточки для заучивания рецептов." }[shelf] + ` <a href="#/book">Книга рецептов</a>`;
      let html = "";
      if (shelf === "herbs") {
        const list = PLANTS.filter(inCountries).filter((p) => hit([C.ml(p.ru, p.drug.ru, ...tagsOf(p)), p.lat, p.drug.lat, p.compounds]) && (!parts.length || partsOf(p).some((k) => parts.includes(PARTS[k]))) && (!tag || tagsOf(p).includes(tag)));
        html = list.map((p) => row(p.potx || p.id, p.drug.ru, p.drug.lat, tagsOf(p).slice(0, 3).map((t) => `<span class="tag" style="--tc:${C.TAG_COLORS[t] || "#555"}">${t}</span>`).join(""))).join("");
      } else if (shelf === "extras") {
        html = Object.entries(XGROUPS).map(([g, gt]) => {
          const xs = PX.extras.filter((x) => x.group === g && !PAGE_OF[x.id] && hit([C.ml(x.ru, gt), x.lat]));
          return xs.length ? `<h3 class="cp-group">${gt}</h3>${xs.map((x) => row(x.id, x.ru, x.lat, x.n ? `<span class="muted" style="font-size:.8rem">в ${x.n} рец.</span>` : "")).join("")}` : "";
        }).join("");
      } else if (shelf === "goals") {
        html = goalsHtml();
      } else if (shelf === "methods") {
        html = POT_METHODS.map((m) => {
          const n = legacyAll().filter((x) => (legacyMethod(x) === "water" ? ["inf", "dec", "mix"] : [legacyMethod(x)]).includes(m.id)).length;
          return `<div class="card cp-method ${ps.method === m.id ? "on" : ""}"><h3 style="margin:0">${m.ru} <i class="muted" style="font-weight:400">${m.lat}</i></h3><p style="margin:.3em 0">${m.desc}.</p><p class="meta-line">${m.old ? "Старинная форма" : "Водное извлечение по учебнику"} · время: ${m.time}${n ? ` · подходит для ${n} старинных рецептов` : ""}</p><button class="btn small ${ps.method === m.id ? "" : "ghost"}" data-pick="${m.id}" type="button">${ps.method === m.id ? "Выбрано" : "Выбрать"}</button></div>`;
        }).join("") + `<p class="hint">Почему травы готовят по-разному, подробно объясняет <a href="#/sim">курс в симуляторе провизора</a>.</p>`;
      } else {
        html = theoryHtml(slots.filter(Boolean), ps.method);
      }
      $("#list").innerHTML = html || `<p>Ничего не нашлось.</p>`;
      preview();
    };
    const PAGES_pot = () => C.PAGES.pot();
    draw();
    $("#q").addEventListener("input", (e) => { q = e.target.value; draw(); });
    $("#shelf").addEventListener("click", (e) => {
      const b = e.target.closest("[data-s]"); if (!b) return;
      shelf = b.dataset.s; store.set("potShelf", shelf); $$("#shelf button").forEach((x) => x.classList.toggle("on", x === b)); draw();
    });
    $("#parts").addEventListener("click", (e) => {
      const b = e.target.closest("[data-part]"); if (!b) return;
      const t = b.dataset.part; parts = !t ? [] : parts.includes(t) ? parts.filter((x) => x !== t) : [...parts, t];
      $$("#parts .chip").forEach((c) => c.classList.toggle("on", c.dataset.part ? parts.includes(c.dataset.part) : !parts.length)); draw();
    });
    $("#ftog").onclick = (e) => { const f = $("#filters"); f.hidden = !f.hidden; e.currentTarget.setAttribute("aria-expanded", String(!f.hidden)); };
    if (C.state.countries.length) { $("#filters").hidden = false; $("#ftog").setAttribute("aria-expanded", "true"); }
    $("#tagsel").addEventListener("change", (e) => { tag = e.target.value; draw(); });
    const put = (id, i) => {
      if (slots.includes(id)) slots[slots.indexOf(id)] = null;
      if (i == null || i < 0) i = slots.indexOf(null);
      if (i < 0) return toast("Котелок полон: уберите что-нибудь.");
      slots[i] = id; lastResult = null; MUSIC.sfx("plop"); draw();
    };
    enableDrag($("#list"), "button.cp-row", (id, target) => {
      const slot = target?.closest(".cp-slot[data-i]");
      if (slot) put(id, +slot.dataset.i); else if (target?.closest(".cp-band")) put(id);
    });
    $("#grind").onclick = (e) => { ps.grind = !ps.grind; e.currentTarget.classList.toggle("on", ps.grind); e.currentTarget.setAttribute("aria-pressed", String(ps.grind)); lastResult = null; preview(); };
    $("#methods").addEventListener("click", (e) => {
      const b = e.target.closest("[data-m]"); if (!b) return;
      pickMethod(b.dataset.m); if (shelf === "methods") draw(); else preview();
    });
    const pickMethod = (id) => { ps.method = id; lastResult = null; $$("#methods .cp-chip").forEach((c) => { c.classList.toggle("on", c.dataset.m === id); c.classList.remove("glow"); }); };
    // label: «Ответ» (подсказка после неудачи), «Рецепт» (кнопка «Сварить в котелке» в книге и «Наследии»), «Случайный рецепт»
    const showAnswer = (key, label = "Ответ") => {
      const g = goalFor(key); if (!g) return;
      slots.fill(null); g.ing.forEach((id, i) => (slots[i] = id));
      pickMethod(g.method);
      ps.grind = true; $("#grind").classList.add("on"); $("#grind").setAttribute("aria-pressed", "true");
      const chip = $(`#methods [data-m="${g.method}"]`); chip.classList.add("glow");
      // на телефоне ряд обработок прокручивается вбок: показываем подсвеченную
      const proc = $(".cp-proc"); proc.scrollLeft = Math.max(0, chip.offsetLeft - (proc.clientWidth - chip.offsetWidth) / 2);
      $("#result").innerHTML = `<div class="card near-box"><b>${label}: ${g.legacy ? legacyMark(true) : ""}${esc(g.title)}</b> <span class="meta-line">${g.meta}</span>. Состав уже в котелке, обработка «${esc(POT_METHODS.find((x) => x.id === g.method).ru)}» подсвечена. Нажмите «Приготовить».</div>`;
      draw();
      // наверх, к котелку; на низком экране так, чтобы подсвеченная обработка была видна
      window.scrollTo(0, 0);
      const pb = $(".cp-proc").getBoundingClientRect().bottom;
      if (pb > innerHeight) window.scrollTo({ top: pb - innerHeight + 16, behavior: "smooth" });
    };
    $("#result").addEventListener("click", (e) => {
      // крестик скрывает только это описание; рецепт остаётся в книге, состав в котелке
      if (e.target.closest(".cp-res-x")) { $("#result").innerHTML = ""; const t = $("#shelf"); window.scrollTo({ top: Math.max(0, t.getBoundingClientRect().top + scrollY - ($(".cp-band") && getComputedStyle($(".cp-band")).position === "sticky" ? $(".cp-band").offsetHeight : 0) - 12), behavior: "smooth" }); return; }
      const b = e.target.closest("[data-answer]"); if (b) showAnswer(b.dataset.answer);
    });
    $("#list").addEventListener("click", (e) => {
      const pm = e.target.closest("[data-pick]"); if (pm) { pickMethod(pm.dataset.pick); draw(); return; }
      const ld = e.target.closest("[data-load]"); if (ld) { showAnswer(ld.dataset.load, "Рецепт"); return; }
      const sh = e.target.closest("[data-show]"); if (sh) { const box = sh.parentElement.querySelector(".cp-goal-ing"); box.hidden = !box.hidden; sh.textContent = box.hidden ? "Показать состав" : "Скрыть состав"; return; }
      const it = e.target.closest("button.cp-row"); if (!it || slots.includes(it.dataset.id) || dragJustEnded) return;
      put(it.dataset.id);
    });
    $("#slots").addEventListener("click", (e) => {
      if (e.target.closest("#cook")) return cookNow();
      const s = e.target.closest(".cp-slot"); if (s && slots[s.dataset.i]) { slots[s.dataset.i] = null; lastResult = null; draw(); }
    });
    const proc = $(".cp-proc"), procEnd = () => proc.classList.toggle("at-end", proc.scrollLeft + proc.clientWidth >= proc.scrollWidth - 4);
    proc.addEventListener("scroll", procEnd, { passive: true }); procEnd();
    $("#clear").onclick = () => { slots.fill(null); lastResult = null; $("#result").innerHTML = ""; draw(); };
    // Случайный рецепт из книги: сначала ещё не сваренные, и не тот же, что в прошлый раз
    $("#rand").onclick = () => {
      const keys = allKeys().filter((k) => k !== lastRandom), fresh = keys.filter((k) => !ps.book[k]);
      lastRandom = C.shuffle(fresh.length ? fresh : keys)[0];
      showAnswer(lastRandom, "Случайный рецепт");
    };
    if (load && goalFor(load)) { history.replaceState(null, "", "#/pot"); showAnswer(load, "Рецепт"); }
    // На телефоне панель котелка не липкая: когда она ушла за экран, внизу появляется узкая полоска с кнопками
    const mini = $("#cpmini"), band0 = $(".cp-band");
    if (mini && band0 && "IntersectionObserver" in window) {
      const io = new IntersectionObserver(([en]) => { if (!document.body.contains(band0)) return io.disconnect(); mini.hidden = en.isIntersecting || !matchMedia("(max-width: 760px)").matches; });
      io.observe(band0);
      $("#cpup").addEventListener("click", () => band0.scrollIntoView({ behavior: "smooth", block: "start" }));
      $("#cpminicook").addEventListener("click", () => cookNow());
    }
    const cookNow = () => {
      const chosen = slots.filter(Boolean);
      if (!chosen.length) return toast("Котелок пуст.");
      $$("#methods .glow").forEach((c) => c.classList.remove("glow"));
      $("#preview .cp-icon").classList.add("cooking"); MUSIC.sfx("bubble");
      setTimeout(() => {
        const r = cook(chosen); lastResult = r;
        const ok = ["good", "known", "weak"].includes(r.kind), full = ["good", "known"].includes(r.kind);
        MUSIC.sfx(ok ? "good" : "bad");
        let extra = "";
        if (full && r.key) {
          const keys = r.keys || [r.key];
          if (keys.some((k) => !ps.book[k])) extra = r.key.startsWith("legacy:") ? `<p class="verdict">${legacyMark()} Новая запись в разделе старинных рецептов книги</p>` : `<p class="verdict">Новая запись в книге рецептов</p>`;
          keys.forEach((k) => (ps.book[k] = { title: r.title, herbs: chosen, method: ps.method, t: Date.now() }));
          store.set("potBook2", ps.book);
        } else if (r.kind === "weak" && r.key && !ps.book[r.key]) extra = `<p class="hint">В книгу записывается только средство, приготовленное правильно.</p>`;
        $("#result").innerHTML = `<div class="card cp-res"><button class="iconbtn cp-res-x" type="button" title="Скрыть описание" aria-label="Скрыть описание">×</button>
          <p class="verdict">${{ good: "Обоснованная смесь", known: "Известный рецепт", weak: "Неполное извлечение (слабое средство)", spoiled: "Нарушена технология (испорчено)", goop: "Нет обоснования (не лекарство)", odd: "Что получилось на самом деле" }[r.kind]}</p>
          <h2 style="margin-top:.1em">${r.legacy ? legacyMark() : ""}${r.title}</h2>${r.lat ? `<div class="muted"><i>${r.lat}</i></div>` : ""}
          ${r.cond ? `<p class="meta-line">Показание: ${diseasePath(r.cond).map((n) => n.ru).join(" / ")} ${C.icd(r.cond)}</p>` : ""}
          ${extra}${r.body}${learnHtml(chosen, ps.method)}</div>`;
        draw();
        // результат длиннее экрана: прокручиваем к его началу, под липкую панель котелка
        const band = $(".cp-band"), sticky = band && getComputedStyle(band).position === "sticky";
        const top = $("#result").getBoundingClientRect().top + scrollY - (sticky ? band.offsetHeight : 0) - 12;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }, 1100);
    };
  });

  // ---------- Книга рецептов (открытая) ----------
  function allRecipes() {
    const out = {};
    PLANTS.filter((p) => GROUP[p.prep]).forEach((p) => p.uses.filter((u) => u.ev !== "ethno").forEach((u) => {
      const k = u.c + "|" + GROUP[p.prep];
      (out[k] = out[k] || { cond: u.c, method: GROUP[p.prep], herbs: new Set() }).herbs.add(p.id);
    }));
    return out;
  }
  // ---------- Полная карточка рецепта ----------
  const stepText = (a, on) => `${ACT(a)}${Array.isArray(on) ? `: ${on.map((id) => byId[id]?.drug.ru.toLowerCase()).join(", ")}` : ""}`;
  const ACT = (a) => D.ACTIONS[a]?.ru || a;
  function lessonsFor(ids) {
    const L = C.course ? C.course.course().filter((x) => x.kind === "chem" && x.plants.some((id) => ids.includes(id))) : [];
    return L.length ? `<h4>Уроки курса провизора</h4><div class="herbs">${L.map((x) => `<a class="chip" href="${x.href}">${esc(x.title)}</a>`).join("")}</div>` : "";
  }
  function herbBlock(p, { cond, inBlend, noHist } = {}) {
    const us = p.uses.filter((u) => u.ev !== "ethno" && (!cond || diseasePath(u.c).some((n) => n.id === cond) || u.c === cond));
    const m = METHODS[p.prep];
    return `<div class="rcp-herb"><div class="rcp-herb-head"><span class="cp-row-art">${ART.draw(p)}</span><div><h3 style="margin:0"><a href="#/plant/${p.id}"><span class="n-ru">${p.drug.ru}</span><i class="n-only-lat">${p.drug.lat}</i></a></h3><span class="muted"><span class="n-only-both">${C.latT(p.drug.lat)} · </span><span class="n-ru">${p.ru}</span><span class="n-only-both"> (</span>${C.latT(p.lat).replace("lat-t", "lat-t n-lat")}<span class="n-only-both">)</span></span></div></div>
      <dl class="quick">
        ${!inBlend && m ? `<dt>Пропись</dt><dd><span class="rx-line">Rp.: ${C.latT(C.rxName ? C.rxName(p) : m.lat + " " + p.drug.lat)}</span></dd>` : ""}
        ${m ? `<dt>Форма</dt><dd>${m.ru} (<i>${m.lat}</i>)${inBlend ? "" : `, сырьё и вода ${p.prep === "valerian" ? "1:30" : "1:10"}`}${D.METHOD_NOTES?.[p.id] ? `<br><span class="hint">${D.METHOD_NOTES[p.id].t} ${cite(D.METHOD_NOTES[p.id].s)}</span>` : ""}</dd>` : ""}
        ${C.SIZE_RU ? `<dt>Измельчение</dt><dd>${C.SIZE_RU(p, inBlend)}</dd>` : ""}
        <dt>Вещества</dt><dd>${tagsOf(p).map((t) => tagL(t)).join(" ") || esc(p.compounds)}</dd>
      </dl>
      ${us.map((u) => `<p class="use ${u.ev}"><span class="badge ${u.ev}">${EV[u.ev]}</span>${u.t} ${cite(u.s)}</p>`).join("")}
      ${m && !inBlend ? `<p class="hint">${m.why} ${cite(m.src)}</p>` : ""}
      ${p.cautions.map((c) => `<p class="caution">${c.t} ${cite(c.s)}</p>`).join("")}
      ${!noHist && C.hist?.has("drug:" + p.id) ? `<details class="hist-mini"><summary>История сырья: первое описание</summary>${C.hist.block("drug:" + p.id, { bare: true })}</details>` : ""}
      ${m ? `<div class="btn-row"><a class="btn small ghost" href="#/sim/free/${p.id}">${ICON("flask")} Приготовить в симуляторе</a></div>` : ""}</div>`;
  }
  function recipeCard(key) {
    const back = `<a class="back" href="#/book">${ICON("back")} Книга рецептов</a>`;
    if (key.startsWith("legacy:")) { location.hash = "#/heritage/" + key.slice(7); return; }
    if (key.startsWith("blend:")) {
      const b = BLENDS.find((x) => x.id === key.slice(6)); if (!b) return (app.innerHTML = back + "<p>Рецепт не найден.</p>");
      const herbs = b.items.map((id) => byId[id]), m = METHODS[herbs[0].prep];
      app.innerHTML = `${back}<article class="card rcp"><p class="kicker">Сбор из учебника ${ps.book[key] ? `<span class="done-mark">сварено</span>` : ""}</p><h1>${b.ru}</h1>
        <p class="lead" style="margin:.2em 0">${b.goal}</p>
        <div class="formula"><div class="rp">Rp.: Specierum ${herbs.map((p) => p.drug.lat).join(", ")}</div>${herbs.map((p) => `<div class="row"><span><a href="#/plant/${p.id}"><span class="n-lat">${p.drug.lat}</span><span class="n-only-ru">${p.drug.ru}</span></a> <span class="ru n-only-both">${p.drug.ru.toLowerCase()}</span></span><span class="nw">${C.SIZE_RU ? C.SIZE_RU(p, true) : ""}</span></div>`).join("")}</div>
        <p class="prose">${b.why} ${cite(b.src)}</p>
        ${C.hist ? C.hist.block(key, { title: "История и первое описание" }) : ""}
        <h2>Как готовят</h2><ol class="rcp-steps">${b.steps.map((x) => `<li>${stepText(x.a, x.on)}</li>`).join("")}</ol>
        <p class="hint">${STORAGE.t} ${cite(STORAGE.s)}</p>
        <div class="btn-row"><a class="btn" href="#/sim/free/blend:${b.id}">${ICON("flask")} Приготовить в симуляторе</a><a class="btn ghost" href="#/pot/blend:${b.id}">${ICON("pot")} Сварить в котелке</a></div>
        <h2>Компоненты</h2>${herbs.map((p) => herbBlock(p, { inBlend: true })).join("")}
        ${lessonsFor(b.items)}</article>`;
      return;
    }
    if (key.startsWith("k3:")) {
      const sp = (window.K3?.species || [])[+key.slice(3)]; if (!sp) return (app.innerHTML = back + "<p>Рецепт не найден.</p>");
      const ids = sp.composition.map((c) => c.plant_id).filter((id) => byId[id]);
      app.innerHTML = `${back}<article class="card rcp"><p class="kicker">Сбор из учебника, состав в процентах</p><h1>${esc(sp.name)}</h1><p class="lead" style="margin:.2em 0">${esc(sp.use)} ${cite(sp.s)}</p>
        <div class="formula">${sp.composition.map((c) => `<div class="row"><span>${c.plant_id && byId[c.plant_id] ? `<a href="#/plant/${c.plant_id}">${C.fLat(c)}</a>` : C.fLat(c)}</span><span class="nw">${esc(c.parts)}</span></div>`).join("")}</div>
        ${sp.prep ? `<p class="prose">${esc(sp.prep)}</p>` : ""}
        ${C.hist ? C.hist.block(key, { title: "История и первое описание" }) : ""}
        <p class="hint">${STORAGE.t} ${cite(STORAGE.s)}</p>
        ${ids.length ? `<h2>Компоненты из справочника</h2>${ids.map((id) => herbBlock(byId[id], { inBlend: true })).join("")}` : ""}${lessonsFor(ids)}</article>`;
      return;
    }
    const r = allRecipes()[key]; if (!r) return (app.innerHTML = back + "<p>Рецепт не найден.</p>");
    const m = POT_METHODS.find((x) => x.id === r.method), herbs = [...r.herbs].map((id) => byId[id]);
    const I = window.DINFO?.diseases?.[r.cond];
    const steps = METHODS[herbs[0].prep]?.steps || [];
    app.innerHTML = `${back}<article class="card rcp"><p class="kicker">Простое средство по показанию ${ps.book[key] ? `<span class="done-mark">сварено</span>` : ""}</p>
      <h1>${m.ru}: ${lc1(diseaseIndex[r.cond].ru)}</h1>
      <p class="meta-line">Показание: <a href="#/diseases/${r.cond}">${diseasePath(r.cond).map((n) => n.ru).join(" / ")}</a>${latName(r.cond)} ${C.icd(r.cond)}</p>
      ${I?.def ? `<div class="prose">${C.items(I.def.slice(0, 1))}</div>` : ""}
      ${I?.red_flags ? `<div class="caution"><b>Когда нужен врач.</b> ${C.items(I.red_flags.slice(0, 2))}</div>` : ""}
      <h2>Как готовят</h2>
      <p class="prose">${m.ru} (<i>${m.lat}</i>): ${m.desc}. ${herbs.length > 1 ? `Подходит любое из ${herbs.length} видов сырья ниже; готовят каждое отдельно.` : ""}</p>
      ${steps.length ? `<ol class="rcp-steps">${steps.map((a) => `<li>${ACT(a)}</li>`).join("")}</ol>` : ""}
      <p class="hint">${STORAGE.t} ${cite(STORAGE.s)}</p>
      ${herbs.length === 1 && C.hist ? C.hist.block("drug:" + herbs[0].id, { title: "История сырья и первое описание" }) : ""}
      <h2>Сырьё</h2>${herbs.map((p) => herbBlock(p, { cond: r.cond, noHist: herbs.length === 1 })).join("")}
      ${lessonsFor([...r.herbs])}
      <div class="btn-row"><a class="btn ghost" href="#/pot/${encodeURIComponent(key)}">${ICON("pot")} Сварить в котелке</a></div></article>`;
  }

  // Для версии разработчика: все рецепты книги как сваренные
  // Рецепты для страницы болезни: простые средства по показанию и сборы учебника, выше списка растений
  C.recipesForDisease = (ids) => {
    const ord = { ema: 0, text: 1 };
    const evOf = (p, c) => Math.min(...p.uses.filter((u) => u.c === c && u.ev !== "ethno").map((u) => ord[u.ev] ?? 2));
    const simple = Object.entries(allRecipes()).filter(([, r]) => ids.has(r.cond));
    const blends = BLENDS.filter((b) => b.items.filter((id) => byId[id].uses.some((u) => u.ev !== "ethno" && ids.has(u.c))).length >= 2);
    if (!simple.length && !blends.length) return "";
    const rx = (p) => `<div class="rx-line"><span class="n-lat">Rp.: ${C.latT(C.rxName ? C.rxName(p) : p.drug.lat)} ${p.prep === "mucilage" ? "" : `(${p.prep === "valerian" ? "1:30" : "1:10"}) 200 ml`}</span><span class="n-only-ru"><span>${esc(p.drug.ru)}</span>: <span>${METHODS[p.prep]?.ru || ""}</span>${p.prep === "mucilage" ? "" : `<span> ${p.prep === "valerian" ? "1:30" : "1:10"}, 200 мл</span>`}</span></div>`;
    const card = (href, title, sub, body) => `<div class="card recipe dz-rcp"><h3><a class="stretch" href="${href}">${title}</a></h3>${sub ? `<p class="muted" style="margin:.2em 0">${sub}</p>` : ""}${body}</div>`;
    return `<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Рецепты (${simple.length + blends.length})</h3>
      <p class="hint">Пропись, способ и показание. Нажмите на рецепт, чтобы открыть полную карточку: как готовят, измельчение, предостережения. Ниже списка рецептов идут растения.</p>
      <div class="book-grid">${blends.map((b) => card(`#/book/blend:${b.id}`, esc(b.ru), esc(b.goal), `<div class="formula"><div class="rp">Rp.: Specierum ${b.items.map((id) => byId[id].drug.lat).join(", ")}</div></div>`)).join("")}
      ${simple.map(([k, r]) => {
        const m = POT_METHODS.find((x) => x.id === r.method), hs = [...r.herbs].map((id) => byId[id]).sort((a, b) => evOf(a, r.cond) - evOf(b, r.cond));
        return card(`#/book/${encodeURIComponent(k)}`, `${m.ru}: ${lc1(diseaseIndex[r.cond].ru)}`, `${hs.length > 1 ? `Любое из ${hs.length} видов сырья, каждое отдельно. ` : ""}${C.icd(r.cond)}`,
          `<div class="formula">${hs.slice(0, 4).map(rx).join("")}${hs.length > 4 ? `<p class="hint" style="margin:.3em 0 0">и ещё ${hs.length - 4} в полной карточке</p>` : ""}</div>`);
      }).join("")}</div></div>`;
  };
  // для поиска: рецепты как отдельный тип результатов
  C.potRecipeList = () => [
    ...BLENDS.map((b) => ({ title: b.ru, sub: "Сбор из учебника", href: `#/book/blend:${b.id}`, names: [b.ru], body: [b.goal, b.why, b.items.map((id) => `${byId[id].ru} ${byId[id].drug.lat}`).join(" ")] })),
    ...Object.entries(allRecipes()).map(([k, r]) => { const m = POT_METHODS.find((x) => x.id === r.method); return { title: `${m.ru}: ${lc1(diseaseIndex[r.cond].ru)}`, sub: m.lat, href: `#/book/${encodeURIComponent(k)}`, names: [m.ru, diseaseIndex[r.cond].ru], body: [[...r.herbs].map((id) => `${byId[id].ru} ${byId[id].drug.lat}`).join(" ")] }; }),
  ];
  C.potAllBook = () => {
    const t = Date.now(), out = {};
    BLENDS.forEach((b) => (out["blend:" + b.id] = { title: b.ru, herbs: b.items, method: "inf", t }));
    Object.entries(allRecipes()).forEach(([k, r]) => (out[k] = { title: k, herbs: [...r.herbs], method: r.method, t }));
    legacyAll().forEach((m) => (out["legacy:" + m.id] = { title: m.ru, herbs: PX.legacy[m.id].ing, method: legacyMethod(m) === "water" ? "inf" : legacyMethod(m), t }));
    return out;
  };

  C.page("book", function bookPage(key) {
    if (key) return recipeCard(key);
    const book = ps.book, rec = allRecipes();
    const byCond = {};
    Object.entries(rec).forEach(([k, r]) => (byCond[diseaseIndex[r.cond].sys] = byCond[diseaseIndex[r.cond].sys] || []).push([k, r]));
    const done = Object.keys(book).length;
    app.innerHTML = `<a class="back" href="#/pot">${ICON("back")} К котелку</a><h1>Книга рецептов</h1>
      <p class="lead">Нажмите на рецепт, чтобы открыть полную карточку: пропись, способ, измельчение, показания, предостережения и связанные уроки. Всё, что можно приготовить из сырья справочника: сборы из учебника и простые средства по показаниям. Сваренные в котелке отмечены. Старинные прописи собраны в разделе <a href="#/heritage">«Наследие»</a>; те, что вы повторили в котелке, перечислены в конце книги с меткой ${legacyMark(true)}.</p>
      <p class="hint">Сварено: ${done}</p>
      <h2>Сборы из учебника</h2>
      <div class="book-grid">${BLENDS.map((b) => `<div class="card recipe ${book["blend:" + b.id] ? "done" : ""}">
        <h3><a class="stretch" href="#/book/blend:${b.id}">${b.ru}</a>${book["blend:" + b.id] ? `<span class="done-mark">сварено</span>` : ""}</h3>
        <p class="muted" style="margin:.2em 0">${b.goal}</p>
        <div class="herbs">${b.items.map((id) => `<a class="chip" href="#/plant/${id}">${byId[id].ru}</a>`).join("")}</div>
        <p class="prose" style="font-size:.92rem">${b.why} ${cite(b.src)}</p>
        <div class="btn-row"><a class="btn small ghost" href="#/sim/free/blend:${b.id}">${ICON("flask")} Приготовить в симуляторе</a><a class="btn small ghost" href="#/pot/blend:${b.id}">${ICON("pot")} Сварить в котелке</a></div></div>`).join("")}
        ${(window.K3?.species || []).map((s, i) => [s, i]).filter(([s]) => s.composition?.length >= 3 && s.composition.every((c) => c.parts && /%/.test(c.parts))).map(([s, i]) => `<div class="card recipe">
          <h3><a class="stretch" href="#/book/k3:${i}">${esc(s.name)}</a></h3><p class="muted" style="margin:.2em 0">${esc(s.use)}</p>
          <div class="formula">${s.composition.map((c) => `<div class="row"><span>${C.fLat(c)}</span><span>${esc(c.parts)}</span></div>`).join("")}</div>
          ${cite(s.s)}</div>`).join("")}
      </div>
      ${DISEASES.map((sys) => byCond[sys.id] ? `<h2>${sys.ru}</h2><div class="book-grid">${byCond[sys.id].sort((a, b) => diseaseIndex[a[1].cond].ru.localeCompare(diseaseIndex[b[1].cond].ru, "ru")).map(([k, r]) => {
        const m = POT_METHODS.find((x) => x.id === r.method), b = book[k];
        return `<div class="card recipe ${b ? "done" : ""}"><h3><a class="stretch" href="#/book/${encodeURIComponent(k)}">${m.ru}: ${lc1(diseaseIndex[r.cond].ru)}</a>${b ? `<span class="done-mark">сварено</span>` : ""}</h3>
          <div class="meta-line"><i>${m.lat}</i> · ${m.desc} ${C.icd(r.cond)}</div>
          <div class="herbs">${[...r.herbs].map((id) => `<a class="chip" href="#/plant/${id}">${byId[id].ru}</a>`).join("")}</div>
          ${b ? `<p class="hint">Вы варили: ${b.herbs.map(ingName).join(", ")}</p>` : ""}</div>`;
      }).join("")}</div>` : "").join("")}
      <h2>${legacyMark()} Повторённые в котелке</h2>
      <p class="hint">Это не рекомендации к лечению, а история фармации. Всего в котелке можно повторить ${legacyAll().length} старинных рецептов; список с отметками есть в котелке на полке <a href="#/pot">«Рецепты»</a>.</p>
      <div class="book-grid">${legacyAll().filter((m) => book["legacy:" + m.id]).map((m) => `<div class="card recipe done"><h3>${legacyMark(true)}<a class="stretch" href="#/heritage/${m.id}">${esc(m.ru)}</a><span class="done-mark">сварено</span></h3>
        <div class="meta-line">${legacyMeta(m)}</div>
        <div class="herbs">${PX.legacy[m.id].ing.map((id) => byId[id] || PAGE_OF[id] ? `<a class="chip" href="#/plant/${(byId[id] || PAGE_OF[id]).id}">${byId[id] ? byId[id].ru : esc(ingName(id))}</a>` : `<span class="chip">${esc(ingName(id))}</span>`).join("")}</div>
        <p class="hint"><a href="#/heritage/${m.id}">Открыть в «Наследии»</a></p></div>`).join("") || `<p class="muted">Пока ни одного. Попробуйте, например, повторить глазную мазь Бальда.</p>`}</div>`;
  });
})();
