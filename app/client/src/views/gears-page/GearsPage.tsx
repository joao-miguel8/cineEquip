import GearCard from "../../components/common/GearCard";
import Modal from "../../components/common/Modal";
import CreateGearModal from "../../components/modals/CreateGearModal";
import Header from "../../layout/Header";
import useModal from "../../components/modals/hooks/useModal";

function GearsPage() {
	const modals = useModal(["createGear"]);

	return (
		<>
			<Header route={"/"} />
			{/* Select btn | Create Btn */}
			<div aria-label={`create a new gear`} className="mt-8 px-4 mb-4 flex justify-between w-full">
				{/* Select btn */}
				<button className="btn-toggle-stye01 ">Select Gear</button>
				{/* Create btn */}
				<button onClick={() => modals.openModal("createGear")} className="btn-primary">
					Create Gear
				</button>
			</div>
			<section className="m-4 flex flex-wrap gap-4">
				<GearCard />
			</section>
			<Modal isOpen={modals.modals.createGear} modalType={"createGear"}>
				<CreateGearModal modalClose={() => modals.closeModal("createGear")} />
			</Modal>
		</>
	);
}

export default GearsPage;
