const express = require('express');
const {createTask,getAllTasks,getTaskById,updateTask,deleteTask } = require('../controllers/task_controller');
const auth = require('../middleware/auth');
const taskRouter = express.Router();



taskRouter.post('/:id',auth(), createTask);
taskRouter.get('/:id',auth(), getAllTasks);
taskRouter.get('/task/:id',auth(), getTaskById);
taskRouter.put('/:id', auth(),updateTask);
taskRouter.delete('/:id',auth(), deleteTask);



module.exports = taskRouter;