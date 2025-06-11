const axios = require('axios');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  conn.sessionAI = conn.sessionAI || {};

  if (!text) throw `🚩 Gunakan perintah: ${usedPrefix + command} enable / disable`;

  if (text.toLowerCase() === "enable") {
    conn.sessionAI[m.sender] = { sessionChat: [] };
    m.reply("✅ Chat session Laurens berhasil *diaktifkan*.");
  } else if (text.toLowerCase() === "disable") {
    delete conn.sessionAI[m.sender];
    m.reply("❌ Chat session Laurens berhasil *dimatikan*.");
  } else {
    throw `⚠️ Pilihan hanya: *enable* atau *disable*`;
  }
};

// Intercept pesan
handler.before = async (m, { conn }) => {
  conn.sessionAI = conn.sessionAI || {};

  // Filter pesan yang tidak relevan
  if (m.isBaileys || m.fromMe || !m.text) return;
  if (!conn.sessionAI[m.sender]) return;

  const lowerText = m.text.trim().toLowerCase();
  if (!lowerText.startsWith("laurens")) return;

  // Hilangkan kata "laurens" dari pesan agar tidak dikirim ke AI
  const userMessage = m.text.replace(/^laurens[\s,:-]*/i, '');

  const session = conn.sessionAI[m.sender].sessionChat || [];

  // Format pesan ke Gemini
  const contextPrompt = [
    {
      role: "user",
      parts: [{ text: "Kamu adalah Laurens, asisten pribadi virtual yang ramah, sopan, dan cerdas. Jawablah sebagai Laurens, bukan Google atau Gemini." }]
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

    // Simpan sesi untuk percakapan berikutnya
    conn.sessionAI[m.sender].sessionChat = [
      ...session.slice(-10), // simpan max 10 riwayat
      userMessage,
      output
    ];
  } catch (e) {
    console.error("Gemini API Error:", e?.response?.data || e.message || e);
    m.reply('😔 Maaf, Laurens mengalami error.\n' + (e?.response?.data?.error?.message || ''));
  }
};

handler.command = ['autoai'];
handler.help = ['autoai enable', 'autoai disable'];
handler.tags = ['ai'];
handler.limit = false;

module.exports = handler;
