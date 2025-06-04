const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.waifu.pics/sfw/loli',
  husbu: 'https://api.waifu.pics/sfw/husbando',
  neko: 'https://api.waifu.pics/sfw/neko',
};

const mommyFallback = 'https://some-random-api.ml/img/simpson'; // contoh fallback gambar mommy lucu

var handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    if (command === 'mommy') {
      // karena mommy tidak ada di waifu.pics, kita pakai fallback ini
      return await conn.sendFile(m.chat, mommyFallback, '', '🌸 Mommy untukmu~', m);
    }

    let url = endpoints[command];
    if (!url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    let { data } = await axios.get(url);

    if (!data || !data.url) return conn.reply(m.chat, 'Gagal mendapatkan gambar.', m);

    let captions = {
      waifu: '✨ Waifu untukmu~',
      loli: '🎀 Loli manis untukmu~',
      husbu: '✨ Husbando keren untukmu~',
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
