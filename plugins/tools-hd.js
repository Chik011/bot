const axios = require('axios');
const FormData = require('form-data');

const wm = '© Laurens';
const wait = '_Sedang diproses, tunggu sebentar..._';

// ✅ API key kamu dari imgbb
const IMGBB_API_KEY = '22de3077171dee25a17b2b1c70473de4';

async function uploadToImgbb(buffer) {
  const form = new FormData();
  form.append('image', buffer.toString('base64'));

  const res = await axios.post(`https://api.imgbb.com/1/upload?key=${22de3077171dee25a17b2b1c70473de4}`, form, {
    headers: form.getHeaders()
  });

  if (!res.data || !res.data.data || !res.data.data.url) {
    throw new Error('❌ Gagal upload ke imgbb');
  }

  return res.data.data.url;
}

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      m.reply(wait);

      const img = await q.download();
      const url = await uploadToImgbb(img);

      const api = `https://violetics.pw/api/photooxy/remini?image=${encodeURIComponent(url)}`;
      const res = await axios.get(api);

      if (!res.data.status || !res.data.result) {
        throw new Error('❌ Gagal memperjelas gambar.');
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
