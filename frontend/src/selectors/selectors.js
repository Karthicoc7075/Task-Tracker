export const getDashboardData = (state) => state.dashboard?.data;
export const getDashboardLoading = (state) => state.dashboard.loading;
export const getDashboardError = (state) => state.dashboard.error;


export const getProjects = (state) => state.project.projects ;
export const getProjectsLoading = (state) => state.project.loading;
export const getProjectsError = (state) => state.project.error;



export const getTasks = (state) => state.task.tasks;
export const getTasksLoading = (state) => state.task.loading;
export const getTasksError = (state) => state.task.error;
export const getTask = (state) => state.task.task;

export const createProjectLoading = (state) => state.project.createLoading;
export const createTaskLoading = (state) => state.task.createLoading;
export const updateProjectLoading = (state) => state.project.updateLoading;
export const updateTaskLoading = (state) => state.task.updateLoading;


export const deleteProjectLoading = (state) => state.project.deleteLoading;
export const deleteTaskLoading = (state) => state.task.deleteLoading;


export const getUserSelectors = (state) => state.auth.user;
export const getUserLoading = (state) => state.auth.loading;
export const getUserError = (state) => state.auth.error;
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getToken = (state) => state.auth.token;
