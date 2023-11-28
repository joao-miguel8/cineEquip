import { axiosInstance } from "../../apiConfig";

export async function fetchProjects() {
	try {
		const resp = await axiosInstance("/fetchAllProjects");
		return resp.data;
	} catch (err) {
		console.log(err);
	}
}
