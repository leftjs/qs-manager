var express = require('express');
var router = express.Router();
var cityList = require('../config/china_citylist')
import _ from 'lodash'

var agent = require('../models/agent')
var good = require('../models/good')
var leaveFactory = require('../models/leaveFactory')
var sale = require('../models/sale')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Expresssd' });
});

router.get('/citylist/:code',function(req,res,next) {
	const code = parseInt(req.params['code'])
	code == 0 ?  res.json({}) : res.json(_.has(cityList,code) ? cityList[code] : {})
})


router.delete('/databases/all', (req,res,next) => {
	agent.remove({})
	good.remove({})
	leaveFactory.remove({})
	sale.remove({})
	res.json('success')
})


module.exports = router;
