import React from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import type { SceneType } from "../../../types/SceneType";
import type { UseToggleType } from "../../../hooks/useToggle/type";

const SceneWrapper = ({ isSelectModeToggled, openModal, link, children }: { isSelectModeToggled: boolean; link: string; openModal: Function; children: React.ReactNode }) => {
	if (isSelectModeToggled) {
		return (
			<button type="button" onClick={() => openModal()} className="relative group rounded-md">
				<IoIosCloseCircle size={"1.8rem"} className="absolute z-10 top-2 right-2 text-black group-hover:text-red-400" />
				{children}
			</button>
		);
	} else {
		return <Link to={link}>{children}</Link>;
	}
};

function SceneCard({ scene, openModal, isSelectModeToggled }: { scene: SceneType; openModal: Function; isSelectModeToggled: UseToggleType }) {
	return (
		<SceneWrapper isSelectModeToggled={isSelectModeToggled.isToggled} openModal={openModal} link={`/scene/${scene._id}`}>
			<div className="p-4 w-[300px] flex flex-col items-center bg-white border border-gray-300 rounded-md hover:bg-primary hover:text-white duration-300 h-30">
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
				<div className="w-full mt-10 ml-4 flex gap-2 justify-end items-center">
					<span className="text-12 border-b border-b-transparent group-hover:border-b-white">View More</span>
					<FaChevronRight size={"0.9rem"} />
				</div>
			</div>
		</SceneWrapper>
	);
}

export default SceneCard;
