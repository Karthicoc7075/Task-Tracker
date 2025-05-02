import axiosInstance from './axiosConfig';
import { addToast } from '../actions/toaster';


export const GetAllTasks = async (projectId,dispatch) => {
    
    try {
        const response = await axiosInstance.get( `/tasks/${projectId}`);
        return response;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const GetTask = async (id, dispatch) => {
    try {
        const response = await axiosInstance.get(`/tasks/task/${id}`);
        return response;
    } catch (error) {

        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const CreateTask = async (projectId,data, dispatch) => 
    {
    try {
        const response = await axiosInstance.post(`/tasks/${projectId}`, data,{
            headers: {
                'Content-Type': 'application/json',
              },
        });
        return response;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const UpdateTask = async (taskId, data, dispatch) => {
    try {
        const response = await axiosInstance.put(`/tasks/${taskId}`, data,{
            headers: {
                'Content-Type': 'application/json',
              },
        });
        return response;
    } catch (error) {
        console.log(error.response);
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

export const DeleteTask = async (taskId, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/tasks/${taskId}`);
        return response;
    } catch (error) {
        console.log(error.response);
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}

