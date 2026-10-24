/* История средств: когда и где впервые описано, краткая история. Данные: js/histdata.js (window.HIST),
   ключи: id старинного рецепта, "blend:<id>", "k3:<n>", "drug:<растение>". */
(function () {
  const C = window.CORE;
  const { esc, D, cite, items } = C;
  const H = window.HIST || { sources: {}, items: {} };
  if (H.sources) for (const [k, v] of Object.entries(H.sources)) if (!D.SOURCES[k]) D.SOURCES[k] = v;
  const firstHtml = (f) => `<div class="first-desc">
      <p class="kicker" style="margin:0">${f.status === "documented" ? "Впервые описано" : "Самое раннее найденное описание"}</p>
      <p class="fd-when"><b>${esc(f.year || "")}</b>${f.place ? ` <span class="fd-place">${esc(f.place)}</span>` : ""}</p>
      ${f.work ? `<p class="fd-work"><i>${esc(f.work)}</i>${f.author ? `, ${esc(f.author)}` : ""}</p>` : ""}
      <p class="prose" style="margin:.4em 0 0">${esc(f.t || "")} ${cite(f.s)}</p></div>`;
  // Блок истории; title — заголовок, sub — подпись (например, название сырья для составных средств)
  function histBlock(key, o = {}) {
    const h = H.items[key]; if (!h) return "";
    const body = `${h.first ? firstHtml(h.first) : ""}${(h.history || []).length ? items(h.history) : ""}${h.note ? `<p class="hint">${esc(h.note)}</p>` : ""}`;
    if (!body) return "";
    return o.bare ? body : `<section class="hist-block">${o.title === false ? "" : `<h2>${o.title || "История"}</h2>`}${o.sub ? `<h4>${o.sub}</h4>` : ""}${body}</section>`;
  }
  C.hist = { block: histBlock, has: (k) => !!H.items[k], get: (k) => H.items[k], prep: (k) => (H.prep || {})[k] };
})();
