// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var offerId = arr[1]
var userid=getCookie("userid")

$.getJSON({
    url:url+"/offer/selectstudentOfferbyOfferId",
    data:"offerId=" + offerId,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
            let html=''
            if (data.code == 1) {
                $("#studentName").val(data.data.studentName)
                $("#studentSex").val(data.data.studentSex)
                $("#classNum").val(data.data.classNum)
                $("#studyAspect").val(data.data.studyAspect)
                $("#offerCompany").val(data.data.offerCompany)
                $("#offerContact").val(data.data.offerContact)
                $("#offerAddress").val(data.data.offerAddress)
                $("#offerPracticeSalary").val(data.data.offerPracticeSalary)
                $("#offerRegularSalary").val(data.data.offerRegularSalary)
                var date = Date.parse(data.data.offerResponsetime)
                date = new Date(date)
                $("#offerResponsetime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                var date = Date.parse(data.data.offerHiredata)
                date = new Date(date)
                $("#offerHiredata").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                var date = Date.parse(data.data.offerPracticeEndtime)
                date = new Date(date)
                $("#offerPracticeEndtime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                var date = Date.parse(data.data.offerAlterTime)
                date = new Date(date)
                $("#offerAlterTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                $("#offerPicture").attr('src', Qnyurl+data.data.offerPicture)
            }
        }
}})



