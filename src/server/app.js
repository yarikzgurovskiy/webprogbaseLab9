const express = require('express');
const bodyParser = require('body-parser');
const busboyBodyParser = require('busboy-body-parser');
//for authentication
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();

const index = require('./routes/index');
const projects = require('./routes/projects');
const api = require('./routes/api');

const User = require('./models/user').User;
const hasher = require('./modules/hash');

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(busboyBodyParser({ limit: '5mb' }));

app.use(cookieParser());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});


passport.deserializeUser(function (id, done) {
    User.findById(id).exec((err, user) => {
        if (!user) done(err, null);
        else done(null, user);
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({ username: username, password: hasher.passwordHash(password) })
            .exec((err, user) => {
                if (!user) done(err, null);
                else done(null, user);
            });
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/', index);
app.use('/projects', projects);
app.use('/api/v1', api);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error', { status: err.status, user: req.user });
});

let port = process.env.PORT;

app.listen(port, () => console.log(`Server UP on port ${port}!`));