var headerInfo = new Vue({
    el: "#header_info",
    data: {
        uid: "",
        userName: "",
    },
    computed: {

    },
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
        getCookie: function(name){
            var allCookieArr = document.cookie.split('; '),
                len = allCookieArr.length
            for(var i = 0; i < len; i++){
                var itemCookieArr = allCookieArr[i].split('=');
                if(itemCookieArr[0] == name){
                    return itemCookieArr[1];
                }
            }
            return "";
        },
        signOut: function () {
            this.removeCookie("uid");
            this.removeCookie("uname");
            window.location.reload();
        }
    },
    created: function () {
        this.uid = this.getCookie("uid");
        this.userName = decodeURIComponent(this.getCookie("uname"));
    }
});


var bannerArea = new Vue({
    el: "#banner_area",
    data: {
        uid: "",
        userName: "",
        searchText: "",
        isArticle: true
    },
    computed: {

    },
    methods:{
        getCookie: function(name){
            var allCookieArr = document.cookie.split('; '),
                len = allCookieArr.length
            for(var i = 0; i < len; i++){
                var itemCookieArr = allCookieArr[i].split('=');
                if(itemCookieArr[0] == name){
                    return itemCookieArr[1];
                }
            }
            return "";
        },
        changeChoose: function(e){
            var choose = e.target.dataset.choose;
            if(choose == "article"){
                this.isArticle = true;
            }else if(choose == "book"){
                this.isArticle = false;
            }
        },
        search: function () {
            if(this.isArticle){
                if(window.location.href.indexOf("/articleSearch.html") == -1){
                    window.open("/articleSearch.html?keyword=" + this.searchText);
                }else{
                    window.location.href = "/articleSearch.html?keyword=" + this.searchText;
                }
            }else{
                if(window.location.href.indexOf("/bookSearch.html") == -1){
                    window.open("/bookSearch.html?keyword=" + this.searchText);
                }else{
                    window.location.href = "/bookSearch.html?keyword=" + this.searchText;
                }
            }
        }
    },
    created: function () {
        this.uid = this.getCookie("uid");
        this.userName = decodeURIComponent(this.getCookie("uname"));
        if(window.location.href.indexOf("/bookIndex.html") !== -1 || window.location.href.indexOf("/bookCategory.html") !== -1 || window.location.href.indexOf("/bookSearch.html") !== -1 || window.location.href.indexOf("/bookDetail.html") !== -1){
            this.isArticle = false;
        }
    }
});