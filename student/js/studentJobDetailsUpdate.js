var classNum=-1
var classID=-1
// 获取从前一个页面传递过来的参数
// var search = window.location.search
// var arr = search.split("=")
// var jobStudentId = arr[1]

// console.log(jobStudentId  +"前一个页面传递要修改的jobStudentId")


// 获取用户ID
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
                // console.log(classID+"========================")

                $.getJSON({url:url+"/audition/selectClassByClassId",data:"classId="+classID,
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userid);
                    },
                    success:function (data){
                        if(data== -1000){
                            location.href=logindexurl
                        }else{
                            $("#classNum").val(data.data.classNum)
                        }
                }})
            }
        }
}})

$.getJSON({url:url+"/job/selectstudentJobbyJobStudentId",data: "userid=" + userid,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
            if (data.code == 1) {

                $("#jobFirm").val(data.data.jobFirm)
                $("#jobContact").val(data.data.jobContact)
                $("#jobWeal").val(data.data.jobWeal)
                var date = Date.parse(data.data.jobEndTime)
                date = new Date(date)
                $("#jobEndTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
                $(".jobPicture").attr('src', Qnyurl+data.data.jobPicture)
                $("#jobId").val(data.data.jobId)
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


$("#jobFirm").blur(function (){
    judgeSpace($(this),0)
})

$("#jobContact").blur(function (){
    judgeSpace($(this),1)
})

$("#jobWeal").blur(function (){
    judgeSpace($(this),2)
})

$("#jobEndTime").blur(function (){
    judgeSpace($(this),3)
})



$("#submitList").click(function () {
    if(judgeSpace($("#jobFirm"),0) && judgeSpace($("#jobContact"),1) &&
        judgeSpace($("#jobWeal"),2) && judgeSpace($("#jobEndTime"),3)){

        var jobFirm = $("#jobFirm").val()
        var jobContact = $("#jobContact").val()
        var jobWeal = $("#jobWeal").val()
        var jobEndTime = $("#jobEndTime").val()
        var jobStudentId = $("#jobStudentId").val()
        var jobId = $("#jobId").val()


        console.log(jobId+"ppppppppppppppp")


        var formData = new FormData(document.getElementById("jobform"));
        formData.append("jobFirm", jobFirm);
        formData.append("jobContact",jobContact);
        formData.append("jobWeal",jobWeal);
        formData.append("jobEndTime",jobEndTime);
        formData.append("jobStudentId",jobStudentId);
        formData.append("jobId",jobId)

        $.ajax({
            type: "post",
            url: url + "/job/updateSybidaJob",
            data: formData,
            cache: false,   // 不缓存
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            success: function (data) {

                layer.open({
                    content: "提交成功"
                    , btn: ['查看','再次修改'],
                    style: 'width:80%',
                    yes: function(index, layero){
                        location.href="/sybida/student/studentJobDetails.html"; //跳到指定页面
                    },
                    cancel: function(index,layero){ //按右上角“X”按钮
                    },

                })
            },


            error:function () {
                alert("提交出错");
            }
        });

    }

})



$("#return").click(function (){
    location.href="/sybida/student/studentJobDetails.html";

})



