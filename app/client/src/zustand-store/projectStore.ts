import { create } from "zustand";
import type { ProjectType } from "../types/ProjectType";
import { createNewProject } from "../lib/api/services/projectsServices/createNewProject";
import { deleteProject } from "../lib/api/services/projectsServices/deleteProject";

// Data types for global projects store
type ProjectStoreActions = {
	projects: ProjectType[];
	fetchAllProjects: (projects: ProjectType) => void;
	addNewProject: (newProject: ProjectType) => Promise<void>;
	deleteSelectedProject: (projectId: string) => Promise<void>;
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
		console.log(resp);
		const dataRes = await resp;
		set(state => ({
			projects: [...state.projects, dataRes],
		}));
	},
	deleteSelectedProject: async (projectId: string) => {
		try {
			// Check if projectToDelete is defined and has an _id property
			if (projectId) {
				await deleteProject(projectId);
				set(state => ({
					projects: state.projects.filter(proj => proj._id !== projectId),
				}));
			} else {
				console.error("Invalid projectToDelete object:", projectId);
			}
		} catch (error) {
			console.error("Error deleting project:", error);
		}
	},
}));
