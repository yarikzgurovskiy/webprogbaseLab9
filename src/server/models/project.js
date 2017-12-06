const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

let Schema = mongoose.Schema;

let projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    preview: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    members: {
        type: Number,
        required: true,
        min: 1
    },
    team_velocity: {
        type: Number,
        required: true,
        min: 1
    },
    start_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    lead: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

let Project = mongoose.model('Project', projectSchema);

module.exports.Project = Project;