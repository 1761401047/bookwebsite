var UserDao = require("../dao/UserDao");
var ArticleDao = require("../dao/ArticleDao");
var FansDao = require("../dao/FansDao");
var respUtil = require("../util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");
var fs = require("fs");

var path = new Map();

function getArticleByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    ArticleDao.queryArticleByUid(uid,function (result) {
        console.log(result);
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/getArticleByUid", getArticleByUid);

function deleteArticleById(request, response){
    var params = url.parse(request.url, true).query;
    var article_id = params.article_id;
    ArticleDao.deleteArticleByArticleId(article_id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "删除成功", null));
        response.end();
    })
}
path.set("/deleteArticleById", deleteArticleById);

function getUserByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    UserDao.queryUserById(uid,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "请求成功", result));
        response.end();
    })
}
path.set("/getUserByUid", getUserByUid);


function getFansByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    FansDao.queryFansByUid(uid,function (result) {
        var fansArr = [];
        var len = result.length;
        for(var i = 0; i < len; i++){
            var fans_id = result[i].fans_id;
            UserDao.queryUserById(fans_id,function (result2) {
                fansArr.push(result2[0])
            })
        }
        var timer = setInterval(function () {
            if(fansArr.length === len){
                clearInterval(timer);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                });
                response.write(respUtil.writeResult("success", "请求成功", fansArr));
                response.end();
            }
        },100)
    })
}
path.set("/getFansByUid", getFansByUid);

function getFollowByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    FansDao.queryFollowByUid(uid,function (result) {
        var followArr = [];
        var len = result.length;
        for(var i = 0; i < len; i++){
            var uid = result[i].uid;
            UserDao.queryUserById(uid,function (result2) {
                followArr.push(result2[0])
            })
        }
        var timer = setInterval(function () {
            if(followArr.length === len){
                clearInterval(timer);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                });
                response.write(respUtil.writeResult("success", "请求成功", followArr));
                response.end();
            }
        },100)
    })
}
path.set("/getFollowByUid", getFollowByUid);


function addFans(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    var fans_id = params.fans_id;
    var c_time = timeUtil.getNow();
    FansDao.insertFans(uid,fans_id,c_time,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
    })
}
path.set("/addFans", addFans);

function removeFans(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    var fans_id = params.fans_id;
    FansDao.deleteFans(uid,fans_id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "操作成功", null));
        response.end();
    })
}
path.set("/removeFans", removeFans);

function removeFans(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    var fans_id = params.fans_id;
    FansDao.deleteFans(uid,fans_id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "操作成功", null));
        response.end();
    })
}
path.set("/removeFans", removeFans);

function uploadAvatar(request, response){
    console.log(request.file);
    var uid = request.cookies.uid;
    var avatar_path = request.file.path;
    UserDao.updateAvatar(uid,avatar_path,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
        });
        response.write(respUtil.writeResult("success", "修改成功", null));
        response.end();
    });
}
path.set("/uploadAvatar", uploadAvatar);

function getAvatar(request, response){
    var params = url.parse(request.url, true).query;
    var path = params.path;
    try{
        var data = fs.readFileSync("./" + path);
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(data);
        response.end();
    }catch(e){
        var data = fs.readFileSync("./file/avatar.png");
        response.writeHead(200);
        response.write(data);
        response.end();
    }
}
path.set("/getAvatar", getAvatar);

function getAvatarByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    UserDao.queryUserById(uid,function (result) {
        var avatar_path = result[0] && result[0].avatar;
        try{
            var data = fs.readFileSync("./" + avatar_path);
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            response.write(data);
            response.end();
        }catch(e){
            var data = fs.readFileSync("./file/avatar.png");
            response.writeHead(200);
            response.write(data);
            response.end();
        }
    })
}
path.set("/getAvatarByUid", getAvatarByUid);

module.exports.path = path;