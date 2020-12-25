// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var companyId = arr[1]

// var companyId = 9  //测试用的

var userid=getCookie("userid")
$.getJSON({
    url:url+"/company/selectCompanyByCompanyId",
    data: "companyId="+ companyId,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
            if (data.code == 1) {
                $("#teachName").val(data.data.teachName)
                $("#companyName").val(data.data.companyName)
                var date = Date.parse(data.data.companyStartTime)
                date = new Date(date)
                $("#companyStartTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                var date = Date.parse(data.data.companyEndTime)
                date = new Date(date)
                $("#companyEndTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                $("#studyAspect").val(data.data.studyAspect)
                $("#companySalary").val(data.data.companySalary)
                $("#companyWeb").val(data.data.companyWeb)
                $("#companyAddress").val(data.data.companyAddress)
                $("#companyPhone").val(data.data.companyPhone)
                $("#companyWechat").val(data.data.companyWechat)
                $("#companyMailbox").val(data.data.companyMailbox)
                $("#companyIntroduce").val(data.data.companyIntroduce)
                $("#companyRequire").val(data.data.companyRequire)
                $(".companyPicture").attr('src', Qnyurl + data.data.companyPicture)
            }
        }
    }})

