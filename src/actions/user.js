/**
 * Created by jason on 6/3/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const getLoginQRCodeUrl = () => {
	return dispatch => dispatch({
		type: types.GET_LOGIN_QRCODE_URL,
		payload: new Promise((resolve, reject) => {
			req.get(`/users/login/wechat`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


