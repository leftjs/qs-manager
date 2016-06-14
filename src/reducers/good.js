/**
 * Created by jason on 6/7/16.
 */
import * as types from '../actions/const'
import _ from 'lodash'
/* Populated by react-webpack-redux:reducer */
export const goods = (state = [], action) => {
	//console.log(state)
	switch (action.type) {
		case `${types.LOADING_GOODS_LIST}_FULFILLED`:
			return [
				...action.payload
			]
		case `${types.UPDATE_GOOD_INFO}_FULFILLED`:
			const oldState = [...state]
			var newState = _.map(oldState,(ele) => {
				if (ele._id != action.payload._id) {
					return ele
				} else {
					return action.payload
				}
			})
			return [
				...newState
			]
		case `${types.DELETE_GOOD}_FULFILLED`:
			const {meta} = action
			const {id} = meta
			const newState = _.filter(state, function(ele) {
				return ele._id != id
			})
			return [
				...newState
			]
		default:
			return state
	}
}