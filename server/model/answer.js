const mongoose = require('mongoose')
const answer = require('../schema/answer')
module.exports = mongoose.model('Answer',answer)