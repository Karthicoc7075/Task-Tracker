import { act } from 'react';
import * as types from '../contants/actionsTypes';

const initialState = {
    projects: [],
    loading: false,
    createLoading: false,
    deleteLoading: false,
    error: '',
};

const projectReducer = (state = initialState, action) => {
    switch(action.type){
        case types.GET_PROJECTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case types.GET_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.payload,
                loading: false,
                error: '',
            };
        case types.GET_PROJECTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case types.CREATE_PROJECT_REQUEST:
            return {
                ...state,
                createLoading: true,
            };
        case types.CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                createLoading: false,
                projects: [action.payload,...state.projects],
                error: '',
            };
        case types.CREATE_PROJECT_FAILURE:
            return {
                ...state,
                createLoading: false,
                error: action.error,
            };
        case types.DELETE_PROJECT_REQUEST:
            return {
                ...state,
                deleteLoading: true,
            };
        case types.DELETE_PROJECT_SUCCESS:
            return {
                ...state,
                deleteLoading: false,
                projects: state.projects.filter((project) => project._id !== action.payload._id),
                error: '',
            };
        case types.DELETE_PROJECT_FAILURE:
            return {
                ...state,
                deleteLoading: false,
                error: action.error,
            };
        default:
            return state;

        }


}

export default projectReducer;