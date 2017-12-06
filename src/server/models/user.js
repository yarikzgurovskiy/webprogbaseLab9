const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });
const hasher = require('./../modules/hash');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;


let userSchema = new Schema({
    role: {
        type: String,
        required: true,
        default: "registered"
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        set: pass => hasher.passwordHash(pass)
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatarUrl: {
        type: String,
        required: true
    },
    registrationDate : {
        type: Date,
        required: true,
        default: Date.now
    }
});

let User = mongoose.model('User', userSchema);

module.exports.User = User;