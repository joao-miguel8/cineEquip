import { axiosInstance } from "../../apiConfig";

export async function deleteGear(gearId: string) {
	try {
		const resp = await axiosInstance.delete(`/deleteGear/${gearId}`);
		return await resp.data;
	} catch (err) {
		console.log(err);
	}
}
