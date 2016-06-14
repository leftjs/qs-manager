/* Combine all available reducers to a single root reducer.
 *
 * CAUTION: When using the generators, this file is modified in some places.
 *          This is done via AST traversal - Some of your formatting may be lost
 *          in the process - no functionality should be broken though.
 *          This modifications only run once when the generator is invoked - if
 *          you edit them, they are not updated again.
 */
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import * as types from '../actions/const'
import { loadingBarReducer } from 'react-redux-loading-bar'
import * as agent from './agent'
import * as good from './good'
/* Populated by react-webpack-redux:reducer */
const reducers = {
	hello: (state = {}, action) => {
		switch (action.type) {

			case `${types.SAY_HELLO}_PENDING`:
				return {
					...state
				}
			default:
				return state
		}
	}
};
export default combineReducers({
	...reducers,
	...agent,
	...good,
	routing: routerReducer,
	loadingBar: loadingBarReducer
});
