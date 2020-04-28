var express = require('express');
var router = express.Router();
const Contacts = require('../models/contacts')
var validation = require('../middleware/validation');


var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;
var validateContact = validation.validateContact;


router.delete('/:id', /* checkAuthenticated, */ async function (req, res, next) {
    console.log(req.params);

    try {
        var result = await Contacts.deleteOne({ _id: req.params.id }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }

  /*   Contacts.deleteOne({ _id: req.params.id }, function (err, contact, next) {

        res.end('Contact Deleted')
    }) */

});

router.post('/add', /* checkAuthenticated, */ function (req, res, next) {

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