const tv = require('../lib/tv.js');

module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!tv")) {
            tv(text)
                .then(fullfill)
                .catch(reject);
        } else {
            reject(new Error(""));
        }
    });
};
