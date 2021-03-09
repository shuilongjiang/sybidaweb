// 获取从前一个页面传递过来的参数
var userid=getCookie("userid")
var search = window.location.search

var arr = search.split("=")
var id = arr[1]
$.getJSON({
    url:url+"/audition/selectstudentInterviewbyauditionId",
    data:"auditionId=" + id,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else {
            if (data.code == 1) {
                $("#studentName").val(data.data.studentName)
                $("#studentSex").val(data.data.studentSex)
                $("#classNum").val(data.data.classNum)
                $("#auditionFirm").val(data.data.auditionFirm)
                $("#auditionSite").val(data.data.auditionSite)
                var date = Date.parse(data.data.auditionTime)
                date = new Date(date)
                $("#auditionTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                $("#auditionFinish").val(data.data.auditionFinish)
                $("#auditionSituation").val(data.data.auditionSituation)

            }
        }
}})


