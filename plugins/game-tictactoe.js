const tictactoeInputHandler = async (m, { conn, text }) => {
    const chatId = m.chat;
    const sender = m.sender;

    if (!tictactoe[chatId]) return;
    if (!/^[1-9]$/.test(text)) return;

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
};

tictactoeInputHandler.command = /^[1-9]$/;
tictactoeInputHandler.customPrefix = false;
tictactoeInputHandler.limit = false;
tictactoeInputHandler.premium = false;

module.exports = [tictactoeHandler, tictactoeInputHandler];
