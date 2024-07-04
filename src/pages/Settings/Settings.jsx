import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ServerService from '../../services/ServerService';
import { UserSettingsContext } from '../../context/userSettingsContext';

function openNewWindow(url) {
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


export default function Settings() {
  const [clientId, setClientId] = useState('');

  const [clientSecret, setClientSecret] = useState('');

  const { isClientIdAndSecret, userHasClienIdAndSecret } = UserSettingsContext();
  const navigate = useNavigate();


  // PAUL : ServerService.saveSpotifyClient ne return jamais 
  const handleSubmit = (event) => {
    event.preventDefault();
    ServerService.saveSpotifyClient(clientId, clientSecret, () => {
      // Pareil ici il y a une logique de validation qui devrait transparaitre de maniere plus evidente (ou au moins dans un module réutilisable)
      if (clientId != '' && clientSecret != '') {
        // On a pas encore fait la redirection
        if (isClientIdAndSecret == false) {
          openNewWindow(`${process.env.REACT_APP_SERVEUR_ENDPOINT}/spotify/login`);
        }
        userHasClienIdAndSecret(true);
      }
      else {
        userHasClienIdAndSecret(false);
      }
      console.log("Settings saved");
      navigate("/home");
    }, () => {
      console.log("Failed to update settings");
    });
  };

  const getSettings = () => {
    ServerService.fetchCliendIdAndSecret(
      (data) => {
        const savedClientId = data?.clientId ?? '';
        setClientId(savedClientId);
        const savedClientSecret = data?.clientSecret ?? '';
        setClientSecret(savedClientSecret);
      }
      , (error) => {
        console.log("error fetching settings :" + error);
      });
  }


  useEffect(() => {
    getSettings();

  }, []);



  return (
    <div className="settings-container">
      <h2>Connecter vous sur le dashboard de votre compte Spotify pour récupérer code code_client et code_secret</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="clientId">client id:</label><br />
          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="clientSecret">client secret:</label><br />
          <input
            type="text"
            id="clientSecret"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
          />
        </div>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};
