let handler = async (m, { conn }) => {
  let text = m.text || ''
  let body = text.trim().toLowerCase()

  // Daftar prefix yang ingin kamu dukung
  const prefixes = [''] // titik dan tanpa prefix

  // Deteksi jika pesan cocok dengan salah satu prefix + 'laurens'
  let matched = prefixes.some(prefix => body === prefix + 'laurens')

  if (!matched) return // kalau bukan, hentikan di sini

  // Jika cocok, kirimkan respons
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

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
