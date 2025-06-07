let handler = async (m, { conn }) => {
  // Debug: Tampilkan pesan yang diterima
  console.log('Pesan masuk:', m.body);
  
  if (/laurens/i.test(m.body)) {
    const responses = [
      "Ya, ada apa?",
      "Aku di sini, ada yang bisa dibantu?",
      "Memanggilku?",
      "Laurens hadir!",
      "Aku mendengarmu, katakan saja."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Alternatif 1: Menggunakan reply
    await conn.reply(
      m.chat, 
      randomResponse, 
      m, 
      { mentions: [m.sender] }
    );
    
    // Alternatif 2: Menggunakan sendMessage
    // await conn.sendMessage(
    //   m.chat,
    //   { text: randomResponse, mentions: [m.sender] },
    //   { quoted: m }
    // );
  }
}

// Nonaktifkan command handler
handler.command = false;
handler.group = true;
handler.private = true;

module.exports = handler;