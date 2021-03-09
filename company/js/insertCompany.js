var selectStudy=-1
var codeId1
   var codeId=0
var markName
var search=location.search
var arr=search.split("?")
if(arr.length>1){
    codeId1=arr[1]
    markName=codeId1.split("=")[0]
}

if (markName=="markid") {

    codeId=codeId1.split("=")[1]
    $.getJSON({
        url:url + "/company/codeisenable",
        data:"codeId=" + codeId,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
        if (data.code == 1) {
            $("#codeId").css("display", "none");
        } else {
            $("#tbodyid").empty();
            layer.alert("验证码已过期，请重新联系管理员")
        }
    }}})

}


$(function () {
    $.getJSON({
        url:url + "/register/selectStudy",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
        for (let k = 4; k < data.length; k++) {
            $(".SelectPaymentMode").append("<option value='" + data[k].studyId + "'>" + data[k].studyAspect + "</option>");
        }
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
    }}});
})


var layer
layui.use('layer', function(){
    layer = layui.layer;
});

var userid=getCookie("userid");

$("#surebtn").click(function () {
    var companyUserId= $("#companyUserId").val()
    var companyMarkId= $("#companyMarkId").val()
    var companyName= $("#companyName").val()
    var companyEndTime= $("#companyEndTime").val()
    var companyStartTime= $("#companyStartTime").val()
    var companyStudyId= $("#companyStudyId").val()
    var companyWeb= $("#companyWeb").val()
    var companyAddress= $("#companyAddress").val()
    var companyRequire= $("#companyRequire").val()
    var companySalary= $("#companySalary").val()
    var companyMailbox= $("#companyMailbox").val()
    var companyWechat= $("#companyWechat").val()
    var companyPhone= $("#companyPhone").val()
    var companyIsView=  $("input[type='radio']:checked").val();
    var companyIntroduce= $("#companyIntroduce").val()
    let formData = new FormData(document.getElementById("formId"));
    formData.append('companyMarkId', codeId);
    formData.append('companyName', companyName);
    formData.append('companyEndTime', companyEndTime);
    formData.append('companyStartTime', companyStartTime);
    formData.append('companyStudyId', companyStudyId);
    formData.append('companyWeb', companyWeb);
    formData.append('companyAddress', companyAddress);
    formData.append('companyRequire', companyRequire);
    formData.append('companySalary', companySalary);
    formData.append('companyMailbox', companyMailbox);
    formData.append('companyWechat', companyWechat);
    formData.append('companyPhone', companyPhone);
    formData.append('companyIntroduce', companyIntroduce);
    formData.append('companyNull2', userid);


    $.ajax({
        url: url + "/company/insertcompany",
        type: 'post',
        data: formData,
        cache: false,   //上传文件无需缓存
        processData: false,   // 用于对参数进行序列化处理，这里必须设为false
        contentType: false,
        dataType: "json",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success: function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
                if (data.code == 1) {
                    layer.open({
                        content: "提交成功"
                        , btn: ['查看','确定'],
                        style: 'width:80%',
                        yes: function(index, layero){
                            location.href="/sybida/company/companyinfo2.html"; //跳到指定页面
                        },
                        cancel: function(index,layero){ //按右上角“X”按钮
                        },

                    })
                }
            }
        }
    })
})

