import React, { useState, useEffect } from 'react';
import ServerService from '../../services/ServerService';
import ServerServiceData from '../../services/db/ServerServiceData';
import ServerServiceSpotify from '../../services/ServerServiceSpotify';
const { HTTPMethod } = require('http-method-enum')


function Playlists() {
	const [playlists, setPlaylist] = useState([]);
	const [devices, setDevices] = useState([]);
	const [tags, setTags] = useState([]);
	const [selectedPlaylist, setselectedPlaylist] = useState(null);
	const [selectedTagId, setSelectedTagId] = useState(null);
	const [selectedDevice, setSelectedDevice] = useState(null);

	const [button] = useState(true);



	const lancer = () => {

		ServerServiceSpotify.lancerPlaylist(selectedDevice, selectedPlaylist, (result) => {
			console.log(result)
		}, (error) => {
			console.log(error)
		})

	}

	const lancerTag = () => {
		console.log("selectedTag", selectedTagId)
		ServerServiceSpotify.lancerPlaylistFromTag(selectedTagId, (result) => {
			console.log(result)
		}, (error) => {
			console.log(error)
		})

	}


	useEffect(() => {
		const getPlaylist = () => {
			ServerServiceSpotify.fetchPlaylists((data) => {
				if (data && data.items) {
					setPlaylist(data.items);
				}
			}, (error) => {
				console.log(error);
			});
		}

		const getDevices = () => {
			ServerServiceSpotify.fetchDevices((data) => {

				if (data && data.devices) {
					setDevices(data.devices);
				}

			}, (error) => {
			});
		}


		const getTags = () => {
			console.log("getTags")

			ServerServiceData.fetchTagsFromUserId((data) => {
				console.log(data)
				if (data) {
					setTags(data);
				}
			}, (error) => {
			});
		}

		getPlaylist();
		getDevices();
		getTags();
	}, []);

	return (
		<div className="flex-container" >
			<div className="flex-item-1" >
				<select onChange={(e) => setSelectedTagId(e.target.value)}>
					<option value="" disabled selected>Sélectionner un tag</option>
					{tags.map(option => (
						<option value={option.id} key={option.id}>{option.tagName}</option>
					))}
				</select>
				<button className='float_r'
					title="Lancer"
					color="#000000"
					onClick={() => lancerTag()}
				>Lancer</button>
			</div>

			<div className="flex-item-1" >

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
		</div>

	);
}

export default Playlists;