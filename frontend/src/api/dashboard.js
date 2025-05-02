import axiosInstance from "./axiosConfig"
import { addToast } from '../actions/toaster'


export const GetDatas = async (formData,dispatch) => {

    try {
        const response = await axiosInstance.get('/dashboard/', formData);
        return response.data;
    } catch (error) {
        dispatch(addToast(error.response.data.message || error.message , 'error'));
    }
}