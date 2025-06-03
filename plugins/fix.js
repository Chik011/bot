module.exports = {
  command: ['fix'],
  tags: ['tools'],
  help: ['fix'],
  group: true,
  admin: true,
  handler: async function (m) {
    const chat = m.chat

    this.msgqueque = this.msgqueque || []
    this.queue = this.queue || {}

    let before = this.msgqueque.length
    this.msgqueque = this.msgqueque.filter(id => !id.includes(chat))

    if (this.queue[chat]) delete this.queue[chat]

    await m.reply(`✅ Sesi/perintah grup berhasil dibersihkan.\n🧹 ${before - this.msgqueque.length} queue dibersihkan.`)
  }
}
