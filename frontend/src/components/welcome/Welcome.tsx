import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getAuth } from '../../redux/auth/selectors';
import Login from './Login';
import Register from './Register';

const Welcome: React.FC = () => {
    const auth = useSelector(getAuth)

    if(auth.isAuthenticated)
        return <Redirect to="/" />

    return (
        <div>
           Welcome
           <Login />
           <Register />
        </div>
    )
}

export default Welcome
