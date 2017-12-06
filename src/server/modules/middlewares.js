const auth = require('basic-auth');
const User = require('./../models/user').User;
const hasher = require('./hash');

function checkAuth(req, res, next) {
    if (!req.user) return res.status(401).render('error', { status: 401, message: 'Not authorized', user: req.user }); // 'Not authorized'
    next();  // пропускати далі тільки аутентифікованих
}

function checkAdmin(req, res, next) {
    if (!req.user) return res.status(401).render('error', { status: err.status, message: 'Not authorized', user: req.user });
    else if (req.user.role !== 'admin') res.status(403).render('error', { status: 403, message: 'Forbidden', user: req.user }); // 'Forbidden'
    else next();  // пропускати далі тільки аутентифікованих із роллю 'admin'
}

function checkAPIAuth(req, res, next) {
    if(req.user) return next();
    let authReq = { message: "Requires authentication" };
    let credentials = auth(req);
    if (!credentials) res.status(401).json(authReq);
    else {
        User.findOne({ username: credentials.name, password: hasher.passwordHash(credentials.pass) })
            .exec((err, user) => {
                if (!user) {
                    authReq.error = "Invalid credentials";
                    res.status(401).json(authReq);
                }
                else next();
            });
    };
}

module.exports = {
    checkAuth,
    checkAdmin,
    checkAPIAuth
}