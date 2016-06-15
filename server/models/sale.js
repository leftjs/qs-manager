/**
 * Created by jason on 6/2/16.
 */
var Schema = require('mongoose').Schema
var saleSchema = Schema({
	qrCodeUrl: String,
	agentId: String,
	goodId: String,
	user: String, // wechat user (客户)
	activate: Boolean,
	activateDate: Date,
	scanCount: Number,
	batch: String, // 出库批次
})

module.exports = db.model('Sale', saleSchema)