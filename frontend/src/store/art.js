import { csrfFetch } from "./csrf";

const LOAD = "art/load";
const LOAD_ALL = "art/loadAll";
const EDIT = "art/edit";
const ONEART = "art/one";
const TOP_TAGS = "art/topTags";

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

export const oneArt = (payload) => ({
	type: ONEART,
	payload,
});

const topTags = (payload) => ({
	type: TOP_TAGS,
	payload,
});

export const saveThunk =
	({ galleryId, name, description, dataURL, tags }) =>
	async () => {
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

export const topTagsTagsThunk = () => async (dispatch) => {
	const response = await csrfFetch("/api/art/topTags");
	const data = await response.json();
	dispatch(topTags(data));
	return data;
};

const initialState = {
	all: [],
	count: 0,
	owned: [],
	current: null,
	topTags: [],
};

export const allArtArr = (state) => state.art.all;
export const artCount = (state) => state.art.count;
export const ownedArt = (state) => state.art.owned;
export const findArt = (state) => state.art.current;
export const topTagsArr = (state) => state.art.topTags;

const artReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD:
			return { ...state, owned: action.payload };
		case LOAD_ALL:
			return {
				...state,
				all: action.payload.Arts,
				count: action.payload.count,
			};
		case EDIT: {
			const newAllArt = {
				...state.all,
				[action.payload.id]: action.payload,
			};
			return { ...state, all: newAllArt };
		}
		case ONEART: {
			return { ...state, current: action.payload };
		}
		case TOP_TAGS: {
			return { ...state, topTags: action.payload.map((tag) => tag.type) };
		}
		default:
			return state;
	}
};

export default artReducer;
