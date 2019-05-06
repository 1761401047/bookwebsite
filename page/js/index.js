
var hotArticle = new Vue({
    el: "#hot_ar",
    data: {
        hotArticleList: []
    },
    computed: {

    },
    methods:{

    },
    created: function () {
        axios({
            method: "get",
            url: "/getHotArticle"
        }).then(function(resp) {
            hotArticle.hotArticleList = resp.data.data;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});


var newArticle = new Vue({
    el: "#new_ar",
    data: {
        newArticleList: []
    },
    computed: {

    },
    methods:{

    },
    created: function () {
        axios({
            method: "get",
            url: "/getNewArticle"
        }).then(function(resp) {
            newArticle.newArticleList = resp.data.data;
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});

var articleCate = new Vue({
    el: "#ar_cate",
    data: {
        articleList: []
    },
    computed: {
        articleMapList: function () {
            var articleList = this.articleList;
            articleList.sort(function (a,b) {
                return a.id - b.id;
            })
            return articleList;
        }
    },
    methods:{

    },
    created: function () {
        axios({
            method: "get",
            url: "/getArticleList"
        }).then(function(resp) {
            articleCate.articleList = resp.data.data;
            console.log(articleCate.articleList);
        }).catch(function (resp) {
            console.log("请求失败");
        });
    }
});
