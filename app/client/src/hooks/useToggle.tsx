import { useReducer } from "react";

// Hook Description:
/*
- This hook allows for toggling between on and off states. It uses the useReducer hook to manage a state object representing;
- Three toggle states: isToggled, isOn, and isOff.
The Reducer actions:
-  "TOGGLE" for toggling between states,
-  "IS_ON" to set the state to "on,"
-  "IS_OFF" to set the state to "off."
- hook returns the current state along with a dispatch function to trigger state transitions.
*/

type ToggleStateType = {
	isToggled: boolean;
	isOn: boolean;
	isOff: boolean;
};

const toggleStates: ToggleStateType = {
	isToggled: false,
	isOn: false,
	isOff: true,
};

const actionTypes = {
	TOGGLE: "TOGGLE",
	IS_ON: "TURN_ON",
	IS_OFF: "TURN_OFF",
};

const reducer = (state: ToggleStateType, action: keyof typeof actionTypes): ToggleStateType => {
	switch (action) {
		case "TOGGLE":
			return {
				...state,
				isToggled: !state.isToggled,
			};
		case "IS_ON":
			return {
				...state,
				isOn: true,
				isOff: false,
			};
		case "IS_OFF":
			return {
				...state,
				isOn: false,
				isOff: true,
			};
		default:
			return state;
	}
};

function useToggle() {
	const [state, dispatch] = useReducer(reducer, toggleStates);

	return { ...state, dispatch };
}

export default useToggle;
