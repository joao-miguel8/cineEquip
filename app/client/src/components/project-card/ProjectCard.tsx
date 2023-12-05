import { FaFolder } from "react-icons/fa";
import "../../App.css";
import classNames from "classnames";
import { IoIosCloseCircle } from "react-icons/io";
import DeleteProjectModal from "../delete-project-modal/DeleteProjectModal";
import useToggle from "../../hooks/useToggle/useToggle";
import { Link } from "react-router-dom";
import { UseToggleType } from "../../hooks/useToggle/type";

function ProjectCard({ index, projectData, isSelectModeActive, setIsSelectModeActive }: { index: number; isSelectModeActive: boolean; setIsSelectModeActive: (setSelectMode: boolean) => void }) {
	const deleteModalToggle = useToggle();
	const { isToggled, isOff, isOn, dispatch }: UseToggleType = deleteModalToggle;
	// border-b-[0.5px]
	return (
		<div className="w-full md:w-60 bg-gray-800 group relative min-[768px]:border border-accent min-[1024px] border-b hover:bg-accent duration-300">
			{isSelectModeActive && (
				// delete button with card overlay
				<div onClick={() => dispatch("IS_ON")} className="pt-1 px-2 z-20 absolute w-full h-full duration-300">
					<div className="flex justify-end w-full">
						<IoIosCloseCircle size={"1.8rem"} className={"text-accent group-hover:text-red-500"} />
					</div>
				</div>
			)}
			{/* regular card with route */}
			<Link to={`/projects/${projectData?._id}`}>
				<div className={classNames("mt-4 p-2 flex ease-in-out min-[1024px]:justify-center", isSelectModeActive ? "border-neutral-400" : null)}>
					<div className={classNames("z-10 flex lg:flex-col gap-4 items-center truncate")}>
						<div className="text-40">
							<FaFolder color={"#4F48E2"} style={{ fontSize: "100%" }} />
						</div>
						<h2 className="text-18 text-white group-hover:text-textDark ">{projectData?.title}</h2>
					</div>
				</div>
			</Link>
			{deleteModalToggle.isOn && <DeleteProjectModal index={index} toggleDispatch={dispatch} title={projectData?.title} handleIsSelectModeActive={setIsSelectModeActive} />}
		</div>
	);
}

export default ProjectCard;
