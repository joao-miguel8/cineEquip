import { fetchProjects } from "../services/projectsServices/fetchProjects";
import { useQuery } from "react-query";

export function useFetchProjects() {
	async function getProjectData() {
		return await fetchProjects();
	}
	const { data: projects, isLoading, error } = useQuery("projects", getProjectData);

	return { data: projects, isLoading, error };
}
