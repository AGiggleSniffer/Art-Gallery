import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const UPDATE_CTX = "session/update";

export const updateCtx = (context) => ({
	type: UPDATE_CTX,
	payload: context,
});

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, firstName, lastName, email, password } = user;
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			firstName,
			lastName,
			email,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return response;
};

const initialState = { context: null, user: null };

export const user = (state) => state.session.user;

export const context = (state) => state.session.context;

const sessionReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER:
			return { ...state, user: action.payload };
		case REMOVE_USER:
			return { ...state, user: null };
		case UPDATE_CTX:
			return { ...state, context: action.payload };
		default:
			return state;
	}
};

export default sessionReducer;
