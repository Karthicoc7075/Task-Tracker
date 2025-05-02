import * as types from '../contants/actionsTypes'
import {GetAllTasks,GetTask,CreateTask,UpdateTask,DeleteTask} from '../api/task'
import {addToast} from '../actions/toaster'

export const getAllTasks = (projectId) => async (dispatch) => {
    dispatch({ type: types.GET_TASKS_REQUEST });
    try {
        const response = await GetAllTasks(projectId,dispatch);
        const payload = response.data.tasks;
        dispatch({ type: types.GET_TASKS_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_TASKS_FAILURE, error });
    }
}

export const getTask = (id) => async (dispatch) => {
    dispatch({ type: types.GET_TASK_REQUEST });
    try {
        const response = await GetTask(id, dispatch);
        const payload = response.data.task;
        dispatch({ type: types.GET_TASK_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_TASK_FAILURE, error });
    }
}

export const createTask = (projectId,data) => async (dispatch) => {    
    dispatch({ type: types.CREATE_TASK_REQUEST });
    
    try {
        console.log(data);
        const response = await CreateTask(projectId,data, dispatch);
        const payload = response.data.task;
        dispatch({ type: types.CREATE_TASK_SUCCESS , payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: types.CREATE_TASK_FAILURE, error });
    }
}

export const updateTask = (taskId, data) => async (dispatch) => {
    dispatch({ type: types.UPDATE_TASK_REQUEST });
    try {
        const response = await UpdateTask(taskId, data, dispatch);
        const payload = response.data.task;
        dispatch({ type: types.UPDATE_TASK_SUCCESS , payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: types.UPDATE_TASK_FAILURE , error });
    }
}

export const deleteTask = (taskId) => async (dispatch) => {
    dispatch({ type: types.DELETE_TASK_REQUEST });
    try {
        const response = await DeleteTask(taskId, dispatch);
        console.log(response);
        const payload = response.data.task;
        dispatch({ type: types.DELETE_TASK_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'));
    } catch (error) {
        dispatch({ type: types.DELETE_TASK_FAILURE, error });
    }
}
