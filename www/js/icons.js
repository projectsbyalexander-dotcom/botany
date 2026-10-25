/* Линейные SVG-иконки (вместо эмодзи). ICON(name) возвращает строку <svg>. */
window.ICON = (function () {
  const P = {
    leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19l9-9"/>',
    body: '<path d="M12 3v18"/><path d="M8 7c-3 1-4 4-4 7"/><path d="M16 7c3 1 4 4 4 7"/><circle cx="12" cy="5" r="0"/><path d="M9 12h6M9 16h6"/>',
    cross: '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 8v8M8 12h8"/>',
    flask: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3"/><path d="M7.5 15h9"/>',
    scroll: '<path d="M7 4h11a2 2 0 0 1 2 2v1h-4"/><path d="M16 7v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1h10"/><path d="M7 4a2 2 0 0 0-2 2v11"/><path d="M8 9h5M8 12h5"/>',
    map: '<path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z"/><path d="M9 4v14M15 6v14"/>',
    pot: '<path d="M4 10h16v3a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7z"/><path d="M2 10h20"/><path d="M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/>',
    book: '<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z"/><path d="M4 21V5M19 19v2H6"/><path d="M9 7h6"/>',
    library: '<path d="M4 4h4v16H4zM10 4h4v16h-4z"/><path d="M16 5l3.5-1 2.5 15.5-3.5 1z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
    note: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>',
    mute: '<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/><path d="M3 3l18 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    filter: '<path d="M4 5h16l-6 8v5l-4 2v-7z"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    scale: '<path d="M12 4v16M5 20h14"/><path d="M4 8h16"/><path d="M4 8l-2 6a3 3 0 0 0 4 0zM20 8l-2 6a3 3 0 0 0 4 0z"/>',
    mortar: '<path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M14 11l5-7"/><path d="M8 21h8"/>',
    pin: '<path d="M12 21s-6-6-6-11a6 6 0 0 1 12 0c0 5-6 11-6 11z"/><circle cx="12" cy="10" r="2"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/>',
    warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
    jar: '<path d="M8 3h8v3H8z"/><path d="M7 6h10a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M8 12h8v5H8z"/>',
    rx: '<path d="M6 20V4h6a4 4 0 0 1 0 8H6"/><path d="M11 12l8 8M19 12l-8 8"/>',
    pen: '<path d="M4 20l4-1 11-11a2 2 0 0 0-3-3L5 16z"/><path d="M14 7l3 3"/><path d="M13 20h7"/>',
    rose: '<circle cx="12" cy="12" r="2.4"/><path d="M12 4.5c2 0 3 1.6 2.6 3.2 1.6-.6 3.6.3 3.7 2.3.1 1.6-1 2.6-2.2 2.9 1 1.2 1 3-.4 4-1.4 1-3 .4-3.7-.7-.7 1.1-2.3 1.7-3.7.7-1.4-1-1.4-2.8-.4-4C6.7 12.6 5.6 11.6 5.7 10c.1-2 2.1-2.9 3.7-2.3C9 6.1 10 4.5 12 4.5z"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>',
  };
  return (n, cls = "ico") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
})();

/* Роза Игната (эмблема приложения), ровная копия: ROSE(cls) возвращает <svg>. Идентификаторы градиентов уникальны для каждого вызова. */
window.ROSE = (function () {
  const SRC = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><path id="sep" d="M-17,-52 L0,-95 L17,-52 Z"/><path id="pet" d="M-15,-22 C-35,-32 -41,-57 -31,-68 C-24,-77 -8,-77 0,-68 C8,-77 24,-77 31,-68 C41,-57 35,-32 15,-22 Z"/><path id="crl" d="M-27,-49 C-31,-60 -25,-69 -15,-69 C-9,-69 -5,-68 -3,-66 M27,-49 C31,-60 25,-69 15,-69 C9,-69 5,-68 3,-66"/><path id="wdg" d="M-2.6,-28 L0,-67 L2.6,-28 Z"/></defs><g transform="translate(100 100) scale(.96)" stroke="#000" stroke-linejoin="round" stroke-linecap="round"><g fill="#1a9a3a" stroke-width="3.6"><use href="#sep" transform="rotate(36)"/><use href="#sep" transform="rotate(108)"/><use href="#sep" transform="rotate(180)"/><use href="#sep" transform="rotate(252)"/><use href="#sep" transform="rotate(324)"/></g><g fill="#e0201f" stroke-width="3.8"><use href="#pet" transform="rotate(0)"/><use href="#pet" transform="rotate(72)"/><use href="#pet" transform="rotate(144)"/><use href="#pet" transform="rotate(216)"/><use href="#pet" transform="rotate(288)"/></g><g fill="none" stroke-width="2.2"><use href="#crl" transform="rotate(0)"/><use href="#crl" transform="rotate(72)"/><use href="#crl" transform="rotate(144)"/><use href="#crl" transform="rotate(216)"/><use href="#crl" transform="rotate(288)"/></g><g fill="#000" stroke="none"><use href="#wdg" transform="rotate(0)"/><use href="#wdg" transform="rotate(72)"/><use href="#wdg" transform="rotate(144)"/><use href="#wdg" transform="rotate(216)"/><use href="#wdg" transform="rotate(288)"/></g><circle r="29" fill="#000" stroke="none"/><circle r="23" fill="#ffd60f" stroke="none"/></g></svg>';
  let n = 0;
  return (cls = "rose") => { const k = "r" + (++n); return SRC.replace(/id="(\w+)"/g, `id="${k}$1"`).replace(/#(sep|pet|crl|wdg)\b/g, `#${k}$1`).replace("<svg ", `<svg class="${cls}" aria-hidden="true" `); };
})();
