import classNames from "classnames";
import { IoAdd } from "react-icons/io5";
import SearchBar from "../components/common/searchbar/Searchbar";
import Header from "../components/common/header/Header";
import ProjectCard from "../components/project-card/ProjectCard";
import AddProjectModal from "../components/add-project-modal/AddProjectModal";
import useToggle from "../hooks/useToggle/useToggle";
import { useState } from "react";
import { useProjectStore } from "../zustand-store/projectStore";
import { useQuery } from "react-query";
import type { UseToggleType } from "../hooks/useToggle/type";
import { fetchProjects } from "../lib/api/services/project-services/fetchProjects";

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

	const toggleModal = useToggle();
	const { isToggled, isOn: isAddProjectModalOpen, isOff, dispatch }: UseToggleType = toggleModal;

	// Only allow select project btn to be toggled if projectsList has more than 1 project
	const toggleSelectBtn = () => projectsList.length >= 1 && setIsSelectModeActive(prevState => !prevState);

	return (
		<section className="bg-[#f6f6f6]">
			{/* --Sticky top section container-- */}
			<div className=" z-30 py-4 sticky top-0 w-full ">
				{/* --Page Header-- */}
				<Header />
				<div className="mx-6 lg:mx-14 flex flex-col sm:flex-row sm:justify-between gap-4">
					<h2 className="text-18 sm:text-22">Projects</h2>
					<SearchBar aria-label="Search for a Project" placeholder={"Search for a Project"} />
				</div>

				{/* --Select / Delete Selected Btns-- */}
				<div className="mt-8 mb-4 w-full md:w-5/6 m-auto flex flex-wrap justify-between">
					{/* --Select Btn-- */}
					<button
						onClick={() => {
							toggleSelectBtn();
						}}
						aria-label="toggle button to select your projects"
						type="button"
						className={classNames("p-2 text-14 text-gray-900 font-medium rounded-lg dark:text-white bg-gray-600", projectsList?.length === 0 && "bg-gray-400 cursor-not-allowed", isSelectModeActive && "bg-gray-800")}>
						Select projects
					</button>
					{/* --Add Project Button-- */}

					<button
						onClick={() => {
							dispatch("IS_ON");
							setIsSelectModeActive(false);
						}}
						className={classNames("p-2 text-14 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150", isAddProjectModalOpen && "cursor-not-allowed bg-gray-700")}>
						<IoAdd size={"1.4rem"} />
						Add Project
					</button>
				</div>
			</div>
			{/* --Project Dialog Component-- */}
			{isAddProjectModalOpen ? <AddProjectModal toggleDispatch={dispatch} /> : null}
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
