import { GearType } from "../../../types/GearType";
import { axiosInstance } from "../../apiConfig";

export async function createGear(fieldToUpdate: GearType) {
	const resp = await axiosInstance.post("/createGear", fieldToUpdate);
	return await resp.data;
}
