module.exports = {
  command: /^fix$/i,
  tags: ['owner'],
  help: ['fix'],
  group: true,
  admin: true, // bisa diubah ke owner kalau mau
  handler: async function (m) {
    const chat = m.chat

    this.msgqueque = this.msgqueque || []
    this.queue = this.queue || {}

    // Hapus dari msgqueque
    let before = this.msgqueque.length
    this.msgqueque = this.msgqueque.filter(id => !id.includes(chat))

    // Hapus dari queue
    if (this.queue[chat]) delete this.queue[chat]

    await m.reply(`✅ Satu sesi/perintah berhasil dihapus untuk grup ini.\n\n🧹 ${before - this.msgqueque.length} queue dibersihkan.`)
  }
}
