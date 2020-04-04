var express = require('express');
var router = express.Router();
const passport = require('passport');
const Account = require('../models/accounts');

const bcrypt = require('bcrypt');
const saltRounds = 10;

var auth = require('../middleware/check-auth');
var validation = require('../middleware/validation');

var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;
var validateRegistration = validation.validateRegistration
const helpers = require('../helpers');

router.get('/login', checkNotAuthenticated, function (req, res, next) {
    helpers.sendRequest('https://api.mcsrvstat.us/2/minecraft.keane.live', function (body) {

        var formattedTime = helpers.generateTimestamp(body.debug.cachetime * 1000);
        helpers.statusBox(body, function (status) {

            res.render('login', {
                timestamp: formattedTime,
                stats: status,
                bodyClasses: "hold-transition login-page",
                navbar: false,
                sidebar: false,
                footer: false
            });
        });
    });
});

router.get('/register', checkNotAuthenticated, function (req, res, next) {


    res.render('register', {
        bodyClasses: "hold-transition login-page",
        navbar: false,
        sidebar: false,
        footer: false
    });
});

router.post('/register', checkNotAuthenticated, function (req, res, next) {

    var validation = validateRegistration(req.body);
    if (validation.isValid) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                var newAccount = {
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                }
                const newAccountEntry = new Account(newAccount);
                newAccountEntry.save();
                console.log('account created!');
            });
        });
        console.log('account created!');

        res.redirect('/auth/login');
    } else {
        res.render('register', {
            val: validation,
            bodyClasses: "hold-transition login-page",
            navbar: false,
            sidebar: false,
            footer: false
        })
    }

});


router.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.delete('/logout', checkAuthenticated, function (req, res, next) {
    req.logout();
    res.redirect('/auth/login');
});

module.exports = router;