import { KitType } from "./KitType";

export type SceneType = {
	_id: string;
	name: string;
	description?: string;
	kitList?: KitType[] | [];
	callTime?: Date;
	callSheet?: string;
	weatherConditions?: string;
	calenderStartDate?: Date | string;
	calenderEndDate?: Date | string;
};
