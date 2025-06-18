let tictactoe = {};

const tictactoeHandler = async (m, { conn, command, text }) => {
  const chatId = m.chat;

  // Menyerah
  if (command === 'nyerah') {
    if (!tictactoe[chatId]) return conn.reply(chatId, '🚫 Tidak ada sesi TicTacToe yang aktif.', m);

    const game = tictactoe[chatId];
    const loser = m.sender;
    const winner = game.playerX === loser ? game.playerO : game.playerX;

    conn.reply(chatId, `🏳️ *${conn.getName(loser)} menyerah!*\n🏆 *${conn.getName(winner)} menang!*`, m, {
      mentions: [loser, winner]
    });
    delete tictactoe[chatId];
    return;
  }

  // Mulai game baru
  if (command === 'tictactoe') {
    if (tictactoe[chatId]) return conn.reply(chatId, '⚠️ Masih ada game yang berjalan!\nKetik *!nyerah* untuk menyerah.', m);

    const mentionUser = m.mentionedJid?.[0];
    if (!mentionUser) return conn.reply(chatId, '📌 Tag lawan main kamu!\nContoh: *!tictactoe @username*', m);

    if (mentionUser === m.sender) return conn.reply(chatId, '🚫 Kamu tidak bisa bermain melawan diri sendiri.', m);

    const board = Array(9).fill('⬜');
    const turn = m.sender;

    tictactoe[chatId] = {
      board,
      playerX: m.sender,
      playerO: mentionUser,
      turn
    };

    return conn.reply(chatId, `🎮 *TicTacToe Dimulai!*\n❌ = @${tictactoe[chatId].playerX.split('@')[0]}\n⭕ = @${tictactoe[chatId].playerO.split('@')[0]}\n\n${renderBoard(board)}\n\nGiliran: @${turn.split('@')[0]}\nKetik *angka 1-9* untuk memilih posisi.`, m, {
      mentions: [tictactoe[chatId].playerX, tictactoe[chatId].playerO]
    });
  }

  // Menjawab
  if (tictactoe[chatId] && /^[1-9]$/.test(text)) {
    const game = tictactoe[chatId];
    if (![game.playerX, game.playerO].includes(m.sender)) return;

    if (m.sender !== game.turn) return conn.reply(chatId, `⏳ Bukan giliranmu!`, m);

    const pos = parseInt(text) - 1;
    if (game.board[pos] !== '⬜') return conn.reply(chatId, `❌ Posisi sudah terisi!`, m);

    game.board[pos] = m.sender === game.playerX ? '❌' : '⭕';
    game.turn = m.sender === game.playerX ? game.playerO : game.playerX;

    const winner = checkWinner(game.board);
    if (winner) {
      const winnerName = winner === '❌' ? conn.getName(game.playerX) : conn.getName(game.playerO);
      conn.reply(chatId, `🎉 *${winnerName} menang!*\n\n${renderBoard(game.board)}`, m, {
        mentions: [game.playerX, game.playerO]
      });
      delete tictactoe[chatId];
    } else if (game.board.every(cell => cell !== '⬜')) {
      conn.reply(chatId, `🤝 *Seri!*\n\n${renderBoard(game.board)}`, m);
      delete tictactoe[chatId];
    } else {
      conn.reply(chatId, `✅ Posisi dipilih!\n\n${renderBoard(game.board)}\n\nGiliran: @${game.turn.split('@')[0]}`, m, {
        mentions: [game.turn]
      });
    }
  }
};

function renderBoard(board) {
  return board.map((cell, i) => ((i + 1) % 3 === 0 ? `${cell}\n` : cell)).join('');
}

function checkWinner(board) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // baris
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // kolom
    [0, 4, 8], [2, 4, 6]             // diagonal
  ];
  for (const [a, b, c] of lines) {
    if (board[a] !== '⬜' && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

tictactoeHandler.command = ['tictactoe', 'nyerah'];
tictactoeHandler.help = ['tictactoe @user', 'nyerah'];
tictactoeHandler.tags = ['game'];
tictactoeHandler.limit = false;
tictactoeHandler.premium = false;

module.exports = tictactoeHandler;
