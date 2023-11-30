import { FaFolder } from "react-icons/fa";
import "../../App.css";
import classNames from "classnames";
import { IoIosCloseCircle } from "react-icons/io";
import DeleteProjectModal from "../delete-project-modal/DeleteProjectModal";
import useToggle from "../../hooks/useToggle";
import { Link } from "react-router-dom";

function ProjectCard({ index, projectData, isSelectModeActive, setIsSelectModeActive }: { index: number; isSelectModeActive: boolean; setIsSelectModeActive: (setSelectMode: boolean) => void }) {
	const deleteModalToggle = useToggle();
	const { isToggled, isOff, isOn, dispatch } = deleteModalToggle;
	return (
		<div className="relative">
			{isSelectModeActive && <IoIosCloseCircle size={"1.8rem"} onClick={() => dispatch("IS_ON")} className={"absolute right-1 top-1 hover:text-red-500"} />}
			<Link to={`/projects/${projectData?._id}`}>
				<div className={classNames("text-center flex hover:bg-accent duration-300 ease-in-out rounded-md h-20 p-2", isSelectModeActive ? "border-2 border-primary" : null)}>
					<div className={classNames("flex gap-2 flex-col items-center justify-center w-[6rem]")}>
						<FaFolder color={"#4F48E2"} size={"1.8rem"} />
						<h2 className="truncate-3">{projectData?.title ? projectData.title : "title no"}</h2>
					</div>
				</div>
			</Link>
			{deleteModalToggle.isOn && <DeleteProjectModal index={index} toggleDispatch={dispatch} title={projectData?.title} handleIsSelectModeActive={setIsSelectModeActive} />}
		</div>
	);
}

export default ProjectCard;
