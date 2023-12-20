import classNames from "classnames";
import { IoIosCloseCircle } from "react-icons/io";
import { MdError } from "react-icons/md";
import { GearStatuses, GearType } from "../../types/GearType";

function GearCard({ gearData, isSelectModeActive }: { gearData: GearType; isSelectModeActive: boolean }) {
	// change gear status text color if it matches the correct status
	const gearStatusColorsClass = {
		"text-lime-500": GearStatuses.isAvailable === gearData.status,
		"text-red-500": GearStatuses.isDamaged === gearData.status,
		"text-orange-500": GearStatuses.isInUse === gearData.status,
	};

	return (
		<div className="group relative">
			{isSelectModeActive && (
				<>
					<div className="group cursor-pointer absolute w-full h-full  rounded-md duration-300 group-hover:bg-black opacity-20"></div>
					<div className="absolute flex justify-end w-full bg-white rounded-t-md">
						<IoIosCloseCircle size={"1.8rem"} className={"relative text-black group-hover:text-red-500 duration-300"} />
					</div>
				</>
			)}
			<button className="shadow-md w-40 rounded-md overflow-clip bg-white hover:shadow-[0px_4px_20px_0px_#d6bcfa] duration-300">
				{gearData?.img ? (
					<img src={gearData?.img} alt="image of gear" className="border-gray-200 border-b h-40" />
				) : (
					<div aria-label="no image of gear" className="border-gray-200 border-b h-40">
						<div className="bg-gray-50 h-full flex gap-2 items-center justify-center">
							<MdError size={"1.8rem"} />
							<span>No img</span>
						</div>
					</div>
				)}
				<div className="px-4 py-2 flex gap-4 flex-col items-start">
					<h3 aria-aria-label="gear name" className="font-bold">
						{gearData?.name}
					</h3>
					<span aria-label="Gear Status" className={classNames("text-14 font-bold", gearStatusColorsClass)}>
						{gearData?.status}
					</span>
				</div>
			</button>
		</div>
	);
}

export default GearCard;
