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
          '❗ Format salah.\nGunakan: *.joinraid ign tim1*\nContoh: *.joinraid chiko tim2*', m);
      }

      let [ign, team] = text.trim().split(/\s+/);
      team = team.toLowerCase();

      if (!raidTeams[team]) {
        return conn.reply(m.chat,
          '❌ Tim tidak ditemukan. Gunakan: tim1, tim2, tim3, tim4', m);
      }

      // Cek apakah sudah tergabung
      for (let key in raidTeams) {
        let idx = raidTeams[key].findIndex(p => p.id === sender);
        if (idx !== -1) {
          if (key === team) {
            return conn.reply(m.chat,
              `✅ *${raidTeams[key][idx].name}* sudah berada di *${team}*`, m);
          }
          if (raidTeams[team].length >= MAX_MEMBER) {
            return conn.reply(m.chat,
              `❌ *${team}* sudah penuh (maks ${MAX_MEMBER}).`, m);
          }

          // FIX: Pindah tanpa ganti IGN
          let moved = raidTeams[key].splice(idx, 1)[0];
          raidTeams[team].push(moved);
          return conn.reply(m.chat,
            `🔄 *${moved.name}* pindah ke *${team}*`, m);
        }
      }

      // Belum pernah join
      if (raidTeams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat,
          `❌ *${team}* sudah penuh (maks ${MAX_MEMBER}).`, m);
      }

      raidTeams[team].push({ id: sender, name: ign });
      return conn.reply(m.chat,
        `🚀 *${ign}* bergabung ke *${team}*`, m);

    // 📋 LIST RAID
    case 'listraid':
      let out = '📋 *DAFTAR TIM RAID TORAM*\n\n';
      for (let [key, members] of Object.entries(raidTeams)) {
        out += `📌 *${key.toUpperCase()}* [${members.length}/${MAX_MEMBER}]\n`;
        if (members.length === 0) {
          out += '_Belum ada anggota_\n\n';
        } else {
          members.forEach((p, i) => {
            out += `${i + 1}. ${p.name}\n`;
          });
          out += '\n';
        }
      }
      return conn.reply(m.chat, out.trim(), m);

    // ♻️ RESET RAID (Owner Only)
    case 'resetraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa mereset tim raid.', m);
      raidTeams = { tim1: [], tim2: [], tim3: [], tim4: [] };
      return conn.reply(m.chat,
        '♻️ Semua tim raid telah direset!', m);

    // 🗑️ KICK RAID (by IGN, Owner Only)
    case 'kickraid':
      if (!isOwner) return conn.reply(m.chat,
        '🚫 Hanya owner yang bisa menghapus player.', m);
      if (!text) return conn.reply(m.chat,
        '❗ Format salah.\nGunakan: *.kickraid ign*\nContoh: *.kickraid chiko*', m);

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
