import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = ({ route }: { route: string }) => {
	return (
		// <div className="p-4 mb-4 w-full flex justify-end items-center"></div>
		<header className={`mt-4 px-6 sticky top-0 w-full h-[48px] flex items-center justify-between bg-[#F6F6F6]`}>
			<Link to={route} className="flex items-center gap-2">
				<IoChevronBackOutline size={"1.8rem"} />
			</Link>
			<Link to={"/"}>CineEquip</Link>
			<button className="bg-red-400 rounded-full">
				<img src="#" alt="profile" className="w-10 h-10" />
			</button>
		</header>
	);
};

export default Header;
