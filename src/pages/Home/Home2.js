import React, { useState, useEffect } from 'react';

function Home2() {
	useEffect(() => {
		// Set cookie
		fetch('https://serveur.dwighthaul.net/set-cookie', {
			method: 'GET',
			credentials: 'include',
		})
			.then(() => {
				// Get cookie
				return fetch('https://serveur.dwighthaul.net/get-cookie', {
					method: 'GET',
					credentials: 'include',
				});
			})
			.then(response => response.json())
			.then(data => console.log('Cookie received:', data))
			.catch(error => console.error('Error:', error));
	}, []);

	return (
		<div>
			Check console for cookie data.
		</div>
	);
}

export default Home2