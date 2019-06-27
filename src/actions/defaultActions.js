import * as types from "./defaultTypes";

export function acceptCgu(bool) {
	return {type: types.CGU_ACCEPTED, payload: bool}
}