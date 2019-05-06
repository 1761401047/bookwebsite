
var contentBox = new Vue({
    el: "#content_box",
    data: {
        tag: '',
        articleList: [],
        totalCount: 0,
        pageSize: 5,
        pageCount: 0,
        nowPage: 1,
        pageArr: []
    },
    computed: {

    },
    methods:{
        getArticleList: function (page) {
            axios({
                method: "get",
                url: "/getArticleListByTag?tag=" + this.tag + "&page=" + page,
            }).then(function(resp) {
                contentBox.articleList = resp.data.data;
                console.log(contentBox.articleList);
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getPaging: function () {
            axios({
                method: "get",
                url: "/getCountByTag?tag=" + this.tag
            }).then(function(resp) {
                console.log(resp);
                var count = resp.data.data.count;
                console.log("count:",count);
                contentBox.totalCount = count;
                contentBox.pageCount = Math.ceil(count / contentBox.pageSize);
                console.log(contentBox.pageCount);
                contentBox.updatePaging();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        clickPaging: function(e){
            var pageIndex = parseInt(e.target.dataset.page_index);
            this.nowPage = pageIndex;
            this.getArticleList(this.nowPage);
            this.updatePaging();
        },
        updatePaging: function () {
            var result = [];
            var nowPage = this.nowPage;
            console.log("nowPage:", nowPage);
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
        var tag = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.tag = tag;
        this.getArticleList(this.nowPage);
        this.getPaging();
    }
});
