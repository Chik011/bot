const MAX_MEMBER = 4;

let handler = async (m, { conn, command, text, isOwner, isAdmin }) => {
  const chatId = m.chat;

  // Inisialisasi data tim untuk grup
  conn.raidTeams = conn.raidTeams || {};
  conn.raidTeams[chatId] = conn.raidTeams[chatId] || {
    tim1: [],
    tim2: [],
    tim3: [],
    tim4: []
  };

  const teams = conn.raidTeams[chatId];

  switch (command) {

    case 'joinraid':
      if (!text || !text.includes(' ')) {
        return conn.reply(m.chat,
          '❗ Format salah.\nGunakan: *.joinraid <IGN> <tim>*\nContoh: *.joinraid chiko tim2*', m);
      }

      let [ign, team] = text.trim().split(/\s+/);
      team = team.toLowerCase();
      ign = ign.trim();

      if (!teams[team]) {
        return conn.reply(m.chat,
          '❌ Tim tidak ditemukan. Gunakan: tim1, tim2, tim3, tim4', m);
      }

      // Hapus IGN dari semua tim dulu
      for (let key in teams) {
        teams[key] = teams[key].filter(p => p.toLowerCase() !== ign.toLowerCase());
      }

      if (teams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat,
          `❌ *${team}* sudah penuh (maks ${MAX_MEMBER}).`, m);
      }

      teams[team].push(ign);
      return conn.reply(m.chat, `🚀 *${ign}* bergabung ke *${team}*`, m);

    case 'listraid':
      let out = '📋 *DAFTAR TIM RAID TORAM*\n\n';
      for (let [key, members] of Object.entries(teams)) {
        out += `📌 *${key.toUpperCase()}* [${members.length}/${MAX_MEMBER}]\n`;
        if (!members.length) {
          out += '_Belum ada anggota_\n\n';
        } else {
          members.forEach((name, i) => {
            out += `${i + 1}. ${name}\n`;
          });
          out += '\n';
        }
      }
      return conn.reply(m.chat, out.trim(), m);

    case 'kickraid':
      if (!(isOwner || m.isGroup && isAdmin)) {
        return conn.reply(m.chat,
          '🚫 Hanya *owner* atau *admin grup* yang bisa menghapus anggota.', m);
      }

      if (!text) {
        return conn.reply(m.chat,
          '❗ Format salah.\nGunakan: *.kickraid <IGN>*', m);
      }

      let ignKick = text.trim().toLowerCase();
      for (let [key, members] of Object.entries(teams)) {
        let idx = members.findIndex(name => name.toLowerCase() === ignKick);
        if (idx !== -1) {
          let removed = members.splice(idx, 1)[0];
          return conn.reply(m.chat,
            `🗑️ *${removed}* dihapus dari *${key}*`, m);
        }
      }
      return conn.reply(m.chat,
        `⚠️ *${text.trim()}* tidak ditemukan di tim manapun.`, m);

    case 'resetraid':
      if (!(isOwner || m.isGroup && isAdmin)) {
        return conn.reply(m.chat,
          '🚫 Hanya *owner* atau *admin grup* yang bisa mereset tim.', m);
      }

      conn.raidTeams[chatId] = {
        tim1: [],
        tim2: [],
        tim3: [],
        tim4: []
      };
      return conn.reply(m.chat, '♻️ Semua tim raid telah direset!', m);
  }
};

handler.command = ['joinraid', 'listraid', 'kickraid', 'resetraid'];
handler.tags = ['toram'];
handler.help = [
  'joinraid <IGN> <tim1–4>',
  'listraid',
  'kickraid <IGN>',
  'resetraid'
];
handler.limit = false;
handler.premium = false;

module.exports = handler;
