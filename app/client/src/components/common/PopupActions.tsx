import { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

type PopupActionsType = {
	label: string;
	onClick: () => void;
};

function PopUpActions({ actions, buttonStyling, buttonContainerStyling, wrapperStyling, iconOnClick }: { actions: PopupActionsType[]; buttonStyling?: string; buttonContainerStyling?: string; wrapperStyling?: string; iconOnClick: () => void }) {
	const [isPopupActionsToggled, setIsPopupActionsToggled] = useState(false);

	const handlePopActionsToggled = () => setIsPopupActionsToggled(prevState => !prevState);

	const popupActionsStyling = {
		buttonStyling: { default: `p-2 w-full text-left hover:bg-[#F5F6F6] duration-300` },
		popActionButtonsContainer: { default: `mx-4 m-2 w-40 flex flex-col items-start bg-white rounded-md shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`, defaultPosition: `absolute right-1 top-[1.6rem] z-50` },
	};

	return (
		<div className={wrapperStyling ?? "relative w-fit"}>
			<button
				onClick={() => {
					iconOnClick();
					handlePopActionsToggled();
				}}
				className="align-middle">
				<HiOutlineDotsVertical size={"2.0rem"} />
			</button>
			{/* pop actions button container*/}
			{isPopupActionsToggled && (
				<div className={buttonContainerStyling ?? `${popupActionsStyling.popActionButtonsContainer.default} ${popupActionsStyling.popActionButtonsContainer.defaultPosition}`}>
					{actions.map((action: PopupActionsType) => {
						return (
							<button key={action.label} onClick={action.onClick} className={buttonStyling ?? `${popupActionsStyling.buttonStyling.default}`}>
								{action.label}
							</button>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default PopUpActions;
