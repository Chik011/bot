const panahData = {
  api: `*API* 🔥
• Flame Arrow (Sunion [Cermin Kegelapan])
  Stat: Base ATK: 43 (20%), MaxMP 100
• Panah Cinta (Pandai Besi - Event Valentine)
  Stat: Base ATK: 71 (20%), Critical Rate +5
• Panah Kaisar Iblis (Venena Metacoenubia [Neo Plastida])
  Stat: Base ATK: 120 (10%), Akurasi +15%, Aggro -15%`,

  air: `*AIR* 💧
• Panah Tangis Langit (Floragonet [Distrik Fractum : Area 1])
  Stat: Base ATK: 84 (20%), Akurasi Absolut +1%, Berhenti Jatuh
• Panah Samudra (Pandai Besi - Event Summer)
  Stat: Base ATK: 110 (10%), MaxMP +200, Kekebalan Angin -3%, Ampr +1
• Panah Cermin Cinta (Quest Arwah Peneliti - Lv78 [Halaman Awal Mula])
  Stat: Base ATK: 37 (20%), Kecepatan Merapal +100`,

  angin: `*ANGIN* 🌪
• Panah Apel (Coryn [Distrik Dikkit])
  Stat: Base ATK: 92 (15%), Aggro -10%
• Panah Ratu Lebah (Pandai Besi - Event Valentine)
  Stat: Base ATK: 150 (20%), Berhenti Jatuh, Kekebalan Angin +5%, Tambahan Fisik +10%`,

  bumi: `*BUMI* 🪨
• Panah Cacao (Pandai Besi - Event Valentine)
  Stat: Base ATK: 50 (20%), Critical Rate +3 (Bow Only), Aggro -6% (Bow Only)
• Panah Hutan Penjaga (Arbogazella [Hutan Lindung])
  Stat: Base ATK: 163 (20%), Akurasi +50%, Luka ke Api -10%, Luka ke Cahaya -20%, Aggro -25%
• Pointed Ore Arrow (Tikus Gua [Reruntuhan Singolare : Lantai 1])
  Stat: Base ATK: 43 (20%), Physical Resistance +3%, DEF +50, Accuracy -1%`,

  gelap: `*GELAP* ♠️
• Panah Duri (Ivy [Kuil Naga Kegelapan : Bawah])
  Stat: Base ATK: 79 (20%), Kekebalan Sihir +5%, Reduksi DMG (Lantai) +5%
• Panah Sakura Senja (Amalgam [Kastil Sakura Senja])
  Stat: Base ATK: 100 (20%), Kebal Cahaya +5%
• Panah Gelap (Naga Senja [Benteng Solfini : Atap])
  Stat: Base ATK: 40 (20%), MaxHP -10%, Resistensi Status Buruk +5%`,

  cahaya: `*CAHAYA* ✨
• Panah Seni Permen (Pandai Besi - Event White Day)
  Stat: Base ATK: 56 (20%), MDEF +10% (Bow Only), Kekebalan Sihir +10% (Bow Only)
• Panah Pohon Suci (Santaby [Pavilion Tomte])
  Stat: Base ATK: 100 (20%), Kebal Gelap +10%, Ampr +1`,

  normal: `*NORMAL* 🟢
• Drill Bolt (Penggali Tambang [Saluran Bawah Tanah Ultimea : Selatan])
  Stat: Base ATK: 120 (10%), Penetrasi Fisik +10%, Critical Damage +2, Aggro +20%
• Panah Chimera (Mozto Machina [Pabrik Demi Machina Besar : Bagian Terdalam])
  Stat: Base ATK: 67 (20%), MaxMP +300, Critical Rate +6, MaxHP -9%
• Panah Putri Sakura (Pandai Besi - Event Hanami)
  Stat: Base ATK: 88 (20%), MaxHP +1000
• Panah Sakura Mutu (Pandai Besi - Event Hanami)
  Stat: Base ATK: 160 (20%), MaxMP +200, Critical Rate +10, Daya Jarak Jauh +2% (Bow Only)
• Driver Bolt (Joulu House : Depot)
  Stat: Base ATK: 200 (20%), Accuracy -25%, Ampr +3, Kebal Normal +15%`
};

let handler = async (m, { conn, text }) => {
  let key = text.trim().toLowerCase();

  if (!key) {
    // Jika tidak ada argumen, tampilkan semua kategori
    let full = '*📌 DAFTAR PANAH TORAM ONLINE*\n\n';
    for (let k in panahData) {
      full += `${panahData[k]}\n\n`;
    }
    return conn.reply(m.chat, full.trim(), m);
  }

  if (panahData[key]) {
    return conn.reply(m.chat, panahData[key], m);
  } else {
    return conn.reply(m.chat, `❌ Elemen *${text}* tidak ditemukan.\nGunakan: api, air, angin, bumi, gelap, cahaya, normal`, m);
  }
};

handler.command = ['arrow'];
handler.tags = ['toram'];
handler.help = ['arrow [elemen]'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
