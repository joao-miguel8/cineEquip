import CollectionCard from "../components/CollectionCard";
import projectCollection from "../assets/projectCollection.svg";
import kitsCollection from "../assets/kitsCollection.svg";
import gearCollection from "../assets/gearCollection.svg";
import favoritesCollection from "../assets/favoritesCollection.svg";
import calenderCollection from "../assets/calenderCollection.svg";
import { Link } from "react-router-dom";

function Home() {
	const collectionCardData = [
		{ img: projectCollection, title: "Projects", quantity: 3, link: "/projects" },
		{ img: kitsCollection, title: "Kits", quantity: 1, link: "/Kits" },
		{ img: gearCollection, title: "Gear", quantity: 1, link: "/Gear" },
		{ img: favoritesCollection, title: "Favorites", quantity: 0, link: "/Favorites" },
		{ img: calenderCollection, title: "Calender", quantity: 3, link: "/calender" },
	];

	return (
		<section>
			<div className="h-80 bg-primary">
				<header className="px-6 h-16 flex justify-between items-center bg-primary">
					<a href="#" aria-label="home page" className="text-16 font-extrabold">
						CineEquip
					</a>
					<button className="rounded-full overflow-hidden">
						<img src="" alt="Prof." className="w-10 h-10 bg-yellow-200" />
					</button>
				</header>

				<p className="mt-8 px-6 md:px-20 md:mt-8 font-bold text-24">
					We Save you time with the stress of organizing, Choose a<span className="mx-2 px-2 bg-yellow-200 ">Collection Card.</span>
				</p>
			</div>
			<div className="relative -top-14 px-4 flex gap-12 justify-center flex-wrap ">
				{collectionCardData.map((collection, index) => {
					return (
						<Link key={index} to={collection.link}>
							<CollectionCard cardInfo={collection} />
						</Link>
					);
				})}
			</div>
		</section>
	);
}

export default Home;
