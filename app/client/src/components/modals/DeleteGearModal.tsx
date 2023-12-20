import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import type { GearType } from "../../types/GearType";
import { deleteGear } from "../../api/services/gear-services/deleteGear";

function DeleteGearModal({ selectedGearData, closeModal }: { selectedGearData: GearType | null; closeModal: () => void }) {
	const [deleteTitleInput, setDeleteTitleInput] = useState<string>("");
	const { name } = selectedGearData ?? {};

	const handleDeleteGearSubmit = async () => {
		if (deleteTitleInput === selectedGearData?.name) {
			await deleteGear(selectedGearData?._id);
		}
	};

	useDisableBodyScroll();

	return (
		<div onClick={closeModal} className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center">
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<form onSubmit={handleDeleteGearSubmit} onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[28rem] text-left bg-white rounded shadow-lg">
				{/* --Close Btn-- */}
				<button onClick={closeModal} className="w-full flex justify-end">
					<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
				</button>
				{/* --Modal Title-- */}
				<h4 id="modal-title" className="w-full text-center text-20 font-bold ">
					Delete Gear
				</h4>
				{/* --Modal Body-- */}
				<div aria-label={`type ${name} to delete your gear`} className="text-center mt-2">
					<div className="my-2">
						<p className="font-bold text-16 italic">Type the gear name to delete</p>
						<p className="mt-2">
							<span className="italic text-16 inline-block mr-2 ">Gear Name:</span>
							{name?.split("").map((ltr: string, i: number) => {
								return (
									<span key={i} className={classNames("italic text-16 font-bold ", ltr === deleteTitleInput[i] ? "text-gray-800" : "text-gray-400")}>
										{ltr}
									</span>
								);
							})}
						</p>
					</div>
					<input value={deleteTitleInput} onChange={e => setDeleteTitleInput(e.target.value)} type="text" className="px-2 py-2 w-full border-[1.2px] rounded outline-none focus:border-red-400" />
				</div>
				{/* --delete gear Btn-- */}
				<div aria-label="delete your gear button" className="flex w-full justify-end">
					<button onClick={closeModal} className="mt-4 p-2 text-white bg-[#F25554] rounded-lg font-medium hover:text-white hover:bg-red-600">
						Delete Gear
					</button>
				</div>
			</form>
		</div>
	);
}

export default DeleteGearModal;
