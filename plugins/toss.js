module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!toss")) {
            if(Boolean(Math.round(Math.random()))) {
                fullfill(["#lobby",from+" , yaas"]);
            } else {
                fullfill(["#lobby",from+" , nuh uh !!"]);
            }
        } else {
            reject(new Error(""));
        }
    });
};
