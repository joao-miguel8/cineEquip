import { create } from "zustand";
import type { ProjectType } from "../types/ProjectType";
import { createNewProject } from "../lib/api/services/projectsServices/createNewProject";

// Data types for global projects store
type ProjectStoreActions = {
	projects: ProjectType[];
	fetchAllProjects: (projects: ProjectType) => void;
	addNewProject: (newProject: ProjectType) => Promise<void>;
	deleteSelectedProject: (projectId: string) => void;
};

// Project global variables and functions
export const useProjectStore = create<ProjectStoreActions>(set => ({
	projects: [],
	fetchAllProjects: projectsList => {
		set({
			projects: projectsList,
		});
	},
	addNewProject: async newProject => {
		const resp = await createNewProject(newProject);
		const dataRes = await resp;
		set(state => ({
			projects: [...state.projects, dataRes],
		}));
	},
	deleteSelectedProject: (projectId: string) => {
		// if projectId exists remove project with chosen id
		if (projectId) {
			set(state => ({
				projects: state.projects.filter(proj => proj._id !== projectId),
			}));
		} else {
			console.error("Invalid projectToDelete object:", projectId);
		}
	},
}));
