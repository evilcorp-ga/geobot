module.exports = (bot, channel, who) => {
    return new Promise((fullfill, reject)=>{
        if (who !== "geoCub") {
            fullfill([channel,who+", Welcome to the chat!!"]);
        }
    });
};
