/**
 * Created by jason on 6/7/16.
 */
import * as types from '../actions/const'
import _ from 'lodash'
/* Populated by react-webpack-redux:reducer */
export const leaveRecords = (state = [], action) => {
	//console.log(state)
	switch (action.type) {
		case `${types.LOADING_LEAVE_FACTORY}_FULFILLED`:
			return [
				...action.payload
			]
		case `${types.LEAVE_FACTORY_REGISTER}_FULFILLED`:
			return [
				...state,
				action.payload
			]
		default:
			return state
	}
}