const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {

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