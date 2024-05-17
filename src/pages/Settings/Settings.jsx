import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ServerService from '../../services/ServerService';
import { UserSettingsContext } from '../../context/userSettingsContext';

export default function Settings () 
{
  const [clientId, setClientId] = useState('');

  const [clientSecret, setClientSecret] = useState('');

  const { userHasClienIdAndSecret } = UserSettingsContext();
  const navigate = useNavigate();


  // PAUL : ServerService.saveSpotifyClient ne return jamais 
  const handleSubmit = (event) => {
    event.preventDefault();
    ServerService.saveSpotifyClient(clientId, clientSecret, () => {
      // Pareil ici il y a une logique de validation qui devrait transparaitre de maniere plus evidente
        if (clientId != '' && clientSecret != '') {
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
