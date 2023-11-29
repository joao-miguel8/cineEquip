import Header from "../components/common/header/Header";
import SearchBar from "../components/common/searchbar/Searchbar";
import { FaFolder } from "react-icons/fa";
function SelectedProjectPage() {
	return (
		<section>
			<Header />
			<div className="mt-14 mx-4 flex flex-col">
				<SearchBar placeholder="Search Project" />
			</div>
			<div className="mx-auto mt-8 flex justify-center w-4/6 w items-center gap-2 border-b border-gray-200">
				<button className="inline flex-1 ">
					<h2 className="text-20 text-center ">Scenes</h2>
				</button>
				<button className="inline flex-1 border-b-2 border-primary">
					<h2 className="font-bold text-20 text-center text-primary">Kits</h2>
				</button>
				<button className="inline flex-1">
					<h2 className="text-20 text-center ">Gear</h2>
				</button>
			</div>
			<div className="mt-10 flex gap-4 items-center justify-center">
				<FaFolder color={"#4F48E2"} size={"1.8rem"} />
				<h3 className="text-18">The Tale of Paper Salesman</h3>
			</div>
		</section>
	);
}

export default SelectedProjectPage;
