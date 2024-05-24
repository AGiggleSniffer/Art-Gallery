import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	createBrowserRouter,
	RouterProvider,
	Outlet,
	Navigate,
	useLocation,
	useParams,
} from "react-router-dom";
import * as sessionActions from "./store/session";
import * as artActions from "./store/art";
import * as galleryActions from "./store/gallery";
import Navigation from "./components/Navigation";
import CanvasHome from "./components/CanvasHome";
import GalleryHome from "./components/GalleryHome";
import GalleryView from "./components/GalleryView";
import AllArtView from "./components/AllArtView";
import CanvasView from "./components/CanvasView";

function Layout() {
	const dispatch = useDispatch();
	const location = useLocation();
	const { id } = useParams();

	const [isLoaded, setIsLoaded] = useState(false);
	const [name, setName] = useState("");

	const myArt = useSelector(artActions.findArt(id));
	const myGallery = useSelector(galleryActions.findGallery(id));

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => {
			setIsLoaded(true);
		});
	}, [dispatch]);

	useEffect(() => {
		const pathArr = location.pathname.split("/");
		if (location.pathname === "/") return setName("HOME");
		if (pathArr[1] === "arts") {
			if (pathArr[2]) {
				return setName(myArt?.name);
			}
			return setName("ARTS");
		}
		if (pathArr[1] === "galleries") {
			if (pathArr[2]) {
				return setName(myGallery?.name);
			}
			return setName("GALLERIES");
		}
	}, [location, myArt, myGallery]);

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
				element: <CanvasView />,
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
