const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, args, command }) => {
  await conn.reply(m.chat, wait, m);

  try {
    // Data tempat leveling berdasarkan rentang level karakter
    const levelData = [
      {
        range: "1-40",
        mobs: [{ name: "Pova", location: "Lonogo Canyon (Ngarai Lonogo)" }]
      },
      {
        range: "40-55",
        mobs: [{ name: "Bone Dragonewt", location: "Ancient Empress Tomb: Area 1 (Makam Ratu Kuno: Area 1)" }]
      },
      {
        range: "55-70",
        bosses: [
          { name: "Flare Volg (Hard)", level: "55-62" },
          { name: "Flare Volg (Nightmare)", level: "62-70" }
        ],
        location: "Fiery Volcano: Lava Trail (Lereng Merapi: Jejak Lava)"
      },
      {
        range: "70-85",
        mobs: [{ name: "Demon Gate", location: "Underground Ruins: B1 (Reruntuhan Bawah Tanah: B1)" }]
      },
      {
        range: "85-100",
        bosses: [
          { name: "Minotaur (Hard)", level: "85-92" },
          { name: "Minotaur (Nightmare)", level: "92-100" }
        ],
        location: "Ruined Temple: Forum (Kuil Hancur: Forum)"
      },
      {
        range: "100-115",
        mobs: [{ name: "Commander Golem", location: "Golem Factory (Pabrik Golem)" }]
      },
      {
        range: "115-130",
        bosses: [
          { name: "Evil God Cultist (Hard)", level: "115-122" },
          { name: "Evil God Cultist (Nightmare)", level: "122-130" }
        ],
        location: "Small Demi Machina Factory: Storage (Pabrik Demi Machina Kecil: Gudang)"
      },
      {
        range: "130-145",
        mobs: [{ name: "Ardent Tyrant", location: "Blazing Graben (Jurang Berkobar)" }]
      },
      {
        range: "145-160",
        bosses: [
          { name: "Boss Roga (Hard)", level: "145-152" },
          { name: "Boss Roga (Nightmare)", level: "152-160" }
        ],
        location: "Warmog Forest (Hutan Warmog)"
      },
      {
        range: "160-175",
        mobs: [{ name: "Finpen", location: "Garden of Sublimation (Taman Sublimasi)" }]
      },
      {
        range: "175-190",
        bosses: [
          { name: "Imitator (Hard)", level: "175-182" },
          { name: "Imitator (Nightmare)", level: "182-190" }
        ],
        location: "Novas Residencia (Kediaman Novas)"
      },
      {
        range: "190-205",
        mobs: [{ name: "Gopher", location: "Fort Solunar (Benteng Solunar)" }]
      },
      {
        range: "205-220",
        bosses: [
          { name: "Gravicep (Hard)", level: "205-212" },
          { name: "Gravicep (Nightmare)", level: "212-220" }
        ],
        location: "Komorebi Shrine: Main Hall (Kuil Komorebi: Aula Utama)"
      },
      {
        range: "220-235",
        mobs: [{ name: "Arboreus", location: "Komorebi Shrine: Tree of Creation (Kuil Komorebi: Pohon Pencipta)" }]
      },
      {
        range: "235-250",
        bosses: [
          { name: "Verde (Hard)", level: "235-242" },
          { name: "Verde (Nightmare)", level: "242-250" }
        ],
        location: "Wanderers' Plains: Distorted Chamber (Dataran Pengembara: Ruangan Terdistorsi)"
      },
      {
        range: "250-265",
        mobs: [{ name: "Twilight Dragon", location: "Stellaluna Coast (Pantai Stellaluna)" }]
      },
      {
        range: "265-280",
        bosses: [
          { name: "Tyrant Machina (Hard)", level: "265-272" },
          { name: "Tyrant Machina (Nightmare)", level: "272-280" }
        ],
        location: "Magic Waste Site: Deepest Part (Situs Limbah Sihir: Bagian Terdalam)"
      },
      {
        range: "280-295",
        mobs: [{ name: "Evil Eye", location: "Monster's Forest (Hutan Monster)" }]
      },
      {
        range: "295-300", // Level cap saat ini
        bosses: [
          { name: "Fallen Angel (Hard)", level: "295-300" },
          { name: "Fallen Angel (Nightmare)", level: "295-300" }
        ],
        location: "Caelus Facility (Fasilitas Caelus)"
      }
    ];

    if (command === 'lvl', 'lvlg') { // Command diganti menjadi 'lvl'
      const inputLevel = parseInt(args[0]);
      if (isNaN(inputLevel) || inputLevel <= 0) {
        throw '🔍 Contoh penggunaan: *.lvl 50* atau *.alllvl* untuk menampilkan semua tempat leveling.';
      }

      const result = levelData.find(data => {
        const [min, max] = data.range.split('-').map(Number);
        return inputLevel >= min && inputLevel <= max;
      });

      if (!result) {
        throw `🚫 Tidak ada rekomendasi tempat leveling untuk level ${inputLevel}. Coba level lain atau gunakan *.alllvl*.`;
      }

      let teks = `🔎 *Rekomendasi Leveling untuk Level ${inputLevel}:*\n\n`;
      
      if (result.mobs) {
        result.mobs.forEach(mob => {
          teks += `👹 Mob: ${mob.name}\n`;
          teks += `📍 Lokasi: ${mob.location}\n\n`;
        });
      }

      if (result.bosses) {
        teks += `👻 Boss:\n`;
        result.bosses.forEach(boss => {
          teks += ` - ${boss.name} (Lv ${boss.level})\n`;
        });
        teks += `📍 Lokasi: ${result.location}\n\n`;
      }

      await conn.reply(m.chat, teks, m);

    } else if (command === 'alllvl') { // Command diganti menjadi 'alllvl'
      let teks = `📘 *Daftar Semua Rekomendasi Leveling:*\n\n`;
      for (let data of levelData) {
        teks += `📊 *Level ${data.range}*\n`;
        if (data.mobs) {
          data.mobs.forEach(mob => {
            teks += `👹 Mob: ${mob.name}\n`;
            teks += `📍 Lokasi: ${mob.location}\n\n`;
          });
        }
        if (data.bosses) {
          data.bosses.forEach(boss => {
            teks += `👻 Boss: ${boss.name} (Lv ${boss.level})\n`;
          });
          teks += `📍 Lokasi: ${data.location}\n\n`;
        }
      }
      await conn.reply(m.chat, teks.trim(), m);
    }

  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, err.toString(), m);
  }
};

handler.command = ['lvl', 'alllvl', ]; // Perbarui command yang didaftarkan
handler.tags = ['toram'];
handler.help = ['lvl [level]', 'alllvl']; // Perbarui bantuan perintah
handler.limit = false;

module.exports = handler;