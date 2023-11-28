import type { ProjectType } from "../../../../types/ProjectType";
import { axiosInstance } from "../../apiConfig";

export async function createNewProject(project: ProjectType) {
	try {
		const resp = await axiosInstance.post("/createNewProject", project);
		return resp.data;
	} catch (er) {
		console.log(er);
		return er;
	}
}
