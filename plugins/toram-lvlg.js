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

let handler = async (m, { conn, text, command }) => {
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
    return conn.reply(m.chat, `❌ Level ${levelNum} tidak ditemukan.
Silakan pilih level dari daftar berikut:`, m);
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

handler.command = ['lvlg'];

module.exports = handler;

// Handler for all levels
let handlerAll = async (m, { conn }) => {
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

handlerAll.command = ['alllvlg'];

module.exports = [handler, handlerAll];

