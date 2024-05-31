import React from 'react';

import ServerService from '../../services/ServerService';

function Home() {

  const getCookies = () => {
    console.log("Get Cookies")

    fetch('https://serveur.dwighthaul.net/get-cookie', {
      method: 'GET', // or GET, PUT, etc.
      credentials: 'include', // Include credentials (cookies) in the request
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* your data */ })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
    /*
        ServerService.getCookies((result) => {
          console.log("Get Cookies OK")
          console.log(result)
        }, (error) => {
          console.log(error)
        })
    */
  }
  const setCookies = () => {
    console.log("Set Cookies")

    fetch('https://serveur.dwighthaul.net/set-cookie', {
      method: 'GET', // or GET, PUT, etc.
      credentials: 'include', // Include credentials (cookies) in the request
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ /* your data */ })
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));


    /*
    ServerService.setCookies((result) => {
      console.log("Set Cookies OK")
      console.log(result)
    }, (error) => {
      console.log(error)
    })
    */

  }

  return (
    <>
      <h1>Spotify Connect - 3</h1>
      <button onClick={() => getCookies()}>GetCookies</button>
      <button onClick={() => setCookies()}>SetCookies</button>
      <div>
        <p>
          "Entrez dans un tout nouveau monde d'expérience musicale avec Spotify Connect, l'outil ultime pour harmoniser votre musique avec votre vie. Imaginez-vous contrôler la bande sonore de votre journée, que vous soyez en train de cuisiner dans la cuisine, de vous détendre dans le salon ou même de faire la fête avec des amis. Avec Spotify Connect, c'est maintenant possible, sans interruption et sans effort.
        </p><br />
        <p>
          Connectez-vous en un clin d'œil à tous vos appareils compatibles, des enceintes intelligentes aux téléviseurs connectés, en passant par les consoles de jeu et les systèmes audio domestiques. Laissez la musique vous suivre où que vous alliez, sans interruption ni contrainte. Il vous suffit de sélectionner votre chanson préférée sur votre téléphone, votre tablette ou votre ordinateur, puis de la diffuser instantanément sur n'importe quel appareil connecté à Spotify. C'est comme avoir un orchestre personnel à portée de main, prêt à jouer votre mélodie préférée à tout moment.
        </p><br />
        <p>
          Avec Spotify Connect, votre musique est plus que de simples notes et des paroles; elle devient le fil conducteur de vos aventures quotidiennes, créant des souvenirs inoubliables à chaque écoute. Préparez-vous à découvrir une nouvelle dimension de votre expérience musicale avec Spotify Connect - où la musique et la vie se fondent en harmonie parfaite."
        </p>
      </div>
    </>
  );

}



export default Home