/* Версия разработчика (#/dev). Работает только при window.TRAVNIK_DEV = true (его ставит index-dev.html).
   Открывает всё: наборы карточек любого уровня, весь путь провизора отмеченным пройденным, все рецепты книги сваренными;
   даёт выбор музыкальной темы и указатель всех экранов. Прогресс обычной версии не трогает: у сборки разработчика свой адрес и своё хранилище. */
(function () {
  if (!window.TRAVNIK_DEV) return;
  const C = window.CORE;
  const { $, app, esc, store, D } = C;
  const ICON = window.ICON;

  // Значок DEV в шапке
  const hdr = document.querySelector("header.top .iconbtn")?.parentElement;
  if (hdr) { const a = document.createElement("a"); a.href = "#/dev"; a.className = "dev-badge"; a.textContent = "DEV"; a.title = "Панель разработчика"; hdr.prepend(a); }
  document.documentElement.classList.add("is-dev");

  function unlockAll() {
    const sim = store.get("sim", { lessons: [], best: {}, shifts: 0, level: "student" });
    sim.lessons = (C.simLessons || []).map((l) => l.id);
    sim.shiftPass = { student: true, assistant: true, provisor: true };
    sim.examMid = 10; sim.examFinal = 20; sim.shifts = Math.max(sim.shifts || 0, 3);
    store.set("sim", sim);
    store.set("chem", Object.fromEntries((C.course?.lessons || []).map((l) => [l.id, 1])));
    store.set("simx", { photo: { 1: 8, 2: 8 }, lab: { 1: 5, 2: 5 }, case: { 1: 99, 2: 99 } });
    if (C.potAllBook) store.set("potBook2", C.potAllBook());
  }
  function resetAll() { ["sim", "chem", "simx", "potBook2", "srs", "deckOpen", "cardsLevel"].forEach((k) => { try { localStorage.removeItem("travnik." + k); } catch {} }); }

  const link = (href, t) => `<a class="chip" href="${href}">${esc(t)}</a>`;
  C.page("dev", function devPage() {
    const T = window.MUSIC?.TRACKS || {};
    const lv = { student: "Ученик", assistant: "Ассистент", provisor: "Провизор" };
    const legacy = [...(window.LEGACY?.mixtures || []), ...(window.LEGACY?.remedies || [])];
    app.innerHTML = `<h1>Панель разработчика</h1>
      <p class="lead">Сборка разработчика: все наборы карточек открыты на любом уровне сложности. Прогресс здесь свой, обычную версию он не меняет.</p>
      <div class="card"><h3 style="margin-top:0">Прогресс</h3>
        <p class="hint">«Открыть всё» отмечает пройденными все уроки и задания пути провизора, зачёты и смены, и записывает в книгу все рецепты котелка.</p>
        <div class="btn-row"><button class="btn" id="dv-un" type="button">Открыть всё</button><button class="btn ghost" id="dv-rs" type="button">Сбросить прогресс</button></div><p class="hint" id="dv-msg"></p></div>
      <div class="card" id="dv-mu"><h3 style="margin-top:0">Музыка</h3><p class="hint">В обычной версии темы идут случайно; здесь можно включить любую.</p>
        <div class="herbs">${Object.entries(T).map(([id, t]) => `<button class="chip" type="button" data-mu="${id}">${esc(t.ru)}</button>`).join("")}<button class="chip" type="button" data-mu="__next">Следующая случайная</button><button class="chip" type="button" data-mu="__off">Выключить</button></div><p class="hint" id="dv-now"></p></div>
      <div class="card"><h3 style="margin-top:0">Все экраны</h3>
        <h4>Практические уроки</h4><div class="herbs">${(C.simLessons || []).map((l) => link(`#/sim/lesson/${l.id}`, l.title)).join("")}</div>
        <h4>Уроки о веществах</h4><div class="herbs">${(C.course?.lessons || []).map((l) => link(`#/sim/chem/${l.id}`, l.title)).join("")}</div>
        <h4>Смены и зачёты</h4><div class="herbs">${Object.entries(lv).map(([k, t]) => link(`#/sim/shift/${k}`, `Смена: ${t}`)).join("")}${link("#/sim/exam/mid", "Промежуточный зачёт")}${link("#/sim/exam/final", "Итоговый зачёт")}</div>
        <h4>Задания</h4><div class="herbs">${[["photo", "Приёмка"], ["lab", "Лаборатория"], ["case", "Консультации"]].flatMap(([m, t]) => [1, 2].map((n) => link(`#/sim/${m}/${n}`, `${t}, уровень ${n}`))).join("")}</div>
        <h4>Карточки</h4><div class="herbs">${link("#/sim/cards", "Колоды")}${link("#/sim/cards/all", "Колода «Всё»")}${link("#/sim/cards/rx", "Колода «Рецепты»")}${["rsingle", "ill", "l1", "l2", "l3", "l5", "l6", "l7", "l8", "l9", "subst", "uses", "legacy", "full", "rev", "rrev"].map((id) => link(`#/sim/cards/${id}`, id)).join("")}</div>
        <h4>Разделы</h4><div class="herbs">${[["plants", "Растения"], ["diseases", "Болезни"], ["pharm", "Механизмы"], ["heritage", "Наследие"], ["map", "Карта"], ["book", "Книга рецептов"], ["pot", "Котелок"], ["latin", "Латынь"], ["sources", "Источники"]].map(([h, t]) => link("#/" + h, t)).join("")}</div>
        <h4>Растения (${D.PLANTS.length})</h4><div class="herbs">${D.PLANTS.map((p) => link(`#/plant/${p.id}`, p.ru)).join("")}</div>
        <h4>Старинные средства (${legacy.length})</h4><details><summary class="hint">Показать список</summary><div class="herbs">${legacy.map((m) => link(`#/heritage/${m.id}`, m.ru)).join("")}</div></details>
      </div>`;
    const now = () => { $("#dv-now").textContent = window.MUSIC?.playing ? `Играет: ${T[window.MUSIC.track]?.ru || window.MUSIC.track}` : "Музыка выключена"; };
    now();
    $("#dv-un").addEventListener("click", () => { unlockAll(); $("#dv-msg").textContent = "Всё открыто. Страница перезагрузится."; setTimeout(() => location.reload(), 600); });
    $("#dv-rs").addEventListener("click", (e) => {
      const b = e.currentTarget;
      if (b.dataset.sure !== "1") { b.dataset.sure = "1"; b.textContent = "Точно сбросить?"; return; }
      resetAll(); $("#dv-msg").textContent = "Прогресс сброшен. Страница перезагрузится."; setTimeout(() => location.reload(), 600);
    });
    $("#dv-mu").addEventListener("click", (e) => {
      const b = e.target.closest("[data-mu]"); if (!b || !window.MUSIC) return;
      const id = b.dataset.mu;
      if (id === "__off") window.MUSIC.stop(); else if (id === "__next") window.MUSIC.next(); else window.MUSIC.play(id);
      document.getElementById("music")?.dispatchEvent(new Event("musicsync")); now();
    });
  });
})();
