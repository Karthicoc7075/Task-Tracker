import axiosInstance from "./axiosConfig"
import { addToast } from '../actions/toaster'


export const signupUser = async (formData, dispatch) => {

    try {
        const response = await axiosInstance.post('/auth/signup', formData);
        return response;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message, 'error'));
    }
}


export const loginUser = async (formData, dispatch) => {
    try {
        const response = await axiosInstance.post('/auth/login', formData);
        return response
    } catch (error) {
        ;

        dispatch(addToast(error.response.data.message || error.message, 'error'));
    }
}

