import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/auth/selectors';

interface Props {
    components: {
        defComp: React.ElementType,
        authComp: React.ElementType
    }
    [rest: string]: any
}

const DualRoute: React.FC<Props> = ({ components: Component, ...rest }) => {
    const auth = useSelector(getAuth)
    
    return (
        <Route {...rest} render = {props => {
            if(auth.isAuthenticated) {
                return <Component.authComp />;
            } else if(auth.loading) {
                return <div>Loading...</div>
            } else {
                return <Component.defComp />;
            }
        }} />
    )
}

export default DualRoute;