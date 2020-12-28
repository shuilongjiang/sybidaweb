var object = {}

var userid = getCookie("userid")

$(".teachTel").blur(function () {
    // alert("123")
    var phone = $(".teachTel").val();
    console.log(phone)
    var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
    console.log(myreg.test(phone))
    if (!myreg.test(phone)) {
        $("#phonetip").html("手机号码格式错误")
    } else {
        $("#phonetip").html("")
    }
})

$("#reload").click(function () {
 window.reload
})


show()

function show() {
    $.getJSON({
        url: url + "/teacher/selectteacherbyid",
        data: "userid=" + userid,
        beforeSend: function (request) {
            request.setRequestHeader("token", userid);
        },
        success: function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {

                var teacherInfo = data.data
                $(".teachId").val(teacherInfo.teachId)
                $(".teachName").val(teacherInfo.teachName)
                $(".teachWechat").val(teacherInfo.teachWechat)
                $(".studyAspect").val(teacherInfo.studyAspect)
                $(".teachTel").val(teacherInfo.teachTel)
                $(".teachQq").val(teacherInfo.teachQq)
                $(".teachPhoto").attr('src', Qnyurl + teacherInfo.teachPhoto)
                if (teacherInfo.teachSex == "男") {
                    $("input[name=sex][value='男']").attr("checked", true);
                } else {
                    $("input[name=sex][value='女']").attr("checked", true);
                }


            }
        }
    })
}

//检查手机号是否存在
function checkPhone(phone) {
    $.getJSON({
        url: url + "/teacher/selectTeacherByPhoneNum",
        data: "phoneNum=" + phone,
        async:false,
        beforeSend: function (request) {
            request.setRequestHeader("token", userid);
        },
        success: function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
                console.log(data)
                if (data.code == 1 && data.data.total != 0) {//code==0  --> 没有查到相同的，所以返false
                    phoneCheck = true
                } else {
                    phoneCheck = false;
                }

            }
        }
    })
}


$("#submitList").click(function () {
    var gender
    var name = $(".teachName").val()

    if ($(".teachsex1").prop("checked")) {
        gender = $(".teachsex1").val()

    }
    if ($(".teachsex2").prop("checked")) {
        gender = $(".teachsex2").val()

    }
    // var sex
    var id = $(".teachId").val()
    var wechat = $(".teachWechat").val()
    var studyId = $("#teachStudyId").val()
    var tel = $(".teachTel").val()
    var qq = $(".teachQq").val()
    var photourl = $("#teachphotourl").attr("src")
    var lenstr = photourl.lastIndexOf("/")
    photourl = photourl.substring(lenstr + 1)
    var formData = new FormData(document.getElementById("teacherform"));
    formData.append("file", $("#addPic")[0].files[0]);
    formData.append("teachId", id);
    formData.append("teachPhoto", photourl);
    formData.append("teachName", name);
    formData.append("teachSex", gender);
    formData.append("teachWechat", wechat);
    formData.append("teachStudyId", studyId);
    formData.append("teachTel", tel);
    formData.append("teachQq", qq);
    var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
    if (myreg.test(tel)) {

        $.ajax({
            type: "post",
            url: url + "/teacher/updateteacherinfo",
            data: formData,
            cache: false,   // 不缓存
            processData: false,   // jQuery不要去处理发送的数据
            contentType: false,   // jQuery不要去设置Content-Type请求头
            beforeSend: function (request) {
                request.setRequestHeader("token", userid);
            },
            success: function (data) {

                if (data == -1000) {
                    location.href = logindexurl
                } else {
                    alert("ok");
                }
            },
            error: function () {
                alert("上传出错");
            }
        });
    } else {
        alert("手机号格式不正确")
    }

})
