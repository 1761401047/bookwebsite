var dbutil = require("./DBUtil");

function queryUserByAccount(account,success) {
    var querySql = "select * from user where account = ?;";
    var params = [account];
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

function queryUserByName(userName,success) {
    var querySql = "select * from user where user_name = ?;";
    var params = [userName];
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

function queryUserByqqNum(qqNum,success) {
    var querySql = "select * from user where qqNum = ?;";
    var params = [qqNum];
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

function insertUser(userName,account,password,qqNum,coin,createTime,success) {
    var insertSql = "insert into user (`user_name`, `account`, `password`,`qqNum`,`coin`, `c_time`) values (?, ?, ?, ?, ?, ?)";
    var params = [userName,account,password,qqNum,coin,createTime];
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

function queryUserById(id,success) {
    var querySql = "select * from user where id = ?;";
    var params = [id];
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

function updateAddCoin(id, success) {
    var updateSql = "update user set coin = coin + 1 where id = ?;";
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

function updateReduceCoin(id, success) {
    var updateSql = "update user set coin = coin - 1 where id = ?;";
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

function updateAvatar(id,avatar_path, success) {
    var updateSql = "update user set avatar = ? where id = ?;";
    var params = [avatar_path,id];
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

module.exports.queryUserByAccount = queryUserByAccount;
module.exports.queryUserByName = queryUserByName;
module.exports.queryUserByqqNum = queryUserByqqNum;
module.exports.insertUser = insertUser;
module.exports.queryUserById = queryUserById;
module.exports.updateAddCoin = updateAddCoin;
module.exports.updateReduceCoin = updateReduceCoin;
module.exports.updateAvatar = updateAvatar;





