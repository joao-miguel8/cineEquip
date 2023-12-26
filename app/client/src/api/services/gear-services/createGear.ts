import { GearType } from "../../../types/GearType";
import { axiosInstance } from "../../apiConfig";

export async function createGear(fieldToUpdate) {
	const resp = await axiosInstance.post("/createGear", fieldToUpdate, { headers: { "Content-Type": "multipart/form-data" } });
	return await resp.data;
}
