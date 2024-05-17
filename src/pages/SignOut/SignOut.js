import React, { useState, useEffect } from 'react';
import ServerService from '../../services/ServerService';
import { UserContext } from '../../context/userContext';
import { Link } from 'react-router-dom';

function Sign() {

	const { userIsDisconnected } = UserContext();


	useEffect(() => {
		sessionStorage.removeItem("isConnected")
		sessionStorage.removeItem("username")
		ServerService.sendLogOut(() => {
			console.log("Je logout");
			userIsDisconnected(); // Notify l'ensemble de l'app de la deconnection
		}, () => { })
	}, [])


	return (
		<div>
			<div>
				Vous vous êtes déconnecté avec succès
			</div> 
			<Link to='/'> Home </Link>
		</div>
		

	)
}
export default Sign