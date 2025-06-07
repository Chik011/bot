const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // set via .env
});
const openai = new OpenAIApi(configuration);

let handler = async (m, { conn }) => {
  const text = m.text || '';
  
  if (/laurens/i.test(text)) {
    const prompt = text.replace(/laurens/i, '').trim() || 'Halo!';

    // Kirim prompt ke OpenAI dan jawab sebagai "Laurens"
    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4", // atau "gpt-3.5-turbo"
        messages: [
          {
            role: "system",
            content: "Kamu adalah AI bernama Laurens, ramah, pintar, dan siap membantu dalam bahasa Indonesia."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      });

      const aiReply = completion.data.choices[0].message.content;

      await conn.reply(m.chat, aiReply, m);
    } catch (err) {
      console.error(err);
      await conn.reply(m.chat, "Maaf, Laurens mengalami gangguan sementara.", m);
    }
  }
};

handler.help = ['laurens <pesan>'];
handler.tags = ['ai'];
handler.command = false;
handler.customPrefix = /^/i;
handler.group = true;
handler.private = true;

handler.fail = null;

module.exports = handler;
