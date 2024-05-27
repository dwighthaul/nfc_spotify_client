import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './AppCss.css';
import Navbar from './components/structure/Navbar/Navbar.js';
import { Home, Playlists, SignIn, Page404, Dashboard, SignOut, Settings } from './pages'
import { UserProvider } from './context/userContext.jsx';
import { UserSettingsProvider } from './context/userSettingsContext.jsx';


export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <UserProvider>
          <UserSettingsProvider>
            <Navbar />
            <div className='app'>
              <div className='app-container'>
                <Routes>
                  <Route path='/' exact element={<Home />} />
                  <Route path='/home' exact element={<Home />} />
                  <Route path='/home2' exact element={<Home2 />} />
                  <Route path='/playlist' exact element={<Playlists />} />
                  <Route path='/sign-in' element={<SignIn />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/404' element={<Page404 />} />
                  <Route path='/logout' element={<SignOut />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='*' element={<Page404 />} />
                </Routes>
              </div>
            </div>
          </UserSettingsProvider>
        </UserProvider>
      </BrowserRouter>
    );
  }

}

