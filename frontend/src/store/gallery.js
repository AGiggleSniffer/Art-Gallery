import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";

const LOAD = "galleries/load";
const LOAD_OWNED = "galleries/loadOwned";
const LOAD_ONE = "galleries/loadOne";
const EDIT = "galleries/edit";
const ADD_ART = "galleries/addArt";
const DELETE_ART = "galleries/deleteArt";

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

const edit = (payload) => ({
	type: EDIT,
	payload,
});

const addArt = (payload) => ({
	type: ADD_ART,
	payload,
});

const deleteArt = (payload) => ({
	type: DELETE_ART,
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
	async (dispatch) => {
		const response = await csrfFetch(`/api/galleries/${id}`, {
			method: "PUT",
			body: JSON.stringify({ description, name }),
		});

		const data = await response.json();
		dispatch(edit(data));
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
	async (dispatch) => {
		const response = await csrfFetch(`/api/galleries/${id}/arts`, {
			method: "DELETE",
			body: JSON.stringify({ artGalIdArr }),
		});

		const data = await response.json();
		dispatch(deleteArt(data));
		return data;
	};

export const addArtGalleries =
	({ id, artIdArray }) =>
	async (dispatch) => {
		const response = await csrfFetch(`/api/galleries/${id}/arts`, {
			method: "POST",
			body: JSON.stringify({ artIdArray }),
		});

		const data = await response.json();
		dispatch(addArt(data));
		console.log(data);
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
			const newAllObj = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllObj };
		}
		case ADD_ART: {
			const newAllObj = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllObj };
		}
		case EDIT: {
			const newAllObj = {
				...state.all,
				[action.payload.id]: { ...state.all[action.payload.id] },
			};
			newAllObj[action.payload.id].description = action.payload.description;
			newAllObj[action.payload.id].name = action.payload.name;
			return { ...state, all: newAllObj };
		}
		case DELETE_ART: {
			const newAllObj = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllObj };
		}
		default:
			return state;
	}
};

export default galleryReducer;
