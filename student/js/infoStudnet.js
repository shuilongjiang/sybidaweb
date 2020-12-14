var pageNum = 1
var pageSize = $("#pageSizeSel").val()

// var teacherStudy=-1
var search = location.search
var arr = search.split("&")
if (arr.length > 1) {
    pageNum1 = arr[0]
    pageNum = pageNum1.split("=")[1]

    pageSize1 = arr[1]
    pageSize = pageSize1.split("=")[1]
    //
    // teacherStudy1=arr[2]
    // teacherStudy=teacherStudy1.split("=")[1]

}
var selectA2 = $("#pageSizeSel").find("option"); //从A1下拉框中 搜索值
for (var i = 0; i < selectA2.length; i++) {
    var t = $(selectA2[i]).val()

    if (t == pageSize) {
        $(selectA2[i]).attr("selected", "selected")
    }

}
//每页条数的change事件
$('#pageSizeSel').change(
    function () {
        pageSize = $("#pageSizeSel").val()
    }
)
$("#selectButt").click(function () {
    location.href = "/sybida/student/infoStudent.html?pageNum=1&pageSize=" + pageSize
})




$("#selectButt1").click(function () {
    let stuId = $("#searcheStuId").val()
    if (!stuId || !(stuId.trim())) {
        location.href = "/sybida/student/infoStudent.html?pageNum=1&pageSize=" + pageSize
    } else {
        showDetail(stuId)
    }
})

function showDetail(id) {
    $("#detailCon").css('display', '')

    $.getJSON(url + "/classInfo/selectstudentbyid", "id=" + id, function (data) {
        let html=''
        console.log(data)
        var list = data.data
        console.log(list)

        html += `<tr class="warning">
           <td>${list.studentId}</td>
            <td>${list.studentName}</td>
            <td>${list.studentSex}</td>
            <td>${list.studentIdentity}</td>
            <td>${list.studentIsGraduation}</td>
            <td>${list.studentSchool}</td>
            <td>${list.studentSpecialty}</td>
            <td>${list.studentWechat}</td>
            <td>${list.studentMailBox}</td>
            <td>${list.studentStudyId}</td>
            <td>${list.studentCity}</td>
            <td>${list.studentAddress}</td>
            <td>${list.studentParentPhone}</td>
            <td>${list.studentParentName}</td>
            <td>${list.studentUrgent}</td>
            <td>${list.studentPhone}</td>
            <td>${list.studentClassId}</td>
            <td>${list.studentRoom}</td>
            <td>${list.studentPhoto}</td>
            <td>${list.studentAlterTime}</td>
        </tr>`

        $("#detailedInfo").append(html)
    })
}

//全选全不选
$('input[name="checkAll"]').click(function () {
    //当全选按钮是选中状态
    if ($(this).is(':checked')) {
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function () {
            //将checkbox状态改为选中
            $(this).prop("checked", true);
        });
    } else {

        $('input[name="optionAll"]').each(function () {
            $(this).prop("checked", false);
        });
    }
});


show();

function show() {
    $.getJSON(url + "/classInfo/selectallstudent", "pageSize=" + pageSize + "&pageNum=" + pageNum, function (data) {

        let html = ''
        console.log(data)
        var list = data.data.list
        console.log(list)

        for (let i = 0; i < list.length; i++) {
            html += `<tr class="warning">]<td style="width: 80px;"><input type="checkbox" name="optionAll" ></td>
           <td>${list[i].studentId}</td>
            <td>${list[i].studentName}</td>
            <td>${list[i].studentSex}</td>
            <td>${list[i].studentIdentity}</td>
            <td>${list[i].studentIsGraduation}</td>
            <td>${list[i].studentSchool}</td>
            <td>${list[i].studentSpecialty}</td>
            <td>${list[i].studentWechat}</td>
            <td>${list[i].studentMailBox}</td>
            <td>${list[i].studentStudyId}</td>
            <td>${list[i].studentCity}</td>
            <td>${list[i].studentAddress}</td>
            <td>${list[i].studentParentPhone}</td>
            <td>${list[i].studentParentName}</td>
            <td>${list[i].studentUrgent}</td>
            <td>${list[i].studentPhone}</td>
            <td>${list[i].studentClassId}</td>
            <td>${list[i].studentRoom}</td>
            <td>${list[i].studentPhoto}</td>
            <td>${list[i].studentAlterTime}</td>
        </tr>`
        }
        $("#showAllInfo").append(html)

        pageSelect(data.data)
        $("input[name='optionAll']").click(function () {
            if ($(this).is(':checked')) {
                // 如果当前框被选中，则判断是否需要勾选全选框
                var checkbox = $("input[name='optionAll']");
                var length = $(checkbox).length;
                if (length > 0) {
                    for (var i = 0; i < length; i++) {
                        if ($(checkbox[i]).is(":checked") != true) {
                            break;// 如果有未勾选的选择框，不需要勾选全选，跳出循环
                        }
                        if (i == length - 1) {
                            // 如果到最后一个选择框仍然是勾选状态，即所有选择框都被勾选，则勾选全选框
                            $("input[name='checkAll']")
                                .prop("checked", true);
                        }
                    }
                }
            } else {
                // 如果当前选择框未勾选，则取消全选框勾选状态
                $("input[name='checkAll']").prop("checked", false);
            }
        })

    })
}

function pageSelect(data) {
    var html = ``
    if (pageNum == 1) {
        html += `<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    } else {
        html += `<li><a href="/sybida/student/infoStudent.html?pageNum=${pageNum - 1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for (var i = data.navigateFirstPage; i <= data.navigateLastPage; i++) {
        if (pageNum == i) {
            html += `<li class="active"><a href="#">${i}</a></li>`
        } else {
            html += `<li><a href="/sybida/student/infoStudent.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }
    if ((data.pages) <= pageNum) {
        html += `<li class="disabled"><a href="#">&raquo;</a></li>`
    } else {
        var pa = parseInt(pageNum) + 1
        html += `<li><a href="/sybida/student/infoStudent.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html += `<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}







