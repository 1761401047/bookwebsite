var dbutil = require("./DBUtil");

function insertComment(article_id,uid,uname,parent_id,super_id,parent_name,content,thumbs_up,ctime,success) {
    console.log(article_id);
    var insertSql = "insert into comment (`article_id`, `uid`, `user_name`,`parent_id`, `super_id`,`parent_name`, `content`, `thumbs_up`, `c_time`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [article_id,uid,uname,parent_id,super_id,parent_name,content,thumbs_up,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentByArticleId(article_id,page,pageSize,success) {
    console.log(article_id);
    var querySql = "select * from comment where article_id = ? and parent_id = -1 order by id desc limit ?, ?;";
    var params = [article_id,page * pageSize, pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryReplyBySuperId(super_id,success) {
    var querySql = "select * from comment where super_id = ? order by id;";
    var params = [super_id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function updateThumbsUp(id, success) {
    var updateSql = "update comment set thumbs_up = thumbs_up + 1 where id = ?;";
    var params = [id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

function queryCommentCountByArticleId(article_id,success) {
    var querySql = "select count(1) as count from comment where article_id = ? and parent_id = -1;";
    var params = [article_id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertComment = insertComment;
module.exports.queryCommentByArticleId = queryCommentByArticleId;
module.exports.queryReplyBySuperId = queryReplyBySuperId;
module.exports.updateThumbsUp = updateThumbsUp;
module.exports.queryCommentCountByArticleId = queryCommentCountByArticleId;
