import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
} from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import CanvasHome from "./components/CanvasHome";
import GalleryHome from "./components/GalleryHome";
import GalleryView from "./components/GalleryView";
import AllArtView from "./components/AllArtView";
import CanvasView from "./components/CanvasView";
import DataUrlConverter from "./components/DataUrlConverter";

function Layout() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	return (
		<main className="-z-10 flex flex-col min-h-svh max-h-svh ">
			<Navigation isLoaded={isLoaded} />
			{isLoaded && <Outlet />}
		</main>
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
			{
				path: "/converter",
				element: <DataUrlConverter />,
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
