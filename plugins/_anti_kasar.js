let handler = async (m, { conn }) => {
    await conn.sendMessage(m.chat, { delete: m.key });
};

handler.customPrefix = /anjing|babi|kontol|memek|peler|ngentot|bangsat|tolol|idiot|goblok|kampang|kimak|jembut|pepek|asu|bitch|fuck|shit|tai|lonte|bencong/i;
handler.command = new RegExp();

module.exports = handler;
