const mongoose = require('mongoose')
const user = require('../schema/user')
module.exports = mongoose.model('User',user)