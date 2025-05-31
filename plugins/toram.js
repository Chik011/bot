let handler = async (m, { conn, command }) => {
  await conn.reply(m.chat, wait, m)
  try {
    const messages = {
  buff: 'buff code belum tersedia',
  lvlg: 'lvlg code belum tersedia',
  pembolong: 'belum tersedia'
};

if (messages[command]) {
  throw new Error(messages[command]);
}

   } catch (err) {
  console.error(err)
  throw "🚩 Terjadi kesalahan"
   };
};
handler.command = handler.help = ['buff','lvlg','pembolong'];
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;

module.exports = handler;
