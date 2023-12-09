import SceneCard from "./SceneCard";
import SelectedSceneModal from "./SelectedSceneModal";
import useToggle from "../../../hooks/useToggle/useToggle";
import { useState } from "react";
import type { SceneType } from "../../../types/SceneType";
import type { UseToggleType } from "../../../hooks/useToggle/type";

function ScenesList({ scenesList }: { scenesList: SceneType[] }) {
	const [chosenScene, setChosenScene] = useState<SceneType>();

	const toggleModal = useToggle();
	const { isToggled, isOn: isChosenSceneOpened, isOff, dispatch }: UseToggleType = toggleModal;

	return (
		<>
			<section className="pb-[70px] p-4 mt-4 mx-auto flex flex-wrap gap-4 items-start justify-center sm:justify-start">
				{scenesList.map(scene => {
					return (
						<>
							<div
								onClick={() => {
									dispatch("IS_ON");
									setChosenScene(scene);
								}}>
								<SceneCard key={scene._id} scene={scene} />
							</div>
						</>
					);
				})}
				{isChosenSceneOpened && <SelectedSceneModal sceneData={chosenScene} toggleDispatch={dispatch} />}
			</section>
		</>
	);
}

export default ScenesList;
