var dbutil = require("./DBUtil");

function querySubBookByUid(uid,success) {
    var querySql = "select * from subscribe where uid = ? order by id desc;";
    var params = [uid];
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

function queryBeSubedBookByMid(master_id,success) {
    var querySql = "select * from subscribe where master_id = ? order by id desc;";
    var params = [master_id];
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

function querySubInfoByBid(bid,success) {
    var querySql = "select * from subscribe where bid = ?;";
    var params = [bid];
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

function insertSub(uid,bid,bname,master_id,c_time,success) {
    var insertSql = "insert into subscribe (`uid`, `bid`, `bname`,`master_id`, `c_time`) values (?, ?, ?, ?, ?)";
    var params = [uid,bid,bname,master_id,c_time,success];
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

module.exports.querySubBookByUid = querySubBookByUid;
module.exports.queryBeSubedBookByMid = queryBeSubedBookByMid;
module.exports.querySubInfoByBid = querySubInfoByBid;
module.exports.insertSub = insertSub;