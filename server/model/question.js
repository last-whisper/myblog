const mongoose = require('mongoose')
const question = require('../schema/question')
module.exports = mongoose.model('Question',question)