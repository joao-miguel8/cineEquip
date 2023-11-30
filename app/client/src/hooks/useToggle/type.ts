export type UseToggleType = {
	dispatch: React.Dispatch<"TOGGLE" | "IS_ON" | "IS_OFF">;
	isToggled: boolean;
	isOn: boolean;
	isOff: boolean;
};
