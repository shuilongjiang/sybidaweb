var classNum=-1
var classID=-1

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
                // console.log(classID+"========================")
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


$("#offerCompany").blur(function (){
    judgeSpace($(this),0)
})

$("#offerContact").blur(function (){
    judgeSpace($(this),1)
})

$("#offerAddress").blur(function (){
    judgeSpace($(this),2)
})

$("#offerPracticeSalary").blur(function (){
    judgeSpace($(this),3)
})

$("#offerReallySalary").blur(function (){
    judgeSpace($(this),4)
})

$("#offerHiredate").blur(function (){
    judgeSpace($(this),5)
})


$("#submitList").click(function () {
    if(judgeSpace($("#offerCompany"),0) && judgeSpace($("#offerContact"),1) &&
        judgeSpace($("#offerAddress"),2) && judgeSpace($("#offerPracticeSalary"),3) &&
        judgeSpace($("#offerReallySalary"),4)&& judgeSpace($("#offerHiredate"),5)){

        var offerCompany = $("#offerCompany").val()
        var offerContact = $("#offerContact").val()
        var offerAddress = $("#offerAddress").val()
        var offerDatetime = $("#offerDatetime").val()
        var offerPracticeSalary = $("#offerPracticeSalary").val()
        var offerReallySalary = $("#offerReallySalary").val()
        var offerHiredate = $("#offerHiredate").val()
        var offerStudentId = $("#offerStudentId").val()
        var formData = new FormData(document.getElementById("offerRegister"));
        formData.append("offerCompany", offerCompany);
        formData.append("offerContact",offerContact);
        formData.append("offerAddress",offerAddress);
        formData.append("offerDatetime",offerDatetime);
        formData.append("offerPracticeSalary",offerPracticeSalary);
        formData.append("offerReallySalary",offerReallySalary);
        formData.append("offerHiredate",offerHiredate);
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
                            location.href="/sybida/student/studentOffer.html"; //跳到指定页面
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



