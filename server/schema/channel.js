const Mongoose = require('mongoose')
module.exports = new Mongoose.Schema({
    name:String,
    order:{
        type:Number,
        default:0,
    },
    query:{
        type:String,
        default:""
    }
})