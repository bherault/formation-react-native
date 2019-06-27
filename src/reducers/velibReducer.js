import * as types from "../actions/velibTypes";

const initialState = {
	velib_bookmarked: [],
}

export default function velibReducer(state = initialState, action) {
	switch (action.type) {
		case types.VELIB_BOOKMARKED:
			return {...state, velib_bookmarked: [...state.velib_bookmarked, action.payload]};
		case types.VELIB_UNBOOKMARKED:
			return {...state, velib_bookmarked: state.velib_bookmarked.filter(velib => velib.id !== action.payload)};
		default:
			return state;
	}
}