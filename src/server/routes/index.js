let express = require('express');
let router = express.Router();
const passport = require('passport');

const usersStorage = require('./../modules/dbusers');
const image = require('./../modules/image');
const middlewares = require('./../modules/middlewares');

router.get('/docs/api/v1', (req, res) => {
    res.render('docs', { user: req.user, link: `${req.headers.host}/api/v1` });
});

router.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

router.get('/users',
    middlewares.checkAdmin,
    async (req, res) => {
        try {
            let users = await usersStorage.getAll();
            res.render('users', {
                users: users,
                user: req.user
            });
        } catch (err) {
            console.log(err);
            res.sendStatus(500);
        }
    });

router.get('/signout',
    middlewares.checkAuth,
    (req, res) => {
        req.logout();
        res.redirect('/');
    });

router.get('/signup', (req, res) => {
    res.render('signup', { user: req.user });
});

router.get('/signin', (req, res) => {
    res.render('signin', { user: req.user });
});

router.get('/profile',
    middlewares.checkAuth,
    (req, res) => {
        res.render('profile', { user: req.user });
    });

router.post('/signin',
    passport.authenticate('local', { failureRedirect: '/signup' }),
    (req, res) => res.redirect('/'));

router.post('/signup', async (req, res) => {
    let newUser = req.body;
    if (newUser.password === newUser.password2) {
        if (req.files.avatar) {
            newUser.avatarUrl = await image.loadImage(req.files.avatar.mimetype, req.files.avatar.data, newUser.username);
            try {
                console.log(await usersStorage.registerUser(newUser));
                res.redirect('/');
            } catch (err) {
                console.log(err);
                res.render('error', {
                    message: `Username or email already exists`,
                    user: req.user
                });
            }
        } else {
            res.render('error', {
                message: "Can't load your image! Try again",
                user: req.user
            });
        }
    } else {
        res.render('error', {
            message: "Failure password confirmation",
            user: req.user
        });
    }
});

module.exports = router;