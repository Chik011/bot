let handler = async (m, { conn, text }) => {
  await conn.sendMessage(m.chat, {
    react: {
      text: pickRandom(['😨','😅','😂','😳','😎', '🥵', '😱', '🐦', '🙄', '🐤','🗿','🐦','🤨','🥴','😐','👆','😔', '👀','👎']),
      key: m.key,
    }
  });

  // Balasan khusus untuk kata tertentu
  const lower = (m.text || '').toLowerCase();
  if (lower.includes('owner')) {
    await conn.reply(m.chat, 'Owner sedang sibuk, silakan tinggalkan pesan.', m);
  } else if (lower.includes('wibu')) {
    await conn.reply(m.chat, 'Wibu detected! 🚨', m);
  }
  // Tambah else if sesuai kebutuhan

  return true;
};

handler.customPrefix = /(bile?k|ban?h|cum?|knt?l|y?|mmk|p|b(a|i)?c?(o|i)?(t|d)?|wibu|p(a)?nt(e)?k|pepe?k|owner)/i;
handler.command = () => false;
handler.mods = false;

module.exports = handler;

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}