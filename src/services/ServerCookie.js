import ServerService from "./ServerService";

class ServerCookie extends ServerService {


	static setCookies = (callbackSuccess, callbackError) => {
		ServerService.getData('cookie/set-cookie', callbackSuccess, callbackError)
	}

	static setCookiesAuth = (callbackSuccess, callbackError) => {
		ServerService.getData('cookie/set-cookie-authorisation', callbackSuccess, callbackError)
	}

	static getCookies = (callbackSuccess, callbackError) => {
		ServerService.getData('cookie/get-cookie', callbackSuccess, callbackError)
	}
}

export default ServerCookie;
