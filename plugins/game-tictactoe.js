let tictactoe = {};

const tictactoeHandler = async (m, { conn, command, text }) => {
    const chatId = m.chat;
    const sender = m.sender;

    if (typeof sender !== 'string' || !sender) {
        return conn.reply(chatId, '❌ Pengirim tidak valid.', m);
    }

    // --- .ttt ---
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

        let nameX = await conn.getName(sender).catch(() => sender.split('@')[0]);
        return conn.reply(chatId,
            `🎮 *TicTacToe Dimulai!*\n👤 Pemain pertama (❌): @${sender.split('@')[0]}\n\nMenunggu pemain kedua... Ketik *.join* untuk bergabung.`,
            m, { mentions: [sender] });
    }

    // --- .join ---
    if (command === 'join') {
        const game = tictactoe[chatId];
        if (!game || game.status !== 'waiting') {
            return conn.reply(chatId, '🚫 Tidak ada game yang menunggu pemain.', m);
        }

        if (sender === game.playerX) {
            return conn.reply(chatId, '😅 Kamu tidak bisa bermain melawan dirimu sendiri.', m);
        }

        game.playerO = sender;
        game.turn = game.playerX;
        game.status = 'active';

        let nameX = await conn.getName(game.playerX).catch(() => game.playerX.split('@')[0]);
        let nameO = await conn.getName(game.playerO).catch(() => game.playerO.split('@')[0]);

        return conn.reply(chatId,
            `✅ Pemain kedua (⭕): @${sender.split('@')[0]}\n\n🎮 *Game Dimulai!*\n❌ = @${game.playerX.split('@')[0]}\n⭕ = @${game.playerO.split('@')[0]}\n\n${renderBoard(game.board)}\n\nGiliran: @${game.turn.split('@')[0]}\nKetik angka 1–9 untuk memilih posisi.`,
            m, { mentions: [game.playerX, game.playerO, game.turn] });
    }

    // --- .nyerah ---
    if (command === 'nyerah') {
        const game = tictactoe[chatId];
        if (!game) return conn.reply(chatId, '🚫 Tidak ada game yang aktif.', m);

        if (![game.playerX, game.playerO].includes(sender)) {
            return conn.reply(chatId, '❌ Kamu bukan pemain game ini.', m);
        }

        const winner = sender === game.playerX ? game.playerO : game.playerX;
        let loserName = await conn.getName(sender).catch(() => sender.split('@')[0]);
        let winnerName = await conn.getName(winner).catch(() => winner?.split('@')[0]);

        conn.reply(chatId, `🏳️ *${loserName} menyerah!*\n🏆 *${winnerName} menang!*`, m, { mentions: [sender, winner] });
        delete tictactoe[chatId];
    }
};

tictactoeHandler.command = ['ttt', 'join', 'nyerah'];
tictactoeHandler.tags = ['game'];
tictactoeHandler.help = ['ttt', 'join', 'nyerah'];
tictactoeHandler.limit = false;
tictactoeHandler.premium = false;
