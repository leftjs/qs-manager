/**
 * Created by jason on 6/2/16.
 */
var express = require('express');
var router = express.Router();
var agent = require('../models/agent')
var cityList = require('../config/china_citylist')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json('respond with a resource');
});

router.post('/', function(req,res,next){
	agent.create({name: 'jason'}, function(err,doc) {
		if (err) return next(err)
		res.json(doc)
	})

})

router.get('/citylist/:code',function(req,res,next) {
	console.log(parseInt(req.params['code']))
	res.json(cityList[parseInt(req.params['code'])])
})

module.exports = router;
