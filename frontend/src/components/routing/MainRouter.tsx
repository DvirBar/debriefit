import React from 'react';
import { Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';


const MainRouter: React.FC = () => {
    return ( 
        <div className="main-router">
            <Switch>
                <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
        </div>
    )
}

export default MainRouter;