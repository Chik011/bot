const fs = require("fs");
const path = require("path");
const wait = 'Tunggu sebentar...';

const profileFile = './profil.json';

let profiles = {};
// Memuat profil yang sudah ada saat bot dimulai
if (fs.existsSync(profileFile)) {
    try {
        profiles = JSON.parse(fs.readFileSync(profileFile, 'utf8'));
    } catch (e) {
        console.error("Error parsing profil.json:", e);
        profiles = {}; // Reset jika ada error parsing
    }
}

// Fungsi untuk menyimpan profil ke file
function saveProfiles() {
    fs.writeFileSync(profileFile, JSON.stringify(profiles, null, 2), 'utf8');
}

let handler = async (m, { conn, command, args }) => {
    await conn.reply(m.chat, wait, m);
    try {
        const userId = m.sender;

        // --- COMMAND: .addprofil <teks bebas> ---
        if (command === 'addprofil') {
            if (profiles[userId] && profiles[userId].text) {
                return conn.reply(m.chat, "❌ Anda sudah memiliki profil teks. Gunakan *.editprofil* untuk mengubahnya.", m);
            }
            const text = args.join(" ").trim();
            if (!text) {
                return conn.reply(m.chat, "Kirim teks profil Anda setelah *.addprofil*", m);
            }

            if (!profiles[userId]) profiles[userId] = {}; // Buat objek profil jika belum ada
            profiles[userId].text = text;
            saveProfiles();
            return conn.reply(m.chat, "✅ Profil teks berhasil ditambahkan.", m);
        }

        // --- COMMAND: .editprofil <teks bebas> ---
        if (command === 'editprofil') {
            if (!profiles[userId] || !profiles[userId].text) {
                return conn.reply(m.chat, "❌ Anda belum memiliki profil teks. Gunakan *.addprofil* untuk membuatnya.", m);
            }
            const text = args.join(" ").trim();
            if (!text) {
                return conn.reply(m.chat, "Kirim teks profil Anda setelah *.editprofil*", m);
            }

            profiles[userId].text = text;
            saveProfiles();
            return conn.reply(m.chat, "✅ Profil teks berhasil diupdate.", m);
        }

        // --- COMMAND: .addpp (reply/kirim gambar) ---
        if (command === 'addpp') {
            if (!m.quoted || !m.quoted.fromMe || !m.quoted.image) {
                // Check if it's a quoted image or if the message itself is an image
                if (m.message && m.message.imageMessage) {
                    // Direct image message
                    const media = await m.download();
                    if (!profiles[userId]) profiles[userId] = {};
                    profiles[userId].ppUrl = media.toString('base64'); // Simpan sebagai base64 string
                    saveProfiles();
                    return conn.reply(m.chat, "✅ Foto profil (PP) berhasil ditambahkan.", m);
                } else {
                    return conn.reply(m.chat, "Mohon reply gambar yang ingin dijadikan foto profil atau kirim langsung gambarnya dengan caption *.addpp*.", m);
                }
            }
            if (m.quoted && m.quoted.image) { // If replying to an image
                const media = await m.quoted.download();
                if (!profiles[userId]) profiles[userId] = {};
                profiles[userId].ppUrl = media.toString('base64'); // Simpan sebagai base64 string
                saveProfiles();
                return conn.reply(m.chat, "✅ Foto profil (PP) berhasil ditambahkan.", m);
            } else {
                return conn.reply(m.chat, "Mohon reply gambar yang ingin dijadikan foto profil atau kirim langsung gambarnya dengan caption *.addpp*.", m);
            }
        }

        // --- COMMAND: .delpp ---
        if (command === 'delpp') {
            if (!profiles[userId] || !profiles[userId].ppUrl) {
                return conn.reply(m.chat, "❌ Anda tidak memiliki foto profil (PP) yang tersimpan.", m);
            }
            delete profiles[userId].ppUrl;
            if (Object.keys(profiles[userId]).length === 0) { // Jika tidak ada data lain, hapus entri user
                delete profiles[userId];
            }
            saveProfiles();
            return conn.reply(m.chat, "✅ Foto profil (PP) berhasil dihapus.", m);
        }

        // --- COMMAND: .profil (sendiri, reply, atau mention) ---
        if (command === 'profil') {
            let targetId = m.quoted?.sender || m.mentionedJid?.[0] || userId;
            let p = profiles[targetId];

            if (!p || (!p.text && !p.ppUrl)) {
                return conn.reply(m.chat, "❌ Profil belum dibuat oleh pengguna ini atau tidak memiliki data.", m);
            }

            const contact = targetId.split("@")[0];
            const title = targetId === userId ? "👤 Profil Anda" : `📄 Profil @${contact}`;

            let responseText = `${title}:\n`;
            if (p.text) {
                responseText += `${p.text}\n`;
            } else {
                responseText += "_(Tidak ada teks profil)_ \n";
            }

            if (p.ppUrl) {
                const buffer = Buffer.from(p.ppUrl, 'base64');
                await conn.sendFile(m.chat, buffer, 'profile.jpg', responseText, m, false, { mentions: [targetId] });
            } else {
                await conn.reply(m.chat, responseText, m, { mentions: [targetId] });
            }
            return;
        }

    } catch (err) {
        console.error(err);
        // Memberikan pesan error yang lebih informatif jika memungkinkan
        if (err.message && err.message.includes('No Media Found')) {
            return conn.reply(m.chat, "❌ Tidak ada media gambar yang ditemukan untuk diunduh. Pastikan Anda me-reply gambar.", m);
        }
        throw "🚩 Terjadi kesalahan internal. Mohon coba lagi nanti.";
    }
};

handler.command = ['addprofil', 'editprofil', 'profil', 'addpp', 'delpp'];
handler.tags = ['profil'];
handler.help = ['addprofil <teks>', 'editprofil <teks>', 'profil [@user]', 'addpp (reply/send image)', 'delpp'];
handler.limit = false;
handler.premium = false;
module.exports = handler;