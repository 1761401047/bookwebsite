var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookieParser = require("cookie-parser");
var multer = require("multer");

var app = new express();
var uploadTool = multer({dest: "./file"});
app.use(cookieParser());

app.get(["/userCenter.html","/editArticle.html","/api/*"],function (request, response, next) {
    if(request.cookies.uid){
        next();
    }else{
        response.redirect("/login.html");
    }
})

app.use(express.static("./page/"));

app.get("/getArticleList", loader.get("/getArticleList"));
app.get("/getArticleListByTag",loader.get("/getArticleListByTag"));
app.get("/getHotArticle",loader.get("/getHotArticle"));
app.get("/getNewArticle",loader.get("/getNewArticle"));
app.get("/getArticleDetail",loader.get("/getArticleDetail"));
app.post("/login",loader.get("/login"));
app.post("/register",loader.get("/register"));
app.post("/uploadArticle",loader.get("/uploadArticle"));
app.post("/api/uploadComment",loader.get("/uploadComment"));
app.get("/getComment",loader.get("/getComment"));
app.get("/getCountByTag",loader.get("/getCountByTag"));
app.get("/increaseViews",loader.get("/increaseViews"));
app.get("/increaseThumbsUp",loader.get("/increaseThumbsUp"));
app.get("/getCommentCount",loader.get("/getCommentCount"));
app.get("/getArticleByUid",loader.get("/getArticleByUid"));
app.get("/deleteArticleById",loader.get("/deleteArticleById"));
app.get("/getUserByUid",loader.get("/getUserByUid"));
app.get("/getFansByUid",loader.get("/getFansByUid"));
app.get("/getFollowByUid",loader.get("/getFollowByUid"));
app.get("/addFans",loader.get("/addFans"));
app.get("/removeFans",loader.get("/removeFans"));
app.post("/uploadBook",uploadTool.single("file"),loader.get("/uploadBook"));
app.get("/getBookListByUid",loader.get("/getBookListByUid"));
app.get("/getBookPic",loader.get("/getBookPic"));
app.get("/deleteBook",loader.get("/deleteBook"));
app.get("/getBookInfo",loader.get("/getBookInfo"));
app.get("/subscribeBook",loader.get("/subscribeBook"));
app.get("/getSubInfo",loader.get("/getSubInfo"));
app.get("/getSubBook",loader.get("/getSubBook"));
app.get("/getBeSubedBook",loader.get("/getBeSubedBook"));
app.post("/uploadAvatar",uploadTool.single("file"),loader.get("/uploadAvatar"));
app.get("/getAvatar",loader.get("/getAvatar"));
app.get("/getAvatarByUid",loader.get("/getAvatarByUid"));


app.listen(globalConfig.port, function() {
    console.log("服务器已启动");
});
