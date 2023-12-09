import classNames from "classnames";
import { FaFolder } from "react-icons/fa";
import Header from "../layout/header/Header";
import SearchBar from "../components/common/searchbar/Searchbar";
import ScenesList from "../components/scenes-list/ScenesList";
import CreateSceneModal from "../components/create-scene-modal/CreateSceneModal";
import CreateButton from "../components/create-button/CreateButton";
import CreateKitModal from "../components/create-kit-modal/CreateKitModal";
import CreateGearModal from "../components/create-gear-modal/CreateGearModal";
import { useProjectStore } from "../zustand-store/projectStore";
import { useQuery } from "react-query";
import useToggle from "../hooks/useToggle/useToggle";
import type { UseToggleType } from "../hooks/useToggle/type";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { ProjectType } from "../types/ProjectType";
import { fetchProjects } from "../lib/api/services/project-services/fetchProjects";
import { IoAdd } from "react-icons/io5";

function SelectedProjectPage() {
	// chosen project id passed with params
	const { id } = useParams();

	const toggleModal = useToggle();
	const { isToggled, isOn: isModalToggled, isOff, dispatch }: UseToggleType = toggleModal;

	const isSelectModeToggled = useToggle();

	// zustand store
	const projectsList = useProjectStore(state => state.projects);
	const getProjects = useProjectStore(state => state.fetchAllProjects);

	// Query our Database to fetch our projects first page render
	const {
		data: projects,
		isLoading,
		error,
	} = useQuery("projects", async () => await fetchProjects(), {
		onError: error => console.log(error),
		onSuccess: projects => getProjects(projects),
		refetchOnWindowFocus: false,
	});

	// Find the chosen projects id
	const findChosenProject = projectsList?.find((proj: ProjectType) => proj._id === id);
	const selectProject = findChosenProject || { _id: "", title: [], gear: [], scenes: [], kit: [] };

	enum tabs {
		Scenes = "Scene",
		Kits = "Kit",
		Gear = "Gear",
	}

	const [selectedTab, setSelectedTab] = useState(tabs.Scenes);

	return (
		<section>
			{/* sticky top section */}
			<div className="overflow-hidden sticky z-30 top-0 w-full bg-[#F6F6F6] ">
				<Header />
				{/* title container and searchbar */}
				<div className="px-4 w-full flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between">
					{/* title container */}
					<div className="flex gap-4 items-center">
						<FaFolder color={"#4F48E2"} size={"1.8rem"} />
						{findChosenProject ? <h3 className="font-bold text-18 sm:text-20">{selectProject.title}</h3> : <h3>Loading title...</h3>}
					</div>
					<SearchBar placeholder={`Search ${selectedTab}`} />
				</div>

				{/* tab btn */}
				<div className="mx-4 mt-8 flex gap-2 justify-start max-[640px]:mx-8 sm:w-[500px] items-center">
					{/* Scenes btn */}
					<button onClick={() => setSelectedTab(tabs.Scenes)} aria-label="View your scenes list" className={classNames("w-20 border-b", selectedTab === "Scene" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", selectedTab === "Scene" && "text-primary border-primary duration-300")}>Scenes</h2>
					</button>
					{/* Kits btn */}
					<button onClick={() => setSelectedTab(tabs.Kits)} aria-label="View your kits list" className={classNames("w-20 border-b", selectedTab === "Kit" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", selectedTab === "Kit" && "text-primary border-primary duration-300")}>Kits</h2>
					</button>
					{/* gear btn */}
					<button onClick={() => setSelectedTab(tabs.Gear)} aria-label="View your gear list" className={classNames("w-20 border-b", selectedTab === "Gear" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", selectedTab === "Gear" && "text-primary border-primary duration-300")}>Gear</h2>
					</button>
				</div>
			</div>
			{/* --Select / Delete Selected Btns-- */}
			<div className="px-4 mt-8 mb-4 w-full md:w-5/6 m-auto flex flex-wrap items-center justify-between">
				{/* --Select Btn-- */}
				<button
					onClick={() => {
						isSelectModeToggled.dispatch("TOGGLE");
					}}
					aria-label="toggle button to select your projects"
					type="button"
					className={classNames("p-2 text-14 text-gray-900 font-medium rounded-lg dark:text-white bg-gray-600", projectsList?.length === 0 && "bg-gray-400 cursor-not-allowed")}>
					Select projects
				</button>
				{}
				{/* --Add btn-- */}
				{selectedTab && <CreateButton buttonName={`Add a ${selectedTab}`} toggleModal={toggleModal} actionType={"IS_ON"} />}
			</div>
			{/* Scene View Section */}
			{selectedTab === "Scene" && (
				<div>
					{isLoading ? (
						<div className="mx-auto w-fit flex justify-center ">
							<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
							<p className="text-18">Loading Scenes</p>
						</div>
					) : (
						<ScenesList selectModalToggle={isSelectModeToggled} scenesList={selectProject.scenes} />
					)}
					{isModalToggled && isSelectModeToggled.isToggled === false && <CreateSceneModal modalToggle={toggleModal} projectId={selectProject._id} />}
				</div>
			)}
			{/* Kits View Section */}
			{selectedTab === "Kit" && <div>{isModalToggled && <CreateKitModal modalToggle={toggleModal} />}</div>}
			{/* Gear View section */}
			{selectedTab === "Gear" && <div>{isModalToggled && <CreateGearModal modalToggle={toggleModal} />}</div>}
		</section>
	);
}

export default SelectedProjectPage;
