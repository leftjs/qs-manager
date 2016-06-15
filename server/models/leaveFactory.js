/**
 * Created by jason on 6/2/16.
 */
var Schema = require('mongoose').Schema
var leaveFactorySchema = Schema({
	leaveDate: Date,
	agentId: String,
	goodId: String,
	leaveCount: String
})

module.exports = db.model('LeaveFactory', leaveFactorySchema)