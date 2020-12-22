// 用户ID查询学生
var userid=getCookie("userid")
console.log(userid+"=======********")

// var userid=12

$.getJSON(url + "/student/selectstudentbyid", "userid=" + userid, function (data) {
    if (data.code == 0) {
        alert("id不存在")
    }else{
        var studentInfo = data.data
        $(".studentId").val(studentInfo.studentId)
        $(".studentName").val(studentInfo.studentName)
        $(".studentSchool").val(studentInfo.studentSchool)
        $(".studentSpecialty").val(studentInfo.studentSpecialty)
        $(".studentWechat").val(studentInfo.studentWechat)
        $(".studentMailbox").val(studentInfo.studentMailbox)
        $(".studentStudyId").val(studentInfo.studentStudyId)
        $(".studentCity").val(studentInfo.studentCity)
        $(".studentAddress").val(studentInfo.studentAddress)
        $(".studentClassId").val(studentInfo.studentClassId)
        $(".studentUrgent").val(studentInfo.studentUrgent)
        $(".studentPhone").val(studentInfo.studentPhone)
        $(".studentIdentityNum").val(studentInfo.studentIdentity)
        $(".studentRoom").val(studentInfo.studentRoom)
        $(".studentParentName").val(studentInfo.studentParentName)
        $(".studentParentPhone").val(studentInfo.studentParentPhone)
        $(".StudentPhoto").attr('src', Qnyurl+studentInfo.studentPhoto)
        $(".IsGraduation").val(studentInfo.studentIsGraduation)
        // $(".studentPicUrl").val(studentInfo.studentPhoto)

        if ("男" == studentInfo.studentSex ) {
            $("input[name=sex][value='男']").attr("checked", true);
            $("input[name=sex][value='女']").attr("disabled","disabled");
        } else {
            $("input[name=sex][value='女']").attr("checked", true);
            $("input[name=sex][value='男']").attr("disabled","disabled");
        }



        if (studentInfo.studentIsGraduation == "1") {
            $("input[name=graduation][value='1']").attr("checked", true);
            $("input[name=graduation][value='0']").attr("disabled","disabled");
        } else {
            $("input[name=graduation][value='0']").attr("checked", true);
            $("input[name=graduation][value='1']").attr("disabled","disabled");
        }
    }

    // let html= ''
    // console.log(data)

})


$("#submitList").click(function () {
    // console.log("123")

    var gender
    var id = $(".studentId").val()
    var name = $(".studentName").val()

    if ($(".studentSex1").prop("checked")) {
        gender = $(".studentSex1").val()

    }
    if ($(".studentSex2").prop("checked")) {
        gender = $(".studentSex2").val()

    }
    // var sex
    var identity = $(".studentIdentityNum").val()

    var isgraduation

    if ($(".IsGraduation1").prop("checked")) {
        isgraduation = $(".IsGraduation1").val()

    }
    if ($(".IsGraduation2").prop("checked")) {
        isgraduation = $(".IsGraduation2").val()
    }
    var school = $(".studentSchool").val()
    var specialty = $(".studentSpecialty").val()
    var wechat = $(".studentWechat").val()
    var mail = $(".studentMailbox").val()
    var studyId = $(".studentStudyId").val()
    var city = $(".studentCity").val()
    var address = $(".studentAddress").val()
    var parentPhone = $(".studentParentPhone").val()
    var parentName = $(".studentParentName").val()
    var urgent = $(".studentUrgent").val()
    var phone = $(".studentPhone").val()
    var classId = $(".studentClassId").val()
    var room = $(".studentRoom").val()
    var photourl = $("#studentphotourl").attr("src")
    var lenstr=photourl.lastIndexOf("/")
    photourl= photourl.substring(lenstr+1)

    var formData = new FormData(document.getElementById("studentform"));
    formData.append("file", $("#addPic")[0].files[0]);
    formData.append("studentPhoto", photourl);
    formData.append("studentId",id);
    formData.append("studentName",name);
    formData.append("studentSex",gender);
    formData.append("studentIdentity",identity);
    formData.append("studentIsGraduation",isgraduation);
    formData.append("studentSchool",school);
    formData.append("studentSpecialty",specialty);
    formData.append("studentWechat",wechat);
    formData.append("studentMailbox",mail);
    formData.append("studentStudyId",studyId);
    formData.append("studentCity",city);
    formData.append("studentAddress",address);
    formData.append("studentParentPhone",parentPhone);
    formData.append("studentParentName",parentName);
    formData.append("studentUrgent",urgent);
    formData.append("studentPhone",phone);
    formData.append("studentClassId",classId);
    formData.append("studentRoom",room);



    $.ajax({
        type: "post",
        url: url + "/teacher/updatestudentinfo",
        data: formData,
        cache: false,   // 不缓存
        processData: false,   // jQuery不要去处理发送的数据
        contentType: false,   // jQuery不要去设置Content-Type请求头
        success: function (data) {
            alert("提交成功");
        },
        error:function () {
            alert("提交失败");
        }
    });

})
