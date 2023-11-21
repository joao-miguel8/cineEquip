import type { GearType } from "../types/GearType";
import type { SceneType } from "../types/SceneType";
import type { KitType } from "../types/KitType";

export type ProjectType = {
	id: number;
	title: string[] | [];
	gear: GearType[] | [];
	scenes: SceneType[] | [];
	kit: KitType[] | [];
	calendarDates: SceneType[] | [];
};
