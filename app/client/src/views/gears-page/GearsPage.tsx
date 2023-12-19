import GearCard from "../../components/common/GearCard";
import Modal from "../../components/common/Modal";
import CreateGearModal from "../../components/modals/CreateGearModal";
import Header from "../../layout/Header";
import useModal from "../../components/modals/hooks/useModal";
import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";
import { useGearStore } from "../../zustand-store/gearStore";
import { useQuery } from "react-query";
import { useState } from "react";
import classNames from "classnames";

function GearsPage() {
	const modals = useModal(["createGear"]);
	const getGearList = useGearStore(state => state.getAllGear);
	const gearList = useGearStore(state => state.gear);

	const [isSelectModeActive, setIsSelectModeActive] = useState(false);

	const gearFetch = useQuery("gears", async () => await fetchAllGear(), {
		onError: error => console.log(error),
		onSuccess: gears => getGearList(gears),
		refetchOnWindowFocus: false,
	});

	return (
		<>
			{/* sticky top section */}
			<div className="sticky z-50 top-0 w-full bg-bgLight01">
				<Header route={"/"} />
				{/* Select btn | Create Btn */}
				<div onClick={() => setIsSelectModeActive(prevState => !prevState)} aria-label={`create a new gear`} className="mt-8 px-4 mb-4 flex justify-between w-full">
					{/* Select btn */}
					<button className={classNames("btn-toggle-stye01", isSelectModeActive && "bg-gray-800")}>Select Gear</button>
					{/* Create btn */}
					<button
						onClick={() => {
							// Deselect select mode
							setIsSelectModeActive(true);
							modals.openModal("createGear");
						}}
						className="btn-primary">
						Create Gear
					</button>
				</div>
			</div>
			<section className="m-4 mt-20 flex flex-wrap gap-4">
				{gearList?.map(gear => (
					<GearCard gearData={gear} isSelectModeActive={isSelectModeActive} />
				))}
			</section>
			<Modal isOpen={modals.modals.createGear} modalType={"createGear"}>
				<CreateGearModal modalClose={() => modals.closeModal("createGear")} />
			</Modal>
		</>
	);
}

export default GearsPage;
