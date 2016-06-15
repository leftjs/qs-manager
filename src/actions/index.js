/**
 * Created by jason on 5/31/16.
 */
import * as types from './const'
import * as upload from './upload'
import * as agent from './agent'
import * as sale from './sale'
import * as user from './user'
import * as req from '../services/request'

const getCityList = (cityId) => {
	return dispatch => dispatch({
		type: types.LOADING_CITY_LIST,
		payload: new Promise((resolve, reject) => {
			req.get(`/citylist/${cityId}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export default {
	...upload,
	...agent,
	...sale,
	...user,
	getCityList
}


