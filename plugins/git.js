const git = require('../lib/git');

module.exports = (from, to, text, bot) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!git")) {
            try {
                text = text.substr(text.indexOf(" ")+1);
                git[text.split(" ")[0]](from,text.substr(text.indexOf(" ")+1), bot);
                reject(new Error(""));
            } catch (ex) {
                reject(ex);
            }
        } else {
            reject(new Error(""));
        }
    });
};
