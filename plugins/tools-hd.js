const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

const btc = 'ISI_APIKEY_KAMU'; // 🔑 Ganti dengan API key dari https://api.botcahx.eu.org
const wm = '© YourBot'; // 🖋️ Watermark atau credit yang dikirim ke user
const wait = '_Sedang diproses, tunggu sebentar..._';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      m.reply(wait);

      const img = await q.download();
      const out = await uploadImage(img);

      let endpoint = '';
      if (command === 'hd') {
        endpoint = `remini`;
      } else if (command === 'hd2') {
        endpoint = `remini-v2`;
      } else if (command === 'hd3') {
        endpoint = `remini-v3&resolusi=4`;
      } else if (command === 'removebg' || command === 'nobg') {
        endpoint = `removebg`;
      }

      const url = `https://api.botcahx.eu.org/api/tools/${endpoint}?url=${encodeURIComponent(out)}&apikey=${btc}`;

      const api = await fetch(url);
      if (!api.ok) throw new Error(`API Error: ${api.status} ${api.statusText}`);

      let image;
      try {
        image = await api.json();
      } catch (err) {
        throw new Error(`Gagal parse JSON: ${err.message}`);
      }

      if (!image.url) throw new Error('❌ Tidak berhasil mendapatkan URL gambar hasil.');

      await conn.sendFile(m.chat, image.url, 'result.jpg', wm, m);

    } else {
      m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }

  } catch (e) {
    console.error(e);
    m.reply('🚩 *Terjadi kesalahan pada server atau API.*\n\n' + e.message);
  }
};

handler.command = handler.help = ['hd', 'hd2', 'hd3', 'removebg', 'nobg'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
