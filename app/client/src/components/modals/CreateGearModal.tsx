import classNames from "classnames";
import { IoMdClose } from "react-icons/io";
import { createGear } from "../../api/services/gear-services/createGear";
import { useState } from "react";
import { GearStatuses } from "../../types/GearType";

function CreateGearModal({ modalClose }: { modalClose: () => void }) {
	type FormDataType = {
		name: string;
		status: "isAvailable" | "isInUse" | "isDamaged";
		img: File | null;
	};

	const [imgPreview, setImgPreview] = useState<string>("");

	// making the data be passed into req body
	const [gearFormData, setGearFormData] = useState<FormDataType>({
		name: "",
		status: GearStatuses.isAvailable,
		img: null,
	});

	const onSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
		try {
			e.preventDefault();
			// Create copy of current form data
			const updatedFormData = {
				...gearFormData,
			};
			// Trim whitespace from 'name' field
			updatedFormData.name = updatedFormData.name.trim();

			await createGear(updatedFormData);
		} catch (err) {
			console.log(err, "Error Submitting form");
		}
	};

	const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setGearFormData({ ...gearFormData, status: e.target.value as GearStatuses });
	};

	const uploadGearImage: React.ChangeEventHandler<HTMLInputElement> = e => {
		const files = e.target.files || null;

		// check if file exists and if have more than 1 file
		if (files && files.length > 0) {
			setGearFormData({ ...gearFormData, img: files[0] });
			// show selected image preview in gear modal
			setImgPreview(URL.createObjectURL(e.target.files[0]));
		}
	};

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
					<button aria-label="close create a new gear modal" onClick={modalClose}>
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
					{/* drag and drop gear image */}
					<div className={classNames("mt-4 flex items-center justify-center w-full rounded-lg", imgPreview ?? "bg-gray-50")} style={{ backgroundImage: `url(${imgPreview})`, backgroundSize: "cover", backgroundPosition: "center" }}>
						<label htmlFor="dropzone-img-file" className="flex flex-col items-center justify-center w-full h-64 border border-gray-300 border-dashed rounded-lg cursor-pointer">
							<div className={classNames("flex flex-col items-center justify-center pt-5 pb-6", imgPreview ? "hidden" : "inline-block")}>
								<svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
									<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
							</div>
							<input onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadGearImage(e)} id="dropzone-img-file" type="file" className="hidden" />
						</label>
					</div>
				</div>

				{/* --Modal Footer Btns-- */}
				<div className="mt-6 pt-2 flex gap-4 justify-end">
					{/* --Create Gear Btn-- */}
					<button type="submit" aria-label="add new gear" className="px-4 p-3 text-white bg-primary rounded-lg hover:text-white hover:bg-gray-700">
						Create Gear
					</button>
					{/* --Close Btn-- */}
					<button onClick={modalClose} type="button" aria-label="close create gear modal" className="p-3 px-4 bg-gray-500 text-white rounded-lg  hover:bg-red-400">
						Close
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreateGearModal;
