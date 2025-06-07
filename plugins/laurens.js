let handler = async (m, { conn, text }) => {
  // Check if message contains "laurens" (case insensitive)
  if (/laurens/i.test(text)) {
    const freeResponses = [
      "Aku di sini, butuh bantuan apa?",
      "Ya, panggil aku?",
      "Laurens siap membantu!",
      "Hmm? Ada yang bisa kubantu?",
      "Kamu memanggilku?",
      "Aku mendengarmu...",
      "Hai! Ada apa?",
      "Laurens online! Ada yang bisa dibantu?",
      "Yep, aku di sini",
      "Katakan saja, aku dengar kok"
    ];
    
    const randomResponse = pickRandom(freeResponses);
    
    conn.reply(m.chat, randomResponse, m, m.mentionedJid ? {
      contextInfo: {
        mentionedJid: m.mentionedJid
      }
    } : {});
  }
}

handler.help = ['laurens <text>']
handler.tags = ['fun']
handler.customPrefix = /^/i  // Respond to any message
handler.command = false  // Disable command mode
handler.group = true
handler.private = true

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}