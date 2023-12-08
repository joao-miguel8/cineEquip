import { FaChevronRight } from "react-icons/fa";
import type { SceneType } from "../../types/SceneType";

function SceneCard({ scene }: { scene: SceneType }) {
	return (
		<button className="group cursor-pointer flex">
			<div className="py-4 px-2 w-[300px] flex flex-col items-center bg-white border border-gray-300 rounded-md hover:bg-primary hover:text-white duration-300">
				<div className="w-full flex gap-2 items-center justify-between">
					<h2 aria-label={scene?.name} className="w-40 text-left truncate font-medium text-16">
						{scene?.name}
					</h2>
					<div className="flex gap-2 items-center">
						<span className="text-12 border-b border-b-transparent group-hover:border-b-white ">View More</span>
						<FaChevronRight size={"0.9rem"} />
					</div>
				</div>

				{scene.description ? (
					<p aria-label={scene?.description} className="w-full mt-4 overflow-hidden line-clamp-3 text-start">
						{scene?.description}
					</p>
				) : null}
			</div>
		</button>
	);
}

export default SceneCard;
