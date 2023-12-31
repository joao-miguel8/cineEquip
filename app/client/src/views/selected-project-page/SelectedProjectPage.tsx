import classNames from "classnames";
import { FaFolder } from "react-icons/fa";
import Header from "../../layout/Header";
import SearchBar from "../../components/common/Searchbar";
import CreateSceneModal from "../../components/modals/CreateSceneModal";
// import CreateKitModal from "./components/CreateKitModal";
// import CreateGearModal from "./components/CreateGearModal";
import SceneCard from "./components/SceneCard";
import { fetchProjects } from "../../api/services/project-services/fetchProjects";
import { useProjectStore } from "../../zustand-store/projectStore";
import { useQuery } from "react-query";
import useToggle from "../../hooks/useToggle/useToggle";
import { useParams } from "react-router-dom";
import type { ProjectType } from "../../types/ProjectType";
import type { SceneType } from "../../types/SceneType";
import Modal from "../../components/common/Modal";
import DeleteSceneModal from "../../components/modals/DeleteSceneModal";
import Tab from "../../components/common/tab/Tab";
import useModal from "../../components/modals/hooks/useModal";
import { useSelectArrayItem } from "../../hooks/useSelectArrayItem";
import useTab from "../../components/common/tab/hooks/useTab";

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

	const TABS = useTab({ SCENES_TAB: "scene", KITS_TAB: "kit", GEAR_TAB: "gear" });

	// Defining modal types to refer to different modal components.
	enum MODAL_TYPES {
		DELETE_SCENE = "deleteScene",
	}

	const selectSceneCard = useSelectArrayItem();
	const { selectedItemIndex: cardSceneIndex } = selectSceneCard;

	const modal = useModal(["createSceneModal"]);

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
					<SearchBar placeholder={`Search ${TABS.chosenTab}`} />
				</div>

				{/* Tab btns */}
				<div className="mx-4 mt-8 flex gap-2 justify-start max-[640px]:mx-8 sm:w-[500px] items-center">
					{/* Scenes btn */}
					<button onClick={() => TABS.handleSetChosenTab("scene")} aria-label="View your scenes list" className={classNames("w-20 border-b", TABS.chosenTab === "scene" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", TABS.chosenTab === "scene" && "text-primary border-primary duration-300")}>Scenes</h2>
					</button>
					{/* Kits btn */}
					<button onClick={() => TABS.handleSetChosenTab("kit")} aria-label="View your kits list" className={classNames("w-20 border-b", TABS.chosenTab === "kit" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", TABS.chosenTab === "kit" && "text-primary border-primary duration-300")}>Kits</h2>
					</button>
					{/* gear btn */}
					<button onClick={() => TABS.handleSetChosenTab("gear")} aria-label="View your gear list" className={classNames("w-20 border-b", TABS.chosenTab === "gear" && "border-primary duration-300")}>
						<h2 className={classNames("font-bold text-center text-gray-800", TABS.chosenTab === "gear" && "text-primary border-primary duration-300")}>Gear</h2>
					</button>
				</div>
				{/* --Select / Delete Selected Btns-- */}
				<div className="px-4 mt-8 mb-4 w-full md:w-5/6 m-auto flex flex-wrap items-center justify-between">
					{/* --Select Btn-- */}
					<button
						aria-label="toggle button to select your projects"
						onClick={() => {
							isSelectModeToggled.dispatch("TOGGLE");
						}}
						className={`btn-toggle-stye01 ${selectProject?.scenes === null ? "bg-gray-400 cursor-not-allowed" : ""}`}>
						Select Scene
					</button>
					{/* --Add btn-- */}
					{TABS.chosenTab && (
						<button onClick={() => modal.openModal("createSceneModal")} className="btn-primary">
							Create a Scene
						</button>
					)}
				</div>
			</div>

			{/* Scene View Section */}
			<Tab tabOption={TABS.chosenTab} tabName={"scene"}>
				{isLoading ? (
					<div className="mx-auto w-fit flex justify-center ">
						<svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>
						<p className="text-18">Loading Scenes</p>
					</div>
				) : (
					<section className="pb-[70px] p-4 mt-4 mx-auto flex flex-wrap gap-4 items-start justify-center sm:justify-start">
						{selectProject?.scenes.map((scene: SceneType, index: number) => (
							<SceneCard key={scene._id} scene={scene} openModal={() => selectSceneCard.selectItem(index)} isSelectModeToggled={isSelectModeToggled} />
						))}
					</section>
				)}
				{/* Create Scene Modal */}
				<Modal isOpen={modal.modals["createSceneModal"]} modalType={"createSceneModal"}>
					<CreateSceneModal projectId={selectProject._id} closeModal={() => modal.closeModal("createSceneModal")} />
				</Modal>
			</Tab>
			{/* Delete Modal */}
			<Modal isOpen={cardSceneIndex !== -1} modalType={MODAL_TYPES.DELETE_SCENE}>
				<DeleteSceneModal closeModal={() => selectSceneCard.deselectItem()} scene={selectProject?.scenes[cardSceneIndex]} />
			</Modal>
		</section>
	);
}

export default SelectedProjectPage;
