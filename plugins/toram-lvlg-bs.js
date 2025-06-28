let handler = async (m, { conn, command }) => {
  if (command === 'lvlgbs') {
    return conn.reply(m.chat, `🧱 *LEVELING BS (Blacksmith)*

📦 *Versi BS VIT*
▫ 0-15: Baju Pengelana
▫ 15-120: Baju Diomedia
▫ 120-140: Tombak Baskara
▫ 140-170: Katana Bakung Lelabah Merah
▫ 170-200: 2H Golok Pembasmi Naga / 1H Pedang Archanida
▫ 200-225: Baju Dara / Kostum Pengelabu
▫ 225-250: 2H Pholidata / Kostum Pengelabu
▫ 250-300: Gak Tau

|----------------------------------------------------------|

📦 *Versi BS Tombak / Tinju / MD / Staff*
▫ 0-15: Baju Pengelana
▫ 15-50: Tinju Hard Knuckles
▫ 50-90: Pedang Indigo
▫ 90-120: Baju Diomedia
▫ 120-140: Tombak Baskara
▫ 140-170: Katana Bakung Lelabah Merah
▫ 170-200: 2H Golok Pembasmi Naga / 1H Pedang Archanida
▫ 200-225: Baju Dara / Kostum Pengelabu
▫ 225-250: 2H Pholidata / Kostum Pengelabu
▫ 250-300: Gak Tau
`, m);
  }
};

handler.command = ['lvlgbs'];
handler.tags = ['toram'];
handler.help = ['lvlgbs'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
