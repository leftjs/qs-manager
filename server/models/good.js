/**
 * Created by jason on 6/2/16.
 */
var Schema = require('mongoose').Schema
var goodSchema = Schema({
	name: String, // 商品名称
	price: Number, // 商品价格
	desc: String, // 商品描述
	quality_guarantee: Number, // 保质期 (多少秒),
	image_url: String
})

module.exports = db.model('Good', goodSchema)