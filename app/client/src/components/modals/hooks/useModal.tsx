import { useEffect, useState } from "react";

// Hook Summary:
/*
- The useModal works together with the custom Modal component.

USAGE:
- Pass an array of modal names to the useModal hook to initialize the modal state.
- Each modal is assigned a boolean value, indicating whether it is currently open or closed.

FUNCTIONS:
openModal(modalName: string):
- Set the boolean value of the specified modal to true, displaying the modal.
closeModal(modalName: string):
 Set the boolean value of the specified modal to false, hiding the modal.

Example:
	const modals = useModal(["modalOne"]);

   - Button to trigger the modal-
   <button onClick={() => modals.openModal("modalOne")} className="btn-primary">
					Create Gear
				</button>

            With the Modal component:
<Modal isOpen={modals.modals.modalOne} modalType={"modalOne"}>
				<CreateGearModal modalClose={() => modals.closeModal("modalOne")} />
			</Modal>
*/

type ModalType = {
	[key: string]: boolean;
};

export function useModal(modalNames: string[] = []) {
	const initModal: ModalType = {};

	// check modalNames array to see if another name is added if so add it to initModal object
	useEffect(() => {
		for (const name of modalNames) {
			{
				initModal[name] = false;
			}
		}
	}, [modalNames]);

	const [modals, setModals] = useState(initModal);

	// change boolean value to false to show modal
	const openModal = (modalName: keyof ModalType) => {
		setModals(prevModals => ({ ...prevModals, [modalName]: true }));
	};

	// change boolean value to false to unshow modal
	const closeModal = (modalName: keyof ModalType) => {
		setModals(prevModals => ({ ...prevModals, [modalName]: false }));
	};

	return { modals, openModal, closeModal };
}

export default useModal;
