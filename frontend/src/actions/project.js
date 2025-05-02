import * as types from '../contants/actionsTypes'
import {GetAllProjects,CreateProject,DeleteProject} from '../api/project'
import {addToast} from './toaster'

export const getAllProjects = () => async (dispatch) => {
    dispatch({ type: types.GET_PROJECTS_REQUEST });
    try {
        const response = await GetAllProjects(dispatch);
        const payload = response.data.projects;
        console.log(payload);
        
        dispatch({ type: types.GET_PROJECTS_SUCCESS , payload });
    } catch (error) {
        dispatch({ type: types.GET_PROJECTS_FAILURE, error });
    }
}


export const createProject = (data) =>async(dispatch) =>{    
    dispatch({type:types.CREATE_PROJECT_REQUEST})
    try{
        const response = await CreateProject(data, dispatch)
        const payload = response.data.project
        dispatch({type:types.CREATE_PROJECT_SUCCESS , payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.CREATE_PROJECT_FAILURE, error})
    }
}




export const deleteProject = (id) =>async(dispatch) =>{
    dispatch({type:types.DELETE_PROJECT_REQUEST})
    try{
        const response = await DeleteProject(id, dispatch)
        console.log(response);
        const payload = response.data.project
        dispatch({type:types.DELETE_PROJECT_SUCCESS, payload})
        dispatch(addToast(response.message, 'success'))
    }
    catch(error){
        dispatch({type:types.DELETE_PROJECT_FAILURE, error})
    }
}
