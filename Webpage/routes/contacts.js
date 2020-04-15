var express = require('express');
var router = express.Router();
const Contacts = require('../models/contacts')


var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;


router.post('/', checkNotAuthenticated, function (req, res, next) {
    console.log(req.body);
    
    Contacts.deleteOne({ _id: req.body._id }, function (err, contact, next) {
        
        res.send('Contact Deleted')
    })

});

module.exports = router;