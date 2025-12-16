const pembolongData = {
  ohs: `*⚔️ OHS (One-Hand Sword)*
0-1: 10-20M
1-2: 90-100M`,

  ths: `*⚔️ THS (Two-Hand Sword)*
0-1: 10-20M
1-2: 95-100M`,

  knuckles: `*👊 Knuckles*
0-1: 6-12M
1-2: 70-90M`,

  katana: `*🗡️ Katana*
0-1: 25-30M
1-2: 80-95M`,

  staff: `*🔮 Staff*
0-1: 25-35M
1-2: 80-90M`,

  bow: `🏹 *Bow*
0-1: 10-15M
1-2: 75-85M`,

  bowgun: `*🔫 Bowgun*
0-1: 20-30M
1-2: 60-70M`,

  md: `*📘 MD (Magic Device)*
0-1: 5-12M
1-2: 35-45M`,

  halberd: `*🔱 Halberd*
0-1: 15-25M
1-2: 90-100M`,

  armor: `*🛡️ Armor*
Spirit Needle: 10M
Legendary Needle: 650M+`,

  additionals: `*👒 Additionals*
Fairy Silk: 5-10M
Legendary Silk: 750M+`,

  ring: `*💍 Ring*
High Grade Ornament: 8-10M
Legendary Ornament: 500M+`,

  extract: `*Extract*
• Extract : 3-4M`,

  pseudo: `*berat semu/pseudo*
• pseudo : 4-5M`,

};

let handler = async (m, { conn, command, text }) => {
  let key = text.trim().toLowerCase();

  if (!key) {
    // Tampilkan semua jika tidak ada input
    let fullList = `📌 *Harga Pembolong (Estimasi)*\n(Harga belum pasti, bisa berubah, Harga sekarang di rate 10k 35m)\n\n`;
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
