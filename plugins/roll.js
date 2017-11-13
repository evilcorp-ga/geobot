module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!roll")) {
            var num = Math.floor(Math.random() * 6) + 1;
            fullfill(["#lobby",from+" , "+num]);
        } else {
            reject(new Error(""));
        }
    });
};
