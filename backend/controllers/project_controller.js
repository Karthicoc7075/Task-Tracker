const Project = require('../models/project_model');
const customError = require('../errors/index');
const Task = require('../models/task_model');
const createProject = async (req, res,next) => {
    console.log(req.body);
    console.log(req.userId);
    const { projectName, projectDescription } = req.body;
    const userId = req.userId;


    try {
        if (!projectName || !projectDescription) {
            throw new customError.BadRequestError('Please provide all values');
        }
    
        const userCreatedProjectCount = await Project.find({projectOwner: userId });


        if (userCreatedProjectCount.length>=4) {
            throw new customError.UnauthorizedError('You have reached the maximum number of projects');
        }


        const newProject = await Project.create({
            projectName,
            projectDescription,
            projectOwner: userId,
        });

        res.status(201).json({
            message: 'Project created successfully',
            project: newProject,
        });
    } catch (error) {
        next(error);
    }
}

const getAllProjects = async (req, res,next) => {
    const userId = req.userId;

    try {
        const projects = await Project.find({ projectOwner: userId });

        console.log(projects);
        
        res.status(200).json({
            message: 'Projects retrieved successfully',
            projects,
        });
    } catch (error) {
        next(error);
    }
}

const deleteProject = async (req, res,next) => {
    const { id: projectId } = req.params;
    const userId = req.userId;


    try {


        
        const project = await Project.findOneAndDelete({
            _id: projectId,
            projectOwner: userId,
        });

        const tasks = await Task.deleteMany({ project: projectId });
        if (!tasks) {
            throw new customError.NotFoundError(`No tasks found with project id: ${projectId}`);
        }
        if (!project) {
            throw new customError.NotFoundError(`No project found with  id: ${projectId}`);
        }

console.log(project);

        res.status(200).json({
            message: 'Project deleted successfully',
            project,
        });
    } catch (error) {
        next(error);
    }
}



module.exports = { 
    createProject,
    deleteProject,
    getAllProjects,
};