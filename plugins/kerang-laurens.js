const axios = require('axios');

let handler = async (m, { conn }) => {
  // Filter pesan yang tidak relevan
  if (m.isBaileys || m.fromMe || !m.text) return;

  const lowerText = m.text.toLowerCase();
  // Cek apakah menyebut Laurens dalam variasi apa pun
  if (!/(laurens|lauren|lau|rens)/i.test(lowerText)) return;

  // Ambil pesan pengguna tanpa nama panggilan Laurens (opsional)
  const userMessage = m.text.replace(/\b(laurens|lauren|lau|rens)[:,]?\b/gi, '').trim();
  if (!userMessage) return;

  // Sesi per user
  conn.sessionAI = conn.sessionAI || {};
  const session = conn.sessionAI[m.sender]?.sessionChat || [];

  // Format percakapan ke Gemini
  const contextPrompt = [
    {
      role: "user",
      parts: [{ text: "Kamu adalah Laurens, asisten pribadi virtual yang lucu, ramah, dan cerdas. Jawablah sebagai Laurens, bukan Google atau Gemini, dan jawablah secara ringkas dan mudah di mengerti" }]
    },
    ...session.map((msg, i) => ({
      role: i % 2 === 0 ? "user" : "model",
      parts: [{ text: msg }]
    })),
    {
      role: "user",
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const { data } = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=AIzaSyC7pdUvBcUjfGButfzv1i1oeYERfJ7_dHo`,
      { contents: contextPrompt },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, Laurens tidak bisa menjawab.';
    await m.reply(output);

    // Simpan sesi
    conn.sessionAI[m.sender] = {
      sessionChat: [
        ...session.slice(-10),
        userMessage,
        output
      ]
    };
  } catch (e) {
    console.error("Gemini API Error:", e?.response?.data || e.message || e);
    m.reply('😔 Maaf, Laurens mengalami error.\n' + (e?.response?.data?.error?.message || ''));
  }
};

handler.before = handler;
module.exports = handler;
