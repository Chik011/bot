const axios = require('axios');
const FormData = require('form-data');

const wm = '© Laurens';
const wait = '_Sedang diproses, tunggu sebentar..._';

async function uploadImage(buffer) {
  const form = new FormData();
  form.append('file', buffer, 'image.jpg');

  const res = await axios.post('https://telegra.ph/upload', form, {
    headers: form.getHeaders()
  });

  if (!res.data || !res.data[0] || !res.data[0].src) {
    throw new Error('❌ Gagal upload gambar.');
  }

  return 'https://telegra.ph' + res.data[0].src;
}

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      m.reply(wait);

      const img = await q.download();
      const url = await uploadImage(img);

      // ✅ Gunakan API remini dari violetics (tidak perlu apikey)
      const api = `https://violetics.pw/api/photooxy/remini?image=${encodeURIComponent(url)}`;
      const res = await axios.get(api);

      if (!res.data.status || !res.data.result) {
        throw new Error('❌ Gagal memproses gambar.');
      }

      await conn.sendFile(m.chat, res.data.result, 'hd.jpg', wm, m);
    } else {
      m.reply(`📸 Kirim gambar lalu balas dengan perintah *${usedPrefix + command}*`);
    }
  } catch (e) {
    console.error(e);
    m.reply('🚩 *Gagal memproses gambar:*\n\n' + e.message);
  }
};

handler.command = handler.help = ['hd', 'hd2', 'hd3'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
