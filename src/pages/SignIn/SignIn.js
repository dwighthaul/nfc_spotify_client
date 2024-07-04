import React, { useState } from 'react';
import './SignIn.css'; // Importation de la feuille de style CSS
import { Link, useNavigate } from "react-router-dom";
import ServerService from '../../services/ServerService';
import { UserContext } from '../../context/userContext';
import { UserSettingsContext } from '../../context/userSettingsContext';

// TODO : en faire un ocmposant car je vais aussi l'utiliser pour settings 
function openNewWindow2(url) {
  // Define properties for the new window
  const windowFeatures = {
    noreferrer: true, // Equivalent to rel="noreferrer"
    noopener: true,   // Equivalent to rel="noopener"
    popup: true
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

  const [failedLoggin, setFailedLoggin] = useState(false);

  const getSettingsAreOk = (succesCallback) => {
    ServerService.fetchCliendIdAndSecret(
      (data) => {
        const clientId = data?.clientId ?? '';
        const clientSecret = data?.clientSecret ?? '';
        let settingsAreOk;
        if (clientId !== '' && clientSecret !== '') {
          settingsAreOk = true;
        } else {
          settingsAreOk = false
        }
        // Si on retrouve les deux idClient, idSecret on notify true avec userHasClienIdAndSecret, si c'est pas le ca son notify avec false
        // Cette partie represente la validation de si les settings sont bons, ça devrait apparaitre de maniere un peu plus obvious qu'ici
        // Il y a une petite decorrelation entre les 2 noms, on verra plus tard
        userHasClienIdAndSecret(settingsAreOk);
        succesCallback(settingsAreOk);
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

      // J'utilise un bool en parametre dans la lambda car les changement par context on l'air d'être asynchrone
      // En tt cas je met a true mais ça ne passe pas le if(isClientIdAndSecret == true) c'est bizarre
      getSettingsAreOk((settingsAreOk) => {
        console.log(settingsAreOk);
        // Je prefere utiliser le contexte du settings que sessionStorage.getItem("SettingsAreOk")
        if (settingsAreOk == true) {
          openNewWindow2(`${process.env.REACT_APP_SERVEUR_ENDPOINT}/spotify/login`);
        }
        console.log("end");
      });
      // setFailedLoggin(false); // Pas besoin vu que navigate var unmounted le composant
      navigate("/home");
    }, () => {
      console.log("Login NOT OK");
      setFailedLoggin(true);
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
      <div className="failed-loggin" style={{ visibility: failedLoggin ? 'visible' : 'hidden' }}>Mauvais email ou mot de passe</div>
      <p>Pas encore de compte ? <Link to='/sign-on' >Creer</Link></p>
    </div>
  );
};

export default SignIn;