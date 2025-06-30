global.tictactoe = global.tictactoe || {}; // Simpan game di global

const handler = async (m, { conn, command, text }) => {
    const id = m.chat;
    const sender = m.sender;
    const game = global.tictactoe[id];

    // ─── PERINTAH ─────────────────────────
    if (command === 'ttt') {
        if (game) return m.reply('⚠️ Game sudah dimulai. Ketik *.nyerah* untuk mengakhiri.');

        global.tictactoe[id] = {
            board: Array(9).fill('⬜'),
            X: sender,
            O: null,
            turn: null,
            status: 'wait'
        };

        return conn.reply(id, `🎮 *Game dimulai!*\n❌ Pemain pertama: @${sender.split('@')[0]}\nKetik *.join* untuk bergabung.`, m, {
            mentions: [sender]
        });
    }

    if (command === 'join') {
        if (!game) return m.reply('⚠️ Tidak ada game untuk join.');
        if (game.status !== 'wait') return m.reply('⚠️ Game sudah dimulai.');
        if (sender === game.X) return m.reply('😅 Tidak bisa lawan diri sendiri.');

        game.O = sender;
        game.turn = game.X;
        game.status = 'play';

        return conn.reply(id,
            `⭕ Pemain kedua: @${sender.split('@')[0]}\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`,
            m,
            { mentions: [game.X, game.O, game.turn] });
    }

    if (command === 'nyerah') {
        if (!game) return m.reply('⚠️ Tidak ada game.');
        if (![game.X, game.O].includes(sender)) return m.reply('❌ Kamu bukan pemain.');

        const menang = sender === game.X ? game.O : game.X;
        delete global.tictactoe[id];

        return conn.reply(id, `🏳️ @${sender.split('@')[0]} menyerah!\n🏆 @${menang.split('@')[0]} menang!`, m, {
            mentions: [sender, menang]
        });
    }

    // ─── INPUT ANGKA ───────────────────────
    if (/^[1-9]$/.test(text) && game && game.status === 'play') {
        if (![game.X, game.O].includes(sender)) return;
        if (game.turn !== sender) {
            return conn.reply(id, `⏳ Giliran: @${game.turn.split('@')[0]}`, m, {
                mentions: [game.turn]
            });
        }

        const pos = parseInt(text) - 1;
        if (game.board[pos] !== '⬜') return m.reply('❌ Posisi sudah terisi.');

        game.board[pos] = sender === game.X ? '❌' : '⭕';

        if (isWin(game.board)) {
            const menang = sender;
            delete global.tictactoe[id];
            return conn.reply(id, `🎉 @${menang.split('@')[0]} menang!\n\n${render(game.board)}`, m, {
                mentions: [menang]
            });
        }

        if (!game.board.includes('⬜')) {
            delete global.tictactoe[id];
            return conn.reply(id, `🤝 Seri!\n\n${render(game.board)}`, m);
        }

        game.turn = sender === game.X ? game.O : game.X;
        return conn.reply(id, `✅ Posisi ${text} dipilih.\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`, m, {
            mentions: [game.turn]
        });
    }
};

handler.command = ['ttt', 'join', 'nyerah'];
handler.tags = ['game'];
handler.help = ['ttt', 'join', 'nyerah'];
handler.customPrefix = false;
handler.limit = false;

module.exports = handler;

// ─── FUNGSI BANTUAN ──────────────────────────
function render(b) {
    return `${b[0]}${b[1]}${b[2]}\n${b[3]}${b[4]}${b[5]}\n${b[6]}${b[7]}${b[8]}`;
}

function isWin(b) {
    const win = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return win.some(([a,b1,c]) => b[a] !== '⬜' && b[a] === b[b1] && b[a] === b[c]);
}
