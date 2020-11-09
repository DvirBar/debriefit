// Interfaces
export interface User {
    _id: string
    email: string
    isAdmin: boolean
}

export interface AuthState {
    token: string | null
    isAuthenticated: boolean
    loading: boolean
    softLoad: boolean
    user: User | null
}

// Action types
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERROR = 'AUTH_ERROR';
export const SOFT_LOADING = 'SOFT_LOADING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const USER_UPDATE = 'USER_UPDATE';
export const USER_ERROR = 'USER_ERROR';

interface AuthLoadAction {
    type: typeof AUTH_LOADING
}

interface AuthSuccessAction {
    type: typeof AUTH_SUCCESS
    payload: User
}

interface AuthErrorAction {
    type: typeof AUTH_ERROR
}

interface SoftLoadAction {
    type: typeof SOFT_LOADING
}

interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS
    payload: {
        token: string
        user: User
    }
}

interface LogoutSuccessAction {
    type: typeof LOGOUT_SUCCESS
}

interface UserUpdateAction {
    type: typeof USER_UPDATE
    payload: User
}

interface UserErrorAction {
    type: typeof USER_ERROR
}

export type AuthActionTypes = 
    AuthLoadAction |
    AuthSuccessAction |
    AuthErrorAction |
    SoftLoadAction |
    LoginSuccessAction |
    LogoutSuccessAction |
    UserUpdateAction |
    UserErrorAction

