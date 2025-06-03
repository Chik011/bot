module.exports = {
  command: /^autoreact$/i,
  tags: ['fun'],
  help: ['autoreact'],
  handler: async function (m) {
    await this.sendMessage(m.chat, { text: '✅ Autoreact aktif!' }, { quoted: m })
  }
}
