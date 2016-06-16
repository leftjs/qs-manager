/**
 * Created by jason on 6/2/16.
 */
var Schema = require('mongoose').Schema
var userSchema = Schema({
	openId: String,
	nickname: String,
	country: String,
	province: String,
	city: String,
	avatar: String,
	isAdmin: Boolean,
	username: String,
	password: String
})

module.exports = db.model('User', userSchema)