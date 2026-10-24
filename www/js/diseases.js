/* Болезни: система органов → болезнь → подтип, коды МКБ-10, клиническая справка, растения по уровню доказательности. */
(function () {
  const C = window.CORE;
  const { $, $$, app, esc, norm, D, diseaseIndex, descendants, diseasePath, plantsFor, cite, items, icd, countryChips, bindChips, flags, thumb, EV, store } = C;
  const { DISEASES, DISEASE_LAT, DISEASE_ICD, DISEASE_SYN, PLANTS } = D;
  const ICD_SRC = (id) => [{ id: "icd10", loc: DISEASE_ICD[id] ? "код " + DISEASE_ICD[id] : "" }];
  const INFO = [["def", "Определение"], ["etiology", "Этиология"], ["patho", "Патогенез"], ["symptoms", "Клиническая картина"], ["red_flags", "Когда нужен врач"], ["treatment", "Принципы лечения"], ["phyto", "Место фитотерапии"]];
  let evFilter = store.get("evFilter", "all");
  let open = new Set(store.get("dzOpen", []));

  const count = (id) => plantsFor(id).length;
  function matches(q) {
    if (!q) return null;
    const hit = new Set();
    for (const d of Object.values(diseaseIndex)) {
      const hay = norm([d.ru, DISEASE_LAT[d.id], DISEASE_ICD[d.id], DISEASE_SYN[d.id]].join(" "));
      if (hay.includes(q)) diseasePath(d.id).forEach((n) => hit.add(n.id));
    }
    return hit;
  }
  function navHtml(sel, q) {
    const hit = matches(q);
    const node = (n) => {
      if (hit && !hit.has(n.id)) return "";
      return `<li><a class="dz-item ${n.id === sel ? "on" : ""}" href="#/diseases/${n.id}">${n.ru}<span class="cnt">${count(n.id)}</span></a>
        ${n.children ? `<ul class="dz-list">${n.children.map(node).join("")}</ul>` : ""}</li>`;
    };
    const selSys = sel ? diseaseIndex[sel]?.sys : null;
    return DISEASES.map((s) => {
      if (hit && !hit.has(s.id)) return "";
      const isOpen = !!hit || open.has(s.id) || s.id === selSys;
      return `<div><button class="dz-sys" type="button" data-sys="${s.id}" aria-expanded="${isOpen}">${ICON("chev", "ico chev")}${s.ru}<span class="cnt">${count(s.id)}</span></button>
        <ul class="dz-list" ${isOpen ? "" : "hidden"}><li><a class="dz-item ${s.id === sel ? "on" : ""}" href="#/diseases/${s.id}">Весь раздел<span class="cnt">${DISEASE_ICD[s.id] || ""}</span></a></li>${(s.children || []).map(node).join("")}</ul></div>`;
    }).join("") || `<p class="muted" style="padding:8px">Ничего не нашлось.</p>`;
  }

  function overview(q) {
    const qq = norm(q.trim());
    if (qq.length >= 2) {
      const hit = Object.values(diseaseIndex).filter((d) => norm([d.ru, DISEASE_LAT[d.id], DISEASE_ICD[d.id], DISEASE_SYN[d.id]].join(" ")).includes(qq));
      const pl = PLANTS.filter((p) => norm([p.ru, p.lat, p.drug.ru, p.drug.lat].join(" ")).includes(qq));
      return `<div class="card"><h4 style="margin-top:0">Состояния</h4>${hit.map((d) => `<a class="res" href="#/diseases/${d.id}">${d.ru} <i class="muted">${DISEASE_LAT[d.id] || ""}</i><small>${DISEASE_ICD[d.id] || ""}</small></a>`).join("") || `<p class="muted">Нет совпадений.</p>`}
        ${pl.length ? `<h4>Растение: при каких состояниях применяют</h4>${pl.map((p) => `<div class="res" style="display:block">${C.nmA(`#/plant/${p.id}`, p.ru, p.lat, { b: true })}<div class="subs">${[...new Set(p.uses.map((u) => u.c))].map((c) => `<a class="chip" href="#/diseases/${c}">${diseaseIndex[c].ru}</a>`).join("")}</div></div>`).join("")}` : ""}</div>`;
    }
    return `<div class="card"><h2 style="margin-top:0">Как устроен раздел</h2>
      <p class="prose">Состояния сгруппированы по системам органов и снабжены кодами МКБ-10 ${cite([{ id: "icd10" }])}. Для каждого состояния даны определение, причины, механизм развития, признаки, при которых нужен врач, принципы лечения и место растительных средств. Ниже перечислены растения с пометкой уровня доказательности.</p>
      <div class="ev-legend">${Object.keys(EV).filter((k) => k !== "hist").map((k) => `<div><span class="badge ${k}">${EV[k]}</span>${C.EV_LONG[k]}</div>`).join("")}</div>
      <p class="prose">Фитотерапия в этом справочнике показана как вспомогательное средство при лёгких состояниях. Она не заменяет диагностику и лечение.</p></div>
      <div class="sys-grid">${DISEASES.map((s) => `<div class="card"><h3 style="margin-top:0"><a href="#/diseases/${s.id}">${s.ru}</a> <span class="icd">${DISEASE_ICD[s.id] || ""}</span></h3>
        ${(function leaves(n, d) { return (n.children || []).map((c) => `<a class="res" href="#/diseases/${c.id}" style="padding-left:${10 + d * 14}px">${c.ru}<small>${DISEASE_ICD[c.id] || ""}</small></a>${leaves(c, d + 1)}`).join(""); })(s, 0)}</div>`).join("")}</div>`;
  }

  function detail(id) {
    const d = diseaseIndex[id];
    const ids = new Set(descendants(id));
    const evs = evFilter === "all" ? null : [evFilter];
    const ps = plantsFor(id, { evs });
    const info = window.DINFO?.diseases?.[id];
    const order = { ema: 0, text: 1, ethno: 2 };
    const best = (p) => Math.min(...p.uses.filter((u) => ids.has(u.c)).map((u) => order[u.ev] ?? 3));
    ps.sort((a, b) => best(a) - best(b) || a.ru.localeCompare(b.ru, "ru"));
    return `<div class="card dz-head">
      <div class="crumbs"><button class="btn ghost small dz-mobile-pick" type="button" id="pick">${ICON("back")} Все разделы</button>${diseasePath(id).slice(0, -1).map((n) => `<a href="#/diseases/${n.id}">${n.ru}</a> /`).join(" ")}</div>
      <h2>${d.ru}</h2>
      <div class="meta">${DISEASE_LAT[id] ? `<i>${DISEASE_LAT[id]}</i>` : ""} ${DISEASE_ICD[id] ? `<span>МКБ-10: ${icd(id)} ${cite(ICD_SRC(id))}</span>` : ""}</div>
      ${d.note ? `<p class="caution">${d.note}</p>` : ""}
      ${d.children ? `<div class="subs">${d.children.map((c) => `<a class="chip" href="#/diseases/${c.id}">${c.ru} <span class="muted">${count(c.id)}</span></a>`).join("")}</div>` : ""}
      ${info ? INFO.filter(([k]) => info[k]?.length).map(([k, t]) => `<h4>${t}</h4>${k === "red_flags" ? `<div class="caution">${items(info[k])}</div>` : items(info[k])}`).join("") : ""}
    </div>
    <div class="card" style="margin-top:14px">
      <div class="numrow" style="justify-content:space-between"><h3 style="margin:0">Растения (${ps.length})</h3>
        <div class="seg" id="evf" role="group" aria-label="Уровень доказательности">${[["all", "Все"], ["ema", "EMA"], ["text", "Учебник"], ["ethno", "Народное"]].map(([k, t]) => `<button type="button" data-ev="${k}" class="${evFilter === k ? "on" : ""}">${t}</button>`).join("")}</div></div>
      ${countryChips()}
      ${ps.map((p) => `<div class="plant-row"><a class="thumb" href="#/plant/${p.id}" aria-hidden="true" tabindex="-1">${thumb(p)}</a><div>
        <h3>${C.nmA(`#/plant/${p.id}`, p.ru, p.drug.lat)} ${flags(p)}</h3>
        ${p.uses.filter((u) => ids.has(u.c) && (!evs || evs.includes(u.ev))).map((u) => `<p class="use ${u.ev}"><span class="badge ${u.ev}">${EV[u.ev]}</span>${u.c !== id ? `<span class="muted">${diseaseIndex[u.c].ru}: </span>` : ""}${u.t} ${cite(u.s)}</p>`).join("")}
        ${p.cautions.length ? `<details><summary class="hint" style="cursor:pointer">Предосторожности (${p.cautions.length})</summary>${p.cautions.map((c) => `<p class="caution">${c.t} ${cite(c.s)}</p>`).join("")}</details>` : ""}
      </div></div>`).join("") || `<p class="muted">Для выбранных фильтров растений нет.</p>`}
    </div>`;
  }

  C.page("diseases", function diseasesPage(id) {
    if (id && !diseaseIndex[id]) id = "";
    let q = "";
    app.innerHTML = `
      <h1>Болезни</h1>
      <p class="lead">Состояния по системам органов с кодами МКБ-10, клиническая справка и растения с пометкой уровня доказательности.</p>
      <div class="dz ${id ? "has-sel" : ""}">
        <aside class="card dz-nav">
          <input class="search" id="dq" placeholder="Болезнь, синоним, код МКБ, растение" autocomplete="off" aria-label="Поиск по болезням">
          <div id="dznav" style="margin-top:8px">${navHtml(id, "")}</div>
        </aside>
        <div class="dz-main" id="dzmain">${id ? detail(id) : overview("")}</div>
      </div>`;
    const bindMain = () => {
      $("#evf")?.addEventListener("click", (e) => {
        const b = e.target.closest("[data-ev]"); if (!b) return;
        evFilter = b.dataset.ev; store.set("evFilter", evFilter); $("#dzmain").innerHTML = detail(id); bindMain();
      });
      $("#pick")?.addEventListener("click", () => { location.hash = "#/diseases"; });
      bindChips(() => { $("#dzmain").innerHTML = detail(id); $("#dznav").innerHTML = navHtml(id, norm(q)); bindMain(); });
    };
    bindMain();
    $("#dq").addEventListener("input", (e) => {
      q = e.target.value; const qq = norm(q.trim());
      $("#dznav").innerHTML = navHtml(id, qq.length >= 2 ? qq : "");
      if (!id || qq.length >= 2) { $("#dzmain").innerHTML = overview(q); }
      else { $("#dzmain").innerHTML = detail(id); bindMain(); }
    });
    $("#dznav").addEventListener("click", (e) => {
      const b = e.target.closest("[data-sys]"); if (!b) return;
      const ul = b.nextElementSibling, now = ul.hidden;
      ul.hidden = !now; b.setAttribute("aria-expanded", String(now));
      now ? open.add(b.dataset.sys) : open.delete(b.dataset.sys); store.set("dzOpen", [...open]);
    });
  });
})();
