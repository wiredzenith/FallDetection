require('dotenv').config();

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// routers
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var contactsRouter = require('./routes/contacts');
var notFoundRouter = require('./routes/notFound')


const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

const initialisePassport = require('./passport-config');
initialisePassport(passport);

var app = express();
var exphbs = require('express-handlebars');

var http = require('http').createServer(app);

app.engine('handlebars', exphbs({
    partialsDir: __dirname + '/views/partials/'
}));

var hbs = require('handlebars');

hbs.registerHelper("inc", function (value, options) {
    return parseInt(value) + 1;
});

app.set('view engine', 'handlebars', 'math');

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// auth
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

// routers
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/contacts', contactsRouter);
app.use('/notFound', notFoundRouter);

var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://" + process.env.MONGO_DB_USER + ":" + process.env.MONGO_DB_PASSWORD + "@cluster0-zd1ck.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
        return console.log("---MongoDB successfully connected---");
    })
    .catch(function (err) {
        return console.log(err);
    });


http.listen(3000, function () {
    console.log('listening on port 3000');
});
module.exports = app;
