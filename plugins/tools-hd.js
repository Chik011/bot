let handler = async (m, { conn, usedPrefix, command }) => {
    const { axios } = require('axios');
    const FormData = require('form-data');
    const wm = '© Laurens';
    const wait = '_Sedang diproses, tunggu sebentar..._';
    const uploadImage = require('../lib/uploadImage');

    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || q.mediaType || '';

    if (!/^image/.test(mime)) return m.reply(`Kirim gambar lalu balas dengan *${usedPrefix + command}*`);

    m.reply(wait);

    try {
        const img = await q.download();
        const url = await uploadImage(img);
        let endpoint = '';
        if (command == 'hd') endpoint = 'remini';
        if (command == 'removebg') endpoint = 'removebg';
        if (command == 'cartoon') endpoint = 'cartoon';
        if (command == 'anime') endpoint = 'animeface';

        const api = `https://laurens.fly.dev/${endpoint}?url=${encodeURIComponent(url)}`;
        const res = await axios.get(api);
        if (!res.data.status || !res.data.result) throw 'API Error';

        await conn.sendFile(m.chat, res.data.result, `${endpoint}.jpg`, wm, m);
    } catch (e) {
        console.log(e);
        m.reply('Gagal memproses gambar.');
    }
};

handler.command = ['hd', 'removebg', 'cartoon', 'anime'];
handler.help = ['hd', 'removebg', 'cartoon', 'anime'];
handler.tags = ['tools'];

module.exports = handler;
