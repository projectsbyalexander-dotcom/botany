/* Механизмы: классы действующих веществ — химия, фармакология, эффекты, безопасность. */
(function () {
  const C = window.CORE;
  const { $, app, esc, byId, items, tagPill, thumb } = C;
  C.page("pharm", function pharmPage(cid) {
    const M = window.MECH;
    const cls = M?.classes || [];
    if (!cls.length) {
      app.innerHTML = `<h1>Механизмы</h1><p class="lead">Раздел готовится.</p>`;
      return;
    }
    const sel = cls.find((c) => c.id === cid) || null;
    const block = (t, segs) => segs && segs.length ? `<h4>${t}</h4>${items(segs)}` : "";
    app.innerHTML = `
      <h1>Механизмы</h1>
      <p class="lead">Классы биологически активных веществ лекарственных растений: что это химически, как они действуют на организм и чем опасны. Из статьи растения сюда ведут цветные метки веществ.</p>
      <div class="dz ${sel ? "has-sel" : ""}">
        <aside class="card dz-nav">
          ${cls.map((c) => `<a class="dz-item ${sel && c.id === sel.id ? "on" : ""}" href="#/pharm/${c.id}">${esc(c.ru)}<span class="cnt">${(c.plants || []).length || ""}</span></a>`).join("")}
        </aside>
        <div class="dz-main">${sel ? `
          <div class="card">
            <div class="crumbs"><a class="btn ghost small dz-mobile-pick" href="#/pharm">${ICON("back")} Все классы</a></div>
            <h2 style="margin-top:.2em">${esc(sel.ru)}</h2>
            ${sel.lat ? `<div class="muted"><i>${esc(sel.lat)}</i></div>` : ""}
            ${sel.tag ? `<div class="cp-tags">${tagPill(sel.tag)}</div>` : ""}
            ${block("Химическая природа", sel.chem)}
            ${block("Механизм действия", sel.mech)}
            ${block("Фармакологические эффекты", sel.effects)}
            ${sel.safety?.length ? `<h4>Безопасность</h4><div class="caution">${items(sel.safety)}</div>` : ""}
            ${(() => { const CC = C.course; if (!CC) return ""; const ms = CC.compoundsFor((m) => m.cls === sel.id), l = CC.lessons.find((x) => x.cls === sel.id);
              return `${ms.length ? `<h4>Молекулы</h4>${CC.molGrid(ms)}` : ""}${l ? `<p class="hint">Урок по этому классу с вопросами: <a href="#/sim/chem/${l.id}">${esc(l.title)}</a>.</p>` : ""}`; })()}
            ${(sel.plants || []).filter((id) => byId[id]).length ? `<h4>Сырьё в справочнике</h4>
              ${(sel.plants || []).filter((id) => byId[id]).map((id) => { const p = byId[id]; return `<div class="plant-row"><a class="thumb" href="#/plant/${id}" tabindex="-1" aria-hidden="true">${thumb(p)}</a><div><h3>${C.nmA(`#/plant/${id}`, p.ru, p.drug.lat)}</h3>${M.plants?.[id] ? items(M.plants[id].slice(0, 1)) : ""}</div></div>`; }).join("")}` : ""}
          </div>` : `
          <div class="card"><p class="prose" style="margin-top:0">Выберите класс веществ слева. Для каждого приведены химическая природа, механизм действия, эффекты, безопасность и растения справочника, в которых эти вещества ведущие.</p>
          <div class="subs">${cls.map((c) => `<a class="chip" href="#/pharm/${c.id}">${esc(c.ru)}</a>`).join("")}</div></div>`}
        </div>
      </div>`;
    C.course?.drawStructures(app);
  });
})();
