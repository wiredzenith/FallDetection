var express = require('express');
var router = express.Router();
const Contacts = require('../models/contacts')


var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;


router.post('/', checkAuthenticated, async function (req, res, next) {
    console.log(req);
    
    Contacts.deleteOne({ _id: req.body._id }, async function (err, contact, next) {
        res.redirect('/contacts')
    })

});

module.exports = router;