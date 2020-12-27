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

//全选全不选
$("#chk").click(function(){
    //当全选按钮是选中状态
    if($(this).is(':checked')){
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function(){
            //将checkbox状态改为选中
            $(this).prop("checked",true);
        });
    }else{

        $('input[name="optionAll"]').each(function(){
            $(this).prop("checked",false);
        });
    }
});


var userid=getCookie("userid")
function showDetail(name) {


    $.getJSON({url:url + "/teacher/selectStudentByName",data:"name=" + name,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
                if (data.code == 0) {
                    alert("id不存在！")
                } else {

                    let html = '<tbody><tr class="active">\n' +
                        '<th scope="col"><input type="checkbox" id="chk">&nbsp;&nbsp;全选</th>'+
                        '            <!--<th style="width: 80px;">-->\n' +
                        '                <!--<input type="checkbox" name="checkAll">&nbsp;&nbsp;全选</th>-->\n' +
                        '            <th>学生姓名</th>\n' +
                        '            <th>学生性别</th>\n' +
                        '            <th>班级名称</th>\n' +
                        '            <th>毕业学校</th>\n' +
                        '            <th>手机号</th>\n' +
                        '            <th>身份证号</th>\n' +
                        '            <th>是否毕业</th>\n' +
                        '            <th>专业</th>\n' +
                        '            <th>微信</th>\n' +
                        '            <th>就业城市</th>\n' +
                        '            <th>家长电话</th>\n' +
                        '            <th>家长姓名</th>\n' +
                        ' <th scope="col">查看</th>\n' +
                        '            <th scope="col">删除</th>'+
                        '        </tr>\n' +
                        '        <hr/>'
                    console.log(data)
                    var list = data.data.list
                    console.log(list)
                    for (let i = 0; i < list.length; i++) {
                        if (!list[i].studentSex) {
                            list[i].studentSex = "暂无"
                        }
                        if (!list[i].studentIdentity) {
                            list[i].studentIdentity = "暂无"
                        }
                        if (!list[i].studentIsGraduation) {
                            list[i].studentIsGraduation = "暂无"
                        }
                        if (!list[i].studentSchool) {
                            list[i].studentSchool = "暂无"
                        }
                        if (!list[i].studentSpecialty) {
                            list[i].studentSpecialty = "暂无"
                        }
                        if (!list[i].studentWechat) {
                            list[i].studentWechat = "暂无"
                        }
                        if (!list[i].studentParentPhone) {
                            list[i].studentParentPhone = "暂无"
                        }
                        if (!list[i].studentParentName) {
                            list[i].studentParentName = "暂无"
                        }
                        if (!list[i].classNum) {
                            list[i].classNum = "暂无"
                        }
                        if (!list[i].studentPhone) {
                            list[i].studentPhone = "暂无"
                        }
                        if (!list[i].studentCity) {
                            list[i].studentCity = "暂无"
                        }

                        html += `<tr class="warning">]<td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].studentId}"></td>
                                  <td>${list[i].studentName}</td>
                                  <td>${list[i].studentSex}</td>
                                 <td>${list[i].classNum}</td>  
                                 <td>${list[i].studentSchool}</td>        
                                 <td>${list[i].studentPhone}</td>
                                 <td>${list[i].studentIdentity}</td>
                                 <td>${list[i].studentIsGraduation}</td>
                                 <td>${list[i].studentSpecialty}</td>          
                                 <td>${list[i].studentWechat}</td>
                                 <td>${list[i].studentCity}</td>        
                                 <td>${list[i].studentParentPhone}</td>
                                 <td>${list[i].studentParentName}</td>
                                 <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].studentId}">查看</a></td>
                                     <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
                               data-id="${list[i].studentId}" data-name="${list[i].studentName}" data-target="#exampleModal" >删除</a></td></tr>\\\`
            
                             </tr>`
                    }
                    html+=`<tr><td colspan="16"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
                    html+='</tbody>'
                    $("#showAllInfo").empty();
                    $("#showAllInfo").append(html)
                    $("#pagination").css('display','none');

                    $("a[name='update']").click(function (){
                        var text=$(this).text()
                        console.log("========="+text)
                        if(text.trim()=='查看'){
                            var  id =$(this).attr("value")
                            console.log(id+"====++++++++++++++++")
                            location.href="/sybida/student/seeStudent.html?id="+id;
                        }
                    })
                }
            }
        }
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
    $.getJSON({url:url + "/teacher/selectallstudent", data:"pageSize=" + pageSize + "&pageNum=" + pageNum,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
                let html = ''
                console.log(data)
                var list = data.data.list
                console.log(list)

                for (let i = 0; i < list.length; i++) {
                    if (!list[i].studentSex) {
                        list[i].studentSex = "暂无"
                    }
                    if (!list[i].studentIdentity) {
                        list[i].studentIdentity = "暂无"
                    }
                    if (!list[i].studentIsGraduation) {
                        list[i].studentIsGraduation = "暂无"
                    }
                    if (!list[i].studentSchool) {
                        list[i].studentSchool = "暂无"
                    }
                    if (!list[i].studentSpecialty) {
                        list[i].studentSpecialty = "暂无"
                    }
                    if (!list[i].studentWechat) {
                        list[i].studentWechat = "暂无"
                    }
                    if (!list[i].studentParentPhone) {
                        list[i].studentParentPhone = "暂无"
                    }
                    if (!list[i].studentParentName) {
                        list[i].studentParentName = "暂无"
                    }
                    if (!list[i].classNum) {
                        list[i].classNum = "暂无"
                    }
                    if (!list[i].studentPhone) {
                        list[i].studentPhone = "暂无"
                    }
                    if (!list[i].studentCity) {
                        list[i].studentCity = "暂无"
                    }

                    html += `<tr class="warning">]<td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].studentId}"></td>                          
                                 <td>${list[i].studentName}</td>
                                  <td>${list[i].studentSex}</td>
                                 <td>${list[i].classNum}</td>  
                                 <td>${list[i].studentSchool}</td>        
                                 <td>${list[i].studentPhone}</td>
                                 <td>${list[i].studentIdentity}</td>
                                 <td>${list[i].studentIsGraduation}</td>
                                 <td>${list[i].studentSpecialty}</td>          
                                 <td>${list[i].studentWechat}</td>
                                 <td>${list[i].studentCity}</td>        
                                 <td>${list[i].studentParentPhone}</td>
                                 <td>${list[i].studentParentName}</td>
                                     <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].studentId}">查看</a></td>
                                     <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
                               data-id="${list[i].studentId}" data-name="${list[i].studentName}" data-target="#exampleModal" >删除</a></td></tr>\`
                             </tr>`
                }
                html+=`<tr><td colspan="16"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
                $("#showAllInfo").append(html)
                $("#deleteBySelect").click(function (){
                    $("#exampleModalAll").attr("class","modal fade in")
                    $("#exampleModalAll").css("display","inline-block")
                })
                pageSelect(data.data)
                $("a[name='update']").click(function (){
                    var text=$(this).text()
                    console.log("========="+text)
                    if(text.trim()=='查看'){
                        var  id =$(this).attr("value")
                        console.log(id+"====++++++++++++++++")
                        location.href="/sybida/student/seeStudent.html?id="+id;
                    }
                })
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
            }
        }
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