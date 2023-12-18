import classNames from "classnames";
import { GearStatuses, GearType } from "../../types/GearType";

function GearCard({ gearData }: { gearData: GearType }) {
	// change gear status text color if it matches the correct status
	const gearStatusColorsClass = {
		"text-lime-500": GearStatuses.isAvailable === gearData.status,
		"text-red-500": GearStatuses.isDamaged === gearData.status,
		"text-orange-500": GearStatuses.isInUse === gearData.status,
	};

	return (
		<button className="shadow-md w-40 rounded-sm overflow-clip bg-white hover:bg-accent duration-300">
			<img src="#" alt="image of gear" className="border-gray-200 border-b h-40" />
			<div className="px-4 py-2 flex gap-4 flex-col items-start">
				<h3 aria-aria-label="gear name">{gearData?.name}</h3>
				<span aria-label="Gear Status" className={classNames("text-14", gearStatusColorsClass)}>
					{gearData?.status}
				</span>
			</div>
		</button>
	);
}

export default GearCard;
