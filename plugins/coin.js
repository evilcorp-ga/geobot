module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!coin")) {
            if(Boolean(Math.round(Math.random()))) {
                fullfill(["#lobby",from+" , HEADS!!"]);
            } else {
                fullfill(["#lobby",from+" , TAILS!!"]);
            }
        } else {
            reject(new Error(""));
        }
    });
};
