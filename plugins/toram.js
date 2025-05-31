let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
      if (args.length === 0) {
        // Jika tidak ada argumen, balas pesan biasa
        await conn.reply(m.chat, 'Silakan masukkan buff yang ingin dicari.', m)
      } else {
        throw 'buff code belum tersedia';
      }
    }
    if (command == 'lvlg') {
      if (args.length === 0) {
        await conn.reply(m.chat, 'Silakan masukkan level yang ingin dicari.', m)
      } else {
        throw 'lvlg code belum tersedia';
      }
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