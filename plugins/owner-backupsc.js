const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const cp = require("child_process");
const { promisify } = require("util");
let exec_ = promisify(exec).bind(cp);

let handler = async (m, { conn, isROwner }) => {
   try {
      const currentDir = process.cwd();
      let zipFileName = path.join(currentDir, "BackupScript.zip");
      
      m.reply("Sedang memulai proses backup. Harap tunggu...");    
      try {
         if (fs.existsSync(path.join(currentDir, "node_modules"))) {
            m.reply("Modul 'node_modules' tidak ikut di backup.");
         }

         let zipCommand = `cd "${currentDir}" && zip -r "${zipFileName}" . -x "node_modules/*"`;
         
         await exec_(zipCommand, { maxBuffer: 1024 * 1024 * 1024 });
       
         const file = fs.readFileSync(zipFileName);
         await conn.sendMessage(
            m.chat,
            {
               document: file,
               mimetype: "application/zip",
               fileName: path.basename(zipFileName),
               caption: "Backup selesai. Silakan unduh file backup.",
            },
            { quoted: m }
         );

         setTimeout(() => {
            fs.unlinkSync(zipFileName);
            m.reply("File backup telah dihapus.");
         }, 5000);

      } catch (err) {
         console.error("Error during backup process:", err);
         m.reply(`Terjadi kesalahan: ${err.message}`);
      }
      
   } catch (error) {
      m.reply("Terjadi kesalahan saat melakukan backup.");
      console.error(error);
   }
};

handler.help = ["backupsc"];
handler.tags = ["owner"];
handler.command = ["backupsc"];
handler.owner = true;

module.exports = handler;
