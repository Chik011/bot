let handler = async (m, { conn }) => {
  // Kirim react ke chat
  await conn.sendMessage(m.chat, {
    react: {
      text: pickRandom(['😨','😅','😂','😳','😎', '🥵', '😱', '🐦', '🙄', '🐤','🗿','🐦','🤨','🥴','😐','👆','😔', '👀','👎']),
      key: m.key,
    }
  });

  const lower = (m.text || '').toLowerCase();

  if (lower.includes('owner')) {
    await conn.reply(m.chat, 'ada', m);
  } else if (lower.includes('wibu')) {
    await conn.reply(m.chat, 'waaa', m);
  } else if (lower.includes('admin')) {
    await conn.reply(m.chat, 'hadir', m);
  }

  return true;
};

handler.all = handler; // agar selalu dijalankan di semua pesan

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}