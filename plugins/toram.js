const knownCommands = ['buff', 'lvlg', 'pembolong']

if (knownCommands.includes(command.toLowerCase())) {
  switch (command.toLowerCase()) {
    case 'buff':
      throw 'buff code belum tersedia';
    case 'lvlg':
      throw 'lvlg code belum tersedia';
    case 'pembolong':
      throw 'belum tersedia';
  }
}

handler.tags = ['toram']
handler.limit = false;
handler.premium = false;

module.exports = handler;
