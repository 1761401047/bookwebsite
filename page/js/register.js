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
            }else{
                var userNameLen = this.userName.length;
                var accountReg = /^[a-zA-Z][a-zA-Z0-9]{5,14}$/;
                var passwordReg = /^(\w){6,15}$/;
                var qqReg= /^(\d){5,11}$/;
                if(userNameLen > 15){
                    alert("用户名长度超出");
                    return;
                }else if(!accountReg.test(this.account)){
                    alert("账号不能含有非法字符，长度在6-15之间，以字母开头");
                    return;
                }else if(!passwordReg.test(this.password)){
                    alert("密码不能含有非法字符，长度在6-15之间");
                    return;
                }else if(!qqReg.test(this.qqNum)){
                    alert("请输入正确的qq账号");
                }
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