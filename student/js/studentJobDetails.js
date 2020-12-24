// 获取用户ID
var userid=getCookie("userid")
$.getJSON(url+"/job/selectstudentJobbyJobStudentId", "userid=" + userid, function (data) {

    if (data.code == 1) {

        $("#jobStudentId").val(data.data.jobStudentId)
        $("#studentName").val(data.data.studentName)
        $("#studentSex").val(data.data.studentSex)
        $("#classNum").val(data.data.classNum)
        $("#jobFirm").val(data.data.jobFirm)
        $("#jobContact").val(data.data.jobContact)
        $("#jobWeal").val(data.data.jobWeal)
        var date = Date.parse(data.data.jobEndTime)
        date = new Date(date)
        $("#jobEndTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
        $(".jobPicture").attr('src', Qnyurl+data.data.jobPicture)


    }

})



$("#update").click(function (){
        location.href="/sybida/student/studentJobDetailsUpdate.html";

})

