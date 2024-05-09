import { csrfFetch } from "./csrf";

const SAVE = "art/save";
const LOAD = "art/load";

export const save = (payload) => ({
	type: SAVE,
	payload,
});

export const load = (payload) => ({
	type: LOAD,
	payload,
});

export const saveThunk =
	({ galleryId, name, description, bitmap }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/art", {
			method: "POST",
			body: JSON.stringify({
				gallery_id: galleryId,
				name,
				description,
				bitmap,
			}),
		});
		const data = await response.json();
		dispatch(save(data));
		return response;
	};

export const loadThunk = () => async (dispatch) => {
	const response = await csrfFetch(`api/art`);

	const data = await response.json();
	dispatch(load(data));
	return response;
};

const initialState = { context: null, myArt: [] };

const artReducer = (state = initialState, action) => {
	switch (action.type) {
		case SAVE:
			return { ...state };
		case LOAD:
			console.log(action);
			return { ...state, myArt: action.payload.myArt };
		default:
			return state;
	}
};

export default artReducer;