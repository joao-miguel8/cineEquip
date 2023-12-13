import classNames from "classnames";
import SearchBar from "../../components/common/Searchbar";
import Header from "../../layout/Header";
import ViewMoreSceneInfo from "./components/ViewMoreSceneInfo";
import { fetchProjects } from "../../api/services/project-services/fetchProjects";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "react-query";
import { useProjectStore } from "../../zustand-store/projectStore";
import type { SceneType } from "../../types/SceneType";
import type { ProjectType } from "../../types/ProjectType";
import Tab from "../../components/common/tab";

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

	enum Scenetabs {
		kits = "kits",
		gear = "gear",
	}
	const [chosenTab, setChosenTab] = useState(Scenetabs.kits);
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
							<button onClick={() => setChosenTab(Scenetabs.kits)} aria-label={`view your kit list for ${chosenScene?.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, chosenTab === "kits" ? " text-primary border-primary" : "border-gray-400 text-black")}>
								Kits
							</button>
							{/* --Gear Btn-- */}
							<button onClick={() => setChosenTab(Scenetabs.gear)} aria-label={`view your gear list for ${chosenScene?.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, chosenTab === "gear" ? " text-primary border-primary" : "border-gray-400 text-black")}>
								Gear
							</button>
						</div>
						{/* drop down component */}
						{projects && <ViewMoreSceneInfo sceneInfo={chosenScene} />}
					</div>
				</div>
				{/* Tab content */}
				<Tab tabOption={chosenTab} tabName={"kits"}>
					{/* scroll content container */}
					<div className="w-full grow overflow-y-scroll bg-[#F6F6F6"></div>
				</Tab>
				<Tab tabOption={chosenTab} tabName={"gear"}>
					<p>Gear Tab</p>
				</Tab>
			</section>
		</>
	);
}

export default SelectedScene;
