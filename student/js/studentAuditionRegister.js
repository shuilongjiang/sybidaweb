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

                $("#studentName").val(data.data.studentName)

                $("#auditionStudentId").val(data.data.studentId)
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


$("#auditionFirm").blur(function (){
    judgeSpace($(this),0)
})

$("#auditionSite").blur(function (){
    judgeSpace($(this),1)
})

$("#test1").blur(function (){
    judgeSpace($(this),2)
})

$("#auditionFinish").blur(function (){
    judgeSpace($(this),3)
})

$("#auditionSituation").blur(function (){
    judgeSpace($(this),4)
})


$("#submitList").click(function () {
    if(judgeSpace($("#auditionFirm"),0) && judgeSpace($("#auditionSite"),1) &&
        judgeSpace($("#test1"),2) && judgeSpace($("#auditionFinish"),3) && judgeSpace($("#auditionSituation"),4)){

        var auditionFirm = $("#auditionFirm").val()
        var auditionSite = $("#auditionSite").val()
        var auditionTime = $("#test1").val()
        var auditionFinish = $("#auditionFinish").val()
        var auditionSituation = $("#auditionSituation").val()
        var auditionStudentId = $("#auditionStudentId").val()

        var formData = new FormData(document.getElementById("auditionform"));
        formData.append("auditionFirm", auditionFirm);
        formData.append("auditionSite",auditionSite);
        formData.append("auditionTime",auditionTime);
        formData.append("auditionFinish",auditionFinish);
        formData.append("auditionSituation",auditionSituation);
        formData.append("auditionStudentId",auditionStudentId);


        $.ajax({
            type: "post",
            url: url + "/audition/addSybidaAudition",
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
                            location.href="/sybida/student/studentAudition.html"; //跳到指定页面
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

$("#returnAudition").click(function (){
    location.href="/sybida/student/studentAudition.html";

})

