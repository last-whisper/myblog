const url = require('url')
const formidable = require('formidable')
const path = require('path')
const Jwt = require('../public/js/jwt')
const mongoose = require('mongoose')
const UserModel = require('../model/user')
mongoose.set('useFindAndModify', false)

function admin1(req,res){
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    
    res.end('1111111')
}
function admin2(req,res){
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    res.write('admin2:'+'路由是'+url.parse(req.url).pathname)
    res.end()
}


//用户名密码登陆
function login(req,res){

    //设定返回结果
    let resData = {
        code:0,
        message:'登陆成功',
    }

    UserModel.findOne({
        username:req.body.username,
        password:req.body.password
    }).then(r=>{
        if(!r){
            resData.code = 1
            resData.message = '用户名或密码错误'
            res.end(JSON.stringify(resData))
        }else{
            //生成token
            let authorization = new Jwt({_id:r._id}).generateToken()

            //整理返回数据
            resData.data = {
                _id:r._id,
                username:r.username,
                nickname:r.nickname,
                github:r.github,
                location:r.location,
                follow:r.follow.length,
                fans:r.fans.length,
                exp:r.exp,
                avatar:r.avatar,
            }
            resData.authorization = authorization
            

            //更新用户最后登陆时间并向前端传递返回数据
            UserModel.findByIdAndUpdate(r._id,{lastLoading:new Date()},function (err,doc) {
                res.end(JSON.stringify(resData))
            })
        }
    }).catch(err=>{
        res.statusMessage = err.message
        res.end()
    })    




  
}
//token免密登陆
function tokenauthorization(req,res){
    let token = req.headers.authorization
    let resData = {
        code:0,
        message:'登陆成功'
    }
    if(token){
        let jwt = new Jwt(token)
        let result = jwt.verifyToken()
        //token验证通过提取用户ID返回用户数据
        if(result._id){
            UserModel.findById(result._id).then(r=>{
                if(r){
                    resData.data = {
                        _id:r._id,
                        username:r.username,
                        nickname:r.nickname,
                        github:r.github,
                        location:r.location,
                        follow:r.follow.length,
                        fans:r.fans.length,
                        exp:r.exp,
                        avatar:r.avatar,
                    }

                    //更新用户最后登陆时间并向前端传递返回数据
                    UserModel.findByIdAndUpdate(result._id,{lastLoading:new Date()},function (err,doc) {
                        if(err){
                            res.statusMessage(err || 'Unknow Error')
                            res.end()
                        }
                        res.end(JSON.stringify(resData))
                    })
                }else{
                    res.statusCode = 500
                    res.statusMessage = 'Unknow Error'
                    res.end()
                }
            })
            .catch((err)=>{
                res.statusCode = 500
                res.statusMessage = err || 'Unknow Error'
                res.end()
            })
                        
        }else{
            resData.code = 1
            resData.message = 'token已失效'
            res.end(JSON.stringify(resData))
        }
        
    }
  

    //   //如果传递token则进行免密登陆验证，否则为账号密码登陆
    //   if(req.getHeader('Authorization') && req.body._id){
        
    // }else{

    // }
    // console.log('进子路由了',req.body,req.params,req.getHeader('Authorization'))
    // res.writeHead(200,{"Content-Type":"application/json"});
    // res.end(JSON.stringify({code:200,data:{a:1,b:2}}))
}


//注册先行验证用户名是否存在
function checkUsername(req,res){
    UserModel.findOne({username:req.params.username})
    .then(r=>{
        if(r){
            res.end(JSON.stringify({code:1,message:'用户名已存在'}))
        }else{
            res.end(JSON.stringify({code:0,message:'用户名可用'}))
        }
    })
    .catch(r=>{
        res.statusMessage = err.message
        res.end()
    })
}

//先行验证昵称是否存在
function checkNickname(req,res){
    UserModel.findOne({nickname:req.params.nickname})
    .then(r=>{
        if(r){
            res.end(JSON.stringify({code:1,message:'该昵称已经被占用啦~'}))
        }else{
            res.end(JSON.stringify({code:0,message:'昵称可以用哦~'}))
        }
    })
    .catch(r=>{
        res.statusMessage = err.message
        res.end()
    })
}

//注册
function register(req,res){
    //昵称和用户名唯一性验证
    UserModel.findOne({username:req.body.username})
    .then(r=>{
        if(r){
            res.end(JSON.stringify({code:1,message:'用户名已存在'}))
        }else{
            UserModel.findOne({nickname:req.body.nickname})
            .then(r=>{
                if(r){
                    res.end(JSON.stringify({code:1,message:'该昵称已经被占用啦~'}))
                }else{
                    //用户名昵称通过验证
                    UserModel.create({
                        username:req.body.username,
                        nickname:req.body.nickname,
                        password:req.body.password
                    }).then((r)=>{
                        let data = {
                            _id:r._id,
                            username:r.username,
                            nickname:r.nickname,
                            github:r.github,
                            location:r.location,
                            follow:r.follow.length,
                            fans:r.fans.length,
                            exp:r.exp,
                            avatar:r.avatar,
                        } 
                        //生成token
                        let authorization = new Jwt({_id:r._id}).generateToken()
                        res.end(JSON.stringify({code:0,message:'注册成功',data,authorization}))
                    })
                }
            })
        }
    })
    .catch(err=>{
        res.statusCode = 500
        res.statusMessage = 'Unknow Error'
        res.end()
    })
}

let route = {
    '/admin/admin1':admin1,
    '/admin/admin2':admin2,
    '/admin/login':login,
    '/admin/checkusername':checkUsername,
    '/admin/checknickname':checkNickname,
    '/admin/register':register,
    '/admin/tokenauthorization':tokenauthorization,
}
module.exports = route