/* Все используемые части растения (сырьё). Одна часть берётся из p.part; здесь только виды, у которых
   источник называет несколько частей. Источник тот же, что у строки «Сырьё» на странице растения
   (TEXTS.plants[id].drugSrc или выписка Карпука в K3.plants[id].harvest). Подключается после plants8.js. */
(function () {
  const P = {
    yarrow: ["flower", "herb"],          // Карпук с. 141–142: Millefolii flores и Millefolii herba
    dandelion: ["root", "herb"],         // EMA: Taraxaci radix cum herba
    birch: ["bud", "leaf"],              // Карпук с. 142: Betulae gemmae и Betulae folia
    bilberry: ["berry", "shoot"],        // Карпук с. 285–286: ягоды и побеги (Myrtilli cormi)
    hawthorn: ["flower", "leaf", "berry"], // Карпук с. 268–269: цветки, листья, плоды
    guelder: ["bark", "berry"],          // Карпук с. 113: кора и плоды
    melissa: ["leaf", "herb"],           // Карпук с. 129: листья и трава
    pinus: ["bud"],                      // Карпук с. 136: почки сосны
    hops: ["cone"],                      // Карпук с. 123: шишки хмеля
    picea: ["resin", "shoot", "cone"],   // Kustosz 2018: смола, молодые побеги, шишки
    fragaria: ["leaf", "berry"],         // Поликсенова с. 56
    convallaria: ["flower", "herb"],     // Поликсенова с. 58
    comarum: ["root", "leaf"],           // Поликсенова с. 63: корневища с корнями; в народной медицине и листья
    tansy: ["flower", "herb"],           // Карпук с. 134
    malva: ["flower", "leaf"],           // Карпук с. 83
    daucus: ["root", "berry"],           // Поликсенова с. 63–64: корнеплоды и плоды
    aesculus: ["seed", "leaf"],          // Поликсенова с. 79: семена и листья
    rubus: ["herb", "berry"],            // Петкявичюс и др., Tab. 1: трава и плоды
    cichorium: ["herb", "root"],         // Петкявичюс и др., Tab. 2; Łuczaj 2007 с. 13
    armoracia: ["root", "leaf"],         // Kustosz 2018
    padus: ["bark", "berry"],            // Петкявичюс и др., Tab. 2; Любань с. 25
    calluna: ["herb", "flower"],         // Петкявичюс и др., Tab. 1; Любань с. 15
    arctium: ["root", "leaf"],           // Петкявичюс и др., Tab. 2; Kustosz 2018
    petroselinum: ["root", "leaf"],      // Петкявичюс и др., Tab. 2; Любань (огороды)
    mentha_wild: ["herb", "leaf", "flower"], // Kustosz 2018: верх стебля, листья, цветки
    artemisia_v: ["herb", "root"],       // Петкявичюс и др., Tab. 1: трава и корневища
    potentilla_ans: ["herb", "root"],    // Kustosz 2018: ziele i korzenie
    carlina: ["root", "leaf", "herb"],   // Kustosz 2018: liście, ziele, korzeń
    nuphar: ["leaf", "flower", "root"],  // архив Фишера с. 9; Петкявичюс и др., Tab. 1
    populus: ["bark", "bud", "leaf"],    // Любань, Table 1, с. 18
    acer: ["leaf", "sap"],               // Любань, Table 1, с. 28; Łuczaj 2007, с. 12
    allium_urs: ["leaf", "bulb"],        // Любань, Table 1, с. 7–8; Łuczaj 2007, с. 17
    syringa: ["flower", "bud", "leaf"],  // Любань, Table 1, с. 20–21
    primula: ["herb", "flower"],         // Петкявичюс и др., Tab. 1
    arnica: ["flower", "leaf"],          // Петкявичюс и др., Tab. 1
    heracleum: ["root", "flower", "leaf"], // Kustosz 2018: korzeń, kwiaty; Prakofjewa 2023: liście
    nepeta: ["herb", "leaf"],            // Любань (огороды); Prakofjewa 2023
    pyrus: ["berry", "flower"],          // Любань, с. 25–26; Prakofjewa 2023
    rosa_canina: ["berry", "flower"],    // Kustosz 2018: kwiaty, owoce
    epilobium: ["herb", "flower", "leaf"], // Любань, Table 1, с. 21
  };
  for (const p of window.DATA.PLANTS) if (P[p.id]) p.parts = P[p.id];
})();
