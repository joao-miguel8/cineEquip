import { fetchProjects } from "../services/project-services/fetchProjects";
import { useQuery } from "react-query";

export function useFetchProjects() {
	async function getProjectData() {
		return await fetchProjects();
	}
	const { data: projects, isLoading, error } = useQuery("projects", getProjectData);

	return { data: projects, isLoading, error };
}
