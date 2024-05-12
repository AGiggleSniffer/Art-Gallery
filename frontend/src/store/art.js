import { csrfFetch } from "./csrf";

const SAVE = "art/save";
const LOAD = "art/load";
const LOAD_ALL = "art/loadAll";
const EDIT = "art/edit";
const ONEART = "art/one";

export const save = (payload) => ({
	type: SAVE,
	payload,
});

export const load = (payload) => ({
	type: LOAD,
	payload,
});

export const loadAll = (payload) => ({
	type: LOAD_ALL,
	payload,
});

export const edit = (payload) => ({
	type: EDIT,
	payload,
});

export const oneArt = (payload) => ({
	type: ONEART,
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

const initialState = { context: null, myArt: [], allArt: {} };

const artReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE:
			return { ...state };
		case LOAD:
			return { ...state, myArt: action.payload.myArt };
		case LOAD_ALL:
			return { ...state, allArt: action.payload.myArt };
		case EDIT: {
			const newAllArt = {
				...state.allArt,
				[action.payload.id]: action.payload,
			};
			return { ...state, allArt: newAllArt };
		}
		case ONEART: {
			const newAllArt = {
				...state.allArt,
				[action.payload.myArt.id]: action.payload.myArt,
			};
			return { ...state, allArt: newAllArt };
		}
		default:
			return state;
	}
};

export default artReducer;
