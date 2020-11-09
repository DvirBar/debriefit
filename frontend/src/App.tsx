import React, { useEffect } from 'react';
import './style/css/App.css';
import axios from 'axios';
import { getAuth } from './redux/auth/selectors';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = 'http://10.0.0.28:5000';
axios.defaults.headers['Content-Type'] = 'application/json';

const App = () => {
  const auth = useSelector(getAuth)

  useEffect(() => {
    if(auth) {
      axios.defaults.headers.common['x-auth-token'] = auth.token;
    }
  })

  console.log(auth);
  

  return (
    <div className="App">
      Hello World
    </div>
  );
}

export default App;
