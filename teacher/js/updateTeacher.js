var object = {}

var userid = getCookie("userid")

show()

function show() {
    $.getJSON({
        url:url + "/teacher/selectteacherbyid",
        data:"userid=" + userid,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{

        var teacherInfo = data.data
        $(".teachId").val(teacherInfo.teachId)
        $(".teachName").val(teacherInfo.teachName)
        $(".teachWechat").val(teacherInfo.teachWechat)
        $(".teachStudyId").val(teacherInfo.teachStudyId)
        $(".teachTel").val(teacherInfo.teachTel)
        $(".teachQq").val(teacherInfo.teachQq)
        $(".teachPhoto").attr('src', Qnyurl + teacherInfo.teachPhoto)
        if (teacherInfo.teachSex == "男") {
            $("input[name=sex][value='男']").attr("checked", true);
        } else {
            $("input[name=sex][value='女']").attr("checked", true);
        }



    }}})
}


$("#submitList").click(function () {
    var gender
    var id = $(".teachId").val()
    var name = $(".teachName").val()

    if ($(".teachsex1").prop("checked")) {
        gender = $(".teachsex1").val()

    }
    if ($(".teachsex2").prop("checked")) {
        gender = $(".teachsex2").val()

    }
    // var sex

    var wechat = $(".teachWechat").val()
    var studyId = $(".teachStudyId").val()
    var tel = $(".teachTel").val()
    var qq = $(".teachQq").val()
    var photourl = $("#teachphotourl").attr("src")
    var lenstr = photourl.lastIndexOf("/")
    photourl = photourl.substring(lenstr + 1)

    var formData = new FormData(document.getElementById("teacherform"));
    formData.append("file", $("#addPic")[0].files[0]);
    formData.append("teachPhoto", photourl);
    formData.append("teachId", id);
    formData.append("teachName", name);
    formData.append("teachSex", gender);
    formData.append("teachWechat", wechat);
    formData.append("teachStudyId", studyId);
    formData.append("teachTel", tel);
    formData.append("teachQq", qq);


    $.ajax({
        type: "post",
        url: url + "/teacher/updateteacherinfo",
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
            }else{alert("ok");}
        },
        error: function () {
            alert("上传出错");
        }
    });

})
