const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, args, command }) => {
  await conn.reply(m.chat, wait, m);

  try {
    const regisData = [
      {
        id: 'busahan_mentari',
        name: 'Basuhan Mentari',
        en: 'sunbath',
        level: [10, 20, 30]
      },
      {
        id: 'Physical Attack Boost',
        name: 'Serangan Fisik',
        en: 'Physical Attack Boost',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'magic attack',
        name: 'serangan sihir',
        en: 'magic attack boost',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'max hp',
        name: 'Max HP',
        en: 'max hp',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'max mp',
        name: 'max mp',
        en: 'max mp',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'physical defense',
        name: 'Pertahanan Fisik',
        en: 'Physical Defense',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'magic defense',
        name: 'Pertahanan Sihir',
        en: 'magic defense',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'accuracy',
        name: 'accuracy',
        en: 'accuracy',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'dodge',
        name: 'Menghindar',
        en: 'dodge',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'attack speed',
        name: 'kecepatan serangan',
        en: 'attack speed',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'magic speed',
        name: 'kecepatan sihir',
        en: 'magic speed',
        level: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210]
      },
      {
        id: 'wayfarer',
        name: 'wayfarer',
        en: 'wayfarer',
        level: [10, 30, 50, 70, 90,]
      },
      {
        id: 'hard hit enhancer',
        name: ' Peningkat Serangan Keras',
        en: 'Hard Hit Enhancer',
        level: [30, 50, 70, 90, 110, 130,]
      },
      {
        id: 'power shot',
        name: 'tembakan Kuat',
        en: 'power shot',
        level: [30, 50, 70, 90, 110, 130,]
      },
      {
        id: 'sonic blade extender',
        name: 'sonic blade extender',
        en: 'sonic blade extender',
        level: [30, 50, 70, 90, 110, 130,]
      },
      {
        id: 'bullseye enhancer',
        name: 'peningkat Bullseye',
        en: 'bullseye enhancer',
        level: [30, 50, 70, 90, 110, 130,]
      },
      {
        id: 'magic arrow enhancer',
        name: 'sihir panah enhancer',
        en: 'magic arrow enhancer',
        level: [30, 50, 70, 90, 110, 130,]
      },
    ];

    if (command === 'regis') {
      const keyword = args.join(' ').toLowerCase();
      if (!keyword) throw '🔍 Contoh penggunaan: *.regis sunbath* atau *.regis basuhan mentari* atau allregis untuk menampilkan semua';

      const result = regisData.find(r =>
        r.en.toLowerCase().includes(keyword) ||
        r.id.toLowerCase().includes(keyword) ||
        (r.name && r.name.toLowerCase().includes(keyword))
      );

      if (!result) throw `🚫 Regis dengan kata '${keyword}' tidak ditemukan.`;

      const teks = `🔎 *Detail Regislet:*\n\n` +
        `🆔 ID: ${result.id}\n` +
        `🇮🇩 Nama: ${result.name}\n` +
        `🇬🇧 En: ${result.en}\n` +
        `📊 Level: ${result.level.join(', ')}`;

      await conn.reply(m.chat, teks, m);

    } else if (command === 'allregis') {
      let teks = `📘 *Daftar Semua Regislet:*\n\n`;
      for (let r of regisData) {
        teks += `🆔 *${r.id}*\n`;
        teks += `🇮🇩 ${r.name}\n`;
        teks += `🇬🇧 ${r.en}\n`;
        teks += `📊 Lv: ${r.level.join(', ')}\n\n`;
      }
      await conn.reply(m.chat, teks.trim(), m);
    }

  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, err.toString(), m);
  }
};

handler.command = ['regis', 'allregis'];
handler.tags = ['toram'];
handler.help = ['regis [kata kunci]', 'allregis'];
handler.limit = false;

module.exports = handler;
