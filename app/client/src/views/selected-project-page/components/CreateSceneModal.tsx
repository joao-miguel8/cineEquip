import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import type { UseToggleType } from "../../../hooks/useToggle/type";
import type { SceneType } from "../../../types/SceneType";
import { createScene } from "../../../api/services/scene-services/createScene";

function CreateSceneModal({ openModal, closeModal, modalToggle, projectId }: { openModal: () => void; closeModal: () => void; modalToggle: UseToggleType; projectId: string }) {
	const [sceneForm, setSceneForm] = useState<SceneType>({
		name: "",
		description: "",
	});

	const handleFormSubmit = async () => {
		try {
			await createScene(projectId, sceneForm.name, sceneForm.description || "");
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	return (
		<form onSubmit={async () => await handleFormSubmit()} className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onClick={() => closeModal()}>
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[28rem] text-left bg-white rounded shadow-lg">
				<div className="flex justify-between items-start pb-3">
					{/* --Modal Title-- */}
					<label id="modal-title" className="text-18 font-bold">
						Create a title for your Scene
					</label>
					{/* --Close Btn-- */}
					<button aria-label="close create a new scene modal" onClick={() => closeModal()}>
						<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>
				{/* --Modal Body-- */}
				<div aria-label="add a scene name to create your scene" className="mt-4">
					{/* Scene name input */}
					<input value={sceneForm.name} onChange={e => setSceneForm({ ...sceneForm, name: e.target.value })} placeholder="Scene Name" maxLength={24} type="text" className="px-2 w-full border-[1.2px] rounded outline-none focus:border-primary" />
					{/* Description input */}
					<textarea
						value={sceneForm.description}
						onChange={e => setSceneForm({ ...sceneForm, description: e.target.value })}
						name=""
						id="description"
						placeholder="Add a description"
						maxLength={100}
						cols={30}
						rows={10}
						className="p-2 mt-8 border-[1.2px] w-full h-20 resize-none rounded outline-none focus:border-primary"></textarea>
				</div>
				{/* --Modal Footer Btns-- */}
				<div className="mt-6 pt-2 flex gap-4 justify-end">
					{/* --Create Scene Btn-- */}
					<button type="submit" value="submit" aria-label="add new project" className="px-4 p-3 text-white bg-primary rounded-lg hover:text-white hover:bg-gray-700">
						Create Scene
					</button>
					{/* --Close Btn-- */}
					<button type="button" onClick={() => closeModal()} aria-label="close create scene modal" className="p-3 px-4 bg-gray-500 text-white rounded-lg  hover:bg-red-400">
						Close
					</button>
				</div>
			</div>
		</form>
	);
}

export default CreateSceneModal;
