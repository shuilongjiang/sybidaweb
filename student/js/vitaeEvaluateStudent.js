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


        console.log(auditionStudentId+"**********************************")

        var formData = new FormData(document.getElementById("auditionform"));
        formData.append("auditionFirm", auditionFirm);
        formData.append("auditionSite",auditionSite);
        formData.append("auditionTime",auditionTime);
        formData.append("auditionFinish",auditionFinish);
        formData.append("auditionSituation",auditionSituation);
        formData.append("auditionStudentId",auditionStudentId);

        // console.log(formData+"**********************************")


        $.ajax({
            type: "post",
            url: url + "/audition/addSybidaAudition",
            data: formData,
            cache: false,   // 不缓存
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            success: function (data) {
                alert("提交成功");
            },
            error:function () {
                alert("提交出错");
            }
        });

    }


})



