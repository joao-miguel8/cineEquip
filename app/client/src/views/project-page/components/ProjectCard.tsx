import { Link } from "react-router-dom";
import { FaFolder } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import classNames from "classnames";
import DeleteProjectModal from "./DeleteProjectModal";
import "../../../App.css";
import useToggle from "../../../hooks/useToggle/useToggle";
import type { UseToggleType } from "../../../hooks/useToggle/type";

function ProjectCard({ index, projectData, isSelectModeActive, setIsSelectModeActive }: { index: number; isSelectModeActive: boolean; setIsSelectModeActive: (setSelectMode: boolean) => void }) {
	const deleteModalToggle = useToggle();
	const { isToggled, isOff, isOn, dispatch }: UseToggleType = deleteModalToggle;

	return (
		<div className="px-2 p-2 w-full items-center group relative hover:bg-accent bg-white duration-300 rounded-md shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			{isSelectModeActive && (
				// delete button with card overlay
				<div onClick={() => dispatch("IS_ON")} className="pt-1 px-4 z-20 absolute w-full h-full duration-300">
					<div className="flex justify-end w-full">
						<IoIosCloseCircle size={"1.8rem"} className={"text-black group-hover:text-red-500"} />
					</div>
				</div>
			)}
			{/* regular card with route */}
			<Link to={`/projects/${projectData?._id}`}>
				<div className={classNames("w-full flex justify-start ease-in-out", isSelectModeActive ? "border-primary" : null)}>
					<div className={classNames("z-10 flex gap-2 items-center truncate")}>
						<div className="mt-2 w-full">
							<div className="flex items-center gap-2 text-20">
								<FaFolder color={"#4F48E2"} style={{ fontSize: "100%" }} />
								<h2 className="w-40 font-bold text-16 text-textDark group-hover:text-textDark">{projectData?.title}</h2>
							</div>
							{<p className={classNames(`mt-2 italic font-light text-neutral-400 group-hover:text-black`, projectData.scenes.length < 1 && "invisible")}>#{projectData.scenes.length} scenes</p>}
						</div>
					</div>
				</div>
			</Link>
			{deleteModalToggle.isOn && <DeleteProjectModal index={index} toggleDispatch={dispatch} title={projectData?.title} handleIsSelectModeActive={setIsSelectModeActive} />}
		</div>
	);
}

export default ProjectCard;
