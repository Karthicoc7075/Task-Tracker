import axiosInstance from './axiosConfig';
import { addToast } from '../actions/toaster';


export const GetAllProjects = async (dispatch) => {
    
    try {
        const response = await axiosInstance.get('/projects');
        return response;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}


export const CreateProject = async (data, dispatch) => {
    try {
        const response = await axiosInstance.post('/projects', data,{
            headers: {
               'Content-Type': 'application/json',
              },
        });
        return response;
    } catch (error) {
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}



export const DeleteProject = async (id, dispatch) => {
    try {
        const response = await axiosInstance.delete(`/projects/${id}`);
        return response;
    } catch (error) {
        console.log(error.response);
        dispatch(addToast(error.response?.data?.message || error.message, 'error'));
    }
}
