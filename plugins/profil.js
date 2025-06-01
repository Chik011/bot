const fs = require("fs");
const wait = 'Tunggu sebentar...';

const profileFile = './profil.json';
let profiles = {};
if (fs.existsSync(profileFile)) profiles = JSON.parse(fs.readFileSync(profileFile));
function saveProfiles() {
  fs.writeFileSync(profileFile, JSON.stringify(profiles, null, 2));
}

function extractMentionedOrRepliedId(m) {
  const context = m.quoted?.contextInfo || m.message?.extendedTextMessage?.contextInfo;
  if (context?.mentionedJid?.length > 0) return context.mentionedJid[0];
  if (context?.participant) return context.participant;
  return null;
}

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m);
  try {
    // .tambahprofil nama=..., umur=..., kota=...
    if (command === 'addprofil') {
      const userId = m.sender;
      if (profiles[userId]) {
        return conn.reply(m.chat, "❌ Profil sudah ada. Gunakan .editprofil untuk mengubah.", m);
      }
      const argStr = args.join(" ");
      const pairs = argStr.split(",").map(s => s.trim());
      let newProfile = { nama: "", umur: "", kota: "" };
      pairs.forEach(pair => {
        const [key, value] = pair.split("=").map(s => s.trim());
        if (key && value && ["nama", "umur", "kota"].includes(key)) {
          newProfile[key] = value;
        }
      });
      profiles[userId] = newProfile;
      saveProfiles();
      return conn.reply(m.chat, "✅ Profil berhasil ditambahkan.", m);
    }

    // .editprofil nama=..., umur=..., kota=...
    if (command === 'editprofil') {
      const userId = m.sender;
      if (!profiles[userId]) {
        return conn.reply(m.chat, "❌ Profil belum ada. Gunakan .tambahprofil untuk membuat profil.", m);
      }
      const argStr = args.join(" ");
      const pairs = argStr.split(",").map(s => s.trim());
      pairs.forEach(pair => {
        const [key, value] = pair.split("=").map(s => s.trim());
        if (key && value && ["nama", "umur", "kota"].includes(key)) {
          profiles[userId][key] = value;
        }
      });
      saveProfiles();
      return conn.reply(m.chat, "✅ Profil berhasil diupdate.", m);
    }

    // .profil (sendiri, reply, atau mention)
    if (command === 'profil') {
      let targetId = extractMentionedOrRepliedId(m) || m.mentionedJid?.[0] || m.sender;
      let p = profiles[targetId];
      if (!p) {
        return conn.reply(m.chat, "❌ Profil belum dibuat oleh pengguna ini.", m);
      }
      const contact = targetId.split("@")[0];
      const title = targetId === m.sender ? "👤 Profil Anda" : `📄 Profil @${contact}`;
      return conn.reply(m.chat, `${title}:\n• Nama: ${p.nama}\n• Umur: ${p.umur}\n• Kota: ${p.kota}`, m, { mentions: [targetId] });
    }
  } catch (err) {
    console.error(err);
    throw "🚩 Terjadi kesalahan";
  }
};

handler.command = handler.help = ['addprofil', 'editprofil', 'profil'];
handler.tags = ['profil'];
handler.limit = false;
handler.premium = false;
module.exports = handler;