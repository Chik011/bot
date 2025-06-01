const fs = require("fs");
const path = require("path");
const wait = 'Tunggu sebentar...';

const profileFile = './profil.json';
const picDir = './profile-pics/';
if (!fs.existsSync(picDir)) fs.mkdirSync(picDir);

let profiles = {};
if (fs.existsSync(profileFile)) profiles = JSON.parse(fs.readFileSync(profileFile));
function saveProfiles() {
  fs.writeFileSync(profileFile, JSON.stringify(profiles, null, 2));
}

async function saveProfilePic(conn, m, userId) {
  try {
    let msg = m.message?.imageMessage ? m : m.quoted;
    if (!msg?.message?.imageMessage) return null;
    let buffer = await conn.downloadMediaMessage(msg);
    if (!buffer) return null;
    let fileName = path.join(picDir, userId + ".jpg");
    fs.writeFileSync(fileName, buffer);
    return fileName;
  } catch (e) {
    return null;
  }
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

      let photoPath = await saveProfilePic(conn, m, userId);
      if (!photoPath) return conn.reply(m.chat, "Kirim atau reply gambar untuk dijadikan foto profil!", m);

      profiles[userId] = { text, photoPath };
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

      let photoPath = await saveProfilePic(conn, m, userId);
      if (!photoPath) return conn.reply(m.chat, "Kirim atau reply gambar untuk mengganti foto profil!", m);

      profiles[userId].photoPath = photoPath;
      profiles[userId].text = text;
      saveProfiles();
      return conn.reply(m.chat, "✅ Profil berhasil diupdate.", m);
    }

    // .addfoto (hanya ganti foto profil)
    if (command === 'addfoto') {
      const userId = m.sender;
      if (!profiles[userId]) {
        return conn.reply(m.chat, "❌ Profil belum ada. Gunakan .addprofil untuk membuat profil.", m);
      }
      let photoPath = await saveProfilePic(conn, m, userId);
      if (!photoPath) return conn.reply(m.chat, "Kirim atau reply gambar untuk dijadikan foto profil!", m);

      profiles[userId].photoPath = photoPath;
      saveProfiles();
      return conn.reply(m.chat, "✅ Foto profil berhasil diupdate.", m);
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
      if (p.photoPath && fs.existsSync(p.photoPath)) {
        // Kirim foto profil + caption
        return conn.sendMessage(m.chat, {
          image: { url: p.photoPath },
          caption: `${title}:\n${p.text}`,
          mentions: [targetId]
        }, { quoted: m });
      } else {
        // Hanya teks
        return conn.reply(m.chat, `${title}:\n${p.text}`, m, { mentions: [targetId] });
      }
    }
  } catch (err) {
    console.error(err);
    throw "🚩 Terjadi kesalahan";
  }
};

handler.command = handler.help = ['addprofil', 'editprofil', 'profil', 'addfoto'];
handler.tags = ['profil'];
handler.limit = false;
handler.premium = false;
module.exports = handler;