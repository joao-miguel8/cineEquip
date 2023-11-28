import { KitType } from "./KitType";

export type SceneType = {
	name: string;
	description: string;
	kitList?: KitType[] | [];
	callTime?: Date;
	callSheet?: string;
	weatherConditions?: string;
	calenderStartDate?: Date | string;
	calenderEndDate?: Date | string;
};
