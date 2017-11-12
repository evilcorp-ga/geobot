const request = require('request');

function pop(q) {
    return [q.split(" ")[0],q.substr(q.indexOf(" ") + 1)];
}

function clean_command(query) {
    return new Promise((fullfill, reject)=>{
        fullfill(query.substr(query.indexOf(" ") + 1));
    });
}

function query_search_server (q) {
    return new Promise((fullfill, reject)=>{
        request({
            url: 'https://api.trakt.tv/search/show?query='+q,
            headers: {
                'Content-Type': 'application/json',
                'trakt-api-version': '2',
                'trakt-api-key': process.env.tracktTv
            }
        },(error, resp,body) => {
            if(error) {
                fullfill("some error");
            }else {
                fullfill(body);
            }
        });
    });
}

function search (q) {
    return new Promise((fullfill, reject)=>{
        if (pop(q)[0] === "search") {
            query_search_server(pop(q)[1])
                .then(fullfill)
                .catch(reject);
        }else {
            fullfill("");
        }
    });
}

module.exports = (query) => {
    return new Promise((fullfill, reject)=>{
        clean_command(query)
            .then(search)
            .then((resp)=>{
                fullfill(["#bots",resp]);
            })
            .catch((err)=>{
                console.log(err.message);
            });
    });
};
