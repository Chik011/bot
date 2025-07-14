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
        jawaban: ['sunblock', 'handuk', 'kacamata', 'minuman', 'kamera', 'topi', 'pelampung', 'mainan pasir']
    },
    {
        soal: "Sebutkan aktivitas yang biasa dilakukan saat hujan!",
        jawaban: ['tidur', 'makan mie', 'nonton film', 'minum kopi', 'rebahan', 'baca buku']
    },
    {
        soal: "Sebutkan hewan yang hidup di laut!",
        jawaban: ['ikan', 'hiu', 'paus', 'ubur-ubur', 'kuda laut', 'gurita', 'kerang']
    },
    {
        soal: "Sebutkan makanan yang dimakan saat sarapan!",
        jawaban: ['nasi goreng', 'roti', 'telur', 'sereal', 'bubur', 'mie instan', 'kopi']
    },
    {
        soal: "Sebutkan hewan yang bisa terbang!",
        jawaban: ['burung', 'kelelawar', 'nyamuk', 'lalat', 'lebah', 'kupu-kupu', 'capung']
    },
    {
        soal: "Sebutkan warna pelangi!",
        jawaban: ['merah', 'jingga', 'kuning', 'hijau', 'biru', 'nila', 'ungu']
    },
    {
        soal: "Sebutkan jenis olahraga yang populer!",
        jawaban: ['sepak bola', 'basket', 'badminton', 'renang', 'lari', 'voli']
    },
    {
        soal: "Sebutkan sesuatu yang berwarna putih!",
        jawaban: ['susu', 'salju', 'beras', 'kapas', 'kertas', 'gigi']
    },
    {
        soal: "Sebutkan alat yang digunakan untuk menulis!",
        jawaban: ['pena', 'pensil', 'spidol', 'kuas', 'krayon', 'kapur']
    },
    {
        soal: "Sebutkan sesuatu yang bisa ditemukan di kamar mandi!",
        jawaban: ['sabun', 'sampo', 'sikat gigi', 'pasta gigi', 'shower', 'handuk']
    },
    {
        soal: "Sebutkan alat transportasi di darat!",
        jawaban: ['mobil', 'motor', 'bus', 'kereta', 'sepeda', 'truk']
    },
    {
        soal: "Sebutkan buah yang berwarna merah!",
        jawaban: ['apel', 'semangka', 'stroberi', 'ceri', 'jambu', 'delima']
    },
    {
        soal: "Sebutkan benda yang sering ada di meja kerja!",
        jawaban: ['laptop', 'pulpen', 'kertas', 'notebook', 'mouse', 'stapler']
    },
    {
        soal: "Sebutkan sesuatu yang sering dibawa ke sekolah!",
        jawaban: ['tas', 'buku', 'pulpen', 'pensil', 'penghapus', 'bekal']
    },
    {
        soal: "Sebutkan sesuatu yang dilakukan sebelum tidur!",
        jawaban: ['gosok gigi', 'cuci muka', 'berdoa', 'main hp', 'minum air', 'cuci kaki']
    },
    {
        soal: "Sebutkan sesuatu yang biasanya ada di dapur!",
        jawaban: ['kompor', 'panci', 'pisau', 'sendok', 'gelas', 'wajan']
    },
    {
        soal: "Sebutkan sesuatu yang dilakukan saat liburan!",
        jawaban: ['jalan-jalan', 'belanja', 'tidur', 'nonton film', 'makan enak', 'foto-foto']
    },
    {
        soal: "Sebutkan pekerjaan rumah yang sering dilakukan!",
        jawaban: ['menyapu', 'mengepel', 'cuci piring', 'cuci baju', 'setrika', 'beres-beres']
    },
    {
        soal: "Sebutkan sesuatu yang sering dipakai orang tua!",
        jawaban: ['kacamata', 'tongkat', 'jaket', 'sarung', 'jam tangan', 'topi']
    },
    {
        soal: "Sebutkan tempat umum yang sering dikunjungi!",
        jawaban: ['mall', 'pasar', 'rumah sakit', 'terminal', 'sekolah', 'stasiun']
    }
];

module.exports = daftarSoal;


        const dipilih = daftarSoal[Math.floor(Math.random() * daftarSoal.length)];

        // ===> Tampilkan list kosong sesuai jumlah jawaban
        let jumlahJawaban = dipilih.jawaban.length;
        let listJawaban = Array.from({ length: jumlahJawaban }, (_, i) => `${i + 1}.`).join('\n');

        let chatId = m.chat;
        conn.family100[chatId] = {
            id: +new Date,
            msg: await conn.reply(chatId, `❓ *Family 100 Dimulai!*\n\n${dipilih.soal}\n\n${listJawaban}\n⏳ Jawab dalam 2 menit!`, m),
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
