var help_menu = {
    'Git':{
        'New issue': '!git issue new <project> <issue>',
        'List issues': '!git issue list <project>'
    },
    'Toss':{
        'New toss': '!toss <question>',
        'Coin toss': '!coin <question>'
    },
    'Emoji':{
        'Cop face': '!copface'
    }
};


module.exports = (from, to, text, bot) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!help")) {
            bot.say(from,"Help commands :");
            var keys = Object.keys(help_menu);
            for(var i=0;i<keys.length;i++) {
                bot.say(from, "  Help for : "+keys[i]);
                var m = help_menu[keys[i]];
                for ( keyx in m ) {
                    bot.say(from, "    "+keyx+" : "+m[keyx]);
                }
            }
        } else {
            reject(new Error(""));
        }
    });
};
