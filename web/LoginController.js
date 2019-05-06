var UserDao = require("../dao/UserDao");
var respUtil = require("../util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");

var path = new Map();

function login(request, response){
    request.on('data',function (data) {
        var params = JSON.parse(data.toString());
        var account = params.account;
        var password = params.password;
        UserDao.queryUserByAccount(account,function (result) {
            if(result.length > 0 && result[0].password === password){
                console.log(result[0].user_name);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                    "Set-Cookie": ["uid=" + result[0].id + ";max-age=1000000","uname=" + encodeURIComponent(result[0].user_name) + ";max-age=1000000"]
                });
                response.write(respUtil.writeResult("success", "登陆成功", true));
                response.end();
            }else{
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(respUtil.writeResult("error", "登陆失败", false));
                response.end();
            }
        })
    })

}
path.set("/login", login);

function register(request, response){
    request.on('data',function (data) {
        var params = JSON.parse(data.toString());
        var userName = params.userName;
        var account = params.account;
        var password = params.password;
        var qqNum = params.qqNum;
        var coin = 0;
        var ctime = parseInt(timeUtil.getNow()/1000);
        UserDao.queryUserByName(userName,function (result) {
            if(result.length > 0) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                });
                response.write(respUtil.writeResult("success", "用户名已存在", false));
                response.end();
            }else{
                UserDao.queryUserByAccount(account,function (result) {
                    if(result.length > 0){
                        response.writeHead(200, {
                            "Content-Type": "text/html; charset=utf-8",
                        });
                        response.write(respUtil.writeResult("success", "账号已存在", false));
                        response.end();
                    }else{
                        UserDao.queryUserByqqNum(qqNum,function (result) {
                            if (result.length > 0) {
                                response.writeHead(200, {
                                    "Content-Type": "text/html; charset=utf-8",
                                });
                                response.write(respUtil.writeResult("success", "QQ已被注册", false));
                                response.end();
                            }else{
                                UserDao.insertUser(userName,account,password,qqNum,coin,ctime,function (result) {
                                    console.log(result);
                                    response.writeHead(200, {
                                        "Content-Type": "text/html; charset=utf-8",
                                    });
                                    response.write(respUtil.writeResult("success", "注册成功", true));
                                    response.end();
                                })
                            }
                        })
                    }
                })
            }
        })
    })
}
path.set("/register", register);

module.exports.path = path;