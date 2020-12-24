// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var jobId = arr[1]

console.log(jobId+"+_+_+_+_+_+")

$.getJSON(url+"/job/selectstudentJobbyJobId", "jobId=" + jobId, function (data) {

    let html=''
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



