var dbutil = require("./DBUtil");

function queryAllTag(success) {
    var querySql = "select * from tag;";
    var params = [];
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

function queryTagId(tag, success) {
    var querySql = "select id from tag where tag = ?;";
    var params = [tag];
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

module.exports.queryAllTag = queryAllTag;
module.exports.queryTagId = queryTagId;