const url = require('url')
const router = require('../../router')
const fs = require('fs')
const path = require('path')
const formidable = require('formidable')

//路由分发
function routers(req,res){

    //设置跨越白名单
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
    res.setHeader("Content-Type", "application/json;charset=utf-8");
    res.setHeader("Access-Control-Allow-Credentials",true);
   
    let pathname = url.parse(req.url).pathname
    let staticFile = /^\/public/.test(pathname)
    let uploadFile = /^\/upload/.test(pathname)
    if(staticFile){//获取静态资源
        fs.stat(path.resolve(__dirname,'../..'+pathname),(err,stat)=>{
            if(err){
                res.statusCode = 404
                res.end('Not Found')
            }else{
                res.setHeader('Content-Length', stat.size)
                let stream = fs.createReadStream('.' + pathname)
                stream.pipe(res)
                stream.on('error', function(err) { // 如果读取文件出错
                    res.statusCode = 500
                    res.end()
                })
            }
        })
    }else if(uploadFile){
        if(req.method.toLowerCase() === 'options'){
            res.statusCode = 200;
            res.end()
            return
        }
        let form = new formidable.IncomingForm();
        //设置文件上传存放地址
        form.uploadDir = path.resolve(__dirname,"../image");
        form.keepExtensions = true;
        form.parse(req,function(err,fields,files){
            if(err) throw err;
            let name = files.upload.path.match(/(upload_)([\w.]+)/)[2]
            if(name){
                res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
                res.end(JSON.stringify({uploaded:files.upload.size,url:'http://localhost:3000/public/image/upload_'+name}));
            }else{
                res.statusCode = 500
                res.statusMessage = err || 'Unknow Error'
                res.end()
            }
            
        });
        
    }else if((typeof router[pathname]).toLowerCase() === 'function'){//路由匹配成功
        
        //处理前端数据&&路由分发
        let postData = ''
        switch(req.method.toLowerCase()){
            case 'get':
                req.params = url.parse(req.url, true).query;
                router[pathname](req,res)
                break;
            case 'post':
                
                req.on('data',chunk=>{postData+=chunk})
                req.on('end',()=>{
                    console.log(11111,postData)
                    if(postData){
                        req.body = JSON.parse(postData);
                    }
                    router[pathname](req,res)
                })
                break;
            case 'put':
                req.params = url.parse(req.url, true).query;
                req.on('data',chunk=>{postData+=chunk})
                req.on('end',()=>{
                    if(postData){
                        req.body = JSON.parse(postData);
                    }
                    router[pathname](req,res)
                })
                break;
            case 'options':
                res.statusCode = 200;
                res.end()
                break
            default:
                break;
        }

   
    }else{//路由匹配失败
        res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"})
        res.end(JSON.stringify({code:404,message:'没有匹配到该路由'}))
    }

}

module.exports = {routers}