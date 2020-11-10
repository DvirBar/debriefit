import React, { useEffect } from 'react';
import './style/css/App.css';
import axios from 'axios';
import { getAuth } from './redux/auth/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/welcome/Login';
import { getUser } from './redux/auth/actions';

axios.defaults.baseURL = 'http://10.0.0.28:5000';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

const App = () => {
  const dispatch = useDispatch()

  const auth = useSelector(getAuth)

  useEffect(() => {
    dispatch(getUser())
  }, [])

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
