const request = require('request');
const Contacts = require('./models/contacts');

/*
 * isDST - Get daylight savings offset
 */
function isDST() {
    let d = new Date(Date.now());
    let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
    let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();
    return Math.max(jan, jul) != d.getTimezoneOffset();
}

/*
 * generateTimestamp - Generate a generic timestamp in the format dd/mm/yy hh:mm:ss
 * @param {string, Date object} time - The time to convert
 */
function generateTimestamp(time) {
    //convert a given time to a timestamp
    var dateTime = new Date(time);
    var minutes = "0" + dateTime.getMinutes();
    var seconds = "0" + dateTime.getSeconds();
    var date = "0" + dateTime.getDate();
    var month = "0" + (dateTime.getMonth() + 1);
    var year = dateTime.getFullYear().toString().substr(-2);

    var hours;
    if (isDST()) {
        hours = (dateTime.getHours() + 1);
    } else {
        hours = dateTime.getHours();
    }

    // Will display time and date formad dd/mm/yy hh:mm:ss
    var formattedTime = date.slice(-2) + '/' + month.slice(-2) + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

/*
 * sendRequest - Send a request to a given url using the request library with error checking.
 * @param {string} url - The URL to send the request to
 * @param {function} callback - The callback function
 */
function sendRequest(url, callback) {
    request(url, {
        json: true
    }, async (err, response, body) => {
        if (err) {
            console.log("Error sending request to " + url + " " + err);
            return err;
        }
        callback(body);
    });
}

function statusBox(body, callback) {

    Contacts.countDocuments(function (err, count) {

        var playersOnline
        var noOfMods

        if (body.mods != null) {
            noOfMods = (Object.keys(body.mods.raw).length);
        } else {
            noOfMods = 'N/A';
        }

        if (body.players != null) {
            playersOnline = body.players.online;
        } else {
            playersOnline = 'N/A'
        }

        if (body.online) {
            infoBox = {
                color: 'bg-success',
                icon: 'check-circle',
                message: 'All is well'
            }
        } else {
            infoBox = {
                color: 'bg-danger',
                icon: 'times-circle',
                message: 'Server down!'
            }
        }

        var serverStats = {
            noOfMods: noOfMods,
            noPlayersOnline: playersOnline,
            onlineStatus: infoBox,
            totalPlayers: count
        }

        callback(serverStats);
    });

}

module.exports = {
    generateTimestamp: generateTimestamp,
    sendRequest: sendRequest,
    statusBox: statusBox
};