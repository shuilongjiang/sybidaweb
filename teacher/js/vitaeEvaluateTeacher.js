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
    location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize
})

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
    $.getJSON(url + "/teacher/selectallvitae", "pageSize=" + pageSize + "&pageNum=" + pageNum, function (data) {

        let html = ''
        console.log(data)
        var list = data.data.list
        console.log(list)

        for (let i = 0; i < list.length; i++) {

            if (list[i].vitaeIsRead == 1) {
                list[i].vitaeIsRead = "是"
            } else {
                list[i].vitaeIsRead = "否"
            }

            if (list[i].vitaeIsNew == 1) {
                list[i].vitaeIsNew = "是"
            } else {
                list[i].vitaeIsNew = "否"
            }
            // console.log(new Date(list[i].vitaeAlterTime))
            if (!list[i].vitaeUrl) {
                list[i].vitaeUrl = "暂无"
            }
            if (!list[i].vitaeLevel) {
                list[i].vitaeLevel = "暂无"
            } if (!list[i].vitaeDownloadFrequency) {
                list[i].vitaeDownloadFrequency = "暂无"
            } if (!list[i].vitaeHistoryFrequency) {
                list[i].vitaeHistoryFrequency = "暂无"
            }

            html += `<tr class="warning">
            <td>${list[i].vitaeId}</td>
            <td>${list[i].vitaeStudentId}</td>
            <td>${list[i].studentName}</td>
            <td>${list[i].studyAspect}</td>
            <td>${list[i].vitaeLevel}</td>
            <td>${list[i].vitaeIsNew}</td>
            <td>${list[i].vitaeUrl}</td>
            <td>${list[i].vitaeIsRead}</td>
            <td>${list[i].vitaeDownloadFrequency}</td>
            <td>${list[i].vitaeHistoryFrequency}</td>
            <td>${list[i].vitaeAlterTime}</td>
           <td><button id="updateLevelBtn" class="layui-btn layui-btn-xs"onclick="updateVitaeLevel('${list[i].vitaeId}','${list[i].vitaeStudentId}','${list[i].studentName}')">评价</button>
           <button class="layui-btn layui-btn-xs">下载</button></td>
        </tr>`
        }
        $("table").append(html)

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
        html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${pageNum - 1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for (var i = data.navigateFirstPage; i <= data.navigateLastPage; i++) {
        if (pageNum == i) {
            html += `<li class="active"><a href="#">${i}</a></li>`
        } else {
            html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }
    if ((data.pages) <= pageNum) {
        html += `<li class="disabled"><a href="#">&raquo;</a></li>`
    } else {
        var pa = parseInt(pageNum) + 1
        html += `<li><a href="/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html += `<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}


// <td><a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a></td>
// <td>
//
// <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
//wair me
// data-id="${list[i].teachId}" data-name="${list[i].teachName}" data-target="#exampleModal" >删除</a></td>

function updateVitaeLevel(vitaeId, userid, name) {
    // alert("123")
    $(".updateLevel").css('display', '')
    $("#vitaeID").val(vitaeId)
    $("#vitaeEvaluateUserId").val(userid)
    $("#vitaeEvaluateUserName").val(name)
}


$("#addVitaeLevel").click(function () {

    var vitaeId = $("#vitaeID").val()
    var vitaeStudentId = $("#vitaeEvaluateUserId").val()
    var vitaeComment = $("#vitaeEvaluateComment").val()
    var picture = $("#vitaeEvaluatePicture").val()

    if (judgeAll()) {
        $.getJSON(url + "/teacher/insertvitaeevaluatelevel", "comment=" + vitaeComment + "&picUrl=" + picture + "&vitaeId=" + vitaeId + "&studentId=" + vitaeStudentId, function (data) {

            if (data.code == 1) {
                alert("评价成功！")
                location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize

            } else {
                alert("评价失败！")
                location.href = "/sybida/teacher/vitaeEvaluateTeacher.html?pageNum=1&pageSize=" + pageSize
            }
        })
    }

})

// $("#vitaeEvaluateComment").blur(function () {
//     let inputValue = $(this).val()
//     if (!inputValue || !(inputValue.trim())) {
//         $(".tips").eq(0).html("请填写信息")
//         return false
//     } else {
//         $(".tips").eq(0).html("")
//         return true
//     }
// })

$("#vitaeEvaluateComment").blur(function () {
    judgeSpace($(this), 0)
})

$("#vitaeEvaluatePicture").blur(function () {
    judgeSpace($(this), 1)
})


// let inputValue = $(this).val()
// if (!inputValue || !(inputValue.trim())) {
//     $(".tips").eq(1).html("请填写信息")
//     return false
// } else {
//     $(".tips").eq(1).html("")
//     return true
// }


function judgeSpace(obj, index) {
    let inputValue = obj.val()
    if (!inputValue || !(inputValue.trim())) {
        $(".tips").eq(index).html("请填写信息")
        return false
    } else {
        $(".tips").eq(index).html("")
        return true
    }
}

function judgeAll() {
    if (judgeSpace($("#vitaeEvaluateComment"), 0) && judgeSpace($("#vitaeEvaluatePicture"), 1)) {
        return true
    }
}





