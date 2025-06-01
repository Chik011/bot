const fs = require("fs");
const path = require("path");
const wait = 'Tunggu sebentar...';

const profileFile = './profil.json';

let profiles = {};
if (fs.existsSync(profileFile)) profiles = JSON.parse(fs.readFileSync(profileFile));
function saveProfiles() {
  fs.writeFileSync(profileFile, JSON.stringify(profiles, null, 2));
}

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m);
  try {
    // .addprofil <teks bebas>
    if (command === 'addprofil') {
      const userId = m.sender;
      if (profiles[userId]) {
        return conn.reply(m.chat, "❌ Profil sudah ada. Gunakan .editprofil untuk mengubah.", m);
      }
      const text = args.join(" ").trim();
      if (!text) return conn.reply(m.chat, "Kirim teks profilmu setelah .addprofil", m);

      profiles[userId] = { text };
      saveProfiles();
      return conn.reply(m.chat, "✅ Profil berhasil ditambahkan.", m);
    }

    // .editprofil <teks bebas>
    if (command === 'editprofil') {
      const userId = m.sender;
      if (!profiles[userId]) {
        return conn.reply(m.chat, "❌ Profil belum ada. Gunakan .addprofil untuk membuat profil.", m);
      }
      const text = args.join(" ").trim();
      if (!text) return conn.reply(m.chat, "Kirim teks profilmu setelah .editprofil", m);

      profiles[userId].text = text;
      saveProfiles();
      return conn.reply(m.chat, "✅ Profil berhasil diupdate.", m);
    }

    // .profil (sendiri, reply, atau mention)
    if (command === 'profil') {
      let targetId = m.quoted?.sender || m.mentionedJid?.[0] || m.sender;
      let p = profiles[targetId];
      if (!p) {
        return conn.reply(m.chat, "❌ Profil belum dibuat oleh pengguna ini.", m);
      }
      const contact = targetId.split("@")[0];
      const title = targetId === m.sender ? "👤 Profil Anda" : `📄 Profil @${contact}`;
      return conn.reply(m.chat, `${title}:\n${p.text}`, m, { mentions: [targetId] });
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