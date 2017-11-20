const GitHubApi = require('github');

function pop_string(q) {
    return [q.split(" ")[0],q.substr(q.indexOf(" ") + 1)];
}


var github = new GitHubApi({
    timeout: 5000,
    host: 'api.github.com', // should be api.github.com for GitHub
    protocol: 'https',
    headers: {
        'accept': 'application/vnd.github.geobot',
        'user-agent': 'geobot'
    },
    requestMedia: 'application/vnd.github.geobot'
});

github.authenticate({
      type: 'token',
      token: process.env.gitToken
})

var public_api = [];

public_api['issue'] = (from,text,bot) => {
    var q = pop_string(text);
    if(q[0] == "new" && from === "georoot") {
        q = pop_string(q[1]);
        github.issues.create({
            owner: "evilcorp-ga",
            repo: q[0],
            title: q[1]
        },(err,res)=> {
            if(err) {
                bot.say("#lobby","[Error] : "+err.message);
            }else {
                bot.say("#lobby","New bug filed");
            }
        });
    }
    else if (q[0] == "list") {
        q = pop_string(q[1]);
        github.issues.getForRepo({
            owner: "evilcorp-ga",
            repo: q[0]
        },(err,res)=> {
            if(err) {
                bot.say("#lobby","[Error] : "+err.message);
            }else {
                var data = res.data;
                bot.say(from,"List of issues for"+q[0]);
                for (var i = 0, len = data.length; i < len; i++) {
                    var issue = data[i];
                    bot.say(from, issue.number+" : "+issue.title);
                }
            }
        });
    } else {
        bot.say("#lobby","Possible uses '!git issue new <project> <issue>' , `!git issue list <project>");
    }
};


module.exports = public_api;
