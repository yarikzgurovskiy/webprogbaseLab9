let express = require('express');
let router = express.Router();

const middlewares = require('./../modules/middlewares');
const projects = require('./../controllers/projects');
const users = require('./../controllers/users');

router
    .get('/',
    (req, res) => {
        let link = `${req.headers.host}${req.baseUrl}`;
        let apiResources = {
            current_user_url: `${link}/user`,
            user_url: `${link}/users/{user_username}`,
            projects_url: `${link}/projects`,
            project_url: `${link}/project/{project_id}`
        };
        res.json(apiResources);
    })
    .get('/projects/',
    middlewares.checkAPIAuth,
    projects.getProjects)

    .post('/projects/',
    middlewares.checkAPIAuth,
    projects.createProject)

    .get('/projects/:id',
    middlewares.checkAPIAuth,
    projects.getProject)

    .post('/projects/:id',
    middlewares.checkAPIAuth,
    projects.deleteProject)

    .get('/users/:id',
    middlewares.checkAPIAuth,
    users.getUser)

    .get('/user',
    middlewares.checkAPIAuth,
    users.getAuthUser)

module.exports = router;