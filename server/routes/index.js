var express = require('express');
var router = express.Router();
var cityList = require('../config/china_citylist')
import _ from 'lodash'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Expresssd' });
});

router.get('/citylist/:code',function(req,res,next) {
	const code = parseInt(req.params['code'])
	code == 0 ?  res.json({}) : res.json(_.has(cityList,code) ? cityList[code] : {})
})


module.exports = router;
