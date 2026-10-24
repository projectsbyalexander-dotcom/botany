/* Блокнот: свои заметки пользователя (#/notes, #/notes/<id>). Хранятся в localStorage этого устройства (store "notes").
   Поиск по заголовку. Текст заметок не переводится (data-noi18n). */
(function () {
  const C = window.CORE;
  const { $, app, esc, norm, store, toast } = C;
  const ICON = window.ICON;
  const load = () => store.get("notes", []);
  const save = (list) => store.set("notes", list);
  const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const dateOf = (t) => { try { return new Date(t).toLocaleDateString(document.documentElement.lang || undefined, { day: "numeric", month: "short", year: "numeric" }); } catch { return ""; } };
  const untitled = "Без заголовка";
  let q = "";

  function listPage() {
    const all = load(), kept = all.filter((n) => n.title || (n.body || "").trim());
    if (kept.length !== all.length) save(kept);
    app.innerHTML = `<h1>Блокнот</h1>
      <p class="lead">Свои заметки: наблюдения на прогулке, рецепты, вопросы к преподавателю. Заметки хранятся только на этом устройстве.</p>
      <div class="search-row notes-search"><input class="search" id="nq" placeholder="Поиск по заголовку" value="${esc(q)}" autocomplete="off" aria-label="Поиск по заголовку заметок"><button class="btn" id="nnew" type="button">${ICON("plus")} Новая заметка</button></div>
      <p class="hint" id="ncount"></p>
      <div class="notes-list" id="nlist"></div>`;
    const render = () => {
      const all = load().sort((a, b) => b.u - a.u), qq = norm(q.trim());
      const list = all.filter((n) => !qq || norm(n.title || "").includes(qq));
      $("#ncount").textContent = all.length ? (qq ? `Найдено: ${list.length} из ${all.length}` : `Заметок: ${all.length}`) : "";
      $("#nlist").innerHTML = list.length ? list.map((n) => `<a class="card note-row" href="#/notes/${n.id}"><b data-noi18n>${esc(n.title || "")}</b>${n.title ? "" : `<b class="muted">${untitled}</b>`}<span class="muted note-snip" data-noi18n>${esc((n.body || "").slice(0, 140))}</span><small class="muted">${dateOf(n.u)}</small></a>`).join("")
        : all.length ? `<p class="muted">Заметок с таким заголовком нет.</p>` : `<div class="card note-empty">${ICON("pen")}<p>Пока пусто. Нажмите «Новая заметка», чтобы записать первую мысль.</p></div>`;
    };
    render();
    $("#nq").addEventListener("input", (e) => { q = e.target.value; render(); });
    $("#nnew").addEventListener("click", () => {
      const n = { id: newId(), title: "", body: "", t: Date.now(), u: Date.now() };
      save([n, ...load()]); location.hash = "#/notes/" + n.id;
    });
  }

  function notePage(id) {
    const n = load().find((x) => x.id === id);
    if (!n) { location.hash = "#/notes"; return; }
    app.innerHTML = `<a class="back" href="#/notes">${ICON("back")} Блокнот</a>
      <div class="note-edit card" data-noi18n>
        <input class="note-title" id="ntitle" value="${esc(n.title || "")}" autocomplete="off">
        <textarea class="note-body" id="nbody" rows="14">${esc(n.body || "")}</textarea>
      </div>
      <div class="btn-row note-tools"><span class="hint" id="nsaved">Сохраняется автоматически</span><button class="btn small ghost" id="ndel" type="button">Удалить заметку</button></div>`;
    // подписи полей переводятся, поэтому задаются вне блока data-noi18n
    $("#ntitle").placeholder = "Заголовок"; $("#ntitle").setAttribute("aria-label", "Заголовок");
    $("#nbody").placeholder = "Текст заметки"; $("#nbody").setAttribute("aria-label", "Текст заметки");
    let timer = null;
    const ti = $("#ntitle"), bo = $("#nbody"), sv = $("#nsaved");
    const commit = () => {
      clearTimeout(timer);
      const list = load(), cur = list.find((x) => x.id === id); if (!cur) return;
      cur.title = ti.value.trim(); cur.body = bo.value; cur.u = Date.now();
      save(list); sv.textContent = "Сохранено";
    };
    const later = () => { sv.textContent = "Сохраняется автоматически"; clearTimeout(timer); timer = setTimeout(commit, 400); };
    $("#ntitle").addEventListener("input", later); $("#nbody").addEventListener("input", later);
    $("#ntitle").addEventListener("blur", commit); $("#nbody").addEventListener("blur", commit);
    window.addEventListener("hashchange", function leave() { window.removeEventListener("hashchange", leave); if (timer) commit(); dropEmpty(id); });
    $("#ndel").addEventListener("click", (e) => {
      const b = e.currentTarget;
      if (!b.classList.contains("sure")) { b.classList.add("sure"); b.textContent = "Точно удалить?"; setTimeout(() => { if (b.isConnected) { b.classList.remove("sure"); b.textContent = "Удалить заметку"; } }, 4000); return; }
      clearTimeout(timer); save(load().filter((x) => x.id !== id)); toast("Заметка удалена"); location.hash = "#/notes";
    });
    if (!n.title && !n.body) $("#ntitle").focus();
  }
  // пустая заметка, из которой ушли, не нужна
  const dropEmpty = (id) => { const list = load(), n = list.find((x) => x.id === id); if (n && !n.title && !n.body.trim()) save(list.filter((x) => x.id !== id)); };

  C.page("notes", (id) => (id ? notePage(id) : listPage()));
})();
