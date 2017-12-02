module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.indexOf("georoot") > -1 && process.env.away === "1") {
            console.log(text);
            fullfill(["#lobby",from+" , georoot is on vacation atm !!!"]);
        } else {
            reject(new Error(""));
        }
    });
};
