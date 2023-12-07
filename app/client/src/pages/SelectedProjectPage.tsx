import classNames from "classnames";
import { FaFolder } from "react-icons/fa";
import Header from "../components/common/header/Header";
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

function SelectedProjectPage() {
	// chosen project id passed with params
	const { id } = useParams();

	const toggleModal = useToggle();
	const { isToggled, isOn: isModalToggled, isOff, dispatch }: UseToggleType = toggleModal;

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
		Scenes = "Scenes",
		Kits = "Kits",
		Gear = "Gear",
	}

	const [selectedTab, setSelectedTab] = useState(tabs.Scenes);

	return (
		<section>
			{/* sticky top section */}
			<div className="overflow-hidden sticky z-30 top-0 w-full bg-[#F6F6F6] ">
				<Header />
				<div className="mt-10 mx-4 flex flex-col">
					<SearchBar placeholder={`Search ${selectedTab}`} />
				</div>
				{/* tab buttons */}
				<div className="mx-auto mt-4 flex justify-center max-[640px]:mx-8 sm:w-[500px] items-center border-b-2 border-gray-200">
					<button onClick={() => setSelectedTab(tabs.Scenes)} aria-label="View your scenes list" className={classNames("flex-1 border-b-2", selectedTab === "Scenes" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-20 text-center text-gray-800", selectedTab === "Scenes" && "text-primary border-primary duration-300")}>Scenes</h2>
					</button>
					<button onClick={() => setSelectedTab(tabs.Kits)} aria-label="View your kits list" className={classNames("flex-1 border-b-2", selectedTab === "Kits" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-20 text-center text-gray-800", selectedTab === "Kits" && "text-primary border-primary duration-300")}>Kits</h2>
					</button>
					<button onClick={() => setSelectedTab(tabs.Gear)} aria-label="View your gear list" className={classNames("flex-1 border-b-2", selectedTab === "Gear" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-20 text-center text-gray-800", selectedTab === "Gear" && "text-primary border-primary duration-300")}>Gear</h2>
					</button>
				</div>
				{/* title container */}
				<div className="mt-4 flex gap-4 items-center justify-center">
					<FaFolder color={"#4F48E2"} size={"1.8rem"} />
					{findChosenProject ? <h3 className="text-18">{selectProject.title}</h3> : <h3>Loading title...</h3>}
				</div>
			</div>
			{/* Scene View Section */}
			{selectedTab === "Scenes" && (
				<div>
					{isLoading ? (
						<div className="mx-auto w-fit flex justify-center ">
							<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
							<p className="text-18">Loading Scenes</p>
						</div>
					) : (
						<ScenesList scenesList={selectProject.scenes} />
					)}
					<CreateButton buttonName={"Add a Scene"} toggleModal={toggleModal} actionType={"IS_ON"} />
					{isModalToggled && <CreateSceneModal modalToggle={toggleModal} projectId={selectProject._id} />}
				</div>
			)}
			{/* Kits View Section */}
			{selectedTab === "Kits" && (
				<div>
					<CreateButton buttonName={"Add a Kit"} toggleModal={toggleModal} actionType={"IS_ON"} />
					{isModalToggled && <CreateKitModal modalToggle={toggleModal} />}
				</div>
			)}
			{/* Gear View section */}
			{selectedTab === "Gear" && (
				<div>
					<CreateButton buttonName={"Add a Gear"} toggleModal={toggleModal} actionType={"IS_ON"} />
					{isModalToggled && <CreateGearModal modalToggle={toggleModal} />}
				</div>
			)}
		</section>
	);
}

export default SelectedProjectPage;
