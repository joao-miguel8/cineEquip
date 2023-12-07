import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import SearchBar from "../common/searchbar/Searchbar";
import ViewMoreSceneInfo from "../view-more-scene-info/ViewMoreSceneInfo";
import { useState } from "react";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import type { SceneType } from "../../types/SceneType";

function SelectedSceneModal({ sceneData, toggleDispatch }: { sceneData: SceneType; toggleDispatch: (action: string) => void }) {
	// remove body scroll when modal opens
	useDisableBodyScroll();

	const [sceneInfo, setSceneInfo] = useState(sceneData);

	const [isMoreSceneInfoToggled, setIsMoreSceneInfoToggled] = useState(true);

	enum Scenetabs {
		kits = "kits",
		gear = "gear",
	}
	const [chosenTab, setChosenTab] = useState(Scenetabs.kits);

	return (
		//  --Main Container--
		<div className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={() => toggleDispatch("IS_OFF")}>
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="pb-20 z-50 overflow-y-auto mx-auto w-full h-full text-left bg-white rounded shadow-lg">
				{/* Close btn container */}
				<div className="p-4 mb-4 w-full flex justify-end items-center">
					{/* --Close Btn-- */}
					<button aria-label={`close ${sceneData.name} scene window`} onClick={() => toggleDispatch("IS_OFF")}>
						<IoMdClose size={"2rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>

				{/* --Modal Scene Title and SearchBar container-- */}
				<div id="modal-title" className="px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-bold">
					{/* --Modal Scene Title-- */}
					<div className="flex gap-2 text-18 sm:text-20">
						<span>Scene:</span>
						<h4>{sceneData?.name}</h4>
					</div>
					<SearchBar placeholder="Search" />
				</div>
				{/* more info of scene container */}
				{/* drop down container */}
				<div className={"mt-4 md:mx-4 md:flex md:justify-end"}>
					{/* drop down component */}
					<ViewMoreSceneInfo isMoreSceneInfoToggled={isMoreSceneInfoToggled} setIsMoreSceneInfoToggled={setIsMoreSceneInfoToggled} sceneInfo={sceneInfo} setSceneInfo={setSceneInfo} />
				</div>

				{/* --Modal Footer Btns-- */}
				<div className="fixed bottom-0 flex w-full">
					{/* --Kits Btn-- */}
					<button onClick={() => setChosenTab(Scenetabs.kits)} aria-label={`view your kit list for ${sceneData.name}`} className={classNames(`p-2 flex-1 font-bold duration-150`, chosenTab === "kits" ? "bg-accent text-black" : "bg-black text-white")}>
						Kits
					</button>
					{/* --Gear Btn-- */}
					<button onClick={() => setChosenTab(Scenetabs.gear)} aria-label={`view your gear list for ${sceneData.name}`} className={classNames(`p-2 flex-1 font-bold duration-150`, chosenTab === "gear" ? "bg-accent text-black" : "bg-black text-white")}>
						Gear
					</button>
				</div>
			</div>
		</div>
	);
}

export default SelectedSceneModal;
