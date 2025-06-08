const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

const wm = '© Laurens';
const wait = '_Sedang diproses, tunggu sebentar..._';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      m.reply(wait);

      const img = await q.download();
      const out = await uploadImage(img);

      const api = `https://apiflash.top/api/remini?url=${encodeURIComponent(out)}`;
      const res = await fetch(api);
      const raw = await res.text();
      console.log(raw); // Debugging

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
