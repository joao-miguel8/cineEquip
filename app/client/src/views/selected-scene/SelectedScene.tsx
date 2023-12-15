import classNames from "classnames";
import SearchBar from "../../components/common/Searchbar";
import Header from "../../layout/Header";
import ViewMoreSceneInfo from "./components/ViewMoreSceneInfo";
import { fetchProjects } from "../../api/services/project-services/fetchProjects";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useProjectStore } from "../../zustand-store/projectStore";
import type { SceneType } from "../../types/SceneType";
import type { ProjectType } from "../../types/ProjectType";
import Tab from "../../components/common/tab/Tab";
import useTab from "../../components/common/tab/hooks/useTab";
import GearCard from "../../components/common/GearCard";

function SelectedScene() {
	const { id } = useParams();

	// Query our Database to fetch our projects first page render
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

	const findChosenScene = projectsList?.flatMap((project: ProjectType) => {
		return project.scenes.filter((scene: SceneType) => scene._id === id);
	});
	const chosenScene = findChosenScene[0];

	// find project that is associated with chosen scene
	const projectContainingScene = projects?.find((project: ProjectType) => project.scenes.some((scene: SceneType) => scene._id === id));

	const TABS = useTab({ KITS_TAB: "kits", GEAR_TAB: "gear" });

	return (
		<>
			<section className="flex flex-col h-full">
				{/* Top section sticky */}
				<div className="w-full sticky top-0 shadow-lg bg-[#F6F6F6]">
					<Header route={`/projects/${projectContainingScene?._id}`} />
					<div className="mx-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-bold">
						{/* --Modal Scene Title-- */}
						<div className="flex gap-2 text-18 sm:text-20">
							<span>Scene:</span>
							<h4>{chosenScene?.name}</h4>
						</div>
						{/* <SearchBar placeholder="Search" /> */}
					</div>
					{/* tab btns / select and create btns */}
					<div className={"mt-4 md:mx-4"}>
						{/* --Kits Btns | Gear Btns  */}
						<div className="mx-4 md:mx-0 my-2 md:mt-0 flex flex-col md:flex-row gap-6 justify-between">
							{/* --Kits Btns and Gear Btns-- */}
							<div className="flex gap-2">
								{/* --Kits Btn-- */}
								<button
									onClick={() => TABS.handleSetChosenTab(TABS.tabs.KITS_TAB)}
									aria-label={`view your kit list for ${chosenScene?.name}`}
									className={classNames(`w-20 font-bold duration-150 border-b`, TABS.chosenTab === TABS.tabs.KITS_TAB ? "text-primary border-primary" : "border-gray-400 text-black")}>
									Kits
								</button>
								{/* --Gear Btn-- */}
								<button
									onClick={() => TABS.handleSetChosenTab(TABS.tabs.GEAR_TAB)}
									aria-label={`view your gear list for ${chosenScene?.name}`}
									className={classNames(`w-20 font-bold duration-150 border-b`, TABS.chosenTab === TABS.tabs.GEAR_TAB ? "text-primary border-primary" : "border-gray-400 text-black")}>
									Gear
								</button>
							</div>
						</div>
						{/* Select btn | Create Btn */}
						<div aria-label={`create a new ${TABS.tabs.chosenTab}`} className="mt-8 px-4 mb-4 flex justify-between w-full">
							{/* Select btn */}
							<button className="btn-toggle-stye01 ">Select {TABS.chosenTab}</button>
							{/* Create btn */}
							<button className="btn-primary">Create {TABS.chosenTab}</button>
						</div>
					</div>
				</div>
				{/* Tab content */}
				<Tab tabOption={TABS.chosenTab} tabName={TABS.tabs["KITS_TAB"]}>
					{/* scroll content container */}
				</Tab>
				<Tab tabOption={TABS.chosenTab} tabName={TABS.tabs.GEAR_TAB}>
					<div className="mb-20 m-4 flex justify-start flex-wrap gap-4">
						<GearCard />
					</div>
				</Tab>
			</section>
			{/* drop down component */}
			{projects && (
				<div className="fixed bottom-0 w-full">
					<ViewMoreSceneInfo sceneInfo={chosenScene} />
				</div>
			)}
		</>
	);
}

export default SelectedScene;
