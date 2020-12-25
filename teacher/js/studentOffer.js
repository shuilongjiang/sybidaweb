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
                $("#offerCompany").val(data.data.offerCompany)
                $("#offerContact").val(data.data.offerContact)
                $("#offerAddress").val(data.data.offerAddress)
                var date = Date.parse(data.data.offerDatetime)
                date = new Date(date)
                $("#offerDatetime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                $("#offerPracticeSalary").val(data.data.offerPracticeSalary)
                $("#offerReallySalary").val(data.data.offerReallySalary)
                var date = Date.parse(data.data.offerHiredate)
                date = new Date(date)
                $("#offerHiredate").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
            }
        }
}})



