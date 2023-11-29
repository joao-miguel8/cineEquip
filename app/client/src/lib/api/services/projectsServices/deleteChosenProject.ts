import { axiosInstance } from "../../apiConfig";

export async function deleteChosenProject(projectId: string) {
	try {
		const resp = await axiosInstance.delete(`/deleteProject/${projectId}`);
		return await resp.data;
	} catch (err) {
		console.log(err, "Error Deleting Project");
		throw err;
	}
}
