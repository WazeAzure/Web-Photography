import React, {useState, useEffect, useRef} from 'react';

import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css'
import './App.scss'

import Home from './page/Home';
import Login from './page/Login';
import Dashboard from './page/Dashboard';
import Loading from './page/Loading';
import Gallery from './page/Gallery';
import About from './page/About';

import NavBar from './component/NavBar/NavBar';
import PrivateRoute from './page/PrivateRoute';
import Contact from './page/Contact';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  const basename = '/Web-Photography';

  useEffect(() => {
    setTimeout(() => setLoading(false), 3300)
  }, [])
  
  if(loading){
    return <Loading />
  }

  return (
    <Router className="mt-1" basename={basename}>
      <div className="app-container" style={{height: "100%"}}>
        <NavBar className=""
          li={[
          // ['Home', '', '/'],
          ['About', '', '/about'],
          ['Contact', '', '/contact'],
          ]}
        />

        <section className="gallery-content-view" style={{overflowY: "auto", width: "100%"}}>
          <Routes>
              <Route path="/" index element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path='/dashboard' element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />}/>
              </Route>
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path="/gallery/:name" element={<Gallery />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;