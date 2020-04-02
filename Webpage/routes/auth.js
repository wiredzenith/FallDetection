var express = require('express');
var router = express.Router();
const passport = require('passport');

var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;

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