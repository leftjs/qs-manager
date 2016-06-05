/**
 * Created by jason on 6/2/16.
 */
var express = require('express');
var router = express.Router();
var agent = require('../models/agent')

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.json('respond with a resource');
});


//name: String,
//	contact: String,
//	phone: String,
//	province: String,
//	city: String,
//	district: String,
//	address: String,
//	license_code: String,
//	license_url: String
router.post('/', function(req,res,next){
	console.log(req)
	let body = req.body
	agent.create({
		name: body.name,
		contact: body.contact,
		phone: body.phone,
		province: body.province,
		city: body.city,
		district: body.city,
		address: body.address,
		license_code: body.license_code,
		license_url: body.license_url
	}, function(err,doc) {
		if (err) return next(err)
		res.json(doc)
	})
})


const customError = (status, msg) => {
	let error = new Error()
	error.status = status
	error.message = msg
}


module.exports = router;
