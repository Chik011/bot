const uploadImage = require('../lib/uploadImage');
const fetch = require("node-fetch");

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || '';
  if (!/image/.test(mime)) return m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau reply gambar.`);

  await conn.reply(m.chat, '🎨 *Processing...*', m);
  try {
    const img = await q.download?.();
    const imageUrl = await uploadImage(img);

    let apiUrl;

    if (command === 'removebg') {
      apiUrl = `https://api.popcat.xyz/removebg?image=${imageUrl}`;
    } else if (command === 'cartooncheap') {
      apiUrl = `https://some-random-api.com/canvas/comrade?avatar=${imageUrl}`;
    } else if (command === 'jail') {
      apiUrl = `https://some-random-api.com/canvas/jail?avatar=${imageUrl}`;
    } else if (command === 'hitamkan') {
      apiUrl = `https://some-random-api.com/canvas/greyscale?avatar=${imageUrl}`;
    } else {
      return m.reply(`Command *${command}* tidak dikenal.`);
    }

    let buffer = await fetch(apiUrl).then(res => res.buffer());

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `✅ *Success*`
    }, { quoted: m });
  } catch (e) {
    console.error(e);
    m.reply('❌ Gagal memproses gambar.');
  }
};

handler.command = ['removebg', 'cartooncheap', 'jail', 'hitamkan'];
handler.tags = ['fun'];
handler.help = ['removebg', 'cartooncheap', 'jail', 'hitamkan'];
handler.limit = 5;
handler.premium = false;

module.exports = handler;
