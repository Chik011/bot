let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `iya ${Math.floor(Math.random() * 100)} ${pickRandom(['ada apa', 'kenapa', ', kamu siapa'])} ?
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['', ''].map(v => 'laurens' + v + ' <text>')
handler.tags = ['kerang']
handler.customPrefix = /(\laurens$)/
handler.command = /^laurens()$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

