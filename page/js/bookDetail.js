var bookDetail = new Vue({
    el: "#book_detail",
    data: {
        myUid: "",
        bid: "",
        isSub: false,
        bookInfo: {},
        userInfo: {}
    },
    computed: {

    },
    methods:{
        getBookInfo: function(){
            axios({
                method: "get",
                url: "/getBookInfo?id=" + this.bid
            }).then(function(resp) {
                bookDetail.bookInfo = resp.data.data[0];
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getUserInfo: function(){
            axios({
                method: "get",
                url: "/getUserByUid?uid=" + this.myUid
            }).then(function(resp) {
                bookDetail.userInfo = resp.data.data[0];
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        getSubInfo:function(){
            axios({
                method: "get",
                url: "/getSubInfo?bid=" + this.bid
            }).then(function(resp) {
                console.log(resp.data.data[0]);
                var res = resp.data.data[0];
                if(res.uid == bookDetail.myUid){
                    bookDetail.isSub = true;
                }
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        subscribe: function () {
            if(this.myUid === ""){
                window.location.href = "/login.html";
            }else{
                if(this.userInfo.coin < 1){
                    alert("换书币余额不足")
                    return;
                }
                axios({
                    method: "get",
                    url: "/subscribeBook?uid=" + this.myUid + "&bid=" + this.bookInfo.id + "&bname=" + this.bookInfo.title + "&master_id=" + this.bookInfo.uid
                }).then(function(resp) {
                    alert("订阅成功");
                    bookDetail.getSubInfo()
                }).catch(function (resp) {
                    console.log("请求失败");
                });
            }
        }
    },
    created: function () {
        this.myUid = getCookie("uid");
        this.bid = decodeURIComponent(location.search).slice(1).split('=')[1].trim();
        this.getBookInfo();
        this.getSubInfo();
        this.getUserInfo();
    }
});