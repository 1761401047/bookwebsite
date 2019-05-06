
var articleDetail = new Vue({
    el: "#ar_detail",
    data: {
        article: {},
        myUid: "",
        myUserName: "",
        article_id: "",
        author_id: "",
        authorInfo: {}
    },
    computed: {

    },
    methods:{
        getArticleDetail: function () {
            axios({
                method: "get",
                url: "/getArticleDetail?id=" + this.article_id
            }).then(function(resp) {
                articleDetail.article = resp.data.data[0];
                articleDetail.author_id = resp.data.data[0].uid;
                articleDetail.getAuthorInfo();
            }).catch(function (resp) {
                console.log("请求失败");
            });
            axios({
                method: "get",
                url: "/increaseViews?id=" + this.article_id
            }).then(function(resp) {
                articleDetail.article.views++;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getAuthorInfo: function () {
            axios({
                method: "get",
                url: "/getUserByUid?uid=" + this.author_id
            }).then(function(resp) {
                var res = resp.data.data[0];
                articleDetail.authorInfo = res;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.article_id = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.myUid = getCookie("uid");
        this.myUserName = decodeURIComponent(getCookie("uname"));
        this.getArticleDetail();
    }
});

var commentArea = new Vue({
    el: "#comment_area",
    data: {
        super_id: -1,
        parent_id: -1,
        parent_name: "",
        articleId: -1,
        comment: "",
        reply_comment: "",
        commentList: "",
        alreadyThumbsUpArr: [],
        totalCount: 0,
        pageSize: 5,
        pageCount: 0,
        nowPage: 1,
        pageArr: [],
        myUid: "",
        myUserName: "",
    },
    computed: {},
    methods: {
        submitComment:function () {
            var articleId = this.articleId;
            var uid = getCookie("uid");
            var uname = getCookie("uname");
            var parentId = -1;
            var superId = -1;
            var parentName = "";
            var content = this.comment;
            if(uid === ""){
                window.location.href = "/login.html";
                return;
            }
            if(content.trim().length < 1){
                alert("请输入内容");
                return;
            }
            axios({
                method: "post",
                url: "/api/uploadComment?articleId=" + articleId + "&uid=" + uid + "&uname=" + uname + "&parentId=" + parentId + "&superId=" + superId + "&parentName=" + parentName,
                data:{
                    content: content
                }
            }).then(function(resp) {
                console.log(resp);
                commentArea.comment = "";
                commentArea.getComment(1);
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        replayComent: function () {
            var articleId = this.articleId;
            var uid = getCookie("uid");
            var uname = getCookie("uname");
            var parentId = this.parent_id;
            var superId = this.super_id;
            var parentName = this.parent_name;
            var content = this.reply_comment;
            if(uid === ""){
                window.location.href = "/login.html";
                return;
            }
            if(content.trim().length < 1){
                alert("请输入内容");
                return;
            }
            axios({
                method: "post",
                url: "/api/uploadComment?articleId=" + articleId + "&uid=" + uid + "&uname=" + uname + "&parentId=" + parentId + "&superId=" + superId + "&parentName=" + parentName,
                data:{
                    content: content
                }
            }).then(function(resp) {
                console.log(resp);
                commentArea.reply_comment = "";
                commentArea.getComment(commentArea.nowPage);
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        clickReplyBtn: function (e) {
            console.log(e);
            this.super_id = e.target.dataset.super_id;
            this.parent_id = e.target.dataset.parent_id;
            this.parent_name = e.target.dataset.parent_name;
            console.log(this.super_id );
        },
        getComment: function (page) {
            axios({
                method: "get",
                url: "/getComment?articleId=" + this.articleId + "&page=" +page
            }).then(function(resp) {
                console.log(resp);
                commentArea.commentList = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        thumbsUp: function (id) {
            var len = this.alreadyThumbsUpArr.length;
            for(var i = 0; i < len; i++){
                if(id === this.alreadyThumbsUpArr[i]){
                    alert("你已经点赞过了");
                    return;
                }
            }
            this.alreadyThumbsUpArr.push(id);
            this.$refs["thup" + id][0].innerHTML = parseInt(this.$refs["thup" + id][0].innerHTML) + 1;
            axios({
                method: "get",
                url: "/increaseThumbsUp?id=" + id
            }).then(function(resp) {

            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        clickPaging: function(e){
            var pageIndex = parseInt(e.target.dataset.page_index);
            this.nowPage = pageIndex;
            console.log(this.nowPage)
            this.getComment(this.nowPage);
            this.updatePaging();
        },
        getPaging: function () {
            axios({
                method: "get",
                url: "/getCommentCount?article_id=" + this.articleId
            }).then(function(resp) {
                var count = resp.data.data[0].count;
                commentArea.totalCount = count;
                commentArea.pageCount = Math.ceil(count / commentArea.pageSize);
                commentArea.updatePaging();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        updatePaging: function () {
            var result = [];
            var nowPage = this.nowPage;
            result.push({text:"<<", page: 1});
            if (nowPage > 2) {
                result.push({text:nowPage - 2, page:nowPage - 2});
            }
            if (nowPage > 1) {
                result.push({text:nowPage - 1, page:nowPage - 1});
            }
            result.push({text:nowPage, page:nowPage});
            if (nowPage + 1 <= this.pageCount) {
                result.push({text:nowPage + 1, page: nowPage + 1});
            }
            if (nowPage + 2 <= this.pageCount) {
                result.push({text:nowPage + 2, page: nowPage + 2});
            }
            result.push({text:">>", page: this.pageCount});
            this.pageArr = result;
            console.log(this.pageArr);
        }
    },
    created: function () {
        var articleId = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.articleId = articleId;
        this.myUid = getCookie("uid");
        this.myUserName = decodeURIComponent(getCookie("uname"));
        console.log(this.myUid,this.myUserName)
        this.getComment(this.nowPage);
        this.getPaging();
    }
})