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
		<section>
			{/* --Sticky top section container-- */}
			<div className="z-20 mb-10 sticky top-0 w-full bg-white">
				{/* --Page Header-- */}
				<Header />
				<div className="mt-14 mx-4 flex flex-col">
					<SearchBar aria-label="Search for a Project" placeholder={"Search for a Project"} />
					{/* --Select / Delete Selected Btns-- */}
					<div className="mt-20 w-full md:w-5/6 md:mx-auto flex flex-wrap justify-between">
						{/* --Select Btn-- */}
						<button
							onClick={() => {
								toggleSelectBtn();
							}}
							aria-label="toggle button to select your projects"
							type="button"
							className={classNames("mb-2 p-2 sm:px-5 sm:py-2.5 text-12 md:text-14 text-gray-900 font-medium rounded-lg dark:text-white", projectsList?.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-gray-700 dark:hover:bg-primary", isSelectModeActive ? "bg-primary" : null)}>
							Select projects
						</button>
					</div>
				</div>
			</div>
			{/* --Project Dialog Component-- */}
			{isAddProjectModalOpen ? <AddProjectModal toggleDispatch={dispatch} /> : null}
			{/* --Project List Container-- */}
			<div className="px-4 mx-auto pb-20 flex justify-center gap-12 flex-wrap">
				{projectsList?.map((project, index) => {
					return <ProjectCard key={index} projectData={project} index={index} isSelectModeActive={isSelectModeActive} setIsSelectModeActive={setIsSelectModeActive} />;
				})}
			</div>
			{/* --Add Project Button-- */}
			<div aria-label="add a project button" className="py-2 fixed bottom-0 flex justify-center w-full">
				<button
					onClick={() => {
						dispatch("IS_ON");
						setIsSelectModeActive(false);
					}}
					className={classNames(
						"mb-2 px-5 py-2.5  min-[350px]:w-80 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150",
						isAddProjectModalOpen && "cursor-not-allowed bg-gray-700"
					)}>
					<IoAdd size={"1.4rem"} />
					<span>Add Project</span>
				</button>
			</div>
		</section>
	);
}

export default ProjectsPage;
