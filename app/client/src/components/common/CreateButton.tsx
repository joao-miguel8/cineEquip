import { IoAdd } from "react-icons/io5";

function CreateButton({ buttonName, openModal }: { buttonName: string; openModal: () => void }) {
	return (
		<div
			onClick={() => {
				openModal();
			}}
			aria-label={buttonName}
			className="py-2 flex justify-center">
			<button className={"p-2 flex gap-2 justify-center items-center text-gray-900 hover:bg-gray-100 font-medium rounded-lg text-sm bg-primary dark:text-white  dark:hover:bg-gray-700 duration-150"}>
				<IoAdd size={"1.4rem"} />
				<span>{buttonName}</span>
			</button>
		</div>
	);
}

export default CreateButton;
