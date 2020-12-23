var classNum=-1
var classID=-1

//用户ID 查询学生姓名和性别
var userid=getCookie("userid")
console.log(userid+"=======********")
$.getJSON(url+"/audition/selectStudentById","userid="+userid,function (data){
    // console.log(data)
    if (data.code == 1) {
        // console.log(data.data.studentId+"!!!!!!!!!!!!!!!!!!!")
        // console.log(data.data.studentName+"!!!!!!!!!!!!!!!!!!!")
        $("#studentName").val(data.data.studentName)

        $("#jobStudentId").val(data.data.studentId)
        if("男" == data.data.studentSex){
            $("#male").attr("checked","checked")
            $("#female").attr("disabled","disabled")
        }else {
            $("#female").attr("checked","checked")
            $("#male").attr("disabled","disabled")
        }
        classID = data.data.studentClassId
        // console.log(classID+"========================")

        $.getJSON(url+"/audition/selectClassByClassId","classId="+classID,function (data){
            $("#classNum").val(data.data.classNum)
        })

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

        var formData = new FormData(document.getElementById("jobform"));
        formData.append("jobFirm", jobFirm);
        formData.append("jobContact",jobContact);
        formData.append("jobWeal",jobWeal);
        formData.append("jobEndTime",jobEndTime);
        formData.append("jobStudentId",jobStudentId);

        $.getJSON(url+"/job/selectSybidaJobByStudentId","jobStudentId="+jobStudentId,function (data){
            if (data.code == 0) {
                layer.open({
                    content: "您已登记过，请前往记录平台查看就业记录并修改"
                    , btn: ['前往', '退出'],
                    style: 'width:80%',

                    yes: function(index, layero){

                        location.href = "/sybida/student/studentJob.html?id=" + jobStudentId; //跳到指定页面
                    },
                    btn2: function(index, layero){
                        location.href = "/sybida/student/index.html"

                    }

                })
            }else {
                $.ajax({
                    type: "post",
                    url: url + "/job/addSybidaJob",
                    data: formData,
                    cache: false,   // 不缓存
                    processData: false,   // jQuery不要去处理发送的数据
                    contentType: false,   // jQuery不要去设置Content-Type请求头
                    success: function (data) {
                        // alert("提交成功");
                        layer.open({
                            content: "提交成功",
                            btn: ['查看', '退出'],
                            style: 'width:80%',
                            yes: function(index, layero){

                                location.href = "/sybida/student/studentJob.html?id=" + jobStudentId; //跳到指定页面
                            },
                            btn2: function(index, layero){
                                location.href = "/sybida/student/index.html"

                            }

                        })
                    },
                    error:function () {
                        alert("提交出错");
                    }
                });
            }
        })
    }
})



