import ServerService from "./ServerService";

class ServerServiceSpotify extends ServerService {



	static fetchPlaylists = (callbackSuccess, callbackError) => {
		ServerService.getData('spotify/playlists', callbackSuccess, callbackError)
	}

	static lancerPlaylist(selectedDevice, selectedPlaylist, callbackSuccess, callbackError) {
		let endPoint = 'spotify/launchPlaylist/?id_device=' + selectedDevice + '&playlist_uri=' + selectedPlaylist
		ServerService.getDataNoJson(endPoint, callbackSuccess, callbackError)
	}

	static lancerPlaylistFromTag(selectedTagId, callbackSuccess, callbackError) {
		let endPoint = 'spotify/launchPlaylistFromTagId/?id_tag=' + selectedTagId
		ServerService.getDataNoJson(endPoint, callbackSuccess, callbackError)
	}


	static fetchDevices = (callbackSuccess, callbackError) => {
		ServerService.getData('spotify/devices', callbackSuccess, callbackError)
	}
}

export default ServerServiceSpotify;