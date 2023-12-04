import { axiosInstance } from "../../apiConfig";

export async function createScene(projectId: string, sceneName: string, sceneDescription: string) {
	try {
		const resp = await axiosInstance.post(`/createScene/${projectId}`, { name: sceneName, description: sceneDescription });
		return await resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
