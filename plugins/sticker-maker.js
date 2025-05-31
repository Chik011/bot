const { sticker5 } = require('../lib/sticker');
const fs = require('fs');
const fetch = require('node-fetch');

const handler = async (m, { conn, args, text, usedPrefix, command }) => {
    text = text 
        ? text 
        : m.quoted && m.quoted.text 
        ? m.quoted.text 
        : m.quoted && m.quoted.caption 
        ? m.quoted.caption 
        : m.quoted && m.quoted.description 
        ? m.quoted.description 
        : '';
        
    if (!text) throw `Example: ${usedPrefix + command} Lagi Ruwet`;

    let res;
    if (command === 'brat') {
        res = `https://api.botcahx.eu.org/api/maker/brat?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${btc}`;
    } else if (command === 'brat2' || command === 'bratgif' || command === 'bratvid') {
        res = `https://api.botcahx.eu.org/api/maker/brat-video?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${btc}`;
    } else if (command === 'ttp') {
        res = `https://api.botcahx.eu.org/api/maker/ttp?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${btc}`;
    } else if (command === 'attp') {
        res = `https://api.botcahx.eu.org/api/maker/attp?text=${encodeURIComponent(text.substring(0, 151))}&apikey=${btc}`;
    }

    const err = fs.readFileSync(`./media/sticker/emror.webp`);

    try {
        const response = await fetch(res);
        const buffer = await response.buffer();

        if (command === 'bratgif' || command === 'brat2' || command === 'bratvid') {
            await conn.sendVideoAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author });
        } else {
            const stiker = await sticker5(buffer, false, global.packname, global.author);
            await conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);
        }
    } catch (e) {
        console.error(e);
        await conn.sendFile(m.chat, err, 'error.webp', '', m);
    }
};

handler.command = handler.help = ['brat', 'brat2', 'bratgif', 'bratvid', 'ttp', 'attp'];
handler.tags = ['sticker'];
handler.limit = true;

module.exports = handler;
