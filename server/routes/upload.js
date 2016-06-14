/**
 * Created by jason on 6/2/16.
 */
var express = require('express')
var router = express.Router()
var multer = require('multer')
var upload = multer({dest: './server/uploads/'})
var OSS = require('ali-oss')
var fs = require('fs')
var path = require('path')
var util = require('util')


//var client = new OSS({
//	region:'oss-cn-hangzhou',
//	accessKeyId: 'D7wyxh0NcajbB9Bk',
//	accessKeySecret: 'qIB03kCjbjC3q6WIO1rF6FQGIBr5uJ',
//	bucket: 'qs-manager'
//})

router.put('/image', upload.single('file'), function(req,res,next) {
	const newFileName = req.file.filename + '.' + req.file.mimetype.split('/')[1]
	fs.rename(path.join('./', req.file.path), path.join('./', req.file.path, '../' , '../', 'public/images', newFileName), () => {
		res.json(newFileName)
	})
});



module.exports = router