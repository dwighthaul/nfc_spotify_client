import ServerService from "../ServerService";

class ServerServiceData extends ServerService {

	static fetchTagsFromUserId = (callbackSuccess, callbackError) => {
		ServerService.getData('user/getTagsFromCurentUser', callbackSuccess, callbackError)
	}


}

export default ServerServiceData;