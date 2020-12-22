// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var auditionId = arr[1]



$.getJSON(url+"/audition/selectstudentInterviewbyauditionId", "auditionId=" + auditionId, function (data) {

    let html=''
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

})



$("#update").click(function (){
        console.log(auditionId  +"跳转页面传id")
        location.href="/sybida/student/studentAuditionDetailsUpdate.html?id=" + auditionId;

})

