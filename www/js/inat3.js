/* iNaturalist для растений из статей второй очереди (plants7–plants8): фото, число наблюдений по странам и по регионам.
   Источник и метод те же, что в inat2.js: открытый архив iNaturalist Open Data (выгрузка 2026-09-27), наблюдения
   исследовательского уровня с фото под открытой лицензией, вид с подвидами (у дикорастущих мят — четыре вида вместе).
   Страна и регион определены по координатам с границами Natural Earth admin-1, как на карте (mapdata.js).
   Фото: лицензии CC0, CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA, проверены по каждому снимку; файлы уменьшены до 500 px.
   Подключается после inat2.js. */
(function () {
  const P = {
 "acer": {
  "inat_name": "Acer platanoides",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 2692,
   "de": 5794,
   "sk": 205,
   "by": 1152
  },
  "photos": [
   {
    "file": "photos/acer-1.jpg",
    "author": "Thomas Nogatz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e0e3bd50-3151-4967-97c8-ffbf3293ef04",
    "photo_id": 740994989,
    "country": "de",
    "date": "2026-09-26",
    "caption": "Пальчатолопастные листья, Германия"
   },
   {
    "file": "photos/acer-2.jpg",
    "author": "Kasia Kobos",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d3fc2685-5366-42c6-9146-7c165df4ee7a",
    "photo_id": 741020137,
    "country": "pl",
    "date": "2026-09-26",
    "caption": "Молодая поросль у ствола, Польша"
   }
  ]
 },
 "allium_urs": {
  "inat_name": "Allium ursinum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 762,
   "de": 4102,
   "sk": 246,
   "by": 185
  },
  "photos": [
   {
    "file": "photos/allium_urs-1.jpg",
    "author": "berabosca",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/9012efe8-9b81-4846-a02a-f70dc53cfecf",
    "photo_id": 670069693,
    "country": "pl",
    "date": "2026-05-30",
    "caption": "Белые звёздчатые цветки, Польша"
   },
   {
    "file": "photos/allium_urs-2.jpg",
    "author": "Dirk Mezger",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/78bd455e-cec5-4818-bf15-1f2434a3b4ed",
    "photo_id": 670371827,
    "country": "de",
    "date": "2026-05-31",
    "caption": "Заросль листьев с цветками, Германия"
   }
  ]
 },
 "arnica": {
  "inat_name": "Arnica montana",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 18,
   "de": 551,
   "sk": 3,
   "by": 526
  },
  "photos": [
   {
    "file": "photos/arnica-1.jpg",
    "author": "Melina Heinrich Bielefeld",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/aab0212e-b5b4-42ed-a91a-1aa9c7072df1",
    "photo_id": 535377152,
    "country": "de",
    "date": "2025-07-12",
    "caption": "Оранжево-жёлтые корзинки, Германия"
   },
   {
    "file": "photos/arnica-2.jpg",
    "author": "Věra Kafková",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0455eca3-61b4-4022-89ec-ed51e799e265",
    "photo_id": 711186772,
    "country": "pl",
    "date": "2026-08-02",
    "caption": "Цветущее растение, Польша"
   }
  ]
 },
 "artemisia_v": {
  "inat_name": "Artemisia vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1878,
   "de": 3869,
   "sk": 158,
   "by": 829
  },
  "photos": [
   {
    "file": "photos/artemisia_v-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/da500342-8886-44e7-945e-793d0f4e36ba",
    "photo_id": 725180279,
    "country": "pl",
    "date": "2026-08-29",
    "caption": "Перисторассечённые листья, Польша"
   },
   {
    "file": "photos/artemisia_v-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/b4c2b892-5a71-499b-bde2-2258320a176c",
    "photo_id": 725833215,
    "country": "sk",
    "date": "2026-08-30",
    "caption": "Метёлки мелких корзинок, Словакия"
   }
  ]
 },
 "carlina": {
  "inat_name": "Carlina acaulis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 517,
   "de": 1287,
   "sk": 186,
   "by": 0
  },
  "photos": [
   {
    "file": "photos/carlina-1.jpg",
    "author": "kubakuba1988",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/7e10b75c-f5e7-4729-a0b0-445f264400f7",
    "photo_id": 725108985,
    "country": "pl",
    "date": "2026-08-29",
    "caption": "Серебристая корзинка, Польша"
   },
   {
    "file": "photos/carlina-2.jpg",
    "author": "trombon",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/9c831eb9-102e-4f42-87c9-b6ec1e918a1a",
    "photo_id": 726317072,
    "country": "sk",
    "date": "2026-08-31",
    "caption": "Корзинка в розетке колючих листьев, Словакия"
   }
  ]
 },
 "chimaphila": {
  "inat_name": "Chimaphila umbellata",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 81,
   "de": 74,
   "sk": 8,
   "by": 201
  },
  "photos": [
   {
    "file": "photos/chimaphila-1.jpg",
    "author": "Pawel Hermanowicz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c9f8aff3-656b-4936-9d8c-fc356971a62b",
    "photo_id": 696506986,
    "country": "pl",
    "date": "2026-07-12",
    "caption": "Кожистые зубчатые листья, Польша"
   },
   {
    "file": "photos/chimaphila-2.jpg",
    "author": "Sofja Komar",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f5485e4e-3d75-48ec-a0b3-602889041041",
    "photo_id": 717005157,
    "country": "by",
    "date": "2026-08-14",
    "caption": "Плодоносящее растение, Беларусь"
   }
  ]
 },
 "daphne": {
  "inat_name": "Daphne mezereum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 932,
   "de": 2014,
   "sk": 321,
   "by": 368
  },
  "photos": [
   {
    "file": "photos/daphne-1.jpg",
    "author": "S-V Kravchuk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/5e2eaa95-0c82-48fb-80bd-f14e930cf64b",
    "photo_id": 691550699,
    "country": "by",
    "date": "2026-07-04",
    "caption": "Красные ягоды, Беларусь"
   },
   {
    "file": "photos/daphne-2.jpg",
    "author": "Silvia Winklerova",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/38cda403-9a86-4f51-ac90-c489642ab441",
    "photo_id": 707851447,
    "country": "sk",
    "date": "2026-07-29",
    "caption": "Ягоды на стеблях, Словакия"
   }
  ]
 },
 "epilobium": {
  "inat_name": "Chamaenerion angustifolium",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1079,
   "de": 3253,
   "sk": 402,
   "by": 417
  },
  "photos": [
   {
    "file": "photos/epilobium-1.jpg",
    "author": "Mateusz Bronikowski",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6713a23a-d600-460e-915e-f15d4906653b",
    "photo_id": 725788604,
    "country": "pl",
    "date": "2026-08-30",
    "caption": "Пурпурные цветки, Польша"
   },
   {
    "file": "photos/epilobium-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/ce68f906-08c3-4462-a37e-04c15b919fb7",
    "photo_id": 725892642,
    "country": "sk",
    "date": "2026-08-30",
    "caption": "Цветущая кисть, Словакия"
   }
  ]
 },
 "fraxinus": {
  "inat_name": "Fraxinus excelsior",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1262,
   "de": 3057,
   "sk": 80,
   "by": 245
  },
  "photos": [
   {
    "file": "photos/fraxinus-1.jpg",
    "author": "Станислав",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/90854bc2-25ea-4e95-b19b-afbd9ffa36c3",
    "photo_id": 727448412,
    "country": "by",
    "date": "2026-09-02",
    "caption": "Непарноперистые листья, Беларусь"
   },
   {
    "file": "photos/fraxinus-2.jpg",
    "author": "pierogi p",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0c62ea8d-0e63-4a34-bf29-5808cf508caf",
    "photo_id": 739511342,
    "country": "pl",
    "date": "2026-09-23",
    "caption": "Крона, Польша"
   }
  ]
 },
 "heracleum": {
  "inat_name": "Heracleum sphondylium",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 267,
   "de": 3378,
   "sk": 123,
   "by": 7
  },
  "photos": [
   {
    "file": "photos/heracleum-1.jpg",
    "author": "Viktoryia Karaliova",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/88281f37-85cc-46d4-92ea-f50ba1c2a839",
    "photo_id": 740447785,
    "country": "by",
    "date": "2022-06-30",
    "caption": "Белый сложный зонтик, Беларусь"
   },
   {
    "file": "photos/heracleum-2.jpg",
    "author": "Attila Lengyel",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f18e4f6f-59ce-4192-9daa-7a63fd34763c",
    "photo_id": 723484649,
    "country": "sk",
    "date": "2026-08-25",
    "caption": "Зонтики крупным планом, Словакия"
   }
  ]
 },
 "ledum": {
  "inat_name": "Rhododendron tomentosum (Ledum palustre)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 761,
   "de": 127,
   "sk": 11,
   "by": 342
  },
  "photos": [
   {
    "file": "photos/ledum-1.jpg",
    "author": "Maciej Firlag",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0f66fe58-597b-4a40-8e61-b90dd1ca1d7c",
    "photo_id": 706614020,
    "country": "pl",
    "date": "2026-07-28",
    "caption": "Узкие листья с завёрнутым краем, Польша"
   },
   {
    "file": "photos/ledum-2.jpg",
    "author": "Władysław Łapicki",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/846c4dc5-7b0d-4cff-9c96-13e6328c9044",
    "photo_id": 707197478,
    "country": "by",
    "date": "2026-07-29",
    "caption": "Заросли на болоте, Беларусь"
   }
  ]
 },
 "linaria": {
  "inat_name": "Linaria vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1526,
   "de": 5153,
   "sk": 340,
   "by": 587
  },
  "photos": [
   {
    "file": "photos/linaria-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/258577e8-f5a7-4490-85c3-9238952b546b",
    "photo_id": 725707651,
    "country": "by",
    "date": "2026-08-30",
    "caption": "Жёлтые шпорцевые цветки, Беларусь"
   },
   {
    "file": "photos/linaria-2.jpg",
    "author": "Dominik Simakowski",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/fbe6ba3f-36aa-4cec-a2a0-3b772b445d78",
    "photo_id": 725736844,
    "country": "pl",
    "date": "2026-08-30",
    "caption": "Цветущая кисть, Польша"
   }
  ]
 },
 "lycopodium": {
  "inat_name": "Lycopodium clavatum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 463,
   "de": 207,
   "sk": 43,
   "by": 298
  },
  "photos": [
   {
    "file": "photos/lycopodium-1.jpg",
    "author": "Stepan Senator",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/7ac17ae9-55a5-466b-a4a0-352cda014cc3",
    "photo_id": 736297369,
    "country": "by",
    "date": "2026-09-17",
    "caption": "Спороносные колоски, Беларусь"
   },
   {
    "file": "photos/lycopodium-2.jpg",
    "author": "Matej Dudáš",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c81a1029-6b5c-402b-9035-d4856bf60c18",
    "photo_id": 694078618,
    "country": "sk",
    "date": "2026-07-07",
    "caption": "Стелющиеся побеги, Словакия"
   }
  ]
 },
 "melilotus": {
  "inat_name": "Melilotus officinalis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 355,
   "de": 894,
   "sk": 87,
   "by": 167
  },
  "photos": [
   {
    "file": "photos/melilotus-1.jpg",
    "author": "Matej Dudáš",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/fce78add-a226-4d17-b9e5-d148fa288113",
    "photo_id": 682030614,
    "country": "sk",
    "date": "2026-06-16",
    "caption": "Жёлтые кисти цветков, Словакия"
   },
   {
    "file": "photos/melilotus-2.jpg",
    "author": "Marlena Mosior",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0843d344-3bb7-44b0-b155-961f17fbd16d",
    "photo_id": 725190421,
    "country": "pl",
    "date": "2026-08-29",
    "caption": "Цветущий стебель, Польша"
   }
  ]
 },
 "mentha_wild": {
  "inat_name": "Mentha arvensis, M. aquatica, M. longifolia, M. spicata",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 578,
   "de": 2199,
   "sk": 293,
   "by": 240
  },
  "photos": [
   {
    "file": "photos/mentha_wild-1.jpg",
    "author": "Henrik Hempelmann",
    "license": "CC BY-NC-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c9d8e902-7149-447f-a44c-d04125d3623d",
    "photo_id": 726451851,
    "country": "de",
    "date": "2026-08-31",
    "caption": "Головка цветков мяты водной, Германия"
   },
   {
    "file": "photos/mentha_wild-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/fda16413-46b2-45c6-acc1-f2668e745cf8",
    "photo_id": 725941705,
    "country": "sk",
    "date": "2026-08-30",
    "caption": "Цветущие растения, Словакия"
   }
  ]
 },
 "nepeta": {
  "inat_name": "Nepeta cataria",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 12,
   "de": 33,
   "sk": 12,
   "by": 37
  },
  "photos": [
   {
    "file": "photos/nepeta-1.jpg",
    "author": "Karol Bubel",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/16a56f1f-cd88-4d0e-9cf6-baeade75b644",
    "photo_id": 544824157,
    "country": "pl",
    "date": "2025-07-30",
    "caption": "Цветущие верхушки, Польша"
   },
   {
    "file": "photos/nepeta-2.jpg",
    "author": "Tom Kirschey",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/82f0543b-d140-45cd-972c-81d7c428cbc8",
    "photo_id": 549809439,
    "country": "de",
    "date": "2025-08-09",
    "caption": "Соцветие и листья, Германия"
   }
  ]
 },
 "nuphar": {
  "inat_name": "Nuphar lutea",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 724,
   "de": 1199,
   "sk": 111,
   "by": 340
  },
  "photos": [
   {
    "file": "photos/nuphar-1.jpg",
    "author": "Marcel Gerigk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c7d66536-034f-458d-a99b-e386ecbab5ff",
    "photo_id": 739293449,
    "country": "pl",
    "date": "2026-08-26",
    "caption": "Жёлтый цветок, Польша"
   },
   {
    "file": "photos/nuphar-2.jpg",
    "author": "Станислав",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d6e16993-37d1-414d-a086-4b2fa86fb303",
    "photo_id": 726524909,
    "country": "by",
    "date": "2026-08-31",
    "caption": "Плавающие листья и цветок, Беларусь"
   }
  ]
 },
 "nymphaea": {
  "inat_name": "Nymphaea alba",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 189,
   "de": 449,
   "sk": 21,
   "by": 47
  },
  "photos": [
   {
    "file": "photos/nymphaea-1.jpg",
    "author": "Szczepan",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/ce5cb14e-bb29-4a4e-9f46-6e66ee1fe8d2",
    "photo_id": 725836255,
    "country": "pl",
    "date": "2026-08-30",
    "caption": "Белый цветок, Польша"
   },
   {
    "file": "photos/nymphaea-2.jpg",
    "author": "janag",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/52235a8d-3e8d-4eb2-aa83-7e05c357094a",
    "photo_id": 725261968,
    "country": "de",
    "date": "2026-08-29",
    "caption": "Цветки среди листьев, Германия"
   }
  ]
 },
 "polypodium": {
  "inat_name": "Polypodium vulgare",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 800,
   "de": 1102,
   "sk": 154,
   "by": 155
  },
  "photos": [
   {
    "file": "photos/polypodium-1.jpg",
    "author": "Mateusz Ciechanowski",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/02448ea2-0f5c-4698-a2fa-2c65221d09ff",
    "photo_id": 739900282,
    "country": "pl",
    "date": "2026-09-24",
    "caption": "Перисто-раздельные вайи, Польша"
   },
   {
    "file": "photos/polypodium-2.jpg",
    "author": "Björn Sothmann",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a8530133-11fd-43fc-82f3-07632d71d9ed",
    "photo_id": 734211423,
    "country": "de",
    "date": "2026-09-12",
    "caption": "Заросль на лесной подстилке, Германия"
   }
  ]
 },
 "populus": {
  "inat_name": "Populus tremula",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 760,
   "de": 1289,
   "sk": 75,
   "by": 580
  },
  "photos": [
   {
    "file": "photos/populus-1.jpg",
    "author": "Janek",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/b41305ee-a200-488d-8c2b-30c57193999e",
    "photo_id": 737236738,
    "country": "pl",
    "date": "2026-09-19",
    "caption": "Округлые листья, Польша"
   },
   {
    "file": "photos/populus-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/13dae881-aacf-48bd-bd17-013a4f211d2f",
    "photo_id": 737783452,
    "country": "sk",
    "date": "2026-09-20",
    "caption": "Ветка с листьями, Словакия"
   }
  ]
 },
 "potentilla_ans": {
  "inat_name": "Argentina anserina (Potentilla anserina)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1495,
   "de": 2576,
   "sk": 185,
   "by": 527
  },
  "photos": [
   {
    "file": "photos/potentilla_ans-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/246de45a-5ea8-4ec2-9e99-708aa819a20d",
    "photo_id": 725285155,
    "country": "by",
    "date": "2026-08-29",
    "caption": "Жёлтый цветок, Беларусь"
   },
   {
    "file": "photos/potentilla_ans-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/5d18d0f3-0e88-4eb9-b4a2-ec69552cc684",
    "photo_id": 725843414,
    "country": "sk",
    "date": "2026-08-30",
    "caption": "Серебристые перистые листья, Словакия"
   }
  ]
 },
 "primula": {
  "inat_name": "Primula veris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 730,
   "de": 4215,
   "sk": 312,
   "by": 338
  },
  "photos": [
   {
    "file": "photos/primula-1.jpg",
    "author": "Daniela Tomášiková",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e6eb6cfd-7999-4f2e-891c-3b2e8f0e5de9",
    "photo_id": 659028226,
    "country": "sk",
    "date": "2026-05-13",
    "caption": "Жёлтые цветки в зонтике, Словакия"
   },
   {
    "file": "photos/primula-2.jpg",
    "author": "janko_k",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f8ed7bc4-e645-4d9e-a416-25259ea21f01",
    "photo_id": 669768251,
    "country": "pl",
    "date": "2026-05-30",
    "caption": "Цветущие растения на лугу, Польша"
   }
  ]
 },
 "prunus_sp": {
  "inat_name": "Prunus spinosa",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 463,
   "de": 3149,
   "sk": 147,
   "by": 14
  },
  "photos": [
   {
    "file": "photos/prunus_sp-1.jpg",
    "author": "semion_levy",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e5abd897-b977-4cb6-9833-390dc23c6e89",
    "photo_id": 316375160,
    "country": "by",
    "date": "2023-09-01",
    "caption": "Сизые плоды, Беларусь"
   },
   {
    "file": "photos/prunus_sp-2.jpg",
    "author": "Tim Parker",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/73fd9169-03a6-4b75-a2f2-31f9a3836bfe",
    "photo_id": 739373265,
    "country": "de",
    "date": "2026-09-23",
    "caption": "Ветви с плодами, Германия"
   }
  ]
 },
 "pyrus": {
  "inat_name": "Pyrus communis subsp. pyraster",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 9,
   "de": 22,
   "sk": 7,
   "by": 17
  },
  "photos": [
   {
    "file": "photos/pyrus-1.jpg",
    "author": "tymek_cz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1ca51d41-6243-46af-9e0a-7e5143a4456a",
    "photo_id": 623646310,
    "country": "pl",
    "date": "2025-10-05",
    "caption": "Плоды дикой груши, Польша"
   },
   {
    "file": "photos/pyrus-2.jpg",
    "author": "Adam Kantor",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f3287c2d-556e-487f-ac20-d0c2ac78aca3",
    "photo_id": 237430574,
    "country": "sk",
    "date": "2022-09-17",
    "caption": "Ветка с плодом, Словакия"
   }
  ]
 },
 "rosa_canina": {
  "inat_name": "Rosa canina",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 220,
   "de": 680,
   "sk": 66,
   "by": 8
  },
  "photos": [
   {
    "file": "photos/rosa_canina-1.jpg",
    "author": "jozefdz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/3b2d42d0-82ae-47be-9479-c7e2841d6383",
    "photo_id": 728849807,
    "country": "sk",
    "date": "2026-09-04",
    "caption": "Плоды, Словакия"
   },
   {
    "file": "photos/rosa_canina-2.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a419a1d9-b117-4bc0-ae94-a41810b9475d",
    "photo_id": 735399506,
    "country": "pl",
    "date": "2026-09-16",
    "caption": "Плоды на ветке, Польша"
   }
  ]
 },
 "ruta": {
  "inat_name": "Ruta graveolens",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1,
   "de": 34,
   "sk": 1,
   "by": 12
  },
  "photos": [
   {
    "file": "photos/ruta-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1c0d10d7-bfc3-4461-9220-626a80dae568",
    "photo_id": 534054587,
    "country": "by",
    "date": "2025-07-09",
    "caption": "Жёлтые цветки, Беларусь"
   },
   {
    "file": "photos/ruta-2.jpg",
    "author": "Jacobo Krauel",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/337da0d4-d090-4575-9591-7f5a347d51ef",
    "photo_id": 708223360,
    "country": "de",
    "date": "2026-07-26",
    "caption": "Цветки и сизые листья, Германия"
   }
  ]
 },
 "sedum": {
  "inat_name": "Hylotelephium maximum (Sedum maximum)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 427,
   "de": 574,
   "sk": 102,
   "by": 158
  },
  "photos": [
   {
    "file": "photos/sedum-1.jpg",
    "author": "Gosława Olszewska",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/003eb785-a814-4cac-9558-051da32ea89b",
    "photo_id": 726273225,
    "country": "pl",
    "date": "2026-08-31",
    "caption": "Щиток цветков, Польша"
   },
   {
    "file": "photos/sedum-2.jpg",
    "author": "Monika Toncarová",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f5c39a74-0b90-4e0f-ba2d-abc90dbbfd51",
    "photo_id": 726898828,
    "country": "sk",
    "date": "2026-08-29",
    "caption": "Цветущее растение на камнях, Словакия"
   }
  ]
 },
 "stellaria": {
  "inat_name": "Stellaria media",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 893,
   "de": 1858,
   "sk": 94,
   "by": 255
  },
  "photos": [
   {
    "file": "photos/stellaria-1.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/6215bd03-3830-4724-a602-fdf5fb36c04f",
    "photo_id": 697781911,
    "country": "sk",
    "date": "2026-07-14",
    "caption": "Мелкий белый цветок, Словакия"
   },
   {
    "file": "photos/stellaria-2.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/15f517a2-9165-4ca1-912e-b26437e0d645",
    "photo_id": 726933881,
    "country": "by",
    "date": "2026-09-01",
    "caption": "Сочные листья, Беларусь"
   }
  ]
 },
 "syringa": {
  "inat_name": "Syringa vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 578,
   "de": 971,
   "sk": 64,
   "by": 223
  },
  "photos": [
   {
    "file": "photos/syringa-1.jpg",
    "author": "Marcin Dyderski",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c4872869-7fe2-4a7e-a137-f180e8090c81",
    "photo_id": 687630179,
    "country": "pl",
    "date": "2026-06-28",
    "caption": "Сердцевидные листья, Польша"
   },
   {
    "file": "photos/syringa-2.jpg",
    "author": "kokofrog",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/2d505777-6e5b-4b34-b661-5fc475b8aaef",
    "photo_id": 686991506,
    "country": "de",
    "date": "2026-06-26",
    "caption": "Отцветшие метёлки, Германия"
   }
  ]
 },
 "thymus_pul": {
  "inat_name": "Thymus pulegioides",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 118,
   "de": 752,
   "sk": 45,
   "by": 163
  },
  "photos": [
   {
    "file": "photos/thymus_pul-1.jpg",
    "author": "Tjorge Neumann",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d11a5d48-85a3-4cd4-af3f-e7e5c9f01ea4",
    "photo_id": 725244456,
    "country": "de",
    "date": "2026-08-28",
    "caption": "Цветущие кустики, Германия"
   },
   {
    "file": "photos/thymus_pul-2.jpg",
    "author": "Katrin Simon",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4956b32f-35ef-4c80-a38c-79d7abf3f568",
    "photo_id": 553592278,
    "country": "sk",
    "date": "2025-08-12",
    "caption": "Розовые соцветия, Словакия"
   }
  ]
 },
 "uliginosum": {
  "inat_name": "Vaccinium uliginosum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 459,
   "de": 488,
   "sk": 44,
   "by": 166
  },
  "photos": [
   {
    "file": "photos/uliginosum-1.jpg",
    "author": "S-V Kravchuk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f6a03bc9-cc60-4bba-8a1a-d0aeae22b001",
    "photo_id": 722655937,
    "country": "by",
    "date": "2026-08-24",
    "caption": "Сизая ягода, Беларусь"
   },
   {
    "file": "photos/uliginosum-2.jpg",
    "author": "Mateusz Ciechanowski",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0783b370-c650-48d7-9dcc-9128647a3c5f",
    "photo_id": 732399767,
    "country": "pl",
    "date": "2026-09-11",
    "caption": "Ягоды на кустике, Польша"
   }
  ]
 },
 "urtica_urens": {
  "inat_name": "Urtica urens",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 131,
   "de": 606,
   "sk": 5,
   "by": 25
  },
  "photos": [
   {
    "file": "photos/urtica_urens-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/974f2f1a-3179-4edc-8e3d-062f5876a87d",
    "photo_id": 685136977,
    "country": "by",
    "date": "2026-06-24",
    "caption": "Соцветия и жгучие волоски, Беларусь"
   },
   {
    "file": "photos/urtica_urens-2.jpg",
    "author": "Marcin Dyderski",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6ebf9cc5-7a6f-4b1a-b91a-06bbd2c024c5",
    "photo_id": 697869964,
    "country": "pl",
    "date": "2026-07-14",
    "caption": "Молодое растение, Польша"
   }
  ]
 },
 "vinca": {
  "inat_name": "Vinca minor",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1403,
   "de": 3080,
   "sk": 228,
   "by": 646
  },
  "photos": [
   {
    "file": "photos/vinca-1.jpg",
    "author": "and_gom",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6691087f-a849-428a-8c83-0f9b079e6633",
    "photo_id": 670143212,
    "country": "pl",
    "date": "2026-05-31",
    "caption": "Сине-фиолетовый цветок, Польша"
   },
   {
    "file": "photos/vinca-2.jpg",
    "author": "Dirk Mezger",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/dc54f1a1-bfa9-4aaa-86ce-5dc5c1968fe1",
    "photo_id": 669791264,
    "country": "de",
    "date": "2026-05-30",
    "caption": "Цветок среди листьев, Германия"
   }
  ]
 }
};
  const R = {"acer":{"de-ni":348,"de-bb":199,"de-nw":440,"by-br":142,"de-by":618,"de-sn":703,"de-bw":524,"de-sl":44,"de-be":1156,"de-rp":211,"de-st":119,"pl-zp":63,"de-he":638,"de-mv":54,"de-th":74,"pl-ma":432,"by-hr":212,"pl-kp":183,"by-mi":641,"pl-ds":266,"pl-mz":660,"pl-pd":106,"de-hh":52,"pl-pm":166,"de-sh":565,"by-vi":52,"de-hb":49,"pl-wn":91,"pl-sl":237,"pl-pk":66,"pl-ld":151,"by-ma":48,"by-ho":57,"pl-sk":21,"pl-lu":36,"sk-bl":97,"pl-op":18,"pl-lb":17,"pl-wp":179,"sk-pv":21,"sk-ni":10,"sk-zi":33,"sk-tc":8,"sk-bc":16,"sk-ki":11,"sk-ta":9},"allium_urs":{"de-rp":140,"de-nw":402,"de-sn":427,"de-ni":435,"de-by":749,"de-bw":921,"pl-pd":62,"de-sl":70,"de-he":437,"sk-zi":18,"de-th":80,"de-sh":192,"de-mv":16,"sk-bl":154,"pl-zp":30,"pl-ma":290,"de-be":60,"pl-pk":90,"de-st":85,"de-bb":21,"by-vi":11,"pl-sl":131,"sk-ta":35,"by-hr":26,"pl-ds":75,"by-mi":54,"de-hb":24,"sk-pv":10,"pl-op":23,"pl-lu":4,"by-br":58,"sk-ki":15,"pl-sk":6,"de-hh":43,"pl-wp":8,"pl-mz":26,"sk-bc":5,"by-ho":11,"pl-lb":7,"by-ma":25,"sk-tc":6,"pl-kp":3,"pl-pm":2,"sk-ni":3,"pl-ld":5},"arnica":{"de-nw":33,"de-sn":20,"de-ni":24,"de-bw":155,"by-mi":382,"by-vi":6,"de-by":179,"de-he":90,"de-th":16,"by-br":59,"de-rp":18,"by-hr":76,"pl-pd":5,"de-sh":7,"de-st":9,"by-ma":3,"pl-ds":11,"sk-pv":3,"pl-ma":2},"artemisia_v":{"de-by":225,"de-he":738,"de-be":752,"de-sn":319,"de-bw":197,"de-sl":35,"de-st":76,"de-nw":360,"pl-pm":186,"by-vi":46,"de-bb":113,"de-rp":208,"pl-zp":51,"pl-ds":141,"de-sh":419,"de-ni":225,"sk-tc":11,"by-mi":469,"de-th":56,"pl-ma":127,"by-hr":84,"de-hh":57,"pl-mz":300,"pl-kp":313,"pl-pk":47,"de-mv":64,"pl-sl":95,"de-hb":25,"by-br":101,"pl-pd":62,"pl-lu":47,"sk-pv":18,"by-ma":42,"pl-wp":143,"sk-ta":8,"pl-ld":209,"by-ho":87,"pl-sk":16,"pl-lb":17,"sk-bl":55,"sk-zi":35,"pl-wn":107,"sk-bc":15,"sk-ni":5,"sk-ki":11,"pl-op":17},"carlina":{"pl-ma":304,"de-by":783,"de-ni":9,"de-th":63,"sk-pv":37,"de-bw":400,"pl-pk":41,"sk-zi":79,"sk-bc":33,"de-st":8,"de-nw":1,"pl-ds":94,"pl-sl":38,"de-he":19,"pl-sk":13,"sk-bl":1,"de-rp":1,"sk-ki":21,"sk-tc":11,"pl-lu":23,"pl-op":4,"sk-ta":4,"de-sn":3},"chimaphila":{"by-vi":23,"pl-zp":3,"pl-ld":3,"by-mi":53,"by-br":37,"by-hr":40,"de-by":27,"pl-pk":2,"by-ho":42,"pl-mz":13,"pl-wn":3,"pl-ma":11,"by-ma":6,"pl-sl":14,"de-he":9,"pl-lu":3,"pl-pd":13,"pl-lb":6,"de-bw":3,"de-sn":11,"de-ni":4,"de-bb":18,"sk-pv":1,"sk-zi":3,"pl-sk":5,"pl-pm":5,"sk-tc":1,"de-mv":2,"sk-bc":2,"sk-ta":1},"daphne":{"de-nw":109,"pl-ma":208,"de-by":1046,"de-ni":161,"pl-pd":148,"pl-sl":70,"pl-zp":6,"sk-zi":132,"de-bw":375,"by-mi":130,"by-vi":46,"de-rp":30,"de-th":73,"by-hr":119,"pl-ds":101,"pl-wn":30,"pl-pm":29,"pl-lb":2,"pl-pk":128,"de-he":157,"de-bb":2,"de-st":22,"sk-pv":79,"sk-bc":50,"pl-lu":96,"pl-sk":26,"by-br":58,"de-sn":35,"sk-ki":31,"pl-mz":30,"pl-wp":21,"by-ma":13,"pl-ld":21,"by-ho":2,"pl-op":8,"de-sl":4,"sk-tc":20,"pl-kp":8,"sk-bl":6,"sk-ni":2,"sk-ta":1},"epilobium":{"de-nw":390,"pl-pk":90,"pl-ma":364,"by-vi":46,"de-he":392,"de-bw":547,"de-rp":208,"de-sn":208,"de-th":108,"de-by":480,"de-ni":430,"pl-zp":48,"de-sh":200,"de-sl":30,"sk-zi":107,"de-hh":25,"de-st":107,"de-bb":58,"sk-pv":232,"de-be":14,"by-hr":42,"pl-kp":16,"by-ma":17,"pl-pm":129,"pl-lu":21,"by-mi":220,"pl-ds":159,"pl-pd":29,"de-mv":28,"by-br":59,"pl-sl":80,"pl-ld":19,"pl-lb":16,"pl-mz":49,"by-ho":33,"de-hb":28,"sk-bc":42,"pl-sk":10,"pl-wp":20,"pl-wn":22,"sk-tc":3,"sk-ki":17,"pl-op":7,"sk-bl":1},"fraxinus":{"de-ni":162,"pl-ma":246,"de-bw":1028,"de-sl":20,"de-rp":104,"de-nw":177,"pl-zp":33,"de-sn":172,"de-be":90,"de-he":402,"sk-bc":8,"de-by":439,"sk-ta":7,"de-th":52,"pl-mz":199,"by-hr":74,"de-mv":25,"de-bb":60,"pl-pd":49,"pl-kp":92,"pl-ds":165,"de-st":48,"pl-sl":94,"pl-pk":43,"by-ho":16,"de-sh":235,"pl-ld":43,"by-mi":49,"pl-sk":10,"pl-lu":25,"pl-op":14,"by-br":77,"by-vi":24,"pl-wp":112,"sk-bl":24,"de-hb":28,"de-hh":15,"pl-wn":37,"sk-zi":18,"pl-pm":86,"by-ma":5,"pl-lb":14,"sk-pv":4,"sk-ki":7,"sk-tc":10,"sk-ni":2},"heracleum":{"de-nw":535,"pl-ma":48,"de-sl":76,"de-he":619,"de-sn":202,"de-bb":54,"de-bw":518,"de-rp":206,"pl-kp":31,"de-by":516,"pl-zp":9,"sk-zi":44,"de-sh":178,"sk-tc":8,"de-ni":266,"de-hh":16,"pl-pd":9,"sk-ni":6,"de-th":49,"de-mv":28,"by-vi":1,"pl-ds":28,"de-hb":27,"pl-pm":21,"de-be":54,"pl-sl":28,"de-st":34,"by-mi":1,"by-br":3,"pl-pk":8,"pl-mz":34,"sk-pv":20,"by-hr":1,"sk-ki":14,"sk-ta":3,"pl-wn":16,"pl-ld":8,"pl-wp":16,"pl-lu":4,"sk-bc":16,"pl-op":3,"pl-lb":3,"sk-bl":12,"by-ma":1,"pl-sk":1},"ledum":{"pl-pd":55,"de-sn":27,"by-vi":97,"by-ho":30,"pl-zp":126,"pl-lb":12,"pl-wn":45,"by-hr":29,"pl-pm":175,"pl-mz":98,"pl-kp":5,"pl-lu":52,"pl-sl":56,"pl-ld":21,"de-nw":1,"by-mi":76,"by-br":97,"by-ma":13,"pl-sk":27,"de-bb":28,"pl-ma":47,"pl-pk":26,"de-sh":6,"pl-op":3,"de-mv":60,"sk-zi":11,"pl-ds":9,"pl-wp":4,"de-by":3,"de-ni":2},"linaria":{"de-nw":601,"de-bw":574,"de-sn":323,"de-ni":416,"de-he":788,"de-be":261,"de-sl":86,"de-th":100,"de-rp":587,"pl-mz":293,"de-by":523,"pl-kp":107,"de-bb":246,"pl-zp":82,"sk-tc":27,"de-st":161,"by-mi":317,"by-vi":34,"de-mv":145,"de-sh":241,"by-hr":51,"de-hh":63,"by-br":93,"pl-ld":96,"pl-ds":128,"pl-lu":104,"pl-pd":60,"pl-pm":154,"sk-zi":55,"pl-lb":25,"de-hb":38,"sk-bc":51,"sk-bl":107,"sk-ta":33,"pl-ma":116,"pl-wp":125,"pl-sl":74,"by-ho":63,"by-ma":29,"pl-pk":58,"pl-sk":29,"pl-wn":58,"sk-pv":24,"sk-ni":21,"sk-ki":22,"pl-op":17},"lycopodium":{"de-nw":7,"by-vi":31,"de-sn":21,"by-mi":79,"pl-zp":7,"pl-wn":13,"pl-pk":46,"by-hr":35,"de-he":35,"sk-bc":7,"by-br":94,"pl-pm":54,"pl-ma":71,"de-ni":19,"de-bw":34,"pl-ds":74,"pl-pd":26,"pl-ld":17,"pl-sl":49,"pl-sk":13,"pl-lu":21,"de-rp":5,"de-by":54,"pl-mz":46,"by-ho":52,"de-bb":14,"de-th":8,"sk-pv":13,"by-ma":7,"de-mv":4,"sk-tc":5,"pl-lb":14,"sk-zi":12,"pl-kp":4,"sk-bl":1,"de-st":3,"sk-ki":4,"de-sh":3,"pl-wp":3,"sk-ta":1,"pl-op":5},"melilotus":{"de-nw":106,"de-bw":109,"de-be":90,"de-sl":17,"de-rp":60,"de-he":156,"pl-wn":22,"pl-zp":15,"de-ni":92,"de-by":128,"by-vi":24,"sk-zi":13,"de-bb":28,"de-sn":43,"pl-kp":66,"pl-lu":27,"de-sh":24,"by-hr":14,"by-mi":97,"de-st":17,"sk-bl":26,"by-ho":8,"sk-ta":7,"by-br":17,"by-ma":7,"de-hh":4,"sk-pv":9,"pl-ma":45,"pl-pd":9,"de-th":9,"sk-bc":16,"pl-mz":57,"pl-wp":23,"pl-ds":10,"de-hb":4,"pl-pk":15,"pl-pm":20,"sk-ni":6,"pl-sl":21,"de-mv":7,"pl-op":5,"sk-ki":8,"pl-sk":6,"pl-ld":13,"sk-tc":2,"pl-lb":1},"mentha_wild":{"de-sn":65,"de-nw":197,"de-ni":219,"by-br":48,"pl-ma":149,"de-bb":54,"de-sl":39,"de-bw":299,"de-sh":120,"de-he":252,"de-by":658,"de-rp":114,"de-th":18,"pl-zp":57,"pl-pd":10,"sk-ki":36,"sk-tc":26,"by-vi":28,"by-mi":73,"de-be":37,"pl-lb":5,"by-hr":37,"sk-ta":11,"sk-zi":109,"de-mv":65,"pl-kp":33,"sk-pv":46,"de-hh":6,"sk-ni":9,"pl-mz":64,"de-st":52,"pl-pk":25,"by-ho":41,"pl-wp":50,"sk-bc":28,"pl-wn":21,"pl-sl":52,"pl-pm":45,"pl-ld":16,"de-hb":4,"pl-sk":3,"pl-lu":21,"pl-ds":16,"sk-bl":28,"pl-op":11,"by-ma":13},"nepeta":{"de-be":2,"de-bw":8,"by-mi":19,"by-ma":2,"by-br":7,"de-he":11,"by-vi":1,"pl-mz":2,"pl-kp":3,"by-ho":6,"de-by":4,"de-rp":3,"de-st":3,"sk-tc":4,"de-nw":1,"sk-bc":2,"by-hr":2,"sk-ki":1,"sk-ta":1,"pl-lu":3,"pl-sk":1,"pl-ma":2,"sk-pv":2,"pl-sl":1,"de-bb":1,"sk-zi":1,"sk-ni":1},"nuphar":{"de-rp":58,"by-br":82,"de-nw":78,"de-sl":50,"de-bb":126,"de-sn":25,"de-he":101,"de-bw":151,"de-by":263,"pl-pd":52,"pl-pm":65,"pl-zp":86,"de-ni":118,"de-mv":67,"de-sh":48,"de-hh":22,"de-be":48,"pl-mz":61,"pl-wp":144,"by-hr":32,"sk-bl":39,"pl-lu":35,"pl-kp":55,"by-vi":46,"sk-ta":7,"pl-ld":16,"by-mi":114,"pl-wn":91,"pl-lb":16,"pl-pk":7,"pl-ma":20,"by-ho":49,"de-hb":11,"by-ma":17,"de-st":31,"pl-sl":31,"de-th":2,"pl-ds":33,"pl-op":6,"sk-ki":59,"sk-ni":6,"pl-sk":6},"nymphaea":{"de-nw":55,"by-br":14,"de-sl":20,"de-rp":13,"de-sn":30,"de-bw":55,"de-by":96,"de-bb":36,"pl-zp":41,"de-ni":28,"de-mv":31,"de-he":23,"de-st":5,"de-hh":5,"de-be":21,"pl-pd":8,"pl-wn":20,"pl-lu":18,"sk-ta":4,"by-hr":3,"pl-mz":19,"pl-lb":3,"de-hb":6,"pl-kp":7,"de-sh":13,"pl-pm":12,"de-th":12,"pl-ma":5,"pl-wp":40,"pl-pk":2,"pl-sl":5,"by-ho":17,"pl-ld":5,"by-ma":4,"pl-ds":3,"by-mi":7,"sk-bl":2,"sk-ki":12,"sk-bc":1,"by-vi":2,"sk-zi":1,"sk-pv":1,"pl-op":1},"polypodium":{"de-nw":54,"pl-ma":148,"de-by":164,"de-bw":120,"de-he":157,"de-bb":30,"de-th":33,"de-st":44,"de-ni":115,"de-rp":172,"de-sn":73,"by-hr":52,"pl-zp":77,"de-sh":76,"sk-bc":30,"pl-pm":166,"de-mv":40,"pl-ds":115,"de-be":8,"pl-lu":33,"pl-pk":90,"pl-sl":21,"by-mi":10,"by-br":71,"pl-kp":21,"de-hh":7,"pl-ld":11,"sk-pv":24,"by-ho":17,"pl-mz":23,"pl-wp":13,"pl-wn":15,"de-sl":9,"pl-sk":9,"sk-tc":9,"pl-op":4,"sk-ki":23,"sk-zi":45,"pl-lb":47,"pl-pd":7,"sk-bl":13,"sk-ni":7,"by-ma":2,"sk-ta":3,"by-vi":3},"populus":{"de-he":246,"pl-ma":124,"de-sn":81,"de-bw":121,"de-sl":15,"de-rp":67,"de-by":199,"pl-zp":27,"de-bb":68,"pl-lu":20,"de-nw":98,"de-be":78,"de-mv":41,"by-hr":89,"pl-mz":92,"by-vi":28,"pl-pm":78,"pl-kp":39,"by-br":82,"by-mi":307,"de-th":21,"de-sh":103,"pl-ds":37,"de-ni":103,"pl-pd":24,"by-ma":26,"pl-sl":69,"pl-ld":90,"pl-pk":28,"pl-sk":12,"pl-wn":26,"by-ho":48,"de-hh":9,"de-st":35,"pl-wp":79,"sk-zi":24,"de-hb":4,"sk-bc":12,"sk-tc":5,"pl-op":10,"sk-ki":14,"sk-pv":13,"sk-bl":6,"pl-lb":5,"sk-ni":1},"potentilla_ans":{"de-he":293,"de-bb":88,"de-bw":267,"de-nw":236,"de-sn":139,"pl-sl":95,"de-sl":16,"de-hb":20,"de-by":395,"pl-pk":52,"pl-pd":75,"de-th":54,"de-ni":290,"pl-zp":47,"de-mv":86,"pl-ma":363,"de-rp":112,"pl-wp":81,"by-hr":47,"de-sh":456,"de-st":45,"pl-kp":64,"by-mi":265,"de-be":46,"de-hh":33,"sk-zi":50,"by-vi":38,"pl-ds":106,"by-br":89,"pl-pm":133,"sk-bc":16,"by-ma":23,"by-ho":65,"pl-mz":233,"pl-ld":86,"pl-sk":34,"pl-op":14,"sk-pv":57,"pl-lu":29,"pl-wn":69,"sk-tc":14,"pl-lb":14,"sk-ki":31,"sk-bl":8,"sk-ni":4,"sk-ta":5},"primula":{"de-rp":575,"de-nw":277,"de-ni":324,"de-bw":863,"de-st":162,"de-sl":65,"de-he":621,"de-by":743,"pl-zp":118,"sk-bc":61,"de-th":221,"by-mi":162,"pl-lb":20,"by-hr":69,"de-bb":89,"de-mv":42,"sk-zi":25,"de-be":106,"de-sh":75,"pl-wn":18,"pl-pd":63,"pl-kp":35,"sk-tc":75,"pl-wp":27,"pl-sl":48,"de-sn":38,"pl-ma":62,"pl-pm":47,"by-vi":36,"pl-ds":67,"by-ho":5,"by-br":49,"sk-pv":22,"pl-pk":38,"de-hh":11,"sk-ki":53,"sk-bl":42,"pl-sk":28,"pl-ld":7,"pl-lu":135,"pl-mz":12,"sk-ta":15,"by-ma":17,"sk-ni":19,"de-hb":3,"pl-op":5},"prunus_sp":{"de-he":502,"de-nw":369,"de-bw":411,"de-st":53,"pl-pk":30,"de-rp":247,"de-by":547,"de-sl":27,"de-mv":76,"de-bb":65,"de-th":78,"pl-zp":16,"sk-zi":36,"de-ni":248,"sk-tc":12,"de-be":93,"de-sh":296,"pl-ma":72,"de-sn":111,"pl-kp":70,"pl-ds":25,"pl-mz":46,"sk-bc":16,"pl-sl":34,"pl-sk":11,"pl-lu":29,"de-hh":21,"sk-ki":18,"pl-wp":81,"sk-pv":15,"sk-ni":13,"by-ma":1,"pl-pm":16,"sk-ta":12,"pl-wn":9,"by-ho":3,"pl-pd":3,"sk-bl":25,"by-hr":2,"pl-lb":5,"de-hb":5,"by-vi":1,"by-br":5,"pl-op":4,"by-mi":2,"pl-ld":12},"pyrus":{"pl-mz":1,"de-by":13,"by-mi":4,"by-hr":2,"pl-kp":3,"by-ho":8,"by-br":2,"pl-pd":2,"de-th":1,"by-vi":1,"de-rp":2,"pl-wp":2,"de-bw":4,"sk-zi":1,"sk-pv":2,"sk-ki":1,"de-ni":2,"pl-ma":1,"sk-bc":2,"sk-ni":1},"rosa_canina":{"sk-bl":27,"de-nw":113,"de-ni":50,"de-sn":59,"by-br":2,"de-sl":17,"de-th":12,"de-bw":85,"de-be":39,"de-he":76,"de-by":71,"pl-zp":19,"sk-zi":9,"de-rp":42,"de-st":25,"pl-ma":28,"de-bb":18,"sk-ta":5,"pl-kp":5,"de-sh":50,"de-mv":16,"pl-ds":18,"by-hr":3,"pl-wp":40,"de-hb":4,"pl-sl":20,"sk-bc":9,"pl-wn":4,"pl-ld":10,"sk-pv":4,"pl-mz":47,"pl-pk":6,"sk-tc":4,"sk-ki":2,"sk-ni":6,"pl-pm":13,"by-mi":2,"pl-pd":3,"pl-lu":5,"pl-op":1,"pl-lb":1,"de-hh":3,"by-ho":1},"ruta":{"de-he":6,"de-by":6,"de-bw":8,"by-hr":1,"by-mi":9,"de-ni":2,"de-sn":1,"de-bb":1,"by-br":2,"de-st":2,"sk-tc":1,"de-be":3,"pl-mz":1,"de-nw":2,"de-rp":2,"de-th":1},"sedum":{"de-bw":15,"de-nw":14,"pl-pd":9,"de-he":53,"by-vi":2,"pl-zp":28,"pl-ma":57,"de-mv":37,"by-hr":19,"de-sn":64,"de-by":98,"by-br":35,"pl-sl":18,"de-th":36,"by-mi":44,"de-sh":51,"pl-kp":20,"pl-ds":89,"de-st":55,"de-ni":33,"pl-mz":65,"by-ho":50,"de-rp":33,"pl-wn":7,"sk-zi":25,"pl-wp":22,"de-bb":58,"pl-pm":33,"sk-bc":14,"pl-lu":43,"pl-sk":8,"sk-ki":14,"de-be":25,"de-hh":2,"sk-tc":7,"sk-ni":4,"sk-pv":23,"sk-bl":12,"by-ma":8,"sk-ta":3,"pl-pk":3,"pl-op":7,"pl-lb":10,"pl-ld":8},"stellaria":{"de-ni":108,"de-sn":138,"de-nw":170,"de-by":150,"de-bb":63,"de-he":296,"de-bw":118,"de-sl":8,"de-st":31,"pl-zp":49,"de-be":531,"pl-ds":45,"sk-bl":34,"pl-wp":104,"pl-kp":89,"de-mv":35,"de-sh":64,"pl-ma":88,"de-rp":113,"de-hh":13,"by-hr":32,"by-br":68,"pl-mz":139,"pl-lb":15,"pl-pk":26,"pl-ld":145,"pl-pm":62,"by-mi":115,"de-th":13,"by-vi":6,"by-ho":18,"by-ma":16,"pl-pd":14,"pl-op":11,"pl-sl":53,"pl-lu":29,"sk-ta":9,"sk-zi":13,"pl-sk":4,"pl-wn":20,"de-hb":7,"sk-bc":10,"sk-tc":3,"sk-ni":14,"sk-pv":3,"sk-ki":8},"syringa":{"de-bw":91,"de-sl":12,"de-hh":17,"de-sn":78,"de-nw":53,"pl-zp":38,"de-be":176,"by-hr":43,"pl-kp":41,"sk-ni":6,"de-st":35,"pl-mz":137,"de-rp":52,"de-ni":44,"de-he":110,"de-bb":51,"de-by":119,"pl-lb":8,"pl-sl":17,"pl-ds":37,"de-sh":83,"de-th":34,"pl-wp":86,"by-mi":83,"pl-pd":12,"pl-ma":41,"by-br":34,"by-vi":11,"by-ma":17,"pl-ld":76,"sk-zi":8,"sk-ta":5,"by-ho":35,"sk-bl":30,"sk-ki":4,"de-hb":8,"sk-tc":1,"pl-pk":12,"pl-pm":31,"pl-sk":8,"pl-wn":21,"de-mv":8,"pl-op":4,"sk-bc":7,"pl-lu":9,"sk-pv":3},"thymus_pul":{"de-nw":69,"de-bw":167,"de-sl":24,"de-rp":45,"de-by":192,"pl-zp":18,"de-ni":71,"de-th":9,"by-mi":83,"pl-ma":24,"by-hr":23,"de-he":79,"pl-ds":23,"de-be":14,"de-sn":24,"sk-tc":8,"de-st":12,"by-vi":17,"pl-lb":3,"by-ho":12,"pl-sl":15,"by-br":13,"pl-wn":6,"de-mv":6,"sk-bc":13,"pl-pd":3,"de-sh":19,"sk-pv":10,"de-hh":2,"pl-kp":1,"de-bb":18,"by-ma":15,"pl-wp":5,"pl-ld":3,"pl-pm":1,"sk-ki":3,"sk-bl":7,"sk-zi":4,"pl-pk":5,"de-hb":1,"pl-lu":4,"pl-op":3,"pl-mz":4},"uliginosum":{"de-nw":16,"pl-pd":33,"de-by":183,"de-sn":22,"by-vi":35,"de-he":15,"de-bw":157,"by-hr":17,"pl-ma":32,"pl-kp":1,"pl-pm":83,"pl-zp":97,"pl-lu":20,"by-br":58,"by-mi":40,"de-ni":69,"pl-ds":98,"pl-mz":44,"de-mv":5,"by-ma":11,"pl-pk":7,"sk-pv":27,"de-sh":19,"de-th":1,"pl-wn":7,"pl-sk":11,"by-ho":5,"pl-ld":4,"sk-zi":16,"de-st":1,"pl-sl":20,"pl-lb":1,"sk-bc":1,"pl-wp":1},"urtica_urens":{"de-be":316,"pl-zp":10,"de-bw":27,"de-he":72,"de-nw":61,"pl-kp":28,"de-sh":10,"de-ni":43,"de-rp":24,"by-hr":6,"pl-wp":18,"pl-mz":28,"de-st":8,"pl-ma":3,"pl-pm":23,"by-br":5,"by-mi":4,"by-ma":2,"de-bb":1,"de-sn":8,"pl-sl":5,"de-th":6,"de-by":12,"de-mv":9,"by-vi":2,"by-ho":6,"sk-bl":3,"pl-lu":2,"pl-wn":2,"pl-ld":8,"de-hh":6,"de-hb":3,"pl-ds":2,"sk-pv":2,"pl-lb":1,"pl-sk":1},"vinca":{"de-he":361,"de-nw":374,"de-rp":241,"de-sn":165,"de-sl":38,"de-bw":528,"de-bb":80,"de-hh":30,"de-by":515,"de-be":185,"pl-ds":125,"by-ma":33,"pl-zp":81,"de-ni":225,"pl-pk":101,"sk-bl":50,"pl-ma":214,"by-hr":98,"pl-sl":110,"de-sh":199,"pl-lb":36,"pl-wp":110,"de-th":65,"by-mi":303,"pl-mz":227,"de-mv":20,"pl-kp":34,"sk-zi":33,"pl-ld":86,"de-st":43,"pl-sk":16,"pl-pm":77,"sk-ki":43,"by-br":134,"pl-lu":102,"by-vi":9,"sk-bc":29,"pl-op":22,"pl-pd":31,"pl-wn":31,"de-hb":11,"sk-ni":15,"by-ho":69,"sk-pv":31,"sk-ta":14,"sk-tc":13}};
  for (const k in P) if (window.INAT && !window.INAT.plants[k]) window.INAT.plants[k] = P[k];
  for (const k in R) if (window.MAPDATA && !window.MAPDATA.counts[k]) window.MAPDATA.counts[k] = R[k];
})();
