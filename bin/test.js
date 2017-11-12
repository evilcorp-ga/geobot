var uno = require('../lib/uno.js');

var u = new uno();

u.new_game("test game");
u.addPlayers(["georoot","Raikou","Dusty"]);

u.start_game();

u.pp();
