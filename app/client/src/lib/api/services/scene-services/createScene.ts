import { axiosInstance } from "../../apiConfig";

export async function createScene(projectId: string, sceneName: string) {
	try {
		const resp = await axiosInstance.post(`/createScene/${projectId}`, { name: sceneName });
		return await resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
