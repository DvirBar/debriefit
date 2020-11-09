import { 
    User,
    AUTH_LOADING,
    AUTH_SUCCESS,
    AUTH_ERROR,
    SOFT_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    USER_UPDATE,
    USER_ERROR,
    AuthActionTypes
} from './types';
import axios from 'axios';
import { Dispatch } from 'react';


// Basic actions
export const authLoad = (): AuthActionTypes => {
    return {
        type: AUTH_LOADING
    }
}

export const softLoad = (): AuthActionTypes => {
    return {
        type: SOFT_LOADING
    }
}


export const authSuccess = (user: User): AuthActionTypes => {
    return {
        type: AUTH_SUCCESS,
        payload: user
    }
}

export const authError = (): AuthActionTypes => {
    return {
        type: AUTH_ERROR
    }
}

export const userError = (): AuthActionTypes => {
    return {
        type: USER_ERROR
    }
}


export const getUser = () => (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(authLoad())

    axios.get('api/auth/user')
         .then(res => {
             dispatch({
                 type: AUTH_SUCCESS,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch(authError())
         })
}

export const login = (data: object) => (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(softLoad())
    const body = JSON.stringify(data)

    axios.post('api/auth/login', body)
         .then(res => {
             dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    token: res.data.token,
                    user: res.data.user,
                }
            })
         })
         .catch(err => {
             dispatch(authError())
         })
}

export const logout = (): AuthActionTypes => {
    return {
        type: LOGOUT_SUCCESS
    }
}

export const userUpdate = (id: string, data: object) => 
(dispatch: Dispatch<AuthActionTypes>) => {
    dispatch(softLoad())
    const body = JSON.stringify(data)

    axios.put(`api/auth/user/${id}`, body)
         .then(res => {
             dispatch({
                 type: USER_UPDATE,
                 payload: res.data
             })
         })
         .catch(err => {
             dispatch(userError())
         })
}
