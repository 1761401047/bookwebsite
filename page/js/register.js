var hotArticle = new Vue({
    el: "#register",
    data: {
        userName: '',
        account: '',
        password: '',
        re_password: '',
        qqNum: ""
    },
    computed: {

    },
    methods:{
        register:function () {
            if(!this.userName){
                alert("请输入用户名");
                return;
            }else if(!this.account){
                alert("请输入账号");
                return;
            }else if(!this.password || !this.re_password){
                alert("请输入密码");
                return;
            }else if(this.password !== this.re_password){
               alert("两次密码输入不相同，请重新输入");
               return;
            }else if(!this.qqNum){
                alert("请输入QQ号");
                return;
            }
            axios({
                method: "post",
                url: "/register",
                data: {
                    userName: this.userName,
                    account: this.account,
                    password: this.password,
                    qqNum: this.qqNum
                }
            }).then(function(resp) {
                console.log(resp);
                var res = resp.data;
                if(res.data){
                    window.location.href = "/login.html";
                    alert("注册成功")
                }else{
                    alert(res.msg);
                }
            }).catch(function (resp) {
                console.log("请求失败");
            });
        }
    },
    created: function () {

    }
});