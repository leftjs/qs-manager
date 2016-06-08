/**
 * Created by jason on 6/3/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const registerAgent = (body) => {
	return dispatch => dispatch({
		type: types.REGISTER_AGENT,
		payload: new Promise((resolve, reject) => {
			req.post(`/agents`,body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const getAgentList = () => {
	return dispatch => dispatch({
		type: types.LOADING_AGENT_LIST,
		payload: new Promise((resolve,reject) => {
			req.get('/agents').then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	})
}