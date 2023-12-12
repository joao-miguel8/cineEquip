import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import type { SceneType } from "../../../types/SceneType";

function SceneCard({ scene, openModal, isSelectModeToggled }: { scene: SceneType; OpenModal: () => void; isSelectModeToggled: { isToggled: false; isOn: false; isOff: true } }) {
	// disable route for delete modal if the select mode is toggled on
	const disableRouteIfSelectModeToggled = isSelectModeToggled.isToggled ? "#" : `/scene/${scene._id}`;

	return (
		<>
			{/* select mode overlay */}
			<div className="p-4 w-[300px] flex flex-col items-center bg-white border border-gray-300 rounded-md hover:bg-primary hover:text-white duration-300 h-30 relative">
				{isSelectModeToggled.isToggled && (
					<div onClick={() => openModal()} className="group flex w-full h-full z-30 absolute top-0 rounded-md">
						<div className="flex justify-end w-full">
							<IoIosCloseCircle size={"1.8rem"} className={"text-black group-hover:text-red-400"} />
						</div>
					</div>
				)}
				<Link to={disableRouteIfSelectModeToggled} className="relative group cursor-pointer w-full flex flex-col">
					{/* Scene name */}
					<div className="w-full truncate">
						<h2 aria-label={scene?.name} className="w-full text-left font-medium text-16">
							{scene?.name}
						</h2>
						{/* scene description */}
						{scene.description ? (
							<p aria-label={scene?.description} className="w-full mt-4  line-clamp-3 text-start">
								{scene?.description}
							</p>
						) : null}
					</div>
					{/* view more section  */}
					<div className="ml-4 flex gap-2 justify-end items-center">
						<span className="text-12 border-b border-b-transparent group-hover:border-b-white ">View More</span>
						<FaChevronRight size={"0.9rem"} />
					</div>
				</Link>
			</div>
		</>
	);
}

export default SceneCard;
