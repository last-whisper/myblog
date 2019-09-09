const Mongoose = require('mongoose')
module.exports = new Mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    title:String,
    createTime:{
        type:Date,
        default:Date.now
    },
    lastModify:{
        type:Date,
        default:Date.now
    },  
    content:String,
    result:{
        type:Number,
        default:0
    },
    tag:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    }],
    usefull:{
        type:Number,
        default:0
    },
    useless:{
        type:Number,
        default:0
    },
    browse:{
        type:Number,
        default:0
    },
    read:{
        type:Number,
        default:0
    },
    replysNum:{
        type:Number,
        default:0
    }
})