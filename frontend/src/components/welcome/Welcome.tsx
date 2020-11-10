import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getAuth } from '../../redux/auth/selectors';
import Login from './Login';

const Welcome = () => {
    const auth = useSelector(getAuth)

    if(auth.isAuthenticated)
        return <Redirect to="/" />

    return (
        <div>
           Welcome
           <Login />
        </div>
    )
}

export default Welcome
