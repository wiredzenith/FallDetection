var express = require('express');
var router = express.Router();

// models
const User = require('../models/users');
const PlayerActivity = require('../models/playerActivity');
const Message = require('../models/messages');
const Contacts = require('../models/contacts');

var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;

const helpers = require('../helpers');
var fs = require('fs');

router.get('/', checkAuthenticated, function (req, res, next) {
    helpers.sendRequest('https://api.mcsrvstat.us/2/minecraft.keane.live', function (body) {

        var formattedTime = helpers.generateTimestamp(body.debug.cachetime * 1000);
        helpers.statusBox(body, function (status) {

            res.render('index', {
                timestamp: formattedTime,
                stats: status,
                active_dashboard: true,
                bodyClasses: "hold-transition sidebar-mini layout-fixed",
                showNavbar: true,
                showSidebar: true,
                showFooter: true,
                currentUser: req.user.username,
                title: "MCMonitor"
            });
        });
    });
});

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


router.get('/mods', checkAuthenticated, function (req, res, next) {
   Contacts.find({}).lean().exec(function(err,contacts){
       console.log(contacts);
       

        res.render('mods', {
            contact: contacts,
            active_server: true,
            active_mods: true,
            bodyClasses: "hold-transition sidebar-mini layout-fixed",
            showNavbar: true,
            showSidebar: true,
            showFooter: true,
            currentUser: req.user.username,
            title: "MCMonitor - Server Mod List"
        });
    })
});


router.get('/logs', checkAuthenticated, function (req, res, next) {
    fs.readFile('../1122/logs/latest.log', function (err, data ) {
        if (err) {
            return err;
        }

        res.render('logs', {
            active_server: true,
            active_logs: true,
            bodyClasses: "hold-transition sidebar-mini layout-fixed",
            showNavbar: true,
            showSidebar: true,
            showFooter: true,
            currentUser: req.user.username,
            title: "MCMonitor - Server Logs",
            logText: data
        });
    });
});

module.exports = router;