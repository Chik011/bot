const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
      if (args.length === 0) {
        await conn.reply(m.chat, `MAX HP★
6199999   HP Lv 10
5199999   HP Lv 10
4262222   HP Lv 10
1010203   HP Lv 10
6010062   HP Lv 10 + Frac Barrier Lv 8
1010032   HP Lv 10
1010084   HP Lv 10
1011945   HP Lv 10
1234567   HP Lv 10
3011143   HP Lv 10

MAXMP★

6052000   MP Lv 10
1020808   MP Lv 10
1010216   MP Lv 10
1200001   MP Lv 10 + DEX Lv 9
1220069   MP Lv 10 + DTE Water
2011234   MP Lv 10 + AMPR Lv 9 
7012828   MP Lv 10
3204544   MP Lv 10
6010021   MP Lv 10
6070013   MP Lv 10
1011212   MP Lv 10
1016646   MP Lv 10
4011793   MP Lv 10
1010013   MP Lv 10
4011793   MP Lv 10
1011212   MP Lv 10

AMPR★

2010068   AMPR Lv 10
7088807   AMPR Lv 10
5010031   AMPR Lv 10 + DEX Lv 9
5236969   AMPR Lv 10 + DTE Earth Lv 6
1011010   AMPR Lv 10
3063101   AMPR Lv 10
1010006   AMPR Lv 10
1011010   AMPR Lv 10
1023040   AMPR Lv 10
3062728   AMPR Lv 10
1010017   AMPR Lv 10
1010092   AMPR Lv 10
5240001   AMPR Lv 10
1010050   AMPR Lv 10
1019696   AMPR Lv 10
3226325   AMPR Lv 10
5010103   AMPR Lv 10
2011111   AMPR Lv 8

CRITICAL RATE★

6065000   CR lv 10
7162029   CR Lv 10 + Agi Lv 10
6022292   CR Lv 10
1200069   CR Lv 10
1010006   CR Lv 10
1010092   CR Lv 10
1010017   CR Lv 10
1010050   CR Lv 10
1011010   CR Lv 10
1012000   CR Lv 10
1100000   CR Lv 10
1069927   CR Lv 10
1012000   CR Lv 10
1010433   CR Lv 10 + DTE Light  
3020108   CR Lv 10 

WEAPON ATK★

7050301   WATK Lv 10
1010810   WATK Lv 10 + DTE Water Lv 4
3081024   WATK Lv 10 + Accuracy Lv 7
1010029   WATK Lv 10
1010099   WATK Lv 10
6010024   WATK Lv 10
1011126   WATK Lv 10
2020404   WATK Lv 10
2010136   WATK Lv 10
3070028   WATK Lv 9
7162029   WATK Lv 9

STR★

1110033   STR Lv 10
1011069   STR Lv 10
7031997   STR Lv 10 
7070777   STR Lv 10
4016699   STR Lv 10
2020303   STR Lv 10
3010095   STR Lv 10
3010085   STR Lv 10
3010003   STR Lv 9
4010417   STR Lv 9

DEX★

4084545   DEX Lv 10 + DTE Fire Lv 5
1010058   DEX Lv 10
5010092   DEX Lv 10
1010106   DEX Lv 10
7011001   DEX Lv 10
2020222   DEX Lv 10
1010058   DEX Lv 10
1020001   DEX Lv 9
6140110   DEX Lv 9

INT★

2020707   INT Lv 10
6061294   INT Lv 10
1010489   INT lv 10
6010701   INT lv 10
1032222   INT Lv 10 + MP Lv 9
1010140   INT Lv 9
6010193   INT Lv 9 

AGI★

7162029   AGI Lv 10 + CR lv 10
2020909   AGI Lv 9
5130123   AGI Lv 9
1010050   AGI Lv 8
1010050   AGI Lv 8
4010228   AGI Lv 8

ACCURACY★

4261111   ACC Lv 10
1010013   ACC Lv 9
7010077   ACC Lv 9
3188000   ACC Lv 8

MAGICAL RESIST★

1111575   MRest Lv 10
2020505   MRest Lv 10
5200052   MRest Lv 10
1010004   MRest Lv 10
7010016   MRest Lv 10
7030023   MRest Lv 10
1100002   MRest Lv 9
4080087   MRest Lv 9
7227777   MRest Lv 9

PHYSICAL RESIST★

1020001   PRest Lv 10
1010081   PRest Lv 10
1100000   PRest Lv 10
3010034   PRest Lv 10
7010014   PRest Lv 10
6011415   PRest Lv 9
4200069   PRest Lv 9
6010701   PRest Lv 9
1018989   PRest Lv 9
3011999   PRest Lv 9

FRACTIONAL BARRIER★

7010082   Frac Barrier Lv 10
1222002   Frac Barrier Lv 8
6181999   Frac Barrier Lv 8
6010062   Frac Barrier Lv 8

+AGGRO%★

1010297   +Aggro Lv 10
1140002   +Aggro Lv 10
3030110   +Aggro Lv 10
7171717   +Aggro Lv 10
3030110   +Aggro Lv 10
2020606   +Aggro Lv 10
3053131   +Aggro Lv 10
6262000   +Aggro Lv 10
1010207   +Aggro Lv 10
3204544   +Aggro Lv 10
3158668   +Aggro Lv 10
1016646   +Aggro Lv 10
1264321   +Aggro Lv 10
1014230   +Aggro Lv 9
1013000   +Aggro Lv 9
1190069   +Aggro Lv 9

-AGGRO%★

1010038   -Aggro Lv 10
1010002   -Aggro Lv 10
1010147   -Aggro Lv 10
1016646   -Aggro Lv 10
6010009   -Aggro Lv 10
3010018   -Aggro Lv 10
3061206   -Aggro Lv 8
3134610   -Aggro Lv 9 
4200963   -Aggro Lv 8

DTE EARTH★

3210103   DTE Earth Lv 10
2020202   DTE Earth Lv 9
1010216   DTE Earth Lv 8
1011111   DTE Earth Lv 8
2022222   DTE Earth Lv 8
4083005   DTE Earth Lv 8 
2099876   DTE Earth Lv 7
1010174   DTE Earth Lv 7 
5240001   DTE Earth Lv Earth Lv 7
3011143   DTE Earth Lv 7
1016646   DTE Earth Lv 7
1010002   DTE Earth Lv 6

DTE WIND★

3210101   DTE Wind Lv 9
3030303   DTE Wind Lv 8
3062111   DTE Wind Lv 8
1010055   DTE Wind Lv 7 
4099876   DTE Wind Lv 7   
1010055   DTE Wind Lv 7

DTE WATER★

7150030   DTE Water Lv 10
3210100   DTE Water Lv 10
3062111   DTE Water Lv 8
7011001   DTE Water Lv 8
2260006   DTE Water Lv 8
1110111   DTE Water Lv 8
6070013   DTE Water Lv 7
1010067   DTE Water Lv 7
3010018   DTE Water Lv 7
1110007   DTE Water Lv 7
3226325   DTE Water Lv 6

DTE FIRE★

7088807   DTE Fire Lv 9
3210106   DTE Fire Lv 9
7011001   DTE Fire Lv 8
1010799   DTE Fire Lv 7
1012610   DTE Fire Lv 7
2010091   DTE Fire Lv 6

DTE LIGHT★

3210105   DTE Light Lv 10
1020345   DTE Light Lv 9
4046666   DTE Light Lv 8
4016699   DTE Light Lv 6

DTE DARK★

1190020   DTE Dark Lv 10
5010092   DTE Dark Lv 9
3210104   DTE Dark Lv 10
3210105   DTE Dark Lv 9
1020345   DTE Dark Lv 9
3210106   DTE Dark Lv 9
5010092   DTE Dark Lv 9
6010003   DTE Dark Lv 8
1010006   DTE Dark Lv 7
1016646   DTE Dark Lv 7
1091111   DTE Dark Lv 7
3030069   DTE Dark Lv 7

DTE NEUTRAL★

3210102   DTE Neutral Lv 10
3099876   DTE Neutral Lv 7
1011902   DTE Neutral Lv 7
6061294   DTE Neutral Lv 7
1019696   DTE Neutral Lv 6
1032727   DTE Neutral Lv 5

DROP RATE★

4196969   Drop Rate Lv 6
1010084   Drop Rate Lv 6
4196969   Drop Rate Lv 6`, m)
      } else {
        await conn.reply(m.chat, 'buff code belum tersedia', m)
      }
      return;
    }
    if (command == 'lvlg') {
      if (args.length === 0) {
        await conn.reply(m.chat, `Level 1-40
Mob: Pova
Lokasi: Lonogo Canyon (Ngarai Lonogo)

Level 40-55
Mob: Bone Dragonewt
Lokasi: Ancient Empress Tomb: Area 1 (Makam Ratu Kuno: Area 1)

Level 55-70

Boss: 
↳ Flare Volg (Hard) | Level 55-62
↳ Flare Volg (Nightmare) | Level 62-70
Lokasi: Fiery Volcano: Lava Trail (Lereng Merapi: Jejak Lava)

Level 70-95
Boss: 
↳ Masked Warrior (Pendekar Beratopeng) - (Hard) | Level 70-79
↳ Masked Warrior (Pendekar Beratopeng) - (Nightmare) | Level 79-95
Lokasi: Land Under Cultivation: Hill (Tanah Pertanian: Tanah Tinggi)

Level 95-112

Boss: Masked Warrior (Pendekar Beratopeng) - (Ultimate)
Lokasi: Land Under Cultivation: Hill (Tanah Pertanian: Tanah Tinggi)
Alternatif:
Mini Boss: Don Yeti
Lokasi: Polde Ice Valley (Lembah Es Polde)

Level 112-125
Boss: Cerberus (Nightmare)
Lokasi: Spring of Rebirth: Top (Mata Air Kelahiran: Puncak)

Level 125-129

Mini Boss: Lapin The Necromancer (Dukun Lapin)
Lokasi: Trace of Dark River (Sungai Kegelapan)
Simpan material "Lapin's Souls", kamu dapat xp tambahan dari side quest di Noble Spirit's Lv83 atau kamu dapat menjualnya dengan harga tinggi di Papan.

Level 129-146
Boss: Cerberus (Ultimate)
Lokasi: Spring of Rebirth: Top (Mata Air Kelahiran: Puncak)
Alternatif:
Boss: Memecoleolus (Ultimate)
↳ Level 132-146
↳ Dark Castle: Area 2 (Istana Gelap: Area 2)
Miniboss: Builder Golem (Builder Golem)
↳ Level 132-143
↳ Huge Crysta Factory: 3rd Floor (Pabrik Crysta Raksasa: Lantai 3)

Level 146-162

Boss: Venena Coenubia (Hard)
Lokasi: Ultimea Palace: Throne (Istana Ultimea: Takhta)
Alternatif:
Boss: Ifrid (Ultimate)
↳ Level 146-154
↳ Blazing Graben: Deepest Part (Graben Membara: Bagian Terdalam)
Boss: York (Ultimate)
↳ Level 154-166
↳ Huge Crysta Factory: Storage (Pabrik Crysta Raksasa: Gudang)
Miniboss: Super Death Mushroom (Jamur Super Mampus)
↳ Level 143-158
↳ Monster's Forest: Animal Trail (Hutan Monster: Jalan Hewan)
Miniboss: Commander Golem (Komandan Golem)
↳ Level 146-162
↳ Lufenas Mansion: Entrance (Mansion Lufenas: Pintu Masuk)

Level 162-179

Boss: Venena Coenubia (Nightmare)
Lokasi: Ultimea Palace: Throne (Istana Ultimea: Takhta)
Alternatif:
Boss: Mozto Machina (Ultimate)
↳ Level 162-172
↳ Large Demi Machina Factory A4
Miniboss: Altoblepas 
↳ Level 166-182
↳ Rokoko Plains

Level 179-182

Miniboss: Altoblepas
Lokasi: Rokoko Plains (Dataran Rokoko)
Alternatif:
Boss: Maton Sword (Pedang Maton) - (Ultimate)
↳ Level 176-190
↳ Buried Tower: Entrance (Menara Penembus Bumi: Pintu Masuk)
Miniboss: Goldenia
↳ Level 179-194
↳ Elf Mountains Watchtower (Pegunungan Elf: Menara Kawal)

Level 182-199

Boss: Venena Coenubia (Ultimate)
Lokasi: Ultimea Palace: Throne (Istana Ultimea: Takhta)
Alternatif:
Boss: Maton Sword (Pedang Maton) - (Ultimate)
↳ Level 176-190
↳ Buried Tower: Entrance (Menara Penembus Bumi: Pintu Masuk)
Boss: Demonic Quasar (Quasar Jahanam) - (Nightmare)
↳ Level 182-193
↳ Morga Wasteland: Deepest Area (Padang Morga: Area Terdalam)
Boss: Mom Fluck (Mama Fluck) - (Ultimate)
↳ Level 190-199
↳ Forgotten Cave (Gua Pelupa)
Boss: Seele Zauga (Ultimate)
↳ Level 193-209
↳ Shrine of the Goddess of Species (Kuil Dewi Spesies)
Miniboss: Goldenia
↳ 179-194
↳ Elf Mountains: Area 3 (Pegunungan Elf: Area 3)
Miniboss: Frenzy Viola (Violangkara)
↳ Level 194-204
↳ Morthell Swell: Area 3 (Bongkahan Morthell: Area 3)

Level 199-215

Boss: Finstern the Dark Dragon (Finstern si Naga Kegelapan) - Ultimate
Lokasi: Dark Dragon Shrine: Near the Top (Kuil Naga Kegelapan: Dekat Puncak)
Alternatif:
Boss: Demonic Quasar (Nightmare)
↳ Level 199-212
↳ Morga Wasteland: Deepest Area (Padang Morga: Area Terdalam)
Miniboss: Frenzy viola
↳ Level 194-204
↳ Morthell Swell: Area 3 (Bongkahan Morthell: Area 3)
Miniboss: Demonic Eye
↳ Level 204-221
↳ Dea Ruinea
Material "Suspicious Old Boxes" cukup mahal kamu dapat menjualnya di papan.

Level 215-227

Boss: Kuzto (Ultimate) 
Lokasi: Labilans Sector: Square (Distrik Labilans: Alun-Alun)
Alternatif:
Boss: Arachnidemon Lv 216(Nightmare)
↳ Level 227-243
↳ Arche Valley: Depths (Lembah Arche: Area Terdalam)
Boss: Gravicep Lv224 (Ultimate)
↳ Level 215-230
↳ Recetacula Sector: Depot Rooftop (Distrik Recetacula: Atap Depot)
Miniboss: Espectro Lv 221
↳ Level 213-227
↳ Arche Valley: Area 1 (Lembah Arche: Area 1)
Miniboss: Armasite
↳ Level 199-202
↳ Fractum Sector: Area 1 (Distrik Fractum: Area 1)
Miniboss: Canemosfish
↳ Level 202-213
↳ Recetacula Sector: Area 1 (Distrik Recetacula: Area 1)

Level 227-244
Boss: Arachnidemon (Ultimate)
Lokasi: Arche Valley: Depths (Lembah Arche: Area Terdalam)
Alternatif
Boss: Venena Metacoenubia (Ultimate)
↳ Level 227-244
Neo Plastida
Boss: Vulture (Ultimate)
↳ Level 233-239
↳ Geist Desert A4
Boss: Hexter (Ultimate)
↳ Level 239-244
↳ Witch's Wood A4
Miniboss: Rhinosaur
↳ Level 227-234
↳ Fugitive Lake Swamp A3
Miniboss: Bullamius
↳ Level 234-246
↳ Storage Yard A2

Level 244-253
Boss: Ferzen the Rock Dragon (Ferzen si Naga Batu) - (Ultimate)
Lokasi: Guardian Forest: Giant Tree (Hutan Lindung: Pohon Raksasa)
Alternatif
Boss: Gemma (Ultimate)
↳ Level 244-253
↳ Furgitive Lake Swamp A4
Boss: Reliza (Ultimate)
↳ Level 244-253
↳ Manna waterfront 
Miniboss: Ignitrus
↳ Level 246-254
↳ Vulcani Crater Base

Level 253-266
Boss: Trickster Dragon Mimyugon (Nightmare)
Lokasi: Operation Zone A4
Alternatif:
Miniboss: Ignitrus
↳ Level 246-256
↳ Vulcani Crater Base
Miniboss: Brassozard
↳ Level 256-262
↳ Operation Zone A3
Miniboss: Trus
↳ Level 262-277
↳ Propulsion System Zone A3

Level 266-272
Boss: Red Ash Dragon Rudis (Hard)
Lokasi: Espuma Dome A4
Alternatif:
Boss: Walican (Nightmare)
↳ Level 266-272
↳ Jabali Kubwa A4
Miniboss: Trus
↳ Level 262-277
↳ Propulsion System Zone A3

Level 272-285
Boss: Trickster Dragon Mimyugon (Ultimate)
Lokasi: Operation Zone A4
Alternatif:
Boss: Red Ash Dragon Rudis (Nightmare)
↳ Level 272-285 
↳ Espuma Dome A4
Miniboss: Trus
↳ Level 262-277 
↳ Propulsion System Zone A3
Miniboss: Charugon
↳ Level 272-282 
↳ Boma Konda A1
Miniboss: Capo Profundo
↳ Level 282-285 
↳ Puerta Island A2`, m)
      } else {
        await conn.reply(m.chat, 'lvlg code belum tersedia', m)
      }
      return;
    }
    if (command == 'pembolong') {
      await conn.reply(m.chat, `Harga belum pasti sesuai, bisa berubah

OHS
0-1: 15-30m
1-2: 150-250m

2H
0-1: 10-15m
1-2: 60-80m

Knuckles
0-1: 12-18m
1-2: 100-120m

Katana
0-1: 12-16m
1-2: 100-120m

Staff
0-1: 10-15m
1-2: 90-120m

Bow
0-1: 9-15m
1-2: 60-90m

Bowgun
0-1: 7-14m
1-2: 45-65m

MD
0-1: 5-12m
1-2: 16-35m

Halberd
0-1: 7-12m
1-2: 70-80m

Armor
Spirit Needle: 10m
Legendary Needle: 400m+

Additionals
Fairy Silk: 5-10m
Legendary Silk: 600m+

Ring
High Grade Ornament: 8-10m
Legendary Ornament: 450-500m`, m)
      return;
    }
    if (command == 'lvlgbs') {
      await conn.reply(m.chat, `LEVELING BS

Versi BS VIT
▫0-15 Baju Pengelana
▫15-120 Baju Diomedia
▫120-140 Tombak Baskara
▫140-170 Katan Bakung Lelabah Merah
▫170-200 2H Golok Pembasmi Naga / 1H Pedang Archanida
▫200-225 Baju Dara / Kostum Pengelabu
▫225-250 2H Pholidata / Kostum Pengelabu
▫250-300 Gak Tau

|----------------------------------------------------------|


Versi BS Tombak/Tinju,MD/Staff
▫0-15 Baju Pengelana
▫15-50 Tinju Hard Knucles
▫50-90 Pedang Indigo
▫90-120 Baju Diomedia
▫120-140 Tombak Baskara
▫140-170 Katana Bakung Lelabah Merah
▫170-200 2H Golok Pembasmi Naga / 1H Pedang Archanida
▫200-225 Baju Dara / Kostum Pengelabu
▫225-250 2H Pholidata / Kostum Pengelabu
▫250-300 Gak Tau`, m)
      return;
    }
    if (command == 'tas') {
      await conn.reply(m.chat, `
        List Bahan Untuk Upgrade Slot Tas Koleksi 
▪ 50-51
- Kulit Colon x1 (Colon; Tanah Pembangunan)
▪ 51-52
- Kulit Berkualitas x1 (Lavarca; Dataran Rakau)
▪ 52-53
- Spina x1.000
▪ 53-54
- Kulit Minotaur x1 (Minotaur; Kuil Runtuh: Area Terlarang)
- Pecahan Kristal Jingga x1 (Cobre; Danau Icule)
▪ 54-55
- Kulit Anjing Hutan x1 (Anjing Hutan; Hutan Marbabo: Bagian Dalam)
- Lencana Goblin x1 (Boss Goblin; Gua Ribisco: Bagian Dalam)
▪ 55-56
- Spina x2.000
▪ 56-57
- Bulu Mochelo x1 (Mochelo; Lereng Merapi A3)
- Kain Linen x10 (Crow Killer; Dusun Douce)
▪ 57-58
- Bulu Naga Giok x1 (Forestia; Tanah Kaos)
- Tanduk Berkualitas x10 (Bandot; Tanah Tinggi Yorl)
▪ 58-59
- Sabuk Bos Roga x1 (Boss Roga; Gua Bawah Tanah Saham: Ujung)
- Kain Beludu x10 (Orc Petarung; Gua Bawah Tanah Saham)
▪ 59-60
- Spina x4.000

▪ 60-61
- Cakar Beruang x2 (Violaccoon; Padang Darkanon)
- Sheeting Fabric x20 (Cassy; Makam Ratu Kuno: Area 2)
▪ 61-62
- Rantai Kukuh x2 (Pendekar Bertopeng; Tanah Tinggi Pertanian)
- Kain Polister x20 (Boneka Pengembara; Kota Hilang)
▪ 62-63
- Sisik Naga Sabana x2 (Naga Sabana Yelb; Desa Albatif)
- Kulit Serigala Alien x20 (Serigala Luar; Gerbang Dunia Lain: Area 1)
▪ 63-64
- Spina x8.000
▪ 64-65
- Jubah Sobek x2 (Goovua; Gurun Akaku: Bukit)
- Kulit Tupai x20 (Rodentail; Maia Diela)
▪ 65-66
- Tanduk Elang Zamrud x2 (Elang Zamrud; Teras Kerikil)
- Bulu Kambing x20 (Koza; Jurang Dunkel)
▪ 66-67
- Sayap Naga Senja x2 (Naga Senja; Benteng Solfini: Atap)
- Bulu Halus x20 (Little Snow Boar; Lembah Es Polde)
▪ 67-68
- Spina x16.000
▪ 68-69
- Rantai Penyucian x2 (Cerberus; Mata Air Kelahiran: Puncak)
- Kain Goyah x20 (Jewel Eye; Mata Air Kelahiran: Tengah)
▪ 69-70
- Benang Aranea x2 (Aranea; Taman Sublimasi: Pusat)
- Benang Laba-Laba Kecil x20 (Aramia; Taman Sublimasi: Area 2)

▪ 70-71
- Kain Dewi Tiruan x3 (Imitacia; Istana Gelap: Aula Besar)
- Kain Apung x10 (Flying Executioner; Buaian Prajurit)
- Tapak Lembut x20 (Bunny Summoner; Sungai Kegelapan)
▪ 71-72
- Surai Hewan Iblis x3 (Memecoleous; Istana Gelap: Area2)
- Bantalan Tapak Keras x10 (Manticore; Istana Gelap: Area1)
- Bulu Bayangan Hitam x20 (Shadow Fly; Istana Gelap: Area1)
▪ 72-73
- Spina 32.000
▪ 73-74
- Bulu Tapir x3 (Tapir; Graben Membara: Permukaan)
- Bulu Kaku x10 (Wooly; Graben Membara: Permukaan)
- Minyak Anti Karat x20 (Ornis Demi Machina; Garis Pertahanan Artileri Otomatis)
▪ 74-75
- Kain Kuno x3 (Proto Leon; Reruntuhan Singolaire: Lantai 3)
- Kulit Pohon Lunak x10 (Floral Bee; Situs Simcracker)
- Rambut Potum Kotor x20 (Slum Potum; Klaspe Kumuh)
▪ 75-76
- Tulang Raksasa Merah x3 (Dusk Machina; Pabrik Demi Machina Kecil: Area 2)
- Mantel Hitam Sobek x10 (Rugos Demi Machina; Pabrik Demi Machina Kecil: Area 2)
- Rantai Putus x20 (Machina Penyiksa; Pabrik Demi Machina Kecil: Area 2)
▪ 76-77
- Sisik Chimera x3 (Mozto Machina; Pabrik Demi Machina Besar: Bagian Terdalam)
- Benda Pendar Aneh x10 (Horn Machina; Pabrik Demi Machina Besar)
- Tentakel Tangguh x20 (Ledon Machina; Pabrik Demi Machina Besar)
▪ 77-78
- Spina x64.000
▪ 78-79
- Jubah Roh Hutan x3 (Lalvada; Hutan Monster: Bagian Dalam)
- Taring Tanaman x10 (Nepenthe; Hutan Monster)
- Kain Felt x20 (Naga Boneka; Mansion Lufenas)
▪ 79-80
- Aloi Lyark x3 (Gwaimol; Penjara Cuervo: Atap)
- Baju Penjaga Robek x10 (Sipir Lyark; Penjara Cuervo: Lantai 2)
- Kain Lembu x20 (Lyark Spesialis; Laboratorium Brahe: Area 2)

▪ 80-81
- Kain Bercahaya x4 (Seraph Machina: Menara Penembus Bumi: Sisi Dalam)
- Kulit Sintetis Rusak x20 (Lyark Brawler: Sekitar Alun-Alun Droma)
- Cawat Pengeksekusi x20 (Volo: Sekitar Alun-Alun Droma Area 2)
▪ 81-82
- Potongan Baju K. Kecil x4 (Venena: Istana Ultimea: Takhta)
- Pecahan Zirah Keras x20 (High Tigris: Istana Ultimea Gudang Demi Machina)
- Kulit Ular x20 (Ular Kolam: Reservoir Copia)
▪ 82-83
- Spina x100.000
▪ 83-84
- Kulit Mama Fluck x4 (Mama Fluck: Gua Pelupa)
- Daun Besar Colon x20 (Leedle Colon: Dataran Rokoko)
- Bulu Garis Vertikal x20 (Rakun Tambun: Hutan Curonne)
▪ 84-85
- Kain Rohani Mardula x4 (Mardula: Serambi Dewa Berkah)
- Kain Berkilau Misterius x20 (Malaikat Gelembung: Koridor Heresi/Kuil Para Dewa/Serambi Dewa Pembangunan/Serambi Dewa Istimewa)
- Bulu Kelabu x20 (Haliabubo: Reruntuhan G. Mithurna: Koridor Atas)
▪ 85-86
- Mantel Carbuncle x4 (Carbuncle: Serambi Dewa Pembangunan)
- Kain Rajut x20 (Malaikat Gelembung: Koridor Heresi)
- Ekor Beruang Berkantong x20 (Oddy: Kuil Para Dewa: Area 4/Serambi Dewa Pembangunan)
▪ 86-87
- Bulu Raja Piton x4 (Raja Piton: Pegunungan Elf: Kuil)
- Bulu Putih Lebat x20 (Bandot: Taman Es &Salju)
- Bulu Abu Kaku x20 (Silveria: Pegunungan Elf)
▪ 87-88
- Ingot Kuno x4 (Golem Preman: Kuil Naga Kegelapan: Tengah)
- Taring Serigala Es x20 (Corloup: Pegunungan Elf)
- Kain Gelap x20 (Soul Reaper: Kuil Naga Kegelapan)
▪ 88-89
- Spina x200.000
▪ 89-90
- Taring Tuscog x4 (Tuscog: Jalan Eryldan: Sekitar Hutan Ein)
- Sutra Ulat x20 (Tikus Lumut: Hutan Ein)
- Bulu Manusia Serigala x20 (Wolfret: Jalan Eryldan)

▪ 90-91
- Serpihan Kayu Kuzto x5 (Kuzto; Distrik Labilans: Alun-Alun)
- Bulu Cerpelai x20 (Satwal; Distrik Fabriska)
- Sabuk Pinggang Misterius x30 (Moculus; Distrik Fractum: Area 1)
▪ 91-92
- Kantong Kristal x5 (Nemopirania; Distrik Racetacula: Area 1)
- Ekor Lembut x20 (Alpoca; Distrik Labiland)
- Papula Kuat x30 (Toksinaria; Distrik Racetacula: Area 1)
▪ 92-93
- Sayap Repthon x5 (Repthon; Zona Riset Delzton: Area Terdalam)
- Kancing Polong x20 (Colon Marquis; Reruntuhan Mansion Lufenas Tua)
- Kain Perca Jas Panjang x30 (Gulingkar; Zona Riset Delzton: Area 1)
▪ 93-94
- Rambut Kaisar Siluman x5 (Venena Metacoenubia; Neo Plastida)
- Kain Merah Sobek x20 (Potum Bandit Gurun; Gurun Pasir Geist: Area 1) 
- Kulit Karatan x30 (Jasman; Reruntuhan Elban Urban)
▪ 94-95
- Spina x300.000
▪ 95-96
- Tulang Pisteus x5 (Pisteus; Pesisir Ducia: Area Terdalam)
- Kain Phantom x20 (Flooray; Dasar Tebing Lunagent)
- Bulu Berang-Berang Laut x30 (Lutris; Pesisir Ducia: Area 3)
▪ 96-97
- Sayap Arachnidemon x5 (Arachnidemon; Lembah Arche: Area Terdalam)
- Belenggu Logam x20 (Besy; Lembah Arche)
- Kulit Ular Aneh x30 (Coofer; Reruntuhan Kota Rokoko)
▪ 97-98
- Jangat Berlendir x5 (Datuk Nezim; Lahan Basah Nezim)
- Kain Enty x20 (Enty; Rimba Penyihir)
- Poros Kokoh x30 (Orang2an Sawah Seram; Rimba Penyihir: Area 2)
▪ 98-99
- Perca Gendam Geni x5 (Hexter; Rimba Penyihir: Area Terdalam)
- Piring Kappa x20 (Kappadon; Lahan Basah Nezim)
- Bulu Gagak x30 (Orang2an Sawah Seram; Rimba Penyihir: Area 2)
▪ 99-100
- Inti Latebra Menggeliat x5 (Trocostida; Nov Diela: Area 1)
- Cairan Lekat x20 (Juvestida; Nov Diela: Area 1)
- Kulit Pelik x30 (Mata Jahat; Padang Morga: Area 1)`, m)
      return;
    }
    if (command == 'mq') {
      await conn.reply(m.chat, `LIST BAHAN Main Quest

Bab 1
• Daun Colon / Colon Leaf 3×
   Bos: Bos Colon
   Lokasi: Tanah Pembangunan

• Sisik Naga / Hard Dragon Skin 2×
   Mobs: Piedra
   Lokasi: Padang Garam Reug Kamp Pengelana

• Daging Domba / Lamb Meat 1×
   Mobs: Wooly
   Lokasi: Padang Garam Reug Kamp Pengelana

• Sayap Peri / Fairy Feather 3×
   Mobs: Roar
   Lokasi: Kuil Runtuh - Area 2

• Paruh Tebal / Thick Beak 3×
   Mobs: Beak
   Lokasi: Kuil Runtuh - Area 1

• Sulur / Vine 3×
   Mobs: Pain Leaf 
   Lokasi: Tanah Genting Kaus

Bab 2
• Koin Ksatria / Swordsman Stone 20×
   Mobs: Boneka Pendekar
   Lokasi: kastil Setan Bulan - Area 1

Bab 3
• Daging Tikus Pasir / Sand Mole Meat 1×
   Mini Bos: Tikus Pasir
   Lokasi: Tanah Tinggi Centerio

• Kulit Kodok Pasir / Sand Frog Skin 5×
   Mobs: Sand Frosch
   Lokasi: Tanah Tinggi Centerio

• Cakar Binatang Buas / Beast Claw 3×
   Mobs: Foxiger
   Lokasi: Tanah Tinggi Centerio

• Permata Jiwa / Spiritual Gemstone 1×
   Mobs: Cassy
   Lokasi: Ratu Kuno - Area 2

• Taring Bergerigi / Jagged Fang 10×
   Mobs: Miwi
   Lokasi: Danau Icule

• Kristal Saham / Saham Crystal 5×
   Mobs: Rotta Nemico
   Lokasi: Gua Bawah Tanah Saham - B1

Bab 8
• Anggur Rokoko / Rokoko Grape 5×
   Mobs: Kijimu
   Lokasi: Dataran Rokoko

Bab 9
• Kayu Labilans / Labilans Wood 10×
   Mobs: Toretta
   Lokasi: Distrik Labilans - Area 1 & 2

Bab 11
• Tanduk Patah / Broken Horn 20×
   Mobs: Rhinoceros
   Lokasi: Rawa Danau Pelarian - Area 3

Bab 12
• Growing Ore  5x
  Mobs: Petraceras
  Lokasi: Kabla Jabali

• Jabali Stone 5x
   Mobs: Gemare
   Lokasi: Kabla Jabali

> buat yg mau farm bahannya`, m)
      return;
    }
    if (command == 'lvlgbuff') {
      await conn.reply(m.chat, `
        LEVELING BUFF

Level 1
╰┈➤ ❝ exp = 1 ❞
Level 2
╰┈➤ ❝ exp = 3 ❞
Level 3
╰┈➤ ❝ exp = 9 ❞
Level 4
╰┈➤ ❝ exp = 21 ❞
Level 5
╰┈➤ ❝ exp = 45 ❞
Level 6
╰┈➤ ❝ exp = 93 ❞
Level 7
╰┈➤ ❝ exp = 189 ❞
Level 8
╰┈➤ ❝ exp = 381 ❞
Level 9
╰┈➤ ❝ exp = 765 ❞
Level 10
╰┈➤ ❝ exp = 1533 ❞`, m)
      return;
    }
    if (command == 'lvlgpet') {
      await conn.reply(m.chat, `Leveling Pet

01-->>40 
Masked warior 
Diff⚔: Normal

40-->>46
Masked warior 
Diff⚔: Hard

46-->>72 
Masked warior 
Diff⚔: Nightmare

72-->>95 
Masked warior 
Diff⚔: Ultimate

95-->>102
Cerberus 
Diff⚔: Nightmare

102-->>160
Cerberus
Diff⚔: Ultimate

160-->> max level
Venena
Diff⚔: Ultimate`, m)
      return;
    }
    let handler = async (m, { command, args, conn }) => {
  if (command === 'farm' && args.length === 0) {
    return conn.reply(m.chat, `📦 *Pilih Jenis Farm Mats:*
• .farm kain
• .farm obat
• .farm logam
• .farm mana
• .farm kayu`, m)
  }

  switch (args[0]) {
    case 'kain':
      await conn.reply(m.chat, `🧵 *Farm Mats Kain*

1. *Underground Nemico* 🔹  
• Unsur: 🌪 Wind  
• HP: -- unknown --  
• XP: -- unknown --  
• Peta: Saluran Bawah Tanah Ultimea: Tenggara  
• Drop:  
  - Bijih Mithril (13pts / 8s)  
  - Tameng Imperial (55pts / 110s)  
  - Kuping Kelelawar  
  - Syal Lembut

2. *Potum Semedi* 🔹  
• Unsur: ☄ Fire  
• HP: -- unknown --  
• XP: -- unknown --  
• Peta: Koridor Heresi  
• Drop:  
  - Celemek Robek  
  - Sayap Nirwana  
  - Vaccine I  
  - Gelang Nirwana

3. *Laduro* 🔹  
• Unsur: 🌱 Earth  
• HP: -- unknown --  
• XP: -- unknown --  
• Peta: Terowongan Cobaan  
• Drop:  
  - Kain Maling  
  - Mineral Cantik  
  - Bola Mata Redup  
  - Tudung Mencurigakan`, m)
      break

    case 'obat':
    case 'logam': // karena sama
      await conn.reply(m.chat, `💊 *Farm Mats ${args[0] === 'logam' ? 'Logam' : 'Obat'}*

1. *Grape Jelly* 🔹  
• Unsur: 🌌 Space  
• HP: 7,000  
• XP: 128  
• Peta: Saluran Bawah Tanah Ultimea: Tenggara  
• Drop:  
  - Ribbon  
  - Cairan Asam Manis  
  - Agar-Agar Merah Ungu  
  - Batu Ultimea

2. *Lettacia* 🔹  
• Unsur: 🌱 Earth  
• HP: -- unknown --  
• XP: 264  
• Peta: Depan Boma Konda  
• Drop:  
  - Daun Kepala  
  - Ekor Spiral  
  - Air Mata Saponin  
  - Jepit Rambut Schmet`, m)
      break

    case 'mana':
      await conn.reply(m.chat, `🌀 *Farm Mats Mana*

📌 *Non Event Summer*

1. *Laduro* 🔹  
• Unsur: 🌱 Earth  
• HP: -- unknown --  
• XP: -- unknown --  
• Peta: Terowongan Cobaan  
• Drop:  
  - Kain Maling  
  - Mineral Cantik  
  - Bola Mata Redup  
  - Tudung Mencurigakan

📌 *Event Summer*

2. *Venomsch* 🔹  
• Unsur: 💧 Water  
• Peta: Saluran Bawah Tanah Ultimea: Selatan  
• Drop:  
  - CSPD+100  
  - Jarum Beracun  
  - Racun Katak  
  - Lidah Kuat  
  - *Summer Shell 🐚*

3. *Malaikat Gelembung (Biru)* 🔹  
• Unsur: 💧 Water  
• Peta: Kuil Para Dewa: Area 2  
• Drop:  
  - Cincin Prisma  
  - Halo Terputus  
  - Kain Berkilau Misterius  
  - Kerikil Dewa  
  - *Summer Shell 🐚*

4. *Breppa* 🔹  
• Unsur: 💧 Water  
• HP: 28,064  
• Peta: Lorong Dingin  
• Drop:  
  - Bijih Mithril  
  - Kaki Mengkristal  
  - Ekor Mengkristal  
  - Tetesan Air Mata  
  - *Summer Shell II 🐚*

5. *Wolfelar* 🔹  
• Unsur: 💧 Water  
• HP: 19,090  
• Peta: Lorong Dingin  
• Drop:  
  - Ranting Dingin  
  - Bulu Serigala Es  
  - Kumis Lembut Serigala Es  
  - *Summer Shell II 🐚*

6. *Glafur* 🔹  
• Unsur: 💧 Water  
• HP: 21,400  
• Peta: Lorong Dingin  
• Drop:  
  - Bulu Beku  
  - Ayam Dingin  
  - Cakar Beku  
  - *Summer Shell II 🐚*`, m)
      break

    case 'kayu':
      await conn.reply(m.chat, `🌲 *Farm Mats Kayu*

1. *Ivy* 🔹  
• Unsur: 🌱 Earth  
• XP: 220  
• Peta: Kuil Naga Kegelapan: Tengah  
• Drop:  
  - Sulur Rambat  
  - Batang Tebal Muda  
  - Kentang  
  - Panah Duri

2. *Pohon Parasit* 🔹  
• Unsur: 🌱 Earth  
• XP: 94  
• Peta: Distrik Altoale  
• Drop:  
  - Akar Pengisap Kehidupan  
  - Benih Gulma  
  - Azimat Pohon  
  - Daun Kering`, m)
      break

    default:
      await conn.reply(m.chat, `❌ *Sub-kategori tidak ditemukan.*
Ketik *.farm* untuk melihat daftar kategori.`, m)
      break
  }
}
  } catch (err) {
    console.error(err)
    throw "🚩 Terjadi kesalahan"
  }
};
handler.command = handler.help = ['buff','lvlg','pembolong', 'lvlgbs', 'tas', 'bahanmq', 'lvlgbuff', 'lvlgpet', 'farm'];
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;
module.exports = handler;
handler.command = /^farm$/i
export default handler