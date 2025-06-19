const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, args, command }) => {
  await conn.reply(m.chat, wait, m);

  try {
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
        range: "70-95",
        bosses: [
          { name: "Masked Warrior (Pendekar Beratopeng) - (Hard)", level: "70-79" },
          { name: "Masked Warrior (Pendekar Beratopeng) - (Nightmare)", level: "79-95" }
        ],
        location: "Land Under Cultivation: Hill (Tanah Pertanian: Tanah Tinggi)"
      },
      {
        range: "95-112",
        bosses: [
          { name: "Masked Warrior (Pendekar Beratopeng) - (Ultimate)", location_detail: "Land Under Cultivation: Hill (Tanah Pertanian: Tanah Tinggi)" }
        ],
        alternatives: [
          { type: "Mini Boss", name: "Don Yeti", location: "Polde Ice Valley (Lembah Es Polde)" }
        ]
      },
      {
        range: "112-125",
        bosses: [
          { name: "Cerberus (Nightmare)", location_detail: "Spring of Rebirth: Top (Mata Air Kelahiran: Puncak)" }
        ]
      },
      {
        range: "125-129",
        mini_bosses: [
          { name: "Lapin The Necromancer (Dukun Lapin)", location_detail: "Trace of Dark River (Sungai Kegelapan)", note: "Simpan material \"Lapin's Souls\", kamu dapat xp tambahan dari side quest di Noble Spirit's Lv83 atau kamu dapat menjualnya dengan harga tinggi di Papan." }
        ]
      },
      {
        range: "129-146",
        bosses: [
          { name: "Cerberus (Ultimate)", location_detail: "Spring of Rebirth: Top (Mata Air Kelahiran: Puncak)" }
        ],
        alternatives: [
          { type: "Boss", name: "Memecoleolus (Ultimate)", level: "132-146", location: "Dark Castle: Area 2 (Istana Gelap: Area 2)" },
          { type: "Miniboss", name: "Builder Golem (Builder Golem)", level: "132-143", location: "Huge Crysta Factory: 3rd Floor (Pabrik Crysta Raksasa: Lantai 3)" }
        ]
      },
      {
        range: "146-162",
        bosses: [
          { name: "Venena Coenubia (Hard)", location_detail: "Ultimea Palace: Throne (Istana Ultimea: Takhta)" }
        ],
        alternatives: [
          { type: "Boss", name: "Ifrid (Ultimate)", level: "146-154", location: "Blazing Graben: Deepest Part (Graben Membara: Bagian Terdalam)" },
          { type: "Boss", name: "York (Ultimate)", level: "154-166", location: "Huge Crysta Factory: Storage (Pabrik Crysta Raksasa: Gudang)" },
          { type: "Miniboss", name: "Super Death Mushroom (Jamur Super Mampus)", level: "143-158", location: "Monster's Forest: Animal Trail (Hutan Monster: Jalan Hewan)" },
          { type: "Miniboss", name: "Commander Golem (Komandan Golem)", level: "146-162", location: "Lufenas Mansion: Entrance (Mansion Lufenas: Pintu Masuk)" }
        ]
      },
      {
        range: "162-179",
        bosses: [
          { name: "Venena Coenubia (Nightmare)", location_detail: "Ultimea Palace: Throne (Istana Ultimea: Takhta)" }
        ],
        alternatives: [
          { type: "Boss", name: "Mozto Machina (Ultimate)", level: "162-172", location: "Large Demi Machina Factory A4" },
          { type: "Miniboss", name: "Altoblepas", level: "166-182", location: "Rokoko Plains" }
        ]
      },
      {
        range: "179-182",
        mini_bosses: [
          { name: "Altoblepas", location_detail: "Rokoko Plains (Dataran Rokoko)" }
        ],
        alternatives: [
          { type: "Boss", name: "Maton Sword (Pedang Maton) - (Ultimate)", level: "176-190", location: "Buried Tower: Entrance (Menara Penembus Bumi: Pintu Masuk)" },
          { type: "Miniboss", name: "Goldenia", level: "179-194", location: "Elf Mountains Watchtower (Pegunungan Elf: Menara Kawal)" }
        ]
      },
      {
        range: "182-199",
        bosses: [
          { name: "Venena Coenubia (Ultimate)", location_detail: "Ultimea Palace: Throne (Istana Ultimea: Takhta)" }
        ],
        alternatives: [
          { type: "Boss", name: "Maton Sword (Pedang Maton) - (Ultimate)", level: "176-190", location: "Buried Tower: Entrance (Menara Penembus Bumi: Pintu Masuk)" },
          { type: "Boss", name: "Demonic Quasar (Quasar Jahanam) - (Nightmare)", level: "182-193", location: "Morga Wasteland: Deepest Area (Padang Morga: Area Terdalam)" },
          { type: "Boss", name: "Mom Fluck (Mama Fluck) - (Ultimate)", level: "190-199", location: "Forgotten Cave (Gua Pelupa)" },
          { type: "Boss", name: "Seele Zauga (Ultimate)", level: "193-209", location: "Shrine of the Goddess of Species (Kuil Dewi Spesies)" },
          { type: "Miniboss", name: "Goldenia", level: "179-194", location: "Elf Mountains: Area 3 (Pegunungan Elf: Area 3)" },
          { type: "Miniboss", name: "Frenzy Viola (Violangkara)", level: "194-204", location: "Morthell Swell: Area 3 (Bongkahan Morthell: Area 3)" }
        ]
      },
      {
        range: "199-215",
        bosses: [
          { name: "Finstern the Dark Dragon (Finstern si Naga Kegelapan) - Ultimate", location_detail: "Dark Dragon Shrine: Near the Top (Kuil Naga Kegelapan: Dekat Puncak)" }
        ],
        alternatives: [
          { type: "Boss", name: "Demonic Quasar (Nightmare)", level: "199-212", location: "Morga Wasteland: Deepest Area (Padang Morga: Area Terdalam)" },
          { type: "Miniboss", name: "Frenzy Viola", level: "194-204", location: "Morthell Swell: Area 3 (Bongkahan Morthell: Area 3)" },
          { type: "Miniboss", name: "Demonic Eye", level: "204-221", location: "Dea Ruinea", note: "Material \"Suspicious Old Boxes\" cukup mahal kamu dapat menjualnya di papan." }
        ]
      },
      {
        range: "215-227",
        bosses: [
          { name: "Kuzto (Ultimate)", location_detail: "Labilans Sector: Square (Distrik Labilans: Alun-Alun)" }
        ],
        alternatives: [
          { type: "Boss", name: "Arachnidemon (Nightmare)", level: "227-243", location: "Arche Valley: Depths (Lembah Arche: Area Terdalam)" },
          { type: "Boss", name: "Gravicep (Ultimate)", level: "215-230", location: "Recetacula Sector: Depot Rooftop (Distrik Recetacula: Atap Depot)" },
          { type: "Miniboss", name: "Espectro", level: "213-227", location: "Arche Valley: Area 1 (Lembah Arche: Area 1)" },
          { type: "Miniboss", name: "Armasite", level: "199-202", location: "Fractum Sector: Area 1 (Distrik Fractum: Area 1)" },
          { type: "Miniboss", name: "Canemosfish", level: "202-213", location: "Recetacula Sector: Area 1 (Distrik Recetacula: Area 1)" }
        ]
      },
      {
        range: "227-244",
        bosses: [
          { name: "Arachnidemon (Ultimate)", location_detail: "Arche Valley: Depths (Lembah Arche: Area Terdalam)" }
        ],
        alternatives: [
          { type: "Boss", name: "Venena Metacoenubia (Ultimate)", level: "227-244", location: "Neo Plastida" },
          { type: "Boss", name: "Vulture (Ultimate)", level: "233-239", location: "Geist Desert A4" },
          { type: "Boss", name: "Hexter (Ultimate)", level: "239-244", location: "Witch's Wood A4" },
          { type: "Miniboss", name: "Rhinosaur", level: "227-234", location: "Fugitive Lake Swamp A3" },
          { type: "Miniboss", name: "Bullamius", level: "234-246", location: "Storage Yard A2" }
        ]
      },
      {
        range: "244-253",
        bosses: [
          { name: "Ferzen the Rock Dragon (Ferzen si Naga Batu) - (Ultimate)", location_detail: "Guardian Forest: Giant Tree (Hutan Lindung: Pohon Raksasa)" }
        ],
        alternatives: [
          { type: "Boss", name: "Gemma (Ultimate)", level: "244-253", location: "Furgitive Lake Swamp A4" },
          { type: "Boss", name: "Reliza (Ultimate)", level: "244-253", location: "Manna waterfront" },
          { type: "Miniboss", name: "Ignitrus", level: "246-254", location: "Vulcani Crater Base" }
        ]
      },
      {
        range: "253-266",
        bosses: [
          { name: "Trickster Dragon Mimyugon (Nightmare)", location_detail: "Operation Zone A4" }
        ],
        alternatives: [
          { type: "Miniboss", name: "Ignitrus", level: "246-256", location: "Vulcani Crater Base" },
          { type: "Miniboss", name: "Brassozard", level: "256-262", location: "Operation Zone A3" },
          { type: "Miniboss", name: "Trus", level: "262-277", location: "Propulsion System Zone A3" }
        ]
      },
      {
        range: "266-272",
        bosses: [
          { name: "Red Ash Dragon Rudis (Hard)", location_detail: "Espuma Dome A4" }
        ],
        alternatives: [
          { type: "Boss", name: "Walican (Nightmare)", level: "266-272", location: "Jabali Kubwa A4" },
          { type: "Miniboss", name: "Trus", level: "262-277", location: "Propulsion System Zone A3" }
        ]
      },
      {
        range: "272-285",
        bosses: [
          { name: "Trickster Dragon Mimyugon (Ultimate)", location_detail: "Operation Zone A4" }
        ],
        alternatives: [
          { type: "Boss", name: "Red Ash Dragon Rudis (Nightmare)", level: "272-285", location: "Espuma Dome A4" },
          { type: "Miniboss", name: "Trus", level: "262-277", location: "Propulsion System Zone A3" },
          { type: "Miniboss", name: "Charugon", level: "272-282", location: "Boma Konda A1" },
          { type: "Miniboss", name: "Capo Profundo", level: "282-285", location: "Puerta Island A2" }
        ]
      },
      // Tambahkan rentang level dan data terbaru di sini jika ada
      // Untuk rentang 285-300+ atau level cap terbaru, Anda bisa menambahkannya
      // di sini. Contoh:
      {
        range: "285-300",
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

    if (command === 'lvl') { // Command diganti menjadi 'lvl'
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

      teks += `📊 *Level ${result.range}*\n`;

      if (result.mobs) {
        result.mobs.forEach(mob => {
          teks += `👹 Mob: ${mob.name}\n`;
          teks += `📍 Lokasi: ${mob.location}\n\n`;
        });
      }

      if (result.bosses) {
        teks += `👻 Boss:\n`;
        result.bosses.forEach(boss => {
          teks += `↳ ${boss.name}`;
          if (boss.level) teks += ` | Level ${boss.level}`;
          if (boss.location_detail) teks += `\nLokasi: ${boss.location_detail}`;
          teks += `\n`;
        });
        if (result.location && !result.bosses.some(b => b.location_detail)) { // Add general location if not specific to each boss
          teks += `📍 Lokasi: ${result.location}\n`;
        }
        teks += `\n`;
      }

      if (result.mini_bosses) {
        teks += `👾 Mini Boss:\n`;
        result.mini_bosses.forEach(mboss => {
          teks += `↳ ${mboss.name}`;
          if (mboss.level) teks += ` | Level ${mboss.level}`;
          if (mboss.location_detail) teks += `\nLokasi: ${mboss.location_detail}`;
          if (mboss.note) teks += `\n*Catatan*: ${mboss.note}`;
          teks += `\n`;
        });
        teks += `\n`;
      }


      if (result.alternatives && result.alternatives.length > 0) {
        teks += `✨ Alternatif:\n`;
        result.alternatives.forEach(alt => {
          teks += `↳ ${alt.type}: ${alt.name}`;
          if (alt.level) teks += ` | Level ${alt.level}`;
          if (alt.location) teks += `\n  Lokasi: ${alt.location}`;
          teks += `\n`;
        });
        teks += `\n`;
      }


      await conn.reply(m.chat, teks.trim(), m);

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
          teks += `👻 Boss:\n`;
          data.bosses.forEach(boss => {
            teks += `↳ ${boss.name}`;
            if (boss.level) teks += ` | Level ${boss.level}`;
            if (boss.location_detail) teks += `\nLokasi: ${boss.location_detail}`;
            teks += `\n`;
          });
          if (data.location && !data.bosses.some(b => b.location_detail)) {
            teks += `📍 Lokasi: ${data.location}\n`;
          }
          teks += `\n`;
        }
        if (data.mini_bosses) {
          teks += `👾 Mini Boss:\n`;
          data.mini_bosses.forEach(mboss => {
            teks += `↳ ${mboss.name}`;
            if (mboss.level) teks += ` | Level ${mboss.level}`;
            if (mboss.location_detail) teks += `\nLokasi: ${mboss.location_detail}`;
            if (mboss.note) teks += `\n*Catatan*: ${mboss.note}`;
            teks += `\n`;
          });
          teks += `\n`;
        }

        if (data.alternatives && data.alternatives.length > 0) {
          teks += `✨ Alternatif:\n`;
          data.alternatives.forEach(alt => {
            teks += `↳ ${alt.type}: ${alt.name}`;
            if (alt.level) teks += ` | Level ${alt.level}`;
            if (alt.location) teks += `\n  Lokasi: ${alt.location}`;
            teks += `\n`;
          });
          teks += `\n`;
        }
        teks += `---\n\n`; // Pemisah antar rentang level
      }
      await conn.reply(m.chat, teks.trim(), m);
    }

  } catch (err) {
    console.error(err);
    await conn.reply(m.chat, err.toString(), m);
  }
};

handler.command = ['lvl', 'alllvl']; // Command yang didaftarkan
handler.tags = ['toram'];
handler.help = ['lvl [level]', 'alllvl']; // Bantuan perintah
handler.limit = false;

module.exports = handler;