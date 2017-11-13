const uno = require('../lib/uno');

function pop_string(q) {
    return [q.split(" ")[0],q.substr(q.indexOf(" ") + 1)];
}

var game = new uno();

module.exports = (from, to, text, bot) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!uno")) {
            try {
                text = pop_string(text)[1];
                var name_func = pop_string(text)[0];
                name_func = "public_"+name_func;
                game[name_func](pop_string(text)[1], bot)
                    .then(fullfill)
                    .catch(reject);
            } catch (err) {
                reject(err);
            }
        } else {
            reject(new Error(""));
        }
    });
};
