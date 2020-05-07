var express = require('express');
var router = express.Router();

// models

const Contacts = require('../models/contacts');
const Account = require('../models/accounts');

var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;

const helpers = require('../helpers');
var fs = require('fs');

router.get('/', checkAuthenticated, function (req, res, next) {
    Contacts.countDocuments(function (err, countContacts) {
        Account.countDocuments(function (err, countAccounts) {
            res.render('index', {
                cAcc: countAccounts,
                cCon: countContacts,
                active_dashboard: true,
                bodyClasses: "hold-transition sidebar-mini layout-fixed",
                showNavbar: true,
                showSidebar: true,
                showFooter: true,
                currentUser: req.user.username,
                title: "Feather Fall - Dashboard"
            })
        })
    })
});


module.exports = router;