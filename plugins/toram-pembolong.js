const pembolongData = {
  ohs: `*⚔️ OHS (One-Hand Sword)*
• 0-1: 15-30m
• 1-2: 150-250m`,

  '2h': `*⚔️ 2H (Two-Hand Sword)*
• 0-1: 10-15m
• 1-2: 60-80m`,

  knuckles: `*👊 Knuckles*
• 0-1: 12-18m
• 1-2: 100-120m`,

  katana: `*🗡️ Katana*
• 0-1: 12-16m
• 1-2: 100-120m`,

  staff: `*🔮 Staff*
• 0-1: 10-15m
• 1-2: 90-120m`,

  bow: `🏹 *Bow*
• 0-1: 9-15m
• 1-2: 60-90m`,

  bowgun: `*🔫 Bowgun*
• 0-1: 7-14m
• 1-2: 45-65m`,

  md: `*📘 MD (Magic Device)*
• 0-1: 5-12m
• 1-2: 16-35m`,

  halberd: `*🔱 Halberd*
• 0-1: 7-12m
• 1-2: 70-80m`,

  armor: `*🛡️ Armor*
• Spirit Needle: 10m
• Legendary Needle: 400m+`,

  additionals: `*👒 Additionals*
• Fairy Silk: 5-10m
• Legendary Silk: 600m+`,

  ring: `*💍 Ring*
• High Grade Ornament: 8-10m
• Legendary Ornament: 450-500m`,

  extract: `*Extract*
• Extract : 2-3M`,

  pseudo: `*berat semu/pseudo*
• pseudo : 4-5M`,

};

let handler = async (m, { conn, command, text }) => {
  let key = text.trim().toLowerCase();

  if (!key) {
    // Tampilkan semua jika tidak ada input
    let fullList = `📌 *Harga Pembolong (Estimasi)*\n(Harga belum pasti, bisa berubah)\n\n`;
    for (let k in pembolongData) {
      fullList += `${pembolongData[k]}\n\n`;
    }
    return conn.reply(m.chat, fullList.trim(), m);
  }

  if (pembolongData[key]) {
    return conn.reply(m.chat, pembolongData[key], m);
  } else {
    return conn.reply(m.chat, `❌ Kategori *${text}* tidak ditemukan.\nGunakan tanpa tambahan untuk lihat semua kategori.`, m);
  }
};

handler.command = ['pembolong'];
handler.tags = ['toram'];
handler.help = ['pembolong [kategori]'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
