const fetch = require('node-fetch'); // pastikan sudah install via: npm install node-fetch

let handler = async (m, { text, conn }) => {
  // Hanya merespon jika pesan mengandung kata "laurens"
  if (!text || !/(laurens)/i.test(text)) return;

  try {
    const response = await askGemini(text);
    conn.reply(m.chat, response, m);
  } catch (err) {
    console.error(err);
    conn.reply(m.chat, 'Maaf, Laurens sedang error 😔', m);
  }
};

handler.help = ['laurens <pertanyaan>'];
handler.tags = ['ai', 'chat'];
handler.customPrefix = null; // tidak menggunakan prefix khusus
handler.command = null; // tidak menggunakan command regex
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;

module.exports = handler;

// Fungsi pemanggil Google Gemini API dengan identitas Laurens
async function askGemini(userPrompt) {
  const apiKey = 'AIzaSyC7pdUvBcUjfGButfzv1i1oeYERfJ7_dHo'; // Ganti dengan API key kamu
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  const identity = `Kamu adalah Laurens, asisten pribadi virtual yang ramah, sopan, dan cerdas. Jawablah sebagai Laurens, bukan Google atau Gemini.`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        { role: 'user', parts: [{ text: identity }] },
        { role: 'user', parts: [{ text: userPrompt }] }
      ]
    })
  });

  const json = await res.json();

  if (json.error) throw new Error(json.error.message);
  const output = json.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, aku tidak tahu harus menjawab apa.';
  return output;
}
