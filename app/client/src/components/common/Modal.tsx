function Modal({ isOpen, children, modalType }: { isOpen: boolean; children: any; modalType: string }) {
	return isOpen && <div data-modal-type={modalType}>{children}</div>;
}

export default Modal;
