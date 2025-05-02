import * as types from '../contants/actionsTypes';


const initialState = {
    loading: false,
    error: '',
    data: null,
}


const dashboardReducer=(state = initialState, action)=> {
    switch (action.type) {
        case types.GET_DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case types.GET_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case types.GET_DASHBOARD_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}


export default dashboardReducer;