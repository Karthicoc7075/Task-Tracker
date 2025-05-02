const express = require('express');
const {createProject,getAllProjects,deleteProject, } = require('../controllers/project_controller');
const auth = require('../middleware/auth');
const projectRouter = express.Router();



projectRouter.get('/',auth(), getAllProjects);
projectRouter.post('/',auth(), createProject);

projectRouter.delete('/:id',auth(), deleteProject);



module.exports = projectRouter;