/* Режим провизора: задания вне аптечного стола.
   Приёмка сырья по фото (фото iNaturalist, признаки по учебнику), лабораторный контроль качественными реакциями,
   консультации посетителей. Данные реакций и случаев: js/simdata.js (window.SIMX). */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, D, byId, store, cite, shuffle } = C;
  const ICON = window.ICON;
  const { PLANTS } = D;
  const X = store.get("simx", { photo: {}, lab: {}, case: {} });
  const save = () => store.set("simx", X);
  const back = `<a class="back" href="#/sim">${ICON("back")} Провизор</a>`;
  const AB = "АБВГДЕ";
  const T = (id) => window.TEXTS?.plants?.[id] || {};
  const photosOf = (id) => window.INAT?.plants?.[id]?.photos || [];
  const credit = (ph) => `${esc(ph.caption || "")}. Фото: ${esc(ph.author)}, ${ph.license_url ? `<a href="${ph.license_url}" target="_blank" rel="noopener">${esc(ph.license)}</a>` : esc(ph.license)}, <a href="${ph.obs_url}" target="_blank" rel="noopener">наблюдение iNaturalist</a>`;
  const nextBtn = (key) => { const nx = C.course?.next(key); return nx ? `<a class="btn" href="${nx.href}">Дальше по пути: ${esc(nx.title)}</a>` : ""; };
  const pathKey = (mode, lv) => `t:${mode}${lv}`;

  // Похожие растения: с чем путают при заготовке (общий список с симулятором)
  const LOOK = { plantain_lanc: "plantain_major", plantain_major: "plantain_lanc", bearberry: "lingonberry", lingonberry: "bearberry", peppermint: "melissa", melissa: "peppermint", chamomile: "calendula", calendula: "helichrysum", oak: "frangula", guelder: "elder", tormentil: "polygonum", valerian: "yarrow", thyme_wild: "origanum", origanum: "thyme_wild", stjohns: "helichrysum", yarrow: "capsella", wormwood: "yarrow", linden: "elder", elder: "guelder", caraway: "yarrow", flax: "chamomile", sage: "melissa", nettle: "leonurus", leonurus: "nettle", birch: "pinus", pinus: "birch", horsetail: "polygonum", polygonum: "horsetail", dandelion: "tussilago", tussilago: "dandelion", bilberry: "lingonberry", hawthorn: "rosa", rosa: "hawthorn", althaea: "inula", inula: "tussilago", bidens: "tussilago", frangula: "oak", helichrysum: "tussilago", capsella: "yarrow" };

  // ---------- 1. Приёмка сырья по фото ----------
  // Уровень 1: какое это растение (русские названия). Уровень 2: латинское название сырья и заготавливаемая часть.
  const PARTS_LAT = { folium: "листья", flos: "цветки", herba: "трава", radix: "корни", cortex: "кора", fructus: "плоды", semen: "семена", rhizoma: "корневища", gemmae: "почки" };
  // Части, которые у этого растения тоже бывают официнальным сырьём: их не даём неверными вариантами
  // (корневища валерианы входят в её сырьё; трава, листья и цветки алтея и корни и трава крапивы описаны как сырьё в монографиях EMA)
  const ALSO = { valerian: ["rhizoma", "radix"], althaea: ["herba", "folium", "flos"], nettle: ["radix", "herba"], elder: ["fructus"], tormentil: ["radix"] };
  const latParts = (p) => {
    // только простые названия «основа + одна часть»; составные (cum, et, «/») в этот шаг не берём
    const m = p.drug.lat.match(/^(\S+(?: \S+)?) (folium|flos|flores|herba|radix|cortex|fructus|semen|rhizoma)$/);
    if (!m || /\b(cum|et)\b|\//.test(p.drug.lat)) return null;
    const right = m[2], base = right === "flores" ? "flos" : right;
    const pool = shuffle(Object.keys(PARTS_LAT).filter((x) => x !== base && x !== "gemmae" && !(ALSO[p.id] || []).includes(x))).slice(0, 3);
    return { stem: m[1], right, opts: shuffle([right, ...pool]) };
  };
  function photo(lv) {
    lv = lv === "2" ? "2" : "1";
    const N = 8, pool = shuffle(PLANTS.filter((p) => photosOf(p.id).length));
    const rounds = pool.slice(0, N).map((p) => {
      const look = byId[LOOK[p.id]] && photosOf(LOOK[p.id]).length ? byId[LOOK[p.id]] : null;
      const others = shuffle(PLANTS.filter((x) => x.id !== p.id && x !== look)).slice(0, look ? 2 : 3);
      return { p, ph: shuffle(photosOf(p.id))[0], opts: shuffle([p, ...(look ? [look] : []), ...others]), look, lat: lv === "2" ? latParts(p) : null };
    });
    let k = 0, right = 0, streak = 0, best = 0;
    const head = () => `${back}<p class="kicker">Приёмка сырья · ${lv === "2" ? "по латинским названиям" : "по внешнему виду"} · партия ${k + 1} из ${N}</p>
      <div class="score-line"><span>Принято верно: <b>${right}</b></span><span>Серия: <b>${streak}</b></span></div>`;
    const label = (p) => (lv === "2" ? `<i>${esc(p.lat)}</i>` : `${esc(p.ru)} <i class="muted">${esc(p.lat)}</i>`);
    const show = () => {
      if (k >= N) return end();
      const r = rounds[k];
      app.innerHTML = `${head()}<div class="sim"><div class="card stage">
        <p class="verdict">Поступила партия от сборщика</p>
        <h2 style="margin-top:.1em">Какое растение собрано?</h2>
        <figure class="ph-q"><img src="${r.ph.file}" alt="Растение для определения" loading="eager"></figure>
        <div class="opts" id="po">${r.opts.map((p, i) => `<button class="opt" type="button" data-id="${p.id}"><span class="k">${AB[i]}</span>${label(p)}</button>`).join("")}</div>
        <div id="pfb"></div></div></div>`;
      $("#po").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || b.disabled) return;
        const ok = b.dataset.id === r.p.id;
        $$("#po .opt").forEach((x) => { x.disabled = true; if (x.dataset.id === r.p.id) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        const id = T(r.p.id).ident || [];
        const wrongP = ok ? null : byId[b.dataset.id];
        const lookTxt = r.look && (wrongP?.id === r.look.id || ok) ? (T(r.look.id).ident || [])[0] : null;
        const fb = (part) => `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : "Неверно."}</b> Это ${esc(r.p.ru.toLowerCase())} (<i>${esc(r.p.lat)}</i>).
          ${id.slice(0, 2).map((x) => `<p>${x.t} ${cite(x.s)}</p>`).join("")}
          ${lookTxt && r.look.id !== r.p.id ? `<p class="hint">Чем отличается ${esc(r.look.ru.toLowerCase())}: ${lookTxt.t} ${cite(lookTxt.s)}</p>` : ""}
          ${part || ""}
          <p class="ph-credit">${credit(r.ph)}</p>
          <div class="btn-row"><button class="btn" id="pn" type="button">${k + 1 < N ? "Следующая партия" : "Итог приёмки"}</button></div></div>`;
        const finish = (score, part) => {
          if (score) { right++; streak++; best = Math.max(best, streak); } else streak = 0;
          window.MUSIC?.sfx(score ? "plop" : "bad");
          $("#pfb").innerHTML = fb(part);
          $("#pn").addEventListener("click", () => { k++; show(); });
        };
        if (!ok || !r.lat) return finish(ok);
        // Второй шаг на уровне 2: какая часть растения идёт в аптеку
        $("#pfb").innerHTML = `<div class="feedback good"><b>Растение определено.</b> Какое сырьё этого растения описано в справочнике?</div>
          <div class="opts" id="pl">${r.lat.opts.map((x, i) => `<button class="opt" type="button" data-p="${x}"><span class="k">${AB[i]}</span><i>${esc(r.lat.stem)} ${x}</i></button>`).join("")}</div>`;
        $("#pl").addEventListener("click", (e2) => {
          const b2 = e2.target.closest(".opt"); if (!b2 || b2.disabled) return;
          const ok2 = b2.dataset.p === r.lat.right;
          $$("#pl .opt").forEach((x) => { x.disabled = true; if (x.dataset.p === r.lat.right) x.classList.add("right"); });
          if (!ok2) b2.classList.add("wrong");
          finish(ok2, `<p><b>Сырьё: <i>${esc(r.p.drug.lat)}</i></b> — ${esc(r.p.drug.ru.toLowerCase())}. ${Object.entries(PARTS_LAT).map(([l, ru]) => `<i>${l}</i> — ${ru}`).join(", ")} (<i>flores</i> — множественное число от <i>flos</i>). Верный ответ дан по справочнику приложения; у некоторых растений официнальным бывает и другое сырьё.</p>`);
        });
      });
    };
    const end = () => {
      const passed = right >= 6;
      X.photo[lv] = Math.max(X.photo[lv] || 0, right); save();
      window.MUSIC?.sfx(passed ? "good" : "bad");
      app.innerHTML = `${back}<div class="card"><p class="verdict">Приёмка закрыта</p><h2 style="margin-top:.1em">${right} из ${N} партий определено верно</h2>
        <div class="score-line"><span>Лучшая серия: <b>${best}</b></span><span>Рекорд: <b>${X.photo[lv]}</b></span></div>
        <p>${passed ? "Засчитано в пути провизора." : "Чтобы приёмка засчиталась, нужно не меньше 6 верных партий из 8."} Признаки растений по учебнику фармакогнозии ${cite([{ id: "karpuk", loc: "описания сырья" }])}; фотографии с iNaturalist, под каждой автор и лицензия.</p>
        <div class="btn-row"><a class="btn${passed ? " ghost" : ""}" href="#/sim/photo/${lv}?r=${Date.now()}">Новая приёмка</a>${passed ? nextBtn(pathKey("photo", lv)) : ""}<a class="btn ghost" href="#/sim">К пути провизора</a></div></div>`;
    };
    show();
  }

  // ---------- 2. Контрольная лаборатория: качественные реакции ----------
  // Неизвестная партия — одно из нескольких видов сырья. Реактивов хватает на ограниченное число проб;
  // результат пробы выводится из классов веществ сырья (TEXTS.tags) с поправками по учебнику (SIMX.plantOverrides).
  const SX = () => window.SIMX || { tests: [], plantOverrides: {}, cases: [] };
  const tagsOf = (id) => (byId[id] ? C.tagsOf(byId[id]) : []);
  const txt = (x) => (x == null ? "" : typeof x === "string" ? x : x.t || "");
  const src = (x) => (x && typeof x === "object" && x.s ? cite(x.s) : "");
  // Результат пробы: поправка по учебнику (plantOverrides) → класс веществ сырья → неспецифичная реакция (alsoPos)
  function resultOf(pid, t) {
    const tags = tagsOf(pid), det = [].concat(t.detects || []);
    const o = SX().plantOverrides?.[pid]?.[t.id];
    let pos = o === "pos" || o === true || det.some((d) => tags.includes(d)), note = null, also = false;
    if (o === "neg" || o === false) pos = false;
    if (o) note = SX().overrideNotes?.[pid]?.[t.id] || null;
    if (!pos && t.alsoPos && (t.alsoPos.tags || []).some((x) => tags.includes(x))) { pos = true; also = true; }
    const v = pos && !also ? (t.pos?.variants || []).findIndex((x) => (x.when || []).includes(pid)) : -1;
    return { pos, variant: v >= 0 ? v : null, note, also };
  }
  const resKey = (r) => (r.pos ? "+" + (r.variant ?? "") + (r.also ? "a" : "") : "-");
  const resText = (t, r) => {
    if (!r.pos) return { t: txt(t.neg) || "Реакция отрицательная.", s: t.neg?.s || t.negS };
    if (r.also) return { t: txt(t.alsoPos), s: t.alsoPos.s };
    const v = r.variant != null ? t.pos.variants[r.variant] : null;
    const base = v ? { t: v.t, s: v.s } : { t: txt(t.pos), s: t.pos?.s };
    if (r.note) return { t: base.t + " " + r.note.t, s: [...(base.s || []), ...(r.note.s || [])] };
    return base;
  };
  // Короткая подпись варианта для таблицы: первая фраза, не длиннее 48 знаков
  const LABELS = { "Столбики пены в кислой и щелочной": "пена равная: тритерпеновые сапонины" };
  const shortV = (v) => { if (v.label) return v.label; const L0 = Object.keys(LABELS).find((k) => v.t.startsWith(k)); if (L0) return LABELS[L0]; let x = v.t.split(/[.;(]| — |: (?=\D)/)[0].trim(); if (x.length > 48) x = x.slice(0, 48).replace(/\s+\S*$/, "") + "…"; return x; };
  const LAB = { 1: { n: 3, budget: 3, rounds: 5, ru: "Контрольная лаборатория" }, 2: { n: 4, budget: 2, rounds: 5, ru: "Контрольная лаборатория: экономия реактивов" } };
  function makeLabRound(lv) {
    const tests = SX().tests || [];
    const P = PLANTS.filter((p) => tests.some((t) => resultOf(p.id, t).pos));
    for (let tries = 0; tries < 200; tries++) {
      const u = P[Math.floor(Math.random() * P.length)];
      const look = lv === 2 && byId[LOOK[u.id]] ? [byId[LOOK[u.id]]] : [];
      const cands = shuffle([u, ...look, ...shuffle(P.filter((x) => x !== u && !look.includes(x))).slice(0, LAB[lv].n - 1 - look.length)]);
      // каждого кандидата должна отличать от неизвестной хотя бы одна проба
      const sig = (id) => tests.map((t) => resKey(resultOf(id, t)));
      const su = sig(u.id);
      // и хватило бы бюджета: есть набор из budget проб, отличающий неизвестную от всех кандидатов
      const others = cands.filter((c) => c !== u).map((c) => sig(c.id));
      const sep = (idx) => others.every((o) => idx.some((i) => o[i] !== su[i]));
      const n = tests.length, B = LAB[lv].budget;
      let ok = false;
      const rec = (start, idx) => { if (ok) return; if (idx.length && sep(idx)) { ok = true; return; } if (idx.length === B) return; for (let i = start; i < n; i++) rec(i + 1, [...idx, i]); };
      rec(0, []);
      if (ok) return { u, cands };
    }
    return null;
  }
  function lab(lv) {
    lv = lv === "2" ? 2 : 1;
    const L = LAB[lv], tests = SX().tests || [];
    if (!tests.length) { app.innerHTML = `${back}<p class="muted">Данные лаборатории не загружены.</p>`; return; }
    let k = 0, right = 0, used = 0;
    const play = () => {
      if (k >= L.rounds) return end();
      const R = makeLabRound(lv); if (!R) return end();
      const done = {};
      const render = () => {
        const left = L.budget - Object.keys(done).length;
        app.innerHTML = `${back}<p class="kicker">${L.ru} · партия ${k + 1} из ${L.rounds} · верно ${right}</p>
          <div class="sim"><div class="card stage"><p class="verdict">Неизвестная партия сырья</p>
          <h2 style="margin-top:.1em">Что это за сырьё?</h2>
          <p>По накладной партия может быть одним из видов сырья ниже. Реактивов хватит на <b>${L.budget}</b> пробы; осталось <b>${left}</b>. Выберите реакции, которые разделят кандидатов, затем определите сырьё.</p>
          <div class="lab-cands">${R.cands.map((c) => `<span class="lab-cand"><b>${esc(c.drug.ru)}</b><i>${esc(c.drug.lat)}</i><span class="muted">${tagsOf(c.id).slice(0, 4).map(esc).join(", ")}</span></span>`).join("")}</div>
          <h4>Реакции</h4>
          <div class="lab-tests" id="lt">${tests.map((t) => {
            const r = done[t.id];
            return `<button class="lab-test ${r ? (r.pos ? "pos" : "neg") : ""}" type="button" data-t="${t.id}" ${r || !left ? "disabled" : ""}>
              <b>${esc(t.ru)}</b><span>${esc(t.short || "")}</span>${r ? `<span class="lab-res">${r.pos ? "положительная" : "отрицательная"}: ${esc(resText(t, r).t)}</span>` : ""}</button>`;
          }).join("")}</div>
          <h4>Заключение</h4>
          <div class="opts" id="lo">${R.cands.map((c, i) => `<button class="opt" type="button" data-id="${c.id}"><span class="k">${AB[i]}</span>${esc(c.drug.ru)} <i class="muted">${esc(c.drug.lat)}</i></button>`).join("")}</div>
          <div id="lfb"></div></div></div>`;
        $("#lt").addEventListener("click", (e) => {
          const b = e.target.closest(".lab-test"); if (!b || b.disabled) return;
          const t = tests.find((x) => x.id === b.dataset.t); done[t.id] = resultOf(R.u.id, t); used++;
          window.MUSIC?.sfx("bubble"); render();
        });
        $("#lo").addEventListener("click", (e) => {
          const b = e.target.closest(".opt"); if (!b || b.disabled) return;
          const ok = b.dataset.id === R.u.id;
          // засчитываем только доказанный ответ: поставленные пробы должны отличать партию от каждого другого кандидата
          const ranIds = Object.keys(done);
          const proven = R.cands.filter((c) => c !== R.u).every((c) => ranIds.some((id) => { const t = tests.find((x) => x.id === id); return resKey(resultOf(c.id, t)) !== resKey(done[id]); }));
          if (ok && proven) right++;
          $$("#lo .opt").forEach((x) => { x.disabled = true; if (x.dataset.id === R.u.id) x.classList.add("right"); });
          $$("#lt .lab-test").forEach((x) => (x.disabled = true));
          if (!ok) b.classList.add("wrong");
          window.MUSIC?.sfx(ok ? "plop" : "bad");
          const ran = Object.keys(done).length;
          const useful = tests.filter((t) => new Set(R.cands.map((c) => resKey(resultOf(c.id, t)))).size > 1);
          $("#lfb").innerHTML = `<div class="feedback ${ok && proven ? "good" : "bad"}"><b>${ok ? (proven ? "Верно и доказано." : "Угадано, но не доказано: не засчитано.") : "Неверно."}</b> Партия: ${esc(R.u.drug.ru.toLowerCase())} (<i>${esc(R.u.drug.lat)}</i>), ведущие вещества: ${tagsOf(R.u.id).map(esc).join(", ")}.
            ${ok && !proven ? `<p class="hint">${ran ? "Поставленные пробы не исключили всех остальных кандидатов." : "Заключение без единой пробы — догадка, а не анализ."} Партия засчитывается, только когда результаты проб отличают её от каждого другого вида сырья.</p>` : ""}
            <p>Ожидаемые результаты для всех кандидатов (реакции, которые их различают):</p>
            <div class="tbl-wrap"><table class="lab-tbl"><thead><tr><th>Реакция</th>${R.cands.map((c) => `<th>${esc(c.drug.ru)}</th>`).join("")}</tr></thead>
            <tbody>${useful.map((t) => `<tr><td>${esc(t.ru)}</td>${R.cands.map((c) => { const r = resultOf(c.id, t); return `<td class="${r.pos ? "pos" : "neg"}">${r.pos ? "+" : "−"}${r.pos && r.variant != null ? ` <span class="muted">${esc(shortV(t.pos.variants[r.variant]))}</span>` : r.also ? ` <span class="muted">неспецифично</span>` : ""}</td>`; }).join("")}</tr>`).join("")}</tbody></table></div>
            ${Object.keys(done).map((id) => { const t = tests.find((x) => x.id === id); return `<p><b>${esc(t.ru)}.</b> ${esc(txt(t.how))} ${src(t.how)} ${esc(resText(t, done[id]).t)} ${cite(resText(t, done[id]).s || [])}${t.lesson ? ` <a href="#/sim/chem/${t.lesson}">Урок о веществах</a>` : ""}</p>`; }).join("")}
            <div class="btn-row"><button class="btn" id="ln" type="button">${k + 1 < L.rounds ? "Следующая партия" : "Итог"}</button></div></div>`;
          $("#ln").addEventListener("click", () => { k++; play(); });
        });
      };
      render();
    };
    const end = () => {
      const passed = right >= 4;
      X.lab[lv] = Math.max(X.lab[lv] || 0, right); save();
      window.MUSIC?.sfx(passed ? "good" : "bad");
      app.innerHTML = `${back}<div class="card"><p class="verdict">Лаборатория закрыта</p><h2 style="margin-top:.1em">${right} из ${L.rounds} партий определено</h2>
        <div class="score-line"><span>Проб поставлено: <b>${used}</b></span><span>Рекорд: <b>${X.lab[lv]}</b></span></div>
        <p>${passed ? "Засчитано в пути провизора." : "Чтобы лаборатория засчиталась, нужно доказательно определить не меньше 4 партий из 5: верный ответ засчитывается, только если поставленные пробы исключают остальных кандидатов."}</p>
        <div class="btn-row"><a class="btn${passed ? " ghost" : ""}" href="#/sim/lab/${lv}?r=${Date.now()}">Новые партии</a>${passed ? nextBtn(pathKey("lab", lv)) : ""}<a class="btn ghost" href="#/sim">К пути провизора</a></div></div>`;
    };
    play();
  }

  // ---------- 3. Консультации посетителей ----------
  function consult(lv) {
    lv = lv === "2" ? 2 : 1;
    const all = (SX().cases || []).filter((c) => (lv === 1 ? (c.level || 1) <= 2 : (c.level || 1) >= 2));
    if (!all.length) { app.innerHTML = `${back}<p class="muted">Случаи консультаций не загружены.</p>`; return; }
    const list = shuffle(all).slice(0, 5); let k = 0, right = 0;
    const show = () => {
      if (k >= list.length) return end();
      const c = list[k], d = c.cond && C.diseaseIndex[c.cond];
      const opts = shuffle(c.options.map((o, i) => ({ ...o, i })));
      app.innerHTML = `${back}<p class="kicker">Консультации · посетитель ${k + 1} из ${list.length} · верно ${right}</p>
        <div class="sim"><div class="card stage"><p class="verdict">${esc(c.who || "Посетитель")}</p>
        <p class="case-story">${esc(c.story)}</p>
        <p>Что вы ответите?</p>
        <div class="opts" id="co">${opts.map((o, j) => `<button class="opt" type="button" data-i="${o.i}"><span class="k">${AB[j]}</span><span>${esc(o.t)}</span></button>`).join("")}</div>
        <div id="cfb"></div></div></div>`;
      $("#co").addEventListener("click", (e) => {
        const b = e.target.closest(".opt"); if (!b || b.disabled) return;
        const o = c.options[+b.dataset.i], ok = !!o.ok; if (ok) right++;
        $$("#co .opt").forEach((x) => { x.disabled = true; if (c.options[+x.dataset.i].ok) x.classList.add("right"); });
        if (!ok) b.classList.add("wrong");
        window.MUSIC?.sfx(ok ? "plop" : "bad");
        $("#cfb").innerHTML = `<div class="feedback ${ok ? "good" : "bad"}"><b>${ok ? "Верно." : "Неверно."}</b>${d ? ` <span class="meta-line">Тема: ${esc(d.ru)} ${C.icd ? C.icd(d.id) : ""}</span>` : ""}
          ${opts.map((x) => `<p class="case-why ${x.ok ? "ok" : ""}"><b>${x.ok ? "Верно" : "Неверно"}: ${esc(x.t.charAt(0).toLowerCase() + x.t.slice(1))}.</b> ${esc(txt(x.why))} ${src(x.why)}${x.plant && byId[x.plant] ? ` <a href="#/plant/${x.plant}">${esc(byId[x.plant].ru)}</a>` : ""}</p>`).join("")}
          ${c.lesson ? `<p><a href="#/sim/chem/${c.lesson}">Урок по теме</a></p>` : ""}
          <div class="btn-row"><button class="btn" id="cn" type="button">${k + 1 < list.length ? "Следующий посетитель" : "Итог"}</button></div></div>`;
        $("#cn").addEventListener("click", () => { k++; show(); });
      });
    };
    const end = () => {
      const need = Math.min(4, list.length), passed = right >= need;
      X.case[lv] = Math.max(X.case[lv] || 0, right); save();
      window.MUSIC?.sfx(passed ? "good" : "bad");
      app.innerHTML = `${back}<div class="card"><p class="verdict">Приём закрыт</p><h2 style="margin-top:.1em">${right} из ${list.length} консультаций верно</h2>
        <p>${passed ? "Засчитано в пути провизора." : `Чтобы приём засчитался, нужно не меньше ${need} верных ответов.`} Провизор не ставит диагноз: при тревожных признаках, у детей, беременных и при приёме лекарств с узким терапевтическим окном посетителя направляют к врачу.</p>
        <div class="btn-row"><a class="btn${passed ? " ghost" : ""}" href="#/sim/case/${lv}?r=${Date.now()}">Новые посетители</a>${passed ? nextBtn(pathKey("case", lv)) : ""}<a class="btn ghost" href="#/sim">К пути провизора</a></div></div>`;
    };
    show();
  }

  C.simx = { photo, lab, case: consult, back, X, save, credit, nextBtn, pathKey, LOOK };
  C.simxProgress = () => X;
})();
