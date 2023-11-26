import { create } from "zustand";
import type { ProjectType } from "../types/ProjectType";

// Data types for global projects store
type ProjectStoreActions = {
	projects: ProjectType[];
	addNewProject: (newProject: ProjectType) => void;
	deleteSelectedProject: (chosenIndex: number) => void;
};

// Project global variables and functions
export const useProjectStore = create<ProjectStoreActions>(set => ({
	projects: [],
	addNewProject: newProject =>
		set(state => ({
			projects: [...state.projects, newProject],
		})),
	deleteSelectedProject: (chosenI: number) =>
		set(state => {
			return {
				projects: state.projects.filter((proj, i) => i !== chosenI),
			};
		}),
}));
