import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";
import { useQuery } from "react-query";
import { useGearStore } from "../../zustand-store/gearStore";
import { useParams } from "react-router-dom";
import type { GearType } from "../../types/GearType";
import { IMAGE_UPLOAD_URL } from "../../config/IMAGE_UPLOAD_URL";

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
		<div>
			{/* image and details */}
			<div>
				{/* image of gear */}
				<img src={`${IMAGE_UPLOAD_URL}${img}`} alt={`image of ${name}`} className="w-full h-60" />
				{/* name / purchase date / manufacturer / model */}
				<form className="mt-4 mx-4 flex flex-col gap-4">
					<input value={name} className="p-2 text-24" />
					<label htmlFor="cost">Cost:</label>
					<input type="text" name="cost" id="cost" placeholder="Add a gear cost?" className="p-2" />
					<label htmlFor="purchaseDate">Purchase Date:</label>
					<input type="date" name="purchaseDate" id="purchaseDate" placeholder="Add a purchase date" className="p-2" />
					<label htmlFor="manufacturer">Manufacturer:</label>
					<input type="text" name="manufacturer" id="manufacturer" placeholder="What manufacturer is this gear?" className="p-2" />
					<label htmlFor="model">Model:</label>
					<input type="text" name="model" id="model" placeholder="What Model is this gear?" className="p-2" />
				</form>
				{/* bottom gear details section */}
				<div>
					<form className="mx-4">
						{/* QR code icon */}
						<div className="mt-10 flex justify-between">
							<span>QR code Icon</span>
							{/* gear status drop down */}
							<select name="gearStatus" id="gearStatus">
								<option value="isAvailable">is Available</option>
								<option value="inUse">in Use</option>
								<option value="isDamaged">is Damaged</option>
							</select>
						</div>
						{/* description */}
						<div className="mt-10 flex flex-col">
							<label htmlFor="description">Description:</label>
							<textarea name="description" id="description" placeholder="Add a description" cols={30} rows={10} className="p-2"></textarea>
						</div>
					</form>
				</div>
			</div>
			<div></div>
		</div>
	);
}

export default SelectedGearPage;
