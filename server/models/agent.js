/**
 * Created by jason on 6/2/16.
 */
var Schema = require('mongoose').Schema
var agentSchema = Schema({
	name: String,
	contact: String,
	phone: String,
	province: String,
	city: String,
	district: String,
	address: String,
	license_code: String,
	license_url: String
})

module.exports = db.model('Agent', agentSchema)