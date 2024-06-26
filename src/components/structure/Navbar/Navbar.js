import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { UserContext } from '../../../context/userContext';
import { UserSettingsContext } from '../../../context/userSettingsContext';


function Navbar() {
  /// 1) Etats/Données
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isDisplayDropDown, setIsDisplayDropDown] = useState(false);

   const { isConnected } = UserContext();
   const { isClientIdAndSecret } = UserSettingsContext();
  //const isConnected = false;

  const [username, setUsername] = useState('');

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 500) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  /// 2) Comportements
  const getDataFromUser = () => {
    setUsername(sessionStorage.getItem("username"))
  };

  const toggleDtopDown = () => {
    setIsDisplayDropDown(!isDisplayDropDown)
  }

  useEffect(() => {
    // showButton();
    getDataFromUser();

  }, []);


  // window.addEventListener('resize', showButton);


  // style={{ textDecoration: 'none' }} J'arrive pas a le faire marcher direct dans le css...

  /// 3) Affichage
  return (
    <>

      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>
            <img src="./images/logo.png" alt="logo" width="50" height="50" />
            Spotify Connect
          </Link>
          <div/>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {isConnected ? (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className='nav-item' >
              <Link to='/' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}> Home </Link>
            </div>
            <div className='nav-item'>
              <Link to='/playlist' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}> Playlist</Link>
            </div>
            <div className='nav-item'>
              <Link to='/dashboard' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}> Dashboard</Link>
            </div>
            <div className='nav-item'>
                    {isClientIdAndSecret ? (
                       <Link to='/settings' style={{ textDecoration: 'none' }} className='nav-links' onClick={closeMobileMenu}>Settings</Link>
                    ) : (
                      <Link to='/settings' style={{ textDecoration: 'none' }} className='nav-links nav-links-highlight' onClick={closeMobileMenu}>Settings</Link>
                    )}
            </div>
            <div className='nav-item'>
                <Link className='nav-links' style={{ textDecoration: 'none' }} onClick={toggleDtopDown}> Jojo {isDisplayDropDown ? "▲" : "▼"}</Link>
              {
                isDisplayDropDown ?
                  <div className='navbar navbar-dropdown'>
                    <div className='nav-item'>
                      <Link to='/logout' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}> Log out</Link>
                    </div>
                  </div>
                  : ""
              }
            </div>
          </ul>
          ) 
          : ( 
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className='nav-item' >
              <Link to='/sign-up' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>Sign-Up</Link>
            </div>
            <div className='nav-item' >
              <Link to='/sign-in' className='nav-links' style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>Login</Link>
            </div>
            </ul>
          ) 
            } 
        </div>
      </nav>
    </>
  );
}

export default Navbar;

