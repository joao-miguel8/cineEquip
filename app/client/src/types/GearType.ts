export enum GearStatuses {
	isAvailable = "isAvailable",
	isInUse = "isInUse",
	isDamaged = "isDamaged",
}

export type GearType = {
	QRCode?: string;
	serialNumber?: string;
	name: string;
	img: String;
	status: GearStatuses;
	manufacturer?: string;
	model?: string;
	description?: string;
	cost?: number;
	purchaseDate?: Date;
	filters?: string[];
};
