module.exports = (bot, channel, who) => {
    return new Promise((fullfill, reject)=>{
        fullfill([channel,who+" ,Welcome to the chat!!"]);
    });
};
