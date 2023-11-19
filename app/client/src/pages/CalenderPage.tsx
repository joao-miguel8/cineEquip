// import Calender from "../components/Calender";
import Calendar from "../features/calendar/components/Calendar";
import { Link } from "react-router-dom";

function CalenderPage() {
	return (
		<section className="">
			<Link to={"/"}>Back Button</Link>
			<div style={{ height: "95vh", padding: "14px" }}>
				<Calendar />
			</div>
		</section>
	);
}

export default CalenderPage;
