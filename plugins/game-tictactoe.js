let tictactoe = {};

const handler = async (m, { conn, command, text }) => {
    const id = m.chat;
    const sender = m.sender;

    if (command === 'ttt') {
        if (tictactoe[id]) return m.reply('❌ Game sedang berjalan. Ketik *.nyerah* untuk mengakhiri.');

        tictactoe[id] = {
            board: Array(9).fill('⬜'),
            X: sender,
            O: null,
            turn: null,
            status: 'wait'
        };

        return m.reply(`🎮 Game dimulai!\n❌ Pemain pertama: @${sender.split('@')[0]}\nKetik *.join* untuk bergabung.`, null, {
            mentions: [sender]
        });
    }

    if (command === 'join') {
        const game = tictactoe[id];
        if (!game) return m.reply('❌ Tidak ada game yang berjalan.');
        if (game.status !== 'wait') return m.reply('⚠️ Game sudah mulai.');
        if (sender === game.X) return m.reply('😅 Kamu tidak bisa melawan diri sendiri.');

        game.O = sender;
        game.turn = game.X;
        game.status = 'play';

        return m.reply(`⭕ Pemain kedua: @${sender.split('@')[0]}\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`, null, {
            mentions: [game.X, game.O, game.turn]
        });
    }

    if (command === 'nyerah') {
        const game = tictactoe[id];
        if (!game) return m.reply('❌ Tidak ada game.');
        if (![game.X, game.O].includes(sender)) return m.reply('❌ Kamu bukan pemain.');
        const menang = sender === game.X ? game.O : game.X;
        delete tictactoe[id];
        return m.reply(`🏳️ @${sender.split('@')[0]} menyerah!\n🏆 @${menang.split('@')[0]} menang!`, null, {
            mentions: [sender, menang]
        });
    }

    // Deteksi angka 1-9 untuk main
    if (/^[1-9]$/.test(text) && tictactoe[id]) {
        const game = tictactoe[id];
        const turn = game.turn;

        if (game.status !== 'play') return;
        if (![game.X, game.O].includes(sender)) return;
        if (sender !== turn) return m.reply(`⏳ Bukan giliranmu, giliran @${turn.split('@')[0]}`, null, { mentions: [turn] });

        const pos = Number(text) - 1;
        if (game.board[pos] !== '⬜') return m.reply('❌ Sudah diisi!');

        game.board[pos] = sender === game.X ? '❌' : '⭕';

        const win = cek(game.board);
        if (win) {
            const pemenang = game.board[pos] === '❌' ? game.X : game.O;
            delete tictactoe[id];
            return m.reply(`🎉 @${pemenang.split('@')[0]} menang!\n\n${render(game.board)}`, null, {
                mentions: [pemenang]
            });
        }

        if (!game.board.includes('⬜')) {
            delete tictactoe[id];
            return m.reply(`🤝 Seri!\n\n${render(game.board)}`);
        }

        game.turn = sender === game.X ? game.O : game.X;
        return m.reply(`✅ Posisi ${text} dipilih.\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`, null, {
            mentions: [game.turn]
        });
    }
};

handler.command = ['ttt', 'join', 'nyerah'];
handler.tags = ['game'];
handler.help = ['ttt', 'join', 'nyerah'];
handler.limit = false;

module.exports = handler;

// Render papan
function render(b) {
    return `${b[0]}${b[1]}${b[2]}\n${b[3]}${b[4]}${b[5]}\n${b[6]}${b[7]}${b[8]}`;
}

// Cek menang
function cek(b) {
    const garis = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];
    return garis.some(([a,b1,c]) => b[a] !== '⬜' && b[a] === b[b1] && b[a] === b[c]);
            }
