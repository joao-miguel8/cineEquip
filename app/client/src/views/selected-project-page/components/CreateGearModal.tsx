import { IoMdClose } from "react-icons/io";

import type { UseToggleType } from "../../../hooks/useToggle/type";

function CreateGearModal({ modalToggle }: { modalToggle: UseToggleType }) {
	const onSubmit = (e: any) => {
		console.log(JSON.stringify(e));
		modalToggle.dispatch("IS_OFF");
	};

	return (
		<form onSubmit={onSubmit} className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={() => modalToggle.dispatch("IS_OFF")}>
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
					<button aria-label="close create a new gear modal" onClick={() => modalToggle.dispatch("IS_OFF")}>
						<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>
				{/* --Modal Body-- */}
				<div aria-label="add a name to create your gear" className="mt-4">
					<input placeholder="Gear Name" type="text" className="px-2 py-2 w-full border-[1.2px] rounded outline-none focus:border-primary" />
				</div>
				{/* --Modal Footer Btns-- */}
				<div className="mt-6 pt-2 flex gap-4 justify-end">
					{/* --Create Gear Btn-- */}
					<button type="submit" value="submit" aria-label="add new gear" className="px-4 p-3 text-white bg-primary rounded-lg hover:text-white hover:bg-gray-700">
						Create Gear
					</button>
					{/* --Close Btn-- */}
					<button type="button" onClick={() => modalToggle.dispatch("IS_OFF")} aria-label="close create gear modal" className="p-3 px-4 bg-gray-500 text-white rounded-lg  hover:bg-red-400">
						Close
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreateGearModal;
