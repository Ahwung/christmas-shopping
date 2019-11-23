const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	username: {type: String, unique: true},
	password: {type: String}
})

const User = mongose.model('User', userSchema)

module.exports = User