let qsData = {} // Menyimpan berdasarkan chat ID

let handler = async (m, { conn, command, text, isOwner, participants }) => {
  const id = m.chat
  qsData[id] = qsData[id] || []

  const isGroupAdmin = m.isGroup && participants?.some(p => p.id === m.sender && p.admin)

  switch (command) {
    case 'qsadd':
      if (!isOwner && !isGroupAdmin) {
        return conn.reply(m.chat, '🚫 Hanya *admin grup* atau *owner* yang bisa menambahkan data QS.', m)
      }
      if (!text || text.trim().split(/\s+/).length < 2) {
        return conn.reply(m.chat, '❗ Format salah.\nGunakan: *.qsadd <nama> <reward>*\nContoh: *.qsadd Goblin 3stk Nisel Wood*', m)
      }

      try {
        const parts = text.trim().split(/\s+/)
        const name = parts[0]
        const reward = parts.slice(1).join(' ')

        qsData[id].push({ name, reward })
        return conn.reply(m.chat, `✅ Berhasil menambahkan reward untuk *${name}*`, m)
      } catch (e) {
        console.error(e)
        return conn.reply(m.chat, '❌ Gagal menambahkan data. Cek formatnya ya.', m)
      }

    case 'qs':
      if (!qsData[id].length) {
        return conn.reply(m.chat, '📭 Belum ada data quest serikat di grup ini.\nGunakan *.qsadd* untuk menambahkan.', m)
      }

      let list = `🎁 *Reward Quest Serikat (Grup Ini)*\n\n`

      qsData[id].forEach((item, i) => {
        list += `*${i + 1}. ${item.name}*\n🎉 Reward: ${item.reward}\n\n`
      })

      return conn.reply(m.chat, list.trim(), m)

    case 'qsreset':
      if (!isOwner && !isGroupAdmin) {
        return conn.reply(m.chat, '🚫 Hanya *admin grup* atau *owner* yang bisa mereset data.', m)
      }

      qsData[id] = []
      return conn.reply(m.chat, '♻️ Semua data quest serikat grup ini berhasil direset!', m)

    default:
      return
  }
}

handler.command = ['qsadd', 'qs', 'qsreset']
handler.tags = ['toram']
handler.help = ['qsadd <nama> <reward>', 'qs', 'qsreset']
handler.limit = false
handler.premium = false

module.exports = handler
