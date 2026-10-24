/* Языки интерфейса и содержимого. Подключается первым, в <head>.
   Исходные тексты приложения написаны по-русски; перевод накладывается поверх готовой страницы:
   наблюдатель (MutationObserver) заменяет каждый текстовый узел и атрибуты title, placeholder, aria-label, alt
   по словарю js/i18n/<язык>.js. Ключ словаря: хэш исходной строки (пробелы схлопнуты, числа заменены на {n}).
   Чего нет в словаре, показывается по запасному языку (en для немецкого, польского и словацкого; для белорусского русский оригинал).
   Шаблоны с подстановками (например «Выбрано: {0} из {1}») лежат в js/i18n/tpl.js. */
(function () {
  const LANGS = [["en", "English"], ["de", "Deutsch"], ["pl", "Polski"], ["be", "Беларуская"], ["ru", "Русский"], ["sk", "Slovenčina"]];
  const FALLBACK = { de: ["en"], pl: ["en"], sk: ["en"], en: [], be: [], ru: [] };
  let lang = null;
  try { lang = JSON.parse(localStorage.getItem("travnik.lang")); } catch {}
  if (!LANGS.some((l) => l[0] === lang)) lang = "en";
  const collect = /[?&]i18n-collect\b/.test(location.search);
  const collectAll = collect && !/[?&]i18n-collect=missing\b/.test(location.search);
  document.documentElement.lang = lang;

  const dicts = {};
  const I18N = (window.I18N = {
    lang, LANGS, dicts, tpl: [], misses: new Map(),
    add(code, obj) { dicts[code] = Object.assign(dicts[code] || {}, obj); cache.clear(); },
    set(code) { try { localStorage.setItem("travnik.lang", JSON.stringify(code)); } catch {} location.reload(); },
    t: (s) => tr(s, true),
  });
  // Режим сбора: ?i18n-collect — словари не грузятся, каждая русская строка на странице попадает в I18N.misses;
  // ?i18n-collect=missing — словари грузятся, в I18N.misses только непереведённое
  const chain = lang === "ru" || collectAll ? [] : [lang, ...FALLBACK[lang]];
  const active = chain.length > 0 || collect;
  if (active) for (const c of [...chain, "tpl"]) document.write(`<script src="js/i18n/${c}.js"><\/script>`);

  // cyrb53: 53-битный хэш строки, в словаре записан в base36
  function hash(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) { const ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
  }
  I18N.hash = hash;
  const CY = /[А-Яа-яЁёЎўІі]/;
  const NUM = /\d+(?:[.,]\d+)?/g;
  const get = (k) => { const h = hash(k); for (const c of chain) { const v = dicts[c]?.[h]; if (v != null) return v; } return null; };
  const num = (x) => (lang === "en" ? x.replace(",", ".") : x);
  const cache = new Map();
  let tplRe = null;
  function viaTpl(k) {
    if (!tplRe) tplRe = I18N.tpl.map((p) => [p, new RegExp("^" + p.replace(/[.*+?^$()|[\]\\]/g, "\\$&").replace(/\{(\d)\}/g, "([\\s\\S]+?)").replace(/[{}]/g, "\\$&") + "$")]);
    for (const [p, re] of tplRe) {
      const m = k.match(re); if (!m) continue;
      const t = get(p); if (t == null) continue;
      return t.replace(/\{(\d)\}/g, (_, i) => { const x = m[+i + 1] ?? ""; return CY.test(x) ? get(x) ?? viaTpl(x) ?? x : x; });
    }
    return null;
  }
  // Регистр первой буквы: «листья» в перечне ищется как «Листья» (в немецком существительные остаются с заглавной)
  const recase = (k) => {
    const a = k[0], up = a.toUpperCase(), lo = a.toLowerCase();
    if (a === up && a === lo) return null;
    const v = get((a === lo ? up : lo) + k.slice(1));
    if (v == null || !v) return v;
    if (a === lo && lang === "de") return v;
    return (a === lo ? v[0].toLowerCase() : v[0].toUpperCase()) + v.slice(1);
  };
  // Составная строка («Части: трава, листья», «Подпись, Беларусь. Фото: …»): переводим по кускам, если переведены все русские куски
  function pieces(k) {
    const segs = k.split(/(: |, |; | · |\. )/);
    if (segs.length < 3) return null;
    let ok = true;
    const one = (x, i) => {
      if (segs[i + 1] === ": ") { const c = look(x + ":"); if (c != null && c.endsWith(":")) return c.slice(0, -1); }
      return look(x);
    };
    const out = segs.map((x, i) => (i % 2 || !CY.test(x) ? x : one(x, i) ?? ((ok = false), x)));
    return ok ? out.join("") : null;
  }
  function look(k) {
    if (cache.has(k)) return cache.get(k);
    let v = get(k) ?? recase(k);
    if (v == null) {
      const nums = [];
      const kn = k.replace(NUM, (x) => (nums.push(x), "{n}"));
      const t = (nums.length ? get(kn) : null) ?? viaTpl(kn);
      if (t != null) { let i = 0; v = t.replace(/\{n\}/g, () => num(nums[i++] ?? "")); }
    }
    if (v == null) v = pieces(k);
    cache.set(k, v);
    return v;
  }
  // Белорусский перевод тоже кириллица: уже переведённое не ищем повторно
  const outs = new Set();
  function tr(raw, quiet) {
    if (raw == null || !CY.test(raw)) return raw;
    const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw);
    const k = m[2].replace(/\s+/g, " ");
    if (outs.has(k)) return raw;
    const v = look(k);
    if (v) outs.add(v);
    if (v == null && collect && !quiet && !I18N.misses.has(k)) I18N.misses.set(k, location.hash);
    return v == null ? raw : m[1] + v + m[3];
  }

  // ---------- Наложение на страницу ----------
  const ATTRS = ["title", "placeholder", "aria-label", "alt"];
  const SKIP = new Set(["SCRIPT", "STYLE", "TEXTAREA", "NOSCRIPT"]);
  const mine = new WeakMap();
  function text(n) {
    if (mine.get(n) === n.nodeValue) return;
    const p = n.parentNode;
    if (!p || SKIP.has(p.nodeName) || p.closest?.("[data-noi18n]")) return;
    const v = tr(n.nodeValue);
    if (v !== n.nodeValue) {
      // <option> без value берёт значение из текста: сохраняем русское, чтобы фильтры продолжали работать
      if (p.nodeName === "OPTION" && !p.hasAttribute("value")) p.setAttribute("value", p.textContent);
      n.nodeValue = v;
    }
    mine.set(n, n.nodeValue);
  }
  function attrs(el) {
    for (const a of ATTRS) {
      const s = el.getAttribute(a);
      if (s && CY.test(s)) { const v = tr(s); if (v !== s) el.setAttribute(a, v); }
    }
  }
  function walk(root) {
    if (root.nodeType === 3) return text(root);
    if (root.nodeType !== 1 || SKIP.has(root.nodeName)) return;
    attrs(root);
    const it = document.createTreeWalker(root, 5, null);
    for (let n = it.nextNode(); n; n = it.nextNode()) n.nodeType === 3 ? text(n) : attrs(n);
  }
  const obs = new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === "childList") m.addedNodes.forEach(walk);
      else if (m.type === "characterData") text(m.target);
      else attrs(m.target);
    }
  });
  if (active) obs.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });

  // ---------- Переключатель в шапке ----------
  document.addEventListener("DOMContentLoaded", () => {
    if (active) walk(document.documentElement);
    const tools = document.querySelector("header.top .hdr-tools"); if (!tools) return;
    const box = document.createElement("div");
    box.className = "lang-pick";
    box.innerHTML = `<button class="iconbtn lang-btn" type="button" aria-haspopup="true" aria-expanded="false" title="Language" aria-label="Language">${lang.toUpperCase()}</button>
      <div class="lang-menu" hidden>${LANGS.map(([c, n]) => `<button type="button" data-lang="${c}" class="${c === lang ? "on" : ""}" lang="${c}"><b>${c.toUpperCase()}</b>${n}</button>`).join("")}</div>`;
    box.setAttribute("data-noi18n", "");
    tools.prepend(box);
    const btn = box.firstElementChild, menu = box.lastElementChild;
    const open = (on) => { menu.hidden = !on; btn.setAttribute("aria-expanded", String(on)); };
    btn.addEventListener("click", (e) => { e.stopPropagation(); open(menu.hidden); });
    menu.addEventListener("click", (e) => { const b = e.target.closest("[data-lang]"); if (b && b.dataset.lang !== lang) I18N.set(b.dataset.lang); else open(false); });
    document.addEventListener("click", (e) => { if (!box.contains(e.target)) open(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") open(false); });
  });
})();
