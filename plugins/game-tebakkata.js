Const wait = 'Tunggu sebentar...'; // Make sure 'Const' is 'const'

let tebakKata = {}; // Objek untuk menyimpan sesi game Tebak Kata

// Daftar kata-kata rahasia dan petunjuknya
const secretWords = [
    { word: "INDONESIA", hint: "Negara kepulauan terbesar." },
    { word: "MONAS", hint: "Monumen nasional di Jakarta." },
    { word: "BOROBUDUR", hint: "Candi Buddha terbesar di dunia." },
    { word: "KOMODO", hint: "Hewan purba endemik Indonesia." },
    { word: "RUPIAH", hint: "Mata uang Indonesia." },
    { word: "JAWA", hint: "Pulau terpadat di Indonesia." },
    { word: "BALI", hint: "Pulau Dewata." },
    { word: "SUMATERA", hint: "Pulau dengan Danau Toba." },
    { word: "PAPUA", hint: "Pulau dengan Puncak Jaya bersalju." },
    { word: "RENDANG", hint: "Makanan khas Padang, pernah jadi makanan terenak di dunia." },
    { word: "PANCASILA", hint: "Dasar negara Indonesia." },
    { word: "GARUDA", hint: "Lambang negara Indonesia." },
    { word: "WAYANG", hint: "Seni pertunjukan tradisional." },
    { word: "ANGKLUNG", hint: "Alat musik tradisional dari bambu." },
    { word: "GUD_EG", hint: "Makanan khas Yogyakarta." }, // Perhatikan underscore untuk spasi/tanda baca
    { word: "BATIK", hint: "Kain tradisional Indonesia yang diakui UNESCO." },
    { word: "SRIWIJAYA", hint: "Kerajaan maritim kuno di Sumatera." },
    { word: "MAJAPAHIT", hint: "Kerajaan besar di Nusantara." },
    { word: "ORA_ET_LABORA", hint: "Moto dari sebuah kota di Sumatera Utara." },
    { word: "PRAMBANAN", hint: "Candi Hindu terbesar di Indonesia." }
];

const MAX_GUESSES = 7; // Jumlah tebakan salah maksimal

