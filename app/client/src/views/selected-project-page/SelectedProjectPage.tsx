import classNames from "classnames";
import { FaFolder } from "react-icons/fa";
import Header from "../../layout/Header";
import SearchBar from "../../components/common/Searchbar";
import CreateSceneModal from "./components/CreateSceneModal";
// import CreateKitModal from "./components/CreateKitModal";
// import CreateGearModal from "./components/CreateGearModal";
import Button from "../../components/common/Button";
import SceneCard from "./components/SceneCard";
import { fetchProjects } from "../../api/services/project-services/fetchProjects";
import { useProjectStore } from "../../zustand-store/projectStore";
import { useQuery } from "react-query";
import useToggle from "../../hooks/useToggle/useToggle";
import { useState } from "react";
import { useParams } from "react-router-dom";
import type { UseToggleType } from "../../hooks/useToggle/type";
import type { ProjectType } from "../../types/ProjectType";
import type { SceneType } from "../../types/SceneType";
import Modal from "../../components/common/Modal";
import DeleteSceneModal from "./components/DeleteSceneModal";
import Tab from "../../components/common/tab";

function SelectedProjectPage() {
	// chosen project id passed with params
	const { id } = useParams();

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

	enum TABS {
		Scenes = "Scene",
		Kits = "Kit",
		Gear = "Gear",
	}
	const [selectedTab, setSelectedTab] = useState(TABS.Scenes);

	// Defining modal types to refer to different modal components.
	enum MODAL_TYPES {
		CREATE_SCENE = "CreateScene",
		DELETE_SCENE = "deleteScene",
	}

	//  State to manage models that to track each modals current state
	const [modalState, setModalState] = useState({
		[MODAL_TYPES.CREATE_SCENE]: false,
	});

	// state to check an arrays index, use case for selecting the correct value to select with select mode option
	const [selectedItemIndex, setSelectedItemIndex] = useState(-1);

	// update selectedItemIndex to -1 to trigger modal to deselect
	const deselectItem = () => {
		setSelectedItemIndex(-1);
	};

	// update selectItem to pass a specific index of an array to select
	const selectItem = (index: number) => {
		setSelectedItemIndex(index);
	};

	// trigger modal to open by passing MODAL_TYPES value and setting it to true
	const openModal = (modalType: MODAL_TYPES) => {
		setModalState(prevVal => ({ ...prevVal, [modalType]: true }));
	};

	// trigger modal to close by passing MODAL_TYPES value and setting it to false
	const closeModal = (modalType: MODAL_TYPES) => {
		setModalState(prevVal => ({ ...prevVal, [modalType]: false }));
	};

	return (
		<section>
			{/* sticky top section */}
			<div className="overflow-hidden sticky z-30 top-0 w-full bg-[#F6F6F6]">
				<Header route={"/projects"} />
				{/* title container and searchbar */}
				<div className="px-4 w-full flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between">
					{/* title container */}
					<div className="flex gap-4 items-center">
						<FaFolder color={"#4F48E2"} size={"1.8rem"} />
						{findChosenProject ? <h3 className="font-bold text-18 sm:text-20">{selectProject.title}</h3> : <h3>Loading title...</h3>}
					</div>
					<SearchBar placeholder={`Search ${selectedTab}`} />
				</div>

				{/* Tab btns */}
				<div className="mx-4 mt-8 flex gap-2 justify-start max-[640px]:mx-8 sm:w-[500px] items-center">
					{/* Scenes btn */}
					<button onClick={() => setSelectedTab(TABS.Scenes)} aria-label="View your scenes list" className={classNames("w-20 border-b", selectedTab === "Scene" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", selectedTab === "Scene" && "text-primary border-primary duration-300")}>Scenes</h2>
					</button>
					{/* Kits btn */}
					<button onClick={() => setSelectedTab(TABS.Kits)} aria-label="View your kits list" className={classNames("w-20 border-b", selectedTab === "Kit" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", selectedTab === "Kit" && "text-primary border-primary duration-300")}>Kits</h2>
					</button>
					{/* gear btn */}
					<button onClick={() => setSelectedTab(TABS.Gear)} aria-label="View your gear list" className={classNames("w-20 border-b", selectedTab === "Gear" && "border-primary duration-300")}>
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

				{/* --Add btn-- */}
				{selectedTab && (
					<Button onClick={() => openModal(MODAL_TYPES.CREATE_SCENE)} styles="p-2 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150">
						Add a Scene
					</Button>
				)}
			</div>
			{/* Scene View Section */}
			<Tab tabOption={selectedTab} tabName={"Scene"}>
				{isLoading ? (
					<div className="mx-auto w-fit flex justify-center ">
						<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
						<p className="text-18">Loading Scenes</p>
					</div>
				) : (
					<section className="pb-[70px] p-4 mt-4 mx-auto flex flex-wrap gap-4 items-start justify-center sm:justify-start">
						{selectProject?.scenes.map((scene: SceneType, index: number) => (
							<SceneCard key={scene._id} scene={scene} openModal={() => selectItem(index)} isSelectModeToggled={isSelectModeToggled} />
						))}
					</section>
				)}
				{/* Create Scene Modal */}
				<Modal isOpen={modalState[MODAL_TYPES.CREATE_SCENE]} modalType={MODAL_TYPES.CREATE_SCENE}>
					<CreateSceneModal projectId={selectProject._id} closeModal={() => closeModal(MODAL_TYPES.CREATE_SCENE)} />
				</Modal>
			</Tab>
			{/* Delete Modal */}
			<Modal isOpen={selectedItemIndex !== -1} modalType={MODAL_TYPES.DELETE_SCENE}>
				<DeleteSceneModal closeModal={() => deselectItem()} scene={selectProject?.scenes[selectedItemIndex]} />
			</Modal>
		</section>
	);
}

export default SelectedProjectPage;
