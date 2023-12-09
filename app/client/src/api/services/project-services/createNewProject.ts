import type { ProjectType } from "../../../types/ProjectType";
import { axiosInstance } from "../../apiConfig";

export async function createNewProject(fieldToUpdate: Partial<ProjectType>) {
	try {
		const resp = await axiosInstance.post("/createNewProject", fieldToUpdate);
		return await resp.data;
	} catch (er) {
		console.log(er);
		return er;
	}
}
