let fetch = require('node-fetch');
let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://meme-api.com/gimme');
    let json = await res.json();
    if (!json.url) throw 'Gagal mengambil meme!';
    await conn.sendFile(m.chat, json.url, 'meme.jpg', json.title, m);
  } catch (e) {
    throw 'Error mengambil meme!';
  }
};
handler.command = /^(meme)$/i;
handler.tags = ['fun'];
handler.help = ['meme'];
handler.limit = false;
module.exports = handler;