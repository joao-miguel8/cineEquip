import classNames from "classnames";
import GearCard from "../../components/common/GearCard";
import Modal from "../../components/common/Modal";
import CreateGearModal from "../../components/modals/CreateGearModal";
import DeleteGearModal from "../../components/modals/DeleteGearModal";
import PopUpActions from "../../components/common/PopUpActions";
import Header from "../../layout/Header";
import type { GearType } from "../../types/GearType";
import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";
import useModal from "../../components/modals/hooks/useModal";
import { useGearStore } from "../../zustand-store/gearStore";
import { useQuery } from "react-query";
import { useState } from "react";
import AddGearToProjectModal from "../../components/modals/AddGearToProjectModal";

function GearsPage() {
	const modals = useModal(["createGear", "deleteGear", "addGearToProject"]);

	const getGearList = useGearStore(state => state.getAllGear);
	const gearList = useGearStore(state => state.gear);

	const [isSelectModeActive, setIsSelectModeActive] = useState(false);

	const [selectedGearCard, setSelectedGearCard] = useState<GearType>();

	const { data } = useQuery("gears", async () => await fetchAllGear(), {
		onError: error => console.log(error),
		onSuccess: gears => getGearList(gears),
		refetchOnWindowFocus: false,
	});

	const gearPopUpActions = [
		{
			label: "Create Gear",
			onClick: () => modals.openModal("createGear"),
		},
		{ label: "Add Gear to project", onClick: () => modals.openModal("addGearToProject") },
		{ label: "Add Gear to kit", onClick: () => console.log("Add Gear to Kit") },
	];

	return (
		<>
			{/* sticky top section */}
			<div className="sticky z-50 top-0 w-full bg-bgLight01">
				<Header route={"/"} />
				{/* Select btn | Popup actions dropdown */}
				<div aria-label={`create a new gear`} className="mt-8 px-4 mb-4 flex justify-between w-full">
					{/* Select btn */}
					<button onClick={() => setIsSelectModeActive(prevState => !prevState)} className={classNames("btn-toggle-stye01", isSelectModeActive && "bg-gray-800")}>
						Select Gear
					</button>
					{/* Popup Actions Dropdown */}
					<PopUpActions iconOnClick={() => setIsSelectModeActive(false)} actions={gearPopUpActions} />
				</div>
			</div>
			<section className="m-4 mt-20 flex flex-wrap gap-4">
				{gearList?.map(gear => (
					<button
						onClick={() => {
							modals.openModal("deleteGear");
							setSelectedGearCard(gear);
						}}>
						<GearCard gearData={gear} isSelectModeActive={isSelectModeActive} />
					</button>
				))}
			</section>
			{/* Create Gear Modal */}
			<Modal isOpen={modals.modals.createGear} modalType={"createGear"}>
				<CreateGearModal modalClose={() => modals.closeModal("createGear")} />
			</Modal>
			{/* Delete Gear Modal */}
			<Modal isOpen={modals.modals["deleteGear"]} modalType={"deleteGear"}>
				<DeleteGearModal closeModal={() => modals.closeModal("deleteGear")} selectedGearData={selectedGearCard} />
			</Modal>
			{/* Add Gear to project Modal */}
			<Modal isOpen={modals.modals["addGearToProject"]} modalType={"addGearToProject"}>
				<AddGearToProjectModal closeModal={() => modals.closeModal("addGearToProject")} gearData={data} />
			</Modal>
		</>
	);
}

export default GearsPage;
