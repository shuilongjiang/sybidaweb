// 获取从前一个页面传递过来的参数
var search = window.location.search
console.log(search)
var arr = search.split("=")
var id = arr[1]


console.log(id)


$.getJSON(url+"/audition/selectstudentInterviewbyauditionId", "auditionId=" + id, function (data) {
    if (data.code == 1) {
        console.log(data)

        console.log("========")
        console.log("========")

        $("#studentName").val(data.data.studentName)
        $("#studentSex").val(data.data.studentSex)
        $("#classNum").val(data.data.classNum)
        $("#auditionFirm").val(data.data.auditionFirm)
        $("#auditionSite").val(data.data.auditionSite)
        $("#auditionTime").val(data.data.auditionTime)
        $("#auditionFinish").val(data.data.auditionFinish)
    }
})



$("button").click(function (){
    var text = $(this).text() // 获取按钮之间的文本内容
    if(text.trim()=='返回'){
        location.href="/sybida/teacher/studentInterviewTeacher.html";
    }
})