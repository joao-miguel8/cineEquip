function Modal({ isOpen, children, modalType, styling = "" }: { isOpen: boolean; children: any; modalType: string; styling?: string }) {
	return (
		isOpen && (
			<div className={styling} data-modal-type={modalType}>
				{children}
			</div>
		)
	);
}

export default Modal;
