import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";
import { IMAGE_UPLOAD_URL } from "../../config/IMAGE_UPLOAD_URL";
import { GearStatuses, GearType } from "../../types/GearType";
import { useGearStore } from "../../zustand-store/gearStore";
import { updateGearDetails } from "../../api/services/gear-services/updateGearDetails";

function SelectedGearPage() {
	const { id } = useParams();

	// Zustand store
	const getGearList = useGearStore(state => state.getAllGear);

	// Fetch gear from DB
	const gearFetch = useQuery("gears", async () => await fetchAllGear(), {
		onError: error => console.log(error),
		onSuccess: gears => getGearList(gears),
		refetchOnWindowFocus: false,
	});

	const selectedGear = gearFetch?.data?.find((gear: GearType) => gear._id === id);
	const { _id, name, img, status, QRCode } = selectedGear ?? {};

	const [gearFormData, setGearFormData] = useState<GearType>({
		name: name,
		cost: 0,
		purchaseDate: "",
		manufacturer: "",
		model: "",
		status: status,
		description: "",
	});

	// update gearFormData if selectedGear gets updated
	useEffect(() => {
		setGearFormData(selectedGear);
	}, [selectedGear]);

	async function handleEditGearSubmit() {
		await updateGearDetails(_id, gearFormData);
	}

	// Format purchase date
	const purchaseDateFormat = gearFormData?.purchaseDate && gearFormData?.purchaseDate?.slice(0, 10);

	return (
		<>
			<Link to={"/gear"} className="w-full mx-4 mt-6 flex items-center gap-2">
				<IoChevronBackOutline size={"1.8rem"} />
			</Link>
			<div className="mb-10 mt-10 mx-4 flex justify-center">
				<div className="w-full md:w-fit">
					<form onSubmit={handleEditGearSubmit}>
						{/* img || name / purchase date / manufacturer / model */}
						<div className="md:flex gap-4">
							{/* image of gear */}
							<img src={`${IMAGE_UPLOAD_URL}${img}`} alt={`image of ${name}`} className="mx-auto w-[400px] md:w-60 rounded-sm" />
							{/* name / purchase date / manufacturer / model */}
							<div className="mt-6 md:mt-0 flex flex-col gap-4">
								{/* gear name */}
								<div className="flex gap-2 items-center">
									<label htmlFor="name" className="flex-2 font-bold">
										Name:
									</label>
									<input onChange={e => setGearFormData(prevFormData => ({ ...prevFormData, name: e.target.value }))} value={gearFormData?.name} name="name" id="name" className="flex-1 bg-transparent outline-none" placeholder="gear name?" maxLength={20} />
								</div>
								{/* gear cost */}
								<div className="flex gap-2 items-center">
									<label htmlFor="cost" className="flex-2 font-bold">
										Cost:
									</label>
									<input
										onChange={e => {
											setGearFormData(prevFormData => ({ ...prevFormData, cost: e.target.value }));
										}}
										value={gearFormData?.cost ?? 0}
										type="number"
										step={0.01}
										inputMode="decimal"
										name="cost"
										id="cost"
										placeholder="gear cost?"
										className="flex-1 bg-transparent outline-none"
										maxLength={12}
									/>
									{/* gear purchase date */}
								</div>
								<div className="flex gap-2 items-center">
									<label htmlFor="purchaseDate" className="flex-2 font-bold">
										Purchase Date:
									</label>
									<input
										onChange={e => {
											setGearFormData(prevFormData => ({ ...prevFormData, purchaseDate: new Date(e.target.value).toISOString() }));
										}}
										value={purchaseDateFormat}
										type="date"
										name="purchaseDate"
										id="purchaseDate"
										placeholder="Add a purchase date"
										className="px-2 flex-1 outline-none rounded-full"
									/>
								</div>
								{/* gear manufacturer */}
								<div className="flex gap-2 items-center">
									<label htmlFor="manufacturer" className="flex-2 font-bold">
										Manufacturer:
									</label>
									<input
										onChange={e => setGearFormData(prevFormData => ({ ...prevFormData, manufacturer: e.target.value }))}
										value={gearFormData?.manufacturer}
										type="text"
										name="manufacturer"
										id="manufacturer"
										placeholder="gear manufacturer?"
										className="flex-1 outline-none bg-transparent"
										maxLength={12}
									/>
								</div>
								{/* gear model */}
								<div className="flex gap-2 items-center">
									<label htmlFor="model" className="flex-2 font-bold">
										Model:
									</label>
									<input onChange={e => setGearFormData(prevFormData => ({ ...prevFormData, model: e.target.value }))} value={gearFormData?.model} type="text" name="model" id="model" placeholder="gear model?" className="flex-1 outline-none bg-transparent" maxLength={12} />
								</div>
							</div>
						</div>
						{/* QRCode / gear status || description */}
						<div>
							{/* gear QR code icon */}
							<div className="mt-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
								<span>QR code Icon</span>
								{/* gear status drop down */}
								<div className="flex gap-2 items-center">
									<label htmlFor="gearStatus" className="font-bold">
										Gear Status:
									</label>
									<select onChange={e => setGearFormData(prevFormData => ({ ...prevFormData, status: e.target.value as GearStatuses }))} value={gearFormData?.status} name="gearStatus" id="gearStatus" className="p-2 outline-none rounded-full">
										<option value={GearStatuses.isAvailable}>is Available</option>
										<option value={GearStatuses.isInUse}>in Use</option>
										<option value={GearStatuses.isDamaged}>is Damaged</option>
									</select>
								</div>
							</div>
							{/* gear description */}
							<div className="mt-10 flex flex-col">
								<label htmlFor="description" className="font-bold">
									Description:
								</label>
								<textarea
									onChange={e => setGearFormData(prevFormData => ({ ...prevFormData, description: e.target.value }))}
									value={gearFormData?.description}
									name="description"
									id="description"
									placeholder="Add a description"
									cols={30}
									rows={8}
									maxLength={400}
									className="mt-2 p-2 resize-none outline-none rounded-sm"></textarea>
							</div>
						</div>
						<button type="submit" className="mt-4 px-4 py-2 btn-primary text-white">
							Update Gear
						</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SelectedGearPage;
