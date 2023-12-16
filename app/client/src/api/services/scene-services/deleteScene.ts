import { axiosInstance } from "../../apiConfig";

export async function deleteScene(sceneId: string) {
	try {
		const req = axiosInstance.delete(`/deleteScene/${sceneId}`);
		return req;
	} catch (err) {
		console.log(err, "Error Deleting scene");
		throw err;
	}
}
