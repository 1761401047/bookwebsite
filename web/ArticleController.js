var ArticleDao = require("../dao/ArticleDao");
var TagDao = require("../dao/TagDao");
var ArticleTagMappingDao = require("../dao/ArticleTagMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function getArticleList(request, response) {
    TagDao.queryAllTag(function (result1) {
        var len = result1.length;
        var resArr = [];
        for(var i = 0; i < len; i++) {
            getArticle(result1[i],resArr)
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
    });
}
function getArticle(res,resArr){
    ArticleTagMappingDao.queryArticleIdByTagId(res.id, 0, 5, function (result2) {
        var len2 = result2.length;
        var obj = {};
        obj.id = res.id;
        obj.tag = res.tag;
        obj.content = [];
        for(var i = 0; i < len2; i++){
            ArticleDao.queryArticleById(result2[i].article_id, function (result3) {
                obj.content.push(result3[0]);
            })
        }
        var timer = setInterval(function () {
            if(obj.content.length === len2){
                resArr.push(obj);
                clearInterval(timer);
            }
        },100)
    })
}
path.set("/getArticleList", getArticleList);

function getArticleListByTag(request, response){
    var params = url.parse(request.url, true).query;
    var tag = params.tag;
    var page = params.page;
    var resArr = [];
    TagDao.queryTagId(tag,function (result1) {
        var tagId = result1[0].id;
        ArticleTagMappingDao.queryArticleIdByTagId(tagId,page - 1,5,function (result2) {
           var len = result2.length;
           for(var i = 0; i < len; i++){
               ArticleDao.queryArticleById(result2[i].article_id,function (result3) {
                   resArr.push(result3[0]);
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
    })
}
path.set("/getArticleListByTag", getArticleListByTag);

function getHotArticle(request, response){
    ArticleDao.queryHotArticle(0,5,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/getHotArticle", getHotArticle);

function getNewArticle(request, response){
    ArticleDao.queryNewArticle(0,5,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/getNewArticle", getNewArticle);

function getArticleDetail(request, response){
    var params = url.parse(request.url, true).query;
    var id = params.id;
    ArticleDao.queryArticleById(id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/getArticleDetail", getArticleDetail);

function uploadArticle(request, response){
    var params = url.parse(request.url, true).query;
    var uid = params.uid;
    var uname = params.uname;
    var title = params.title;
    var tag = params.tag;
    var view = 0;
    var ctime = timeUtil.getNow();
    request.on('data',function (data) {
        var content = data.toString();
        ArticleDao.insertArticle(title,content,uid,uname,view,tag,ctime,function (result) {
            var articleId = result.insertId;
            TagDao.queryTagId(tag,function (result) {
                var tagId = result[0].id;
                ArticleTagMappingDao.insertArticleIdTagMap(articleId, tagId, ctime,function (result) {
                    response.writeHead(200, {
                        "Content-Type": "text/html; charset=utf-8"
                    });
                    response.write(respUtil.writeResult("success", "提交成功", null));
                    response.end();
                })
            })
        })
    })
}
path.set("/uploadArticle", uploadArticle);

function getCountByTag(request, response){
    var params = url.parse(request.url, true).query;
    var tag = params.tag;
    var resArr = [];
    TagDao.queryTagId(tag,function (result1) {
        var tagId = result1[0].id;
        ArticleTagMappingDao.queryCountByTagId(tagId,function (result2) {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            response.write(respUtil.writeResult("success", "提交成功", result2[0]));
            response.end();
        })
    })
}
path.set("/getCountByTag", getCountByTag);

function increaseViews(request, response){
    var params = url.parse(request.url, true).query;
    var article_id = params.id;
    ArticleDao.updateViews(article_id,function (result1) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
    })
}
path.set("/increaseViews", increaseViews);

module.exports.path = path;