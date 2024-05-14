import { useState } from "react"

import './UserTemplate.css';

function UserTemplate({ data }) {

	if (null == data.NFCTags) {
		data.NFCTags = []
	}


	const [formData, setFormData] = useState(data);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleTagChange = (index, e) => {
		const { name, value } = e.target;
		const updatedTags = [...formData.NFCTags];
		updatedTags[index][name] = value;
		setFormData({ ...formData, NFCTags: updatedTags });
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		//onSubmit(formData);
	};

	const removeTag = (index) => {
		console.log(index)
		const newUser = { ...formData, NFCTags: formData.NFCTags.filter((tag, indeLoop) => indeLoop !== index) };
		console.log(newUser)

		setFormData(newUser)
	};
	const addTag = (index) => {
		var newTag = { "tagName": "", "playlist": "", "device": "", "userId": formData.id }
		formData.NFCTags.push(newTag)
		const newUser = { ...formData, NFCTags: formData.NFCTags };

		setFormData(newUser)
	};


	return (<>

		<form onSubmit={handleSubmit}>
			<div className="flex-container" >
				<div className="flex-item-1" >
					<label>
						Username:
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={handleChange}
						/>
					</label>
				</div>
				<div className="flex-item-1" >
					<label>
						Password Hash:
						<input
							type="text"
							name="passwordHash"
							value={formData.passwordHash}
							onChange={handleChange}
						/>
					</label>
				</div>
			</div>
			<fieldset>
				<legend>Tags</legend>

				{formData.NFCTags && formData.NFCTags.map((tag, index) => (

					<div key={index} className="tag-container" >
						<div className="flex-container" >
						</div>
						<div className="flex-container" >
							<div className="flex-item-6" >
								<label>
									Tag Name:
									<input type="text" name="tagName" value={tag.tagName} onChange={(e) => handleTagChange(index, e)}
									/>
								</label>
							</div>
							<div className="flex-item-1" >
								<button className="rouge" onClick={() => removeTag(index)}>Delete</button>
							</div>
						</div >
						<div className="flex-container" >
							<div className="flex-item-1" >
								<label>
									Playlist:
									<input type="text" name="playlist" value={tag.playlist} onChange={(e) => handleTagChange(index, e)} />
								</label>
							</div>
							<div className="flex-item-1" >
								<label>
									Device:
									<input
										type="text"
										name="device"
										value={tag.device}
										onChange={(e) => handleTagChange(index, e)}
									/>
								</label>
							</div>
						</div>

					</div>
				))}

				<div className="flex-container" >
					<div className="flex-item-1" >
						<button onClick={() => addTag()}>Add</button>
					</div>
				</div>


			</fieldset>
		</form ></>)
}



export default UserTemplate