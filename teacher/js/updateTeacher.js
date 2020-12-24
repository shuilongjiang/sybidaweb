var object = {}

// $("#selectButt").click(function () {
//     let teachId = $("#searcheStuId").val()
//
//     if (!teachId || !(teachId.trim())) {
//         location.href = "/sybida/teacher/updateTeacher.html"
//     } else {
//
//         showDetail(teachId)
//     }
//     // showDetail(teachId)
// })
var userid = getCookie("userid")
console.log(userid)
show()

function show() {
    $.getJSON(url + "/teacher/selectteacherbyid", "userid=" + userid, function (data) {
        console.log(data)
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

        console.log("======================")
        console.log(data)

    })
}


$("#submitList").click(function () {
    // console.log("123")

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
        success: function (data) {
            alert("ok");
        },
        error: function () {
            alert("上传出错");
        }
    });

})
