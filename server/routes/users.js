var express = require('express');
var router = express.Router();
var OAuth = require('wechat-oauth')
var user = require('../models/user')
import config from '../config'
var client = new OAuth(config.appId, config.secret)

/* GET users listing. */
router.get('/login/wechat', function(req, res, next) {
	// state 在将来可以用来判断用来使用的设备或者判断登录方式
	res.json({url: client.getAuthorizeURL(config.callback,'',"snsapi_userinfo")})
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

module.exports = router;
