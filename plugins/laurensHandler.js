const LAURENS_REGEX = /laurens/i;

let handler = async (m, { conn }) => {
  try {
    const text = m.text || m.body || (m.message && m.message.conversation) || '';
    if (!text || m.isStatus || !LAURENS_REGEX.test(text)) return;

    console.log('[LAURENS MATCH]', text);

    const responses = [
      "Ya, ada apa?",
      "Aku di sini!",
      "Laurens hadir!",
      "Memanggilku?",
    ];

    const response = responses[Math.floor(Math.random() * responses.length)];

    await conn.sendMessage(m.chat, {
      text: response,
      mentions: [m.sender],
    }, { quoted: m });
  } catch (error) {
    console.error('ERROR:', error);
  }
};

handler.help = ['laurens'];
handler.tags = ['general'];
handler.command = false;
handler.all = true; // ini penting!
module.exports = handler;
