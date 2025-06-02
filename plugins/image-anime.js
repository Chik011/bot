const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.waifu.pics/sfw/neko',
  yuri: 'https://api.waifu.pics/sfw/waifu', // waifu.pics tidak punya yuri, pakai waifu
  shota: 'https://api.waifu.pics/sfw/neko', // waifu.pics tidak punya shota, pakai neko
  hinata: 'https://api.waifu.pics/sfw/waifu', // tidak ada hinata, pakai waifu
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

handler.help = ['yuri','shota','waifu','loli'];
handler.command = /^(yuri|shota|waifu|loli)$/i;
handler.tags = ['image'];
handler.limit = true;
module.exports = handler;