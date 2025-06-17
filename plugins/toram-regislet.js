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
        id: '-',
        name: '-',
        en: '-',
        level: [5, 15, 25]
      },
      {
        id: '-',
        name: '-',
        en: '-',
        level: [20, 30, 40]
      },
      {
        id: '-',
        name: '-',
        en: '-',
        level: [10, 50]
      }
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
