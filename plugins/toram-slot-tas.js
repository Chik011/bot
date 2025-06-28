const slotTasList = {
  51: `▪ 50-51
- Kulit Colon x1 (Colon; Tanah Pembangunan)`,

  52: `▪ 51-52
- Kulit Berkualitas x1 (Lavarca; Dataran Rakau)`,

  53: `▪ 52-53
- Spina x1.000`,

  54: `▪ 53-54
- Kulit Minotaur x1 (Minotaur; Kuil Runtuh: Area Terlarang)
- Pecahan Kristal Jingga x1 (Cobre; Danau Icule)`,

  55: `▪ 54-55
- Kulit Anjing Hutan x1 (Anjing Hutan; Hutan Marbabo: Bagian Dalam)
- Lencana Goblin x1 (Boss Goblin; Gua Ribisco: Bagian Dalam)`,

  56: `▪ 55-56
- Spina x2.000`,

  57: `▪ 56-57
- Bulu Mochelo x1 (Mochelo; Lereng Merapi A3)
- Kain Linen x10 (Crow Killer; Dusun Douce)`,

  58: `▪ 57-58
- Bulu Naga Giok x1 (Forestia; Tanah Kaos)
- Tanduk Berkualitas x10 (Bandot; Tanah Tinggi Yorl)`,

  59: `▪ 58-59
- Sabuk Bos Roga x1 (Boss Roga; Gua Bawah Tanah Saham: Ujung)
- Kain Beludu x10 (Orc Petarung; Gua Bawah Tanah Saham)`,

  60: `▪ 59-60
- Spina x4.000`,

  // Tambah hingga 100 sesuai data aslinya jika mau
};

let handler = async (m, { conn, command, text }) => {
  let level = parseInt(text.trim());

  if (!text) {
    // Menampilkan semua
    let all = Object.keys(slotTasList)
      .map(key => slotTasList[key])
      .join('\n\n');
    return conn.reply(m.chat, `🎒 *List Bahan Upgrade Slot Tas (Lv. 50 - 100)*\n\n${all}`, m);
  }

  if (isNaN(level) || !slotTasList[level]) {
    return conn.reply(m.chat, `❌ Level *${text}* tidak ditemukan.\nGunakan: *.slottas* untuk semua data\nAtau: *.slottas 51* untuk upgrade lv 50 ke 51`, m);
  }

  return conn.reply(m.chat, `🎒 *Bahan Slot Tas ${level - 1}-${level}*\n\n${slotTasList[level]}`, m);
};

handler.command = ['slottas'];
handler.tags = ['toram'];
handler.help = ['slottas [level]'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
