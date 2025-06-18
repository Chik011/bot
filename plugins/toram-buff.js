const wait = 'Tunggu sebentar...';

let handler = async (m, { conn, command, text }) => {
  await conn.reply(m.chat, wait, m);

  const buffData = {
    hp: `🔋 *MAX HP*
1107777   HP Lv 10
1010032   HP Lv 10
6199999   HP Lv 10
5199999   HP Lv 10
1010084   HP Lv 10
4262222   HP Lv 10
1010356   HP Lv 10
6010062   HP Lv 10
1250015   HP Lv 10
3090618   HP Lv 10`,

    mp: `🔌 *MAX MP*
6052000   MP Lv 10
1020808   MP Lv 10
1027777   MP Lv 10
1010216   MP Lv 10
2011234   MP Lv 10
7012828   MP Lv 10
2020101   MP Lv 10
3204544   MP Lv 10
3017676   MP Lv 10
4011793   MP Lv 10
1032222   MP Lv 10`,

    ampr: `⚡ *AMPR*
5236969   AMPR Lv 10
2010068   AMPR Lv 10
7088807   AMPR Lv 10
2011234   AMPR Lv 10
1010017   AMPR Lv 10
3226325   AMPR Lv 10
1019696   AMPR Lv 10
1010006   AMPR Lv 10
3063101   AMPR Lv 10
1011010   AMPR Lv 10
5010031   AMPR Lv 10
2011111   AMPR Lv 10
4040404   AMPR Lv 10
1047777   AMPR Lv 10
1074649   AMPR Lv 10`,

    str: `🍖 *STR*
1010055   STR Lv 10
1010968   STR Lv 10
1110033   STR Lv 10
7070777   STR Lv 10
4016699   STR Lv 10
2020303   STR Lv 10
3010095   STR Lv 10
4010024   STR Lv 10
5261919   STR Lv 10
1011069   STR Lv 10
3010018   STR Lv 10
2022222   STR Lv 10
6011415   STR Lv 9`,

cr: `🎯 CRITICAL RATE
1037777   CR Lv 10
6065000   CR Lv 10
7162029   CR Lv 10
1100000   CR Lv 10
1181140   CR Lv 10
7012828   MP Lv 10
6022292   CR Lv 10
1200069   CR Lv 10
2022020   CR Lv 10
3010777   CR Lv 10
3030159   CR Lv 10
3149696   CR Lv 10
4010000   CR Lv 10
6021230   CR Lv 10
3180777   CR Lv 10`,


watk: `⚔ WEAPON ATK
1011122   WATK Lv 10
1010810   WATK Lv 10
1067777   WATK Lv 10
6010024   WATK Lv 10
1011126   WATK Lv 10
2020404   WATK Lv 10
2010136   WATK Lv 10
1180020   WATK Lv 10
3010777   WATK Lv 10
3180777   WATK Lv 10
4240242   WATK Lv 10
5110834   WATK Lv 10
3070028   WATK Lv 9
7162029   WATK Lv 9`,


 dex: `🏹 DEX
1010058   DEX Lv 10
5010092   DEX Lv 10
2020222   DEX Lv 10
3111999   DEX Lv 10
3220777   DEX Lv 10
1010261   DEX Lv 10
7010014   DEX Lv 9`,


 int: `🧪 INT
2020707   INT Lv 10
6010701   INT Lv 10
1032222   INT Lv 10
5190001   INT Lv 10
1010498   INT Lv 10
1047777   INT Lv 10
7130001   INT Lv 10
1014230   INT Lv 10`,


 agi: `🏃 AGI
7162029   AGI Lv 10
1110033   AGI Lv 10
1220777   AGI Lv 10
2020037   AGI Lv 10
2020909   AGI Lv 10
4010228   AGI Lv 9
1010498   AGI Lv 8`,


  vit: `🛡 VIT
5130123   VIT Lv 10`,


 acc: `🎯 ACCURACY
4261111   ACC Lv 10
2010308   ACC Lv 10
1010013   ACC Lv 9
7010077   ACC Lv 9
3188000   ACC Lv 8`,


mrest: `🧙‍♂ MAGICAL RESIST
1111575   MRest Lv 10
2020505   MRest Lv 10
5200052   MRest Lv 10
8010016   MRest Lv 10
7010016   MRest Lv 10
4080087   MRest Lv 9`,


prest: `🛡 PHYSICAL RESIST
6010701   Prest Lv 10
1100000   Prest Lv 10
1020001   PRest Lv 10
1010081   PRest Lv 10
2020111   PRest Lv 10
7010014   PRest Lv 10
4010051   PRest Lv 10
2200117   PRest Lv 10
6011415   PRest Lv 9`,


fracBarrier: `🛡 FRACTIONAL BARRIER
4010024   Frac Barrier Lv 10
53010043  Frac Barrier Lv 10
6150029   Frac Barrier Lv 10
3010003   Frac Barrier Lv 9
1222002   Frac Barrier Lv 8
6181999   Frac Barrier Lv 8
6010062   Frac Barrier Lv 8`,


 mbarrier: `🛡 Pelindung Sihir
2020505   Mbarrier Lv 9`,

  pbarrier: `🛡 Pelindung Fisik
2020111   PBarrier Lv 10`,


aggroPlus: `📈 +AGGRO%
2010136   +Aggro Lv 10
53010043  +Aggro Lv 10
7171717   +Aggro Lv 10
2020606   +Aggro Lv 10
1010207   +Aggro Lv 10
3204544   +Aggro Lv 10
3158668   +Aggro Lv 10
6262000   +Aggro Lv 9`,

  aggroMinus: `📉 -AGGRO%
1010261   -Aggro Lv 10
1010002   -Aggro Lv 10
1010147   -Aggro Lv 10
3010018   -Aggro Lv 10
7140777   -Aggro Lv 8
3061206   -Aggro Lv 8
3134610   -Aggro Lv 9`,

  dteEarth: `🌍 DTE EARTH
2020202   DTE Earth Lv 10
3210103   DTE Earth Lv 10
1011001   DTE Earth Lv 9
4233333   DTE Earth Lv 9
7100666   DTE Earth Lv 9
1010002   DTE Earth Lv 8
5236969   DTE Earth Lv 8`,


dteWind: `💨 DTE WIND
3030303   DTE Wind Lv 10
3210101   DTE Wind Lv 9
3062111   DTE Wind Lv 8
1010055   DTE Wind Lv 7 
4099876   DTE Wind Lv 7   
1010055   DTE Wind Lv 7`,

  dteWater: `💧 DTE WATER
1110111   DTE Water Lv 10
7150030   DTE Water Lv 10
3210100   DTE Water Lv 10
7011001   DTE Water Lv 9
3010018   DTE Water Lv 8
3062111   DTE Water Lv 8`,

  dteFire: `🔥 DTE FIRE
3210106   DTE Fire Lv 10
1121212   DTE Fire Lv 9
7088807   DTE Fire Lv 9
3210106   DTE Fire Lv 9
7011001   DTE Fire Lv 8
2010091   DTE Fire Lv 6`,

dteLight: `💡 DTE LIGHT
3210105   DTE Light Lv 10
1020345   DTE Light Lv 9
4046666   DTE Light Lv 8
4016699   DTE Light Lv 8`,

  dteDark: `🌑 DTE DARK
5010092   DTE Dark Lv 10
1190020   DTE Dark Lv 10
6116116   DTE Dark Lv 10
3210105   DTE Dark Lv 9
1020345   DTE Dark Lv 9
3210106   DTE Dark Lv 9
5010092   DTE Dark Lv 9
6010003   DTE Dark Lv 8
1010006   DTE Dark Lv 7
1016646   DTE Dark Lv 7
1091111   DTE Dark Lv 7
3030069   DTE Dark Lv 7`,

  dteNeutral: `⚪ DTE NEUTRAL
1018530   DTE Neutral Lv 9
1199999   DTE Neutral Lv 9
1019696   DTE Neutral Lv 8
3099876   DTE Neutral Lv 7
1011902   DTE Neutral Lv 7
6061294   DTE Neutral Lv 7`,


dteWater: `💧 DTE WATER
6150029   DTE Water Lv 10`,

  dteDark: `🌑 DTE DARK
2020707 LV 9
1020001 LV 6`,

  dteEarth: `🌍 DTE EARTH
2020606   DTE Earth Lv 9
2020404   DTE Earth Lv 9
6150029   DTE Earth Lv 9`,

  dropRate: `📦 DROP RATE
4196969   Drop Rate Lv 6
1010084   Drop Rate Lv 6`

    // ... tambahkan kategori buff lainnya jika perlu
  };

  if (command === 'allbuff') {
    let all = Object.values(buffData).join('\n\n');
    return conn.reply(m.chat, all, m);
  }

  if (!text || !buffData[text.toLowerCase()]) {
    let list = Object.keys(buffData).map(k => `• *${k}*`).join('\n');
    return conn.reply(m.chat, `📋 *Buff yang tersedia:*
${list}

Ketik *.${command} <jenis>* untuk melihat.
Contoh: *.${command} str*`, m);
  }

  await conn.reply(m.chat, buffData[text.toLowerCase()], m);
};

handler.command = ['buff', 'allbuff'];
handler.tags = ['toram'];
handler.help = ['buff [jenis]', 'allbuff'];

module.exports = handler;
