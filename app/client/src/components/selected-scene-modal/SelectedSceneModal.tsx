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
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="z-50 overflow-y-auto mx-auto w-full h-full text-left bg-white rounded shadow-lg">
				{/* Close btn container */}
				<div className="p-4 mb-4 w-full flex justify-end items-center">
					{/* --Close Btn-- */}
					<button aria-label={`close ${sceneData.name} scene window`} onClick={() => toggleDispatch("IS_OFF")}>
						<IoMdClose size={"2rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>

				{/* --Modal Scene Title and SearchBar container-- */}
				<div id="modal-title" className="mx-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 font-bold">
					{/* --Modal Scene Title-- */}
					<div className="flex gap-2 text-18 sm:text-20">
						<span>Scene:</span>
						<h4>{sceneData?.name}</h4>
					</div>
					<SearchBar placeholder="Search" />
				</div>

				{/* more info of scene container / and btns */}
				<div className={"mt-4 md:mx-4 md:flex md:justify-between relative"}>
					{/* --Kits Btns and Gear Btns-- */}
					<div className="mx-4 md:mx-0 mt-8 md:mt-0 mb-10 flex gap-6 items-end w-80">
						{/* --Kits Btn-- */}
						<button onClick={() => setChosenTab(Scenetabs.kits)} aria-label={`view your kit list for ${sceneData.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, chosenTab === "kits" ? " text-primary border-primary" : "border-gray-400 text-black")}>
							Kits
						</button>
						{/* --Gear Btn-- */}
						<button onClick={() => setChosenTab(Scenetabs.gear)} aria-label={`view your gear list for ${sceneData.name}`} className={classNames(`w-20 font-bold duration-150 border-b`, chosenTab === "gear" ? " text-primary border-primary" : "border-gray-400 text-black")}>
							Gear
						</button>
					</div>
					{/* drop down component */}
					<ViewMoreSceneInfo isMoreSceneInfoToggled={isMoreSceneInfoToggled} setIsMoreSceneInfoToggled={setIsMoreSceneInfoToggled} sceneInfo={sceneInfo} setSceneInfo={setSceneInfo} />
				</div>
			</div>
		</div>
	);
}

export default SelectedSceneModal;
