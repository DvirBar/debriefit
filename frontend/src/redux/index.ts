import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';

const appReducer = combineReducers({
    auth: authReducer
});

const rootReducer = (state: any, action: any) => {
    if(action.type === 'LOGOUT_SUCCESS') {
        state = undefined
    }
    
    return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer