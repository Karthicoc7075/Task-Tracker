import { createStore , applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { loadState, saveState } from '../utils/localStorage'
import  {composeWithDevTools} from '@redux-devtools/extension'
import authReducer from '../reducers/auth';
import dashboardReducer from '../reducers/dashboard';
import projectReducer from '../reducers/project';
import taskReducer from '../reducers/task';
import toastReducer from '../reducers/toaster';

const rootReducer = combineReducers({
    auth: authReducer,
    dashboard: dashboardReducer,
    project: projectReducer,
    task: taskReducer,
    toast: toastReducer,   
});

const persistedState = loadState();

const store = createStore(
    rootReducer,
    {auth:persistedState?.auth,
    },
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state);
    
    saveState({auth:state?.auth, })
});

export default store;
