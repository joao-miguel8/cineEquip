import { KitType } from "./KitType";

export type SceneType = {
	id: number;
	name: string;
	description: string;
	kitList?: KitType[] | [];
	callTime?: Date;
	callSheet?: string;
	weatherConditions?: string;
	calenderStartDate?: Date | string;
	calenderEndDate?: Date | string;
};
