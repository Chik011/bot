let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${Math.floor(Math.random() * 100)} ${pickRandom(["Aku Laurens, bot siap membantu!",
      "Hai! Ada yang bisa kubantu?",
      "Laurens di sini, ngomong aja ya.",
      "Butuh bantuan? Tanyakan ke Laurens!",
      "Aku bot sederhana, tapi siap menemani kamu."])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = [''].map(v => 'laurens')
handler.tags = ['kerang']
handler.customPrefix = /(\?$)/
handler.command = /^laurens?$/i
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

