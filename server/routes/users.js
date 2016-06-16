var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth')
var user = require('../models/user')
import config from '../config'
var client = new OAuth(config.appId, config.secret)
import _ from 'lodash'



/* GET users listing. */
router.get('/login/wechat', function(req, res, next) {
	// state 在将来可以用来判断用来使用的设备或者判断登录方式
	res.redirect(client.getAuthorizeURLForWebsite(config.callback))
});

///oauth/wechat/callback
router.get('/login/wechat/callback', function(req,res,next) {
	client.getAccessToken('code', function(err,result) {
		var accessToken = result.data.access_token
		var openId = result.data.openid
		client.getUser(openId, function(err,result){
			if(err) return next(err)
			console.log(result)
			res.json(result)
		})
	})
})

router.post('/login/admin', function(req,res,next) {
	let body = req.body
	user.findOne({
		username: body.username,
		password: body.password
	}, function(err,doc) {
		if (err) return next(err)
		if (_.isEmpty(doc)) return next(customError(400, "用户名或密码错误"))
		res.json(doc)
	})
})

router.post('/register/admin', function(req,res,next) {
	let body = req.body
	user.create({
		username: body.username,
		password: body.password,
		isAdmin: true
	},function(err,doc) {
		if (err) return next(err)
		res.json(doc)
	})
})

const customError = (status, msg) => {
	let error = new Error(msg)
	error.status = status
	return error
}

module.exports = router;
