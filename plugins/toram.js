let handler = async (m, { conn, command }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
      throw 'buff code belum tersedia';
    }
    if (command == 'lvlg') {
      throw 'lvlg code belum tersedia';
    }
    if (command == 'pembolong') {
      throw 'belum tersedia';
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
