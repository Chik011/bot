const LAURENS_REGEX = /laurens/i // Regex lebih longgar

let handler = async (m, { conn }) => {
    try {
        // Debug: Log semua pesan masuk
        console.log('DEBUG:', {
            text: m.text,
            body: m.body,
            message: m.message,
            isGroup: m.isGroup,
            isStatus: m.isStatus
        })

        // Dapatkan teks dari berbagai sumber
        const text = m.text || m.body || (m.message && m.message.conversation) || ''
        
        // Cek jika mengandung "laurens" dan bukan status
        if (!text || m.isStatus || !LAURENS_REGEX.test(text)) return

        const responses = [
            "Ya, ada apa?",
            "Aku di sini!",
            "Laurens hadir!",
            "Memanggilku?",
            // ... tambahkan lebih banyak respon
        ]
        
        const response = responses[Math.floor(Math.random() * responses.length)]
        
        // Kirim dengan 2 metode berbeda (pilih salah satu)
        await conn.sendMessage(m.chat, { 
            text: response,
            mentions: [m.sender]
        }, { quoted: m })
        
        // Atau:
        // await conn.reply(m.chat, response, m, { mentions: [m.sender] })

    } catch (error) {
        console.error('ERROR:', error)
    }
}

// Handler settings
handler.help = ['laurens']
handler.tags = ['general']
handler.command = false
handler.group = true // Aktifkan di grup
handler.private = true // Aktifkan di chat pribadi

// Export dengan logging
console.log('Laurens handler loaded') // Pastikan ini muncul saat bot start
module.exports = handler