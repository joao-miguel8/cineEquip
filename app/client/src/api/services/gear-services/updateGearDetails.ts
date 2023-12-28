import { GearType } from "../../../types/GearType";
import { axiosInstance } from "../../apiConfig";

export async function updateGearDetails(gearId: string, fieldsToUpdate: GearType) {
	const resp = await axiosInstance.put(`/updateGearData/${gearId}`, fieldsToUpdate);
	return resp.data;
}
