const wait = 'Tunggu sebentar...';

let handler = async (m, { conn }) => {
  await conn.reply(m.chat, wait, m);

  try {
    // Data input langsung di dalam kode
    const rawData = `
tim king jawa = rend & Albany rudish 43 mimyu 40
tim duo nubie = Savita & hanica mimyu 1:28 rudish 2:35
tim Godbeyonder = kimizui & grewup rudish 48 mimyu 59

    `.trim();

    const teams = rawData.split('\n');
    let results = [];

    for (let line of teams) {
      const [teamNameRaw, membersRaw] = line.split('=');
      if (!teamNameRaw || !membersRaw) continue;

      const teamName = teamNameRaw.trim();
      const members = membersRaw.trim().split(/\s+/);

      let totalSeconds = 0;
      for (let member of members) {
        if (/^\d+(:\d+)?$/.test(member)) {
          if (member.includes(':')) {
            const [min, sec] = member.split(':').map(Number);
            totalSeconds += min * 60 + sec;
          } else {
            totalSeconds += parseInt(member);
          }
        }
      }

      results.push({ teamName, totalSeconds });
    }

    // Urutkan berdasarkan waktu dari yang tercepat
    results.sort((a, b) => a.totalSeconds - b.totalSeconds);

    let output = `🏁 *Ranking Semua Tim (Terkecil ke Terbesar)*\n\n`;

    results.forEach((team, i) => {
      const minutes = Math.floor(team.totalSeconds / 60);
      const seconds = team.totalSeconds % 60;
      const formatted = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
      output += `${i + 1}. ${team.teamName} - ${formatted}\n`;
    });

    await conn.reply(m.chat, output.trim(), m);

  } catch (err) {
    console.error(err);
    throw "🚩 Terjadi kesalahan saat memproses ranking.";
  }
};

handler.command = handler.help = ['rank'];
handler.tags = ['toram'];
handler.limit = false;
handler.premium = false;

module.exports = handler;
