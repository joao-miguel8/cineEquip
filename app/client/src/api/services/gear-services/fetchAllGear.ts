import { axiosInstance } from "../../apiConfig";

export async function fetchAllGear() {
	try {
		const resp = await axiosInstance.get("/fetchAllGear");
		return resp.data;
	} catch (err) {
		console.log(err);
		throw err;
	}
}
