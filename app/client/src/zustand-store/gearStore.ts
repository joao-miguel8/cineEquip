import { create } from "zustand";
import { GearType } from "../types/GearType";

// Data types for global gear store
type GearStoreActions = {
	gear: GearType[];
	getAllGear: (gearList: GearType[]) => void;
};

// Gear global variables and functions
export const useGearStore = create<GearStoreActions>(set => ({
	gear: [],
	getAllGear: async gearList => {
		set({
			gear: gearList,
		});
	},
}));
