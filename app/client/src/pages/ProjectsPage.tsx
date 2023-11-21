import SearchBar from "../components/searchbar/Searchbar";
import Header from "../components/header/Header";
import ProjectCard from "../features/project-card/ProjectCard";
import AddProjectModal from "../features/add-project-modal/AddProjectModal";
import useToggle from "../hooks/useToggle";
import { IoAdd } from "react-icons/io5";
import classNames from "classnames";
import { useProjectStore } from "../zustand-store/projectStore";

function ProjectsPage() {
	const projectsList = useProjectStore(state => state.projects);
	console.dir(projectsList);

	const toggleModal = useToggle();
	const { isToggled, isOn, isOff, dispatch } = toggleModal;

	return (
		<section>
			{/* --Fixed top section container-- */}
			<div className="mb-10 sticky top-0 w-full bg-white ">
				{/* --Page Header-- */}
				<Header />
				<div className="mt-14 mx-4 flex flex-col">
					<SearchBar aria-label="Search for a Project" placeholder={"Search for a Project"} />
					{/* --Select / Delete Selected Btns-- */}
					<div className="mt-20 w-full md:w-5/6 md:mx-auto flex flex-wrap justify-between">
						{/* --Select Btn-- */}
						<button aria-label="toggle button to select your projects" type="button" className="mb-2 p-2 sm:px-5 sm:py-2.5 text-12 md:text-14 text-gray-900 bg-white font-medium rounded-lg dark:bg-gray-800 dark:text-white  dark:hover:bg-primary">
							Select projects
						</button>
						{/* --Delete Btn-- */}
						<button aria-label="Delete selected projects" className="p-2 sm:py-2 sm:px-4 text-12 md:text-16 border text-red-500 border-red-400 rounded-full hover:bg-red-500 hover:text-white transition ease-in-out duration-150 ">
							Delete Selected
						</button>
					</div>
				</div>
			</div>
			{/* --Project Dialog Component-- */}
			{isOn ? <AddProjectModal toggleDispatch={dispatch} /> : null}
			{/* --Project List Container-- */}
			<div className="px-4 mx-auto pb-20 flex justify-center gap-12 flex-wrap">
				{projectsList.map((project, index) => {
					return <ProjectCard key={index} title={project.title} />;
				})}
			</div>
			{/* --Add Project Button-- */}
			<div aria-label="add a project button" className="py-2 fixed bottom-0 flex justify-center w-full">
				<button
					onClick={() => dispatch("IS_ON")}
					className={classNames("mb-2 px-5 py-2.5  min-[350px]:w-80 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150", isOn && "cursor-not-allowed bg-gray-700")}>
					<IoAdd size={"1.4rem"} />
					<span>Add Project</span>
				</button>
			</div>
		</section>
	);
}

export default ProjectsPage;
