var bookCate = new Vue({
    el: "#book_cate",
    data: {
        bookList: []
    },
    computed: {

    },
    methods:{
        getBookList: function () {
            axios({
                method: "get",
                url: "/getBookList"
            }).then(function(resp) {
                bookCate.bookList = resp.data.data;
                bookCate.bookList.sort(function (a,b) {
                    return a.tid - b.tid;
                })
                console.log(bookCate.bookList);
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.getBookList();
    }
});