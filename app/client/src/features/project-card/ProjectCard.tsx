import { FaFolder } from "react-icons/fa";
import "../../App.css";

function ProjectCard({ title }: { title: string }) {
	return (
		<div className="flex gap-2 flex-col items-center justify-center w-40 h-20">
			<FaFolder color={"#4F48E2"} size={"1.4rem"} />
			<h2 className="truncate-3">{title}</h2>
		</div>
	);
}

export default ProjectCard;
