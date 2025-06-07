/**
 * Laurens response handler for WA bot.
 * 
 * Responds with a random message when the command 'laurens' is invoked.
 */

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

let handler = async (m, { conn }) => {
    // Generate a random number and pick a random response
    const randomNumber = Math.floor(Math.random() * 100);
    const randomResponse = pickRandom(['ada apa', 'kenapa', 'kamu siapa']);

    // Construct the reply message
    const replyMessage = `iya ${randomNumber} ${randomResponse}`;

    // Send the reply, mentioning the user if applicable
    await conn.reply(m.chat, replyMessage.trim(), m, m.mentionedJid ? {
        contextInfo: {
            mentionedJid: m.mentionedJid
        }
    } : {});
}

// Help command configuration
handler.help = ['', ''].map(v => 'laurens' + v + ' <text>');
handler.tags = ['kerang'];

// Update command regex to remove the question mark
handler.command = /^laurens$/i;

// Permissions
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;

// Fail handling
handler.fail = null;

// Export the handler
module.exports = handler;
