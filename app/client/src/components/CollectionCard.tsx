function CollectionCard({ cardInfo }) {
	const { img, title, quanity } = cardInfo;
	return (
		<div className="px-4 p-2 w-60 rounded-md overflow-hidden  shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] bg-white hover:bg-yellow-200 transition duration-500 cursor-pointer">
			<img src={img} alt={title} className="w-full h-60" />
			<h3 className="text-16 font-bold text-center text-textDark">{title}</h3>
			{quanity <= 0 ? null : (
				<p className="italic text-12 text-center justify-center flex gap-1  text-[#636363]">
					{title}
					<span>{quanity}</span>
				</p>
			)}
		</div>
	);
}

export default CollectionCard;
