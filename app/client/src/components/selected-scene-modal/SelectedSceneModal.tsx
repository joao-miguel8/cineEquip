import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import SearchBar from "../common/searchbar/Searchbar";
import { useState } from "react";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { SceneType } from "../../types/SceneType";
import { FaChevronUp } from "react-icons/fa";
import ViewMoreSceneInfo from "../view-more-scene-info/ViewMoreSceneInfo";

function SelectedSceneModal({ sceneData, toggleDispatch }: { sceneData: SceneType; toggleDispatch: (action: string) => void }) {
	// remove body scroll when modal opens
	useDisableBodyScroll();

	const [sceneInfo, setSceneInfo] = useState(sceneData);

	const [isMoreSceneInfoToggled, setIsMoreSceneInfoToggled] = useState(false);

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
				<div className="p-4">
					<div className="flex justify-between items-start pb-3">
						{/* --Modal Title-- */}
						<div id="modal-title" className="flex gap-2 items-end font-bold">
							<span className="text-18">Scene:</span>
							<h4 className="text-16">{sceneData?.name}</h4>
						</div>
						{/* --Close Btn-- */}
						<button aria-label={`close ${sceneData.name} scene window`} onClick={() => toggleDispatch("IS_OFF")}>
							<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
						</button>
					</div>
					<SearchBar placeholder="Search" />
					{/* more info of scene container */}
				</div>
				{/* /// */}
				<button onClick={() => setIsMoreSceneInfoToggled(prevVal => !prevVal)} className="pl-4 p-2 h-14 text-left w-full flex justify-between items-center bg-neutral-800 text-white">
					View More info about {sceneData.name}
					<FaChevronUp size={"1.4rem"} className={classNames(`mr-4 duration-300`, isMoreSceneInfoToggled ? "rotate-180" : "rotate-0")} />
				</button>
				<div className={classNames(`overflow-hidden`, isMoreSceneInfoToggled ? "h-0" : "h-fit")}>
					{/* drop town tab */}
					<ViewMoreSceneInfo isMoreSceneInfoToggled={isMoreSceneInfoToggled} sceneInfo={sceneInfo} setSceneInfo={setSceneInfo} />
				</div>

				{/* --Modal Footer Btns-- */}
				<div className="fixed bottom-0 flex w-full ">
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