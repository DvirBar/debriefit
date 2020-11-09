import {
    AuthState,
    AuthActionTypes,
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    SOFT_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_UPDATE,
    USER_ERROR
} from './types'

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: false,
    softLoad: false,
    user: null
}

export function authReducer(
    state = initialState,
    action: AuthActionTypes
): AuthState {
    switch(action.type) {
        case AUTH_LOADING:
            return {
                ...state,
                loading: true
            }

        case AUTH_SUCCESS: {
            const payload = action.payload
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }
        }
            
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                token: null,
                user: null
            }

        case SOFT_LOADING:
            return {
                ...state,
                softLoad: true
            }

        case LOGIN_SUCCESS: {
            const payload = action.payload
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                softLoad: false,
                token: payload.token,
                user: payload.user
            }
        }
        
        case USER_UPDATE:
            const payload = action.payload
            
            return {
                ...state,
                softLoad: false,
                user: payload
            }

        case USER_ERROR: 
            return {
                ...state,
                softLoad: false,
                loading: false
            }

        default:
            return state
    }
}