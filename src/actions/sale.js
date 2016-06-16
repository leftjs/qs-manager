/**
 * Created by jason on 6/3/16.
 */
import * as types from './const'
import * as req from '../services/request'

export const createGood = (body) => {
	return dispatch => dispatch({
		type: types.CREATE_GOOD,
		payload: new Promise((resolve, reject) => {
			req.post(`/sale/good`,body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const getGoods = () => {
	return dispatch => dispatch({
		type: types.LOADING_GOODS_LIST,
		payload: new Promise((resolve, reject) => {
			req.get(`/sale/good`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}

export const getSingleGoodInfo = (id) => {
	return dispatch => dispatch({
		type: types.GET_SINGLE_GOOD_INFO,
		payload: new Promise((resolve, reject) => {
			req.get(`/sale/good/${id}`).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const updateGood = (body) => {
	return dispatch => dispatch({
		type: types.UPDATE_GOOD_INFO,
		payload: new Promise((resolve, reject) => {
			req.put(`/sale/good/${body._id}`,body).then((res) => {
				resolve(res)
			}).catch((err) => {
				reject(err)
			})
		})
	})
}


export const deleteGood = (id) => {
	return dispatch => dispatch({
		type: types.DELETE_GOOD,
		payload: new Promise((resolve,reject) => {
			req.remove(`/sale/good/${id}`).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		}),
		meta: {
			id
		}
	})
}

export const leaveFactoryRegister = (body) => {
	return dispatch => dispatch({
		type: types.LEAVE_FACTORY_REGISTER,
		payload: new Promise((resolve,reject) => {
			req.post(`/sale/leave`, body).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	})
}

export const getLeaveFactory = () => {
	return dispatch => dispatch({
		type: types.LOADING_LEAVE_FACTORY,
		payload: new Promise((resolve,reject) => {
			req.get(`/sale/leave`).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	})
}



export const getSaleList = () => {
	return dispatch => dispatch({
		type: types.LOADING_SALE_LIST,
		payload: new Promise((resolve,reject) => {
			req.get(`/sale/list`).then(res => {
				resolve(res)
			}).catch(err => {
				reject(err)
			})
		})
	})
}





