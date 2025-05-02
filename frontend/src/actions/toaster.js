import { ADD_TOAST, REMOVE_TOAST } from '../contants/actionsTypes';

export const addToast = (message, type) => ({
    type: ADD_TOAST,
    payload: { message, type, id: Date.now() }
  });
  
  export const removeToast = (id) => ({
    type: REMOVE_TOAST,
    payload: id
  });