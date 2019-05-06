var dbutil = require("./DBUtil");

function queryFansByUid(uid,success) {
    var querySql = "select * from fans where uid = ? order by id desc;";
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

function queryFollowByUid(uid, success) {
    var querySql = "select * from fans where fans_id = ? order by id desc;";
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

function insertFans(uid,fans_id,c_time,success) {
    var insertSql = "insert into fans (`uid`, `fans_id`, `c_time`) values (?, ?, ?)";
    var params = [uid,fans_id,c_time,];
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

function deleteFans(uid,fans_id,success) {
    var deleteSql = "delete from fans where uid = ? and fans_id = ?;";
    var params = [uid,fans_id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(deleteSql, params, function (error, result) {
        if (error == null) {
            success(result);
        } else {
            console.log(error);
        }
    });
    connection.end();
}

module.exports.queryFansByUid = queryFansByUid;
module.exports.queryFollowByUid = queryFollowByUid;
module.exports.insertFans = insertFans;
module.exports.deleteFans = deleteFans;