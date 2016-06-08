/**
 * Created by jason on 6/7/16.
 */
import * as types from '../actions/const'
/* Populated by react-webpack-redux:reducer */
export const agent = (state = [], action) => {
	switch (action.type) {
		case `${types.LOADING_AGENT_LIST}_FULFILLED`:
			return [
				...action.payload
			]
		default:
			return state
	}
}