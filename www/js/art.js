/* Рисованные иллюстрации растений и котелка (собственная векторная графика).
   «Рукотворность» даёт SVG-фильтр #wobble, который слегка искривляет контуры. */
window.ART = (function () {
  const INK = "#2a1f17";
  // Детерминированный псевдослучайный генератор, чтобы рисунок не «прыгал» между показами
  function rng(seed) {
    let h = 2166136261;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => {
      h += 0x6d2b79f5;
      let t = h;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Фильтры объявлены один раз на странице, а не в каждом рисунке: так в документе нет повторяющихся id
  const FILTERS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
      <filter id="wobble" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
      <filter id="wobble-cup"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="5"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter>
    </defs></svg>`;
  const mountFilters = () => { if (!document.getElementById("wobble")) document.body.insertAdjacentHTML("afterbegin", FILTERS); };
  if (document.body) mountFilters(); else document.addEventListener("DOMContentLoaded", mountFilters);
  const defs = "";

  function stem(r, x1, y1, x2, y2, color = "#4f6b34") {
    const cx = (x1 + x2) / 2 + (r() - 0.5) * 18;
    return `<path d="M${x1},${y1} Q${cx},${(y1 + y2) / 2} ${x2},${y2}" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
            <path d="M${x1},${y1} Q${cx},${(y1 + y2) / 2} ${x2},${y2}" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  }

  function leafPath(len, wid, shape) {
    if (shape === "lanceolate" || shape === "rosette") return `M0,0 Q${wid * 0.6},${-len * 0.5} 0,${-len} Q${-wid * 0.6},${-len * 0.5} 0,0Z`;
    if (shape === "serrate") {
      let d = "M0,0 ";
      for (let i = 1; i <= 6; i++) d += `L${wid * (0.4 + (i % 2) * 0.25) * Math.sin((i / 7) * Math.PI)},${(-len * i) / 7} `;
      d += `L0,${-len} `;
      for (let i = 6; i >= 1; i--) d += `L${-wid * (0.4 + (i % 2) * 0.25) * Math.sin((i / 7) * Math.PI)},${(-len * i) / 7} `;
      return d + "Z";
    }
    if (shape === "birch") return `M0,0 L${wid * 0.55},${-len * 0.35} L0,${-len} L${-wid * 0.55},${-len * 0.35}Z`;
    if (shape === "rosette_round") return `M0,0 C${wid},${-len * 0.2} ${wid * 0.8},${-len} 0,${-len} C${-wid * 0.8},${-len} ${-wid},${-len * 0.2} 0,0Z`;
    return `M0,0 C${wid * 0.7},${-len * 0.2} ${wid * 0.6},${-len * 0.8} 0,${-len} C${-wid * 0.6},${-len * 0.8} ${-wid * 0.7},${-len * 0.2} 0,0Z`;
  }

  function leaf(x, y, angle, len, wid, color, shape) {
    return `<g transform="translate(${x},${y}) rotate(${angle})">
      <path d="${leafPath(len, wid, shape)}" fill="${color}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M0,-2 L0,${-len * 0.85}" stroke="${INK}" stroke-width="1.5" opacity=".6"/>
    </g>`;
  }

  function flowerHead(r, cx, cy, a) {
    const n = a.petals || 8, R = a.small ? 13 : a.thin ? 26 : 24, w = a.thin ? 4 : a.petals <= 6 ? 12 : 7;
    let s = "";
    for (let i = 0; i < n; i++) {
      const ang = (360 / n) * i + r() * 8;
      s += `<ellipse cx="${cx}" cy="${cy - R * 0.55}" rx="${w}" ry="${R * 0.55}" transform="rotate(${ang} ${cx} ${cy})" fill="${a.petal}" stroke="${INK}" stroke-width="2.5"/>`;
    }
    const cr = a.small ? 5 : a.petals <= 5 ? 8 : 10;
    s += `<circle cx="${cx}" cy="${cy}" r="${cr}" fill="${a.center}" stroke="${INK}" stroke-width="2.5"/>`;
    for (let i = 0; i < 4; i++) s += `<circle cx="${cx + (r() - 0.5) * cr}" cy="${cy + (r() - 0.5) * cr}" r="1.4" fill="${INK}" opacity=".6"/>`;
    return s;
  }

  function draw(plant) {
    const a = plant.art, r = rng(plant.id);
    let body = "";
    const leafColor = a.leaf || "#5d7f42";

    // Земля
    body += `<path d="M14,176 Q60,${168 + r() * 6} 100,172 T186,174" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;

    if (a.kind === "flower") {
      body += stem(r, 100, 174, 100, 70);
      body += leaf(100, 140, -50, 34, 16, leafColor, "lanceolate") + leaf(100, 120, 55, 30, 14, leafColor, "lanceolate");
      if (a.bract) body += leaf(100, 92, 30, 44, 12, "#c9c48a", "lanceolate");
      if (a.small) {
        for (const [dx, dy] of [[-16, 8], [14, 4], [0, -10], [-6, 18], [18, 20]]) body += flowerHead(r, 100 + dx, 66 + dy, a);
      } else body += flowerHead(r, 100, 62, a);
    } else if (a.kind === "umbel") {
      body += stem(r, 100, 174, 100, 80);
      body += leaf(100, 146, -55, 36, a.feathery ? 8 : 16, "#5d7f42", a.feathery ? "lanceolate" : "ovate");
      body += leaf(100, 126, 50, 32, a.feathery ? 8 : 15, "#5d7f42", a.feathery ? "lanceolate" : "ovate");
      for (let i = 0; i < 7; i++) {
        const ang = -70 + i * 23, ex = 100 + Math.sin((ang * Math.PI) / 180) * 42, ey = 80 - Math.cos((ang * Math.PI) / 180) * 30;
        body += `<path d="M100,82 L${ex},${ey}" stroke="${INK}" stroke-width="2.5"/>`;
        for (let k = 0; k < 4; k++) {
          const fx = ex + (r() - 0.5) * 14, fy = ey + (r() - 0.6) * 10;
          body += a.seeds
            ? `<ellipse cx="${fx}" cy="${fy}" rx="2.4" ry="4.5" transform="rotate(${r() * 60 - 30} ${fx} ${fy})" fill="#8a6a3b" stroke="${INK}" stroke-width="1.5"/>`
            : `<circle cx="${fx}" cy="${fy}" r="4.2" fill="${a.petal}" stroke="${INK}" stroke-width="1.8"/><circle cx="${fx}" cy="${fy}" r="1.3" fill="${a.center}"/>`;
        }
      }
    } else if (a.kind === "leaf") {
      if (a.shape === "rosette" || a.shape === "rosette_round") {
        for (let i = 0; i < a.pairs; i++) body += leaf(100, 172, -70 + (140 / (a.pairs - 1)) * i, 92 + r() * 14, a.shape === "rosette" ? 20 : 40, leafColor, a.shape);
      } else if (a.shape === "feathery") {
        body += stem(r, 100, 174, 100, 34, "#8b947f");
        for (let i = 0; i < a.pairs; i++) {
          const y = 150 - i * 28;
          for (const s of [-1, 1]) for (let k = 0; k < 3; k++) body += leaf(100, y, s * (50 + k * 18), 26 - k * 4, 6, leafColor, "lanceolate");
        }
      } else {
        body += stem(r, 100, 174, 100, 30);
        for (let i = 0; i < a.pairs; i++) {
          const y = 150 - i * 34, len = 46 - i * 6, w = a.shape === "lanceolate" ? 18 - i * 2 : 30 - i * 4;
          body += leaf(100, y, -58 + r() * 8, len, w, leafColor, a.shape) + leaf(100, y - 6, 58 - r() * 8, len, w, leafColor, a.shape);
        }
        body += leaf(100, 36, r() * 10 - 5, 28, a.shape === "lanceolate" ? 12 : 20, leafColor, a.shape);
      }
    } else if (a.kind === "root") {
      body += stem(r, 100, 120, 100, 50, "#5d7f42");
      body += leaf(100, 100, -55, 34, 14, "#5d7f42", "lanceolate") + leaf(100, 92, 55, 34, 14, "#5d7f42", "lanceolate");
      for (let i = 0; i < 9; i++) body += `<circle cx="${100 + (r() - 0.5) * 30}" cy="${44 + (r() - 0.5) * 18}" r="5" fill="${a.top}" stroke="${INK}" stroke-width="2"/>`;
      body += `<ellipse cx="100" cy="134" rx="22" ry="14" fill="${a.root}" stroke="${INK}" stroke-width="3"/>`;
      for (let i = 0; i < 9; i++) {
        const x = 82 + i * 4.5, len = 20 + r() * 26;
        body += `<path d="M${x},144 q${(r() - 0.5) * 18},${len / 2} ${(r() - 0.5) * 22},${len}" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>`;
      }
    } else if (a.kind === "bark") {
      body += `<path d="M70,176 L76,40 Q100,30 124,40 L130,176Z" fill="${a.bark}" stroke="${INK}" stroke-width="3.5"/>`;
      for (let i = 0; i < 7; i++) {
        const x = 80 + i * 6.5;
        body += `<path d="M${x},${50 + r() * 10} q${(r() - 0.5) * 8},60 ${(r() - 0.5) * 6},${110 + r() * 10}" stroke="${INK}" stroke-width="2" fill="none" opacity=".7"/>`;
      }
      body += leaf(126, 62, 60, 40, 18, a.leaf, "ovate") + leaf(74, 70, -62, 40, 18, a.leaf, "ovate");
      body += `<ellipse cx="140" cy="94" rx="7" ry="10" fill="#a8823f" stroke="${INK}" stroke-width="2.5"/><path d="M133,88 Q140,80 147,88" fill="#6d5229" stroke="${INK}" stroke-width="2.5"/>`;
    } else if (a.kind === "berry") {
      body += stem(r, 100, 174, 100, 60, "#5d4a33");
      for (let i = 0; i < 3; i++) body += leaf(100, 150 - i * 34, -55, 30, 18, a.leaf, "ovate") + leaf(100, 146 - i * 34, 55, 30, 18, a.leaf, "ovate");
      const n = a.cluster ? 9 : 5;
      for (let i = 0; i < n; i++) {
        const bx = 100 + (r() - 0.5) * (a.cluster ? 40 : 30), by = 64 + (r() - 0.5) * (a.cluster ? 26 : 18);
        body += `<circle cx="${bx}" cy="${by}" r="${a.cluster ? 8 : 10}" fill="${a.berry}" stroke="${INK}" stroke-width="2.5"/><circle cx="${bx - 3}" cy="${by - 3}" r="2.5" fill="#fff" opacity=".55"/>`;
      }
    } else if (a.kind === "horsetail") {
      for (const dx of [-26, 0, 24]) {
        const top = 40 + Math.abs(dx);
        body += stem(r, 100 + dx, 174, 100 + dx, top, a.leaf);
        for (let y = 160; y > top + 8; y -= 16) {
          for (const s of [-1, 1]) body += `<path d="M${100 + dx},${y} q${s * 14},-6 ${s * 22},4" stroke="${INK}" stroke-width="2" fill="none"/>`;
        }
      }
    }
    return `<svg viewBox="0 0 200 190" class="plant-art" role="img" aria-label="${plant.ru}">${defs}<g filter="url(#wobble)">${body}</g></svg>`;
  }

  function pot(state = "idle") {
    return `<svg viewBox="0 0 320 300" class="pot-art ${state}" aria-hidden="true">${defs}
      <g filter="url(#wobble)">
        <g class="fire">
          <path d="M120,270 Q130,230 145,252 Q150,214 165,246 Q178,220 185,256 Q198,236 200,270Z" fill="#f08a24" stroke="${INK}" stroke-width="3"/>
          <path d="M140,270 Q148,248 158,258 Q166,240 175,262 Q182,252 184,270Z" fill="#f7d14a"/>
        </g>
        <path d="M96,284 L224,284" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
        <path d="M110,280 L124,260 M210,280 L196,260 M148,284 L160,262 L172,284" stroke="#5a3d26" stroke-width="9" stroke-linecap="round"/>
        <path d="M70,250 L92,214 M250,250 L228,214" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
        <path d="M60,118 Q46,240 160,244 Q274,240 260,118Z" fill="#3c3a3f" stroke="${INK}" stroke-width="5"/>
        <path d="M84,140 Q86,214 150,226" stroke="#6b6873" stroke-width="7" fill="none" stroke-linecap="round" opacity=".7"/>
        <ellipse cx="160" cy="118" rx="104" ry="26" fill="#2c2a30" stroke="${INK}" stroke-width="5"/>
        <ellipse class="brew" cx="160" cy="120" rx="88" ry="17" fill="#4a3424"/>
        <path d="M54,112 Q40,100 52,90 M266,112 Q280,100 268,90" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>
        <g class="steam">
          <path d="M120,94 q-12,-20 0,-38 q12,-18 0,-36" stroke="#9a8f7c" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
          <path d="M165,90 q-12,-20 0,-38 q12,-18 0,-36" stroke="#9a8f7c" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
          <path d="M205,94 q-12,-20 0,-38 q12,-18 0,-36" stroke="#9a8f7c" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
        </g>
      </g>
    </svg>`;
  }

  return { draw, pot };
})();
