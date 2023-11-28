import type { GearType } from "./GearType";

export type KitType = {
	name: string;
	description?: string;
	gearList: GearType[] | [];
	filter?: string[];
	checkOutDate?: Date;
	checkInDate?: Date;
};
