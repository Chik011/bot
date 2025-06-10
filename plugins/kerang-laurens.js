const fetch = require('node-fetch'); // pastikan sudah install: npm install node-fetch

let handler = async (m, { text, conn }) => {
  if (!text || !/(laurens)/i.test(text)) return; // hanya tanggapi kalau ada kata 'laurens'

  try {
    const geminiResponse = await askGemini(text);
    conn.reply(m.chat, geminiResponse, m);
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, 'Maaf, Laurens sedang mengalami gangguan 😔', m);
  }
};

handler.help = ['laurens <pertanyaan>']
handler.tags = ['ai', 'chat']
handler.customPrefix = null // tidak pakai prefix custom
handler.command = null // tidak pakai command
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false
handler.admin = false
handler.botAdmin = false
handler.fail = null

module.exports = handler;

// Fungsi untuk memanggil Google Gemini API
async function askGemini(prompt) {
  const apiKey = 'AIzaSyC7pdUvBcUjfGButfzv1i1oeYERfJ7_dHo'; // Ganti dengan API key kamu
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
          role: 'user'
        }
      ]
    })
  });

  const json = await res.json();

  if (json.error) throw new Error(json.error.message);

  const output = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Aku tidak tahu harus berkata apa.';
  return output;
}
