import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";
import { useGearStore } from "../../zustand-store/gearStore";
import { IMAGE_UPLOAD_URL } from "../../config/IMAGE_UPLOAD_URL";
import type { GearType } from "../../types/GearType";

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

	return (
		<>
			<Link to={"/gear"} className="w-full mx-4 mt-6 flex items-center gap-2">
				<IoChevronBackOutline size={"1.8rem"} />
			</Link>
			<div className="mb-10 mt-10 mx-4 flex justify-center">
				<div className="w-full md:w-fit">
					{/* image of gear */}
					<div className="flex flex-col md:flex-row gap-4 justify-center">
						<img src={`${IMAGE_UPLOAD_URL}${img}`} alt={`image of ${name}`} className="mx-auto w-[400px] md:w-80 rounded-sm" />
						{/* name / purchase date / manufacturer / model */}

						<form className="mt-6 md:mt-0 flex flex-col justify-between rounded-sm">
							{/* gear name */}
							<div className="flex gap-2 items-center">
								<label htmlFor="name" className="flex-2 font-bold">
									Name:
								</label>
								<input value={name} name="name" id="name" className="flex-1 bg-transparent outline-none" placeholder="gear name?" maxLength={20} />
							</div>
							{/* gear cost */}
							<div className="flex gap-2 items-center">
								<label htmlFor="cost" className="flex-2 font-bold">
									Cost:
								</label>
								<input type="number" name="cost" id="cost" placeholder="gear cost?" className="flex-1 bg-transparent outline-none" maxLength={12} />
								{/* gear purchase date */}
							</div>
							<div className="flex gap-2 items-center">
								<label htmlFor="purchaseDate" className="flex-2 font-bold">
									Purchase Date:
								</label>
								<input type="date" name="purchaseDate" id="purchaseDate" placeholder="Add a purchase date" className="px-2 flex-1 outline-none rounded-full" />
							</div>
							{/* gear manufacturer */}
							<div className="flex gap-2 items-center">
								<label htmlFor="manufacturer" className="flex-2 font-bold">
									Manufacturer:
								</label>
								<input type="text" name="manufacturer" id="manufacturer" placeholder="gear manufacturer?" className="flex-1 outline-none bg-transparent" maxLength={12} />
							</div>
							{/* gear model */}
							<div className="flex gap-2 items-center">
								<label htmlFor="model" className="flex-2 font-bold">
									Model:
								</label>
								<input type="text" name="model" id="model" placeholder="gear model?" className="flex-1 outline-none bg-transparent" maxLength={12} />
							</div>
						</form>
					</div>
					{/* bottom gear details section */}
					<div>
						<form>
							{/* gear QR code icon */}
							<div className="mt-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
								<span>QR code Icon</span>
								{/* gear status drop down */}
								<div className="flex gap-2 items-center">
									<label htmlFor="gearStatus" className="font-bold">
										Gear Status:
									</label>
									<select name="gearStatus" id="gearStatus" className="p-2 outline-none rounded-full">
										<option value="isAvailable">is Available</option>
										<option value="inUse">in Use</option>
										<option value="isDamaged">is Damaged</option>
									</select>
								</div>
							</div>
							{/* gear description */}
							<div className="mt-10 flex flex-col">
								<label htmlFor="description" className="font-bold">
									Description:
								</label>
								<textarea name="description" id="description" placeholder="Add a description" cols={30} rows={8} maxLength={400} className="mt-2 p-2 resize-none outline-none rounded-sm"></textarea>
							</div>
						</form>
					</div>
					<button className="mt-4 px-4 py-2 btn-primary text-white">Update Gear</button>
				</div>
			</div>
		</>
	);
}

export default SelectedGearPage;
