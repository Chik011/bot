global.tictactoe = global.tictactoe || {}

const handler = async (m, { conn, command }) => {
  const id = m.chat
  const sender = m.sender
  const game = global.tictactoe[id]

  const angkaCmd = ['1','2','3','4','5','6','7','8','9']

  // Mulai Game
  if (command === 'ttt') {
    if (game) return m.reply('⚠️ Masih ada game berlangsung. Ketik *.nyerah* atau *.nyerahttt* untuk menyerah.')

    global.tictactoe[id] = {
      board: Array.from({ length: 9 }, (_, i) => `${i + 1}`),
      X: sender,
      O: null,
      turn: null,
      status: 'wait'
    }

    return conn.reply(id, `🎮 *TicTacToe Dimulai!*\n❌ Pemain pertama: @${sender.split('@')[0]}\nKetik *.join* untuk bergabung.`, m, {
      mentions: [sender]
    })
  }

  // Join Game
  if (command === 'join') {
    if (!game) return m.reply('⚠️ Tidak ada game untuk diikuti.')
    if (game.status !== 'wait') return m.reply('⚠️ Game sudah dimulai.')
    if (sender === game.X) return m.reply('😅 Kamu tidak bisa lawan diri sendiri.')

    game.O = sender
    game.turn = game.X
    game.status = 'play'

    return conn.reply(id, `⭕ Pemain kedua: @${sender.split('@')[0]}\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`, m, {
      mentions: [game.X, game.O, game.turn]
    })
  }

  // Menyerah
  if (['nyerah', 'nyerahttt'].includes(command)) {
    if (!game) return m.reply('⚠️ Tidak ada game.')
    if (![game.X, game.O].includes(sender)) return m.reply('❌ Kamu bukan pemain dalam game ini.')

    const pemenang = sender === game.X ? game.O : game.X
    delete global.tictactoe[id]

    return conn.reply(id, `🏳️ @${sender.split('@')[0]} menyerah!\n🏆 @${pemenang.split('@')[0]} menang!`, m, {
      mentions: [sender, pemenang]
    })
  }

  // Input angka 1–9
  if (angkaCmd.includes(command)) {
    if (!game || game.status !== 'play') return
    if (![game.X, game.O].includes(sender)) return
    if (sender !== game.turn) {
      return conn.reply(id, `⏳ Giliran: @${game.turn.split('@')[0]}`, m, {
        mentions: [game.turn]
      })
    }

    const pos = parseInt(command) - 1
    if (['❌', '⭕'].includes(game.board[pos])) return m.reply('❌ Posisi sudah diisi.')

    game.board[pos] = sender === game.X ? '❌' : '⭕'

    if (check(game.board)) {
      delete global.tictactoe[id]
      return conn.reply(id, `🎉 @${sender.split('@')[0]} menang!\n\n${render(game.board)}`, m, {
        mentions: [sender]
      })
    }

    if (!game.board.some(cell => /^[1-9]$/.test(cell))) {
      delete global.tictactoe[id]
      return conn.reply(id, `🤝 Seri!\n\n${render(game.board)}`, m)
    }

    game.turn = sender === game.X ? game.O : game.X
    return conn.reply(id, `✅ Posisi ${command} dipilih!\n\n${render(game.board)}\nGiliran: @${game.turn.split('@')[0]}`, m, {
      mentions: [game.turn]
    })
  }
}

handler.command = /^([1-9]|ttt|join|nyerah|nyerahttt)$/i
handler.tags = ['game']
handler.help = ['ttt', 'join', 'nyerah', 'nyerahttt', '1', '2', '3', '4', '5', '6', '7', '8', '9']
handler.limit = false

module.exports = handler

function render(b) {
  return `${format(b[0])}${format(b[1])}${format(b[2])}\n${format(b[3])}${format(b[4])}${format(b[5])}\n${format(b[6])}${format(b[7])}${format(b[8])}`
}

function format(cell) {
  return (cell === '❌' || cell === '⭕') ? cell : `⬜${cell}`
}

function check(b) {
  const win = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ]
  return win.some(([a,b1,c]) => b[a] === b[b1] && b[a] === b[c] && ['❌', '⭕'].includes(b[a]))
                        }
