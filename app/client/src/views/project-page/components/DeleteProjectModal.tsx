import classNames from "classnames";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useProjectStore } from "../../../zustand-store/projectStore";
import { deleteChosenProject } from "../../../api/services/project-services/deleteChosenProject";
import { useMutation } from "react-query";

function DeleteProjectModal({ index, title, toggleDispatch, handleIsSelectModeActive }: { index: number; title: string; toggleDispatch: (action: string) => void; handleIsSelectModeActive: (selectModeActive: boolean) => void }) {
	const [deleteTitleInput, setDeleteTitleInput] = useState<string>("");

	// zustand store
	const deleteProject = useProjectStore(state => state.deleteSelectedProject);
	const projectsList = useProjectStore(state => state.projects);

	// remove project from server/db with react-query
	const removeProject = useMutation(deleteChosenProject);

	const handleDeleteProject = () => {
		// delete project if input matches project title,
		const projectToDelete = projectsList.find(proj => proj.title === deleteTitleInput);
		if (projectToDelete) {
			const projectId = projectToDelete._id;
			// delete from DB with react-query mutate
			removeProject.mutate(projectId);
			// delete from Zustand client state Store
			deleteProject(projectId);
		}
	};

	return (
		<div onClick={() => toggleDispatch("IS_OFF")} className="z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center">
			{/* <!--Modal Overlay Window--> */}
			<div className="pointer-events-none absolute z-40 w-full h-full bg-gray-900 opacity-50"></div>
			{/* --Modal Container-- */}
			{/* stopPropagation added to stop overlay from toggling if user clicks on modal container */}
			<div onClick={e => e.stopPropagation()} role="dialog" aria-labelledby="modal-title" className="px-6 py-4 z-50 overflow-y-auto mx-auto w-11/12 md:max-w-[28rem] text-left bg-white rounded shadow-lg">
				{/* --Close Btn-- */}
				<button onClick={() => toggleDispatch("IS_OFF")} className="w-full flex justify-end">
					<IoMdClose size={"1.7rem"} className={"hover:text-primary duration-150"} />
				</button>
				{/* --Modal Title-- */}
				<h4 id="modal-title" className="w-full text-center text-20 font-bold ">
					Delete Your Project
				</h4>
				{/* --Modal Body-- */}
				<div aria-label={`type ${title} to delete your project`} className="text-center mt-2">
					<div className="my-2">
						<p className="font-bold text-16 italic">Type the project name to delete</p>
						<p className="mt-2">
							<span className="italic text-16 inline-block mr-2 ">Project Name:</span>
							{title.split("").map((ltr: string, i: number) => {
								return (
									<span key={i} className={classNames("italic text-16 font-bold ", ltr === deleteTitleInput[i] ? "text-gray-800" : "text-gray-400")}>
										{ltr}
									</span>
								);
							})}
						</p>
					</div>
					<input value={deleteTitleInput} onChange={e => setDeleteTitleInput(e.target.value)} type="text" className="px-2 py-2 w-full border-[1.2px] rounded outline-none focus:border-red-400" />
				</div>
				{/* --delete Project Btn-- */}
				<div aria-label="delete your project button" className="flex w-full justify-end">
					<button
						onClick={() => {
							handleDeleteProject();
							handleIsSelectModeActive(false);
							toggleDispatch("IS_OFF");
						}}
						className="mt-4 p-2 text-white bg-[#F25554] rounded-lg font-medium hover:text-white hover:bg-red-600">
						Delete Project
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteProjectModal;
