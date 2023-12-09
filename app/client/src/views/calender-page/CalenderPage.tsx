// import Calender from "../components/Calender";
import Calendar from "../../components/calendar/components/Calendar";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function CalenderPage() {
	return (
		<section className="">
			<Link to={"/"}>
				<IoChevronBackOutline size={"1.5rem"} className={"ml-4 md:ml-10 mt-6"} />
			</Link>
			<div style={{ height: "95vh", padding: "14px" }}>
				<Calendar />
			</div>
		</section>
	);
}

export default CalenderPage;
