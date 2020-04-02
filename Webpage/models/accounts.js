var mongoose = require('mongoose')

var accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
});

module.exports = mongoose.model('Accounts', accountSchema);
