const mongoose = require('mongoose')
const tag = require('../schema/tag')
module.exports = mongoose.model('Tag',tag)