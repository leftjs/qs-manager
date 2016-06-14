/**
 * Created by jason on 6/2/16.
 */
var express = require('express');
var router = express.Router();
var agent = require('../models/agent')
var _ = require('lodash')


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
	let body = req.body
	if (_.some(_.values(body), (ele) => {
			return _.isNil(ele) || _.isEmpty(ele)
		})) {
		return next(customError(400, "请填写完整的信息"))
	}
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
		console.log('doc',doc)
		res.json(doc)
	})
})

router.put('/:id', function(req,res,next) {
	let body = req.body
	agent.update({_id: body._id}, {
		$set: {
			name: body.name,
			contact: body.contact,
			phone: body.phone,
			address: body.address,
			license_code: body.license_code
		}}, {multi: false}, function(err, numAffected) {
		if (err) {
			return next(customError(400, err))
		}
		if (numAffected == 0) {
			return next(customError(400, "更新失败"))
		}
		res.json(body)
	})
})

router.delete('/:id', function(req,res,next) {
	let id = req.params['id']
	console.log(id)
	agent.remove({_id: id}, function(err) {
		if (err) {
			return next(customError(400, err))
		}
		res.json({msg: 'success'})
	})
})
	//var conditions = { name: 'borne' }
	//	, update = { $inc: { visits: 1 }}
	//	, options = { multi: true };
	//
	//Model.update(conditions, update, options, callback);
	//
	//function callback (err, numAffected) {
	//	// numAffected is the number of updated documents
	//})


//router.get('/:id',function(req, res, next) {
//})

router.get('/',function(req,res,next) {
	agent.find({}).exec(function(err,doc) {
		res.json(doc)
	})
})

const customError = (status, msg) => {
	let error = new Error()
	error.status = status
	error.message = msg
	return error
}


module.exports = router;
