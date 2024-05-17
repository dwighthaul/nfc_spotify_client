import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './AppCss.css';
import Navbar from './components/structure/Navbar/Navbar.js';
import Home from './pages/Home/Home.js';
import Playlists from './pages/Playlists/Playlists.js';
import SignIn from './pages/SignIn/SignIn.js';
import Page404 from './pages/Page404/Page404.js';
import Dashboard from './pages/Dashboard/Dashboard.js';
import SignOut from './pages/SignOut/SignOut.js';


export default class App extends React.Component {



  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <div className='app'>
          <div className='app-container'>
            <Routes>
              <Route path='/' exact element={<Home />} />
              <Route path='/home' exact element={<Home />} />
              <Route path='/playlist' exact element={<Playlists />} />
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/404' element={<Page404 />} />
              <Route path='/logout' element={<SignOut />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='*' element={<Page404 />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }

}

