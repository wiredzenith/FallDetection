var mongoose = require('mongoose')

var accountSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String

});

module.exports = mongoose.model('Accounts', accountSchema);
