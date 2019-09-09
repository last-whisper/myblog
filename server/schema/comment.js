const Mongoose = require('mongoose')
module.exports = new Mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog"
    },
    createTime:{
        type:Date,
        default:Date.now
    },
    content:String,
    agreementsNum:String,
    reply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
})