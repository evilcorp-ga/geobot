const irc = require('irc');
const loader = require('require-dir');

var config = {
    channels: ["#lobby"],
    server: process.env.ircHost,
    botName: process.env.botName
};

var bot = new irc.Client(config.server,config.botName, {
    channels: config.channels
});

var modules = loader('../plugins');

bot.addListener("message", function(from, to, text, message) {
    Object.keys(modules).forEach((key)=>{
        modules[key](from, to, text)
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
