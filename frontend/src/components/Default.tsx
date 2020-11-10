import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainRouter from './routing/MainRouter';

const Default = () => {
    return (
        <div>
            Navbar
           <MainRouter />
        </div>
    )
}

export default Default
