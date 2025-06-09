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

  // .profilowner (menampilkan profil owner lengkap dengan foto WA)
if (command === 'owner') {
  const ownerId = '62895329092414@s.whatsapp.net'; // Ganti dengan nomor WA owner

  const profilOwner = {
    nama: "chiko",
    bio: "Developer bot ini. Jangan lupa senyum hari ini 😊",
    ig: "https://instagram.com/_chiko_11",
    grup: "https://chat.whatsapp.com/"
  };

  let foto;
  try {
    foto = await conn.profilePictureUrl(ownerId, 'image'); // Ambil foto profil WA
  } catch (e) {
    foto = 'https://telegra.ph/file/3cc2f9b4e2f1f5e0ad45e.jpg'; // fallback jika gagal
  }

  const teks = `
👑 *Profil Owner Bot*
• Nama: ${profilOwner.nama}
• Bio: ${profilOwner.bio}
• Instagram: ${profilOwner.ig}
• Grup Diskusi: ${profilOwner.grup}
`.trim();

  await conn.sendFile(m.chat, foto, 'owner.jpg', teks, m, { mentions: [ownerId] });
}

};

handler.command = handler.help = ['addprofil', 'editprofil', 'profil', 'owner'];
handler.tags = ['profil'];
handler.limit = false;
handler.premium = false;
module.exports = handler;