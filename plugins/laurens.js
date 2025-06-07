let handler = async (m, { conn, text }) => {
  // Check if the message contains "laurens" (case insensitive)
  if (/laurens/i.test(text)) {
    const responses = [
      "Ya, ada apa?",
      "Aku di sini, ada yang bisa dibantu?",
      "Memanggilku?",
      "Laurens hadir!",
      "Aku mendengarmu, katakan saja."
    ];
    
    // Random response when Laurens is mentioned
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    conn.reply(m.chat, randomResponse, m, m.mentionedJid ? {
      contextInfo: {
        mentionedJid: m.mentionedJid
      }
    } : {});
  } else {
    // Default response if Laurens isn't mentioned
    conn.reply(m.chat, "Kamu perlu memanggilku (Laurens) untuk mendapatkan respon.", m);
  }
}

handler.help = ['laurens <text>']
handler.tags = ['fun']
handler.command = /^(laurens)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = true
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler