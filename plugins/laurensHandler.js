let handler = async (m, { conn }) => {
  const boost = pickRandom([
    "Ya, ada apa?",
    "Aku di sini, ada yang bisa dibantu?",
    "Laurens hadir!",
    "Memanggilku?",
    "Aku mendengarmu, katakan saja...",
    "Hai! Ada yang bisa Laurens bantu?",
    "Bot Laurens siap membantu!",
    "Kamu memanggil?",
    "Laurens online!",
    "Butuh bantuan apa?"
  ]);

  await m.reply(boost);
};

handler.help = ['laurens'];
handler.tags = ['info'];
handler.command = /^laurens$/i; // hanya cocok jika isi pesan: laurens (tanpa titik, tanpa spasi)
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
