const timeout = 120000;

let family100Handler = async (m, { conn, command }) => {
  conn.family100 = conn.family100 || {};

  if (command === 'family100') {
    if (conn.family100[m.chat]) {
      return conn.reply(m.chat, '🚩 Masih ada sesi Family 100 yang belum selesai.\nGunakan *!nyerah* untuk menyerah.', m);
    }

    const daftarSoal = [ // ===> 30 soal baru sudah aku buat fix
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
      },
      {
        soal: "Sebutkan makanan yang dimakan saat sarapan!",
        jawaban: [
          { jawab: 'nasi goreng', poin: 30 },
          { jawab: 'roti', poin: 20 },
          { jawab: 'telur', poin: 15 },
          { jawab: 'sereal', poin: 10 },
          { jawab: 'bubur', poin: 10 },
          { jawab: 'mie instan', poin: 10 },
          { jawab: 'kopi', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan hewan yang bisa terbang!",
        jawaban: [
          { jawab: 'burung', poin: 30 },
          { jawab: 'kelelawar', poin: 20 },
          { jawab: 'nyamuk', poin: 15 },
          { jawab: 'lalat', poin: 10 },
          { jawab: 'lebah', poin: 10 },
          { jawab: 'kupu-kupu', poin: 10 },
          { jawab: 'capung', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan warna pelangi!",
        jawaban: [
          { jawab: 'merah', poin: 15 },
          { jawab: 'jingga', poin: 15 },
          { jawab: 'kuning', poin: 15 },
          { jawab: 'hijau', poin: 15 },
          { jawab: 'biru', poin: 15 },
          { jawab: 'nila', poin: 15 },
          { jawab: 'ungu', poin: 10 }
        ]
      },
      {
        soal: "Sebutkan jenis olahraga yang populer!",
        jawaban: [
          { jawab: 'sepak bola', poin: 30 },
          { jawab: 'basket', poin: 25 },
          { jawab: 'badminton', poin: 20 },
          { jawab: 'renang', poin: 10 },
          { jawab: 'lari', poin: 10 },
          { jawab: 'voli', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang berwarna putih!",
        jawaban: [
          { jawab: 'susu', poin: 30 },
          { jawab: 'salju', poin: 25 },
          { jawab: 'beras', poin: 20 },
          { jawab: 'kapas', poin: 10 },
          { jawab: 'kertas', poin: 10 },
          { jawab: 'gigi', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan alat yang digunakan untuk menulis!",
        jawaban: [
          { jawab: 'pena', poin: 30 },
          { jawab: 'pensil', poin: 25 },
          { jawab: 'spidol', poin: 20 },
          { jawab: 'kuas', poin: 10 },
          { jawab: 'krayon', poin: 10 },
          { jawab: 'kapur', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang bisa ditemukan di kamar mandi!",
        jawaban: [
          { jawab: 'sabun', poin: 30 },
          { jawab: 'sampo', poin: 25 },
          { jawab: 'sikat gigi', poin: 20 },
          { jawab: 'pasta gigi', poin: 10 },
          { jawab: 'shower', poin: 10 },
          { jawab: 'handuk', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan alat transportasi di darat!",
        jawaban: [
          { jawab: 'mobil', poin: 30 },
          { jawab: 'motor', poin: 25 },
          { jawab: 'bus', poin: 20 },
          { jawab: 'kereta', poin: 10 },
          { jawab: 'sepeda', poin: 10 },
          { jawab: 'truk', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan buah yang berwarna merah!",
        jawaban: [
          { jawab: 'apel', poin: 30 },
          { jawab: 'semangka', poin: 25 },
          { jawab: 'stroberi', poin: 20 },
          { jawab: 'ceri', poin: 10 },
          { jawab: 'jambu', poin: 10 },
          { jawab: 'delima', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan benda yang sering ada di meja kerja!",
        jawaban: [
          { jawab: 'laptop', poin: 30 },
          { jawab: 'pulpen', poin: 25 },
          { jawab: 'kertas', poin: 20 },
          { jawab: 'notebook', poin: 10 },
          { jawab: 'mouse', poin: 10 },
          { jawab: 'stapler', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang sering dibawa ke sekolah!",
        jawaban: [
          { jawab: 'tas', poin: 30 },
          { jawab: 'buku', poin: 25 },
          { jawab: 'pulpen', poin: 20 },
          { jawab: 'pensil', poin: 10 },
          { jawab: 'penghapus', poin: 10 },
          { jawab: 'bekal', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang dilakukan sebelum tidur!",
        jawaban: [
          { jawab: 'gosok gigi', poin: 30 },
          { jawab: 'cuci muka', poin: 25 },
          { jawab: 'berdoa', poin: 20 },
          { jawab: 'main hp', poin: 10 },
          { jawab: 'minum air', poin: 10 },
          { jawab: 'cuci kaki', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang biasanya ada di dapur!",
        jawaban: [
          { jawab: 'kompor', poin: 30 },
          { jawab: 'panci', poin: 25 },
          { jawab: 'pisau', poin: 20 },
          { jawab: 'sendok', poin: 10 },
          { jawab: 'gelas', poin: 10 },
          { jawab: 'wajan', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang dilakukan saat liburan!",
        jawaban: [
          { jawab: 'jalan-jalan', poin: 30 },
          { jawab: 'belanja', poin: 25 },
          { jawab: 'tidur', poin: 20 },
          { jawab: 'nonton film', poin: 10 },
          { jawab: 'makan enak', poin: 10 },
          { jawab: 'foto-foto', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan pekerjaan rumah yang sering dilakukan!",
        jawaban: [
          { jawab: 'menyapu', poin: 30 },
          { jawab: 'mengepel', poin: 25 },
          { jawab: 'cuci piring', poin: 20 },
          { jawab: 'cuci baju', poin: 10 },
          { jawab: 'setrika', poin: 10 },
          { jawab: 'beres-beres', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan sesuatu yang sering dipakai orang tua!",
        jawaban: [
          { jawab: 'kacamata', poin: 30 },
          { jawab: 'tongkat', poin: 25 },
          { jawab: 'jaket', poin: 20 },
          { jawab: 'sarung', poin: 10 },
          { jawab: 'jam tangan', poin: 10 },
          { jawab: 'topi', poin: 5 }
        ]
      },
      {
        soal: "Sebutkan tempat umum yang sering dikunjungi!",
        jawaban: [
          { jawab: 'mall', poin: 30 },
          { jawab: 'pasar', poin: 25 },
          { jawab: 'rumah sakit', poin: 20 },
          { jawab: 'terminal', poin: 10 },
          { jawab: 'sekolah', poin: 10 },
          { jawab: 'stasiun', poin: 5 }
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
