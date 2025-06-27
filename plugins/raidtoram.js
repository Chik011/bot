const wait = 'Tunggu sebentar...';
let qsData = [];
let raidTeams = {
  tim1: [],
  tim2: [],
  tim3: [],
  tim4: []
};
const MAX_MEMBER = 4;

let handler = async (m, { conn, command, text, isOwner, sender }) => {
  let user = conn.getName(sender);

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
      raidTeams = { tim1: [], tim2: [], tim3: [], tim4: [] };
      return conn.reply(m.chat, '♻️ Semua data quest dan tim berhasil direset!', m);

    case 'join':
      if (!text) return conn.reply(m.chat, '❗ Silakan ketik nama tim.\nContoh: *.join tim1*', m);
      let team = text.trim().toLowerCase();

      if (!raidTeams[team]) {
        return conn.reply(m.chat, `🚫 Tim tidak ditemukan. Gunakan: tim1, tim2, tim3, tim4`, m);
      }

      // Sudah tergabung di tim mana?
      for (let key in raidTeams) {
        let idx = raidTeams[key].indexOf(sender);
        if (idx !== -1) {
          if (key === team) {
            return conn.reply(m.chat, `✅ Kamu sudah tergabung di *${team}*.`, m);
          } else {
            if (raidTeams[team].length >= MAX_MEMBER) {
              return conn.reply(m.chat, `❌ *${team}* sudah penuh (maksimal ${MAX_MEMBER} orang).`, m);
            }
            // Pindah tim
            raidTeams[key].splice(idx, 1);
            raidTeams[team].push(sender);
            return conn.reply(m.chat, `🔄 Kamu pindah ke *${team}*.`, m);
          }
        }
      }

      // Join baru
      if (raidTeams[team].length >= MAX_MEMBER) {
        return conn.reply(m.chat, `❌ *${team}* sudah penuh (maksimal ${MAX_MEMBER} orang).`, m);
      }

      raidTeams[team].push(sender);
      return conn.reply(m.chat, `🚀 Kamu berhasil join *${team}*!`, m);

    case 'teams':
      let output = `👥 *Daftar Tim Toram Raid*\n\n`;
      for (let [key, members] of Object.entries(raidTeams)) {
        output += `📌 *${key.toUpperCase()}* [${members.length}/${MAX_MEMBER} orang]\n`;
        if (members.length === 0) {
          output += `_Belum ada member_\n\n`;
        } else {
          for (let i = 0; i < members.length; i++) {
            let name = await conn.getName(members[i]);
            output += `- ${name}\n`;
          }
          output += '\n';
        }
      }
      return conn.reply(m.chat, output.trim(), m);

    default:
      return;
  }
};

handler.command = ['qsadd', 'qs', 'qsreset', 'join', 'teams'];
handler.tags = ['toram'];
handler.help = ['qsadd nama|reward', 'qs', 'qsreset', 'join tim1', 'teams'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
