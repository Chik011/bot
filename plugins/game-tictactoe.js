let tictactoe = {};

const tictactoeHandler = async (m, { conn, command, text, mentionedJid }) => {
    const chatId = m.chat;
    const sender = m.sender; // Pemain yang mengirim command

    // --- Command: .nyerah ---
    if (command === 'nyerah') {
        if (!tictactoe[chatId]) {
            return conn.reply(chatId, '🚫 Tidak ada sesi TicTacToe yang aktif di grup ini.', m);
        }

        const game = tictactoe[chatId];
        const loser = sender;
        
        // Pastikan yang menyerah adalah salah satu pemain yang terlibat dalam game
        if (loser !== game.playerX && loser !== game.playerO) {
            return conn.reply(chatId, '❌ Kamu bukan bagian dari game ini, jadi tidak bisa menyerah.', m);
        }

        const winner = game.playerX === loser ? game.playerO : game.playerX;

        conn.reply(chatId, `🏳️ *${conn.getName(loser)} menyerah!*\n🏆 *${conn.getName(winner)} menang!*`, m, {
            mentions: [loser, winner]
        });
        delete tictactoe[chatId]; // Hapus sesi game
        return;
    }

    // --- Command: .ttt ---
    if (command === 'ttt') {
        if (tictactoe[chatId]) {
            return conn.reply(chatId, '⚠️ Masih ada game yang berjalan di grup ini!\nKetik *!nyerah* untuk menyerah jika ingin memulai yang baru.', m);
        }

        const board = Array(9).fill('⬜');
        let playerX = sender;
        let playerO = null;

        // Cek apakah ada mention lawan
        if (mentionedJid && mentionedJid[0]) {
            playerO = mentionedJid[0];
            if (playerO === playerX) {
                return conn.reply(chatId, '😅 Tidak bisa bermain melawan diri sendiri. Mention temanmu untuk bermain.', m);
            }
        } else {
            // Jika tidak ada mention, minta pengguna untuk mention lawan
            return conn.reply(chatId, '👥 Kamu perlu mention lawan untuk bermain TicTacToe!\nContoh: *.ttt @tagteman*', m);
        }

        tictactoe[chatId] = {
            board,
            playerX,
            playerO,
            turn: playerX // Player X selalu memulai game
        };

        return conn.reply(chatId, `🎮 *TicTacToe Dimulai!*\n❌ = @${playerX.split('@')[0]}\n⭕ = @${playerO.split('@')[0]}\n\n${renderBoard(board)}\n\nGiliran: @${tictactoe[chatId].turn.split('@')[0]}\nKetik *angka 1-9* untuk memilih posisi.`, m, {
            mentions: [playerX, playerO, tictactoe[chatId].turn]
        });
    }

    // --- Menangani Giliran Pemain ---
    // Hanya memproses jika ada game aktif dan pesan adalah angka 1-9
    if (tictactoe[chatId] && /^[1-9]$/.test(text)) {
        const game = tictactoe[chatId];

        // Pastikan yang bermain adalah salah satu dari playerX atau playerO
        if (sender !== game.playerX && sender !== game.playerO) {
            return conn.reply(chatId, '🚫 Kamu bukan pemain dalam game ini.', m);
        }

        // Pastikan ini giliran pemain yang benar
        if (sender !== game.turn) {
            return conn.reply(chatId, `⏳ Bukan giliranmu! Giliran @${game.turn.split('@')[0]}`, m, {
                mentions: [game.turn]
            });
        }

        const pos = parseInt(text) - 1; // Konversi input ke indeks array (0-8)

        // Cek apakah posisi valid dan belum terisi
        if (pos < 0 || pos >= 9 || game.board[pos] !== '⬜') {
            return conn.reply(chatId, `❌ Posisi ${text} tidak valid atau sudah terisi! Pilih angka 1-9 pada kotak kosong.`, m);
        }

        // Tentukan simbol pemain (X atau O)
        game.board[pos] = (sender === game.playerX) ? '❌' : '⭕';

        const winnerSymbol = checkWinner(game.board);

        if (winnerSymbol) {
            // Ada pemenang
            const winnerId = (winnerSymbol === '❌') ? game.playerX : game.playerO;
            const winnerName = conn.getName(winnerId);
            conn.reply(chatId, `🎉 *${winnerName} menang!* 🎉\n\n${renderBoard(game.board)}`, m, {
                mentions: [winnerId]
            });
            delete tictactoe[chatId]; // Hapus sesi game
        } else if (game.board.every(cell => cell !== '⬜')) {
            // Seri (semua kotak terisi dan tidak ada pemenang)
            conn.reply(chatId, `🤝 *Seri! Tidak ada yang menang.*\n\n${renderBoard(game.board)}`, m);
            delete tictactoe[chatId]; // Hapus sesi game
        } else {
            // Lanjut ke giliran berikutnya
            game.turn = (sender === game.playerX) ? game.playerO : game.playerX;
            conn.reply(chatId, `✅ Posisi ${text} dipilih!\n\n${renderBoard(game.board)}\n\nGiliran: @${game.turn.split('@')[0]}`, m, {
                mentions: [game.turn]
            });
        }
    }
};

// Fungsi untuk merender papan TicTacToe
function renderBoard(board) {
    let rendered = '';
    for (let i = 0; i < 9; i++) {
        rendered += board[i];
        if ((i + 1) % 3 === 0 && i !== 8) { // Tambahkan newline setelah setiap 3 sel, kecuali di akhir
            rendered += '\n';
        }
    }
    return rendered;
}

// Fungsi untuk mengecek pemenang
function checkWinner(board) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
        [0, 4, 8], [2, 4, 6]             // Diagonal
    ];
    for (const [a, b, c] of lines) {
        if (board[a] !== '⬜' && board[a] === board[b] && board[b] === board[c]) {
            return board[a]; // Mengembalikan simbol pemenang ('❌' atau '⭕')
        }
    }
    return null; // Tidak ada pemenang
}

// Export handler
tictactoeHandler.command = ['ttt', 'nyerah'];
tictactoeHandler.help = ['ttt @user', 'nyerah'];
tictactoeHandler.tags = ['game'];
tictactoeHandler.limit = false;
tictactoeHandler.premium = false;

module.exports = tictactoeHandler;