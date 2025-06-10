let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${pickRandom(['gak tau','mantan mu','pacar mu','peliharaan','monyet','calon ibu','ibumu mu',])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['siapa <teks>?']
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^siapa$/i
handler.owner = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
