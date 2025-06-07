let handler = async (m, { conn }) => {
  // Pastikan bot hanya merespon di chat biasa (bukan status/story)
  if (!m.isGroup && !m.isPrivate) return;
  
  // Cek jika pesan mengandung kata 'laurens' (case insensitive)
  if (/laurens/i.test(m.text || m.body)) {
    const responses = [
      "Ya, ada apa?",
      "Aku di sini!",
      "Laurens hadir!",
      "Butuh bantuan?",
      "Katakan saja...",
      "Aku mendengarmu",
      "Hai, ada yang bisa dibantu?"
    ];
    
    // Pilih respon acak
    const replyMsg = responses[Math.floor(Math.random() * responses.length)];
    
    // Kirim balasan dengan mention pengirim
    await conn.sendMessage(m.chat, { 
      text: replyMsg,
      mentions: [m.sender]
    }, { quoted: m });
  }
}

// Handler settings
handler.help = ['laurens'];
handler.tags = ['general'];
handler.command = false; // Nonaktifkan command handler
handler.group = true;
handler.private = true;

module.exports = handler;