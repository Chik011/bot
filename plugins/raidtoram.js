const MAX_MEMBER = 4;
let raidTeams = {
  tim1: [],
  tim2: [],
  tim3: [],
  tim4: []
};

let handler = async (m, { conn, command, text, sender, isOwner }) => {
  switch (command) {

    // 🚀 JOIN RAID
    case 'joinraid':
      if (!text || !text.includes(' ')) {
        return conn.reply(m.chat,
          '❗ Format salah.\nGunakan: *.joinraid <IGN> <tim>*\nContoh: *.joinraid Ascarion tim2*', m);
      }

      let [ignInput, team] = text.trim().split(/\s+/);
      team = team.toLowerCase();

      if (!raidTeams[team]) {
        return conn.reply(m.chat,
          '❌ Tim tidak ditemukan.\nGunakan: tim1, tim2, tim3, tim4', m);
      }

      // Cek apakah sender sudah terdaftar
      for (let key in raidTeams) {
        let idx = raidTeams[key].findIndex(p => p.id === sender);
        if (idx !== -1) {
          if (key === team) {
            return conn.reply(m.chat,
              `✅ *${raidTeams[key][idx].name}* sudah berada di *${team}*`, m);
          }

          if (raidTeams[team].length >= MAX_MEMBER) {
            return conn.reply(m.chat,
              `❌ *${team}* sudah penuh (maks ${MAX_MEMBER} anggota).`, m);
          }

          // FIX: pindah tim tanpa ubah IGN
          const moved = raidTeams[key].splice(idx, 1)[0];
          raidTeams[team].push(moved);
          return conn.reply(m.chat,
            `🔄 *${moved.name}* pindah ke *${team}*`, m);
        }
      }

      // Kalau belum pernah join
      if (raidTeams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat,
          `❌ *${team}* sudah penuh (maks ${MAX_MEMBER} anggota).`, m);
      }

      // Tambah anggota baru
      raidTeams[team].push({ id: sender, name: ignInput });
      return conn.reply(m.chat,
        `🚀 *${ignInput}* bergabung ke *${team}*`, m);


    // 📋 LIST RAID
    case 'listraid':
      let out = '📋 *DAFTAR TIM RAID TORAM*\n\n';
      for (let [key, members] of Object.entries(raidTeams)) {
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

    // ♻️ RESET RAID
    case 'resetraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa mereset tim raid.', m);
      raidTeams = { tim1: [], tim2: [], tim3: [], tim4: [] };
      return conn.reply(m.chat,
        '♻️ Semua tim raid telah direset!', m);

    // 🗑️ KICK BY IGN
    case 'kickraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa menghapus player.', m);
      if (!text) return conn.reply(m.chat,
        '❗ Format salah.\nGunakan: *.kickraid <IGN>*', m);

      let ignKick = text.trim().toLowerCase();
      for (let [key, members] of Object.entries(raidTeams)) {
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
