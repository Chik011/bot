const fetch = require('node-fetch');
const uploadImage = require('../lib/uploadImage');

const DEEPAI_API_KEY = '3fa6e275-e12b-4cd5-8e72-5485bcf094bf'; // 🔑 API Key dari https://deepai.org/
const wm = '© Laurens'; // Watermark
const wait = '_Sedang diproses, tunggu sebentar..._';

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (/^image/.test(mime) && !/webp/.test(mime)) {
      m.reply(wait);

      const img = await q.download();
      const out = await uploadImage(img);

      let imageUrl;

      if (['hd', 'hd2', 'hd3'].includes(command)) {
        const response = await fetch('https://api.deepai.org/api/torch-srgan', {
          method: 'POST',
          headers: {
            'Api-Key': DEEPAI_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `image=${encodeURIComponent(out)}`
        });

        const result = await response.json();
        if (!result.output_url) throw new Error('❌ Gagal meningkatkan kualitas gambar.');
        imageUrl = result.output_url;

      } else {
        return m.reply(`❌ Perintah *${command}* tidak dikenali atau belum didukung.`);
      }

      await conn.sendFile(m.chat, imageUrl, 'enhanced.jpg', wm, m);

    } else {
      m.reply(`📸 Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }

  } catch (e) {
    console.error(e);
    m.reply('🚩 *Terjadi kesalahan:*\n\n' + e.message);
  }
};

handler.command = handler.help = ['hd', 'hd2', 'hd3'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = false;

module.exports = handler;
