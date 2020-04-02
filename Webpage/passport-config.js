const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Account = require('./models/accounts');

function initialise(passport) {
    const authenticateUser = function (username, password, done) {
        //find username DB
        return Account.findOne({ "username": username }).lean().exec(function (err, user) {
            if (user == null) {
                return done(null, false, { message: 'Invalid user!' });
                console.log(user);
            }
            //compare hashed password from DB with password entered
            if (bcrypt.compareSync(password, user.password)) {
                return done(null, username)
            } else {
                return done(null, false, { message: 'Password incorrect!' })
            }
        });;
    }

    passport.use(new localStrategy({ usernameField: 'username', passwordField: 'password' }, authenticateUser));

    passport.serializeUser(function (username, done) {
        return Account.findOne({ "username": username }).lean().exec(function (err, user) {
            return done(null, user._id);
        });;
    });
    passport.deserializeUser(function (id, done) {
        return Account.findOne({ "_id": id }).lean().exec(function (err, user) {
            return done(null, user);
        });;
    });
}

module.exports = initialise;