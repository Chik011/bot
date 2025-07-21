let handler = async (m, { conn }) => {
    // Hapus pesannya
    await conn.sendMessage(m.chat, { delete: m.key });
};

// Pakai \b supaya hanya kata berdiri sendiri yang kena (tidak potong kata lain)
handler.customPrefix = /\b(anjing|babi|kontol|memek|peler|ngentot|bangsat|tolol|idiot|goblok|kampang|kimak|jembut|pepek|asu|bitch|fuck|shit|tai|lonte|bencong)\b/i;

// handler.command pakai regex kosong karena ini trigger dari customPrefix, bukan perintah
handler.command = new RegExp();

module.exports = handler;
