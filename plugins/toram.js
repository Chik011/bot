const wait = 'Tunggu sebentar...'; // Tambahkan ini di atas

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
      if (args.length === 0) {
        await conn.reply(m.chat, 'Silakan masukkan buff yang ingin dicari.', m)
      } else {
        await conn.reply(m.chat, 'buff code belum tersedia', m)
      }
      return;
    }
    if (command == 'lvlg') {
      if (args.length === 0) {
        await conn.reply(m.chat, 'Silakan masukkan level yang ingin dicari.', m)
      } else {
        await conn.reply(m.chat, 'lvlg code belum tersedia', m)
      }
      return;
    }
    if (command == 'pembolong') {
      await conn.reply(m.chat, 'belum tersedia', m)
      return;
    }
  } catch (err) {
    console.error(err)
    throw "🚩 Terjadi kesalahan"
  }
};
handler.command = handler.help = ['buff','lvlg','pembolong'];
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;
module.exports = handler;