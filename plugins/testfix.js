console.log('✅ testfix.js aktif')

module.exports = {
  command: ['testfix'],
  help: ['testfix'],
  tags: ['tools'],
  handler: async function (m) {
    console.log('📩 testfix dipanggil')
    await m.reply('✅ testfix berhasil dipanggil')
  }
}
