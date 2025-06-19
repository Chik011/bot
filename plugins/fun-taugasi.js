const fetch = require('node-fetch'); // Tetap dibutuhkan jika Anda punya modul lain yang pakai fetch

// Kumpulan fakta atau kutipan tentang Pengetahuan di Indonesia
const quotesIndonesia = [
  "Indonesia adalah negara kepulauan terbesar di dunia, dengan lebih dari 17.500 pulau.",
  "Gunung Jayawijaya (Puncak Jaya) di Papua adalah satu-satunya gunung di Indonesia yang puncaknya bersalju abadi.",
  "Danau Toba di Sumatera Utara adalah danau vulkanik terbesar di dunia.",
  "Komodo, kadal terbesar di dunia, hanya dapat ditemukan secara alami di Pulau Komodo, Rinca, Gili Motang, dan Flores.",
  "Rafflesia arnoldii, bunga terbesar di dunia, adalah flora endemik Sumatera.",
  "Candi Borobudur di Magelang, Jawa Tengah, adalah kuil Buddha terbesar di dunia.",
  "Indonesia memiliki lebih dari 700 bahasa daerah yang berbeda, menjadikannya salah satu negara dengan keanekaragaman bahasa tertinggi.",
  "Mata uang resmi Indonesia adalah Rupiah (IDR).",
  "Pancasila adalah dasar negara Republik Indonesia, terdiri dari lima sila.",
  "Indonesia adalah produsen kopi terbesar keempat di dunia.",
  "Suku Baduy di Banten adalah salah satu suku asli Indonesia yang masih memegang teguh tradisi nenek moyang mereka.",
  "Tari Saman dari Aceh diakui sebagai Warisan Budaya Tak Benda oleh UNESCO.",
  "Pulau Bali dijuluki 'Pulau Dewata' karena mayoritas penduduknya beragama Hindu dan memiliki banyak pura.",
  "Indonesia adalah salah satu 'Ring of Fire' dunia, dengan banyak gunung berapi aktif.",
  "Wayang Kulit adalah seni pertunjukan tradisional Indonesia yang telah diakui UNESCO sebagai Masterpiece of Oral and Intangible Heritage of Humanity.",
  "Bendera Indonesia bernama 'Sang Saka Merah Putih', merah melambangkan keberanian dan putih melambangkan kesucian.",
  "Sate adalah hidangan khas Indonesia yang terdiri dari potongan daging yang ditusuk dan dipanggang, lalu disajikan dengan bumbu.",
  "Upacara Ngaben di Bali adalah upacara kremasi jenazah yang megah.",
  "Pulau Weh di ujung barat Indonesia merupakan titik nol kilometer Indonesia.",
  "Taman Nasional Lorentz di Papua adalah situs Warisan Dunia UNESCO yang memiliki keanekaragaman hayati yang luar biasa."
];

let handler = async (m, { conn }) => {
  try {
    // Ambil kutipan atau fakta acak dari array
    const randomIndex = Math.floor(Math.random() * quotesIndonesia.length);
    const randomQuote = quotesIndonesia[randomIndex];

    conn.reply(m.chat, `Tahukah Kamu?\n\n“${randomQuote}”`, m);
  } catch (e) {
    console.error("Error mengambil kutipan lokal:", e);
    conn.reply(m.chat, 'Gagal mengambil kutipan. Ada masalah internal.', m);
  }
};

handler.help = ['taugasih'];
handler.tags = ['fun'];
handler.command = /^(taugasih)$/i;
handler.limit = false;
handler.admin = false;
handler.fail = null;

module.exports = handler;