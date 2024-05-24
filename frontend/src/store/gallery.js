import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";

const LOAD = "galleries/load";
const LOAD_OWNED = "galleries/loadOwned";
const LOAD_ONE = "galleries/loadOne";

const load = (payload) => ({
	type: LOAD,
	payload,
});

const loadOwned = (payload) => ({
	type: LOAD_OWNED,
	payload,
});

const loadOne = (payload) => ({
	type: LOAD_ONE,
	payload,
});

export const getAllGalleries = () => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries`);

	const data = await response.json();
	dispatch(load(data));
	return data;
};

export const getOwnedGalleries = () => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries/owned`);

	const data = await response.json();
	dispatch(loadOwned(data));
	return data;
};

export const getOneGallery = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/galleries/${id}`);

	const data = await response.json();
	dispatch(loadOne(data));
	return data;
};

export const postGallery =
	({ artIdArray, description, name, tags }) =>
	async () => {
		const response = await csrfFetch(`/api/galleries`, {
			method: "POST",
			body: JSON.stringify({ artIdArray, description, name, tags }),
		});

		const data = await response.json();
		return data;
	};

export const editGallery =
	({ description, name, id }) =>
	async () => {
		const response = await csrfFetch(`/api/galleries/${id}`, {
			method: "PUT",
			body: JSON.stringify({ description, name }),
		});

		const data = await response.json();
		
		return data;
	};

export const deleteGallery = (id) => async () => {
	const response = await csrfFetch(`/api/galleries/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();
	return data;
};

export const deleteArtGalleries =
	({ id, artGalIdArr }) =>
	async () => {
		const response = await csrfFetch(`/api/galleries/${id}/arts`, {
			method: "DELETE",
			body: JSON.stringify({ artGalIdArr }),
		});

		const data = await response.json();

		return data;
	};

export const addArtGalleries =
	({ id, artIdArray }) =>
	async () => {
		const response = await csrfFetch(`/api/galleries/${id}/arts`, {
			method: "PUT",
			body: JSON.stringify({ artIdArray }),
		});

		const data = await response.json();
		
		return data;
	};

const initialState = { all: {}, owned: [] };

export const allGalleries = (state) => state.galleries.all;
export const ownedGalleries = (state) => state.galleries.owned;
export const findGallery = (id) => (state) => state.galleries.all[id];
export const allGalleryArr = createSelector(allGalleries, (gallery) =>
	Object.values(gallery),
);

const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD: {
			const newObj = { ...state, all: {} };
			action.payload.forEach((gallery) => (newObj.all[gallery.id] = gallery));
			return newObj;
		}
		case LOAD_OWNED:
			return { ...state, owned: action.payload };
		case LOAD_ONE: {
			const newAllArt = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllArt };
		}
		default:
			return state;
	}
};

export default galleryReducer;