const tebakKataHandler = async (m, { conn, command, text }) => {
    const chatId = m.chat;
    const sender = m.sender;

    // Safety check for sender, similar to tictactoe
    if (typeof sender !== 'string' || !sender) {
        console.error('Sender is not a valid string:', sender);
        return conn.reply(chatId, 'Terjadi kesalahan: Informasi pengirim tidak valid.', m);
    }

    // --- Command: .nyerahkata ---
    if (command === 'nyerahkata') {
        if (!tebakKata[chatId]) {
            return conn.reply(chatId, '🚫 Tidak ada sesi Tebak Kata yang aktif.', m);
        }

        const game = tebakKata[chatId];
        conn.reply(chatId, `🏳️ *Game Tebak Kata dihentikan.*\nKata rahasianya adalah: *${game.secretWord}*`, m);
        delete tebakKata[chatId];
        return;
    }

    // --- Command: .tebakkata ---
    if (command === 'tebakkata') {
        if (tebakKata[chatId]) {
            return conn.reply(chatId, '⚠️ Masih ada game Tebak Kata yang berjalan!\nKetik *.nyerahkata* untuk menyerah dan memulai yang baru.', m);
        }

        const randomIndex = Math.floor(Math.random() * secretWords.length);
        const selectedWordData = secretWords[randomIndex];
        const secretWord = selectedWordData.word.toUpperCase();
        const hint = selectedWordData.hint;

        // Inisialisasi papan tebakan dengan underscore
        const guessedLetters = Array(secretWord.length).fill('_');

        // Untuk kata dengan spasi atau karakter non-huruf, isi langsung
        for (let i = 0; i < secretWord.length; i++) {
            if (!/[A-Z]/.test(secretWord[i])) { // Jika bukan huruf
                guessedLetters[i] = secretWord[i];
            }
        }

        tebakKata[chatId] = {
            secretWord,
            hint,
            guessedLetters,
            wrongGuesses: 0,
            players: [sender] // Pemain yang memulai
        };

        const board = renderGuessedWord(guessedLetters);
        return conn.reply(chatId, `🎮 *Game Tebak Kata Dimulai!*\n\n${board}\n\nPetunjuk: *${hint}*\nSisa tebakan salah: *${MAX_GUESSES}*\n\nKetik *huruf* untuk menebak, atau *.tebak [kata]* untuk menebak seluruh kata.`, m);
    }

    // --- Menangani Tebakan (huruf atau kata) ---
    // Check if there's an active game AND the message is a valid guess (single letter or .tebak command)
    if (tebakKata[chatId] && ( (text && text.length === 1 && /[A-Za-z]/.test(text)) || (text && text.toLowerCase().startsWith('.tebak ')) )) {
        const game = tebakKata[chatId];

        // Ensure the player is registered in the game's players array
        if (!game.players.includes(sender)) {
            game.players.push(sender); // Automatically join if they make a guess
        }

        const guess = text.toUpperCase();

        if (guess.startsWith('.TEBAK ')) {
            // Tebak seluruh kata
            const fullWordGuess = guess.substring('.TEBAK '.length).trim().toUpperCase(); // Trim to remove extra spaces
            if (!fullWordGuess) { // Handle empty guess after command
                return conn.reply(chatId, '🤔 Masukkan kata yang ingin ditebak setelah *.tebak*.', m);
            }

            if (fullWordGuess === game.secretWord) {
                conn.reply(chatId, `🎉 *Selamat! @${sender.split('@')[0]} berhasil menebak kata: ${game.secretWord}!* 🎉`, m, { mentions: [sender] });
                delete tebakKata[chatId];
            } else {
                game.wrongGuesses++;
                if (game.wrongGuesses >= MAX_GUESSES) {
                    conn.reply(chatId, `😞 *Maaf, tebakan kata salah dan kesempatan habis!* Kata rahasianya adalah: *${game.secretWord}*\n\nGame berakhir.`, m);
                    delete tebakKata[chatId];
                } else {
                    conn.reply(chatId, `❌ Tebakan kata salah! Sisa tebakan salah: *${MAX_GUESSES - game.wrongGuesses}*\n\n${renderGuessedWord(game.guessedLetters)}\n\nPetunjuk: *${game.hint}*`, m);
                }
            }
        } else {
            // Tebak satu huruf
            const letter = guess[0];

            // Check if the letter has already been guessed correctly or incorrectly
            if (game.guessedLetters.includes(letter) || game.secretWord.indexOf(letter) === -1 && game.wrongGuesses > 0) { // Check if wrong guess already counted
                 if (game.guessedLetters.includes(letter)) {
                     return conn.reply(chatId, `⚠️ Huruf '${letter}' sudah pernah ditebak atau sudah terbuka. Coba huruf lain!`, m);
                 }
                 // This part means the letter was a wrong guess before, no need to count again
                 return conn.reply(chatId, `⚠️ Huruf '${letter}' sudah pernah ditebak salah. Coba huruf lain!`, m);
            }


            let found = false;
            for (let i = 0; i < game.secretWord.length; i++) {
                if (game.secretWord[i] === letter) {
                    game.guessedLetters[i] = letter;
                    found = true;
                }
            }

            if (found) {
                const board = renderGuessedWord(game.guessedLetters);
                if (!game.guessedLetters.includes('_')) { // Check if all letters are revealed
                    conn.reply(chatId, `🎉 *Selamat! @${sender.split('@')[0]} berhasil menebak kata: ${game.secretWord}!* 🎉\n\n${board}`, m, { mentions: [sender] });
                    delete tebakKata[chatId];
                } else {
                    conn.reply(chatId, `✅ Huruf '${letter}' benar!\n\n${board}\n\nPetunjuk: *${game.hint}*\nSisa tebakan salah: *${MAX_GUESSES - game.wrongGuesses}*`, m);
                }
            } else {
                game.wrongGuesses++;
                if (game.wrongGuesses >= MAX_GUESSES) {
                    conn.reply(chatId, `😞 *Maaf, huruf '${letter}' salah dan kesempatan habis!* Kata rahasianya adalah: *${game.secretWord}*\n\nGame berakhir.`, m);
                    delete tebakKata[chatId];
                } else {
                    conn.reply(chatId, `❌ Huruf '${letter}' salah! Sisa tebakan salah: *${MAX_GUESSES - game.wrongGuesses}*\n\n${renderGuessedWord(game.guessedLetters)}\n\nPetunjuk: *${game.hint}*`, m);
                }
            }
        }
    }
};

// Fungsi untuk merender kata yang sudah ditebak
function renderGuessedWord(guessedLetters) {
    return guessedLetters.join(' ').replace(/_ /g, '__ '); // Mengganti underscore biasa dengan double underscore untuk tampilan lebih baik
}

// Export handler
tebakKataHandler.command = ['tebakkata', 'nyerahkata', 'tebak']; // Menambahkan 'tebak' untuk menebak kata lengkap
tebakKataHandler.help = ['tebakkata', 'nyerahkata', 'tebak [kata]'];
tebakKataHandler.tags = ['game'];
tebakKataHandler.limit = false;
tebakKataHandler.premium = false;

module.exports = tebakKataHandler;
