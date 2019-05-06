var hotArticle = new Vue({
    el: "#login",
    data: {
        account: '',
        password: ''
    },
    computed: {

    },
    methods:{
        login:function () {
            axios({
                method: "post",
                url: "/login",
                data: {
                    account: this.account,
                    password: this.password
                }
            }).then(function(resp) {
                var res = resp.data.data;
                if(res){
                    window.location.href = document.referrer && document.referrer.indexOf("/register.html") === -1 ? document.referrer : "/index.html" || "/index.html";
                }else{
                    alert("用户名或密码错误");
                }
            }).catch(function (resp) {
                console.log("请求失败");
            });
        },
        register: function () {
            window.location.href = "/register.html";
        }
    },
    created: function () {
        console.log(document.referrer);
    }
});