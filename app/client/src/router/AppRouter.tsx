import type { RouterType } from "./RouterType";
import { pagesData } from "./viewsRoutes";
import { Route, Routes } from "react-router-dom";

export function AppRouter() {
	const pageRouting = pagesData.map(({ path, element }: RouterType) => <Route path={`/${path}`} element={element} />);
	return <Routes>{pageRouting}</Routes>;
}

export default AppRouter;
