var store = new Vuex.Store({
    state: {
        uid: "",
        userName: "",
        myUid: "",
        myUserName: "",
        fansArr: []
    },
});

var banner = new Vue({
    el: "#banner",
    data: {
        uid: "",
        userName: "",
        myUid: "",
        myUserName: "",
        isFollowed: false
    },
    store,
    computed: {

    },
    methods:{
        follow: function(){
            axios({
                method: "get",
                url: "/addFans?uid=" + this.uid + "&fans_id=" + this.myUid
            }).then(function(resp) {
                alert("关注成功");
                banner.isFollowed = true;
                banner.getFansList();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        cancelFollow: function(){
            axios({
                method: "get",
                url: "/removeFans?uid=" + this.uid + "&fans_id=" + this.myUid
            }).then(function(resp) {
                alert("取消关注成功");
                banner.isFollowed = false;
                banner.getFansList();
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getFansList: function(){
            axios({
                method: "get",
                url: "/getFansByUid?uid=" + this.uid
            }).then(function(resp) {
                banner.$store.state.fansArr = resp.data.data;
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        judgeIsFollowed: function(){
            axios({
                method: "get",
                url: "/getFansByUid?uid=" + this.uid
            }).then(function(resp) {
                var fansArr = resp.data.data;
                var len = fansArr.length;
                for(var i = 0; i < len; i++){
                    if(fansArr[i].id == banner.myUid){
                        banner.isFollowed = true;
                        return;
                    }
                }
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
    },
    created: function () {
        var uid = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.uid = uid;
        this.myUid = getCookie("uid");
        this.myUserName = decodeURIComponent(getCookie("uname"));
        this.$store.state.uid = this.uid;
        this.$store.state.myUid = this.myUid;
        this.$store.state.myUserName = this.myUserName;
        this.judgeIsFollowed();
        if(this.uid == this.myUid){
            location.href = "/userCenter.html";
        }
        axios({
            method: "get",
            url: "/getUserByUid?uid=" + this.uid
        }).then(function(resp) {
            banner.userName = resp.data.data[0].user_name;
            banner.$store.state.userName = banner.userName;
        }).catch(function (resp) {
            console.log("请求失败");
        });
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
        showMore: function () {
            console.log("showMore")
            this.isMore = true;
        },
        hideMore: function () {
            this.isMore = false;
        }
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getArticleList();
        var _this = this;
        var timer = setInterval(function () {
            console.log(_this.$store)
            if(_this.$store.state.userName){
                _this.userName = _this.$store.state.userName;
                clearInterval(timer);
            }
        },100);
    }
});


var bookArea = new Vue({
    el: "#book_area",
    data: {
        uid: "",
        userName: "",
        bookList: []
    },
    store,
    computed: {

    },
    methods:{
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
    },
    created: function () {
        this.uid = this.$store.state.uid;
        this.getBookList();
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


