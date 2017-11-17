module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!copface")) {
                fullfill(["#lobby","-_-™"]);
        } else {
            reject(new Error(""));
        }
    });
};
