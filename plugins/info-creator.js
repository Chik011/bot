var name = global.nameowner
var numberowner = global.numberowner
var gmail = global.mail
var instagram = global.instagram
var bio = global.bioowner
var gc = global.groupowner

const {
  default: makeWASocket,
  proto
} = require("@adiwajshing/baileys");

var handler = async (m, { conn }) => {
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Sy;Bot;;;
FN: ${name}
item.ORG: Creator Bot
item1.TEL;waid=${numberowner}:${numberowner}
item1.X-ABLabel:Nomor Creator Bot
item2.EMAIL;type=INTERNET:${gmail}
item2.X-ABLabel:Email Owner
item3.URL:${instagram}
item3.X-ABLabel:Instagram
item4.X-ABNOTE:${bio}
END:VCARD`

  const sentMsg = await conn.sendMessage(
    m.chat,
    {
      contacts: {
        displayName: 'Owner Bot',
        contacts: [{ vcard }]
      }
    }
  )

  await conn.reply(m.chat, `
📛 *Nama:* ${name}
📱 *Nomor:* wa.me/${numberowner}
📧 *Email:* ${gmail}
🌐 *Instagram:* ${instagram}
📝 *Bio:* ${bio}
👥 *Grup Owner:* ${gc}
`.trim(), m)
}
handler.command = handler.help = ['owner', 'creator']
handler.tags = ['info']
handler.limit = false
module.exports = handler
