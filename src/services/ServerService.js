const { HTTPMethod } = require('http-method-enum')

const BASE_URL = `${process.env.REACT_APP_SERVEUR_ENDPOINT}`
//:${process.env.REACT_APP_SERVEUR_PORT}

class ServerService {

	// Private function
	static #getData(endPoint, callbackSuccess, callbackError) {
		fetch(`${BASE_URL}/${endPoint}`, {
			headers: { 'Content-Type': 'application/json' },
			"method": HTTPMethod.GET,
			"credentials": 'include',
			mode: 'cors'
		})
			.then(response => {
				if (!response.ok) {
					callbackError(response)
					throw new Error('Failed to fetch data');
				}
				return response.json();
			})
			.then(data => {
				callbackSuccess(data)
			})
			.catch(error => {
				callbackError(error)
			});
	}

	// Private function
	static #postData(endPoint, body, callbackSuccess, callbackError) {
		console.log(BASE_URL)

		fetch(`${BASE_URL}/${endPoint}`, {
			headers: { 'Content-Type': 'application/json' },
			"method": HTTPMethod.POST,
			"credentials": 'include',
			"body": JSON.stringify(body),
			mode: 'cors'
		})
			.then(response => {

				//				callbackError(response)
				if (!response.ok) {

					//callbackError("error")
					throw new Error('Failed to fetch data');
				}
				return response.json();
			})
			.then(data => {
				callbackSuccess(data)
			})
			.catch(error => {
				callbackError(error)
			});
	}

	static #postDataNoReturnData(endPoint, body, callbackSuccess, callbackError) {
		fetch(`${BASE_URL}/${endPoint}`, {
			headers: { 'Content-Type': 'application/json' },
			"method": HTTPMethod.POST,
			"credentials": 'include',
			"body": JSON.stringify(body),
			mode: 'cors'
		})
			.then(response => {
				console.log();
				if (response.status != 200) {
					throw new Error('Failed to fetch data');
				}
				callbackSuccess()
			})
			.catch(error => {
				callbackError(error)
			});
	}

	static fetchPlaylists = (callbackSuccess, callbackError) => {
		ServerService.#getData('api/v1/playlists', callbackSuccess, callbackError)
	}

	static lancerPlaylist(selectedDevice, selectedPlaylist, callbackSuccess, callbackError) {
		let endPoint = 'api/v1/launch_song/?id_device=' + selectedDevice + '&playlist_uri=' + selectedPlaylist
		ServerService.#getData(endPoint, callbackSuccess, callbackError)
	}

	static fetchDevices = (callbackSuccess, callbackError) => {
		ServerService.#getData('api/v1/devices', callbackSuccess, callbackError)
	}

	static fetchUserInfos = (callbackSuccess, callbackError) => {
		ServerService.#getData('getSession', callbackSuccess, callbackError)
	}

	static fetchUsersInfos = (callbackSuccess, callbackError) => {
		ServerService.#getData('getUsers', callbackSuccess, callbackError)
	}


	static fetchCliendIdAndSecret = (callbackSuccess, callbackError) => {
		ServerService.#getData('getClientIdAndSecret', callbackSuccess, callbackError)
	}


	static sendLogin = (username, password, callbackSuccess, callbackError) => {
		let body = {
			username: username,
			password: password
		}
		ServerService.#postData('login', body, callbackSuccess, callbackError)
	}

	static sendLogOut = (callbackSuccess, callbackError) => {
		var body = {}
		ServerService.#postDataNoReturnData('logout', body, callbackSuccess, callbackError)
	}

	static saveSpotifyClient = (clientId, clientSecret, callbackSuccess, callbackError) => {
		let body = {
			clientId: clientId,
			clientSecret: clientSecret
		}
		ServerService.#postDataNoReturnData('updateSettings', body, callbackSuccess, callbackError)
	}

	static setCookies = (callbackSuccess, callbackError) => {
		ServerService.#getData('set-cookie', callbackSuccess, callbackError)
	}

	static getCookies = (callbackSuccess, callbackError) => {
		-		ServerService.#getData('getCookies', callbackSuccess, callbackError)
		ServerService.#getData('get-cookie', callbackSuccess, callbackError)
	}

}

export default ServerService;