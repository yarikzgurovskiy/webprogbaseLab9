const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

let User = require('./../models/user').User;

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function registerUser(user){
    return await User.create(new User(user));
}

async function getAll() {
    return await User.find({}).exec();
};

async function getByUsername(username) {
    return await User.findOne({ username: username }).exec();
}


module.exports = {
    registerUser,
    getAll,
    getByUsername
}