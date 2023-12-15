function GearCard() {
	return (
		<>
			<div className="shadow-md w-fit rounded-sm overflow-clip bg-white">
				<img src="#" alt="image of gear" className="border-gray-200 border-b h-40" />
				<div className="px-4 py-2 flex flex-col">
					<h3 aria-aria-label="gear name">Gear Name</h3>
					<span aria-label="Gear Status" className="text-14 text-red-400">
						Damaged
					</span>
					<div className="mt-2">
						<h4 className="text-14 font-bold">Serial Number:</h4>
						<span>adawdami3#2f1er4%</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default GearCard;
