import React, { useEffect } from 'react';
import './style/css/App.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './components/routing/MainRouter';
import { getAuth } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './redux/auth/actions';
import Default from './components/Default';
import Welcome from './components/welcome/Welcome';

axios.defaults.baseURL = 'http://10.0.0.28:5000';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

const App = () => {
  const dispatch = useDispatch()

  const auth = useSelector(getAuth)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  if(!auth || auth.loading) 
    return <div>Loading...</div>

  return (
    <BrowserRouter>
      <div className="App">
        {auth.isAuthenticated
        ? <Default />
        : <Welcome />
        }
      </div>
    </BrowserRouter>

  );
}

export default App;
