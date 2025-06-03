console.log('✅ testfix.js aktif')

module.exports = {
  command: ['testfix'],
  help: ['testfix'],
  tags: ['tools'],
  handler: async function (m) {
    console.log('📩 testfix dipanggil')
    try {
      await m.reply('✅ testfix berhasil dipanggil')
    } catch (error) {
      console.error('Terjadi kesalahan saat mengirim balasan:', error)
    }
  }
}
