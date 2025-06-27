const MAX_MEMBER = 4;
let raidTeams = {
  tim1: [],
  tim2: [],
  tim3: [],
  tim4: []
};

let handler = async (m, { conn, command, text, sender }) => {
  if (!text || !text.includes(' ')) {
    return conn.reply(m.chat, '❗ Format salah.\nGunakan: *.joinraid ign tim1*\nContoh: *.joinraid laurens tim1*', m);
  }

  let [ign, team] = text.trim().split(/\s+/);
  team = team.toLowerCase();

  if (!raidTeams[team]) {
    return conn.reply(m.chat, `❌ Tim tidak ditemukan.\nGunakan: tim1, tim2, tim3, tim4`, m);
  }

  // Cek apakah user sudah terdaftar di salah satu tim
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
};

handler.command = ['joinraid'];
handler.tags = ['toram'];
handler.help = ['joinraid ign tim1'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
