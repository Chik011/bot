const levelData = {
  "1-40": {
    mob: "Pova",
    location: "Lonogo Canyon (Ngarai Lonogo)"
  },
  "40-55": {
    mob: "Bone Dragonewt",
    location: "Ancient Empress Tomb: Area 1 (Makam Ratu Kuno: Area 1)"
  },
  "55-70": {
    boss: [
      "Flare Volg (Hard) | Level 55-62",
      "Flare Volg (Nightmare) | Level 62-70"
    ],
    location: "Fiery Volcano: Lava Trail (Lereng Merapi: Jejak Lava)"
  }
};

function findRange(level) {
  for (const range of Object.keys(levelData)) {
    const [min, max] = range.split('-').map(Number);
    if (level >= min && level <= max) return range;
  }
  return null;
}

const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, text, command }) => {
  await conn.reply(m.chat, wait, m);

  if (!text) {
    let list = Object.keys(levelData).map(k => `• *Level ${k}*`).join('\n');
    return conn.reply(m.chat, `📋 *Level yang tersedia:*
${list}

Ketik *.${command} <nomor level>* untuk melihat.
Contoh: *.${command} 1*`, m);
  }

  const levelNum = parseInt(text);
  if (isNaN(levelNum)) {
    return conn.reply(m.chat, '❌ Mohon masukkan nomor level yang valid.', m);
  }

  const range = findRange(levelNum);
  if (!range) {
    let list = Object.keys(levelData).map(k => `• *Level ${k}*`).join('\n');
    return conn.reply(m.chat, `❌ Level ${levelNum} tidak ditemukan.
Silakan pilih level dari daftar berikut:
${list}`, m);
  }

  const { mob, boss, location } = levelData[range];
  let response = `📍 *Level ${range}*\n`;
  
  if (boss) {
    response += `Boss:\n${boss.join('\n')}\n`;
  } else {
    response += `Mob: ${mob}\n`;
  }
  
  response += `Lokasi: ${location}`;
  
  await conn.reply(m.chat, response, m);
};

handler.command = ['lvlg']; // Set command to lvlg
handler.help = ['lvlg']; // Help command
handler.tags = ['toram']; // Tag for categorization
handler.limit = false; // No limit
handler.premium = false; // Not premium

// Handler for all levels
let handlerAll = async (m, { conn }) => {
  await conn.reply(m.chat, wait, m);

  const keys = Object.keys(levelData);
  for (let key of keys) {
    const { mob, boss, location } = levelData[key];
    let response = `📍 *Level ${key}*\n`;
    
    if (boss) response += `Boss:\n${boss.join('\n')}\n`;
    else response += `Mob: ${mob}\n`;
    
    response += `Lokasi: ${location}\n\n`;
    await conn.reply(m.chat, response, m);
  }
};

handlerAll.command = ['alllvlg']; // Command for all levels
handlerAll.help = ['alllvlg']; // Help command for all levels
handlerAll.tags = ['toram']; // Tag for categorization
handlerAll.limit = false; // No limit
handlerAll.premium = false; // Not premium

module.exports = [handler, handlerAll]; // Export both handlers
