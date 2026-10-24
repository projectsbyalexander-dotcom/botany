/* Музыка приложения: записи пользователя (audio/theme1–5.mp3) и «Аптекарский вальс» (audio/waltz.mp3),
   в случайном порядке. Вальс (ре минор: туба «ум-па-па», пиццикато, фагот, шкатулка, гармонь) записан
   из синтеза stepWaltz ниже, два круга по 16 тактов; синтез остаётся источником записи и звуков интерфейса.
   В конце записей пользователя мягкий отзвук и затухание вместо обрыва. */
window.MUSIC = (function () {
  let ctx, master, rev, playing = false, timer, nextTime = 0, step = 0;
  const BPM = 104, BEAT = 60 / BPM;
  const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
  // Аккорды: [бас, квинта баса, голоса пиццикато]
  const CH = {
    Dm: [38, 45, [62, 65, 69]], A7: [33, 40, [61, 64, 67]], Gm: [43, 38, [62, 67, 70]], Bb: [46, 41, [62, 65, 70]],
  };
  const HARM = ["Dm", "A7", "Dm", "Gm", "Dm", "Bb", "A7", "Dm", "Gm", "Dm", "A7", "Dm", "Bb", "Gm", "A7", "A7"];
  // Мелодия по тактам: [нота, длительность в долях]; 0 — пауза
  const MEL = [
    [[69, 1], [70, .5], [69, .5], [68, 1]], [[69, 2], [64, 1]], [[65, 1], [64, .5], [65, .5], [67, 1]], [[70, 1], [69, 1], [67, 1]],
    [[69, 1], [74, 1], [73, 1]], [[74, 1], [70, 1], [65, 1]], [[64, 1], [65, .5], [64, .5], [61, 1]], [[62, 2], [0, 1]],
    [[67, 1], [70, 1], [74, 1]], [[72, .5], [73, .5], [74, 1], [69, 1]], [[67, 1], [64, 1], [61, 1]], [[62, 1], [65, 1], [69, 1]],
    [[70, 1], [72, .5], [70, .5], [69, 1]], [[67, 1], [70, .5], [69, .5], [67, 1]], [[69, 1], [68, 1], [67, 1]], [[64, 1], [61, 1], [57, 1]],
  ];

  function env(g, t, a, peak, dur) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  }
  function lp(freq, q = 1) { const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = freq; f.Q.value = q; return f; }
  function out(node, wet = 0.25) { node.connect(master); if (rev) { const s = ctx.createGain(); s.gain.value = wet; node.connect(s); s.connect(rev); } }

  function tuba(n, t, dur) {
    const g = ctx.createGain(), f = lp(320, 2);
    for (const [type, mul, v] of [["sawtooth", 1, 1], ["triangle", 0.5, 0.8]]) {
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = type; o.frequency.value = midi(n) * mul; og.gain.value = v;
      o.connect(og); og.connect(f); o.start(t); o.stop(t + dur + 0.1);
    }
    env(g, t, 0.025, 0.26, dur); f.connect(g); out(g, 0.1);
  }
  function pizz(n, t) {
    const o = ctx.createOscillator(), g = ctx.createGain(), f = lp(1600, 3);
    o.type = "triangle"; o.frequency.value = midi(n); o.detune.value = (Math.random() - 0.5) * 10;
    env(g, t, 0.005, 0.06, 0.2); o.connect(f); f.connect(g); out(g, 0.3); o.start(t); o.stop(t + 0.25);
  }
  function bassoon(n, t, dur) {
    const g = ctx.createGain(), f = lp(1100, 2.5);
    const vib = ctx.createOscillator(), vg = ctx.createGain(); vib.frequency.value = 5.2; vg.gain.setValueAtTime(0, t); vg.gain.linearRampToValueAtTime(9, t + Math.min(0.35, dur));
    vib.connect(vg);
    for (const [type, mul, v] of [["sawtooth", 1, 0.7], ["square", 1, 0.25], ["sine", 0.5, 0.5]]) {
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = type; o.frequency.value = midi(n) * mul; og.gain.value = v; vg.connect(o.detune);
      o.connect(og); og.connect(f); o.start(t); o.stop(t + dur + 0.15);
    }
    vib.start(t); vib.stop(t + dur + 0.15);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.13, t + 0.05);
    g.gain.setValueAtTime(0.11, t + Math.max(0.06, dur * 0.7)); g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.1);
    f.connect(g); out(g, 0.3);
  }
  function musicBox(n, t) {
    const g = ctx.createGain();
    for (const [mul, v] of [[1, 1], [4, 0.18], [6.8, 0.06]]) {
      const o = ctx.createOscillator(), og = ctx.createGain(); o.type = "sine"; o.frequency.value = midi(n) * mul; og.gain.value = v;
      o.connect(og); og.connect(g); o.start(t); o.stop(t + 1.4);
    }
    env(g, t, 0.004, 0.07, 1.3); out(g, 0.5);
  }
  function accordion(notes, t, dur) {
    const g = ctx.createGain(), f = lp(1300, 0.7), trem = ctx.createOscillator(), tg = ctx.createGain();
    trem.frequency.value = 6; tg.gain.value = 0.006; trem.connect(tg); tg.connect(g.gain);
    for (const n of notes) for (const d of [-7, 7]) {
      const o = ctx.createOscillator(); o.type = "sawtooth"; o.frequency.value = midi(n); o.detune.value = d; o.connect(f); o.start(t); o.stop(t + dur + 0.2);
    }
    g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.018, t + 0.3); g.gain.setValueAtTime(0.018, t + dur - 0.2); g.gain.linearRampToValueAtTime(0.0001, t + dur + 0.1);
    trem.start(t); trem.stop(t + dur + 0.2); f.connect(g); out(g, 0.4);
  }
  function brush(t, v) {
    const len = 0.08, buf = ctx.createBuffer(1, ctx.sampleRate * len, ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = buf; f.type = "highpass"; f.frequency.value = 5000; g.gain.value = v;
    s.connect(f); f.connect(g); g.connect(master); s.start(t);
  }

  // ---------- Тема 1: вальс ----------
  function stepWaltz() {
      const bar = Math.floor(step / 3), beat = step % 3, i = bar % 16, round = Math.floor(bar / 16);
      const [root, fifth, voices] = CH[HARM[i]];
      const swing = beat === 0 ? 1.07 : 0.965;
      if (beat === 0) {
        tuba(bar % 2 ? fifth : root, nextTime, BEAT * 0.9);
        if (i >= 8 && round % 2 === 0) accordion(voices.map((n) => n - 12), nextTime, BEAT * 3);
        // мелодия всего такта ставится на первую долю
        let off = 0;
        for (const [n, len] of MEL[i]) {
          const t = nextTime + off * BEAT;
          if (n) {
            const useBox = (round % 2 === 1) !== (i >= 8);
            if (useBox) { musicBox(n + 12, t); if (len >= 1) musicBox(n + 12, t + BEAT * 0.5 * 1.02); }
            else bassoon(n - 12, t, len * BEAT * 0.92);
          }
          off += len;
        }
      } else {
        voices.forEach((n) => pizz(n - 12, nextTime));
        brush(nextTime, 0.012);
      }
      return BEAT * swing;
  }

  // ---------- Плеер ----------
  // Темы выбрать нельзя: они идут в случайном порядке. «Своя тема» первой звучит с вероятностью 80 %,
  // на любом следующем месте с вероятностью 30 %; остальные темы делят оставшееся поровну.
  // Все записи выровнены по громкости (−13 LUFS), поэтому играют на полной громкости плеера.
  const TRACKS = {
    theme1: { ru: "Своя тема", file: "audio/theme1.mp3" },
    theme2: { ru: "Своя тема 2", file: "audio/theme2.mp3" },
    theme3: { ru: "Своя тема 3", file: "audio/theme3.mp3" },
    theme4: { ru: "Своя тема 4", file: "audio/theme4.mp3" },
    theme5: { ru: "Своя тема 5", file: "audio/theme5.mp3" },
    waltz: { ru: "Аптекарский вальс", file: "audio/waltz.mp3" },
  };
  const MAIN = "theme1", OTHERS = Object.keys(TRACKS).filter((k) => k !== MAIN);
  const pick = (first) => (Math.random() < (first ? 0.8 : 0.3) ? MAIN : OTHERS[Math.floor(Math.random() * OTHERS.length)]);
  let track = null, audio = null;
  function load(id) { track = id; audio.src = TRACKS[id].file; }
  function init() {
    if (ctx) return;
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.6;
    const comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
    // простая реверберация: затухающий шум как импульсный отклик
    const len = ctx.sampleRate * 1.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3); }
    rev = ctx.createConvolver(); rev.buffer = ir; const rg = ctx.createGain(); rg.gain.value = 0.35; rev.connect(rg); rg.connect(comp);
  }
  function start() {
    if (playing) return;
    if (!audio) {
      audio = new Audio(); audio.preload = "auto"; audio.volume = 1;
      audio.addEventListener("ended", () => { load(pick(false)); if (playing) audio.play().catch(() => {}); });
    }
    if (!track) load(pick(true));
    playing = true;
    const pr = audio.play(); if (pr) pr.catch(() => { playing = false; });
  }
  function stop() { playing = false; if (audio) audio.pause(); }
  function sfx(kind) {
    try { init(); } catch { return; }
    const t = ctx.currentTime;
    if (kind === "plop") { pizz(74, t); pizz(67, t + 0.05); }
    if (kind === "good") [62, 66, 69, 74].forEach((n, i) => musicBox(n + 12, t + i * 0.09));
    if (kind === "bad") [50, 49, 48].forEach((n, i) => bassoon(n, t + i * 0.18, 0.22));
    if (kind === "bubble") for (let i = 0; i < 6; i++) pizz(60 + Math.floor(Math.random() * 14), t + i * 0.12);
  }
  // версия разработчика: включить конкретную тему
  function play(id) { if (!TRACKS[id]) return; stop(); if (!audio) start(), stop(); load(id); start(); }
  return { start, stop, play, next: () => { if (!audio) return start(); stop(); load(pick(false)); start(); }, sfx, TRACKS, get track() { return track; }, get playing() { return playing; } };
})();
