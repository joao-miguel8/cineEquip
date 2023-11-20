import { useEffect } from "react";

// Hook Description:
/*
- This hook is used to prevent body scrolling when a component mounts, An example would be modal overlays. When enabled, it sets the body's overflow style to "hidden," allowing the page to remain fixed.
- Then the cleanup function, when the component unmounts, it switches overflow style to "auto," allowing normal scrolling.
*/

function useDisableBodyScroll() {
	return useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "auto";
		};
	}, []);
}

export default useDisableBodyScroll;
