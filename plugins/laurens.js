/**
 * Laurens mention handler for WA bot using Baileys.
 * 
 * Responds with a random friendly message whenever the exact word "laurens" is mentioned in a chat message.
 * Ignores status messages, non-text messages, and avoids crashing on errors.
 */

const { areJidsSameUser } = require('@adiwajshing/baileys')

// Precompile regex for performance: match whole word "laurens" case insensitive
const LAURENS_REGEX = /\blaurens\b/i

// Array of friendly responses
const RESPONSES = [
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
]

/**
 * Handler function.
 * @param {Object} m - The message object from Baileys
 * @param {Object} param1 - Additional parameters, including connection
 */
let handler = async (m, { conn }) => {
    try {
        // Ignore status messages or messages without text content
        if (m.isStatus) return
        const text = (m.text || '') // get text content safely
        if (!text) return

        // Check if text contains the whole word "laurens"
        if (!LAURENS_REGEX.test(text)) return

        // Select a random response
        const response = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]

        // Send response mentioning the sender using proper mention JID technique
        await conn.sendMessage(m.chat, {
            text: response,
            mentions: [m.sender],
        }, { quoted: m })

    } catch (error) {
        // Optional: log errors gracefully, prevent crashing
        console.error('Error in Laurens handler:', error)
    }
}

// Disable command parsing so it works on any message containing the word "laurens"
handler.command = false

// Tag for help command categorization (if you use help list somewhere)
handler.help = ['laurens']

// General tag for this handler type
handler.tags = ['general']

module.exports = handler

