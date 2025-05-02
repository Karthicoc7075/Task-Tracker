import * as types from '../contants/actionsTypes';

const initialState = {
    tasks: [],
    task: null,
    loading: false,
    getLoading: false,
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
    error: '',
};

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_TASKS_REQUEST:
            return {
                ...state,
                getLoading: true,
            };
        case types.GET_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.payload,
                getLoading: false,
                error: '',
            };
        case types.GET_TASKS_FAILURE:
            return {
                ...state,
                getLoading: false,
                error: action.error,
            };
        case types.CREATE_TASK_REQUEST:
            return {
                ...state,
                createLoading: true,
            };
        case types.CREATE_TASK_SUCCESS:
            return {
                ...state,
                createLoading: false,
                tasks: [action.payload,...state.tasks],
                error: '',
            };
        case types.CREATE_TASK_FAILURE:
            return {
                ...state,
                createLoading: false,
                error: action.error,
            };
        case types.UPDATE_TASK_REQUEST:
            return {
                ...state,
                updateLoading: true,
            };
        case types.UPDATE_TASK_SUCCESS:
            return {
                ...state,
                updateLoading: false,
                tasks: state.tasks.map((task) => task._id === action.payload._id ? action.payload : task),
                error: '',
            };
        case types.UPDATE_TASK_FAILURE:
            return {
                ...state,
                updateLoading: false,
                error: action.error,
            };
        case types.DELETE_TASK_REQUEST:
            return {
                ...state,
                deleteLoading: true,
            };
        case types.DELETE_TASK_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                tasks: state.tasks.filter((task) => task._id !== action.payload._id),
                error: '',
            };
        case types.DELETE_TASK_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.error,
            };
        default:
            return state;

    }
}

export default taskReducer;

