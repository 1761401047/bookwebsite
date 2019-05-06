function getCookie(name){
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