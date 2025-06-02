const fetch = require('node-fetch');

let handler = async (m, { conn }) => {
  try {
    let res = await fetch('https://api.lolhuman.xyz/api/random/quotes?apikey=apikeydemo');
    let json = await res.json();
    let text = json.result || json.result.quote || json.result.text || 'Tidak ada data.';
    conn.reply(m.chat, `“${text}”`, m);
  } catch (e) {
    conn.reply(m.chat, 'Gagal mengambil data.', m);
  }
};

handler.help = ['taugasih'];
handler.tags = ['fun'];
handler.command = /^(taugasih)$/i;
handler.limit = false;
handler.admin = false;
handler.fail = null;

module.exports = handler;