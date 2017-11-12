module.exports = (from, to, text) => {
    return new Promise((fullfill, reject)=>{
        if(text.startsWith("!uno")) {
            // Logic comes on here
        } else {
            reject(new Error(""));
        }
    });
};
