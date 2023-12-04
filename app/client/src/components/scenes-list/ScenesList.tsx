import SceneCard from "../scene-card/SceneCard";
import type { SceneType } from "../../types/SceneType";

function ScenesList({ scenesList }: { scenesList: SceneType[] }) {
	return (
		<section className="pb-[70px] p-4 mt-4 mx-auto flex flex-wrap gap-4 items-start justify-center sm:justify-start">
			{scenesList.map(scene => {
				return <SceneCard key={scene._id} scene={scene} />;
			})}
		</section>
	);
}

export default ScenesList;
