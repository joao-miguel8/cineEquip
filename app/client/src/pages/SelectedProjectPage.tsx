import { useParams } from "react-router-dom";
import Header from "../components/common/header/Header";
import SearchBar from "../components/common/searchbar/Searchbar";
import { FaFolder } from "react-icons/fa";
import type { ProjectType } from "../types/ProjectType";
import ScenesList from "../components/scenes-list/ScenesList";
import { IoAdd } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

function SelectedProjectPage() {
	// chosen project id passed with params
	const { id } = useParams();

	const getLocalStorageProjects = localStorage.getItem("projects");
	const projectsList = JSON.parse(getLocalStorageProjects);

	const findChosenProject = () => projectsList.state.projects.find((proj: ProjectType) => proj._id === id);
	const { _id, title, gear, scenes, kit } = findChosenProject();

	return (
		<section>
			{/* sticky top section */}
			<div className="overflow-hidden sticky z-30 top-0 w-full border-4  bg-white ">
				<Header />
				<div className="mt-10 mx-4 flex flex-col">
					<SearchBar placeholder="Search Project" />
				</div>
				{/* tab buttons */}
				<div className="mx-auto mt-4 flex justify-center max-[640px]:mx-8  sm:w-[500px] w items-center gap-2 border-b border-gray-200 ">
					<button aria-label="View your gear scenes" className="flex-1 border-b-2 border-primary">
						<h2 className="font-bold text-20 text-center text-primary">Scenes</h2>
					</button>
					<button aria-label="View your kits list" className="flex-1">
						<h2 className="text-20 text-center">Kits</h2>
					</button>
					<button aria-label="View your gear list" className="flex-1">
						<h2 className="text-20 text-center ">Gear</h2>
					</button>
				</div>
				{/* title container */}
				<div className="mt-4 flex gap-4 items-center justify-center">
					<FaFolder color={"#4F48E2"} size={"1.8rem"} />
					<h3 className="text-18">{title}</h3>
				</div>
				{/* Select button */}
				<div aria-label="toggle button to select your Scenes" className="mt-4 px-4 w-full flex justify-between">
					<button type="button" className="mb-2 p-2 sm:px-5 sm:py-2.5 text-12 md:text-14 text-gray-900 font-medium rounded-lg dark:text-white bg-gray-700 hover:bg-primary duration-300">
						Select Scenes
					</button>
					{/* utility button */}
					<button>
						<BsThreeDotsVertical size={"1.6rem"} />
					</button>
				</div>
			</div>
			<ScenesList />
			{/* Add button */}
			<div aria-label="add a project button" className="py-2 fixed bottom-0 flex justify-center w-full">
				<button className={"mb-2 px-5 py-2.5 min-[350px]:w-80 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150"}>
					<IoAdd size={"1.4rem"} />
					<span>Add Scene</span>
				</button>
			</div>
		</section>
	);
}

export default SelectedProjectPage;
