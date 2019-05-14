var bookArea = new Vue({
    el: "#book_area",
    data: {
        keyword: "",
        totalCount: 0,
        pageCount: 1,
        pageSize: 10,
        nowPage: 1,
        pageArr: [],
        bookList: []
    },
    computed: {

    },
    methods:{
        getBookList: function (page) {
            axios({
                method: "get",
                url: `/getBookListByKeyword?keyword=${this.keyword}&page=${page}&pageSize=${this.pageSize}`
            }).then(function(resp) {
                bookArea.bookList = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getPaging: function () {
            axios({
                method: "get",
                url: "/getBookCountByKeyword?keyword=" + this.keyword
            }).then(function(resp) {
                var count = resp.data.data.count;
                bookArea.totalCount = count;
                bookArea.pageCount = Math.ceil(count / bookArea.pageSize);
                bookArea.updatePaging();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        clickPaging: function(e){
            var pageIndex = parseInt(e.target.dataset.page_index);
            this.nowPage = pageIndex;
            this.getBookList(this.nowPage);
            this.updatePaging();
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
        }
    },
    created: function () {
        var keyword = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.keyword = keyword;
        this.getBookList(1);
        this.getPaging();
    }
});