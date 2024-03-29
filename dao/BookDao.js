var dbutil = require("./DBUtil");

function insertBook(title,content,cover_path,cover_name,tag,uid,uname,state,c_time,success) {
    var insertSql = "insert into book (`title`, `content`, `cover_path`,`cover_name`, `tag`,`uid`,`uname`, `state`, `c_time`) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    var params = [title,content,cover_path,cover_name,tag,uid,uname,state,c_time];
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

function queryBookByUid(uid,success) {
    var querySql = "select * from book where uid = ? and state = 1 order by id desc;";
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

function queryBookByTag(tag,page,pageSize,success) {
    var querySql = "select * from book where tag = ? and state = 1 order by id desc limit ?, ?;";
    var params = [tag,page * pageSize, pageSize];
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

function queryAllBookByTag(tag,success) {
    var querySql = "select * from book where tag = ? and state = 1 order by id desc;";
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

function deleteBookById(id,success) {
    var deleteSql = "delete from book where id = ?;";
    var params = [id];
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

function queryBookByBookid(id,success) {
    var querySql = "select * from book where id = ?;";
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

function updateBookState(id, success) {
    var updateSql = "update book set state = 2 where id = ?;";
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


function queryBookByKeyword(keyword,page,pageSize,success) {
    var querySql = 'select *  from book where title like "%"?"%" order by id desc limit ?, ?;';
    var params = [keyword, page * pageSize, pageSize];
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

function queryAllBookByKeyword(keyword,success) {
    var querySql = 'select *  from book where title like "%"?"%" order by id desc;';
    var params = [keyword];
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

module.exports.insertBook = insertBook;
module.exports.queryBookByUid = queryBookByUid;
module.exports.deleteBookById = deleteBookById;
module.exports.queryBookByBookid = queryBookByBookid;
module.exports.updateBookState = updateBookState;
module.exports.queryBookByTag = queryBookByTag;
module.exports.queryAllBookByTag = queryAllBookByTag;
module.exports.queryBookByKeyword = queryBookByKeyword;
module.exports.queryAllBookByKeyword = queryAllBookByKeyword;




