const Task = require('../models/task_model');
const customError = require('../errors/index');


const createTask = async (req, res,next) => {
    console.log(req.body);
    console.log(req.params);
    
    const { taskName, taskDescription, taskStatus } = req.body;
    const userId = req.userId;
    const projectId = req.params.id;



    try {
        if (!taskName || !taskDescription || !taskStatus) {
            throw new customError.BadRequestError('Please provide all values');
        }

        const newTask = await Task.create({
            taskName,
            taskDescription,
            taskStatus,
            taskOwner: userId,
            taskProject: projectId,
        });

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask,
        });
    } catch (error) {
        next(error);
    }
}


const getAllTasks = async (req, res,next) => {
    const userId = req.userId;
    const projectId = req.params.id;

    try {
        const tasks = await Task.find({ taskOwner: userId, taskProject: projectId });

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            tasks,
        });
    } catch (error) {
        next(error);
    }
}

const getTaskById = async (req, res,next) => {
    const { id: taskId } = req.params;
    const userId = req.userId;
    const projectId = req.params.id;

    try {
        const task = await Task.findOne({
            _id: taskId,
            taskOwner: userId,
            taskProject: projectId,
        });

        if (!task) {
            throw new customError.NotFoundError(`No task found with id: ${taskId}`);
        }
        res.status(200).json({
            message: 'Task retrieved successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
}


const updateTask = async (req, res,next) => {
    const userId = req.userId;
    const taskId = req.params.id;
console.log(req.body);

    try {
        const task = await Task.findOneAndUpdate(
            { _id: taskId, taskOwner: userId },
            req.body,
            { new: true,  }
        );

        console.log(task);
        
        if (!task) {
            throw new customError.NotFoundError(`No task found with id: ${taskId}`);
        }

        res.status(200).json({
            message: 'Task updated successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
}
const deleteTask = async (req, res,next) => {

    const userId = req.userId;
    const taskId = req.params.id;

    try {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            taskOwner: userId,
        });

        if (!task) {
            throw new customError.NotFoundError(`No task found with id: ${taskId}`);
        }

        res.status(200).json({
            message: 'Task deleted successfully',
            task,
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
};
