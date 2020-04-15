var express = require('express');
var router = express.Router();

// models
const Contacts = require('../models/contacts');

var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;

const helpers = require('../helpers');
var fs = require('fs');

router.get('/', checkAuthenticated, function (req, res, next) {
    helpers.sendRequest('https://api.mcsrvstat.us/2/minecraft.keane.live', function (body) {

        var formattedTime = helpers.generateTimestamp(body.debug.cachetime * 1000);


        res.render('index', {
            timestamp: formattedTime,
            active_dashboard: true,
            bodyClasses: "hold-transition sidebar-mini layout-fixed",
            showNavbar: true,
            showSidebar: true,
            showFooter: true,
            currentUser: req.user.username,
            title: "Feather Fall"
        });
    });
});




router.get('/contacts', /* checkAuthenticated ,*/ function (req, res, next) {
    Contacts.find({}).lean().exec(function (err, contacts) {
        //console.log(contacts);


        res.render('contacts', {
            contact: contacts,
            active_server: true,
            active_contacts: true,
            bodyClasses: "hold-transition sidebar-mini layout-fixed",
            showNavbar: true,
            showSidebar: true,
            showFooter: true,
/*             currentUser: req.user.username,
 */            title: "Feather Fall - Contacts Page"
        });
    })
});

module.exports = router;