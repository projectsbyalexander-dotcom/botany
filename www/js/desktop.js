/* Ноутбук и компьютер (широкий экран, мышь, клавиатура): разделы в боковой панели с иконками,
   поиск в шапке с подсказкой клавиши, сочетания клавиш. Раскладку задаёт блок «Компьютер» в конце css/style.css.
   Сочетания: / или Ctrl+K (⌘K) — поиск; Alt+1…9 — разделы по порядку; Esc — закрыть меню языка (словарь латыни закрывается сам). */
(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const ICONS = { plants: "leaf", diseases: "cross", pharm: "mortar", sim: "flask", heritage: "scroll", pot: "pot", book: "book", latin: "cap", sources: "library", notes: "pen", map: "map" };
  const typing = () => /input|textarea|select/i.test(document.activeElement?.tagName || "") || document.activeElement?.isContentEditable;

  function decorate() {
    const nav = $("#nav");
    if (!nav || !window.ICON) return;
    nav.querySelectorAll("a").forEach((a) => {
      if (a.querySelector(".ico")) return;
      const k = (a.getAttribute("href") || "").replace(/^#\/?/, "");
      a.insertAdjacentHTML("afterbegin", ICON(ICONS[k] || "leaf"));
    });
    const s = $("#srch");
    if (s && !s.querySelector(".srch-l")) s.insertAdjacentHTML("beforeend", `<span class="srch-l">Поиск</span><kbd class="srch-k" data-noi18n>/</kbd>`);
  }

  // Высота шапки: от неё отсчитывается боковая панель
  function measure() {
    const h = $("header.top");
    if (h) document.documentElement.style.setProperty("--hdr", h.offsetHeight + "px");
  }

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === "k") { e.preventDefault(); location.hash = "#/search"; return; }
    if (e.altKey && !e.ctrlKey && !e.metaKey && /^Digit[1-9]$/.test(e.code) && !typing()) {
      const a = document.querySelectorAll("#nav a")[+e.code.slice(5) - 1];
      if (a) { e.preventDefault(); location.hash = a.getAttribute("href"); }
      return;
    }
    if (e.key === "Escape") {
      const lm = $(".lang-menu:not([hidden])");
      if (lm) lm.hidden = true;
    }
  });

  const init = () => {
    decorate(); measure();
    if (window.ResizeObserver && $("header.top")) new ResizeObserver(measure).observe($("header.top"));
    // точный указатель (мышь, тачпад): класс для курсора и наведения
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => document.documentElement.classList.toggle("mouse", fine.matches);
    sync(); fine.addEventListener?.("change", sync);
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
