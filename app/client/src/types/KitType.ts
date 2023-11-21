import type { GearType } from "./GearType";

export type KitType = {
	id: number;
	name: string;
	description?: string;
	gearList: GearType[] | [];
	filter?: string[];
	checkOutDate?: Date;
	checkInDate?: Date;
};
