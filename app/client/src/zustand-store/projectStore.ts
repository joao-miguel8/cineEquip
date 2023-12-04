import { create } from "zustand";
import type { ProjectType } from "../types/ProjectType";

// Data types for global projects store
type ProjectStoreActions = {
	projects: ProjectType[];
	fetchAllProjects: (projects: ProjectType[]) => void;
	addNewProject: (newProject: any) => void;
	deleteSelectedProject: (projectId: string) => void;
};

// Project global variables and functions
export const useProjectStore = create<ProjectStoreActions>(set => ({
	projects: [],
	fetchAllProjects: async projects => {
		set({
			projects: projects,
		});
	},
	addNewProject: newProject => {
		set(state => ({
			projects: [...state.projects, newProject],
		}));
	},
	deleteSelectedProject: (projectId: string) => {
		if (projectId) {
			set(state => ({
				projects: state.projects.filter(proj => proj._id !== projectId),
			}));
		} else {
			console.error("Invalid projectToDelete object:", projectId);
		}
	},
}));
