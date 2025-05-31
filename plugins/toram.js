let handler = async (m, { conn, command }) => {
  await conn.reply(m.chat, wait, m)
  try {
    if (command == 'buff') {
    //   const res = `https://api.botcahx.eu.org/api/nsfw/gay?apikey=${btc}`;
    //   await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
    }
    if (command == 'lvlg') {
    //   const res = `https://api.botcahx.eu.org/api/nsfw/ahegao?apikey=${btc}`;
    //   await conn.sendFile(m.chat, res, 'nsfw.jpg', '', m);
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
