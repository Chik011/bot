const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType 
} = require('@adiwajshing/baileys')

let handler = async (m, { conn }) => {
    // Skip if message is from status or doesn't contain text
    if (m.isStatus || !m.text) return
    
    // Check if message contains 'laurens' (case insensitive) as a whole word
    if (/\blaurens\b/i.test(m.text)) {
        const responses = [
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
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        // Send reply with mention
        await conn.sendMessage(m.chat, {
            text: randomResponse,
            mentions: [m.sender]
        }, { quoted: m });
    }
}

// Handler configuration
handler.help = ['laurens'];
handler.tags = ['general'];
handler.command = false; // Disable command handler completely


module.exports = handler;