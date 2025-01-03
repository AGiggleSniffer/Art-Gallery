import { csrfFetch } from "./csrf";

const LOAD = "art/load";
const LOAD_ALL = "art/loadAll";
const EDIT = "art/edit";
const ONEART = "art/one";
const LIKE = "art/like";
const DISLIKE = "art/dislike";
const DELETE_REVIEW = "art/delete";

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

const like = (payload) => ({
	type: LIKE,
	payload,
});

const dislike = (payload) => ({
	type: DISLIKE,
	payload,
});

const deleteReview = (payload) => ({
	type: DELETE_REVIEW,
	payload,
});

///
/// ART THUNKS
///

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

///
/// REVIEW THUNKS
///

export const likeThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/review/like/${id}`, {
		method: "POST",
	});

	const data = await response.json();
	dispatch(like(data));
	return data;
};

export const dislikeThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/review/dislike/${id}`, {
		method: "POST",
	});

	const data = await response.json();
	dispatch(dislike(data));
	return data;
};

export const deleteReivewThunk = (id) => async (dispatch) => {
	const response = await csrfFetch(`/api/review/delete/${id}`, {
		method: "DELETE",
	});

	const data = await response.json();
	dispatch(deleteReview(data));
	return data;
};

///
/// STATE & SELECTORS
///

const initialState = {
	all: [],
	count: 0,
	owned: [],
	current: null,
};

export const allArtArr = (state) => state.art.all;
export const artCount = (state) => state.art.count;
export const ownedArt = (state) => state.art.owned;
export const findArt = (state) => state.art.current;

///
/// REDUCER
///

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
		case LIKE: {
			console.log(action.payload);
			const newState = { ...state };
			return { ...state };
		}
		case DISLIKE: {
			return { ...state };
		}
		case DELETE_REVIEW: {
			return { ...state };
		}
		default:
			return state;
	}
};

export default artReducer;
