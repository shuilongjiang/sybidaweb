var classNum=-1
var classID=-1
// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var auditionId = arr[1]

console.log(auditionId  +"前一个页面传递要修改的简历Id")



$.getJSON(url+"/audition/selectstudentInterviewbyauditionId", "auditionId=" + auditionId, function (data) {

    if (data.code == 1) {

        $("#studentName").val(data.data.studentName)
        $("#studentSex").val(data.data.studentSex)
        $("#classNum").val(data.data.classNum)
        $("#auditionFirm").val(data.data.auditionFirm)
        $("#auditionSite").val(data.data.auditionSite)
        $("#auditionFinish").val(data.data.auditionFinish)
        $("#auditionSituation").val(data.data.auditionSituation)
        // $("#test1").val(data.data.auditionTime)
        var date = Date.parse(data.data.auditionTime)
        date = new Date(date)
        $("#test1").val(date.pattern("yyyy-MM-dd HH:mm:ss"))
        $("#auditionId").val(data.data.auditionId)
    }

})


// 获取用户ID
var userid=getCookie("userid")

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
        var auditionId = $("#auditionId").val()

        console.log(auditionId+"!!!!!!!!!!!!!!!!!!!!yeyeye")

        var formData = new FormData(document.getElementById("auditionform"));
        formData.append("auditionFirm", auditionFirm);
        formData.append("auditionSite",auditionSite);
        formData.append("auditionTime",auditionTime);
        formData.append("auditionFinish",auditionFinish);
        formData.append("auditionSituation",auditionSituation);
        formData.append("auditionStudentId",auditionStudentId);
        formData.append("auditionId",auditionId);



        $.ajax({
            type: "post",
            url: url + "/audition/updateSybidaAudition",
            data: formData,
            cache: false,   // 不缓存
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            success: function (data) {
                // alert("提交成功");
                // layer.alert('提交成功！', {
                //         skin: 'layui-layer-molv' //样式类名
                //         ,closeBtn: 0
                //     }



                layer.open({
                    content: "提交成功"
                    , btn: ['确定','取消'],
                    style: 'width:80%',
                    yes: function(index, layero){
                        location.href="/sybida/student/studentAuditionDetails.html?id=" + auditionId; //跳到指定页面
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



// $("#return").click(function (){
//     console.log(auditionId  +"跳转页面传id")
//     location.href="/sybida/student/studentAuditionDetails.html?id=" + auditionId;
//
// })



