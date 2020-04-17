var express = require('express');
var router = express.Router();
const Contacts = require('../models/contacts')
var validation = require('../middleware/validation');
const Swal = require('sweetalert2')


var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;
var validateContact = validation.validateContact;


router.post('/', checkAuthenticated, function (req, res, next) {
    console.log(req.body);

    Contacts.deleteOne({ _id: req.body._id }, function (err, contact, next) {

        res.end('Contact Deleted')
    })

});

router.post('/add', checkAuthenticated, function (req, res, next) {

    var validation = validateContact(req.body);
    if (validation.isValid) {
        Contacts.findOne(
            { number: req.body.number },
            function (err, contact, next) {
                console.log(contact);

                if (contact === null) {
                    var newContact = {
                        name: req.body.name,
                        number: req.body.number,
                    }
                    const newContactEntry = new Contacts(newContact);
                    newContactEntry.save(function (err, save, next) {
                        console.log(save);
                        console.log("all good");
                    });
                } else {
                    console.log("contact exists");
                }
            });
    }
    console.log(validation);
    
    res.redirect('back');
})

router.get('/list', function (req, res, next) {
    Contacts.find({}).lean().exec(function (err, contacts) {
        var contactsList = []

        for (let i = 0; i < contacts.length; i++) {
            const element = contacts[i];
            contactsList.push({
                name: element.name,
                number: element.number
            });
        }
        res.send(contactsList);
    });
});

module.exports = router;