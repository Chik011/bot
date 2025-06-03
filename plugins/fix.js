let handler = async (conn, m, args) => {
  await conn.reply(m.chat, '🔧 Memperbaiki sesi...', m); // pesan awal

  try {
    // Bersihkan berbagai session/chat antrian
    conn.queue = conn.queue || {};
    conn.msgqueque = conn.msgqueque || {};
    conn.game = conn.game || {};
    conn.session = conn.session || {};

    let removed = 0;

    if (conn.queue[m.chat]) {
      delete conn.queue[m.chat];
      removed++;
    }

    if (conn.msgqueque instanceof Array) {
      let before = conn.msgqueque.length;
      conn.msgqueque = conn.msgqueque.filter(id => !id.includes(m.chat));
      removed += (before - conn.msgqueque.length);
    }

    if (conn.session[m.chat]) {
      delete conn.session[m.chat];
      removed++;
    }

    if (conn.game[m.chat]) {
      delete conn.game[m.chat];
      removed++;
    }

    await conn.reply(m.chat, `✅ Sesi dibersihkan. Total yang dihapus: ${removed}`, m);

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '🚨 Gagal memperbaiki sesi.', m);
  }
};

handler.command = handler.help = ['fix', 'perbaiki', 'reset'];
handler.tags = ['tools'];
handler.group = false;
handler.admin = true; // hanya admin grup bisa jalankan
handler.limit = false;

module.exports = handler;
