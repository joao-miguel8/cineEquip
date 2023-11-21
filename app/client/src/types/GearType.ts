const enum GearStatuses {
	isAvailable = "isAvailable",
	isInUse = "isInUse",
	isDamaged = "isDamaged",
}

export type GearType = {
	id: number;
	QRCode: string;
	serialNumber: string;
	name: string;
	status: GearStatuses;
	manufacturer?: string;
	model?: string;
	description?: string;
	cost?: number;
	purchaseDate?: Date;
	filters?: string[];
};
