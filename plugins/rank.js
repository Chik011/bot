const wait = 'Tunggu sebentar...';

let handler = async (m, { conn }) => {
  await conn.reply(m.chat, wait, m);

  try {
    const rawData = `
tim king jawa = rend & Albany rudish 43 mimyu 40
tim duo nubie = Savita & hanica mimyu 1:28 rudish 2:35
tim Godbeyonder = kimizui & grewup rudish 48 mimyu 59
    `.trim();

    const teams = rawData.split('\n');
    const knownBosses = ['mimyu', 'rudish']; // urutan tetap

    let results = [];

    for (let line of teams) {
      const [teamNameRaw, membersRaw] = line.split('=');
      if (!teamNameRaw || !membersRaw) continue;

      const teamName = teamNameRaw.trim();
      const tokens = membersRaw.trim().split(/\s+/);

      let memberNames = [];
      let bossTimes = {};
      let totalSeconds = 0;
      let mode = 'members';

      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (mode === 'members') {
          if (/^\d+(:\d+)?$/.test(token)) {
            mode = 'boss';
            i--;
            continue;
          }

          if (token === '&') {
            const prev = memberNames.pop() || '';
            const next = tokens[i + 1] || '';
            memberNames.push(`${prev} & ${next}`);
            i++;
          } else {
            memberNames.push(token);
          }
        } else if (mode === 'boss') {
          const bossName = tokens[i];
          const timeStr = tokens[i + 1];

          if (!timeStr || !/^\d+(:\d+)?$/.test(timeStr)) continue;

          let seconds = 0;
          if (timeStr.includes(':')) {
            const [min, sec] = timeStr.split(':').map(Number);
            seconds = min * 60 + sec;
          } else {
            seconds = parseInt(timeStr);
          }

          bossTimes[bossName] = {
            timeStr,
            seconds
          };

          totalSeconds += seconds;
          i++;
        }
      }

      results.push({ teamName, memberNames, bossTimes, totalSeconds });
    }

    results.sort((a, b) => a.totalSeconds - b.totalSeconds);

    let output = `🏁 *Ranking Semua Tim (Terkecil ke Terbesar)*\n\n`;

    results.forEach((team, i) => {
      const minutes = Math.floor(team.totalSeconds / 60);
      const seconds = team.totalSeconds % 60;
      const formattedTotal = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

      const membersList = team.memberNames.join(', ');

      output += `*${i + 1}. ${team.teamName}*\n`;
      output += `👥 *Anggota*: ${membersList}\n`;
      output += `👹 *Boss:*\n`;

      for (let boss of knownBosses) {
        const bossData = team.bossTimes[boss];
        output += `• ${boss}: ${bossData ? bossData.timeStr : '-'}\n`;
      }

      output += `⏱️ *Total*: ${formattedTotal}\n\n`;
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
