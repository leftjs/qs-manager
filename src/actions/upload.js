/**
 * Created by jason on 6/2/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const uploadLicense = (data) => {
	return dispatch => dispatch({
		type: types.UPLOAD_LICENSE,
		payload: new Promise((resolve, reject) => {
			req.upload('/upload/license', data).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}