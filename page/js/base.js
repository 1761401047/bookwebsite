var headerInfo = new Vue({
    el: "#header_info",
    data: {
        uid: "",
        userName: "",
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
        }
    },
    created: function () {
        this.uid = this.getCookie("uid");
        this.userName = decodeURIComponent(this.getCookie("uname"));
    }
});