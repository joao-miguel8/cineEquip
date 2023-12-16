import { IoMdClose } from "react-icons/io";
import { createGear } from "../../api/services/gear-services/createGear";
import { GearStatuses, GearType } from "../../types/GearType";
import { FormEvent, useState } from "react";

function CreateGearModal({ modalClose }: { modalClose: () => void }) {
	type FormDataType = Pick<GearType, "name" | "status">;
	const [gearFormData, setGearFormData] = useState<FormDataType>({
		name: "",
		status: GearStatuses.isAvailable,
	});

	const onSubmit = async () => {
		await createGear(gearFormData);
	};
	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGearFormData({ ...gearFormData, status: e.target.value as GearStatuses });
	};
	console.log(gearFormData.status);
	console.log(gearFormData.name);

	return (
		<form onSubmit={onSubmit} className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={() => modalClose()}>
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[28rem] text-left bg-white rounded shadow-lg">
				<div className="flex justify-between items-start pb-3">
					{/* --Modal Title-- */}
					<label id="modal-title" className="text-18 font-bold">
						Create a title for your Gear
					</label>
					{/* --Close Btn-- */}
					<button aria-label="close create a new gear modal" onClick={() => modalClose()}>
						<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>
				{/* --Modal Body-- */}
				<div aria-label="add a name to create your gear" className="mt-4">
					{/* gear name input */}
					<label htmlFor="name" className="font-bold">
						Name
					</label>
					<input onChange={e => setGearFormData({ ...gearFormData, name: e.target.value })} required maxLength={20} minLength={6} placeholder="Gear Name" name="name" id="name" type="text" className="px-2 py-2 w-full border-[1.2px] rounded outline-none focus:border-primary" />
					{/* gear status select */}
					<label htmlFor="status" className="inline-block mt-4 font-bold">
						Status
					</label>
					<select onChange={handleStatusChange} name="status" id="status" className="block px-2 py-2 w-40 border-[1.2px] rounded outline-none focus:border-primary">
						<option value={GearStatuses.isAvailable}>is available</option>
						<option value={GearStatuses.isInUse}>in Use</option>
						<option value={GearStatuses.isDamaged}>is damaged</option>
					</select>
				</div>
				{/* --Modal Footer Btns-- */}
				<div className="mt-6 pt-2 flex gap-4 justify-end">
					{/* --Create Gear Btn-- */}
					<button type="submit" aria-label="add new gear" className="px-4 p-3 text-white bg-primary rounded-lg hover:text-white hover:bg-gray-700">
						Create Gear
					</button>
					{/* --Close Btn-- */}
					<button type="button" aria-label="close create gear modal" className="p-3 px-4 bg-gray-500 text-white rounded-lg  hover:bg-red-400">
						Close
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreateGearModal;
