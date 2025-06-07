let handler = async (m, { conn }) => {
  const text = m.text || '';

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

    await conn.reply(m.chat, randomResponse, m, {
      contextInfo: {
        mentionedJid: m.mentionedJid || []
      }
    });
  }
};

handler.help = ['laurens <text>'];
handler.tags = ['fun'];
handler.command = false;
handler.group = true;
handler.private = true;
handler.fail = null;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
