/* Наследие: исторические фармакопейные сборы, народные смеси и старинные травники, рецепты, проверенные наукой, исторические аптеки. */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, norm, byId, cite, items, store } = C;
  const CN = { pl: "Польша", de: "Германия", sk: "Словакия", by: "Беларусь", lt: "Литва", cz: "Чехия", at: "Австрия", ua: "Украина", ru: "Российская империя", su: "СССР", en: "Англия", hr: "Хорватия", es: "Испания", gb: "Великобритания", uk: "Великобритания", ch: "Швейцария", hu: "Венгрия", it: "Италия", fr: "Франция", eu: "Европа", cs: "Чехословакия", al: "Албания" };
  const TABS = [
    ["official", "Аптечные сборы", "Прописи фармакопей и аптечные чаи"],
    ["folk", "Народные смеси", "Записанные этнографами и в старинных травниках"],
    ["science", "Проверено наукой", "Старинные рецепты, которые изучали современные исследователи"],
    ["places", "Аптеки и места", "Исторические аптеки региона"],
  ];
  const tabOf = (m) => (m.modern ? "science" : ["folk", "herbal"].includes(m.kind) ? "folk" : "official");
  const all = () => {
    const L = window.LEGACY || {};
    return [...(L.mixtures || []), ...(L.remedies || [])];
  };
  // Письменная традиция: фармакопеи, травники, рукописные лечебники; устная: записано от людей в полевых исследованиях
  const tradOf = (m) => m.trad || window.ETHNO?.tradOf?.[m.id] || (m.kind === "folk" ? "oral" : "written");
  const TRAD = { written: "Письменная традиция", oral: "Устная традиция" };
  const country = (c) => CN[c] || (c ? c.toUpperCase() : "");
  // Место издания фармакопей — по выходным данным источника (Berolini, Bern, Vindobonae, Petropoli, Warszawa)
  const SRC_PLACE = { ph_phg1872: "Берлин", ph_dab5: "Берлин", ph_helv4: "Берн", ph_austr8: "Вена", ph_ross1782: "Санкт-Петербург", ph_umb_fpx: "Варшава" };
  const ROMAN = (n) => ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"][n] || "";
  // Происхождение записи: «место, страна, время» — так точно, как позволяет источник
  const originOf = (m) => {
    const pl = m.place_id && window.LEGACY?.places?.find((x) => x.id === m.place_id);
    const place = m.region || m.place || m.where || SRC_PLACE[(m.s || [])[0]?.id] || pl?.where || "";
    const cn = country(m.country);
    let time = m.edition || m.period || m.date || "";
    const y = time.match(/\b(1[0-9]{3}|20[0-9]{2})\b/);
    if (y && !/в\.|век/.test(time)) time += ` (${ROMAN(Math.ceil(+y[1] / 100))} в.)`;
    return [place, cn && !place.includes(cn) ? cn : "", time].filter(Boolean).join(", ");
  };
  C.originOf = originOf;

  function formula(m) {
    if (!m.composition?.length) return "";
    return `<div class="formula">${m.lat ? `<div class="rp">Rp.: ${esc(m.lat)}</div>` : ""}${m.composition.map((c) => {
      const p = c.plant_id && byId[c.plant_id];
      const lat = c.lat && c.lat !== "—" ? c.lat : "";
      const name = C.fLat(c);
      const long = (c.parts || "").length >= 16;
      return `<div class="row ${long ? "long" : ""}"><span>${p ? `<a href="#/plant/${p.id}">${name}</a>` : name}</span><span class="${(c.parts || "").length < 16 ? "nw" : ""}">${esc(c.parts && c.parts !== "null" ? c.parts : "")}</span></div>`;
    }).join("")}</div>`;
  }
  function card(m) {
    const meta = originOf(m);
    const src = m.s || m.text?.[0]?.s;
    const vk = !m.verdict ? "" : /опасн/i.test(m.verdict) ? "danger" : /^не /i.test(m.verdict) ? "hist" : /частич/i.test(m.verdict) ? "ema" : "text";
    const verdict = m.verdict ? `<span class="badge ${vk}">${esc(m.verdict)}</span>` : "";
    return `<article class="card" id="h-${m.id}">
      <div class="mix-head"><h3>${C.legacyMark(true)}<a href="#/heritage/${m.id}">${esc(m.ru)}</a></h3>${verdict}</div>
      ${m.orig || (m.lat && !m.composition) ? `<div class="muted"><i>${esc(m.orig || m.lat)}</i></div>` : ""}
      <div class="meta-line">${esc(meta)} · <span class="muted">${TRAD[tradOf(m)].toLowerCase()}</span></div>
      ${m.text ? items(m.text) : ""}
      ${formula(m)}
      ${m.use ? `<p class="prose"><b style="font-family:var(--f-ui)">Применяли:</b> ${esc(m.use)} ${cite(src)}</p>` : ""}
      ${m.prep ? `<p class="prose"><b style="font-family:var(--f-ui)">Приготовление:</b> ${esc(m.prep)}</p>` : ""}
      ${m.modern?.length ? `<h4>Что показали исследования</h4>${items(m.modern)}` : ""}
      ${m.caution ? `<p class="caution">${esc(m.caution)}</p>` : ""}
      ${m.note ? `<p class="hint">${esc(m.note)}</p>` : ""}
      ${window.POTX?.legacy?.[m.id]?.ok ? `<p class="hint">Этот состав можно повторить в <a href="#/pot/legacy:${m.id}">котелке</a>${window.POTX.legacy[m.id].method === "water" ? "" : `, способ: ${({ mac: "мацерация (настаивание)", ung: "мазь", mix: "сбор (смешение)" })[window.POTX.legacy[m.id].method]}`}.</p>` : ""}
    </article>`;
  }
  function placeCard(p) {
    const mixes = all().filter((m) => m.place_id === p.id);
    return `<article class="card" id="h-${p.id}"><h3 style="margin-top:0"><a href="#/heritage/${p.id}">${esc(p.name)}</a></h3>
      <div class="meta-line">${esc([p.where, country(p.country), p.years].filter(Boolean).join(" · "))}</div>
      ${items(p.text)}
      ${mixes.length ? `<p class="hint">Составы: ${mixes.map((m) => `<a href="#/heritage/${m.id}">${esc(m.ru)}</a>`).join(", ")}</p>` : ""}</article>`;
  }

  // Как готовили и применяли: из записи наследия, иначе из проверенных дополнений (window.HIST.prep)
  const POT_RU = { water: "сбор, из которого готовят настой или отвар", mac: "мацерация (настаивание) в жидкости", ung: "мазь" };
  function howHtml(m, src, px) {
    const x = C.hist?.prep(m.id) || {};
    const prep = m.prep ? { t: m.prep, s: src } : x.prep, use = m.use ? { t: m.use, s: src } : x.use;
    const rows = [prep && `<p class="prose"><b class="lbl">Приготовление.</b> ${esc(prep.t)} ${cite(prep.s)}</p>`, use && `<p class="prose"><b class="lbl">Применение.</b> ${esc(use.t)} ${cite(use.s)}</p>`, x.note && `<p class="hint">${esc(x.note)}</p>`].filter(Boolean);
    if (!rows.length) rows.push(`<p class="hint">Способ приготовления и применения в источниках приложения не описан.</p>`);
    if (px?.ok) rows.push(`<p class="hint">В котелке приложения состав готовят как ${POT_RU[px.method] || "сбор"}: это учебная реконструкция, а не текст источника.</p>`);
    return `<h2>Как готовили и применяли</h2>${rows.join("")}`;
  }

  // ---------- Страница одного средства или аптеки ----------
  function potionPage(m, isPlace) {
    const tab = isPlace ? "places" : tabOf(m);
    store.set("herTab", tab);
    const back = `<a class="back" href="#/heritage">${ICON("back")} Наследие: ${TABS.find((x) => x[0] === tab)[1].toLowerCase()}</a>`;
    if (isPlace) {
      const mixes = all().filter((x) => x.place_id === m.id);
      app.innerHTML = `${back}<article class="card potion"><p class="kicker">Аптека или место</p><h1>${esc(m.name)}</h1>
        <div class="meta-line">${esc([m.where, country(m.country), m.years].filter(Boolean).join(" · "))}</div>${items(m.text)}
        ${mixes.length ? `<h2>Составы</h2><p>${mixes.map((x) => `<a href="#/heritage/${x.id}">${esc(x.ru)}</a>`).join(", ")}</p>` : ""}</article>`;
      return;
    }
    const meta = originOf(m);
    const src = m.s || m.text?.[0]?.s;
    const vk = !m.verdict ? "" : /опасн/i.test(m.verdict) ? "danger" : /^не /i.test(m.verdict) ? "hist" : /частич/i.test(m.verdict) ? "ema" : "text";
    const px = window.POTX?.legacy?.[m.id];
    const plants = [...new Set([...(m.plant_ids || []), ...(m.composition || []).map((c) => c.plant_id)].filter((id) => id && byId[id]))];
    const place = window.LEGACY.places?.find((p) => p.id === m.place_id);
    app.innerHTML = `${back}<article class="card potion">
      <p class="kicker">${C.legacyMark(true)}${{ science: "Старинный рецепт, проверенный наукой", folk: "Народная смесь или рецепт травника", official: "Аптечная пропись" }[tab]}</p>
      <h1>${esc(m.ru)}</h1>
      ${m.orig || m.lat ? `<p class="lead" style="margin:.2em 0">${C.latT ? C.latT(m.orig || m.lat) : `<i>${esc(m.orig || m.lat)}</i>`}</p>` : ""}
      <div class="meta-line">${esc(meta)} · ${TRAD[tradOf(m)].toLowerCase()}${m.verdict ? ` <span class="badge ${vk}">${esc(m.verdict)}</span>` : ""}</div>
      ${C.hist ? C.hist.block(m.id, { title: "История и первое описание" }) : ""}
      ${m.text ? `<h2>Описание</h2>${items(m.text)}` : ""}
      ${m.composition?.length ? `<h2>Состав</h2>${formula(m)}` : ""}
      ${howHtml(m, src, px)}
      ${m.modern?.length ? `<h2>Что показали исследования</h2>${items(m.modern)}` : ""}
      ${m.caution ? `<p class="caution">${esc(m.caution)}</p>` : ""}
      ${m.note ? `<p class="hint">${esc(m.note)}</p>` : ""}
      ${place ? `<p class="hint">Аптека: <a href="#/heritage/${place.id}">${esc(place.name)}</a></p>` : ""}
      ${plants.length ? `<h2>Растения справочника в составе</h2><div class="subs">${plants.map((id) => `<a class="chip" href="#/plant/${id}">${esc(byId[id].ru)}</a>`).join("")}</div>` : ""}
      ${px?.ok ? `<div class="btn-row"><a class="btn" href="#/pot/legacy:${m.id}">${ICON("pot")} Сварить в котелке</a></div>` : ""}
    </article>`;
  }

  C.page("heritage", function heritagePage(id) {
    const L = window.LEGACY;
    if (!L) { app.innerHTML = `<h1>Наследие</h1><p class="lead">Раздел готовится.</p>`; return; }
    const target = id && (all().find((m) => m.id === id) || (L.places || []).find((p) => p.id === id));
    if (target) return potionPage(target, (L.places || []).includes(target));
    let tab = store.get("herTab", "official");
    let q = "", cf = "", tf = store.get("herTrad", "");
    const year = (m) => +((String(m.edition || m.period || m.date || "").match(/1[0-9]{3}|20[0-9]{2}/) || [9999])[0]);
    const counts = { official: 0, folk: 0, science: 0, places: (L.places || []).length };
    all().forEach((m) => counts[tabOf(m)]++);
    app.innerHTML = `
      <h1>Наследие</h1>
      <p class="lead">Старинные европейские прописи и смеси: что в них входило, от чего их применяли и что о них известно сегодня. Это история фармации, а не рекомендации к лечению; составы приведены по источникам.</p>
      <div class="tabs" id="ht">${TABS.map(([k, t]) => `<button type="button" data-t="${k}" class="${k === tab ? "on" : ""}">${t} <span class="muted">${counts[k] || ""}</span></button>`).join("")}</div>
      <input class="search" id="hq" placeholder="Название, растение, страна, век" autocomplete="off" aria-label="Поиск в наследии">
      <div class="chips" id="htr" role="group" aria-label="Традиция">${[["", "Любая традиция"], ["written", TRAD.written], ["oral", TRAD.oral]].map(([k, t]) => `<button class="chip ${k === tf ? "on" : ""}" type="button" data-tr="${k}" title="${k === "written" ? "Фармакопеи, травники, рукописные лечебники" : k === "oral" ? "Записано от людей этнографами и в полевых исследованиях" : ""}">${t}</button>`).join("")}</div>
      <div class="chips" id="hc"></div>
      <p class="hint" id="hsub"></p>
      <div class="hist-grid" id="hl"></div>`;
    const render = () => {
      const qq = norm(q.trim());
      $("#hsub").textContent = TABS.find((x) => x[0] === tab)[2];
      if (tab === "places") {
        $("#hc").innerHTML = ""; $("#htr").hidden = true;
        const rz = L.rubiezewicze;
        const list = (L.places || []).filter((p) => !qq || norm(JSON.stringify(p)).includes(qq));
        $("#hl").innerHTML = list.map(placeCard).join("") || `<p class="muted">Ничего не нашлось.</p>`;
        if (rz && rz.found === false && !qq && rz.text?.length) $("#hl").insertAdjacentHTML("afterbegin", `<article class="card"><h3 style="margin-top:0">Рубежевичи</h3>${items(rz.text)}</article>`);
        return;
      }
      $("#htr").hidden = false;
      const inTab = all().filter((m) => tabOf(m) === tab && (!tf || tradOf(m) === tf));
      const cs = [...new Set(inTab.map((m) => m.country).filter(Boolean))];
      if (cf && !cs.includes(cf)) cf = "";
      $("#hc").innerHTML = cs.length > 1 ? `<button class="chip ${cf ? "" : "on"}" type="button" data-c="">Все</button>${cs.map((c) => `<button class="chip ${c === cf ? "on" : ""}" type="button" data-c="${c}">${country(c)}</button>`).join("")}` : "";
      const list = inTab.filter((m) => (!cf || m.country === cf) && (!qq || norm([C.ml(m.ru), m.lat, m.orig, m.use, m.region, m.edition, m.period, m.date, country(m.country), ...(m.composition || []).map((c) => c.lat + " " + c.ru)].join(" ")).includes(qq)));
      list.sort((a, b) => year(a) - year(b));
      $("#hl").innerHTML = list.map(card).join("") || `<p class="muted">Ничего не нашлось.</p>`;
    };
    render();
    $("#ht").addEventListener("click", (e) => {
      const b = e.target.closest("[data-t]"); if (!b) return;
      tab = b.dataset.t; store.set("herTab", tab); $$("#ht button").forEach((x) => x.classList.toggle("on", x === b)); render();
    });
    $("#htr").addEventListener("click", (e) => { const b = e.target.closest("[data-tr]"); if (!b) return; tf = b.dataset.tr; store.set("herTrad", tf); $$("#htr .chip").forEach((x) => x.classList.toggle("on", x === b)); render(); });
    $("#hc").addEventListener("click", (e) => { const b = e.target.closest("[data-c]"); if (!b) return; cf = b.dataset.c; render(); });
    $("#hq").addEventListener("input", (e) => { q = e.target.value; render(); });
  });
})();
