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
    res.render('index', {
        active_dashboard: true,
        bodyClasses: "hold-transition sidebar-mini layout-fixed",
        showNavbar: true,
        showSidebar: true,
        showFooter: true,
        currentUser: req.user.username,
        title: "Feather Fall - Dashboard"
    });
});


module.exports = router;