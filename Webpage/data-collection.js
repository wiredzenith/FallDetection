const mongoose = require('mongoose');
const User = require('./models/users');
const PlayerActivity = require('./models/playerActivity');
const helpers = require('./helpers');

function collect() {
    // send request to api to get online users
    User.find({}).lean().exec(function (err, users) {
        helpers.sendRequest('https://api.mcsrvstat.us/2/minecraft.keane.live', function(body) {
                if (body.players != null) {
                    var totalOnlinePlayers = body.players.online;

                    var playerActivity = {
                        _id: new mongoose.Types.ObjectId(),
                        totalOnline: totalOnlinePlayers
                    };

                    users.forEach(function (user) {
                        if (totalOnlinePlayers > 0 && body.players.list.includes(user.name)) {
                            playerActivity[user.name] = true;
                        } else {
                            playerActivity[user.name] = false;
                        }
                    });        
                    
                    const playerActivityModel = new PlayerActivity(playerActivity);
                    playerActivityModel.save();
                }
            }
        );
    });
    // put these into player-activity
    setTimeout(collect, 30000); // run every 30 seconds
}

module.exports = collect;