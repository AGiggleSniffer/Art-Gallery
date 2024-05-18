import { csrfFetch } from "./csrf";

const SAVE = "art/save";
const LOAD = "art/load";
const LOAD_ALL = "art/loadAll";
const EDIT = "art/edit";
const ONEART = "art/one";
const DELETE = "art/delete";

const save = (payload) => ({
	type: SAVE,
	payload,
});

const load = (payload) => ({
	type: LOAD,
	payload,
});

const loadAll = (payload) => ({
	type: LOAD_ALL,
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

const deleteArt = (payload) => ({
	type: DELETE,
	payload,
});

export const saveThunk =
	({ galleryId, name, description, dataURL }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/art", {
			method: "POST",
			body: JSON.stringify({
				galleryId,
				name,
				description,
				dataURL,
			}),
		});
		const data = await response.json();
		dispatch(save(data));
		return response;
	};

export const loadThunk = () => async (dispatch) => {
	const response = await csrfFetch(`/api/art/owned`);

	const data = await response.json();
	dispatch(load(data));
	return data;
};

export const loadAllThunk = () => async (dispatch) => {
	const response = await csrfFetch(`/api/art/all`);

	const data = await response.json();
	dispatch(loadAll(data));
	return data;
};

export const editThunk =
	({ galleryId, name, description, dataURL, id }) =>
	async (dispatch) => {
		const response = await csrfFetch(`/api/art/${id}`, {
			method: "PUT",
			body: JSON.stringify({
				galleryId,
				name,
				description,
				dataURL,
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

export const deleteArtThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/art/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();
	dispatch(deleteArt(id));
	return data;
};

const initialState = { context: null, owned: [], all: {} };

export const findArt = (id) => (state) => state.art.all[id];
export const ownedArt = (state) => state.art.owned;
export const allArt = (state) => state.art.all;

const artReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE:
			return { ...state };
		case LOAD:
			return { ...state, owned: action.payload };
		case LOAD_ALL:
			return { ...state, all: action.payload };
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
		case DELETE: {
			const newObj = { ...state };
			delete newObj.all[action.payload.id];
			return newObj;
		}
		default:
			return state;
	}
};

export default artReducer;
