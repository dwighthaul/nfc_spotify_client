import React, { useState, useEffect } from 'react';
import ServerService from '../../services/ServerService';
import './Dashboard.css';
import UserTemplate from '../../components/structure/UserTemplate/UserTemplate';

function Dashboard() {

	const [utilisateurs, setUtilisateurs] = useState([])
	const [userSelected, setUserSelected] = useState(null)

	/**
	 * Init
	 */
	useEffect(() => {
		getUsers()
	}, [])
	 // Le tableau vide [] signifie que cet effet n'a pas de dépendances, donc il ne s'exécutera qu'une fois lors du montage initial


	const getUsers = () => {
		ServerService.fetchUsersInfos((data) => {
			setUtilisateurs(data)
		}, () => { })
	}

	const formatDate = (date) => {
		return new Date(date).toISOString().replace(/T/, ' ').replace(/\..+/, '');
	}


	const clearUserSelected = () => {
		setUserSelected(null)
	}


	const toggleEstEditerLigne = (user) => {
		setUserSelected(JSON.parse(JSON.stringify(user)))
	}

	const toggleEstSupprimerLigne = (user) => {
		console.log(user)
	}

	const estSauvegarder = () => {

	}


	return (
		<>

			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Username</th>
						<th>Password Hash</th>
						<th>Client ID</th>
						<th>Client Secret</th>
						<th>Created At</th>
						<th>Updated At</th>
						<th>Update</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{utilisateurs.map((user, rowIndex) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.username} </td>
							<td>{user.passwordHash}</td>
							<td>{user.clientId}</td>
							<td>{user.clientSecret}</td>
							<td>{formatDate(user.createdAt)}</td>
							<td>{formatDate(user.updatedAt)}</td>
							<td> <button onClick={() => { toggleEstEditerLigne(user); }}>Update</button></td>
							<td> <button onClick={() => { toggleEstSupprimerLigne(rowIndex); }}>Delete</button></td>
						</tr>
					))}
				</tbody>
			</table >

			<br />
			{userSelected && userSelected.username}
			{userSelected ?

				<div id="myModal" className="modal">


					<div className="modal-content">
						<div className="flex-container" >
							<div className="flex-item-6" >
								User id : {userSelected.id}
							</div>
							<div className="flex-item-1" >
								<span className=""><button onClick={() => { clearUserSelected() }}>Fermer</button>
								</span>
							</div>
						</div>
						<div className="flex-container" >
							<div className="flex-item-1" >
								{<UserTemplate data={userSelected} ></UserTemplate>}
							</div>
						</div>
						<div className="flex-container" >
							<div className="flex-item-1" >
								<button type="submit" onClick={() => { clearUserSelected() }} >Annuler</button>
							</div>
							<div className="flex-item-1" >
								<button type="submit" onClick={() => estSauvegarder()} >Sauvegarder</button>
							</div>
						</div>

					</div>
				</div>
				: ""
			}


		</>
	)

}


export default Dashboard