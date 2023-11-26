type StringOrDate = string | Date;

type AdditionalEventData = {
	id: number;
	projectTitle: string;
};

export type CalenderType = {
	event: any;
	title: string;
	start: StringOrDate;
	end: StringOrDate;
	data: AdditionalEventData;
};
