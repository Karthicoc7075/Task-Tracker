const Project = require("../models/project_model");
const Task = require("../models/task_model");


const DashboardDatas = async (req, res,next) => {
    const userId = req.userId;
    try {
    
        const projectsCount = await Project.countDocuments({ user: userId });
        const tasksCount = await Task.countDocuments({ user: userId });
        const pendingTasksCount = await Task.countDocuments({ user: userId, status: "Pending" });
        const completedTasksCount = await Task.countDocuments({ user: userId, status: "Completed" });
        const processingTasksCount = await Task.countDocuments({ user: userId, status: "In Process" });

        res.status(200).json({
            projectsCount,
            tasksCount,
            pendingTasksCount,
            completedTasksCount,
            processingTasksCount
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    DashboardDatas,
};