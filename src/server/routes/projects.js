let express = require('express');
let moment = require('moment');
let router = express.Router();

const image = require('./../modules/image');
const storage = require('./../modules/dbprojects');
const middlewares = require('./../modules/middlewares');

router.get('/',
    middlewares.checkAuth,
    (req, res) => {
        res.render('projects', { user: req.user });
    });

router.get('/create',
    middlewares.checkAuth,
    (req, res) => {
        res.render('create', { user: req.user });
    });

router.post('/',
    middlewares.checkAuth,
    async (req, res) => {
        let project = req.body;
        if (req.files.image) {
            project.imageUrl = await image.loadImage(req.files.image.mimetype, req.files.image.data, project.id);
            try {
                console.log(await storage.create(project));
                res.redirect('/projects');
            } catch (err) {
                console.log(err);
                res.render('error', {
                    message: `Can't create new Project! Name duplication`,
                    user: req.user
                });
            }
        } else {
            res.render('error', {
                message: "Can't load your image! Try again",
                user: req.user
            });
        }
    });

router.get('/:id',
    middlewares.checkAuth,
    async (req, res) => {
        try {
            let project = await storage.getById(req.params.id);
            if (project != null) res.render('project', {
                project: project,
                user: req.user
            });
            else throw new Error(`No project \"${req.params.id}\"`);
        } catch (err) {
            console.log(err.message);
            res.render('error', {
                message: err.message,
                user: req.user
            });
        }
    });

router.post('/:id',
    middlewares.checkAuth,
    async (req, res) => {
        try {
            console.log(await storage.remove(req.params.id));
            res.redirect('/projects');
        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    });

module.exports = router;