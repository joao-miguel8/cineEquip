function Modal({ isOpen, children }) {
	return isOpen && { ...children };
}

export default Modal;
