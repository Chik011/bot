let tictactoe = {};

const tictactoeHandler = async (m, { conn, command, text }) => {
    const chatId = m.chat;
    const sender = m.sender;

    if (typeof sender !== 'string' || !sender) {
        console.error('Sender is not a valid string:', sender);
        return conn.reply(chatId, 'Terjadi kesalahan: Informasi pengirim tidak valid.', m);
    }

    // --- Command: .ttt ---
    if (command === 'ttt') {
        if (tictactoe[chatId]) {
            return conn.reply(chatId, '⚠️ Game sudah dibuat. Ketik *.join* untuk bergabung.', m);
        }

        tictactoe[chatId] = {
            board: Array(9).fill('⬜'),
            playerX: sender,
            playerO: null,
            turn: null,
            status: 'waiting'
        };

        let nameX = sender.split('@')[0];
        try { nameX = await conn.getName(sender); } catch (e) {}

        return conn.reply(chatId, `🎮 *TicTacToe Dimulai!*\n👤 Pemain pertama (❌): @${sender.split('@')[0]}\n\nMenunggu pemain kedua... Ketik *.join* untuk bergabung.`, m, {
            mentions: [sender]
        });
    }

    // --- Command: .join ---
    if (command === 'join') {
        const game = tictactoe[chatId];
        if (!game || game.status !== 'waiting') {
            return conn.reply(chatId, '🚫 Tidak ada game yang menunggu pemain di grup ini.', m);
        }

        if (sender === game.playerX) {
            return conn.reply(chatId, '😅 Kamu tidak bisa bermain melawan dirimu sendiri.', m);
        }

        game.playerO = sender;
        game.turn = game.playerX;
        game.status = 'active';

        let nameX = game.playerX.split('@')[0];
        let nameO = game.playerO.split('@')[0];
        try {
            nameX = await conn.getName(game.playerX);
            nameO = await conn.getName(game.playerO);
        } catch (e) {}

        return conn.reply(chatId,
            `✅ Pemain kedua (⭕) bergabung: @${sender.split('@')[0]}\n\n🎮 *Game Dimulai!*\n❌ = @${game.playerX.split('@')[0]}\n⭕ = @${game.playerO.split('@')[0]}\n\n${renderBoard(game.board)}\n\nGiliran: @${game.turn.split('@')[0]}\nKetik angka 1–9 untuk memilih posisi.`,
            m,
            { mentions: [game.playerX, game.playerO, game.turn] });
    }

    // --- Command: .nyerah ---
    if (command === 'nyerah') {
        const game = tictactoe[chatId];
        if (!game) return conn.reply(chatId, '🚫 Tidak ada sesi TicTacToe yang aktif.', m);

        if (sender !== game.playerX && sender !== game.playerO) {
            return conn.reply(chatId, '❌ Kamu bukan bagian dari game ini.', m);
        }

        const winner = sender === game.playerX ? game.playerO : game.playerX;
        let loserName = sender.split('@')[0];
        let winnerName = winner?.split('@')[0];
        try {
            loserName = await conn.getName(sender);
            winnerName = await conn.getName(winner);
        } catch (e) {}

        conn.reply(chatId, `🏳️ *${loserName} menyerah!*\n🏆 *${winnerName} menang!*`, m, { mentions: [sender, winner] });
        delete tictactoe[chatId];
        return;
    }

    // --- Input Angka 1-9 ---
    if (tictactoe[chatId] && /^[1-9]$/.test(text)) {
        const game = tictactoe[chatId];

        if (game.status !== 'active') {
            return conn.reply(chatId, '⏳ Game belum dimulai. Tunggu pemain kedua join dengan *.join*', m);
        }

        if (![game.playerX, game.playerO].includes(sender)) {
            return conn.reply(chatId, '🚫 Kamu bukan pemain dalam game ini.', m);
        }

        if (sender !== game.turn) {
            return conn.reply(chatId, `⏳ Bukan giliranmu! Giliran: @${game.turn.split('@')[0]}`, m, {
                mentions: [game.turn]
            });
        }

        const pos = parseInt(text) - 1;
        if (game.board[pos] !== '⬜') {
            return conn.reply(chatId, `❌ Posisi ${text} sudah diisi. Pilih yang lain.`, m);
        }

        game.board[pos] = sender === game.playerX ? '❌' : '⭕';

        const winnerSymbol = checkWinner(game.board);
        if (winnerSymbol) {
            const winnerId = winnerSymbol === '❌' ? game.playerX : game.playerO;
            let winnerName = winnerId.split('@')[0];
            try { winnerName = await conn.getName(winnerId); } catch (e) {}

            conn.reply(chatId, `🎉 *${winnerName} menang!* 🎉\n\n${renderBoard(game.board)}`, m, {
                mentions: [winnerId]
            });
            delete tictactoe[chatId];
        } else if (game.board.every(cell => cell !== '⬜')) {
            conn.reply(chatId, `🤝 *Seri!* Tidak ada yang menang.\n\n${renderBoard(game.board)}`, m);
            delete tictactoe[chatId];
        } else {
            game.turn = sender === game.playerX ? game.playerO : game.playerX;
            conn.reply(chatId, `✅ Posisi ${text} dipilih!\n\n${renderBoard(game.board)}\n\nGiliran: @${game.turn.split('@')[0]}`, m, {
                mentions: [game.turn]
            });
        }
    }
};

// Render papan
function renderBoard(board) {
    let b = '';
    for (let i = 0; i < 9; i++) {
        b += board[i];
        if ((i + 1) % 3 === 0 && i !== 8) b += '\n';
    }
    return b;
}

// Cek pemenang
function checkWinner(board) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of wins) {
        if (board[a] !== '⬜' && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }
    return null;
}

// Ekspor handler
tictactoeHandler.command = ['ttt', 'join', 'nyerah'];
tictactoeHandler.help = ['ttt', 'join', 'nyerah'];
tictactoeHandler.tags = ['game'];
tictactoeHandler.limit = false;
tictactoeHandler.premium = false;

module.exports = tictactoeHandler;