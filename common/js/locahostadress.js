//访问服务器地址
var url="http://localhost:8080/"
var Qnyurl= "http://qldlxgj0k.hn-bkt.clouddn.com/"
//根据名字获取cookie
function getCookie(name) {
    var prefix = name + "="  // name=
    // name=  第一次出现的位置
    var start = document.cookie.indexOf(prefix)
    if (start == -1) {
        return null;
    }
    // 从0+5这个位置开始，找到;第一次出现的位置，也就是这个cookie值得结束位置
    var end = document.cookie.indexOf(";", start + prefix.length)
    // name=wangwu
    // Hm_lvt_eaa57ca47dacb4ad4f5a2570;name=wangwu
    // 将字符串得总长度就是截取值得结束位置
    if (end == -1) { // 没有找到分号
        end = document.cookie.length;
    }
    var value = document.cookie.substring(start + prefix.length, end)
    return unescape(value);
}