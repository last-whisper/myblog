const http = require('http')
const url = require('url')
const router = require('./router')
const {routers} = require('./public/js/utils')
const mongoose = require('mongoose')
const User = require('./model/user')
const fs = require('fs')
const querystring = require('querystring')
const path = require('path')
const httpData = require('./public/js/utils')
//连接服务器
mongoose.connect('mongodb://localhost:27018/blog',{ useNewUrlParser: true },function (err) {
    if (err){
        console.log('数据库连接失败')
    }else{
        console.log('connected')
        const server = http.createServer(routers)
        server.listen(3000,()=>{
            console.log('listen on 3000')
        })
    }
    
})

















    
    




