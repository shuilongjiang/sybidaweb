var classNum=-1
var classID=-1
var studyAspect
//用户ID 查询学生姓名和性别
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
                $.getJSON({
                    url:url+"/audition/selectClassByClassId",
                    data:"classId="+classID,
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
console.log(userid+"学习方向用户id========")
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

        $.ajax({
            type: "post",
            url: url + "/offer/addSybidaOffer",
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
                        , btn: ['查看','确定'],
                        style: 'width:80%',
                        yes: function(index, layero){
                            location.href="/sybida/student/studentPersonalOffer.html"; //跳到指定页面
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

$("#returnOffer").click(function (){
    location.href="/sybida/student/studentPersonalOffer.html";

})

