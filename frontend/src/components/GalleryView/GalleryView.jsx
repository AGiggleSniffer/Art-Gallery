import { useParams } from "react-router-dom";

export default function GalleryView() {
    const { id } = useParams();
    
	return (
		<>
			<h1>Hello: {id}</h1>
		</>
	);
}
