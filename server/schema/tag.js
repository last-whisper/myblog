const Mongoose = require('mongoose')
module.exports = new Mongoose.Schema({
    commonUse:Boolean,
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    },
    name:String,
    explain:{
        type:String,
        default:''
    }
    
})