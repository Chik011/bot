let handler = async (m, { conn }) => {
  let text = m.text || ''
  let body = text.trim().toLowerCase()

  const prefixes = ['.', ''] // titik & tanpa prefix

  let matched = prefixes.some(prefix => body === prefix + 'laurens')

  if (!matched) return // Bukan target kita, abaikan

  const boost = pickRandom([
    "Ya, ada apa?",
    "Aku di sini, ada yang bisa dibantu?",
    "Laurens hadir!",
    "Memanggilku?",
    "Aku mendengarmu, katakan saja...",
    "Hai! Ada yang bisa Laurens bantu?",
    "Bot Laurens siap membantu!",
    "Kamu memanggil?",
    "Laurens online!",
    "Butuh bantuan apa?"
  ])

  await m.reply(boost)
}

handler.custom = true // Ini WAJIB agar handler tetap dijalankan
module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
