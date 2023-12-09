import CalenderPage from "../views/CalenderPage";
import FavoritesPage from "../views/FavoritesPage";
import GearsPage from "../views/GearsPage";
import GoogleSignInPage from "../views/GoogleSignInPage";
import Home from "../views/Home";
import KitsPage from "../views/KitsPage";
import ProjectsPage from "../views/ProjectsPage";
import SelectedProjectPage from "../views/SelectedProjectPage";
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
		path: "/projects/:id",
		element: <SelectedProjectPage />,
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
