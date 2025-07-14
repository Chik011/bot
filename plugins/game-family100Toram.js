const timeout = 120000;

let family100toHandler = async (m, { conn, command }) => {
    conn.family100to = conn.family100to || {};

    if (command === 'family100to') {
        if (conn.family100to[m.chat]) {
            return conn.reply(m.chat, '🚩 Masih ada sesi Family 100 Toram yang belum selesai.\nGunakan *!nyerahto* untuk menyerah.', m);
        }

        const daftarSoal = [
            {
                soal: "Sebutkan nama kota yang ada di Toram Online!",
                jawaban: [
                    { jawab: 'sofya city', poin: 10 },
                    { jawab: 'el scaro', poin: 10 },
                    { jawab: 'hora diomedea', poin: 10 },
                    { jawab: 'eink lang', poin: 10 },
                    { jawab: 'nov satercia', poin: 10 },
                    { jawab: 'Draco Town', poin: 10 },
                    { jawab: 'Erva tronc', poin: 10 },
                    { jawab: 'rumah admin', poin: 5 }
                ]
            }
        ];

        const dipilih = daftarSoal[0];

        let chatId = m.chat;
        conn.family100to[chatId] = {
            id: +new Date,
            msg: await conn.reply(chatId, `❓ *Family 100 TO Dimulai!*\n\n${dipilih.soal}\n⏳ Jawab dalam 2 menit!`, m),
            soal: dipilih.soal,
            jawaban: dipilih.jawaban,
            terjawab: [],
            poin: {}
        };

        setTimeout(() => {
            if (conn.family100to[chatId]) {
                let teks = `⏰ *Waktu habis!*\n\n📋 Jawaban yang benar:\n`;
                for (let j of conn.family100to[chatId].jawaban) {
                    teks += `• ${j.jawab} (${j.poin} poin)\n`;
                }

                if (Object.keys(conn.family100to[chatId].poin).length) {
                    teks += `\n🏆 *Skor pemain:*\n`;
                    let skor = Object.entries(conn.family100to[chatId].poin).sort((a, b) => b[1] - a[1]);
                    skor.forEach(([user, poin], i) => {
                        teks += `${i + 1}. @${user.split('@')[0]} → ${poin} poin\n`;
                    });
                }

                conn.reply(chatId, teks.trim(), conn.family100to[chatId].msg, {
                    mentions: Object.keys(conn.family100to[chatId].poin)
                });

                delete conn.family100to[chatId];
            }
        }, timeout);

    } else if (command === 'nyerahto') {
        let room = conn.family100to[m.chat];
        if (!room) return conn.reply(m.chat, '🚫 Tidak ada sesi Family 100 Toram yang sedang berlangsung.', m);

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

        delete conn.family100to[m.chat];
    }
};

family100toHandler.before = async function (m, { conn }) {
    conn.family100to = conn.family100to || {};
    let room = conn.family100to[m.chat];
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

        delete conn.family100to[m.chat];
    }
};

family100toHandler.command = ['family100to', 'nyerahto'];
family100toHandler.help = ['family100to', 'nyerahto'];
family100toHandler.tags = ['game'];
family100toHandler.limit = false;
family100toHandler.premium = false;

module.exports = family100toHandler;
