import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
	const navigate = useNavigate();
	const handleGoBackBtn = () => navigate(-1);

	return (
		<header className={`mb-10 pt-4 px-2 sticky top-0 w-full h-[48px] flex items-center justify-between bg-[#F6F6F6]`}>
			<button onClick={handleGoBackBtn} className="flex items-center gap-2">
				<IoChevronBackOutline size={"1.8rem"} />
			</button>
			<Link to={"/"}>CineEquip</Link>
			<button className="bg-red-400 rounded-full">
				<img src="#" alt="profile" className="w-10 h-10" />
			</button>
		</header>
	);
};

export default Header;
