export enum GearStatuses {
	isAvailable = "isAvailable",
	isInUse = "isInUse",
	isDamaged = "isDamaged",
}

export type GearType = {
	_id?: string;
	QRCode?: string;
	serialNumber?: string;
	name: string;
	img?: File | null;
	status: GearStatuses;
	manufacturer?: string;
	model?: string;
	description?: string;
	cost?: number | string;
	purchaseDate?: string;
	filters?: string[];
};
