import CalenderPage from "../pages/CalenderPage";
import FavoritesPage from "../pages/FavoritesPage";
import GearsPage from "../pages/GearsPage";
import GoogleSignInPage from "../pages/GoogleSignInPage";
import Home from "../pages/Home";
import KitsPage from "../pages/KitsPage";
import ProjectsPage from "../pages/ProjectsPage";
import type { RouterType } from "./RouterType";

export const pagesData: RouterType[] = [
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/projects",
		element: <ProjectsPage />,
	},
	{
		path: "/kits",
		element: <KitsPage />,
	},
	{
		path: "/gear",
		element: <GearsPage />,
	},
	{
		path: "/favorites",
		element: <FavoritesPage />,
	},
	{
		path: "/calender",
		element: <CalenderPage />,
	},
	{
		path: "/GoogleSignIn",
		element: <GoogleSignInPage />,
	},
];
