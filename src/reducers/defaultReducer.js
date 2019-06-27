import * as types from "../actions/defaultTypes";

const initialState = {
	user: null,
	cgu_accepted: false,
}

export default function defaultReducer(state = initialState, action) {
	switch (action.type) {
		case types.CGU_ACCEPTED:
			return {...state, cgu_accepted: action.payload};
		case types.USER_INFORMATIONS:
			return {...state, user: action.payload};
		default:
			return state;
	}
}