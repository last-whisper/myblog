const mongoose = require('mongoose')
const channel = require('../schema/channel')
module.exports = mongoose.model('Channel',channel)