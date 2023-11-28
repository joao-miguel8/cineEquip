import type { GearType } from "../types/GearType";
import type { SceneType } from "../types/SceneType";
import type { KitType } from "../types/KitType";
import { CalenderType } from "../components/calendar/types/CalenderEventType";

export type ProjectType = {
	_id: string;
	title: string;
	gear: GearType[];
	scenes: SceneType[];
	kit: KitType[];
	calendarDates: SceneType[];
};
