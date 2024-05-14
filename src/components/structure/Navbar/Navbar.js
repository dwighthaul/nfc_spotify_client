import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [isDisplayDropDown, setIsDisplayDropDown] = useState(false);

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

  const getDataFromUser = () => {
    setIsConnected(sessionStorage.getItem("isConnected"))
    setUsername(sessionStorage.getItem("username"))

  };

  const toggleDtopDown = () => {
    setIsDisplayDropDown(!isDisplayDropDown)
  }

  useEffect(() => {
    showButton();

    getDataFromUser();


  }, []);

  window.addEventListener('resize', showButton);





  return (
    <>

      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <img src="./images/logo.png" alt="logo" width="50" height="50" />
            SC
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <div className='nav-item'>
              <Link to='/' className='nav-links' onClick={closeMobileMenu}> Home </Link>
            </div>
            <div className='nav-item'>
              <Link to='/playlist' className='nav-links' onClick={closeMobileMenu}> Playlist</Link>
            </div>
            <div className='nav-item'>
              <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}> Dashboard</Link>
            </div>
            <div className='nav-item'>
              {isConnected ? (
                <Link className='nav-links' onClick={toggleDtopDown}> {username} {isDisplayDropDown ? "▲" : "▼"}</Link>
              ) : (
                <Link to='/sign-in' className='nav-links' onClick={closeMobileMenu}>Login</Link>
              )}

              {
                isDisplayDropDown ?
                  <div className='navbar navbar-dropdown'>
                    <div className='nav-item'>
                      <Link to='/settings' className='nav-links' onClick={closeMobileMenu}>Settings</Link>
                    </div>
                    <div className='nav-item'>
                      <Link to='/logout' className='nav-links' onClick={closeMobileMenu}> Log out</Link>
                    </div>
                  </div>
                  : ""
              }
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

