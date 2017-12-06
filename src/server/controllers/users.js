const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

let User = require('./../models/user').User;
let auth = require('basic-auth');
const image = require('./../modules/image');

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function getUser(req, res) {
    let username = req.params.id;
    let user = await User.findOne({ username: username }).exec();
    if (user) {
        let userToReturn = Object.assign({}, {
            name: user.name,
            surname: user.surname,
            username: user.username,
            email: user.email,
            role: user.role
        });
        return res.json(userToReturn);
    }
    else return res.status(404).json({ success: false, message: `No user with id \'${id}\'` });
}

async function getAuthUser(req, res) {
    let credentials = auth(req);
    let user = await User.findOne({ username: credentials.name }).exec();
    let userToReturn = Object.assign({}, {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        role: user.role,
        registrationDate: user.registrationDate,
        avatarUrl: user.avatarUrl
    });
    return res.json(userToReturn);
}

module.exports = {
    getUser,
    getAuthUser
}