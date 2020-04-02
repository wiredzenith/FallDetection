var express = require('express');
var router = express.Router();
const request = require('request');
const { exec } = require('child_process');
const passport = require('passport');

var auth = require('../middleware/check-auth');
var checkAuthenticated = auth.checkAuthenticated;
var checkNotAuthenticated = auth.checkNotAuthenticated;


module.exports = router;