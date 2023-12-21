import { useQueries, useQuery } from "react-query";
import { useGearStore } from "../../zustand-store/gearStore";
import { fetchAllGear } from "../../api/services/gear-services/fetchAllGear";

function SelectedGearPage() {
	// Zustand store
	const getGearList = useGearStore(state => state.getAllGear);
	const gearList = useGearStore(state => state.gear);

	// Fetch gear from DB
	const gearFetch = useQuery("gears", async () => await fetchAllGear(), {
		onError: error => console.log(error),
		onSuccess: gears => getGearList(gears),
		refetchOnWindowFocus: false,
	});

	return <></>;
}

export default SelectedGearPage;
