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
    //console.log(this.cards.length);
    //var players = this.players.length;
    //var a = this.cards.slice(0,10);
    //this.cards = this.cards.slice(10,this.cards.length+1);
    //console.log(this.cards[0]);
    //console.log(a);
    //console.log(this.cards.length);

    return [arr.slice(0,len),arr.slice(len, arr.length+1)];
}

var uno = function () {
    this.title = ""; /** set title to nick of the person who started game */
    this.cards = []; /** list of cards on the deck */
    this.player = []; /** list of all active player */
    this.dealt = []; /** list of cards dealt to each players */
    this.reverse = false; /** changing to opposite direction */
};

/**
 * Create a new game
 */
uno.prototype.new_game = function (title) {
    this.title = title;
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
    console.log(this.cards.length);
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


module.exports = uno;
