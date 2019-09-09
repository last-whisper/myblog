const url = require('url')
function api1(req,res){
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    res.write('api1:'+'路由是'+url.parse(req.url).pathname)
    res.end()
}
function api2(req,res){
    res.writeHead(200, {"Content-Type": "text/plain;charset=utf-8"});
    res.write('api2:'+'路由是'+url.parse(req.url).pathname)
    res.end()
}

let route = {
    '/api/api1':api1,
    '/api/api2':api2,
}
module.exports = route
