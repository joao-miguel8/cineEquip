import { FaFolder } from "react-icons/fa";
import "../../App.css";
import classNames from "classnames";
import { IoIosCloseCircle } from "react-icons/io";
import DeleteProjectModal from "../delete-project-modal/DeleteProjectModal";
import useToggle from "../../hooks/useToggle";

function ProjectCard({ index, title, isSelectModeActive, setIsSelectModeActive }: { index: number; title: string; isSelectModeActive: boolean; setIsSelectModeActive: (setSelectMode: boolean) => void }) {
	const deleteModalToggle = useToggle();

	const { isToggled, isOff, isOn, dispatch } = deleteModalToggle;

	return (
		<>
			<div className={classNames("flex hover:bg-accent duration-300 ease-in-out rounded-md h-20 p-2", isSelectModeActive ? "border-2 border-primary" : null)}>
				<div className={classNames("flex gap-2 flex-col items-center justify-center w-[6rem]")}>
					<FaFolder color={"#4F48E2"} size={"1.8rem"} />
					<h2 className="truncate-3">{title ? title : "title no"}</h2>
				</div>
				{isSelectModeActive && <IoIosCloseCircle size={"1.8rem"} onClick={() => dispatch("IS_ON")} className={"hover:text-red-500"} />}
			</div>
			{deleteModalToggle.isOn && <DeleteProjectModal index={index} toggleDispatch={dispatch} title={title} handleIsSelectModeActive={setIsSelectModeActive} />}
		</>
	);
}

export default ProjectCard;
