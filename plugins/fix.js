module.exports = {
  command: ['fix'],
  tags: ['tools'],
  help: ['fix'],
  group: true,
  admin: true,
  handler: async function (m) {
    console.log('📥 Fix command dipanggil oleh:', m.sender)

    this.msgqueque = this.msgqueque || []
    this.queue = this.queue || {}

    const chat = m.chat
    const before = this.msgqueque.length
    this.msgqueque = this.msgqueque.filter(id => !id.includes(chat))
    if (this.queue[chat]) delete this.queue[chat]

    await this.sendMessage(m.chat, {
      text: `✅ Sesi diperbaiki.\nDihapus dari queue: ${before - this.msgqueque.length}`
    }, { quoted: m })
  }
}
