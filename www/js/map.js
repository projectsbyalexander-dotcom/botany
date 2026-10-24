/* Карта: относительная частота наблюдений вида по регионам (воеводства, земли, края, области). Работает офлайн. */
(function () {
  const C = window.CORE, M = window.MAPDATA;
  if (!C || !M || !M.regions) return;
  const { $, app, esc, byId, cite, items, D } = C;
  const PL = D.PLANTS;
  D.SOURCES.gbif_map = D.SOURCES.gbif_map || {
    short: "GBIF: iNaturalist по регионам", kind: "Наблюдения в природе",
    full: `iNaturalist Research-grade Observations (GBIF, doi:10.15468/ab3s5x), подсчёт записей по регионам первого уровня (GADM) для каждой страны; данные получены ${M.retrieved}. Границы регионов: Natural Earth admin-1 (общественное достояние).`,
    url: "https://www.gbif.org/dataset/50c9509d-22c7-4a22-a47d-8c48425ef4a7",
  };
  const SRC = [{ id: "gbif_map", loc: `запросы по странам PL, DE, SK, BY; ${M.retrieved}` }];
  const regById = Object.fromEntries(M.regions.map((r) => [r.id, r]));
  const CN = { pl: "Польша", de: "Германия", sk: "Словакия", by: "Беларусь" };

  // Плотность = наблюдения вида на 1000 наблюдений всех растений в регионе (поправка на число наблюдателей)
  function density(pid) {
    const cnt = M.counts[pid] || {};
    const out = {};
    for (const r of M.regions) out[r.id] = { n: cnt[r.id] || 0, rate: r.plants_total ? (1000 * (cnt[r.id] || 0)) / r.plants_total : 0 };
    return out;
  }
  function bins(dens) {
    const v = Object.values(dens).map((x) => x.rate).filter((x) => x > 0).sort((a, b) => a - b);
    if (!v.length) return [Infinity, Infinity, Infinity];
    const q = (p) => v[Math.min(v.length - 1, Math.floor(p * v.length))];
    return [q(0.25), q(0.5), q(0.75)];
  }
  const cls = (rate, b) => (rate <= 0 ? 0 : rate < b[0] ? 1 : rate < b[1] ? 2 : rate < b[2] ? 3 : 4);
  const fmt = (x) => (x >= 10 ? x.toFixed(0) : x >= 1 ? x.toFixed(1) : x.toFixed(2)).replace(".", ",");

  function svg(pid, { labels = false, id = "msvg" } = {}) {
    const dens = pid ? density(pid) : null, b = dens ? bins(dens) : null;
    const effort = !pid;
    let eb;
    if (effort) {
      const v = M.regions.map((r) => r.plants_total).sort((a, c) => a - c);
      eb = [v[Math.floor(v.length * 0.25)], v[Math.floor(v.length * 0.5)], v[Math.floor(v.length * 0.75)]];
    }
    const paths = M.regions.map((r) => {
      const k = effort ? cls(r.plants_total, eb) : cls(dens[r.id].rate, b);
      return `<path class="rg" data-r="${r.id}" d="${r.d}" fill-rule="evenodd" style="fill:var(--map-${k})"><title>${esc(r.ru)}</title></path>`;
    }).join("");
    const outl = Object.values(M.countries).map((d) => `<path class="cty" d="${d}" fill-rule="evenodd"/>`).join("");
    const lab = labels ? Object.entries({ pl: [440, 250], de: [180, 360], sk: [560, 470], by: [800, 200] }).map(([c, [x, y]]) => `<text x="${x}" y="${y}" style="font-size:16px;font-weight:700;opacity:.55">${CN[c]}</text>`).join("") : "";
    return `<svg class="map-svg" id="${id}" viewBox="${M.viewBox}" role="img" aria-label="Карта регионов Польши, Германии, Словакии и Беларуси">${paths}${outl}${lab}</svg>`;
  }
  const legend = (effort) => `<div class="legend">${effort ? "Наблюдений растений:" : "Частота:"} <i style="background:var(--map-0)"></i>${effort ? "меньше" : "нет"}
    <i style="background:var(--map-1)"></i><i style="background:var(--map-2)"></i><i style="background:var(--map-3)"></i><i style="background:var(--map-4)"></i>${effort ? "больше" : "выше"}</div>`;

  function mini(pid) {
    const dens = density(pid);
    const top = M.regions.filter((r) => dens[r.id].n >= 5).sort((a, c) => dens[c.id].rate - dens[a.id].rate).slice(0, 5);
    const total = Object.values(dens).reduce((s, x) => s + x.n, 0);
    return `<div class="mini-map"><div><a href="#/map/${pid}" aria-label="Открыть карту">${svg(pid, { id: "mini" })}</a>${legend()}</div>
      <div><p class="prose" style="margin-top:0">Всего ${total.toLocaleString("ru")} наблюдений с координатами. Чаще всего (на 1000 наблюдений растений в регионе): ${cite(SRC)}</p>
      ${top.length ? `<ol class="rank">${top.map((r) => `<li><span>${esc(r.ru)}</span><b>${fmt(dens[r.id].rate)}</b></li>`).join("")}</ol>` : `<p class="muted">Слишком мало наблюдений для сравнения регионов.</p>`}</div></div>`;
  }
  window.MAPCORE = { svg, mini, density };

  C.page("map", function mapPage(pid) {
    if (pid && !byId[pid]) pid = "";
    const sorted = PL.slice().sort((a, c) => a.ru.localeCompare(c.ru, "ru"));
    const dens = pid ? density(pid) : null;
    const K = pid ? window.K3?.plants?.[pid] : null;
    const total = dens ? Object.values(dens).reduce((s, x) => s + x.n, 0) : 0;
    const rank = pid ? M.regions.filter((r) => dens[r.id].n > 0).sort((a, c) => dens[c.id].rate - dens[a.id].rate) : M.regions.slice().sort((a, c) => c.plants_total - a.plants_total);
    app.innerHTML = `
      <h1>Карта</h1>
      <p class="lead">Где вид наблюдают чаще: ${M.regions.length} регионов первого уровня (воеводства, земли, края, области). Данные встроены в приложение и работают без сети.</p>
      <div class="numrow" style="margin:10px 0">
        <label for="mp">Растение</label>
        <select id="mp" class="sel"><option value="">Изученность: все растения</option>${sorted.map((p) => `<option value="${p.id}" ${p.id === pid ? "selected" : ""}>${p.ru} (${p.lat})</option>`).join("")}</select>
        ${pid ? `<a class="btn ghost small" href="#/plant/${pid}">Статья о растении</a>` : ""}
      </div>
      <div class="map-layout">
        <div class="card">
          ${svg(pid, { labels: true })}
          ${legend(!pid)}
          <div class="map-tip" id="tip">Нажмите на регион, чтобы увидеть цифры.</div>
        </div>
        <div class="card">
          <h3 style="margin-top:0">${pid ? "Регионы с наибольшей частотой" : "Где больше всего наблюдений растений"}</h3>
          ${pid ? `<p class="hint" style="margin-top:0">${total.toLocaleString("ru")} наблюдений вида. Число на 1000 наблюдений всех растений в регионе.</p>` : `<p class="hint" style="margin-top:0">Эта карта показывает, где больше наблюдателей. Её полезно сравнивать с картой вида.</p>`}
          <ol class="rank">${rank.slice(0, 12).map((r) => `<li><span>${esc(r.ru)} <span class="cc">${r.c.toUpperCase()}</span></span><b>${pid ? fmt(dens[r.id].rate) : r.plants_total.toLocaleString("ru")}</b></li>`).join("")}</ol>
          ${pid && total < 300 ? `<p class="caution">Наблюдений мало (${total}), поэтому карта показывает скорее случайные находки, чем реальное распространение.</p>` : ""}
        </div>
      </div>
      ${K?.habitat?.length ? `<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Где искать в природе</h3>${items(K.habitat)}</div>` : ""}
      <div class="card" style="margin-top:14px"><h3 style="margin-top:0">Как читать карту</h3>
        <p class="prose">Цвет показывает не число находок, а их долю среди всех наблюдений растений в этом регионе. Так меньше сказывается то, что в одних регионах наблюдателей намного больше, чем в других. ${cite(SRC)}</p>
        <p class="prose">Наблюдения iNaturalist собирают любители, поэтому карта отражает и распространение вида, и то, где люди его замечают и фотографируют. Культурные растения (мята, шалфей, календула) попадают в данные из садов. У одуванчика лекарственного часть находок определена только до рода, поэтому его меньше, чем в действительности. ${cite(SRC)}</p>
        <p class="prose">Подробная карта точек открывается на сайте iNaturalist, если есть сеть.</p>
      </div>`;
    $("#mp").addEventListener("change", (e) => (location.hash = "#/map/" + e.target.value));
    $("#msvg").addEventListener("click", (e) => {
      const p = e.target.closest("[data-r]"); if (!p) return;
      document.querySelectorAll("#msvg .rg.on").forEach((x) => x.classList.remove("on")); p.classList.add("on");
      const r = regById[p.dataset.r];
      $("#tip").innerHTML = pid
        ? `<b>${esc(r.ru)}</b> (${esc(r.name)}, ${CN[r.c]}): ${dens[r.id].n.toLocaleString("ru")} наблюдений вида из ${r.plants_total.toLocaleString("ru")} наблюдений растений, то есть ${fmt(dens[r.id].rate)} на 1000.`
        : `<b>${esc(r.ru)}</b> (${esc(r.name)}, ${CN[r.c]}): ${r.plants_total.toLocaleString("ru")} наблюдений растений.`;
    });
  });
})();
