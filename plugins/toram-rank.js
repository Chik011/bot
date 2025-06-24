const wait = 'Tunggu sebentar...';
let qsData = [];

let handler = async (m, { conn, command, text, isOwner }) => {
  switch (command) {
    case 'qsadd':
      if (!isOwner) return conn.reply(m.chat, '🚫 Hanya owner yang bisa menambahkan data QS.', m);
      if (!text || !text.includes('|')) {
        return conn.reply(m.chat, '❗ Format salah.\nGunakan: *.qsadd nama|reward*', m);
      }

      try {
        const [name, reward] = text.split('|').map(s => s.trim());

        qsData.push({ name, reward });
        return conn.reply(m.chat, `✅ Berhasil menambahkan reward untuk *${name}*`, m);
      } catch (e) {
        console.error(e);
        return conn.reply(m.chat, '❌ Gagal menambahkan data. Cek formatnya ya.', m);
      }

    case 'qs':
      if (!qsData.length) {
        return conn.reply(m.chat, '📭 Belum ada data quest serikat.\nGunakan *.qsadd* untuk menambahkan.', m);
      }

      let list = `🎁 *Reward Quest Serikat*\n\n`;

      qsData.forEach((item, i) => {
        list += `*${i + 1}. ${item.name}*\n🎉 Reward: ${item.reward}\n\n`;
      });

      return conn.reply(m.chat, list.trim(), m);

    case 'qsreset':
      if (!isOwner) return conn.reply(m.chat, '🚫 Hanya owner yang bisa mereset data.', m);
      qsData = [];
      return conn.reply(m.chat, '♻️ Semua data quest serikat berhasil direset!', m);

    default:
      return;
  }
};

handler.command = ['qsadd', 'qs', 'qsreset'];
handler.tags = ['toram'];
handler.help = ['qsadd nama|reward', 'qs', 'qsreset'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
