var classNum=-1
var classID=-1
// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var offerId = arr[1]

var userid=getCookie("userid")

$.getJSON({url:url+"/audition/selectStudentById",data:"userid="+userid,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data){
        if(data== -1000){
            location.href=logindexurl
        }else{
            if (data.code == 1) {
                // console.log(data.data.studentId+"!!!!!!!!!!!!!!!!!!!")
                // console.log(data.data.studentName+"!!!!!!!!!!!!!!!!!!!")
                $("#studentName").val(data.data.studentName)

                $("#offerStudentId").val(data.data.studentId)
                if("男" == data.data.studentSex){
                    $("#male").attr("checked","checked")
                    $("#female").attr("disabled","disabled")
                }else {
                    $("#female").attr("checked","checked")
                    $("#male").attr("disabled","disabled")
                }
                classID = data.data.studentClassId
                $.getJSON({url:url+"/audition/selectClassByClassId",data:"classId="+classID,
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userid);
                    },
                    success:function (data){
                        if(data== -1000){
                            location.href=logindexurl
                        }else {
                            $("#classNum").val(data.data.classNum)
                        }
                    }})
            }
        }
}})

//Offer学习方向下拉选框
$.getJSON({
    url:url+"/offer/selectStudyAspect",
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data){
        if(data== -1000){
            location.href=logindexurl
        }else {
            var htm=``
            for (var i=0;i<data.data.length;i++){
                htm+=`<option value="${data.data[i].studyId}">${data.data[i].studyAspect}</option>`
            }
            $("#studyAspect").append(htm)

            var selectA1 = $("#studyAspect").find("option"); //从A1下拉框中 搜索值
            for(var i=0;i<selectA1.length;i++){
                var t=$(selectA1[i]).val()

                if(t==studyAspect){
                    $(selectA1[i]).attr("selected","selected")
                }
            }
            //change事件
            $('#studyAspect').change(
                function (){
                    studyAspect=$("#studyAspect").val()
                }
            )
        }
    }
})

$.getJSON({url:url+"/offer/selectstudentOfferbyOfferId",data:"offerId=" + offerId,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
            if (data.code == 1) {

                console.log(data.data.studyAspect+"++_+_+_+_+_+_+")

                $.getJSON({url:url+"/offer/selectStudyBystudyAspect",data:"studyAspect="+data.data.studyAspect,
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userid);
                    },
                    success:function (data) {
                        if(data== -1000){
                            location.href=logindexurl
                        }else {
                            var selectA1 = $("#studyAspect").find("option"); //从A1下拉框中 搜索值
                            for(var i=0;i<selectA1.length;i++){
                                var t=$(selectA1[i]).val()
                                if(t==data.data[0].studyId){
                                    $(selectA1[i]).attr("selected","selected")
                                }
                            }
                        }



                }})





                // $("#studyAspect").val(data.data.studyAspect)
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
                $("#offerId").val(data.data.offerId)
            }
        }
    }})


function judgeSpace(obj, index){
    let inputValue = obj.val()
    if(inputValue ==='' || (inputValue.trim()==='')){
        $(".tip").eq(index).html("请填写信息")
        return false
    } else {
        $(".tip").eq(index).html("")
        return true
    }
}


$("#studyAspect").blur(function (){
    judgeSpace($(this),0)
})

$("#offerCompany").blur(function (){
    judgeSpace($(this),1)
})

$("#offerContact").blur(function (){
    judgeSpace($(this),2)
})

$("#offerAddress").blur(function (){
    judgeSpace($(this),3)
})

$("#offerPracticeSalary").blur(function (){
    judgeSpace($(this),4)
})

$("#offerRegularSalary").blur(function (){
    judgeSpace($(this),5)
})
$("#offerResponsetime").blur(function (){
    judgeSpace($(this),6)
})
$("#offerHiredata").blur(function (){
    judgeSpace($(this),7)
})
$("#offerPracticeEndtime").blur(function (){
    judgeSpace($(this),8)
})



$("#submitList").click(function () {
    if(judgeSpace($("#studyAspect"),0) && judgeSpace($("#offerCompany"),1) &&
        judgeSpace($("#offerContact"),2) && judgeSpace($("#offerAddress"),3) &&
        judgeSpace($("#offerPracticeSalary"),4)&& judgeSpace($("#offerRegularSalary"),5) &&
        judgeSpace($("#offerResponsetime"),6)&& judgeSpace($("#offerHiredata"),7)&&
        judgeSpace($("#offerPracticeEndtime"),8)){

        var studyAspect = $("#studyAspect").val()
        var offerCompany = $("#offerCompany").val()
        var offerContact = $("#offerContact").val()
        var offerAddress = $("#offerAddress").val()
        var offerPracticeSalary = $("#offerPracticeSalary").val()
        var offerRegularSalary = $("#offerRegularSalary").val()
        var offerResponsetime = $("#offerResponsetime").val()
        var offerHiredata = $("#offerHiredata").val()
        var offerPracticeEndtime = $("#offerPracticeEndtime").val()
        var offerStudentId = $("#offerStudentId").val()
        var offerId = $("#offerId").val()

        var formData = new FormData(document.getElementById("offerRegister"));
        formData.append("offerStudyId", studyAspect);
        formData.append("offerCompany",offerCompany);
        formData.append("offerContact",offerContact);
        formData.append("offerAddress",offerAddress);
        formData.append("offerPracticeSalary",offerPracticeSalary);
        formData.append("offerRegularSalary",offerRegularSalary);
        formData.append("offerResponsetime",offerResponsetime);
        formData.append("offerHiredata",offerHiredata);
        formData.append("offerPracticeEndtime",offerPracticeEndtime);
        formData.append("offerStudentId",offerStudentId);
        formData.append("offerId",offerId);



        $.ajax({
            type: "post",
            url: url + "/offer/updateSybidaOffer",
            data: formData,
            cache: false,   // 不缓存
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            beforeSend: function(request) {
                request.setRequestHeader("token", userid);
            },
            success: function (data) {
                if(data== -1000){
                    location.href=logindexurl
                }else{
                    layer.open({
                        content: "提交成功"
                        , btn: ['确定','取消'],
                        style: 'width:80%',
                        yes: function(index, layero){
                            location.href="/sybida/student/studentPersonalOfferDetails.html?id=" + offerId; //跳到指定页面
                        },
                        cancel: function(index,layero){ //按右上角“X”按钮
                        },
                    })
                }
            },
            error:function () {
                alert("提交出错");
            }
        });

    }

})



$("#return").click(function (){
    console.log(offerId  +"跳转页面传id")
    location.href="/sybida/student/studentPersonalOfferDetails.html?id=" + offerId;

})



