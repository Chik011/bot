const axios = require('axios');

const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

// Semua command terdaftar sebagai key di sini
const endpoints = {
  waifu: {
    url: 'https://api.waifu.pics/sfw/waifu',
    caption: '✨ Waifu untukmu~',
  },
  loli: {
    url: 'https://nekos.life/api/v2/img/loli',
    caption: 'Pedo banget',
  },
  husbu: {
    url: 'https://api.waifu.pics/sfw/husbando',
    caption: '✨ Husbando keren untukmu~',
  },
  neko: {
    url: 'https://api.waifu.pics/sfw/neko',
    caption: '🐱 Neko lucu untukmu~',
  },
  mommy: {
    url: 'https://some-random-api.ml/img/simpson',
    caption: '🌸 Mommy untukmu~',
  }
};

const handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    const endpoint = endpoints[command.toLowerCase()];
    if (!endpoint || !endpoint.url)
      return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    const { data } = await axios.get(endpoint.url);
    const imageUrl = data.url || data.link || data.message;

    if (!imageUrl)
      return conn.reply(m.chat, 'Gagal mendapatkan gambar.', m);

    await conn.sendFile(m.chat, imageUrl, '', endpoint.caption || '✨ Untukmu~', m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, eror, m);
  }
};

handler.help = Object.keys(endpoints);
handler.command = new RegExp(`^(${Object.keys(endpoints).join('|')})$`, 'i');
handler.tags = ['image'];
handler.limit = false;

module.exports = handler;
