const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {
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

    if (command == 'slottas') {
      await conn.reply(m.chat, `List Bahan Untuk Upgrade Slot Tas Koleksi 
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

    if (command == 'bahanmq') {
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
      await conn.reply(m.chat, `LEVELING BUFF

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

     if (command === 'farm') {
      if (!args[0]) {
        // Tampilkan daftar submenu farm
        await conn.reply(m.chat, `
Menu Farm:
1. kayu
2. obat
3. logam
4. mana
5. fauna
6. kain
Ketik .farm <nama_submenu> contoh .farm kayu
        `.trim(), m)
      } else {
        // Submenu farm yang dipilih user
        switch(args[0].toLowerCase()) {
          case 'kayu':
  await conn.reply(m.chat, `
*Farm Mats Kayu*

*Ivy* 🔹  
Unsur: 🌱  
HP: -- unknown --  
XP: 220  
Peta: Kuil Naga Kegelapan: Tengah  
Drop:  
- Sulur Rambat  
- Batang Tebal Muda  
- Kentang  
- Panah Duri  

*Pohon Parasit* 🔹  
Unsur: 🌱  
HP: -- unknown --  
XP: 94  
Peta: Distrik Altoale  
Drop:  
- Akar Pengisap Kehidupan  
- Benih Gulma  
- Azimat Pohon  
- Daun Kering
  `.trim(), m);
  break;

          case 'obat':
  await conn.reply(m.chat, `
*Farm Mats Obat*

*Grape Jelly* 🔹  
Unsur: 🌌  
HP: 7,000  
XP: 128  
Lokasi: Saluran Bawah Tanah Ultimea: Tenggara  
Drop:  
- Ribbon  
- Cairan Asam Manis  
- Agar-Agar Merah Ungu  
- Batu Ultimea  

*Lettacia* 🔹  
Unsur: 🌱  
XP: 264  
Lokasi: Depan Boma Konda  
Drop:  
- Daun Kepala  
- Ekor Spiral  
- Air Mata Saponin  
- Jepit Rambut Schmet
  `.trim(), m);
  break;

          case 'logam':
  await conn.reply(m.chat, `
*Farm Mats Logam*

*Celeng Kecil Mesin* 🔹  
Unsur: 🌱  
HP: 3,500  
XP: 79  
Peta: Lembah Dalam Sykea  
Drop:  
- Azimat Taring Hewan (2s / 1s)  
- Bulu Hewan Kasar  
- Tanduk Baja  
- Botol Tenaga  

*Malaikat Gelembung (Biru)* 🔹  
Unsur: 💧  
HP: -- unknown --  
XP: -- unknown --  
Peta: Kuil Para Dewa: Area 2  
Drop:  
- Cincin Prisma  
- Halo Terputus  
- Kain Berkilau Misterius  
- Kerikil Dewa  

*Laduro* 🔹  
Unsur: 🌱  
HP: -- unknown --  
XP: -- unknown --  
Peta: Terowongan Cobaan  
Drop:  
- Kain Maling  
- Mineral Cantik  
- Bola Mata Redup  
- Tudung Mencurigakan
  `.trim(), m);
  break;

          case 'mana':
  await conn.reply(m.chat, `
*Farm Mats Mana*

*Ghost Potum* 🔹  
Unsur: ☄  
HP: -- unknown --  
XP: -- unknown --  
Peta: Koridor Heresi  
Drop:  
- Tali Roh  
- Pot Bunga  
- Energi Misterius  
- Fragment Magic  

*Ghost Lantern* 🔹  
Unsur: ☄  
HP: -- unknown --  
XP: -- unknown --  
Peta: Koridor Heresi / Kuil Para Dewa  
Drop:  
- Inti Cahaya  
- Sumbu Terkutuk  
- Lentera Tua  
- Debu Roh  

*Flare Volg* 🔹 (Mini Boss)  
Unsur: 🔥  
HP: 600,000+  
XP: 1,200  
Peta: Lantai Dasar Gunung Lahar  
Drop:  
- Inti Api  
- Debu Mana  
- Paku Hangus  
- Sisik Volg
  `.trim(), m);
  break;

          case 'fauna':
  await conn.reply(m.chat, `
*Farm Mats Fauna*

*Rafflesia* 🔹  
Unsur: 🌱  
HP: -- unknown --  
XP: -- unknown --  
Peta: Lantai 3 Istana Lahar  
Drop:  
- Cairan Bunga Busuk  
- Serbuk Beracun  
- Akar Gatal  
- Kelopak Mengerikan  

*Goblin* 🔹  
Unsur: 🌪  
HP: -- unknown --  
XP: -- unknown --  
Peta: Hutan Rugio  
Drop:  
- Kain Robek  
- Taring Goblin  
- Botol Kecil  
- Sarung Tangan Lusuh  

*Tigris* 🔹  
Unsur: 🌪  
HP: -- unknown --  
XP: -- unknown --  
Peta: Lantai Atas Gunung Lahar  
Drop:  
- Cakar Lembut  
- Bulu Belang  
- Daging Segar  
- Mata Binatang
  `.trim(), m);
  break;

          case 'kain':
            await conn.reply(m.chat, `
*Farm Mats Kain*

*Underground Nemico* 🔹  
Unsur: 🌪  
Lokasi: Saluran Bawah Tanah Ultimea: Tenggara  
Drop:  
- Bijih Mithril (13pts / 8s)  
- Tameng Imperial (55pts / 110s)  
- Kuping Kelelawar  
- Syal Lembut  

*Potum Semedi* 🔹  
Unsur: ☄  
Lokasi: Koridor Heresi  
Drop:  
- Celemek Robek  
- Sayap Nirwana  
- Vaccine I  
- Gelang Nirwana  

*Laduro* 🔹  
Unsur: 🌱  
Lokasi: Terowongan Cobaan  
Drop:  
- Kain Maling  
- Mineral Cantik  
- Bola Mata Redup  
- Tudung Mencurigakan
            `.trim(), m);
            break;
          default:
            await conn.reply(m.chat, `Submenu farm '${args[0]}' tidak ditemukan.`, m)
        }
      }
      return;
    }

  } catch (err) {
    console.error(err)
    throw "🚩 Terjadi kesalahan"
  }
};
handler.command = handler.help = ['buff','pembolong', 'lvlgbs', 'slottas', 'bahanmq', 'lvlgbuff', 'lvlgpet', 'farm',];
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;
module.exports = handler;