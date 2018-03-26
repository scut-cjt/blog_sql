var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');


// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false})

const PATH = __dirname + '/';

app.get('/test', function (req, res) {
    console.log("主页 GET 请求");
    res.send('Hello GET');
})



/**
 * 启动server服务器
 * @param  {[type]} ){	var host          [description]
 * @return {[type]}         [description]
 */
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
