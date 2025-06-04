const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.waifu.pics/sfw/loli',         // pakai waifu.pics loli
  husbu: 'https://api.waifu.pics/sfw/husbando',   // husbando
  mommy: 'https://api.waifu.pics/sfw/mommy',      // mommy
  neko: 'https://api.waifu.pics/sfw/neko',
};

var handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    let url = endpoints[command];
    if (!url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    let { data } = await axios.get(url);

    if (!data || !data.url) return conn.reply(m.chat, 'Gagal mendapatkan gambar.', m);

    let captions = {
      waifu: '✨ Waifu untukmu~',
      loli: '🎀 Loli manis untukmu~',
      husbu: '✨ Husbando keren untukmu~',
      mommy: '🌸 Mommy cantik untukmu~',
      neko: '🐱 Neko lucu untukmu~',
    };

    let caption = captions[command] || '✨ Untukmu~';

    await conn.sendFile(m.chat, data.url, '', caption, m);

  } catch (e) {
    console.error(e);
    conn.reply(m.chat, eror, m);
  }
};

handler.help = ['waifu', 'loli', 'husbu', 'mommy', 'neko'];
handler.command = /^(waifu|loli|husbu|mommy|neko)$/i;
handler.tags = ['image'];
handler.limit = false;

module.exports = handler;
