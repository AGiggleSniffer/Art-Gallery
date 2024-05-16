import { csrfFetch } from "./csrf";

const LOAD = "galleries/load";
const LOAD_OWNED = "galleries/loadOwned";

const load = (payload) => ({
	type: LOAD,
	payload,
});

const loadOwned = (payload) => ({
	type: LOAD_OWNED,
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

const initialState = { all: [], owned: [] };

export const allGalleries = (state) => state.galleries.all;
export const ownedGalleries = (state) => state.galleries.owned;

const galleryReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			return { ...state, all: action.payload };
		case LOAD_OWNED:
			return { ...state, owned: action.payload };
		default:
			return state;
	}
};

export default galleryReducer;
