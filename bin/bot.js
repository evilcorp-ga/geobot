const irc = require('irc');
const loader = require('require-dir');

var config = {
    channels: ["#lobby","#bots"],
    server: process.env.ircHost,
    botName: process.env.botName
};

var bot = new irc.Client(config.server,config.botName, {
    channels: config.channels
});

var modules = loader('../plugins');
var jmodules = loader('../join');

bot.addListener("join", function(channel,who) {
    Object.keys(jmodules).forEach((key)=>{
        jmodules[key](bot,channel,who)
            .then((resp)=>{
                bot.say(resp[0], resp[1]);
            })
            .catch((err)=>{
                if(err.message.length > 2) {
                    console.log(err.message);
                }
            });
    });
});

bot.addListener("message", function(from, to, text, message) {
    Object.keys(modules).forEach((key)=>{
        modules[key](from, to, text, bot)
            .then((resp)=>{
                bot.say(resp[0], resp[1]);
            })
            .catch((err)=>{
                if(err.message.length > 2) {
                    console.log(err.message);
                }
            });
    });
});



bot.addListener('error', function(message) {
        console.log('error: ', message);
});
