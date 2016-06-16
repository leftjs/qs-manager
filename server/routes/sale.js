/**
 * Created by jason on 6/14/16.
 */
/**
 * Created by jason on 6/2/16.
 */
var express = require('express');
var router = express.Router();
var good = require('../models/good')
var sale = require('../models/sale')
var agent = require('../models/agent')
var leaveFactory = require('../models/leaveFactory')
import config from '../config'
var _ = require('lodash')
var OAuth = require('wechat-oauth')
var client = new OAuth(config.appId, config.secret)



router.get('/list', (req,res,next) => {
	sale.find({}, (err,result) => {
		if (err) return next(err)
		res.json(result)
	})
})

//name: String, // 商品名称
//	price: Number, // 商品价格
//	desc: String, // 商品描述
//	quality_guarantee: Number, // 保质期 (多少天)
router.post('/good', function(req,res,next) {
	let body = req.body
	if (_.some(_.values(body), (ele) => {
			return _.isNil(ele) || _.isEmpty(ele)
		})) {
		return next(customError(400, "请填写完整的信息"))
	}
	good.create({
		name: body.name,
		price: _.floor(_.toNumber(body.price), 2),
		desc: body.desc,
		quality_guarantee: _.toInteger(body.quality_guarantee),
		image_url: body.image_url
	}, function(err,doc){
		if (err) {
			return next(err)
		}
		res.json(doc)
	})
})

router.get('/good', function(req,res,next) {
	good.find({}).exec(function(err,list) {
		if (err) return next(err)
		res.json(list)
	})
})

router.get('/good/:id', function(req,res,next) {
	good.find({_id: req.params['id']}, function(err,doc) {
		if(err) return next(err)
		res.json(doc)
	})
})


router.put('/good/:id', function(req,res,next) {
	let body = req.body
	var entity = {}
	!!body.name && (entity['name'] = body.name)
	!!body.price && (entity['price'] = body.price)
	!!body.desc && (entity['desc'] = body.desc)
	!!body.image_url && (entity['image_url'] = body.image_url)
	!!body.quality_guarantee && (entity['quality_guarantee'] = body.quality_guarantee)
	good.update({_id: body._id}, {
		$set: entity
	}, {multi: false}, function(err, numAffected) {
		if (err) {
			return next(customError(400, err))
		}
		if (numAffected == 0) {
			return next(customError(400, "更新失败"))
		}
		res.json(body)
	})
})

router.delete('/good/:id', function(req,res,next) {
	let id = req.params['id']
	console.log(id)
	good.remove({_id: id}, function(err) {
		if (err) {
			return next(customError(400, err))
		}
		res.json({msg: 'success'})
	})
})


router.post('/leave',function(req,res,next) {
	let body = req.body
	if (_.some(_.values(body), (ele) => {
			return _.isNil(ele) || _.isEmpty(ele)
		})) {
		return next(customError(400, "请填写完整的信息"))
	}
	leaveFactory.create({
		agentId: body.agentId,
		goodId: body.goodId,
		leaveDate: new Date(),
		leaveCount: body.leaveCount
	},(err,batchInfo) => {
		if(err) return next(err)
		var result = _.times(batchInfo.leaveCount, () => {
			sale.create({
				agentId: body.agentId,
				goodId: body.goodId,
				activate: false,
				user: null,
				activateDate: null,
				scanCount: 0,
				batch: batchInfo._id
			},(err, doc) => {
				if (err) return next(err)
				sale.update({_id: doc._id}, {$set: {
					qrCodeUrl: `${config.domain}/sale/activate?good=${doc._id}`
				}},{multi: false}).exec((err,numAffected) => {
					if (err) return next(err)
					if (numAffected == 0) return next(customError(400, "出库失败"))
					return _.constant(0)
				})
			})
		})
		if (result.length == batchInfo.leaveCount) res.json(batchInfo)
	})
})

router.get('/leave', (req,res,next) => {
	leaveFactory.find({},function(err,list) {
		if (err) return next(err)
		res.json(list)
	})
})

router.get('/activate', (req,res,next) => {
	var goodId = req.query['good']
	var url = client.getAuthorizeURL(`${config.sale_callback}`, "goodId", 'snsapi_userinfo')
	res.redirect(url)
})

router.get('/activate/callback', (req,res,next) => {
	console.log(req.query)
	res.json('ok')
	//let goodId = req.query['good']
	//sale.update({_id: goodId}, {$set: {
	//
	//}}, {multi: false}, function(err,numberReplaced) {
	//
	//})
	//res.json(goodId)
})


const customError = (status, msg) => {
	let error = new Error(msg)
	error.status = status
	return error
}


module.exports = router;
