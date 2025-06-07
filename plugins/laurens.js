const laurensHandler = async (m, { conn }) => {
  // Check if message contains 'laurens' (case insensitive) and not from status
  if (/laurens/i.test(m.text) && !m.isStatus) {
    const responses = [
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
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Send reply with mention
    await conn.sendMessage(m.chat, {
      text: randomResponse,
      mentions: [m.sender]
    }, { quoted: m });
  }
}

// Handler configuration
laurensHandler.help = ['laurens'];
laurensHandler.tags = ['general'];
laurensHandler.command = false; // Disable command mode
laurensHandler.group = true; // Works in groups
laurensHandler.private = true; // Works in private chats

module.exports = laurensHandler;