import { axiosInstance } from "../../apiConfig";

export async function createScene(projectId: string) {
	try {
		const resp = await axiosInstance.post(`/createScene/${projectId}`);
		return resp.data;
	} catch (err) {
		console.error(err);
		throw err;
	}
}
