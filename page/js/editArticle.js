$(document).ready(function(){
    $(".submitBtn").on('click',function () {
        var res = window.confirm("是否确定发表");
        if(!res){
            return;
        }
        var content = $("#editor").html();
        var title = $("#title").val();
        var tag = $("#tag").val();
        var uid = getCookie("uid");
        var uname = getCookie("uname");
        console.log(content);
        $.ajax({
            url: "/uploadArticle?title=" + title + "&uid=" + uid + "&uname=" + uname + "&tag=" + tag,
            method: "post",
            data: content,
            success: function(resp) {
                var result = JSON.parse(resp);
                alert("发表成功");
                $("#editor").html("");
                $("#title").val("");
                $("#tag").val("");
            },
            error: function (resp) {
                console.log(resp);
            }
        });
    })
});