const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

let Project = require('./../models/project').Project;
const image = require('./../modules/image');

mongoose.Promise = Promise;

mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

async function getProjects(req, res) {
    let link = `${req.headers.host}${req.baseUrl}${req.path}`;
    let projects = await Project.find({}).exec();
    //filter
    if (req.query.q) {
        let query = req.query.q.toLowerCase().trim();
        projects = projects.filter(project => {
            return project.name.toLowerCase().trim().includes(query);
        });
        link = `${link}?q=${query}&`;
    } else link = `${link}?`;

    //divide by pieces
    let limit = parseInt(req.query.limit);
    if (!limit) limit = 3;

    let currentPage = parseInt(req.query.p);
    if (!currentPage) currentPage = 1;

    if (currentPage <= 0) return res.status(400).json({ success: false, message: "Bad request" });

    let pages = Math.ceil(projects.length / limit);
    let projectsToShow = projects.slice((currentPage - 1) * limit, currentPage * limit);

    let response = { limit, count: projects.length, parts: pages, prev: null, projects: projectsToShow, next: null };
    if (pages != 0) {
        if (currentPage < pages) response.next = `${link}p=${currentPage + 1}&limit=${limit}`;
        if (currentPage > 1) response.prev = `${link}p=${currentPage - 1}&limit=${limit}`;
    }
    return res.json(response);
}

async function getProject(req, res) {
    let id = req.params.id;
    let project = await Project.findOne({ id: id }).exec();
    if (project) return res.json(project);
    else return res.status(404).json({ success: false, message: `No project with id \'${id}\'` });
}

async function deleteProject(req, res) {
    let id = req.params.id;
    let project = await Project.findOneAndRemove({ id: id }).exec();
    if (project) {
        await image.deleteImage(id);
        return res.json({ success: true, message: `Project with id(${id}) has been successfully deleted`, 'deleted project': project });
    }
    else return res.status(404).json({ success: false, message: `No project with id \'${id}\'` });
}

async function createProject(req, res) {
    let project = req.body;
    // if (req.files.image) {
        project.id = project.name.replace(/\s/g, "_").toLowerCase();
        try {
            project.imageUrl = await image.loadImage(project.image.mimetype, project.image.data, project.id);
            await Project.create(new Project(project));
            res.json({ success: true, message: 'Project has been successfully created' });
        } catch (err) {
            console.log(err);
            res.status(400).json({ success: false, message: err.message });
        }
    // } else {
    //     res.status(400).json({success: false, message: 'You have not uploaded project image!' });
    // }
}

module.exports = {
    getProjects,
    getProject,
    deleteProject,
    createProject
}
