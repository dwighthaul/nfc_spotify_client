import React, { useState, useEffect } from 'react';
import ServerService from '../../services/ServerService';

function Playlists() {
  const [playlists, setPlaylist] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedPlaylist, setselectedPlaylist] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const urlRedirection = `http://${process.env.REACT_APP_SERVEUR_ENDPOINT}:${process.env.REACT_APP_SERVEUR_PORT}/api/v1/login_spotify`

  const [button] = useState(true);



  const lancer = () => {

    ServerService.lancerPlaylist(selectedDevice, selectedPlaylist, (result) => {
      console.log(result)
    }, (error) => {
      console.log(error)
    })

  }

  useEffect(() => {

    const getPlaylist = () => {
      ServerService.fetchPlaylists((data) => {

        if (data && data.items) {
          setPlaylist(data.items);

        }

      }, (error) => {
      });
    }


    const getDevices = () => {
      ServerService.fetchDevices((data) => {

        if (data && data.devices) {
          setDevices(data.devices);
        }

      }, (error) => {
      });
    }
    getPlaylist();
    getDevices();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render


  return (
    <div>


      {button && <a target="_blank" rel="noreferrer" href={urlRedirection} buttonstyle='btn--outline' >SIGN UP</a>}

      <select onChange={(e) => setselectedPlaylist(e.target.value)}>
        <option value="" disabled selected>Sélectionner une playlist</option>
        {playlists.map(option => (
          <option value={option.uri} key={option.uri}>{option.name}</option>
        ))}
      </select>

      <select onChange={(e) => setSelectedDevice(e.target.value)}>
        <option value="" disabled selected >Sélectionner un device</option>
        {devices.map(option => (
          <option value={option.id} key={option.id}>{option.name} - {option.type}</option>
        ))}
      </select>

      <button className='float_r'
        title="Lancer"
        color="#000000"
        onClick={() => lancer()}
      >Lancer</button>
    </div>
  );
}

export default Playlists;