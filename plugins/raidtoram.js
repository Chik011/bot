const MAX_MEMBER = 4;

let handler = async (m, { conn, command, text, sender, isOwner }) => {
  const chatId = m.chat;

  // Inisialisasi tim jika belum ada
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

      let [ignInput, team] = text.trim().split(/\s+/);
      team = team.toLowerCase();

      if (!teams[team]) {
        return conn.reply(m.chat,
          '❌ Tim tidak ditemukan. Gunakan: tim1, tim2, tim3, tim4', m);
      }

      // Cek apakah sender sudah join
      for (let key in teams) {
        let idx = teams[key].findIndex(p => p.id === sender);
        if (idx !== -1) {
          if (key === team) {
            return conn.reply(m.chat,
              `✅ *${teams[key][idx].name}* sudah berada di *${team}*`, m);
          }

          if (teams[team].length >= MAX_MEMBER) {
            return conn.reply(m.chat,
              `❌ *${team}* sudah penuh (maks ${MAX_MEMBER}).`, m);
          }

          // Pindah tanpa ganti IGN
          let moved = teams[key].splice(idx, 1)[0];
          teams[team].push(moved);
          return conn.reply(m.chat,
            `🔄 *${moved.name}* pindah ke *${team}*`, m);
        }
      }

      // Join baru
      if (teams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat,
          `❌ *${team}* sudah penuh (maks ${MAX_MEMBER}).`, m);
      }

      teams[team].push({ id: sender, name: ignInput });
      return conn.reply(m.chat,
        `🚀 *${ignInput}* bergabung ke *${team}*`, m);

    case 'listraid':
      let out = '📋 *DAFTAR TIM RAID TORAM*\n\n';
      for (let [key, members] of Object.entries(teams)) {
        out += `📌 *${key.toUpperCase()}* [${members.length}/${MAX_MEMBER}]\n`;
        if (!members.length) {
          out += '_Belum ada anggota_\n\n';
        } else {
          members.forEach((p, i) => {
            out += `${i + 1}. ${p.name}\n`;
          });
          out += '\n';
        }
      }
      return conn.reply(m.chat, out.trim(), m);

    case 'resetraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa mereset tim.', m);
      conn.raidTeams[chatId] = {
        tim1: [], tim2: [], tim3: [], tim4: []
      };
      return conn.reply(m.chat,
        '♻️ Semua tim raid telah direset!', m);

    case 'kickraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa menghapus player.', m);
      if (!text) return conn.reply(m.chat,
        '❗ Format salah.\nGunakan: *.kickraid <IGN>*', m);

      let ignKick = text.trim().toLowerCase();
      for (let [key, members] of Object.entries(teams)) {
        let idx = members.findIndex(p => p.name.toLowerCase() === ignKick);
        if (idx !== -1) {
          let removed = members.splice(idx, 1)[0];
          return conn.reply(m.chat,
            `🗑️ *${removed.name}* dihapus dari *${key}*`, m);
        }
      }
      return conn.reply(m.chat,
        `⚠️ Player *${text.trim()}* tidak ditemukan.`, m);
  }
};

handler.command = ['joinraid', 'listraid', 'resetraid', 'kickraid'];
handler.tags = ['toram'];
handler.help = [
  'joinraid <IGN> <tim1–4>',
  'listraid',
  'resetraid',
  'kickraid <IGN>'
];
handler.limit = false;
handler.premium = false;

module.exports = handler;
