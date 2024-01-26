import { FaCheckCircle } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IMAGE_UPLOAD_URL } from "../../config/IMAGE_UPLOAD_URL";
import { deselectElementByID } from "../../util/deselectElementByID";
import { selectElementByID } from "../../util/selectElementByID";
import { useState } from "react";
import type { GearType } from "../../types/GearType";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import classNames from "classnames";

function AddGearToProjectModal({ closeModal, gearData }: { closeModal: () => void; gearData: GearType[] }) {
	// disable body scroll
	useDisableBodyScroll();
	const [selectedGear, setSelectedGear] = useState<GearType[]>([]);

	function handleGearSelection(e: React.MouseEvent<HTMLButtonElement>, arr: GearType[], chosenID: string | null) {
		e.preventDefault();
		const chosenGear = selectElementByID(arr, chosenID);

		if (!selectedGear.some(gear => gear === chosenGear)) {
			setSelectedGear(prevSelected => [...prevSelected, chosenGear]);
		} else {
			setSelectedGear(prevSelected => deselectElementByID(prevSelected, chosenID) as GearType[]);
		}
	}

	console.log(selectedGear);
	return (
		// --Main Container--
		<form className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={closeModal}>
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="pb-2 px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[80rem] text-left bg-white rounded shadow-lg">
				<div className="flex justify-between items-start pb-3">
					{/* --Modal Title-- */}
					<h4 id="modal-title" className="w-[14rem] sm:w-full text-18 font-bold">
						Choose Gear to add to your Projects
					</h4>
					{/* --Close Btn-- */}
					<button aria-label="close create a new project modal" onClick={closeModal}>
						<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>
				{/* --Modal Body-- */}
				<div className="flex items-start flex-wrap gap-4 p-2 mt-2 h-80 overflow-scroll bg-white">
					{gearData.map((gear: GearType) => {
						const selectedItem = selectedGear.some(selected => selected === gear);
						return (
							// Gear Card
							<button onClick={e => handleGearSelection(e, gearData, gear._id ?? null)} className={classNames(`relative m-[1.2px] w-fit hover:bg-accent duration-300`, selectedItem && "bg-accent")}>
								{/* Gear image with bg background*/}
								<div className={classNames(`bg-black w-full`, selectedItem ? "brightness-50 duration-300" : "bg-gray-50")}>
									<img src={`${IMAGE_UPLOAD_URL}${gear.img}`} alt={`image of ${gear.name}`} className={classNames(`mx-auto max-w-[12rem] md:max-w-[14rem] h-40 w-auto object-fit`)} />
								</div>
								{selectedItem ? <FaCheckCircle size={"1.4rem"} color={"#ffff"} className="absolute top-4 right-4" /> : null}
								{/* gear title */}
								<h3 className="p-2 mt-2 text-left text-16 font-bold">{gear.name}</h3>
							</button>
						);
					})}
				</div>
				{/* --Modal Footer Btns-- */}

				{/* --Create Project Btn-- */}
				<div className="mt-4 w-full flex items-center justify-between">
					<h4 className="font-bold">Total Selected: {selectedGear.length}</h4>
					<button aria-label="add new project" type="submit" className="p-2 sm:px-4 sm:p-3 font-bold justify-end flex items-center gap-2 text-primary border-2 border-primary rounded-lg hover:text-white hover:bg-primary duration-300">
						Next
						<FaArrowAltCircleRight size={"1.4rem"} color="bg-accent" />
					</button>
				</div>
			</div>
		</form>
	);
}

export default AddGearToProjectModal;
