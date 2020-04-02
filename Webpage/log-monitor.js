const Tail = require('tail').Tail;
const mongoose = require('mongoose');
const Message = require('./models/messages');
var helpers = require('./helpers');

module.exports = function(io) {
    var tail = new Tail("../1122/logs/latest.log");
    tail.watch()
    tail.on("line", data => {
        var result = data.match(/: <.*> .*$/);
        if (result != null) {
            // formatting
            result = String(result);

            // time
            var timestamp = helpers.generateTimestamp(Date.now());

            //username
            var usernameUnformatted = String(result.match(/<.*>/));
            var username = usernameUnformatted.substring(1, usernameUnformatted.length-1);

            // message
            var message = String(result.match(/> .*$/)).substring(1);

            // save message to database
            const messageModel = new Message({
                _id: new mongoose.Types.ObjectId(),
                username: username,
                message: message,
                timeSent: timestamp
            });
            messageModel.save();

            io.emit('broadcast', {username: username, message: message, timeSent: timestamp});
        }
    });
};