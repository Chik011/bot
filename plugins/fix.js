let handler = async (conn, m, args) => {
  try {
    await conn.reply(m.chat, '🔧 Memperbaiki sesi...', m); // selalu sertakan `m` sebagai pesan yang di-reply

    conn.queue = conn.queue || {};
    conn.msgqueque = conn.msgqueque || [];
    conn.session = conn.session || {};
    conn.game = conn.game || {};

    let removed = 0;

    if (conn.queue[m.chat]) {
      delete conn.queue[m.chat];
      removed++;
    }

    let before = conn.msgqueque.length;
    conn.msgqueque = conn.msgqueque.filter(id => !id.includes(m.chat));
    removed += (before - conn.msgqueque.length);

    if (conn.session[m.chat]) {
      delete conn.session[m.chat];
      removed++;
    }

    if (conn.game[m.chat]) {
      delete conn.game[m.chat];
      removed++;
    }

    await conn.reply(m.chat, `✅ Sesi grup telah diperbaiki. Dihapus: ${removed} entri.`, m);

  } catch (e) {
    console.error(e);
    await conn.reply(m.chat, '❌ Gagal memperbaiki sesi. Coba lagi nanti.', m);
  }
};

handler.command = handler.help = ['fix', 'perbaiki'];
handler.tags = ['tools'];
handler.group = true;
handler.admin = true;
handler.limit = false;

module.exports = handler;
