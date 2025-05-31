let handler = async (m, { conn, command }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
      'buff code belum tersedia';
    }
    if (command == 'lvlg') {
        'lvlg code belum tersedia';
    }
   } catch (err) {
  console.error(err)
  throw "🚩 Terjadi kesalahan"
   };
};
handler.command = handler.help = ['buff','lvlg',]
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;

module.exports = handler;
