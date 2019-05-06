var dbutil = require("./DBUtil");

function queryArticleIdByTagId(tagId, page, pageSize, success) {
    var querySql = "select * from article_tag_mapping where tag_id = ? order by id desc limit ?, ?;";
    var params = [tagId,page * pageSize,pageSize];
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

function insertArticleIdTagMap(articleId, tagId, ctime, success) {
    var insertSql = "insert into article_tag_mapping (`article_id`, `tag_id`, `c_time`) values (?, ?, ?)";
    var params = [articleId,tagId,ctime];
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

function queryCountByTagId(tagId,success) {
    var querySql = "select count(1) as count from article_tag_mapping where tag_id = ?;";
    var params = [tagId];
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

module.exports.queryArticleIdByTagId = queryArticleIdByTagId;
module.exports.insertArticleIdTagMap = insertArticleIdTagMap;
module.exports.queryCountByTagId = queryCountByTagId;