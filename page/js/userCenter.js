var store = new Vuex.Store({
    state: {
        uid: "",
        userName: "",
        avatar: "",
        coin: 0
    },
});

var headerInfo = new Vue({
    el: "#header_info",
    data: {
        uid: "",
        userName: ""
    },
    computed: {

    },
    store,
    methods:{
        setCookie: function(name,value,time){
            if(typeof(time) == 'number'){
                document.cookie = name + '=' + value + ';max-age=' + time;
            }else{
                document.cookie = name + '=' + value + ';expires=' + time;
            }
            return this;
        },
        removeCookie: function(name){
            return this.setCookie(name,'',-1);
        },
        signOut: function () {
            this.removeCookie("uid");
            this.removeCookie("uname");
            window.location.reload();
        }
    },
    created: function () {
        this.uid = getCookie("uid");
        this.userName = decodeURIComponent(getCookie("uname"));
        this.$store.state.uid = this.uid;
        this.$store.state.userName = this.userName;
    }
});
var banner = new Vue({
    el: "#banner",
    data: {
        uid: "",
        userName: "",
        myInfo: {}
    },
    computed: {

    },
    store,
    methods:{
        changeAvatar: function(e){
            console.log(e)
            var file = e.target.files[0];
            if(file.type.indexOf("image") == 0) {
                var form = new FormData();
                form.append("file",file);
                axios({
                    method: "post",
                    url: "/uploadAvatar",
                    data: form
                }).then(function(resp) {
                    banner.getMyInfo();
                    alert("头像修改成功");
                }).catch(function (resp) {
                    console.log("请求失败");
                });
            }else{
                alert("文件类型错误，请上传图片类型文件");
            }
        },
        getMyInfo: function () {
            axios({
                method: "get",
                url: "/getUserByUid?uid=" + this.uid
            }).then(function(resp) {
                var res = resp.data.data[0];
                banner.myInfo = res;
                banner.$store.state.avatar = res.avatar;
                banner.$store.state.coin = res.coin;
                console.log(res);
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.userName = this.$store.state.userName;
        this.getMyInfo();
    }
});

var articleArea = new Vue({
    el: "#article_area",
    data: {
        uid: "",
        userName: "",
        articleArr: [],
        isMore: false
    },
    store,
    computed: {

    },
    methods:{
        getArticleList: function(){
            axios({
                method: "get",
                url: "/getArticleByUid?uid=" + this.uid
            }).then(function(resp) {
                var res = resp.data.data;
                articleArea.articleArr = res;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        deleteArticle: function (article_id,title) {
            var res = window.confirm("是否确定删除：" + title);
            if(res){
                axios({
                    method: "get",
                    url: "/deleteArticleById?article_id=" + article_id
                }).then(function(resp) {
                    articleArea.getArticleList();
                    window.alert("删除成功");
                }).catch(function (resp) {
                    console.log("请求失败");
                });
            }
        },
        showMore: function () {
            console.log("showMore")
            this.isMore = true;
        },
        hideMore: function () {
            this.isMore = false;
        }
    },
    created: function () {
        console.log(this.$store);
        this.uid = this.$store.state.uid;
        this.userName = this.$store.state.userName;
        this.getArticleList();
    }
});

var bookArea = new Vue({
    el: "#book_area",
    data: {
        uid: -1,
        bookBoxShow: false,
        bookList: [],
        bookName: "",
        bookDesc: "",
        coverUrl: "",
        isMore: false
    },
    store,
    computed: {

    },
    methods:{
        showMore: function () {
            this.isMore = true;
        },
        hideMore: function () {
            this.isMore = false;
        },
        deleteBook: function(id,bookName){
            var res = window.confirm("是否确定删除书籍：" + bookName);
            if(!res){
                return;
            }
            axios({
                method: "get",
                url: "/deleteBook?id=" + id,
            }).then(function(resp) {
                bookArea.getBookList();
                bookArea.$store.state.coin--;
                alert("删除成功");
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getBookList: function(){
            axios({
                method: "get",
                url: "/getBookListByUid?uid=" + this.uid,
            }).then(function(resp) {
                bookArea.bookList = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        openBookbox: function () {
            this.bookBoxShow = true;
        },
        closeBookbox: function () {
            this.bookBoxShow = false;
        },
        changeImg: function(e){
            console.log(e)
            var file = e.target.files[0];
            if(file.type.indexOf("image") == 0) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    // 图片base64化
                    var newUrl = this.result;
                    bookArea.coverUrl = newUrl;
                };
                reader.readAsDataURL(file);
            }else{
                alert("类型错误，请上传图片类型文件");
                bookArea.coverUrl = "";
            }
        },
        upload: function () {
            var fileList = this.$refs.coverImg.files;
            var tag = this.$refs.tagEle.value;
            var title = this.bookName;
            var desc = this.bookDesc;
            var form = new FormData();
            if(title == ""){
                alert("请输入书籍名称");
                return;
            }else if(fileList.length == 0){
                alert(("请上传封面图片"));
                return;
            }else if(fileList[0].type.indexOf("image") == -1){
                alert("请上传图片类型文件");
                return;
            } else if(desc == ""){
                alert("请输入书籍描述");
                return;
            }
            var file = fileList[0];
            form.append("file",file);
            form.append("title",title);
            form.append("tag",tag);
            form.append("desc",desc);
            console.log("upload")
            axios({
                method: "post",
                url: "/uploadBook",
                data: form
            }).then(function(resp) {
                alert("书籍上传成功");
                bookArea.getBookList();
                bookArea.$store.state.coin++;
                bookArea.coverUrl = "";
                bookArea.bookName = "";
                bookArea.bookDesc = "";
                bookArea.bookBoxShow = false;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getBookList();
    }
});

var mySubArea = new Vue({
    el: "#mySub_area",
    data: {
        uid: "",
        subBookList: [],
        isMore: false
    },
    store,
    computed: {

    },
    methods:{
        showMore: function () {
            console.log("showMore")
            this.isMore = true;
        },
        hideMore: function () {
            this.isMore = false;
        },
        getSubBookList: function () {
            axios({
                method: "get",
                url: "/getSubBook?uid=" + this.uid
            }).then(function(resp) {
                console.log(resp.data.data);
                mySubArea.subBookList = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getSubBookList();
    }
});

var subed_area = new Vue({
    el: "#subed_area",
    data: {
        uid: "",
        subedBookList: [],
        isMore: false
    },
    store,
    computed: {

    },
    methods:{
        showMore: function () {
            this.isMore = true;
        },
        hideMore: function () {
            this.isMore = false;
        },
        getBeSubedBookList: function () {
            axios({
                method: "get",
                url: "/getBeSubedBook?mid=" + this.uid
            }).then(function(resp) {
                console.log(resp.data.data);
                subed_area.subedBookList = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getBeSubedBookList();
    }
});

var fansArea = new Vue({
    el: "#fans_area",
    data: {
        uid: "",
        userName: "",
        fansArr: []
    },
    store,
    computed: {

    },
    methods:{
        getFansList: function(){
            axios({
                method: "get",
                url: "/getFansByUid?uid=" + this.uid
            }).then(function(resp) {
                fansArea.fansArr = resp.data.data;
                fansArea.$store.state.fansArr = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getFansList();
    }
});

var followArea = new Vue({
    el: "#follow_area",
    data: {
        uid: "",
        userName: "",
        followArr: []
    },
    store,
    computed: {

    },
    methods:{
        cancelFollow: function(uid,uname){
            var res = window.confirm("是否确定取消关注：" + uname);
            if(!res){
                return;
            }
            axios({
                method: "get",
                url: "/removeFans?uid=" + uid + "&fans_id=" + this.uid
            }).then(function(resp) {
                alert("取消关注成功");
                followArea.getFollowList();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getFollowList: function(){
            axios({
                method: "get",
                url: "/getFollowByUid?uid=" + this.uid
            }).then(function(resp) {
                console.log(resp.data.data);
                followArea.followArr = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getFollowList();
    }
});
