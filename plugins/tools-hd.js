const axios = require('axios');
const FormData = require('form-data');

const wm = '© Laurens';
const wait = '_Sedang diproses, tunggu sebentar..._';
const IMGBB_API_KEY = '22de3077171dee25a17b2b1c70473de4';

async function uploadToImgbb(buffer) {
  const form = new FormData();
  form.append('image', buffer.toString('base64'));
  const res = await axios.post(
    `https://api.imgbb.com/1/upload?expiration=600&key=${IMGBB_API_KEY}`,
    form,
    { headers: form.getHeaders() }
  );
  if (!res.data?.data?.url) throw new Error('❌ Gagal upload ke imgbb');
  return res.data.data.url;
}

async function runImageProcess(m, { conn, usedPrefix, command }, endpoint, processingText) {
  try {
    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/^image/.test(mime) || /webp/.test(mime)) {
      return m.reply(`📸 Kirim gambar lalu balas dengan perintah *${usedPrefix + command}*`);
    }

    m.reply(wait + '\n' + processingText);
    const img = await q.download();
    const url = await uploadToImgbb(img);

    const api = `https://laurens.fly.dev/${endpoint}?url=${encodeURIComponent(url)}`;
    const res = await axios.get(api, { timeout: 20000 });

    if (!res.data.status || !res.data.result) throw new Error('❌ Gagal memproses gambar.');
    await conn.sendFile(m.chat, res.data.result, `${endpoint}.jpg`, wm, m);
  } catch (e) {
    console.error(e);
    m.reply('🚩 *Gagal memproses gambar:*\n\n' + e.message);
  }
}

// Handler untuk .hd
let hdHandler = async (m, args) => runImageProcess(m, args, 'remini', '📷 Memperjelas gambar...');
hdHandler.command = ['hd'];
hdHandler.help = ['hd'];
hdHandler.tags = ['tools'];

// Handler untuk .removebg
let removebgHandler = async (m, args) => runImageProcess(m, args, 'removebg', '🧼 Menghapus latar belakang...');
removebgHandler.command = ['removebg'];
removebgHandler.help = ['removebg'];
removebgHandler.tags = ['image'];

// Handler untuk .cartoon
let cartoonHandler = async (m, args) => runImageProcess(m, args, 'cartoon', '🎨 Mengubah ke gaya kartun...');
cartoonHandler.command = ['cartoon'];
cartoonHandler.help = ['cartoon'];
cartoonHandler.tags = ['ai'];

// Handler untuk .anime
let animeHandler = async (m, args) => runImageProcess(m, args, 'animeface', '✨ Mengubah ke wajah anime...');
animeHandler.command = ['anime'];
animeHandler.help = ['anime'];
animeHandler.tags = ['ai'];

// Export semua handler dalam 1 file
module.exports = [hdHandler, removebgHandler, cartoonHandler, animeHandler];
