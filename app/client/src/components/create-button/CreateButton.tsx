import { IoAdd } from "react-icons/io5";
import type { UseToggleType } from "../../hooks/useToggle/type";

function CreateButton({ buttonName, toggleModal: { dispatch }, actionType }: { buttonName: string; toggleModal: UseToggleType; actionType: string }) {
	return (
		<div
			onClick={() => {
				dispatch(actionType as "TOGGLE" | "IS_ON" | "IS_OFF");
			}}
			aria-label={buttonName}
			className="py-2 fixed bottom-0 flex justify-center w-full">
			<button className={"mb-2 px-5 py-2.5 min-[350px]:w-80 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150"}>
				<IoAdd size={"1.4rem"} />
				<span>{buttonName}</span>
			</button>
		</div>
	);
}

export default CreateButton;
