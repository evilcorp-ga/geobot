const mongoose = require('mongoose');

var ssl_model = mongoose.model('ssl',{url: String});

module.exports = (from, to, text, bot) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!ssl")) {
            var url = text.substr(text.indexOf(" ")+1);
            new ssl_model({url :url})
                .save((err)=> {
                    if (err) {
                        reject(err);
                    } else {
                        bot.say("#lobby", "Generating ssl for : "+url);
                        reject(new Error(""));
                    }
                });
            reject(new Error(""));
        } else {
            reject(new Error(""));
        }
    });
};
