var ArticleDao = require("../dao/ArticleDao");
var TagDao = require("../dao/TagDao");
var BookDao = require("../dao/BookDao");
var UserDao = require("../dao/UserDao");
var SubscribeDao = require("../dao/SubscribeDao")
var ArticleTagMappingDao = require("../dao/ArticleTagMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");
var fs = require("fs");

var path = new Map();

function uploadBook(request, response){
    console.log("file:",request.file)
    var title = request.body.title;
    var tag = request.body.tag;
    var content = request.body.desc;
    var uid = request.cookies.uid;
    var uname = request.cookies.uname;
    var cover_path = request.file.path;
    var cover_name = request.file.originalname;
    var state = 1;
    var c_time = timeUtil.getNow();
    BookDao.insertBook(title,content,cover_path,cover_name,tag,uid,uname,state,c_time,function (result) {
        UserDao.updateAddCoin(uid,function (result) {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            response.write(respUtil.writeResult("success", "添加成功", null));
            response.end();
        })
    });
}
path.set("/uploadBook", uploadBook);

function getBookListByUid(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    BookDao.queryBookByUid(uid,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}
path.set("/getBookListByUid", getBookListByUid);

function getBookPic(request, response){
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
        response.writeHead(404);
        response.end();
    }
}
path.set("/getBookPic", getBookPic);

function deleteBook(request, response){
    var params = url.parse(request.url, true).query;
    var uid = request.cookies.uid;
    var id = params.id;
    BookDao.deleteBookById(id,function (result) {
        UserDao.updateReduceCoin(uid,function (result) {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8",
            });
            response.write(respUtil.writeResult("success", "删除成功", null));
            response.end();
        })
    })
}
path.set("/deleteBook", deleteBook);

function getBookInfo(request, response){
    var params = url.parse(request.url, true).query;
    var id = params.id;
    BookDao.queryBookByBookid(id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "添加成功", result));
        response.end();
    })
}
path.set("/getBookInfo", getBookInfo);

function subscribeBook(request, response){
    var params = url.parse(request.url, true).query;
    var uid = request.cookies.uid;
    var bid = params.bid;
    var bname = params.bname;
    var master_id = params.master_id;
    var c_time = timeUtil.getNow();
    SubscribeDao.insertSub(uid,bid,bname,master_id,c_time,function (result) {
        UserDao.updateReduceCoin(uid,function (result) {
            BookDao.updateBookState(bid,function (result) {
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(respUtil.writeResult("success", "添加成功", null));
                response.end();
            })
        })
    })
}
path.set("/subscribeBook", subscribeBook);

function getSubInfo(request, response){
    var params = url.parse(request.url, true).query;
    var bid = params.bid;
    SubscribeDao.querySubInfoByBid(bid,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/getSubInfo", getSubInfo);

function getSubBook(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    SubscribeDao.querySubBookByUid(uid,function (result) {
        var len = result.length;
        var resArr = [];
        for(var i = 0; i < len; i++){
            var bid = result[i].bid;
            BookDao.queryBookByBookid(bid,function (result) {
                var uid = result[0].uid;
                UserDao.queryUserById(uid,function (result1) {
                    result[0].userInfo = result1[0];
                    resArr.push(result[0]);
                })
            })
        }
        var timer = setInterval(function () {
            if(resArr.length === len){
                clearInterval(timer);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(respUtil.writeResult("success", "查询成功", resArr));
                response.end();
            }
        },100)
    })
}
path.set("/getSubBook", getSubBook);

function getBeSubedBook(request, response){
    var params = url.parse(request.url, true).query;
    var mid = params.mid;
    SubscribeDao.queryBeSubedBookByMid(mid,function (result1) {
        var len = result1.length;
        var resArr = [];
        for(var i = 0; i < len; i++){
            var bid = result1[i].bid;
            var uid = result1[i].uid;
            (function (uid) {
                BookDao.queryBookByBookid(bid,function (result2) {
                    UserDao.queryUserById(uid,function (result3) {
                        result2[0].userInfo = result3[0];
                        resArr.push(result2[0]);
                    })
                })
            })(uid)
        }
        var timer = setInterval(function () {
            if(resArr.length === len){
                clearInterval(timer);
                console.log(resArr);
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(respUtil.writeResult("success", "查询成功", resArr));
                response.end();
            }
        },100)
    })
}
path.set("/getBeSubedBook", getBeSubedBook);

function getBookList(request, response){
    TagDao.queryAllTag(function (result1) {
        var len = result1.length;
        var resArr = [];
        for(var i = 0; i < len; i++){
            var tag = result1[i].tag;
            (function (i) {
                BookDao.queryBookByTag(tag,0,5,function (result2) {
                    var tag = result1[i].tag;
                    var tid = result1[i].id;
                    resArr[i] = {};
                    resArr[i].tag = tag;
                    resArr[i].tid = tid;
                    resArr[i].content = result2;
                })
            })(i)
        }
        var timer = setInterval(function () {
            if(resArr.length = len){
                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8"
                });
                response.write(respUtil.writeResult("success", "查询成功", resArr));
                response.end();
                clearInterval(timer);
            }
        },100);

    })
}
path.set("/getBookList", getBookList);

module.exports.path = path;