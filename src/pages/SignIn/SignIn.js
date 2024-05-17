import React, { useState } from 'react';
import './SignIn.css'; // Importation de la feuille de style CSS
import { Link, useNavigate } from "react-router-dom";
import ServerService from '../../services/ServerService';
import { UserContext } from '../../context/userContext';
import { UserSettingsContext } from '../../context/userSettingsContext';

function openNewWindow(url) {
  // Define properties for the new window
  const windowFeatures = {
    noreferrer: true, // Equivalent to rel="noreferrer"
    noopener: true,   // Equivalent to rel="noopener"
  };

  // Construct a string of properties
  const features = Object.keys(windowFeatures)
    .map(key => `${key}=${windowFeatures[key]}`)
    .join(',');

  // Open the new window with specified URL and properties
  window.open(url, '_blank', features);
}


const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const { userIsConnected } = UserContext();
  const { userHasClienIdAndSecret } = UserSettingsContext();


  const getSettingsAreOk = () => {
		ServerService.fetchCliendIdAndSecret(
      (data) => {
        const clientId = data?.clientId ?? '';
        const clientSecret = data?.clientSecret ?? '';
        if (clientId != '' && clientSecret != '' ) {
          // Si on retrouve les deux idClient, idSecret on notify true avec userHasClienIdAndSecret, si c'est pas le ca son notify avec false
          // Cette partie represente la validation de si les settings sont bons, ça devrait apparaitre de maniere un peu plus obvious qu'ici
          
          // Il y a une petite decorrelation entre les 2 noms, on verra plus tard
          userHasClienIdAndSecret(true);
          // On sauvegarde dans la session au cas ou une refresh f5 est fait=> comme ça ça permet de regarder si SettingsAreOk 
          // existe au moment du montage du contexte
          sessionStorage.setItem("SettingsAreOk", true);
        }
		}
    , (error) => { 
      console.log("error fetching settings :" + error);
    }); 
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    ServerService.sendLogin(username, password, (data) => {
      userIsConnected(); // permet de notifier le reste de l'App qu'un user est connecté
      sessionStorage.setItem("username", data.username)
      sessionStorage.setItem("isConnected", true)
      console.log("Login OK")
      openNewWindow("http://localhost:3000/api/v1/login_spotify");

      getSettingsAreOk();

      navigate("/home");
    }, () => {
      console.log("Login OK")
    })
  };

  return (
    <div className="signup-container">
      
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label><br />
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label><br />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Sign in</button>
      </form>
      <p>Pas encore de compte ? <Link to='/sign-on' >Creer</Link></p>
    </div>
  );
};

export default SignIn;