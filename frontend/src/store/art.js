import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";

const LOAD = "art/load";
const LOAD_ALL = "art/loadAll";
const SAVE = "art/save";
const EDIT = "art/edit";
const ONEART = "art/one";

const load = (payload) => ({
	type: LOAD,
	payload,
});

const loadAll = (payload) => ({
	type: LOAD_ALL,
	payload,
});

const save = (payload) => ({
	type: SAVE,
	payload,
});

const edit = (payload) => ({
	type: EDIT,
	payload,
});

const oneArt = (payload) => ({
	type: ONEART,
	payload,
});

export const saveThunk =
	({ galleryId, name, description, dataURL, tags }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/art", {
			method: "POST",
			body: JSON.stringify({
				galleryId,
				name,
				description,
				dataURL,
				tags,
			}),
		});
		const data = await response.json();
		dispatch(save(data));
		return data;
	};

export const loadThunk = () => async (dispatch) => {
	const response = await csrfFetch(`/api/art/owned`);

	const data = await response.json();
	dispatch(load(data));
	return data;
};

export const loadAllThunk =
	({ filterState, page, size }) =>
	async (dispatch) => {
		console.log(filterState, page, size);
		const response = await csrfFetch(
			`/api/art?filterState=${filterState}&page=${page}&size=${size}`,
		);

		const data = await response.json();
		dispatch(loadAll(data));
		return data;
	};

export const editThunk =
	({ galleryId, name, description, dataURL, tags, id }) =>
	async (dispatch) => {
		const response = await csrfFetch(`/api/art/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				galleryId,
				name,
				description,
				dataURL,
				tags,
			}),
		});

		const data = await response.json();
		dispatch(edit(data));
		return data;
	};

export const findOneArt = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/art/${id}`);

	const data = await response.json();
	dispatch(oneArt(data));
	return data;
};

export const deleteArtThunk = (id) => async () => {
	const response = await csrfFetch(`/api/art/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();
	return data;
};

const initialState = { owned: [], all: {} };

export const findArt = (id) => (state) => state.art.all[id];
export const ownedArt = (state) => state.art.owned;
export const allArt = (state) => state.art.all;
export const allArtArr = createSelector(allArt, (art) => Object.values(art));

const artReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			return { ...state, owned: action.payload };
		case LOAD_ALL:
			return { ...state, all: action.payload };
		case SAVE: {
			const newAllArt = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllArt };
		}
		case EDIT: {
			const newAllArt = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllArt };
		}
		case ONEART: {
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

export default artReducer;
