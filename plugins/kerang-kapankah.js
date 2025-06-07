let handler = async (m, { conn, text }) => {
  // Check if message contains "laurens" (case insensitive)
  if (/laurens/i.test(m.text)) {
    const responses = [
      "Aku Laurens, bot siap membantu!",
      "Hai! Ada yang bisa kubantu?",
      "Laurens di sini, ngomong aja ya.",
      "Butuh bantuan? Tanyakan ke Laurens!",
      "Aku bot sederhana, tapi siap menemani kamu.",
      "Ya, panggil aku?",
      "Laurens siap membantu!",
      "Hmm? Ada yang bisa kubantu?",
      "Kamu memanggilku?",
      "Aku mendengarmu..."
    ];
    
    const randomResponse = pickRandom(responses);
    
    await conn.reply(m.chat, randomResponse, m, {
      mentions: m.mentionedJid ? m.mentionedJid : []
    });
  }
}

// Handler settings
handler.help = ['laurens'];
handler.tags = ['general'];
handler.command = false; // Disable command mode
handler.group = true; // Enable in groups
handler.private = true; // Enable in private chats

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}