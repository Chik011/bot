const wait = 'Tunggu sebentar...';

let handler = async (m, { conn }) => {
  await conn.reply(m.chat, wait, m);

  try {
    // 🔧 Ganti bagian ini aja!
    const data = [
      {
        teamName: 'tim king jawa',
        members: ['rend', 'Albany'],
        times: {
          mimyu: '40',
          rudish: '43'
        }
      },
      {
        teamName: 'tim duo nubie',
        members: ['Savita', 'hanica'],
        times: {
          mimyu: '1:28',
          rudish: '2:35'
        }
      },
      {
        teamName: 'tim Godbeyonder',
        members: ['kimizui', 'grewup'],
        times: {
          rudish: '48',
          mimyu: '59'
        }
      },
      {
        teamName: 'tim nameless',
        members: ['zancy', 'shinizami'],
        times: {
          rudish: '24',
          mimyu: '14'
        }
      },
      {
        teamName: 'tim OW',
        members: ['orpheuz', 'windsdy'],
        times: {
          rudish: '19',
          mimyu: '12'
        }
      },
      {
        teamName: 'tim lid',
        members: ['laurns', 'vin'],
        times: {
          rudish: '30',
          mimyu: '24'
        }
      }
    ];

    const knownBosses = ['mimyu', 'rudish'];
    let results = [];

    for (let team of data) {
      let totalSeconds = 0;
      let bossTimes = {};

      for (let boss of knownBosses) {
        const timeStr = team.times[boss];
        if (!timeStr) {
          bossTimes[boss] = null;
          continue;
        }

        let seconds = 0;
        if (timeStr.includes(':')) {
          const [min, sec] = timeStr.split(':').map(Number);
          seconds = min * 60 + sec;
        } else {
          seconds = parseInt(timeStr);
        }

        totalSeconds += seconds;
        bossTimes[boss] = { timeStr, seconds };
      }

      results.push({
        teamName: team.teamName,
        members: team.members,
        bossTimes,
        totalSeconds
      });
    }

    results.sort((a, b) => a.totalSeconds - b.totalSeconds);

    let output = `🏁 *Ranking Semua Tim (Terkecil ke Terbesar)*\n\n`;

    results.forEach((team, i) => {
      const minutes = Math.floor(team.totalSeconds / 60);
      const seconds = team.totalSeconds % 60;
      const formattedTotal = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

      output += `*${i + 1}. ${team.teamName}*\n`;
      output += `👥 *Anggota*: ${team.members.join(', ')}\n`;
      output += `👹 *Boss:*\n`;

      for (let boss of knownBosses) {
        const b = team.bossTimes[boss];
        output += `• ${boss}: ${b ? b.timeStr : '-'}\n`;
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
