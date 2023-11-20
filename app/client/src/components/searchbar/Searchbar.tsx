import { CiSearch } from "react-icons/ci";

function SearchBar({ placeholder }: { placeholder: string }) {
	return (
		<div aria-label="search for something" className="flex items-center gap-2 w-full sm:w-80 sm:mx-auto pl-4 p-2 text-14 border bg-[#FCFCFC] rounded-full focus-within:border-primary ">
			<CiSearch size={"1.2rem"} />
			<input type="text" placeholder={placeholder} className="w-full outline-none" />
		</div>
	);
}

export default SearchBar;
