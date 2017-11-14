function num2card(num) {
    if (num < 25) {
        if (num === 0) {
            return "R-0";
        }else {
            num = num % 13;
            if (num <10 )
                return "R-"+num;
            else {
                if (num === 10) {
                    return "R-D2";
                }
                if (num === 11) {
                    return "R-S";
                }
                if (num === 12) {
                    return "R-REV";
                }
            }
        }
    }
    if (num < 50) {
        num = num - 25;
        if (num === 0) {
            return "G-0";
        }else {
            num = num % 13;
            if (num <10 )
                return "G-"+num;
            else {
                if (num === 10) {
                    return "G-D2";
                }
                if (num === 11) {
                    return "G-S";
                }
                if (num === 12) {
                    return "G-REV";
                }
            }
        }
    }
    if (num < 75) {
        num = num - 50;
        if (num === 0) {
            return "Y-0";
        }else {
            num = num % 13;
            if (num <10 )
                return "Y-"+num;
            else {
                if (num === 10) {
                    return "Y-D2";
                }
                if (num === 11) {
                    return "Y-S";
                }
                if (num === 12) {
                    return "Y-REV";
                }
            }
        }
    }
    if (num < 100) {
        num = num - 75;
        if (num === 0) {
            return "B-0";
        }else {
            num = num % 13;
            if (num <10 )
                return "B-"+num;
            else {
                if (num === 10) {
                    return "B-D2";
                }
                if (num === 11) {
                    return "B-S";
                }
                if (num === 12) {
                    return "B-REV";
                }
            }
        }
    }
    if (num < 104) {
        return "WID";
    }
    if (num < 108){
        return "WID-D4";
    }
    return "NI";
}

function card2num(card) {

}


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function shuffle_slice(arr,len) {
    return [arr.slice(0,len),arr.slice(len, arr.length+1)];
}

var uno = function () {
    this.title = ""; /** set title to nick of the person who started game */
    this.cards = []; /** list of cards on the deck */
    this.player = []; /** list of all active player */
    this.player_pointer = 0; /** Points to player whose chance it is to play */
    this.dealt = []; /** list of cards dealt to each players */
    this.reverse = false; /** changing to opposite direction */
};

/**
 * Create a new game
 */
uno.prototype.new_game = function (title) {
    this.title = title;
    this.player_pointer = 0;
    this.cards = []; /** list of cards on the deck */
    this.player = []; /** list of all active player */
    this.dealt = []; /** list of cards dealt to each players */
    this.reverse = false; /** changing to opposite direction */
    for (var i = 0, len = 108; i < len; i++) {
        this.cards.push(i);
    }
    this.cards = shuffle(this.cards);
};

/**
 * Add players to game
 */
uno.prototype.addPlayers = function (players) {
    this.players = players;
};

/**
 * Return active players on game
 */
uno.prototype.getPlayers = function () {
    return this.players;
};

/**
 * Shuffle the cards
 */
uno.prototype.start_game = function () {
    var user_length = this.players.length;
    for (var i = 0, len = user_length; i < len; i++) {
        var card = shuffle_slice(this.cards, 7);
        this.dealt.push(card[0]);
        this.cards = card[1];
    }
};

/**
 * Debug function only
 */
uno.prototype.pp = function () {
    console.log(this.dealt);
};

uno.prototype.public_new = function (q, bot) {
    return new Promise((fullfill, reject)=>{
        this.new_game();
        this.addPlayers(q.trim().split(" "));
        this.start_game();
        for (var i = 0, len = this.players.length; i < len; i++) {
            var human = [];
            for (var j = 0, lenx = this.dealt[i].length; j < lenx; j++) {
                human.push(num2card(this.dealt[i][j]));
            }
            bot.notice(this.players[i],human);
        }
        bot.say("#lobby","Card on top is : "+num2card(this.cards[0]));
        fullfill(["#lobby",this.players[this.player_pointer]+" , Make your move"]);
    });
};

uno.prototype.public_play = function (q, bot) {
};

module.exports = uno;
