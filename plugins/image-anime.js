const axios = require('axios');
const wait = 'Tunggu sebentar...';
const eror = 'Maaf, terjadi kesalahan.';

const endpoints = {
  waifu: 'https://api.waifu.pics/sfw/waifu',
  loli: 'https://api.lolicon.app/setu/v2?tag=loli&r18=0',
  husbu: 'https://nekos.best/api/v2/male',
  neko: 'https://api.waifu.pics/sfw/neko',
};

var handler = async (m, { conn, command }) => {
  m.reply(wait);
  try {
    let url = endpoints[command];
    if (!url) return conn.reply(m.chat, 'Fitur tidak tersedia.', m);

    let { data } = await axios.get(url);

    let imageUrl, caption = '';

    if (command === 'loli') {
      // Format khusus untuk lolicon.app
      if (data.data && data.data.length > 0) {
        imageUrl = data.data[0].urls.regular;
        caption = `🎀 *${data.data[0].title}*\n👤 Artist: ${data.data[0].author}`;
      } else {
        return conn.reply(m.chat, 'Tidak ditemukan gambar loli.', m);
      }
    } else if (command === 'husbu') {
      // Format khusus nekos.best
      imageUrl = data.results[0].url;
      caption = '✨ Husbu untukmu~';
    } else {
      // Format umum waifu.pics
      imageUrl = data.url;
      caption = `✨ ${command.charAt(0).toUpperCase() + command.slice(1)} untukmu~`;
    }

    await conn.sendFile(m.chat, imageUrl, '', caption, m);
    
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, eror, m);
  }
};

handler.help = ['waifu','loli','husbu','neko'];
handler.command = /^(waifu|loli|husbu|neko)$/i;
handler.tags = ['image'];
handler.limit = false;

module.exports = handler;
