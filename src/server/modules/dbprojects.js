const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

let Project = require('./../models/project').Project;

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function getAll() {
    return await Project.find({}).exec();
};

async function getById(id) {
    return await Project.findOne({ id: id }).exec();
}

async function remove(id) {
    return await Project.findOneAndRemove({ id: id }).exec();
}

async function create(project) {
    project.id = project.name.replace(/\s/g, "_").toLowerCase();
    return await Project.create(new Project(project));
}

async function update(id, project) {
    return await Project.findOneAndUpdate({ id: id }, project).exec();
}

async function searchByName(query) {
    let projects = await getAll();
    return projects.filter(project => {
        return project.name.toLowerCase().indexOf(query.toLowerCase()) >= 0;
    });

}
let fields = Object.keys(Project.schema.tree);

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update,
    fields,
    searchByName
};


