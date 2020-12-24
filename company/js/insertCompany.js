
var selectStudy=-1



$(function () {
    $.getJSON(url + "/register/selectStudy", function (data) {
        for (let k = 4; k < data.length; k++) {
            $(".SelectPaymentMode").append("<option value='" + data[k].studyId + "'>" + data[k].studyAspect + "</option>");
        }
        layui.use('form', function () {
            var form = layui.form;
            form.render();
        });
    });
})


var layer
layui.use('layer', function(){
    layer = layui.layer;
});

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
    formData.append('companyUserId', companyUserId);
    formData.append('companyMarkId', companyMarkId);
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
    formData.append('companyIsView', companyIsView);
    formData.append('companyIntroduce', companyIntroduce);

    $.ajax({
        url: url + "/company/insertcompany",
        type: 'post',
        data: formData,
        cache: false,   //上传文件无需缓存
        processData: false,   // 用于对参数进行序列化处理，这里必须设为false
        contentType: false,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {
                layer.alert('填写成功！', {
                        skin: 'layui-layer-molv' //样式类名
                        , closeBtn: 0
                    }
                );
            }
        }
    })
})

$("#btntest").click(function () {
    $("#show").load("/sybida/teacher/allTeacher.html");
});