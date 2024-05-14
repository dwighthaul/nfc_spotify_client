import React, { useState, useEffect } from 'react';
import ServerService from '../../services/ServerService';


function Sign() {



	useEffect(() => {
		console.log(sessionStorage.getItem("username"))

		sessionStorage.removeItem("isConnected")
		sessionStorage.removeItem("username")
		ServerService.sendLogOut(() => {
		}, () => { })
	}, [])


	return (
		<>

		</>

	)
}
export default Sign