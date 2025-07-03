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

      const api = `https://apiflash.top/api/remini?url=${encodeURIComponent(url)}`;
      const res = await fetch(api);
      const raw = await res.text();

      const json = JSON.parse(raw);

      if (!json.status || !json.result) throw new Error('❌ Gagal memperjelas gambar.');

      await conn.sendFile(m.chat, json.result, 'hd.jpg', wm, m);
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
