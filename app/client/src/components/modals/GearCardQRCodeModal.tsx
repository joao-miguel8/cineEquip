import { IoMdClose } from "react-icons/io";
import useDisableBodyScroll from "../../hooks/useDisableBodyScroll";

function GearCardQRCodeModal({ QRCode, modalClose }: { QRCode: string | undefined; modalClose: () => void }) {
	// Disable body scroll
	useDisableBodyScroll();

	return (
		<>
			<div onClick={() => modalClose()} className="fixed left-0 top-0 w-full h-full backdrop-blur-sm"></div>
			<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 md:h-fit md:w-[300px] shadow-md bg-white rounded-lg">
				<button
					onClick={e => {
						e.preventDefault();
						modalClose();
					}}
					className="pr-2 mt-2 w-full flex justify-end items-center">
					<IoMdClose size={"2.4rem"} className={"hover:text-primary duration-150"} />
				</button>
				{/* QR code title text div */}
				<div className="h-full flex justify-center items-center">
					<div style={{ backgroundImage: `url(${QRCode})` }} className={`w-60 h-60 bg-cover`}></div>
				</div>
			</div>
		</>
	);
}

export default GearCardQRCodeModal;
