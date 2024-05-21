import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
	useLocation,
} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CanvasHome from "./components/CanvasHome";
import GalleryHome from "./components/GalleryHome";
import GalleryView from "./components/GalleryView/GalleryView";
import AllArtView from "./components/AllArtView.jsx";

function Layout() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const [name, setName] = useState("");
	const location = useLocation();

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	useEffect(() => {
		if (location.pathname === "/") setName("HOME");
		else setName(location.pathname.slice(1).toUpperCase());
	}, [location]);

	return (
		<div id="Layout">
			<Navigation isLoaded={isLoaded} />
			<div>
				<h1>CANVAS COLLECTIVE | {name}</h1>
				{isLoaded && <Outlet />}
			</div>
		</div>
	);
}

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <CanvasHome />,
			},
			{
				path: "/arts",
				element: <AllArtView />,
			},
			{
				path: "/arts/:id",
				element: <CanvasHome />,
			},
			{
				path: "/galleries",
				element: <GalleryHome />,
			},
			{
				path: "/galleries/:id",
				element: <GalleryView />,
			},
		],
	},
	{
		path: "*",
		element: <Navigate to="/" replace={true} />,
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
