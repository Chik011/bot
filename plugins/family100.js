const timeout = 120000;

let family100Handler = async (m, { conn, command }) => {
  conn.family100 = conn.family100 || {};

  if (command === 'family100') {
    if (conn.family100[m.chat]) {
      return conn.reply(m.chat, '🚩 Masih ada sesi Family 100 yang belum selesai.\nGunakan *!nyerah* untuk menyerah.', m);
    }

    const daftarSoal = [
      {
        soal: "Sebutkan benda yang sering dibawa saat ke pantai!",
        jawaban: [
          { jawab: 'sunblock', poin: 30 },
          { jawab: 'handuk', poin: 20 },
          { jawab: 'kacamata', poin: 15 },
          { jawab: 'minuman', poin: 10 },
          { jawab: 'kamera', poin: 10 },
          { jawab: 'topi', poin: 5 },
          { jawab: 'pelampung', poin: 5 },
          { jawab: 'mainan pasir', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan aktivitas yang biasa dilakukan saat hujan!",
        jawaban: [
          { jawab: 'tidur', poin: 30 },
          { jawab: 'makan mie', poin: 25 },
          { jawab: 'nonton film', poin: 20 },
          { jawab: 'minum kopi', poin: 10 },
          { jawab: 'rebahan', poin: 10 },
          { jawab: 'baca buku', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan hewan yang hidup di laut!",
        jawaban: [
          { jawab: 'ikan', poin: 30 },
          { jawab: 'hiu', poin: 20 },
          { jawab: 'paus', poin: 15 },
          { jawab: 'ubur-ubur', poin: 10 },
          { jawab: 'kuda laut', poin: 10 },
          { jawab: 'gurita', poin: 10 },
          { jawab: 'kerang', poin: 5 }
        ]
      }
    ];

    const dipilih = daftarSoal[Math.floor(Math.random() * daftarSoal.length)];

    let chatId = m.chat;
    conn.family100[chatId] = {
      id: +new Date,
      msg: await conn.reply(chatId, `❓ *Family 100 Dimulai!*\n\n${dipilih.soal}\n⏳ Jawab dalam 2 menit!`, m),
      soal: dipilih.soal,
      jawaban: dipilih.jawaban,
      terjawab: [],
      poin: {}
    };

    setTimeout(() => {
      if (conn.family100[chatId]) {
        let teks = `⏰ *Waktu habis!*\n\n📋 Jawaban yang benar:\n`;
        for (let j of conn.family100[chatId].jawaban) {
          teks += `• ${j.jawab} (${j.poin} poin)\n`;
        }

        if (Object.keys(conn.family100[chatId].poin).length) {
          teks += `\n🏆 *Skor pemain:*\n`;
          let skor = Object.entries(conn.family100[chatId].poin).sort((a, b) => b[1] - a[1]);
          skor.forEach(([user, poin], i) => {
            teks += `${i + 1}. @${user.split('@')[0]} → ${poin} poin\n`;
          });
        }

        conn.reply(chatId, teks.trim(), conn.family100[chatId].msg, {
          mentions: Object.keys(conn.family100[chatId].poin)
        });

        delete conn.family100[chatId];
      }
    }, timeout);

  } else if (command === 'nyerah') {
    let room = conn.family100[m.chat];
    if (!room) return conn.reply(m.chat, '🚫 Tidak ada sesi Family 100 yang sedang berlangsung.', m);

    let teks = `🏳️ *Permainan dihentikan!*\n\n📋 Jawaban yang benar:\n`;
    for (let j of room.jawaban) {
      teks += `• ${j.jawab} (${j.poin} poin)\n`;
    }

    if (Object.keys(room.poin).length) {
      teks += `\n🏆 *Skor pemain:*\n`;
      let skor = Object.entries(room.poin).sort((a, b) => b[1] - a[1]);
      skor.forEach(([user, poin], i) => {
        teks += `${i + 1}. @${user.split('@')[0]} → ${poin} poin\n`;
      });
    }

    await conn.reply(m.chat, teks.trim(), room.msg, {
      mentions: Object.keys(room.poin)
    });

    delete conn.family100[m.chat];
  }
};

family100Handler.before = async function (m, { conn }) {
  conn.family100 = conn.family100 || {};
  let room = conn.family100[m.chat];
  if (!room || !m.text || m.isBaileys || m.fromMe) return;

  let jawaban = room.jawaban.find(j => j.jawab.toLowerCase() === m.text.toLowerCase());
  if (!jawaban) return;

  if (room.terjawab.includes(jawaban.jawab.toLowerCase())) {
    return conn.reply(m.chat, '❌ Jawaban sudah ditebak sebelumnya!', m);
  }

  room.terjawab.push(jawaban.jawab.toLowerCase());

  let sender = m.sender;
  room.poin[sender] = (room.poin[sender] || 0) + jawaban.poin;

  conn.reply(m.chat, `✅ Benar! Jawaban: *${jawaban.jawab}* (+${jawaban.poin} poin)`, m);

  if (room.terjawab.length === room.jawaban.length) {
    let teks = `🎉 *Semua jawaban sudah ditemukan!*\n\n📋 Jawaban:\n`;
    for (let j of room.jawaban) {
      teks += `• ${j.jawab} (${j.poin} poin)\n`;
    }

    teks += `\n🏆 *Skor pemain:*\n`;
    let skor = Object.entries(room.poin).sort((a, b) => b[1] - a[1]);
    skor.forEach(([user, poin], i) => {
      teks += `${i + 1}. @${user.split('@')[0]} → ${poin} poin\n`;
    });

    conn.reply(m.chat, teks.trim(), room.msg, {
      mentions: Object.keys(room.poin)
    });

    delete conn.family100[m.chat];
  }
};

family100Handler.command = ['family100', 'nyerah'];
family100Handler.help = ['family100', 'nyerah'];
family100Handler.tags = ['game'];
family100Handler.limit = false;
family100Handler.premium = false;

module.exports = family100Handler;
