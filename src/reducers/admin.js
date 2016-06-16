/**
 * Created by jason on 6/7/16.
 */
import * as types from '../actions/const'
import _ from 'lodash'
/* Populated by react-webpack-redux:reducer */
export const admin = (state = {}, action) => {
	//console.log(state)
	switch (action.type) {
		case `${types.LOGIN_ADMIN}_FULFILLED`:
			return {
				...action.payload
			}
		case `${types.LOGOUT_ADMIN}`:
			return {
			}
		default:
			return state
	}
}