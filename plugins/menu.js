const { 
    BufferJSON, 
    WA_DEFAULT_EPHEMERAL, 
    generateWAMessageFromContent, 
    proto, 
    generateWAMessageContent, 
    generateWAMessage, 
    prepareWAMessageMedia, 
    areJidsSameUser, 
    getContentType 
} = require('@adiwajshing/baileys')

process.env.TZ = 'Asia/Jakarta'
let fs = require('fs')
let path = require('path')
let fetch = require('node-fetch')
let moment = require('moment-timezone')
let levelling = require('../lib/levelling')
let arrayMenu = [
  'all', 
  'main', 
  'toram',
  'sticker', 
  'group', 
  'tools', 
  'info',
  'profil',
  'fun',
  'image',
  'owner',
  'game'
]

const allTags = {
    'all': 'SEMUA MENU',
    'main': 'MENU UTAMA',
    'toram': 'TORAM',
    'sticker': 'MENU STICKER',
    'group': 'MENU GROUP',
    'tools': 'MENU TOOLS',
    'info': 'MENU INFO',
    'profil': 'MENU PROFIL',
    'fun': 'MENU FUN',
    'image': 'MENU IMAGE',
    'owner': 'MENU OWNER',
    'game': 'MENU GAME'
}

const defaultMenu = {
    before: `
Hi %name

┌  ◦ Uptime : %uptime
│  ◦ Tanggal : %date
│  ◦ Waktu : %time
└  ◦ Prefix Used : *[ %p ]*
`.trimStart(),
    header: '┌  ◦ *%category*',
    body: '│  ◦ %cmd %islimit %isPremium',
    footer: '└  ',
    after: `
*Note:* Ketik *.menu <category>* untuk melihat menu spesifik
Contoh: *.menu all*

📢 *Grup WhatsApp Resmi Laurens Bot:*
Bergabung dengan komunitas pengguna Laurens Bot sekarang!
➡️ https://chat.whatsapp.com/KxysGONez5HGnxKsDEyab9

📣 *Channel WhatsApp Resmi (Update Fitur & Info):*
Ikuti channel resmi Laurens Bot untuk mendapatkan info terbaru.
➡️ https://whatsapp.com/channel/0029Vb6CSaw77qVKwJVFFq1c
`.trim()
}


let handler = async (m, { conn, usedPrefix: _p, args = [], command }) => {
    try {
        let package = JSON.parse(await fs.promises.readFile(path.join(__dirname, '../package.json')).catch(_ => '{}'))
        let { exp, limit, level, role } = global.db.data.users[m.sender]
        let { min, xp, max } = levelling.xpRange(level, global.multiplier)
        let name = `@${m.sender.split`@`[0]}`
        let teks = args[0] || ''

        let d = new Date(new Date + 3600000)
        let locale = 'id'
        let date = d.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
        let time = d.toLocaleTimeString(locale, {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
        let _uptime = process.uptime() * 1000
        let uptime = clockString(_uptime)

        let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
            return {
                help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
                tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
                prefix: 'customPrefix' in plugin,
                limit: plugin.limit,
                premium: plugin.premium,
                enabled: !plugin.disabled,
            }
        })

        let replace = {
            '%': '%',
            p: _p,
            uptime,
            name,
            date,
            time
        }

        if (!teks) {
            let menuList = `${defaultMenu.before}\n\n┌  ◦ *DAFTAR MENU*\n`
            for (let tag of arrayMenu) {
                if (tag && allTags[tag]) {
                    menuList += `│  ◦ ${_p}menu ${tag}\n`
                }
            }
            menuList += `└  \n\n${defaultMenu.after}`
            let text = menuList.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

            await conn.relayMessage(m.chat, {
                extendedTextMessage: {
                    text: text,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        externalAdReply: {
                            title: 'Grup Resmi Laurens Bot',
                            body: 'Klik untuk bergabung ke grup komunitas',
                            thumbnailUrl: 'https://chat.whatsapp.com/KxysGONez5HGnxKsDEyab9?mode=ac_c',
                            sourceUrl: 'https://chat.whatsapp.com/KxysGONez5HGnxKsDEyab9?mode=ac_c',
                            mediaType: 1,
                            previewType: 1,
                            renderLargerThumbnail: true
                        }
                    }
                }
            }, {})
            return
        }

        if (!allTags[teks]) {
            return m.reply(`Menu "${teks}" tidak tersedia.\nSilakan ketik ${_p}menu untuk melihat daftar menu.`)
        }

        let menuCategory = defaultMenu.before + '\n\n'
        if (teks === 'all') {
            for (let tag of arrayMenu) {
                if (tag !== 'all' && allTags[tag]) {
                    menuCategory += defaultMenu.header.replace(/%category/g, allTags[tag]) + '\n'
                    let categoryCommands = help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help)
                    for (let menu of categoryCommands) {
                        for (let help of menu.help) {
                            menuCategory += defaultMenu.body
                                .replace(/%cmd/g, menu.prefix ? help : _p + help)
                                .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                                .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '') + '\n'
                        }
                    }
                    menuCategory += defaultMenu.footer + '\n'
                }
            }
        } else {
            menuCategory += defaultMenu.header.replace(/%category/g, allTags[teks]) + '\n'
            let categoryCommands = help.filter(menu => menu.tags && menu.tags.includes(teks) && menu.help)
            for (let menu of categoryCommands) {
                for (let help of menu.help) {
                    menuCategory += defaultMenu.body
                        .replace(/%cmd/g, menu.prefix ? help : _p + help)
                        .replace(/%islimit/g, menu.limit ? '(Ⓛ)' : '')
                        .replace(/%isPremium/g, menu.premium ? '(Ⓟ)' : '') + '\n'
                }
            }
            menuCategory += defaultMenu.footer + '\n'
        }

        menuCategory += '\n' + defaultMenu.after
        let text = menuCategory.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

        await conn.relayMessage(m.chat, {
            extendedTextMessage: {
                text: text,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        title: 'Grup Resmi Laurens Bot',
                        body: 'Klik untuk gabung ke grup komunitas',
                        thumbnailUrl: 'https://envs.sh/mR4.jpg/IMG20250612411.jpg', // Ganti dengan URL thumbnail kamu
                        sourceUrl: 'https://whatsapp.com/channel/0029Vb6CSaw77qVKwJVFFq1c', // Ganti dengan link grup WA
                        mediaType: 1,
                        previewType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }
        }, {})
    } catch (e) {
        conn.reply(m.chat, 'Maaf, menu sedang error', m)
        console.error(e)
    }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = /^(menu|help)$/i
handler.exp = 3
module.exports = handler

function clockString(ms) {
    if (isNaN(ms)) return '--'
    let h = Math.floor(ms / 3600000)
    let m = Math.floor(ms / 60000) % 60
    let s = Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}
