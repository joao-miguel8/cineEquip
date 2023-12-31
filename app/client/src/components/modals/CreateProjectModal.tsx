import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";
import { useProjectStore } from "../../zustand-store/projectStore";
import { createNewProject } from "../../api/services/project-services/createNewProject";

const CreateProjectModal = ({ closeModal }: { closeModal: () => void }) => {
	const [titleInput, setTitleInput] = useState<string>("");

	// client state store
	const addNewProject = useProjectStore(state => state.addNewProject);

	// create new project
	const handleCreateNewProject = async () => {
		try {
			// send newly created project to server
			const AddProjectToServer = await createNewProject({ title: titleInput.trim() });

			// server response object returned and add to client state
			addNewProject(AddProjectToServer);
		} catch (err) {
			console.log(err);
			throw err;
		}
	};

	// remove body scroll when modal opens
	useDisableBodyScroll();

	return (
		// --Main Container--
		<form className=" z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center" onSubmit={handleCreateNewProject} onClick={() => closeModal()}>
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="pb-2 px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[28rem] text-left bg-white rounded shadow-lg">
				<div className="flex justify-between items-start pb-3">
					{/* --Modal Title-- */}
					<h4 id="modal-title" className="text-18 font-bold">
						Create a title for your project
					</h4>
					{/* --Close Btn-- */}
					<button aria-label="close create a new project modal" onClick={() => closeModal()}>
						<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
					</button>
				</div>
				{/* --Modal Body-- */}
				<input
					aria-label="add a name to create your new project"
					value={titleInput}
					onChange={e => setTitleInput(e.target.value)}
					name="projectName"
					type="text"
					required
					maxLength={24}
					minLength={6}
					className="mt-4 px-2 py-2 w-full border-[1.2px] rounded outline-none focus:border-primary"
				/>
				{/* --Modal Footer Btns-- */}
				<div className="mt-6 pt-2 flex gap-4 justify-end">
					{/* --Create Project Btn-- */}
					<button aria-label="add new project" type="submit" className="px-4 p-3 text-white bg-primary rounded-lg hover:text-white hover:bg-gray-700">
						Create Project
					</button>
					{/* --Close Btn-- */}
					<button onClick={closeModal} aria-label="close add new project modal" className="p-3 px-4 bg-gray-500 text-white rounded-lg  hover:bg-red-400">
						Close
					</button>
				</div>
			</div>
		</form>
	);
};

export default CreateProjectModal;
