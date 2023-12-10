import CalenderPage from "../views/calender-page/CalenderPage";
import FavoritesPage from "../views/favorites-page/FavoritesPage";
import GearsPage from "../views/gears-page/GearsPage";
import GoogleSignInPage from "../views/google-sign-in-page/GoogleSignInPage";
import Home from "../views/home/Home";
import KitsPage from "../views/kits-page/KitsPage";
import ProjectsPage from "../views/project-page/ProjectsPage";
import SelectedProjectPage from "../views/selected-project-page/SelectedProjectPage";
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
