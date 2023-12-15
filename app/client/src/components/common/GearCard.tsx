function GearCard() {
	return (
		<button className="shadow-md w-fit rounded-sm overflow-clip bg-white hover:bg-accent duration-300">
			<img src="#" alt="image of gear" className="border-gray-200 border-b h-40" />
			<div className="px-4 py-2 flex flex-col items-start">
				<h3 aria-aria-label="gear name">Gear Name</h3>
				<span aria-label="Gear Status" className="text-14 text-red-400">
					Damaged
				</span>
				<div className="mt-2 flex flex-col items-start">
					<h4 className="text-14 font-bold">Serial Number:</h4>
					<span>adawdami3#2f1er4%</span>
				</div>
			</div>
		</button>
	);
}

export default GearCard;
