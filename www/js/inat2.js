/* iNaturalist для растений из статей (plants3–plants6): фото, число наблюдений по странам и по регионам.
   Источник: открытый архив iNaturalist Open Data (s3://inaturalist-open-data, выгрузка 2026-09-27): наблюдения
   исследовательского уровня, у которых есть фото с открытой лицензией, вид с подвидами (у ив, коровяков и лопухов весь род).
   Страна и регион определены по координатам с границами Natural Earth admin-1, как на карте (mapdata.js).
   Фото: лицензии CC0, CC BY, CC BY-SA, CC BY-NC, CC BY-NC-SA, проверены по каждому снимку; файлы уменьшены до 500 px.
   Подключается после plants6.js. */
(function () {
  const P = {
 "sorbus": {
  "inat_name": "Sorbus aucuparia",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 2304,
   "de": 3410,
   "sk": 211,
   "by": 940
  },
  "photos": [
   {
    "file": "photos/sorbus-1.jpg",
    "author": "S-V Kravchuk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/cc4636a0-9bc0-4fda-aa30-ef7a55ac8abb",
    "photo_id": 731104437,
    "country": "by",
    "date": "2026-09-08",
    "caption": "Крупные щитки красных плодов, Беларусь"
   },
   {
    "file": "photos/sorbus-2.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/4c9ee85b-32f8-4385-9cda-8bafe39bf7ea",
    "photo_id": 733842687,
    "country": "sk",
    "date": "2026-09-13",
    "caption": "Плоды среди перистых листьев, Словакия"
   }
  ]
 },
 "fragaria": {
  "inat_name": "Fragaria vesca",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 814,
   "de": 2295,
   "sk": 89,
   "by": 608
  },
  "photos": [
   {
    "file": "photos/fragaria-1.jpg",
    "author": "Александр Жуковский",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a495dad6-9861-4eb6-a9fc-abd229b04633",
    "photo_id": 727309886,
    "country": "by",
    "date": "2026-07-21",
    "caption": "Белый цветок и тройчатые листья, Беларусь"
   },
   {
    "file": "photos/fragaria-2.jpg",
    "author": "Linda Ručková",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/df4b35af-f5c5-4933-9dd6-62aa737ef1c2",
    "photo_id": 548054300,
    "country": "sk",
    "date": "2025-08-05",
    "caption": "Спелая ягода, Словакия"
   }
  ]
 },
 "convallaria": {
  "inat_name": "Convallaria majalis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1882,
   "de": 3238,
   "sk": 178,
   "by": 804
  },
  "photos": [
   {
    "file": "photos/convallaria-1.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/5218747a-949d-4e0c-89cd-1f5db4c8a73d",
    "photo_id": 675286516,
    "country": "sk",
    "date": "2026-06-08",
    "caption": "Белые колокольчатые цветки, Словакия"
   },
   {
    "file": "photos/convallaria-2.jpg",
    "author": "dzizhy",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f430e21f-dc09-4872-aea1-2a7112cec61c",
    "photo_id": 725061033,
    "country": "by",
    "date": "2026-08-29",
    "caption": "Красные ягоды осенью, Беларусь"
   }
  ]
 },
 "bistorta": {
  "inat_name": "Bistorta officinalis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 805,
   "de": 2390,
   "sk": 204,
   "by": 217
  },
  "photos": [
   {
    "file": "photos/bistorta-1.jpg",
    "author": "Andrzej Affek",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e2a305fc-51ed-425e-9219-7c95c2917bb1",
    "photo_id": 716485192,
    "country": "pl",
    "date": "2026-08-13",
    "caption": "Плотный розовый колос, Польша"
   },
   {
    "file": "photos/bistorta-2.jpg",
    "author": "Vanya Mitin",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/be93a4f7-6d5a-4241-87ff-a76218da24a9",
    "photo_id": 724094312,
    "country": "de",
    "date": "2026-08-27",
    "caption": "Соцветие крупным планом, Германия"
   }
  ]
 },
 "polemonium": {
  "inat_name": "Polemonium caeruleum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 28,
   "de": 56,
   "sk": 37,
   "by": 76
  },
  "photos": [
   {
    "file": "photos/polemonium-1.jpg",
    "author": "bilchi",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8359712d-3009-4781-8b01-b5e047f5c1a6",
    "photo_id": 673474422,
    "country": "de",
    "date": "2026-05-28",
    "caption": "Голубые цветки, Германия"
   },
   {
    "file": "photos/polemonium-2.jpg",
    "author": "František Gajdoš",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/ba22ff6d-a27a-49f9-a705-6b05cc727e54",
    "photo_id": 545904075,
    "country": "sk",
    "date": "2025-07-28",
    "caption": "Цветущий стебель на лугу, Словакия"
   }
  ]
 },
 "comarum": {
  "inat_name": "Comarum palustre",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 386,
   "de": 630,
   "sk": 4,
   "by": 139
  },
  "photos": [
   {
    "file": "photos/comarum-1.jpg",
    "author": "Aliaksandr Mialik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/cb64be0f-5c30-4eab-a1d2-f5d04e5bed7d",
    "photo_id": 699044913,
    "country": "by",
    "date": "2026-07-14",
    "caption": "Тёмно-пурпурные цветки, Беларусь"
   },
   {
    "file": "photos/comarum-2.jpg",
    "author": "arpad_thoma",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8a465d08-677e-4a61-8485-e86ff3b18b36",
    "photo_id": 720143589,
    "country": "de",
    "date": "2026-08-19",
    "caption": "Пальчатые листья, Германия"
   }
  ]
 },
 "anethum": {
  "inat_name": "Anethum graveolens",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 17,
   "de": 50,
   "sk": 1,
   "by": 27
  },
  "photos": [
   {
    "file": "photos/anethum-1.jpg",
    "author": "coebert97",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/cf1b44c2-6c75-4c31-b74a-211ba79ae742",
    "photo_id": 536399217,
    "country": "de",
    "date": "2025-07-13",
    "caption": "Жёлтый сложный зонтик, Германия"
   },
   {
    "file": "photos/anethum-2.jpg",
    "author": "Aliaksandr Mialik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c150a1ba-8b07-44ee-9cd4-7853f4b4813e",
    "photo_id": 700185953,
    "country": "by",
    "date": "2026-07-18",
    "caption": "Цветущий зонтик, Беларусь"
   }
  ]
 },
 "chelidonium": {
  "inat_name": "Chelidonium majus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 3944,
   "de": 7679,
   "sk": 672,
   "by": 1028
  },
  "photos": [
   {
    "file": "photos/chelidonium-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a568f667-d5df-40c1-85c1-5c7730274eb6",
    "photo_id": 725287024,
    "country": "by",
    "date": "2026-08-29",
    "caption": "Четырёхлепестковые жёлтые цветки, Беларусь"
   },
   {
    "file": "photos/chelidonium-2.jpg",
    "author": "mrmoeman",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1f0af7a1-ea29-4e4e-b80b-1ec28f9823c6",
    "photo_id": 726292758,
    "country": "de",
    "date": "2026-08-31",
    "caption": "Цветущее растение с перисторассечёнными листьями, Германия"
   }
  ]
 },
 "cetraria": {
  "inat_name": "Cetraria islandica",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 176,
   "de": 100,
   "sk": 37,
   "by": 66
  },
  "photos": [
   {
    "file": "photos/cetraria-1.jpg",
    "author": "S-V Kravchuk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/41e7b23c-6269-4ea3-a7d5-9e9ccbf488e7",
    "photo_id": 602715912,
    "country": "by",
    "date": "2025-12-21",
    "caption": "Курчавые лопасти слоевища, Беларусь"
   },
   {
    "file": "photos/cetraria-2.jpg",
    "author": "Bobo-X",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/107230ba-d635-4494-9531-6e405b9d4af2",
    "photo_id": 725996544,
    "country": "pl",
    "date": "2026-08-30",
    "caption": "Слоевища среди других лишайников, Польша"
   }
  ]
 },
 "juniper": {
  "inat_name": "Juniperus communis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 973,
   "de": 984,
   "sk": 244,
   "by": 561
  },
  "photos": [
   {
    "file": "photos/juniper-1.jpg",
    "author": "Sofja Komar",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0ed97bdc-4d07-4625-a90f-f5e4cc4a9d0c",
    "photo_id": 720374288,
    "country": "by",
    "date": "2026-08-20",
    "caption": "Сизые шишкоягоды и игольчатая хвоя, Беларусь"
   },
   {
    "file": "photos/juniper-2.jpg",
    "author": "Piotr_sss",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f09ba11f-898d-4766-b9a3-52f4850006df",
    "photo_id": 734943407,
    "country": "pl",
    "date": "2026-09-15",
    "caption": "Ветви с тёмными шишкоягодами, Польша"
   }
  ]
 },
 "calamus": {
  "inat_name": "Acorus calamus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 66,
   "de": 90,
   "sk": 3,
   "by": 81
  },
  "photos": [
   {
    "file": "photos/calamus-1.jpg",
    "author": "yubakur",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1d173a8e-c817-4e2c-a238-18ae5e711003",
    "photo_id": 672079205,
    "country": "by",
    "date": "2026-06-02",
    "caption": "Початок среди мечевидных листьев, Беларусь"
   },
   {
    "file": "photos/calamus-2.jpg",
    "author": "Landi",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c85e659f-2333-477e-880e-c6c309241950",
    "photo_id": 689580864,
    "country": "de",
    "date": "2026-07-01",
    "caption": "Цветущий початок, Германия"
   }
  ]
 },
 "hops": {
  "inat_name": "Humulus lupulus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1834,
   "de": 3318,
   "sk": 278,
   "by": 540
  },
  "photos": [
   {
    "file": "photos/hops-1.jpg",
    "author": "Tim Sagorski",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f5a7a9eb-280e-4dbc-b8d7-9e7f9ffb609c",
    "photo_id": 725743988,
    "country": "de",
    "date": "2026-08-30",
    "caption": "Зрелые шишки, Германия"
   },
   {
    "file": "photos/hops-2.jpg",
    "author": "aleks2021",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0dd11585-43b4-47de-9170-d5f65a16cc29",
    "photo_id": 725851856,
    "country": "by",
    "date": "2026-08-30",
    "caption": "Шишки и лопастные листья, Беларусь"
   }
  ]
 },
 "tansy": {
  "inat_name": "Tanacetum vulgare",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 2933,
   "de": 6656,
   "sk": 360,
   "by": 973
  },
  "photos": [
   {
    "file": "photos/tansy-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/78b84201-20b8-422f-8b2e-91eb799da56d",
    "photo_id": 725168496,
    "country": "pl",
    "date": "2026-08-29",
    "caption": "Жёлтые пуговчатые корзинки, Польша"
   },
   {
    "file": "photos/tansy-2.jpg",
    "author": "Alexander Naumov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/ad0b2413-8db5-4ff8-8b93-bddc62c7947b",
    "photo_id": 728432140,
    "country": "by",
    "date": "2026-08-29",
    "caption": "Корзинки крупным планом, Беларусь"
   }
  ]
 },
 "willow": {
  "inat_name": "Salix (род)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1308,
   "de": 3085,
   "sk": 222,
   "by": 1705
  },
  "photos": [
   {
    "file": "photos/willow-1.jpg",
    "author": "Bartosz Kolenda",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/5cb9d733-58c4-4774-b2c7-a85b82466e8e",
    "photo_id": 717049459,
    "country": "pl",
    "date": "2026-08-15",
    "caption": "Узкие листья ивы, Польша"
   },
   {
    "file": "photos/willow-2.jpg",
    "author": "Gabriela2110",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/87ce13c1-3cff-4ba4-9d3a-028dbd66b58d",
    "photo_id": 738329372,
    "country": "de",
    "date": "2026-09-21",
    "caption": "Плодоносящая серёжка, Германия"
   }
  ]
 },
 "mullein": {
  "inat_name": "Verbascum (род)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 976,
   "de": 4462,
   "sk": 374,
   "by": 660
  },
  "photos": [
   {
    "file": "photos/mullein-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/dd0e86e4-0f7a-49a7-aafe-6ff0b51756ab",
    "photo_id": 722995379,
    "country": "pl",
    "date": "2026-08-25",
    "caption": "Цветущий колос, Польша"
   },
   {
    "file": "photos/mullein-2.jpg",
    "author": "Zdenek Kaplan",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/fe00481a-80e7-4c82-803a-b1793f939bd5",
    "photo_id": 725708105,
    "country": "sk",
    "date": "2026-08-26",
    "caption": "Жёлтые цветки на стебле, Словакия"
   }
  ]
 },
 "malva": {
  "inat_name": "Malva sylvestris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 548,
   "de": 3113,
   "sk": 154,
   "by": 84
  },
  "photos": [
   {
    "file": "photos/malva-1.jpg",
    "author": "Daniel Seibold",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/787f5cc9-32a7-4861-8a13-6343cee85e25",
    "photo_id": 726542572,
    "country": "de",
    "date": "2026-08-31",
    "caption": "Розовые цветки с тёмными жилками, Германия"
   },
   {
    "file": "photos/malva-2.jpg",
    "author": "Mr Alister",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/87476a40-db92-43dc-9a6c-1843e64aaaf4",
    "photo_id": 676609873,
    "country": "by",
    "date": "2026-06-10",
    "caption": "Цветущий куст, Беларусь"
   }
  ]
 },
 "fennel": {
  "inat_name": "Foeniculum vulgare",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 5,
   "de": 355,
   "sk": 0,
   "by": 5
  },
  "photos": [
   {
    "file": "photos/fennel-1.jpg",
    "author": "Christophe Neff",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4e7507c5-7e34-4ff6-9857-10c743f88e50",
    "photo_id": 725701470,
    "country": "de",
    "date": "2026-08-30",
    "caption": "Жёлтые зонтики, Германия"
   },
   {
    "file": "photos/fennel-2.jpg",
    "author": "Walter Wimmer",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d721661d-1e80-458c-92d6-6e5c59f2130d",
    "photo_id": 724616842,
    "country": "de",
    "date": "2026-08-28",
    "caption": "Высокое растение с нитевидными листьями, Германия"
   }
  ]
 },
 "centaurea": {
  "inat_name": "Centaurea cyanus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1406,
   "de": 3540,
   "sk": 89,
   "by": 344
  },
  "photos": [
   {
    "file": "photos/centaurea-1.jpg",
    "author": "Станислав",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f815a053-02a0-4bf8-97b7-e6c1b24960c0",
    "photo_id": 717799525,
    "country": "by",
    "date": "2026-08-16",
    "caption": "Синяя корзинка, Беларусь"
   },
   {
    "file": "photos/centaurea-2.jpg",
    "author": "Timo Fric",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/cc66782a-3b19-4a0b-8758-f68572e34a19",
    "photo_id": 676583642,
    "country": "sk",
    "date": "2026-05-31",
    "caption": "Цветок на тонком стебле, Словакия"
   }
  ]
 },
 "daucus": {
  "inat_name": "Daucus carota subsp. sativus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 0,
   "de": 0,
   "sk": 1,
   "by": 1
  },
  "photos": [
   {
    "file": "photos/daucus-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/b986bc13-0713-439d-b527-9c6f7f4ad635",
    "photo_id": 169715382,
    "country": "by",
    "date": "2006-08-17",
    "caption": "Белые зонтики, Беларусь"
   },
   {
    "file": "photos/daucus-2.jpg",
    "author": "Ema Mosorová",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/3584dce8-c28f-4e82-8fa4-e4eedbc63551",
    "photo_id": 136988387,
    "country": "sk",
    "date": "2021-06-17",
    "caption": "Перисторассечённые листья, Словакия"
   }
  ]
 },
 "cucurbita": {
  "inat_name": "Cucurbita pepo",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 12,
   "de": 19,
   "sk": 2,
   "by": 8
  },
  "photos": [
   {
    "file": "photos/cucurbita-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/afd52f4a-830f-40f3-b836-a15297de306f",
    "photo_id": 541148981,
    "country": "pl",
    "date": "2025-07-23",
    "caption": "Крупный жёлтый цветок, Польша"
   },
   {
    "file": "photos/cucurbita-2.jpg",
    "author": "hubidubi",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1064a501-802e-429d-b2fb-a036926dc713",
    "photo_id": 307396498,
    "country": "de",
    "date": "2023-08-05",
    "caption": "Плод и широкие листья, Германия"
   }
  ]
 },
 "coriander": {
  "inat_name": "Coriandrum sativum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 3,
   "de": 85,
   "sk": 2,
   "by": 15
  },
  "photos": [
   {
    "file": "photos/coriander-1.jpg",
    "author": "anatas100",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/45c5b6b5-de0d-4325-9133-7888e14e3fdd",
    "photo_id": 558101898,
    "country": "de",
    "date": "2025-08-26",
    "caption": "Белые зонтики цветков, Германия"
   },
   {
    "file": "photos/coriander-2.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e2a3d31f-a431-4736-8d91-76da9dcf7ad7",
    "photo_id": 253069009,
    "country": "by",
    "date": "2022-07-13",
    "caption": "Цветущие растения, Беларусь"
   }
  ]
 },
 "phaseolus": {
  "inat_name": "Phaseolus vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 5,
   "de": 4,
   "sk": 0,
   "by": 6
  },
  "photos": [
   {
    "file": "photos/phaseolus-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/827ff8ec-c20c-4427-bd04-22033a6c57dd",
    "photo_id": 400730756,
    "country": "pl",
    "date": "2024-06-29",
    "caption": "Тройчатые листья, Польша"
   },
   {
    "file": "photos/phaseolus-2.jpg",
    "author": "Katrin Simon",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/5679df0d-3667-4989-8c3f-83a856f4c4e1",
    "photo_id": 142594209,
    "country": "de",
    "date": "2021-07-11",
    "caption": "Молодые растения, Германия"
   }
  ]
 },
 "viola": {
  "inat_name": "Viola tricolor",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 184,
   "de": 499,
   "sk": 86,
   "by": 148
  },
  "photos": [
   {
    "file": "photos/viola-1.jpg",
    "author": "Helen",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6deb5879-e398-464f-b29c-ff0d95568307",
    "photo_id": 703445697,
    "country": "de",
    "date": "2026-07-23",
    "caption": "Сине-фиолетовый цветок, Германия"
   },
   {
    "file": "photos/viola-2.jpg",
    "author": "Sergio B.",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4cdc1f24-000e-4570-8556-50df51c138fb",
    "photo_id": 674117676,
    "country": "by",
    "date": "2026-06-06",
    "caption": "Трёхцветный цветок, Беларусь"
   }
  ]
 },
 "aesculus": {
  "inat_name": "Aesculus hippocastanum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 604,
   "de": 3676,
   "sk": 88,
   "by": 281
  },
  "photos": [
   {
    "file": "photos/aesculus-1.jpg",
    "author": "nicandra711ph",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/cac32187-a73e-4394-951b-fdfbc4b348d8",
    "photo_id": 734839722,
    "country": "de",
    "date": "2026-09-15",
    "caption": "Семена в колючих коробочках, Германия"
   },
   {
    "file": "photos/aesculus-2.jpg",
    "author": "Maksim Vabishchevich",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/505af1b9-c7ac-4232-a07e-e9431d57bc74",
    "photo_id": 727265719,
    "country": "by",
    "date": "2026-09-01",
    "caption": "Пальчатые листья, Беларусь"
   }
  ]
 },
 "silybum": {
  "inat_name": "Silybum marianum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 81,
   "de": 435,
   "sk": 35,
   "by": 23
  },
  "photos": [
   {
    "file": "photos/silybum-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d9f24c1b-b200-4956-a2dd-de1157501dc1",
    "photo_id": 695876956,
    "country": "pl",
    "date": "2026-07-11",
    "caption": "Колючая пурпурная корзинка, Польша"
   },
   {
    "file": "photos/silybum-2.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/87611ebb-0227-4ae6-8b81-7ed15d882933",
    "photo_id": 533945743,
    "country": "by",
    "date": "2025-07-09",
    "caption": "Листья с белыми пятнами, Беларусь"
   }
  ]
 },
 "dryopteris": {
  "inat_name": "Dryopteris filix-mas",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1212,
   "de": 2942,
   "sk": 115,
   "by": 518
  },
  "photos": [
   {
    "file": "photos/dryopteris-1.jpg",
    "author": "Marek Hrušovský",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/50d8554d-c2e3-4749-bfd3-cb305e9ede0d",
    "photo_id": 675531655,
    "country": "sk",
    "date": "2026-06-08",
    "caption": "Розетка вай, Словакия"
   },
   {
    "file": "photos/dryopteris-2.jpg",
    "author": "Svitlana Kyiak",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/f4a20f06-0393-4831-9d49-6a25a629b02e",
    "photo_id": 736351637,
    "country": "pl",
    "date": "2026-09-18",
    "caption": "Сорусы на нижней стороне вайи, Польша"
   }
  ]
 },
 "onion": {
  "inat_name": "Allium cepa",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 4,
   "de": 8,
   "sk": 2,
   "by": 1
  },
  "photos": [
   {
    "file": "photos/onion-1.jpg",
    "author": "arthur_haendler",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/160dce22-61e9-457b-b005-c37f9f0d031c",
    "photo_id": 305523626,
    "country": "de",
    "date": "2023-07-30",
    "caption": "Шаровидное соцветие, Германия"
   },
   {
    "file": "photos/onion-2.jpg",
    "author": "Michael Müller",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/004e6a77-0a37-4aa5-94ef-7ecbb8e29bbf",
    "photo_id": 284561728,
    "country": "de",
    "date": "2023-05-29",
    "caption": "Дудчатые листья, Германия"
   }
  ]
 },
 "garlic": {
  "inat_name": "Allium sativum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1,
   "de": 43,
   "sk": 0,
   "by": 13
  },
  "photos": [
   {
    "file": "photos/garlic-1.jpg",
    "author": "Quirin Herzinger",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/d4d3b394-044a-4c25-88fe-ebe0e30d6a1c",
    "photo_id": 692045097,
    "country": "de",
    "date": "2026-07-05",
    "caption": "Соцветия с луковичками, Германия"
   },
   {
    "file": "photos/garlic-2.jpg",
    "author": "Мария Ткач",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/1612d483-35f8-4149-86e2-c7c1f9351dad",
    "photo_id": 308424601,
    "country": "by",
    "date": "2023-08-08",
    "caption": "Головки соцветий, Беларусь"
   }
  ]
 },
 "bogbean": {
  "inat_name": "Menyanthes trifoliata",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 303,
   "de": 725,
   "sk": 45,
   "by": 86
  },
  "photos": [
   {
    "file": "photos/bogbean-1.jpg",
    "author": "Aleksandra Bednarska",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/3af316fd-9938-4d2b-b739-56b71dc2d033",
    "photo_id": 718502352,
    "country": "pl",
    "date": "2026-08-17",
    "caption": "Тройчатые листья, Польша"
   },
   {
    "file": "photos/bogbean-2.jpg",
    "author": "Alexander Naumov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a9bcff2e-83cf-4466-ba0a-03bffa35124f",
    "photo_id": 685938672,
    "country": "by",
    "date": "2026-06-21",
    "caption": "Плоды-коробочки, Беларусь"
   }
  ]
 },
 "saponaria": {
  "inat_name": "Saponaria officinalis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1226,
   "de": 3100,
   "sk": 150,
   "by": 600
  },
  "photos": [
   {
    "file": "photos/saponaria-1.jpg",
    "author": "Henrik Hempelmann",
    "license": "CC BY-NC-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/7e5c378b-0307-48f7-bbf9-33a603dd1e43",
    "photo_id": 726451907,
    "country": "de",
    "date": "2026-08-31",
    "caption": "Белые цветки, Германия"
   },
   {
    "file": "photos/saponaria-2.jpg",
    "author": "Aliaksandr Mialik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/dc9f2af1-c47f-413d-b2e3-fa07d776d8ee",
    "photo_id": 724237664,
    "country": "by",
    "date": "2026-08-27",
    "caption": "Розоватые цветки, Беларусь"
   }
  ]
 },
 "thymus": {
  "inat_name": "Thymus vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 0,
   "de": 8,
   "sk": 0,
   "by": 0
  },
  "photos": [
   {
    "file": "photos/thymus-1.jpg",
    "author": "Hermann Mehlhorn",
    "license": "CC BY-SA 4.0",
    "license_url": "https://creativecommons.org/licenses/by-sa/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4a1422f9-dd69-40f3-b232-ac9e8fb64afe",
    "photo_id": 722398649,
    "country": "de",
    "date": "2026-08-24",
    "caption": "Густой кустик, Германия"
   },
   {
    "file": "photos/thymus-2.jpg",
    "author": "anetteffm",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/7229e281-e468-4212-9d47-fbb0fc96cefe",
    "photo_id": 190087476,
    "country": "de",
    "date": "2022-04-23",
    "caption": "Полукустарник у стены, Германия"
   }
  ]
 },
 "rubus": {
  "inat_name": "Rubus idaeus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 609,
   "de": 917,
   "sk": 73,
   "by": 474
  },
  "photos": [
   {
    "file": "photos/rubus-1.jpg",
    "author": "gyma7",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/17575dfe-f2a6-4409-8019-a52096097483",
    "photo_id": 732065477,
    "country": "de",
    "date": "2026-09-10",
    "caption": "Спелые плоды, Германия"
   },
   {
    "file": "photos/rubus-2.jpg",
    "author": "Pedro Beja",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/b8c3df8a-bcc9-4692-b0c7-d0805ffb1c45",
    "photo_id": 717094193,
    "country": "sk",
    "date": "2026-08-15",
    "caption": "Плоды и листья, Словакия"
   }
  ]
 },
 "cichorium": {
  "inat_name": "Cichorium intybus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1839,
   "de": 5246,
   "sk": 406,
   "by": 842
  },
  "photos": [
   {
    "file": "photos/cichorium-1.jpg",
    "author": "jozefdz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4d13553f-488b-4597-a26e-fdbe0b921024",
    "photo_id": 722053129,
    "country": "sk",
    "date": "2026-08-23",
    "caption": "Голубая корзинка, Словакия"
   },
   {
    "file": "photos/cichorium-2.jpg",
    "author": "Aliaksandr Mialik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c4804d66-b824-4666-9baa-1f77e8bdb718",
    "photo_id": 725202155,
    "country": "by",
    "date": "2026-08-29",
    "caption": "Цветки на жёстком стебле, Беларусь"
   }
  ]
 },
 "symphytum": {
  "inat_name": "Symphytum officinale",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1264,
   "de": 2353,
   "sk": 341,
   "by": 299
  },
  "photos": [
   {
    "file": "photos/symphytum-1.jpg",
    "author": "M Malinowska",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/929ebbdd-3aa4-48a6-9c9b-574e97909d40",
    "photo_id": 724690629,
    "country": "pl",
    "date": "2026-08-28",
    "caption": "Розовые трубчатые цветки, Польша"
   },
   {
    "file": "photos/symphytum-2.jpg",
    "author": "Enrico Tomschke",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/139f0be9-06bc-4b25-913d-77ffa096b366",
    "photo_id": 712704862,
    "country": "de",
    "date": "2026-08-07",
    "caption": "Крупные ланцетные листья, Германия"
   }
  ]
 },
 "rumex": {
  "inat_name": "Rumex acetosa",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 172,
   "de": 1068,
   "sk": 13,
   "by": 75
  },
  "photos": [
   {
    "file": "photos/rumex-1.jpg",
    "author": "Martin Fabšík",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/65289c04-51d9-4613-8434-736e736c91a5",
    "photo_id": 380110138,
    "country": "sk",
    "date": "2024-05-11",
    "caption": "Цветущий стебель, Словакия"
   },
   {
    "file": "photos/rumex-2.jpg",
    "author": "tuile_aive",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8c4a996d-8e4b-474b-952f-b9622df8f371",
    "photo_id": 532844284,
    "country": "by",
    "date": "2025-07-07",
    "caption": "Метельчатое соцветие, Беларусь"
   }
  ]
 },
 "chenopodium": {
  "inat_name": "Chenopodium album",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 577,
   "de": 1428,
   "sk": 91,
   "by": 293
  },
  "photos": [
   {
    "file": "photos/chenopodium-1.jpg",
    "author": "Llydia",
    "license": "CC0 1.0",
    "license_url": "https://creativecommons.org/publicdomain/zero/1.0/",
    "obs_url": "https://www.inaturalist.org/observations/ea29ea2a-de17-4bcb-a0c0-9722d2a20c15",
    "photo_id": 721745398,
    "country": "de",
    "date": "2026-08-23",
    "caption": "Растение с мучнистыми соцветиями, Германия"
   },
   {
    "file": "photos/chenopodium-2.jpg",
    "author": "Aliaksandr Mialik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6acd00be-4974-48d5-9f49-813fc3a9bf75",
    "photo_id": 719671613,
    "country": "by",
    "date": "2026-08-18",
    "caption": "Соцветия, Беларусь"
   }
  ]
 },
 "armoracia": {
  "inat_name": "Armoracia rusticana",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 766,
   "de": 751,
   "sk": 108,
   "by": 520
  },
  "photos": [
   {
    "file": "photos/armoracia-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c55d74c3-9cf8-473c-b409-276882e4f9b7",
    "photo_id": 724641645,
    "country": "by",
    "date": "2026-08-28",
    "caption": "Крупные прикорневые листья, Беларусь"
   },
   {
    "file": "photos/armoracia-2.jpg",
    "author": "lepilena",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8e8fa813-e818-4b94-8f0c-a12f0f1c4a74",
    "photo_id": 721856093,
    "country": "de",
    "date": "2026-08-23",
    "caption": "Заросль листьев, Германия"
   }
  ]
 },
 "oxycoccus": {
  "inat_name": "Vaccinium oxycoccos",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 537,
   "de": 595,
   "sk": 16,
   "by": 202
  },
  "photos": [
   {
    "file": "photos/oxycoccus-1.jpg",
    "author": "Filip Kawa",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e5831b3c-4fb5-4a04-a45f-79216ea23469",
    "photo_id": 718470564,
    "country": "pl",
    "date": "2026-08-17",
    "caption": "Ягода на тонком побеге, Польша"
   },
   {
    "file": "photos/oxycoccus-2.jpg",
    "author": "Petr Šíma",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/ed105432-8e52-489f-a4ab-4a4993977b6e",
    "photo_id": 721766485,
    "country": "de",
    "date": "2026-08-23",
    "caption": "Ягоды среди мха, Германия"
   }
  ]
 },
 "ribes": {
  "inat_name": "Ribes nigrum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 47,
   "de": 40,
   "sk": 7,
   "by": 57
  },
  "photos": [
   {
    "file": "photos/ribes-1.jpg",
    "author": "thehowlingwindbeckons",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a64207aa-a045-42f2-9149-eedda6f05bd0",
    "photo_id": 215258769,
    "country": "de",
    "date": "2022-07-16",
    "caption": "Чёрные ягоды, Германия"
   },
   {
    "file": "photos/ribes-2.jpg",
    "author": "ekaterinamojsejchik",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6637700c-7b85-4cb9-9469-0794a9c4b3b1",
    "photo_id": 543169094,
    "country": "by",
    "date": "2025-07-15",
    "caption": "Лопастные листья, Беларусь"
   }
  ]
 },
 "marrubium": {
  "inat_name": "Marrubium vulgare",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1,
   "de": 7,
   "sk": 0,
   "by": 0
  },
  "photos": [
   {
    "file": "photos/marrubium-1.jpg",
    "author": "SzkalnyDzięcioł",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/2bc8ba69-9279-42df-b5ca-fc140c6db943",
    "photo_id": 668320472,
    "country": "pl",
    "date": "2026-05-28",
    "caption": "Морщинистые опушённые листья, Польша"
   }
  ]
 },
 "viscum": {
  "inat_name": "Viscum album",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1501,
   "de": 2772,
   "sk": 248,
   "by": 922
  },
  "photos": [
   {
    "file": "photos/viscum-1.jpg",
    "author": "Даниил Шункевич",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/b005435f-1bf3-4946-8af0-d0207de3c36c",
    "photo_id": 722393132,
    "country": "by",
    "date": "2026-08-24",
    "caption": "Вильчатые побеги, Беларусь"
   },
   {
    "file": "photos/viscum-2.jpg",
    "author": "Vladimir Hemala",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/575d1e7a-8c2c-4196-959a-149b4a18ba8a",
    "photo_id": 707627716,
    "country": "sk",
    "date": "2026-07-27",
    "caption": "Шар омелы на дереве, Словакия"
   }
  ]
 },
 "padus": {
  "inat_name": "Prunus padus",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1527,
   "de": 2249,
   "sk": 141,
   "by": 490
  },
  "photos": [
   {
    "file": "photos/padus-1.jpg",
    "author": "Viktoryia Karaliova",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/20bbdd81-4ce9-47f9-ba86-b4cb198383fa",
    "photo_id": 696757840,
    "country": "by",
    "date": "2026-07-12",
    "caption": "Чёрные плоды, Беларусь"
   },
   {
    "file": "photos/padus-2.jpg",
    "author": "Marcin Dyderski",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8ab1b15e-0269-42e9-963e-c8a47310a55c",
    "photo_id": 710907164,
    "country": "pl",
    "date": "2026-08-04",
    "caption": "Листья, Польша"
   }
  ]
 },
 "picea": {
  "inat_name": "Picea abies",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1289,
   "de": 1864,
   "sk": 346,
   "by": 1187
  },
  "photos": [
   {
    "file": "photos/picea-1.jpg",
    "author": "chimatayama",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/4a541621-7aab-4502-9e61-2d0b6e79f529",
    "photo_id": 731572067,
    "country": "de",
    "date": "2026-09-09",
    "caption": "Свисающая шишка, Германия"
   },
   {
    "file": "photos/picea-2.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/5fddb37c-4fd4-4b7f-95e7-e2419d29283c",
    "photo_id": 721791757,
    "country": "by",
    "date": "2026-08-23",
    "caption": "Ветви с хвоей, Беларусь"
   }
  ]
 },
 "trifolium": {
  "inat_name": "Trifolium pratense",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 3443,
   "de": 7368,
   "sk": 445,
   "by": 910
  },
  "photos": [
   {
    "file": "photos/trifolium-1.jpg",
    "author": "Michal Svit",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f09a4b96-74a6-41ab-b2cd-37be0fc062c2",
    "photo_id": 725185841,
    "country": "pl",
    "date": "2026-08-29",
    "caption": "Головка соцветия, Польша"
   },
   {
    "file": "photos/trifolium-2.jpg",
    "author": "Тонечка",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/43891057-f6f8-4974-8273-b1fd2eb14f82",
    "photo_id": 723663025,
    "country": "by",
    "date": "2026-08-26",
    "caption": "Цветущее растение, Беларусь"
   }
  ]
 },
 "oxalis": {
  "inat_name": "Oxalis acetosella",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 2510,
   "de": 3861,
   "sk": 300,
   "by": 755
  },
  "photos": [
   {
    "file": "photos/oxalis-1.jpg",
    "author": "Dirk Mezger",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/3146905a-e408-4c0b-aeb1-744bcb8b7184",
    "photo_id": 725285434,
    "country": "de",
    "date": "2026-08-29",
    "caption": "Тройчатые листья, Германия"
   },
   {
    "file": "photos/oxalis-2.jpg",
    "author": "Sergio B.",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/67f7cfb6-b48e-4fdc-9b5e-03bc8c357c5e",
    "photo_id": 715662530,
    "country": "by",
    "date": "2026-08-12",
    "caption": "Листья в хвойном лесу, Беларусь"
   }
  ]
 },
 "glechoma": {
  "inat_name": "Glechoma hederacea",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 3288,
   "de": 8193,
   "sk": 389,
   "by": 632
  },
  "photos": [
   {
    "file": "photos/glechoma-1.jpg",
    "author": "Przemek Cichoń",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/50d84f19-d92f-45f8-b38b-720bf458ead2",
    "photo_id": 724739213,
    "country": "pl",
    "date": "2026-08-28",
    "caption": "Почковидные листья, Польша"
   },
   {
    "file": "photos/glechoma-2.jpg",
    "author": "Савицкая Карина",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/082eeb21-b4bf-455d-a874-a18a8b3e751c",
    "photo_id": 717755982,
    "country": "by",
    "date": "2026-08-10",
    "caption": "Листья крупным планом, Беларусь"
   }
  ]
 },
 "elymus": {
  "inat_name": "Elymus repens",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 124,
   "de": 195,
   "sk": 20,
   "by": 153
  },
  "photos": [
   {
    "file": "photos/elymus-1.jpg",
    "author": "Агеев Валентин",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e97ba244-2a41-4c3f-a707-087036818839",
    "photo_id": 688044062,
    "country": "by",
    "date": "2026-06-28",
    "caption": "Цветущий колос, Беларусь"
   },
   {
    "file": "photos/elymus-2.jpg",
    "author": "Bartosz Kolenda",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6e0850ec-dd57-46fc-8a93-664b9e82c3b2",
    "photo_id": 690636699,
    "country": "pl",
    "date": "2026-07-03",
    "caption": "Колос на ладони, Польша"
   }
  ]
 },
 "corylus": {
  "inat_name": "Corylus avellana",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1509,
   "de": 4459,
   "sk": 176,
   "by": 738
  },
  "photos": [
   {
    "file": "photos/corylus-1.jpg",
    "author": "Roger svk",
    "license": "CC BY 4.0",
    "license_url": "https://creativecommons.org/licenses/by/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0e8a5bb8-0308-400d-bb77-3c824c9e531f",
    "photo_id": 704703299,
    "country": "sk",
    "date": "2026-07-25",
    "caption": "Орехи в обёртках, Словакия"
   },
   {
    "file": "photos/corylus-2.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/a4bc483a-4686-4bd6-9927-acf083a02aa4",
    "photo_id": 731005832,
    "country": "by",
    "date": "2026-09-08",
    "caption": "Округлые листья, Беларусь"
   }
  ]
 },
 "centaurium": {
  "inat_name": "Centaurium erythraea",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 172,
   "de": 910,
   "sk": 73,
   "by": 99
  },
  "photos": [
   {
    "file": "photos/centaurium-1.jpg",
    "author": "Marcin Scelina",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/904979ba-8f9e-41ed-a0f2-bf5de8347788",
    "photo_id": 711828172,
    "country": "pl",
    "date": "2026-08-03",
    "caption": "Розовые цветки в щитке, Польша"
   },
   {
    "file": "photos/centaurium-2.jpg",
    "author": "Руслан Цвірко",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/8fbf4f08-5c0c-4bdd-a281-34e2052bfa5e",
    "photo_id": 699100055,
    "country": "by",
    "date": "2026-07-16",
    "caption": "Цветущие растения, Беларусь"
   }
  ]
 },
 "calluna": {
  "inat_name": "Calluna vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1852,
   "de": 4084,
   "sk": 183,
   "by": 599
  },
  "photos": [
   {
    "file": "photos/calluna-1.jpg",
    "author": "Alrauna",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c634c180-3878-4aec-a64b-bc2f94e11ed6",
    "photo_id": 729782248,
    "country": "pl",
    "date": "2026-08-30",
    "caption": "Цветущие веточки, Польша"
   },
   {
    "file": "photos/calluna-2.jpg",
    "author": "Maksim Vabishchevich",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/797dc86d-5f3f-49d8-80ac-e89a7227860c",
    "photo_id": 723799353,
    "country": "by",
    "date": "2026-08-26",
    "caption": "Цветущие кустики, Беларусь"
   }
  ]
 },
 "berberis": {
  "inat_name": "Berberis vulgaris",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 210,
   "de": 619,
   "sk": 121,
   "by": 87
  },
  "photos": [
   {
    "file": "photos/berberis-1.jpg",
    "author": "Jozef Daňko",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/3cc4fad9-5ef1-4c9a-8111-1c7fd7b3ff55",
    "photo_id": 548871919,
    "country": "sk",
    "date": "2025-08-06",
    "caption": "Красные продолговатые ягоды, Словакия"
   },
   {
    "file": "photos/berberis-2.jpg",
    "author": "Alexander",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0bcdb8fc-e156-47d6-b7ec-f16599ecd00c",
    "photo_id": 564532035,
    "country": "by",
    "date": "2025-09-09",
    "caption": "Ягоды на кусте, Беларусь"
   }
  ]
 },
 "veronica": {
  "inat_name": "Veronica officinalis",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 880,
   "de": 1608,
   "sk": 125,
   "by": 315
  },
  "photos": [
   {
    "file": "photos/veronica-1.jpg",
    "author": "alpinewolf",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f02c3173-8be2-4ea7-9d01-c638aa0a4df5",
    "photo_id": 721415026,
    "country": "de",
    "date": "2026-08-22",
    "caption": "Голубые кисти цветков, Германия"
   },
   {
    "file": "photos/veronica-2.jpg",
    "author": "Евгений Феликсович Епифанов Evgeniy F. Epifanov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/9ad8b112-34c2-44f5-9cf1-0f5cd8551c7b",
    "photo_id": 684240895,
    "country": "by",
    "date": "2026-06-22",
    "caption": "Цветущие растения, Беларусь"
   }
  ]
 },
 "arctium": {
  "inat_name": "Arctium (род)",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 554,
   "de": 2662,
   "sk": 249,
   "by": 641
  },
  "photos": [
   {
    "file": "photos/arctium-1.jpg",
    "author": "themicalo",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/b1c34785-9ad4-4a55-bb89-b396d3410de5",
    "photo_id": 723607540,
    "country": "pl",
    "date": "2026-08-26",
    "caption": "Цветущие корзинки, Польша"
   },
   {
    "file": "photos/arctium-2.jpg",
    "author": "Dominik Roman Letz",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/f60dbda4-d103-4649-9308-6696106071ef",
    "photo_id": 714655352,
    "country": "sk",
    "date": "2026-08-10",
    "caption": "Колючие корзинки, Словакия"
   }
  ]
 },
 "lamium": {
  "inat_name": "Lamium album",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 1485,
   "de": 4635,
   "sk": 136,
   "by": 501
  },
  "photos": [
   {
    "file": "photos/lamium-1.jpg",
    "author": "dmitry tretjakov",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6721582b-39eb-42a1-818d-598d459276eb",
    "photo_id": 714501173,
    "country": "by",
    "date": "2026-08-10",
    "caption": "Белые губоцветные цветки, Беларусь"
   },
   {
    "file": "photos/lamium-2.jpg",
    "author": "castalia",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/0195fc20-fb79-4030-b9cd-675e5078199f",
    "photo_id": 666486103,
    "country": "sk",
    "date": "2026-05-25",
    "caption": "Цветки в пазухах листьев, Словакия"
   }
  ]
 },
 "petroselinum": {
  "inat_name": "Petroselinum crispum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 3,
   "de": 23,
   "sk": 0,
   "by": 6
  },
  "photos": [
   {
    "file": "photos/petroselinum-1.jpg",
    "author": "johannesundolli",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/c7fe7ddd-8900-44aa-86c2-a861c4e4fb2f",
    "photo_id": 382122393,
    "country": "de",
    "date": "2024-05-16",
    "caption": "Кудрявая форма, Германия"
   },
   {
    "file": "photos/petroselinum-2.jpg",
    "author": "poooliiiinaaaa",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/6e942bea-7bae-4b06-a363-1a5111d0d909",
    "photo_id": 80466374,
    "country": "by",
    "date": "2020-06-23",
    "caption": "Листовая форма, Беларусь"
   }
  ]
 },
 "abrotanum": {
  "inat_name": "Artemisia abrotanum",
  "via": "iNaturalist Open Data (архив наблюдений с открытыми лицензиями фото)",
  "retrieved": "2026-09-27",
  "counts": {
   "pl": 0,
   "de": 1,
   "sk": 0,
   "by": 28
  },
  "photos": [
   {
    "file": "photos/abrotanum-1.jpg",
    "author": "Alina Romanyuk",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/e4185877-1b6d-4cbe-aef0-b30d87c9fc8d",
    "photo_id": 542229136,
    "country": "by",
    "date": "2025-07-25",
    "caption": "Куст у воды, Беларусь"
   },
   {
    "file": "photos/abrotanum-2.jpg",
    "author": "Александр Жуковский",
    "license": "CC BY-NC 4.0",
    "license_url": "https://creativecommons.org/licenses/by-nc/4.0/",
    "obs_url": "https://www.inaturalist.org/observations/7510600c-f352-4aa5-92a6-7c0c5244119a",
    "photo_id": 568601374,
    "country": "by",
    "date": "2025-08-23",
    "caption": "Мелкие корзинки, Беларусь"
   }
  ]
 }
};
  const R = {"sorbus":{"de-nw":370,"by-br":104,"pl-pk":167,"de-ni":371,"de-st":73,"de-bb":107,"de-bw":375,"de-rp":141,"de-by":631,"de-he":446,"de-sn":178,"de-be":205,"pl-ds":247,"pl-zp":77,"de-th":51,"de-sl":15,"sk-zi":96,"by-hr":156,"pl-op":12,"de-sh":343,"pl-lu":67,"pl-mz":252,"pl-ma":403,"pl-kp":113,"de-mv":56,"pl-pm":183,"by-mi":516,"pl-pd":73,"by-vi":40,"de-hh":32,"pl-sk":34,"pl-sl":219,"pl-ld":193,"pl-wp":182,"by-ma":43,"by-ho":81,"sk-ki":11,"pl-wn":62,"sk-pv":70,"sk-bc":23,"de-hb":16,"sk-tc":7,"pl-lb":20,"sk-bl":2,"sk-ni":1,"sk-ta":1},"fragaria":{"de-nw":260,"de-rp":165,"de-sn":118,"de-ni":182,"by-br":78,"pl-ma":133,"de-bw":442,"de-sl":32,"de-by":363,"de-he":477,"de-st":33,"de-th":50,"pl-zp":37,"de-be":71,"by-vi":42,"by-hr":108,"de-sh":54,"pl-ds":74,"sk-bl":6,"pl-pd":38,"pl-pm":118,"de-hh":15,"pl-sl":72,"pl-lu":38,"by-mi":313,"sk-pv":25,"de-bb":20,"pl-mz":66,"sk-ki":9,"sk-ni":3,"pl-wp":63,"pl-pk":25,"pl-lb":7,"by-ma":26,"by-ho":41,"pl-ld":49,"pl-sk":14,"pl-kp":35,"pl-wn":41,"de-mv":8,"sk-bc":14,"pl-op":4,"sk-zi":25,"sk-ta":3,"sk-tc":4,"de-hb":5},"convallaria":{"de-ni":325,"de-sn":202,"pl-wp":192,"de-bb":174,"by-br":118,"de-bw":525,"de-st":71,"de-he":347,"pl-pk":37,"de-hh":36,"de-by":523,"de-nw":251,"pl-kp":153,"de-be":284,"de-th":116,"sk-zi":32,"de-sl":17,"pl-zp":109,"sk-tc":6,"de-rp":165,"by-mi":407,"pl-ma":171,"by-hr":107,"sk-bl":43,"sk-ni":10,"pl-ds":147,"de-sh":139,"pl-lu":79,"de-mv":49,"pl-pd":98,"pl-pm":126,"pl-sl":130,"by-vi":48,"pl-wn":87,"pl-mz":363,"pl-lb":45,"by-ho":87,"pl-ld":97,"by-ma":37,"pl-op":19,"pl-sk":29,"de-hb":14,"sk-pv":15,"sk-bc":18,"sk-ta":13,"sk-ki":41},"bistorta":{"de-nw":254,"de-rp":147,"pl-ma":198,"de-st":46,"de-by":620,"de-ni":147,"de-sn":145,"de-bw":566,"sk-zi":74,"de-he":274,"de-th":54,"by-hr":75,"de-sl":7,"pl-pd":57,"de-hh":21,"pl-zp":59,"pl-ds":284,"sk-pv":115,"de-mv":20,"de-bb":57,"de-sh":25,"by-br":38,"by-mi":84,"pl-pk":17,"pl-lu":33,"pl-kp":10,"pl-pm":53,"pl-sl":15,"pl-wp":3,"pl-mz":48,"by-vi":10,"pl-sk":12,"sk-bc":7,"by-ma":10,"de-be":7,"pl-lb":3,"pl-ld":5,"sk-bl":6,"pl-op":4,"pl-wn":4,"sk-ki":2},"polemonium":{"de-st":3,"de-sn":2,"by-hr":16,"de-sh":4,"pl-wn":1,"de-bw":6,"pl-pd":19,"de-rp":7,"by-br":22,"de-by":17,"de-nw":6,"sk-ki":7,"sk-bc":9,"de-ni":5,"by-mi":29,"sk-pv":17,"de-th":1,"by-ma":2,"by-vi":5,"de-be":1,"de-hh":2,"by-ho":2,"pl-lu":5,"pl-mz":1,"sk-zi":4,"pl-pm":1,"de-he":1,"de-mv":1,"pl-zp":1},"comarum":{"by-br":40,"pl-pd":42,"pl-zp":96,"by-vi":29,"de-sh":41,"by-hr":26,"de-hh":6,"pl-ds":12,"de-bw":199,"pl-lu":32,"de-by":122,"pl-kp":7,"de-mv":34,"pl-pm":131,"de-ni":61,"de-sn":18,"de-he":36,"by-mi":28,"de-nw":18,"pl-wp":5,"de-bb":46,"de-hb":8,"by-ho":7,"pl-wn":8,"pl-mz":20,"de-rp":27,"pl-lb":4,"by-ma":9,"pl-sl":20,"de-be":9,"sk-zi":4,"pl-ma":1,"de-st":1,"de-th":4,"pl-op":1,"pl-sk":5,"pl-ld":2},"anethum":{"de-sl":6,"de-by":7,"de-nw":4,"by-br":3,"pl-kp":4,"by-mi":11,"by-ma":3,"de-he":11,"de-ni":4,"de-th":1,"by-ho":7,"de-sh":3,"de-be":2,"de-rp":2,"by-hr":3,"de-bw":6,"de-sn":2,"pl-ld":3,"pl-ma":5,"de-hh":1,"de-st":1,"pl-wn":1,"sk-zi":1,"pl-sl":4},"chelidonium":{"de-he":990,"de-by":787,"de-nw":706,"de-sn":583,"de-ni":505,"by-br":189,"de-bw":657,"pl-pk":107,"de-be":1659,"de-st":162,"de-rp":385,"de-sl":42,"de-hh":139,"pl-sl":213,"de-bb":324,"pl-pm":182,"pl-pd":129,"pl-zp":143,"pl-ds":295,"de-sh":481,"de-th":118,"sk-zi":63,"sk-bl":224,"pl-ma":572,"by-hr":126,"by-mi":523,"pl-kp":352,"sk-ni":47,"pl-mz":739,"de-mv":81,"sk-ta":45,"pl-op":49,"by-ma":49,"by-vi":47,"pl-wn":187,"pl-lu":130,"sk-bc":98,"pl-ld":347,"pl-wp":422,"pl-lb":40,"pl-sk":37,"de-hb":60,"by-ho":94,"sk-ki":106,"sk-pv":48,"sk-tc":41},"cetraria":{"pl-ds":26,"by-vi":13,"de-ni":6,"pl-lb":3,"pl-wn":2,"pl-sl":9,"de-by":57,"pl-mz":53,"de-bw":19,"by-hr":14,"by-mi":20,"by-br":16,"pl-ma":12,"pl-kp":6,"pl-ld":7,"pl-lu":15,"by-ma":1,"pl-wp":2,"pl-pd":10,"pl-pm":19,"sk-zi":18,"sk-pv":8,"by-ho":2,"sk-ta":2,"de-mv":1,"de-bb":9,"pl-pk":6,"de-st":2,"pl-sk":6,"sk-bc":8,"sk-ki":1,"de-sh":1,"de-th":5},"juniper":{"de-bw":145,"by-br":181,"pl-ma":134,"de-nw":81,"de-ni":120,"pl-pm":96,"de-by":287,"de-he":143,"de-th":104,"by-vi":49,"sk-pv":40,"pl-pk":48,"sk-bl":24,"de-be":13,"by-hr":118,"de-st":3,"de-mv":27,"de-bb":10,"sk-zi":64,"pl-zp":46,"de-rp":39,"pl-wp":27,"pl-kp":31,"by-mi":177,"sk-ki":30,"pl-sl":69,"pl-ld":43,"pl-sk":26,"pl-lu":205,"pl-mz":153,"sk-bc":29,"pl-lb":14,"by-ma":20,"by-ho":16,"pl-pd":47,"sk-tc":33,"sk-ni":14,"pl-wn":15,"de-sh":1,"de-sn":11,"pl-ds":19,"sk-ta":10},"calamus":{"pl-pd":5,"de-he":19,"by-hr":17,"de-hh":2,"pl-zp":14,"de-nw":9,"pl-wn":8,"by-mi":22,"de-st":3,"de-hb":1,"by-br":14,"by-vi":8,"de-bw":7,"pl-kp":4,"by-ho":15,"de-by":17,"de-sh":6,"de-ni":9,"by-ma":5,"pl-ds":3,"pl-lu":1,"pl-pm":10,"de-be":3,"de-th":1,"de-mv":4,"de-bb":2,"pl-pk":3,"de-sn":4,"de-rp":3,"pl-mz":8,"pl-ld":1,"pl-wp":6,"pl-sl":1,"sk-bc":3,"pl-sk":1,"pl-ma":1},"hops":{"by-br":136,"de-sl":37,"de-sn":227,"de-bw":234,"de-bb":179,"de-be":740,"de-nw":340,"de-he":403,"de-by":260,"pl-zp":59,"de-rp":189,"de-ni":212,"sk-tc":16,"de-sh":237,"pl-mz":386,"de-th":29,"de-hb":35,"pl-pd":54,"sk-ni":13,"by-mi":164,"by-hr":99,"pl-ma":378,"de-hh":58,"pl-kp":164,"by-vi":39,"pl-wn":96,"de-mv":70,"pl-lu":45,"pl-pm":47,"pl-pk":64,"pl-ds":123,"sk-bl":131,"pl-lb":26,"pl-ld":57,"de-st":68,"pl-sk":24,"pl-sl":72,"sk-ta":27,"by-ho":71,"sk-bc":22,"sk-pv":17,"pl-wp":229,"sk-zi":19,"by-ma":31,"pl-op":10,"sk-ki":33},"tansy":{"de-nw":793,"by-br":137,"de-rp":545,"pl-pk":113,"de-sn":565,"pl-ma":510,"de-sl":111,"de-be":753,"de-bw":325,"de-he":1036,"de-th":123,"de-bb":322,"pl-ld":356,"pl-wn":109,"pl-pd":62,"pl-kp":204,"pl-zp":112,"de-ni":562,"de-by":516,"pl-lb":37,"sk-tc":30,"sk-zi":103,"de-st":184,"sk-bc":44,"de-hh":99,"pl-lu":87,"pl-sl":188,"by-hr":81,"de-sh":470,"sk-ni":17,"pl-op":34,"de-mv":163,"pl-mz":468,"pl-ds":204,"by-vi":44,"sk-pv":54,"by-mi":519,"pl-pm":232,"pl-wp":181,"by-ma":64,"by-ho":128,"de-hb":89,"sk-bl":60,"pl-sk":36,"sk-ta":19,"sk-ki":33},"willow":{"de-he":576,"de-bb":79,"de-bw":415,"pl-pk":55,"pl-ma":322,"de-nw":181,"de-ni":248,"pl-mz":121,"de-sn":182,"de-sl":39,"de-th":36,"de-be":93,"pl-pd":83,"pl-zp":89,"by-vi":179,"by-mi":638,"de-by":783,"de-sh":218,"de-rp":113,"pl-pm":137,"pl-kp":61,"de-hh":12,"by-hr":270,"by-br":362,"pl-ds":57,"pl-lb":7,"sk-bc":28,"pl-sl":91,"by-ma":66,"by-ho":190,"pl-ld":64,"pl-lu":49,"sk-pv":61,"de-mv":64,"de-st":38,"pl-wp":116,"sk-bl":19,"pl-op":4,"pl-wn":43,"sk-tc":5,"sk-ta":3,"pl-sk":9,"sk-zi":96,"de-hb":8,"sk-ni":2,"sk-ki":8},"mullein":{"de-he":722,"de-bw":577,"de-nw":500,"de-sn":177,"de-rp":419,"de-be":221,"de-sl":56,"de-by":766,"de-st":95,"pl-pk":29,"pl-pd":57,"pl-kp":59,"de-ni":386,"pl-zp":68,"sk-zi":44,"de-hh":29,"pl-sl":63,"sk-ki":48,"sk-tc":29,"de-bb":173,"pl-lb":26,"pl-ma":79,"by-hr":92,"de-sh":170,"de-th":61,"pl-pm":59,"de-mv":97,"by-mi":182,"pl-mz":90,"pl-ds":81,"by-vi":36,"pl-wn":69,"by-br":170,"sk-pv":38,"pl-wp":60,"sk-bc":80,"de-hb":13,"sk-ta":23,"by-ho":150,"pl-lu":159,"pl-ld":42,"sk-bl":73,"by-ma":30,"sk-ni":39,"pl-op":13,"pl-sk":22},"malva":{"sk-bl":90,"de-nw":376,"de-bw":350,"de-sn":211,"de-bb":83,"de-he":449,"de-sl":38,"de-rp":270,"de-st":115,"de-ni":225,"pl-pm":72,"pl-lu":30,"de-mv":81,"pl-zp":12,"de-be":348,"pl-ma":80,"de-by":312,"sk-tc":12,"sk-zi":11,"sk-ni":9,"de-sh":128,"de-th":39,"pl-kp":40,"pl-op":15,"de-hh":58,"pl-sl":23,"pl-ds":67,"de-hb":30,"by-hr":13,"by-br":50,"pl-mz":129,"pl-wp":22,"pl-ld":16,"by-mi":16,"pl-pd":4,"pl-sk":7,"sk-bc":15,"sk-ta":10,"by-ho":4,"pl-lb":7,"pl-wn":12,"pl-pk":12,"by-ma":1,"sk-ki":5,"sk-pv":2},"fennel":{"de-nw":20,"de-bw":46,"de-he":85,"de-by":29,"de-hh":3,"de-rp":41,"de-be":27,"de-sn":8,"de-sh":48,"de-st":8,"pl-sl":1,"de-ni":24,"de-mv":10,"pl-kp":1,"by-mi":4,"pl-pm":2,"de-bb":4,"de-sl":2,"by-br":1,"pl-ds":1},"centaurea":{"pl-lb":37,"de-he":571,"de-sn":275,"de-nw":368,"by-br":63,"de-rp":261,"de-bw":448,"de-mv":107,"de-th":55,"de-st":92,"de-hb":17,"pl-pd":38,"de-by":428,"pl-zp":85,"de-bb":190,"de-ni":290,"sk-tc":5,"by-hr":42,"de-sh":191,"pl-op":25,"de-hh":48,"de-be":177,"pl-pk":49,"pl-kp":81,"pl-pm":98,"de-sl":22,"sk-zi":8,"by-ma":20,"by-mi":151,"pl-sl":105,"by-vi":20,"pl-ds":95,"pl-wp":127,"pl-ma":99,"pl-mz":177,"pl-sk":33,"pl-wn":60,"pl-lu":100,"pl-ld":197,"by-ho":48,"sk-ta":3,"sk-bc":16,"sk-ni":5,"sk-bl":23,"sk-ki":26,"sk-pv":3},"daucus":{"sk-zi":1,"by-ho":1},"cucurbita":{"de-by":2,"by-br":4,"pl-wp":2,"by-vi":1,"de-he":3,"pl-ld":2,"de-nw":3,"de-bw":2,"de-bb":2,"pl-pm":2,"de-ni":1,"de-be":2,"de-rp":2,"de-th":1,"pl-ma":2,"de-sn":1,"sk-zi":1,"by-ma":1,"sk-ki":1,"pl-mz":3,"by-mi":2,"pl-kp":1},"coriander":{"de-he":24,"by-hr":3,"de-ni":9,"de-bw":18,"de-be":2,"by-br":4,"by-mi":4,"de-nw":5,"de-hh":1,"de-by":12,"de-st":1,"de-rp":6,"de-bb":2,"by-ho":4,"de-sn":2,"de-sh":2,"sk-bl":2,"pl-mz":1,"pl-pm":2,"de-hb":1},"phaseolus":{"by-br":4,"de-by":4,"pl-lu":1,"pl-ld":1,"pl-pm":2,"by-mi":1,"by-hr":1,"pl-kp":1},"viola":{"de-nw":36,"de-ni":80,"de-sn":60,"de-st":12,"de-bw":19,"de-be":7,"pl-zp":18,"de-sh":52,"sk-zi":24,"by-hr":33,"de-by":52,"pl-kp":9,"de-mv":37,"pl-pd":5,"de-hh":9,"de-bb":62,"sk-pv":15,"by-br":23,"by-vi":4,"pl-pm":70,"de-rp":15,"de-he":55,"by-mi":31,"by-ma":21,"pl-sl":25,"pl-ds":9,"by-ho":36,"pl-ld":9,"sk-bc":13,"pl-pk":5,"pl-ma":6,"pl-sk":4,"sk-ta":8,"pl-lb":3,"pl-mz":14,"de-th":2,"pl-wn":3,"pl-op":1,"sk-ki":7,"pl-lu":2,"sk-bl":8,"sk-tc":8,"sk-ni":3,"de-hb":1,"pl-wp":1},"aesculus":{"de-be":270,"de-nw":254,"de-bw":1658,"de-sl":27,"de-sn":212,"de-ni":154,"de-he":322,"pl-zp":28,"de-by":229,"by-hr":46,"sk-zi":15,"de-sh":212,"sk-ni":5,"de-bb":53,"de-th":34,"pl-kp":51,"de-hh":32,"de-rp":127,"de-mv":23,"pl-mz":119,"pl-ds":42,"de-hb":19,"by-mi":164,"pl-lb":7,"pl-sl":46,"de-st":50,"pl-ma":74,"by-vi":15,"by-br":32,"by-ma":8,"pl-lu":13,"pl-pk":11,"pl-ld":64,"pl-sk":4,"pl-wp":87,"by-ho":16,"pl-pm":38,"pl-op":5,"sk-bl":39,"sk-ta":11,"sk-ki":3,"sk-pv":4,"sk-tc":5,"pl-pd":5,"sk-bc":6,"pl-wn":10},"silybum":{"de-bw":87,"de-he":109,"de-nw":44,"de-sn":23,"by-hr":6,"de-be":16,"de-by":45,"de-bb":6,"pl-zp":9,"de-ni":24,"de-th":7,"pl-wp":7,"de-rp":52,"pl-ds":6,"sk-ta":6,"de-sl":2,"by-mi":15,"pl-pm":13,"pl-lu":13,"de-st":8,"by-ho":1,"pl-ma":3,"sk-ki":3,"pl-mz":10,"de-sh":8,"pl-sl":5,"sk-tc":2,"pl-pk":5,"sk-zi":8,"pl-op":3,"sk-bl":6,"pl-ld":1,"de-hb":3,"sk-ni":7,"de-hh":1,"pl-sk":1,"sk-pv":3,"pl-wn":1,"pl-lb":1,"pl-kp":3,"by-br":1},"dryopteris":{"de-ni":198,"de-nw":269,"de-sn":220,"pl-ma":237,"sk-zi":25,"de-bw":450,"de-rp":216,"de-he":470,"de-be":142,"de-by":414,"pl-ds":108,"de-sh":286,"sk-tc":8,"pl-zp":64,"de-th":59,"pl-pd":39,"pl-pk":66,"by-hr":66,"de-st":39,"de-hh":45,"pl-sl":80,"de-mv":38,"by-ma":38,"de-bb":65,"de-sl":20,"by-br":94,"by-mi":226,"pl-pm":88,"sk-pv":16,"pl-ld":114,"pl-lu":49,"sk-bl":18,"pl-sk":8,"pl-wp":86,"sk-ki":18,"sk-bc":23,"by-vi":20,"by-ho":74,"pl-mz":131,"pl-kp":48,"sk-ni":4,"pl-op":15,"sk-ta":3,"pl-wn":53,"de-hb":11,"pl-lb":26},"onion":{"de-he":5,"pl-ma":1,"de-bw":1,"sk-bc":1,"pl-ld":1,"pl-lu":2,"by-mi":1,"sk-zi":1,"de-nw":1,"de-by":1},"garlic":{"de-sn":4,"de-bw":19,"de-rp":2,"de-st":4,"de-he":8,"by-ho":3,"de-by":2,"pl-lu":1,"by-br":3,"by-ma":1,"de-sh":1,"by-mi":3,"de-ni":2,"de-hh":1,"by-vi":1,"by-hr":2},"bogbean":{"de-by":262,"by-br":23,"de-bb":33,"de-rp":32,"sk-zi":29,"de-bw":155,"pl-zp":81,"pl-pd":54,"de-sl":3,"de-sh":39,"by-hr":24,"de-hh":4,"pl-lu":26,"pl-kp":4,"by-vi":23,"pl-pm":60,"de-ni":52,"de-he":55,"by-mi":12,"de-nw":39,"pl-lb":7,"pl-wp":6,"de-sn":13,"sk-pv":8,"by-ho":4,"pl-wn":15,"pl-ma":11,"pl-sl":6,"pl-mz":22,"de-st":3,"de-mv":24,"pl-pk":8,"de-th":8,"de-be":2,"de-hb":1,"pl-ds":1,"pl-ld":2,"sk-bc":7,"sk-ta":1},"saponaria":{"by-vi":39,"de-he":398,"de-be":538,"de-bw":343,"de-sl":33,"de-th":52,"de-nw":269,"de-by":388,"pl-pd":56,"pl-kp":130,"pl-zp":82,"de-rp":223,"de-sn":128,"de-bb":201,"sk-zi":20,"de-ni":172,"by-hr":78,"pl-sl":73,"de-mv":86,"de-hh":30,"pl-ma":96,"de-st":87,"pl-lu":56,"by-br":113,"de-sh":129,"pl-op":14,"sk-ni":6,"pl-pm":104,"by-mi":254,"sk-bc":19,"by-ho":81,"sk-ta":15,"by-ma":35,"pl-wp":134,"pl-ld":121,"pl-mz":195,"pl-ds":38,"de-hb":23,"sk-ki":20,"pl-pk":33,"pl-wn":52,"sk-pv":17,"pl-lb":20,"pl-sk":22,"sk-tc":15,"sk-bl":38},"thymus":{"de-he":3,"de-bw":2,"de-th":1,"de-sn":2},"rubus":{"de-nw":109,"de-bw":114,"de-st":21,"de-th":30,"de-by":178,"pl-zp":25,"de-sn":58,"pl-lb":6,"de-he":167,"de-mv":9,"de-bb":14,"pl-ma":134,"de-be":15,"de-ni":74,"by-hr":75,"de-sh":83,"sk-pv":34,"pl-pd":20,"de-rp":38,"pl-ds":68,"sk-zi":19,"de-hh":5,"by-br":53,"by-vi":45,"by-mi":248,"pl-sl":58,"pl-lu":15,"by-ma":29,"pl-ld":37,"pl-pk":34,"sk-bc":10,"by-ho":24,"de-sl":2,"pl-mz":44,"pl-wp":39,"pl-kp":24,"sk-ta":1,"pl-pm":60,"pl-wn":32,"pl-op":5,"sk-ki":5,"sk-tc":2,"pl-sk":8,"sk-ni":1,"sk-bl":1},"cichorium":{"de-nw":570,"de-sn":362,"de-bw":844,"by-br":107,"by-vi":74,"de-he":874,"de-sl":43,"de-bb":207,"de-be":347,"pl-mz":403,"de-by":619,"de-th":122,"pl-kp":152,"sk-zi":65,"pl-zp":60,"de-mv":138,"pl-sl":111,"sk-tc":38,"sk-bl":116,"de-st":145,"de-rp":453,"by-mi":453,"de-ni":219,"de-sh":242,"by-hr":77,"pl-op":26,"sk-ni":15,"pl-lu":80,"pl-pd":97,"sk-ta":16,"pl-ld":195,"sk-pv":36,"pl-pm":113,"de-hh":39,"pl-wn":82,"pl-pk":70,"sk-bc":64,"by-ho":89,"pl-lb":23,"pl-ds":104,"pl-wp":171,"by-ma":42,"pl-ma":121,"sk-ki":56,"de-hb":22,"pl-sk":31},"symphytum":{"de-he":230,"de-rp":264,"de-nw":421,"by-br":92,"de-bb":77,"de-ni":162,"pl-ma":300,"de-st":30,"de-by":488,"de-bw":340,"pl-ds":146,"de-sl":31,"de-hb":14,"pl-kp":87,"pl-zp":78,"sk-zi":81,"de-sn":128,"sk-pv":66,"by-hr":68,"sk-ni":12,"de-sh":75,"de-be":41,"pl-mz":183,"pl-pm":78,"pl-sl":63,"sk-ki":53,"de-th":19,"pl-op":31,"pl-lu":46,"pl-lb":16,"pl-pd":40,"de-hh":6,"by-vi":17,"sk-bc":37,"pl-pk":59,"by-mi":83,"pl-ld":25,"by-ma":9,"pl-wp":61,"sk-bl":49,"by-ho":30,"de-mv":27,"sk-ta":21,"sk-tc":22,"pl-sk":13,"pl-wn":38},"rumex":{"de-nw":40,"by-br":21,"de-rp":66,"de-bw":87,"de-sn":62,"de-sl":12,"pl-zp":9,"pl-ds":17,"de-mv":11,"de-sh":177,"de-be":79,"de-he":312,"de-by":108,"pl-mz":26,"de-th":8,"de-bb":22,"pl-kp":30,"by-mi":22,"by-vi":9,"de-ni":61,"pl-ld":20,"by-ho":8,"by-hr":8,"by-ma":7,"de-hh":3,"pl-pk":7,"pl-pd":7,"de-st":13,"pl-wp":14,"pl-sk":2,"de-hb":7,"sk-pv":2,"pl-wn":6,"pl-pm":15,"pl-sl":10,"sk-ki":2,"sk-zi":4,"sk-ta":1,"pl-ma":8,"sk-bc":3,"sk-bl":1,"pl-op":1},"chenopodium":{"de-he":345,"de-bw":68,"de-sn":83,"de-nw":140,"de-sl":7,"pl-zp":18,"de-by":86,"de-bb":43,"de-be":406,"de-rp":64,"sk-tc":10,"de-ni":82,"de-th":12,"pl-ma":22,"de-sh":39,"by-vi":13,"de-mv":23,"de-hh":14,"pl-wn":19,"pl-mz":123,"by-ma":12,"by-mi":180,"pl-wp":106,"pl-kp":86,"de-st":14,"by-br":36,"by-hr":21,"de-hb":2,"pl-pm":47,"sk-zi":12,"sk-pv":3,"pl-pd":11,"sk-ki":2,"by-ho":31,"sk-bl":41,"pl-ds":25,"pl-sk":5,"pl-ld":49,"sk-bc":7,"pl-sl":27,"sk-ni":9,"pl-op":7,"sk-ta":7,"pl-pk":18,"pl-lb":2,"pl-lu":12},"armoracia":{"de-sn":55,"de-he":231,"de-bw":87,"de-rp":34,"pl-sl":22,"pl-kp":41,"by-vi":21,"pl-zp":18,"de-th":21,"de-sl":9,"de-by":70,"sk-zi":49,"by-mi":284,"pl-lu":35,"by-hr":69,"de-ni":75,"de-be":32,"pl-pd":44,"pl-mz":142,"de-mv":16,"pl-ds":55,"de-nw":28,"de-bb":27,"pl-lb":9,"sk-bl":16,"pl-wp":39,"by-br":61,"by-ma":18,"de-sh":38,"de-st":19,"pl-op":5,"by-ho":67,"pl-pk":39,"sk-bc":9,"pl-pm":40,"pl-ld":72,"pl-sk":12,"de-hh":3,"pl-wn":52,"pl-ma":141,"sk-ki":8,"sk-pv":21,"de-hb":6,"sk-tc":4,"sk-ni":1},"oxycoccus":{"de-ni":100,"de-by":211,"de-st":3,"de-sn":21,"pl-zp":140,"by-vi":72,"de-nw":12,"by-hr":32,"de-sh":87,"pl-pd":22,"pl-lu":17,"pl-pm":148,"pl-kp":7,"by-mi":31,"de-bb":19,"pl-mz":56,"by-br":52,"pl-ld":7,"de-bw":70,"sk-zi":11,"pl-wp":8,"pl-pk":6,"pl-sk":15,"pl-ds":31,"de-rp":5,"de-he":24,"by-ho":8,"pl-wn":20,"by-ma":7,"de-mv":34,"pl-sl":49,"pl-lb":5,"pl-ma":6,"de-th":6,"de-hh":1,"sk-pv":4,"sk-bc":1,"de-be":2},"ribes":{"by-hr":11,"de-hh":1,"de-by":8,"by-mi":17,"pl-zp":5,"by-br":11,"by-ma":3,"pl-wn":1,"de-nw":5,"pl-wp":9,"de-sh":4,"pl-sk":2,"by-vi":7,"by-ho":8,"de-he":2,"pl-pd":4,"pl-kp":2,"de-sl":1,"de-bw":6,"pl-sl":1,"de-ni":7,"pl-ma":4,"sk-tc":1,"de-mv":1,"de-st":1,"pl-pm":7,"pl-ds":1,"pl-ld":7,"de-bb":2,"pl-mz":3,"pl-lu":1,"sk-bc":1,"sk-zi":5,"de-rp":1,"de-sn":1},"marrubium":{"de-bw":1,"de-sn":1,"de-by":1,"de-he":1,"de-ni":2,"de-st":1,"pl-pk":1},"viscum":{"de-he":436,"de-nw":176,"de-rp":211,"by-br":333,"de-ni":255,"de-mv":55,"pl-wp":84,"de-bw":331,"de-by":511,"pl-pd":61,"sk-bl":79,"de-st":117,"pl-pm":125,"de-sl":25,"de-sn":96,"pl-op":70,"pl-zp":61,"de-be":255,"sk-ta":12,"pl-lu":68,"de-th":33,"de-bb":258,"pl-mz":204,"pl-kp":115,"pl-ds":61,"by-hr":278,"pl-pk":44,"pl-sl":159,"pl-lb":18,"pl-ma":129,"by-ma":25,"by-mi":145,"by-ho":141,"sk-bc":10,"pl-sk":7,"de-hh":4,"sk-ki":129,"pl-wn":210,"pl-ld":85,"sk-pv":9,"de-sh":9,"sk-tc":2,"sk-zi":5,"sk-ni":2},"padus":{"de-he":232,"de-bw":246,"de-nw":278,"by-br":103,"de-sn":104,"de-be":299,"de-sl":21,"de-ni":198,"de-by":475,"pl-zp":45,"sk-ta":7,"by-vi":29,"de-th":22,"pl-ma":506,"by-hr":148,"pl-kp":156,"de-sh":157,"by-mi":171,"de-hh":50,"pl-pd":50,"de-bb":42,"de-hb":18,"de-rp":55,"sk-bc":21,"pl-sl":82,"de-mv":24,"sk-zi":43,"pl-pk":32,"pl-ds":69,"pl-ld":62,"pl-mz":223,"de-st":28,"by-ma":20,"pl-lu":51,"pl-sk":9,"pl-wp":137,"pl-lb":18,"sk-bl":47,"sk-pv":16,"pl-pm":34,"pl-wn":46,"by-ho":19,"sk-ki":6,"pl-op":7,"sk-tc":1},"picea":{"de-bw":197,"pl-ma":305,"de-nw":87,"pl-pd":80,"de-by":843,"de-sn":97,"de-ni":115,"de-st":43,"de-sl":11,"de-he":210,"de-rp":50,"by-mi":613,"de-be":38,"pl-zp":34,"by-hr":254,"de-sh":103,"de-bb":28,"de-mv":13,"by-br":166,"pl-ds":146,"pl-kp":6,"pl-ld":33,"pl-sl":206,"pl-pk":51,"pl-lu":19,"by-vi":70,"by-ma":44,"pl-mz":88,"pl-pm":175,"pl-sk":16,"sk-zi":224,"by-ho":40,"de-th":24,"pl-wn":70,"pl-wp":43,"sk-pv":69,"sk-ta":3,"de-hh":3,"sk-ni":6,"sk-tc":16,"pl-op":9,"sk-bl":8,"sk-bc":15,"pl-lb":8,"de-hb":2,"sk-ki":5},"trifolium":{"de-nw":628,"by-br":109,"de-by":958,"de-be":627,"de-bw":1210,"de-sl":68,"de-sn":593,"de-bb":156,"de-rp":554,"de-he":854,"pl-ds":403,"de-th":131,"de-st":128,"pl-kp":132,"pl-zp":60,"de-ni":447,"sk-tc":29,"pl-pk":130,"sk-pv":44,"pl-ma":776,"pl-wp":160,"de-hh":56,"pl-mz":600,"pl-lu":101,"sk-zi":107,"by-hr":83,"by-vi":53,"de-mv":85,"pl-pm":216,"by-mi":576,"pl-ld":273,"pl-pd":70,"de-hb":64,"sk-bl":165,"pl-sl":271,"sk-ta":21,"de-sh":809,"by-ho":56,"sk-ki":31,"by-ma":33,"pl-sk":48,"pl-wn":145,"sk-bc":34,"pl-lb":19,"sk-ni":14,"pl-op":39},"oxalis":{"de-he":360,"de-sn":227,"de-nw":347,"de-rp":203,"pl-ma":609,"de-mv":89,"de-th":93,"de-be":15,"de-ni":398,"de-bb":61,"de-sl":35,"de-bw":695,"de-hh":35,"de-by":913,"sk-zi":105,"sk-bl":38,"pl-zp":109,"pl-mz":206,"pl-pd":143,"by-br":132,"by-hr":137,"by-mi":339,"de-sh":328,"pl-pm":255,"pl-kp":52,"pl-ds":279,"sk-pv":62,"pl-pk":141,"pl-sl":219,"pl-ld":77,"de-st":54,"pl-lu":111,"pl-sk":44,"by-ma":48,"by-vi":65,"sk-ki":25,"pl-lb":26,"by-ho":34,"pl-wn":93,"pl-wp":114,"pl-op":32,"sk-bc":32,"de-hb":8,"sk-ta":2,"sk-tc":34,"sk-ni":2},"glechoma":{"de-he":992,"de-nw":1191,"de-rp":422,"de-sn":452,"de-ni":801,"by-br":112,"de-mv":144,"de-by":771,"de-bb":228,"de-sl":104,"de-bw":1007,"de-hh":137,"pl-ds":352,"pl-kp":218,"pl-zp":111,"pl-ma":680,"sk-zi":69,"de-be":710,"de-th":87,"de-sh":909,"pl-pd":42,"pl-sl":177,"by-hr":88,"pl-wn":142,"sk-ni":24,"by-mi":317,"pl-mz":624,"sk-tc":27,"by-vi":32,"pl-wp":253,"pl-pk":127,"de-st":131,"sk-bc":32,"pl-ld":148,"pl-lu":88,"de-hb":107,"pl-pm":217,"sk-bl":139,"by-ma":31,"sk-ki":36,"pl-sk":39,"by-ho":52,"sk-pv":25,"pl-op":39,"sk-ta":37,"pl-lb":31},"elymus":{"de-sn":16,"de-nw":13,"de-bw":23,"pl-zp":5,"de-he":67,"de-hh":4,"pl-pd":7,"by-hr":18,"by-mi":58,"by-vi":7,"de-st":7,"pl-kp":39,"by-ho":28,"by-br":33,"pl-lu":3,"by-ma":9,"de-ni":15,"de-bb":3,"de-be":11,"de-by":21,"de-rp":6,"de-sh":8,"pl-pm":6,"pl-mz":12,"pl-wn":3,"sk-bl":7,"pl-wp":20,"pl-ma":8,"sk-ni":3,"sk-ki":5,"pl-ds":3,"sk-tc":2,"pl-ld":4,"pl-pk":3,"pl-op":1,"sk-ta":1,"pl-sl":3,"sk-bc":2,"pl-lb":2,"pl-sk":5,"de-mv":1},"corylus":{"de-he":660,"de-ni":279,"de-nw":497,"pl-pk":93,"de-sn":251,"de-bw":604,"de-sl":72,"de-rp":284,"de-by":708,"pl-zp":33,"de-be":365,"sk-tc":13,"de-th":57,"pl-ma":323,"de-bb":123,"pl-wp":122,"by-hr":149,"pl-ds":118,"pl-pd":86,"de-hh":29,"pl-kp":67,"by-mi":330,"by-br":119,"de-sh":424,"de-hb":24,"de-mv":36,"by-vi":54,"pl-wn":44,"pl-pm":99,"pl-lu":108,"pl-mz":154,"sk-bc":30,"de-st":46,"by-ma":42,"by-ho":44,"pl-ld":82,"pl-sk":21,"pl-sl":128,"pl-op":12,"sk-zi":46,"sk-pv":20,"sk-bl":38,"sk-ni":12,"pl-lb":19,"sk-ki":15,"sk-ta":2},"centaurium":{"de-nw":113,"de-sn":36,"de-bw":110,"de-rp":87,"de-sl":4,"pl-zp":15,"de-by":188,"by-mi":27,"de-he":194,"de-ni":84,"de-sh":17,"by-hr":21,"de-th":16,"pl-kp":8,"pl-sl":11,"by-br":14,"de-st":26,"pl-pk":15,"de-mv":20,"by-vi":12,"pl-ds":35,"by-ho":21,"pl-mz":10,"sk-pv":9,"pl-ma":22,"pl-ld":7,"sk-tc":11,"pl-lb":10,"de-bb":14,"pl-wn":3,"pl-op":6,"sk-bl":16,"sk-ta":2,"sk-ki":5,"pl-pm":5,"sk-bc":11,"pl-lu":14,"pl-sk":3,"by-ma":4,"sk-zi":16,"sk-ni":3,"pl-wp":7,"pl-pd":1,"de-be":1},"calluna":{"de-nw":539,"by-br":105,"pl-ma":184,"de-sn":295,"de-bw":500,"de-st":123,"de-rp":295,"de-by":535,"pl-pm":332,"de-hh":40,"de-he":298,"de-th":94,"by-mi":257,"de-bb":195,"sk-zi":46,"de-ni":659,"de-mv":77,"de-sh":374,"by-hr":70,"pl-lu":64,"pl-ld":70,"pl-zp":95,"pl-ds":278,"pl-sl":165,"by-vi":88,"pl-kp":114,"pl-pk":64,"pl-mz":220,"pl-op":25,"pl-sk":38,"by-ho":52,"sk-ni":5,"pl-wn":42,"pl-wp":71,"de-be":37,"sk-pv":99,"pl-lb":42,"pl-pd":48,"by-ma":27,"de-sl":16,"sk-ki":7,"sk-bl":9,"sk-tc":2,"sk-bc":7,"sk-ta":8,"de-hb":7},"berberis":{"de-nw":30,"de-by":262,"de-st":34,"de-ni":16,"de-bw":99,"de-rp":34,"de-sn":13,"de-th":37,"de-bb":14,"de-be":37,"by-hr":20,"sk-ni":6,"sk-ta":5,"de-he":37,"pl-kp":66,"by-mi":32,"pl-wp":12,"sk-pv":5,"pl-lu":11,"pl-ds":5,"pl-ma":20,"pl-mz":20,"by-br":12,"by-vi":9,"by-ho":9,"pl-ld":7,"sk-ki":18,"de-sh":3,"pl-wn":6,"sk-bl":49,"pl-zp":12,"pl-sl":17,"by-ma":5,"sk-bc":5,"pl-pd":8,"sk-tc":16,"pl-lb":3,"sk-zi":17,"pl-pm":13,"pl-sk":5,"de-mv":3,"pl-op":1,"pl-pk":4},"veronica":{"de-nw":150,"pl-ma":88,"de-st":72,"de-bw":180,"de-th":43,"de-ni":232,"de-he":286,"de-sn":113,"de-rp":127,"pl-pk":47,"pl-zp":60,"de-sh":47,"by-mi":149,"de-by":208,"pl-sl":38,"pl-kp":34,"de-sl":14,"pl-pd":27,"pl-ds":130,"by-br":60,"by-hr":28,"by-vi":28,"pl-lu":26,"de-bb":54,"pl-ld":79,"pl-sk":14,"sk-zi":40,"de-be":51,"by-ma":6,"by-ho":44,"pl-lb":14,"pl-wp":57,"pl-mz":74,"de-hh":7,"de-mv":24,"pl-op":9,"sk-bc":24,"pl-wn":28,"pl-pm":155,"sk-bl":9,"sk-pv":31,"sk-tc":7,"sk-ki":10,"sk-ni":3,"sk-ta":1},"arctium":{"de-he":438,"de-nw":287,"by-br":110,"de-sn":216,"pl-ma":68,"de-bw":279,"de-st":97,"de-bb":61,"de-sl":13,"pl-ds":37,"de-mv":55,"de-by":346,"de-th":94,"pl-kp":69,"de-be":155,"pl-zp":41,"de-rp":101,"sk-zi":58,"by-mi":344,"de-ni":358,"sk-tc":33,"by-vi":39,"de-sh":140,"pl-wp":60,"by-hr":51,"sk-ni":10,"pl-pd":18,"pl-lb":5,"sk-pv":49,"pl-wn":28,"pl-lu":18,"de-hh":16,"by-ma":28,"by-ho":69,"pl-ld":21,"pl-pk":18,"pl-sl":34,"sk-bc":18,"pl-pm":27,"pl-mz":98,"de-hb":6,"sk-ta":11,"sk-bl":40,"sk-ki":30,"pl-op":8,"pl-sk":4},"lamium":{"de-he":738,"de-sn":242,"de-nw":805,"de-bw":510,"de-sl":42,"de-sh":321,"pl-ds":51,"de-th":89,"de-rp":326,"de-be":304,"pl-pd":27,"pl-zp":25,"de-by":444,"de-bb":118,"pl-ma":248,"by-hr":128,"de-ni":426,"de-mv":58,"pl-kp":182,"by-mi":264,"pl-pm":153,"de-hh":47,"by-vi":27,"de-hb":50,"pl-mz":363,"by-br":64,"sk-pv":55,"pl-pk":72,"pl-wp":117,"pl-lb":15,"pl-sl":40,"pl-lu":68,"de-st":115,"sk-ki":59,"by-ma":12,"pl-sk":18,"pl-op":10,"pl-ld":18,"pl-wn":78,"by-ho":6,"sk-zi":2,"sk-tc":2,"sk-ta":5,"sk-bl":1,"sk-bc":11,"sk-ni":1},"petroselinum":{"de-bw":4,"de-he":5,"de-bb":1,"by-mi":6,"de-be":1,"de-st":2,"de-ni":2,"de-nw":3,"de-th":2,"de-sn":1,"pl-zp":2,"de-hh":1,"pl-sl":1,"de-sh":1},"abrotanum":{"by-ho":22,"by-vi":1,"by-mi":4,"by-br":1,"de-sn":1}};
  for (const k in P) if (window.INAT && !window.INAT.plants[k]) window.INAT.plants[k] = P[k];
  for (const k in R) if (window.MAPDATA && !window.MAPDATA.counts[k]) window.MAPDATA.counts[k] = R[k];
})();
