let handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${pickRandom(['kapan kapan','1 jam','2 jam','3 jam','4 jam','10 tahun','1 tahun','1 bulan','1 minggu','1 hari','besok','lusa','minggu depan','bulan depan','tahun depan'])}
`.trim(), m, m.mentionedJid ? {
  contextInfo: {
    mentionedJid: m.mentionedJid
  }
} : {})
}
handler.help = ['kapan <teks>']
handler.tags = ['kerang']
handler.customPrefix = /(\apan$)/
handler.command = /^k()$/i
handler.owner = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
