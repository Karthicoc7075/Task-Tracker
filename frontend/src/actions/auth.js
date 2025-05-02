import * as actionTypes from '../contants/actionsTypes';
import { signupUser, loginUser } from '../api/auth'
import { addToast } from '../actions/toaster'




export const signup = (formData) => async (dispatch) => {
    dispatch({ type: actionTypes.SIGNUP_REQUEST });

    try {
        const response = await signupUser(formData, dispatch)
        const payload = response.data
        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload });
        dispatch(addToast(response.message, 'success'))
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.SIGNUP_FAILURE, error });
    }
}


export const login = (formData) => async (dispatch) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST })

    try {
        const response = await loginUser(formData, dispatch)
        console.log(response);

        const payload = response.data
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload })
        dispatch(addToast(response.message, 'success'))
    }
    catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.LOGIN_FAILURE, error })
    }
}





export const logout = () => async (dispatch) => {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });

    try {
        dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: actionTypes.LOGOUT_FAILURE, error });
    }
}