let handler = async (m, { conn }) => {
  // Cek jika pesan mengandung 'laurens' (case insensitive)
  if (/laurens/i.test(m.text)) {
    const responses = [
      "Ya, ada apa?",
      "Aku di sini, ada yang bisa dibantu?",
      "Memanggilku?",
      "Laurens hadir!",
      "Aku mendengarmu, katakan saja."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Kirim balasan
    await conn.sendMessage(m.chat, { 
      text: randomResponse,
      mentions: [m.sender] // Tag pengirim
    }, { quoted: m });
  }
}

// Handler settings:
handler.help = ['laurens'];
handler.tags = ['general'];
handler.command = /^(laurens|laurence|lauren)$/i; // Beberapa variasi nama
handler.group = true;
handler.private = true;

module.exports = handler;