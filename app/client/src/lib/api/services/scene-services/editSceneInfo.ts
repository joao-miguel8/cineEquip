import { SceneType } from "../../../../types/SceneType";
import { axiosInstance } from "../../apiConfig";

export async function editSceneInfo(SceneId: string, fieldToUpdate: SceneType) {
	const req = await axiosInstance.put(`/editChosenScene/${SceneId}`, fieldToUpdate);
	return req;
}
