import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadThunk } from "../../store/art";
import { useModal } from "../../context/Modal";
import "./LoadArt.css";

export default function LoadArtModal({ myArt }) {
	return (
		<>
			<h1>Select Art to Load</h1>
			{myArt?.map((art) => {
				return <img key={art.id} src={art.bitmap} />;
			})}
		</>
	);
}
