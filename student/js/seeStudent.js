var userid = getCookie("userid")
var search = location.search
var studentId1 = search.split("=")
var studentId = studentId1[1]

showDetail(studentId)

function showDetail(id) {

    $.getJSON({
        url: url + "/teacher/selectstudentbyid", data: "id=" + id,
        beforeSend: function (request) {
            request.setRequestHeader("token", userid);
        },
        success: function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
                var studentInfo = data.data
                if (!studentInfo.studentName){
                    studentInfo.studentName = "暂无"
                }
                if (!studentInfo.studentSchool){
                    studentInfo.studentSchool = "暂无"
                }
                if (!studentInfo.studentSpecialty){
                    studentInfo.studentSpecialty = "暂无"
                }
                if (!studentInfo.studentWechat){
                    studentInfo.studentWechat = "暂无"
                }
                if (!studentInfo.studentMailbox){
                    studentInfo.studentMailbox = "暂无"
                }
                if (!studentInfo.studentStudyId){
                    studentInfo.studentStudyId = "暂无"
                }
                if (!studentInfo.studentCity){
                    studentInfo.studentCity = "暂无"
                }
                if (!studentInfo.studentAddress){
                    studentInfo.studentAddress = "暂无"
                }
                if (!studentInfo.studentClassId){
                    studentInfo.studentClassId = "暂无"
                }
                if (!studentInfo.studentUrgent){
                    studentInfo.studentUrgent = "暂无"
                }
                if (!studentInfo.studentPhone){
                    studentInfo.studentPhone = "暂无"
                }
                if (!studentInfo.studentIdentity){
                    studentInfo.studentIdentity = "暂无"
                }
                if (!studentInfo.studentRoom){
                    studentInfo.studentRoom = "暂无"
                }
                if (!studentInfo.studentParentName){
                    studentInfo.studentParentName = "暂无"
                }
                if (!studentInfo.studentParentPhone){
                    studentInfo.studentParentPhone = "暂无"
                }
                if (!studentInfo.studentSex){
                    studentInfo.studentSex = "暂无"
                }
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
                $(".StudentPhoto").attr('src', Qnyurl + studentInfo.studentPhoto)
                $(".studentParentPhone").val(studentInfo.studentParentPhone)
                $(".IsGraduation").val(studentInfo.studentIsGraduation)

                $(".studentSex").val(studentInfo.studentSex)

                if (studentInfo.studentIsGraduation == "1") {
                    $(".IsGraduation").val("是")
                } else {
                    $(".IsGraduation").val("否")
                }
            }
        }

    })
}

function returnInfoStudent() {
    // location.href="/sybida/student/infoStudent.html?pageNum=1&pageSize=5";
    location.href="/sybida/student/infoStudent.html?pageNum=1&pageSize=5&classId=-1";
}


