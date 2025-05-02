import * as actionTypes from '../contants/actionsTypes'

const initialState = {
    user: null,
    token: null,
    loading: false,
    error: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actionTypes.SIGNUP_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                loading: false,
                error: '',
            };
        case actionTypes.SIGNUP_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false,
                error: action.payload,
            };
        case actionTypes.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
            };
            case actionTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: true,
                    user: action.payload.user,
                    token: action.payload.token,
                    loading: false,
                    error: '',
                };
            case actionTypes.LOGIN_FAILURE:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    loading: false,
                    error: action.payload,
                };

            case actionTypes.LOGOUT_REQUEST:
                return {
                    ...state,
                    loading: true,
                };

            case actionTypes.LOGOUT_FAILURE:
                return {
                    ...state,
                    loading: false,
                    error: action.payload,
                };
            case actionTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    isAuthenticated: false,
                    user: null,
                    token: null,
                    loading: false,
                    error: '',
                };

  
      
        default:
            return state;
    }
};

export default authReducer;