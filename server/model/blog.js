const mongoose = require('mongoose')
const blog = require('../schema/blog')
module.exports = mongoose.model('Blog',blog)