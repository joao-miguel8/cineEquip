import classNames from "classnames";
import SearchBar from "../../components/common/Searchbar";
import Header from "../../layout/Header";
import ProjectCard from "./components/ProjectCard";
import Modal from "../../components/common/Modal";
import CreateProjectModal from "../../components/modals/CreateProjectModal";
import { useState } from "react";
import { useProjectStore } from "../../zustand-store/projectStore";
import { useQuery } from "react-query";
import useModal from "../../components/modals/hooks/useModal";
import { fetchProjects } from "../../api/services/project-services/fetchProjects";

function ProjectsPage() {
	// zustand store
	const projectsList = useProjectStore(state => state.projects);
	const getProjects = useProjectStore(state => state.fetchAllProjects);
	const {
		data: projects,
		isLoading,
		error,
	} = useQuery("projects", async () => await fetchProjects(), {
		onError: error => console.log(error),
		onSuccess: projects => getProjects(projects),
		refetchOnWindowFocus: false,
	});

	const [isSelectModeActive, setIsSelectModeActive] = useState(false);

	// Only allow select project btn to be toggled if projectsList has more than 1 project
	const toggleSelectBtn = () => projectsList.length >= 1 && setIsSelectModeActive(prevState => !prevState);

	const modal = useModal(["createProjectModal"]);

	return (
		<section>
			{/* --Sticky top section container-- */}
			<div className="bg-bgLight01 z-30 sticky top-0 w-full ">
				{/* --Page Header-- */}
				<Header route={"/"} />
				<div className="mx-6 lg:mx-14 flex flex-col sm:flex-row sm:justify-between gap-4">
					<h2 className="text-18 sm:text-22">Projects</h2>
					<SearchBar aria-label="Search for a Project" placeholder={"Search for a Project"} />
				</div>

				{/* --Select / Delete Selected Btns-- */}
				<div className="px-4 mt-8 mb-4 w-full md:w-5/6 m-auto flex flex-wrap justify-between">
					{/* --Select Btn-- */}
					<button
						onClick={() => {
							toggleSelectBtn();
						}}
						aria-label="toggle button to select your projects"
						type="button"
						className={classNames("btn-toggle-stye01", projectsList?.length === 0 && "bg-gray-400 cursor-not-allowed", isSelectModeActive && "bg-gray-800")}>
						Select projects
					</button>
					{/* --Add Project Button-- */}
					<button
						onClick={() => {
							modal.openModal("createProjectModal");
							setIsSelectModeActive(false);
						}}
						className={classNames("btn-primary", modal.modals["createProjectModal"] === true && "cursor-not-allowed bg-gray-700")}>
						Add Project
					</button>
				</div>
			</div>
			{/* --Project Dialog Component-- */}
			<Modal isOpen={modal.modals["createProjectModal"]} modalType={"createProjectModal"}>
				<CreateProjectModal closeModal={() => modal.closeModal("createProjectModal")} />
			</Modal>
			{/* --Project List Container-- */}
			<div className="mt-4 mx-4 bg-[#f6f6f6] gap-4 justify-items-center pb-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{projectsList?.map((project, index) => {
					return <ProjectCard key={index} projectData={project} index={index} isSelectModeActive={isSelectModeActive} setIsSelectModeActive={setIsSelectModeActive} />;
				})}
			</div>
		</section>
	);
}

export default ProjectsPage;
