var CommentDao = require("../dao/CommentDao");
var respUtil = require("../util/RespUtil");
var timeUtil = require("../util/TimeUtil");
var url = require("url");

var path = new Map();

function uploadComment(request, response){
    var params = url.parse(request.url, true).query;
    var article_id = params.articleId;
    var uid = params.uid;
    var uname = params.uname;
    var parent_id = params.parentId;
    var super_id = params.superId;
    var parent_name = params.parentName;
    var thumbs_up = 0;
    var ctime = parseInt(timeUtil.getNow());
    request.on('data',function (data) {
        var content = JSON.parse(data.toString()).content;
        CommentDao.insertComment(article_id,uid,uname,parent_id,super_id,parent_name,content,thumbs_up,ctime,function (result) {
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            response.write(respUtil.writeResult("success", "发送成功", null));
            response.end();
        })
    })

}
path.set("/uploadComment", uploadComment);


function getComment(request, response){
    var params = url.parse(request.url, true).query;
    var article_id = params.articleId;
    var page = params.page - 1;
    CommentDao.queryCommentByArticleId(article_id,page,5,function (result) {
        var len = result.length;
        var resArr = result;
        for(var i = 0; i < len; i++){
            (function (i) {
                CommentDao.queryReplyBySuperId(result[i].id,function (result) {
                    resArr[i].children = result;
                })
            })(i)
        }
        var timer = setInterval(function () {
            for(var i = 0; i < len; i++){
                if(!resArr[i].content){
                    return;
                }
            }
            clearInterval(timer);
            response.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });
            response.write(respUtil.writeResult("success", "发送成功", resArr));
            response.end();
        },100)
    })
}
path.set("/getComment", getComment);

function increaseThumbsUp(request, response){
    var params = url.parse(request.url, true).query;
    var comment_id = params.id;
    CommentDao.updateThumbsUp(comment_id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "添加成功", null));
        response.end();
    })
}
path.set("/increaseThumbsUp", increaseThumbsUp);

function getCommentCount(request, response){
    var params = url.parse(request.url, true).query;
    var article_id = params.article_id;
    CommentDao.queryCommentCountByArticleId(article_id,function (result) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });
        response.write(respUtil.writeResult("success", "查询成功", result));
        response.end();
    })
}
path.set("/getCommentCount", getCommentCount);

module.exports.path = path;