var dbutil = require("./DBUtil");

function insertArticle(title, content, uid, uName, views,tag, ctime, success) {
    var insertSql = "insert into article (`title`, `content`, `uid`,`u_name`, `views`, `tag`, `c_time`) values (?, ?, ?, ?, ?, ?, ?)";
    var params = [title, content, uid, uName, views,tag, ctime];
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

function queryHotArticle(page, pageSize, success) {
    var querySql = "select * from article order by views desc limit ?, ?;";
    var params = [page * pageSize, pageSize];

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

function queryNewArticle(page, pageSize, success) {
    var querySql = "select * from article order by id desc limit ?, ?;";
    var params = [page * pageSize, pageSize];

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

function queryArticleCount(success) {
    var querySql = "select count(1) as count from article;";
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

function queryArticleById(id,success) {
    var querySql = "select *  from article where id = ?;";
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

function updateViews(id, success) {
    var updateSql = "update article set views = views + 1 where id = ?;";
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

function queryArticleByUid(uid,success) {
    var querySql = "select * from article where uid = ? order by id desc;";
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

function deleteArticleByArticleId(article_id, success) {
    var deleteSql = "delete from article where id = ?;";
    var params = [article_id];

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

function queryArticleByKeyword(keyword,page,pageSize,success) {
    var querySql = 'select *  from article where title like "%"?"%" or content like "%"?"%" order by id desc limit ?, ?;';
    var params = [keyword, keyword, page * pageSize, pageSize];

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

function queryAllArticleByKeyword(keyword,success) {
    var querySql = 'select *  from article where title like "%"?"%" or content like "%"?"%" order by id desc;';
    var params = [keyword,keyword];

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

module.exports.insertArticle = insertArticle;
module.exports.queryHotArticle = queryHotArticle;
module.exports.queryNewArticle = queryNewArticle;
module.exports.queryArticleById = queryArticleById;
module.exports.queryArticleCount = queryArticleCount;
module.exports.updateViews = updateViews;
module.exports.queryArticleByUid = queryArticleByUid;
module.exports.deleteArticleByArticleId = deleteArticleByArticleId;
module.exports.queryArticleByKeyword = queryArticleByKeyword;
module.exports.queryAllArticleByKeyword = queryAllArticleByKeyword;

