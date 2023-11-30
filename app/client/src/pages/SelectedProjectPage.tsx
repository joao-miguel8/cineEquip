import { useParams } from "react-router-dom";
import { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import classNames from "classnames";
import type { ProjectType } from "../types/ProjectType";
import useToggle from "../hooks/useToggle/useToggle";
import Header from "../components/common/header/Header";
import SearchBar from "../components/common/searchbar/Searchbar";
import ScenesList from "../components/scenes-list/ScenesList";
import CreateSceneModal from "../components/create-scene-modal/CreateSceneModal";
import CreateButton from "../components/create-button/CreateButton";
import type { UseToggleType } from "../hooks/useToggle/type";
import CreateKitModal from "../components/create-kit-modal/CreateKitModal";
import CreateGearModal from "../components/create-gear-modal/CreateGearModal";
function SelectedProjectPage() {
	// chosen project id passed with params
	const { id } = useParams();

	const getLocalStorageProjects = localStorage.getItem("projects");
	const projectsList = JSON.parse(getLocalStorageProjects);

	const findChosenProject = () => projectsList.state.projects.find((proj: ProjectType) => proj._id === id);
	const { _id, title, gear, scenes, kit } = findChosenProject();

	const toggleModal = useToggle();
	const { isToggled, isOn: isModalToggled, isOff, dispatch }: UseToggleType = toggleModal;

	enum tabs {
		Scenes = "Scenes",
		Kits = "Kits",
		Gear = "Gear",
	}

	const [selectedTab, setSelectedTab] = useState(tabs.Scenes);

	return (
		<section>
			{/* sticky top section */}
			<div className="overflow-hidden sticky z-30 top-0 w-full bg-white ">
				<Header />
				<div className="mt-10 mx-4 flex flex-col">
					<SearchBar placeholder={`Search ${selectedTab}`} />
				</div>
				{/* tab buttons */}
				<div className="mx-auto mt-4 flex justify-center max-[640px]:mx-8  sm:w-[500px] w items-center  border-b-2 border-gray-200">
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
					<h3 className="text-18">{title}</h3>
				</div>
				{/* Select button */}
				<div aria-label={`toggle button to select your ${selectedTab}`} className="mt-4 px-4 w-full flex justify-between">
					<button type="button" className="mb-2 p-2 sm:px-5 sm:py-2.5 text-12 md:text-14 text-gray-900 font-medium rounded-lg dark:text-white bg-gray-700 hover:bg-primary duration-300">
						Select {selectedTab}
					</button>
					{/* utility button */}
					<button>
						<BsThreeDotsVertical size={"1.6rem"} />
					</button>
				</div>
			</div>

			{/* Scene View Section */}
			{selectedTab === "Scenes" && (
				<div>
					<ScenesList />
					<CreateButton buttonName={"Add a Scene"} toggleModal={toggleModal} actionType={"IS_ON"} />
					{isModalToggled && <CreateSceneModal modalToggle={toggleModal} />}
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
