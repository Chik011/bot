const {
  default: makeWASocket,
  useSingleFileAuthState,
  makeInMemoryStore,
  jidDecode,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const P = require("pino");

const store = makeInMemoryStore({ logger: P().child({ level: "silent" }) });
const { state, saveState } = useSingleFileAuthState('./auth.json');

let profiles = {};
const profileFile = './profiles.json';
if (fs.existsSync(profileFile)) profiles = JSON.parse(fs.readFileSync(profileFile));
function saveProfiles() {
  fs.writeFileSync(profileFile, JSON.stringify(profiles, null, 2));
}

function extractMentionedOrRepliedId(msg) {
  const context = msg.message?.extendedTextMessage?.contextInfo;
  if (context?.mentionedJid?.length > 0) return context.mentionedJid[0];
  if (context?.participant) return context.participant;
  return null;
}

async function startBot() {
  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
  });

  store.bind(sock.ev);
  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    if (!text || (!text.startsWith(".editprofil") && !text.startsWith(".profil"))) return;

    // Gunakan fallback yang benar untuk userId
    const userId = msg.key.participant ?? msg.key.remoteJid;

    // Handle .editprofil nama=.., umur=.., kota=..
    if (text.startsWith(".editprofil")) {
      const args = text.replace(".editprofil", "").trim().split(",");
      if (!profiles[userId]) profiles[userId] = { nama: "", umur: "", kota: "" };

      args.forEach(arg => {
        const [key, value] = arg.split("=");
        if (key && value && ["nama", "umur", "kota"].includes(key.trim())) {
          profiles[userId][key.trim()] = value.trim();
        }
      });

      saveProfiles();
      return sock.sendMessage(sender, { text: "✅ Profil berhasil diupdate." }, { quoted: msg });
    }

    // Handle .profil (sendiri, reply, atau mention)
    if (text.startsWith(".profil")) {
      let targetId = extractMentionedOrRepliedId(msg) ?? userId;

      // Jika profil tidak ditemukan, coba fallback ke remoteJid (untuk chat pribadi)
      let p = profiles[targetId];
      if (!p && targetId !== msg.key.remoteJid) {
        targetId = msg.key.remoteJid;
        p = profiles[targetId];
      }
      if (!p) {
        return sock.sendMessage(sender, { text: "❌ Profil belum dibuat oleh pengguna ini." }, { quoted: msg });
      }

      const contact = targetId.split("@")[0];
      const title = targetId === userId ? "👤 Profil Anda" : `📄 Profil @${contact}`;

      await sock.sendMessage(sender, {
        text: `${title}:\n• Nama: ${p.nama}\n• Umur: ${p.umur}\n• Kota: ${p.kota}`,
        mentions: [targetId],
      }, { quoted: msg });
    }
  });
}

startBot();