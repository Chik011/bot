const MAX_MEMBER = 4;
let raidTeams = {
  tim1: [],
  tim2: [],
  tim3: [],
  tim4: []
};

let handler = async (m, { conn, command, text, sender, isOwner }) => {
  switch (command) {

    // ✅ JOIN RAID
    case 'joinraid':
      if (!text || !text.includes(' ')) {
        return conn.reply(m.chat, '❗ Format salah.\nGunakan: *.joinraid ign tim1*\nContoh: *.joinraid laurens tim1*', m);
      }

      let [ign, team] = text.trim().split(/\s+/);
      team = team.toLowerCase();

      if (!raidTeams[team]) {
        return conn.reply(m.chat, `❌ Tim tidak ditemukan.\nGunakan: tim1, tim2, tim3, tim4`, m);
      }

      // Cek apakah sudah tergabung
      for (let key in raidTeams) {
        let index = raidTeams[key].findIndex(member => member.id === sender);
        if (index !== -1) {
          if (key === team) {
            return conn.reply(m.chat, `✅ *${raidTeams[key][index].name}* sudah berada di *${team}*`, m);
          } else {
            if (raidTeams[team].length >= MAX_MEMBER) {
              return conn.reply(m.chat, `❌ *${team}* sudah penuh (maksimal ${MAX_MEMBER} orang).`, m);
            }
            let moved = raidTeams[key].splice(index, 1)[0];
            raidTeams[team].push({ id: sender, name: ign });
            return conn.reply(m.chat, `🔄 *${moved.name}* pindah ke *${team}*`, m);
          }
        }
      }

      // Join baru
      if (raidTeams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat, `❌ *${team}* sudah penuh (maksimal ${MAX_MEMBER} orang).`, m);
      }

      raidTeams[team].push({ id: sender, name: ign });
      return conn.reply(m.chat, `🚀 *${ign}* bergabung ke *${team}*`, m);

    // 📋 LIST RAID
    case 'listraid':
      let output = `📋 *DAFTAR TIM RAID TORAM*\n\n`;

      for (let [key, members] of Object.entries(raidTeams)) {
        output += `📌 *${key.toUpperCase()}* [${members.length}/${MAX_MEMBER}]\n`;
        if (members.length === 0) {
          output += `_Belum ada anggota_\n\n`;
        } else {
          members.forEach((member, i) => {
            output += `${i + 1}. ${member.name}\n`;
          });
          output += '\n';
        }
      }

      return conn.reply(m.chat, output.trim(), m);

    // ♻️ RESET RAID
    case 'resetraid':
      if (!isOwner) return conn.reply(m.chat, '🚫 Hanya owner yang bisa mereset tim raid.', m);

      raidTeams = {
        tim1: [],
        tim2: [],
        tim3: [],
        tim4: []
      };

      return conn.reply(m.chat, '♻️ Semua tim raid berhasil direset!', m);

    // ❌ KICK RAID (by IGN)
    case 'kickraid':
      if (!isOwner) return conn.reply(m.chat, '🚫 Hanya owner yang bisa menghapus player dari tim.', m);
      if (!text) return conn.reply(m.chat, '❗ Format salah.\nGunakan: *.kickraid ign*\nContoh: *.kickraid laurens*', m);

      let ignToKick = text.trim().toLowerCase();
      let found = false;

      for (let [team, members] of Object.entries(raidTeams)) {
        let index = members.findIndex(member => member.name.toLowerCase() === ignToKick);
        if (index !== -1) {
          let removed = raidTeams[team].splice(index, 1)[0];
          found = true;
          return conn.reply(m.chat, `🗑️ *${removed.name}* telah dihapus dari *${team}*`, m);
        }
      }

      if (!found) {
        return conn.reply(m.chat, `⚠️ Tidak ditemukan player dengan nama *${text.trim()}* di tim manapun.`, m);
      }
      break;
  }
};

handler.command = ['joinraid', 'listraid', 'resetraid', 'kickraid'];
handler.tags = ['toram'];
handler.help = [
  'joinraid ign tim1',
  'listraid',
  'resetraid',
  'kickraid ign'
];
handler.limit = false;
handler.premium = false;

module.exports = handler;
