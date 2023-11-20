import type { CalenderType } from "../types/CalenderEventType";
// event, title, start, end;
function CalendarEvent({ event }: CalenderType) {
	const startDate = event.start?.toString().split("GMT")[0];
	const endDate = event.end?.toString().split("GMT")[0];
	console.log(event);
	return (
		<div className="text-textDark flex flex-col ">
			<p className="text-[10px] font-bold">{event?.data?.projectTitle || "No Project Title"}</p>
			<h3 className="text-[10px] italic">{event?.title || " No Scene Title"}</h3>
			<p className="text-[11px] italic">
				<span>{startDate}</span>
				<span>{endDate}</span>
			</p>
		</div>
	);
}

export default CalendarEvent;
