import { Calendar as BigCalendar, CalendarProps, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { useCallback, useState } from "react";

import "../css/calenderStyle.css";
import CalendarEvent from "../components/CalendarEvent";

// import { CalenderType } from "../types/CalenderEventType";

// Give drag and drop functionality to our calender
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

// Formatting dates with dayjs lib
const localizer = dayjsLocalizer(dayjs);

// Mock calender events data
const events = [
	{
		start: dayjs("2023-11-17T13:14:22.17Z").toDate(),
		end: dayjs("2023-11-17T15:14:22.17Z").toDate(),
		title: "Scene 02 Bob meets Burger",
		data: {
			id: 229,
			projectTitle: "",
		},
	},
	{
		start: dayjs("2023-11-17T15:00:00.17Z").toDate(),
		end: dayjs("2023-11-17T15:45:45.17Z").toDate(),
		title: "Scene 03 Burger makes a burger for Bob",
		data: {
			id: 342,
			projectTitle: "Project41",
		},
	},
	{
		start: dayjs("2023-11-12T04:45:00.17Z").toDate(),
		end: dayjs("2023-11-12T05:45:00.17Z").toDate(),
		title: "Scene 04 test",
		data: {
			id: 413,
			projectTitle: "Proj1",
		},
	},
	{
		start: dayjs("2023-11-16T17:45:00.17Z").toDate(),
		end: dayjs("2023-11-16T16:00:00.17Z").toDate(),
		title: "Scene 05 test",
		data: {
			id: 122,
			projectTitle: "Project32",
		},
	},
];

export default function Calendar(props: Omit<CalendarProps, "localizer">) {
	const [eventsList, setEventsList] = useState(events);

	// function allows events to be draggable and resizable
	const onChangeEventTime = useCallback(
		({ event, start, end }) => {
			setEventsList(prevEvents => prevEvents.map(prevEvent => (prevEvent.data.id === event.data.id ? { ...prevEvent, start, end } : prevEvent)));
		},
		[setEventsList]
	);

	// calendarEvents allows us to access the data within each event
	const calendarEvents = {
		event: ({ event }) => <CalendarEvent event={event} />,
	};
	return <DragAndDropCalendar components={calendarEvents} events={eventsList} {...props} localizer={localizer} onEventDrop={onChangeEventTime} onEventResize={onChangeEventTime} timeslots={4} step={15} />;
}
