let handler = async (m, { conn, text }) => {
  if (/laurens/i.test(text)) {
    // Jawaban keyword Laurens yang bisa kamu tambah
    const replies = [
      "Aku Laurens, bot siap membantu!",
      "Hai! Ada yang bisa kubantu?",
      "Laurens di sini, ngomong aja ya.",
      "Butuh bantuan? Tanyakan ke Laurens!",
      "Aku bot sederhana, tapi siap menemani kamu."
    ];
    
    // Pilih jawaban acak
    const reply = replies[Math.floor(Math.random() * replies.length)];
    
    await conn.reply(m.chat, reply, m);
  }
}

handler.help = ['laurens'];
handler.tags = ['fun'];
handler.command = false;
handler.customPrefix = /^/i;
handler.group = true;
handler.private = true;
handler.fail = null;

<<<<<<< HEAD
module.exports = handler;
=======
module.exports = handler;
>>>>>>> 83b62ef10fa63961fe584f72213ea940952bc76a
