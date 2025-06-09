const buffText = require('./buff');

const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command === 'buff') {
      if (args.length === 0) {
        await conn.reply(m.chat, buffText, m)
      } else {
        await conn.reply(m.chat, 'buff code belum tersedia', m)
      }
      return;
    }
    // handler command lain ...
  } catch (err) {
    console.error(err)
    throw "🚩 Terjadi kesalahan"
  }
};

handler.command = handler.help = ['buff', 'lvlg', 'pembolong', 'lvlgbs', 'tas', 'bahanmq', 'lvlgbuff', 'lvlgpet', 'farm'];
handler.tags = ['toram']
handler.limit = false;
handler.premium = false;
module.exports = handler;
