
$("#submitList").click(function () {

    var name = $(".userName").val()

    var phone = $(".userPhone").val()
    var password = $(".userPassword").val()
    var note = $(".userNote").val()
    var authority = $(".userAuthority").val()

    var formData = new FormData(document.getElementById("teacherform"));
    formData.append("userPhone",phone);
    formData.append("userPassword",password);
    formData.append("userNote",note);
    formData.append("userAuthority",authority);
    formData.append("userName",name);
    $.ajax({
        type: "post",
        url: url + "/teacher/insertteacher",
        data: formData,
        cache: false,   // 不缓存
        processData: false,   // jQuery不要去处理发送的数据
        contentType: false,   // jQuery不要去设置Content-Type请求头
        success: function (data) {
            alert("ok");
        },
        error:function () {
            alert("上传出错");
        }
    });

})


