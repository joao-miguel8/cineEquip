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

	// remove body scroll when modal opens
	useDisableBodyScroll();

	const TABS = useTab();
	TABS.addTab("KITS_TAB", "kit");
	TABS.addTab("GEAR_TAB", "gear");

	return (
		<>
			<section className="flex flex-col h-screen">
				{/* Top section sticky */}
				<div className="w-full rounded shadow-lg bg-[#F6F6F6]">
					<Header route={`/projects/${projectContainingScene?._id}`} />
					<div className="mx-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-bold">
						{/* --Modal Scene Title-- */}
						<div className="flex gap-2 text-18 sm:text-20">
							<span>Scene:</span>
							<h4>{chosenScene?.name}</h4>
						</div>
						<SearchBar placeholder="Search" />
					</div>

					{/* more info of scene container / and btns */}
					<div className={"mt-4 md:mx-4 md:flex md:justify-between relative"}>
						{/* --Kits Btns and Gear Btns-- */}
						<div className="mx-4 md:mx-0 mt-8 md:mt-0 mb-10 flex gap-6 items-end w-80">
							{/* --Kits Btn-- */}
							<button onClick={() => TABS.setChosenTab("KITS_TAB")} aria-label={`view your kit list for ${chosenScene?.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, TABS.chosenTab === "KITS_TAB" ? "text-primary border-primary" : "border-gray-400 text-black")}>
								Kits
							</button>
							{/* --Gear Btn-- */}
							<button onClick={() => TABS.setChosenTab("GEAR_TAB")} aria-label={`view your gear list for ${chosenScene?.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, TABS.chosenTab === "GEAR_TAB" ? "text-primary border-primary" : "border-gray-400 text-black")}>
								Gear
							</button>
						</div>
						<div aria-label={`create a new ${TABS.chosenTab}`} className="px-4 mb-4 flex justify-end w-full">
							<button className="btn-primary">Create {TABS.tabs[TABS.chosenTab]}</button>
						</div>

						{/* drop down component */}
						{projects && <ViewMoreSceneInfo sceneInfo={chosenScene} />}
					</div>
				</div>
				{/* Tab content */}
				<Tab tabOption={TABS.chosenTab} tabName={TABS.tabs["KITS_TYPE"]}>
					{/* scroll content container */}
					<div className="w-full grow overflow-y-scroll bg-[#F6F6F6"></div>
				</Tab>
				<Tab tabOption={TABS.chosenTab} tabName={TABS.tabs["GEAR_TYPE"]}>
					<p>Gear Tab</p>
				</Tab>
			</section>
		</>
	);
}

export default SelectedScene;
