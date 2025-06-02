const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.waifu.pics/sfw/neko',
};

var handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    let url = endpoints[command];
    if (!url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);
    let { data } = await axios.get(url);
    await conn.sendFile(m.chat, data.url, '', '', m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, eror, m);
  }
};

handler.help = ['waifu','loli'];
handler.command = /^(waifu|loli)$/i;
handler.tags = ['image'];
handler.limit = true;
module.exports = handler;