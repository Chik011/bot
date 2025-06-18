const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, args }) => {
  await conn.reply(m.chat, wait, m)
}
handler.command = handler.help = ['family100', 'tictactoe'];
handler.tags = ['game']
handler.limit = false;
handler.premium = false;
module.exports = handler;