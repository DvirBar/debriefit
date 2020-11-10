import React, { useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth/selectors';
import Welcome from '../welcome/Welcome';

interface Props {
    component: React.ElementType
    [rest: string]: any
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const auth = useSelector(getAuth)
    
    return (
        <Route {...rest} render = {props => {
            if(auth.isAuthenticated) {                
                return <Component {...rest} {...props} />;
            } else if(auth.loading) {
                return <div>Loading...</div>
            } else {
                return <Welcome />
            }
        }
        } />
    )
}

export default ProtectedRoute;