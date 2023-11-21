import { create } from "zustand";
import { ProjectType } from "../types/ProjectType";

type ProjectStoreActions = {
	projects: ProjectType[] | [];
	addNewProject: (newProject: ProjectType) => void;
};

export const useProjectStore = create<ProjectStoreActions>(set => ({
	projects: [],
	addNewProject: newProject =>
		set(state => ({
			projects: [...state.projects, newProject],
		})),
}));
