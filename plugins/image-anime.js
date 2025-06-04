const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.lolicon.app/setu/v2?tag=loli&r18=0',
  husbu: 'https://nekos.best/api/v2/male',
  mommy: 'https://nekos.best/api/v2/female',       // endpoint mommy
  husbu_alt: 'https://api.waifu.pics/sfw/smile',   // fallback husbu
  mommy_alt: 'https://api.waifu.pics/sfw/cuddle',  // fallback mommy
  neko: 'https://api.waifu.pics/sfw/neko',
};

var handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    let url = endpoints[command];
    if (!url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    let data;

    if (command === 'loli') {
      const res = await axios.get(url);
      data = res.data;
    } else if (command === 'husbu') {
      const res = await axios.get(url);
      data = res.data;
      if (!data.results || data.results.length === 0) {
        const altRes = await axios.get(endpoints.husbu_alt);
        data = { url: altRes.data.url };
      }
    } else if (command === 'mommy') {
      const res = await axios.get(url);
      data = res.data;
      if (!data.results || data.results.length === 0) {
        const altRes = await axios.get(endpoints.mommy_alt);
        data = { url: altRes.data.url };
      }
    } else {
      const res = await axios.get(url);
      data = res.data;
    }

    let imageUrl = '';
    let caption = '';

    if (command === 'loli') {
      if (data.data && data.data.length > 0) {
        imageUrl = data.data[0].urls.regular;
        caption = `🎀 *${data.data[0].title}*\n👤 Artist: ${data.data[0].author}`;
      } else {
        return conn.reply(m.chat, 'Tidak ditemukan gambar loli.', m);
      }
    } else if (command === 'husbu') {
      if (data.results && data.results.length > 0) {
        imageUrl = data.results[0].url;
        caption = '✨ Husbu untukmu~';
      } else if (data.url) {
        imageUrl = data.url;
        caption = '✨ Husbu untukmu~ (fallback)';
      } else {
        return conn.reply(m.chat, 'Gagal mengambil gambar husbu.', m);
      }
    } else if (command === 'mommy') {
      if (data.results && data.results.length > 0) {
        imageUrl = data.results[0].url;
        caption = '🌸 Mommy untukmu~';
      } else if (data.url) {
        imageUrl = data.url;
        caption = '🌸 Mommy untukmu~ (fallback)';
      } else {
        return conn.reply(m.chat, 'Gagal mengambil gambar mommy.', m);
      }
    } else {
      imageUrl = data.url;
      caption = `✨ ${command.charAt(0).toUpperCase() + command.slice(1)} untukmu~`;
    }

    await conn.sendFile(m.chat, imageUrl, '', caption, m);

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
