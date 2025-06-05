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
    url: 'https://api.waifu.pics/sfw/waifu',
    caption: 'Pedo banget',
  },
  husbu: {
    url: 'https://danbooru.donmai.us/male_focus',
    caption: '✨ Husbando keren untukmu~',
  },
  neko: {
    url: 'https://api.waifu.pics/sfw/neko',
    caption: '🐱 Neko lucu untukmu~',
  },
  mommy: {
    url: 'https://some-random-api.ml/img/simpson', // fallback, kamu bisa ganti ke endpoint lain
    caption: '🌸 Mommy untukmu~',
  }
};

const handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    const endpoint = endpoints[command];
    if (!endpoint || !endpoint.url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    const { data } = await axios.get(endpoint.url);
    const imageUrl = data.url || data.link || data.message; // beberapa API beda-beda key-nya
    if (!imageUrl) return conn.reply(m.chat, 'Gagal mendapatkan gambar.', m);

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
