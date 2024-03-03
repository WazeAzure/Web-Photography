import React, {useState, useEffect} from 'react';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import './App.scss'

import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import Loading from './page/Loading';
import Gallery from './page/Gallery';

import NavBar from './component/NavBar/NavBar';
import PrivateRoute from './page/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, [])
  
  if(loading){
    return <Loading />
  }

  return (
    <Router className="mt-1">
      <div className="row" style={{height: "100%"}}>
        <NavBar className="col"
          li={[
          // ['Home', '', '/'],
          ['About', '', '/about'],
          ]}
        />
        <section className="col">
          <Routes>
              <Route path="/" index element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
              </Route>
              <Route path="/gallery/:name" element={<Gallery />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;