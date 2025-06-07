let handler = async (m, { conn, text }) => {
  // Pengecekan lebih fleksibel untuk pesan yang mengandung "laurens"
  if (/laurens/i.test(m.text)) {
    const responses = [
      "Ya, ada apa?",
      "Aku di sini, ada yang bisa dibantu?",
      "Memanggilku?",
      "Laurens hadir!",
      "Aku mendengarmu, katakan saja."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    await conn.reply(m.chat, randomResponse, m, {
      contextInfo: {
        mentionedJid: m.mentionedJid ? m.mentionedJid : []
      }
    });
  }
}

// Handler settings yang lebih tepat:
handler.help = ['laurens <text>']
handler.tags = ['fun']
handler.command = /^/i  // Menerima semua pesan
handler.group = true
handler.private = true

module.exports = handler