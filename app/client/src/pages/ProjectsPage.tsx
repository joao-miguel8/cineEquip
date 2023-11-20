import { IoAdd } from "react-icons/io5";
import SearchBar from "../components/searchbar/Searchbar";
import ProjectCard from "../features/project-card/ProjectCard";
import Header from "../components/header/Header";
import { useState } from "react";

function ProjectsPage() {
	// mock projects data
	const projects = [
		{ name: "this project has a very very long name", scene: [], gear: [] },
		{ name: "project02", scene: [], gear: [] },
		{ name: "project03", scene: [], gear: [] },
		{ name: "project04", scene: [], gear: [] },
		{ name: "project05", scene: [], gear: [] },
		{ name: "project06", scene: [], gear: [] },
	];
	const [projectsList, setProjectsList] = useState(projects);

	return (
		<section>
			{/* fixed top section container */}
			<div className="top-0 mb-10 w-full bg-white sticky">
				{/* Page Header */}
				<Header />
				<div className="flex flex-col mt-14 mx-4">
					<SearchBar aria-label="Search for a Project" placeholder={"Search for a Project"} />
					{/* Select / Delete Selected buttons */}
					<div className="mt-20 w-full md:w-5/6 md:mx-auto flex flex-wrap justify-between">
						{/* select btn */}
						<button aria-label="toggle button to select your projects" type="button" className="text-12 me-2 mb-2 p-2 sm:px-5 sm:py-2.5 text-gray-900 bg-white  font-medium rounded-lg dark:bg-gray-800 dark:text-white  dark:hover:bg-primary">
							Select projects
						</button>
						{/* delete btn */}
						<button aria-label="Delete selected projects" className="p-2 sm:py-2 sm:px-4 text-12 md:text-16 border text-red-500 border-red-400 rounded-full hover:bg-red-500 hover:text-white transition ease-in-out duration-150 ">
							Delete Selected
						</button>
					</div>
				</div>
			</div>
			{/* project list container */}
			<div className="px-4 mx-auto pb-20 flex justify-center gap-12 flex-wrap">
				{projectsList.map(project => {
					return <ProjectCard title={project.name} />;
				})}
			</div>

			{/* Add project button */}
			<div className="py-2 fixed bottom-0 flex justify-center w-full">
				<button aria-label="add a project" className="min-[350px]:w-80 px-5 py-2.5 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm me-2 mb-2 bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150">
					<IoAdd size={"1.4rem"} />
					<span>Add Project</span>
				</button>
			</div>
		</section>
	);
}

export default ProjectsPage;
