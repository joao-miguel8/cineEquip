import { create } from "zustand";
import { GearType } from "../types/GearType";

// Data types for global gear store
type GearStoreActions = {
	gear: GearType[];
	getAllGear: (gearList: GearType[]) => void;
	deleteGear: (gearID: GearType) => void;
};

// Gear global variables and functions
export const useGearStore = create<GearStoreActions>(set => ({
	gear: [],
	getAllGear: async gearList => {
		set({
			gear: gearList,
		});
	},
	deleteGear: async gearId => {
		if (gearId) {
			set(state => ({
				gear: state.gear.filter(gear => gear._id !== gearId),
			}));
		} else {
			console.error("Error removing gear: No ID found for deletion");
		}
	},
}));
