var pageNum = 1
var pageSize = $("#pageSizeSel").val()
var classId
// var teacherStudy=-1
var search = location.search
var arr = search.split("&")
if (arr.length > 1) {
    pageNum1 = arr[0]
    pageNum = pageNum1.split("=")[1]

    pageSize1 = arr[1]
    pageSize = pageSize1.split("=")[1]
    //
    userid1=arr[2]
    userid=userid1.split("=")[1]
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

    location.href = "/sybida/student/classStudent.html?pageNum=1&pageSize="+pageSize+"&userId="+userid
})


$("#selectButt1").click(function () {
    let stuName = $("#searcheStuId").val()
    if (!stuName || !(stuName.trim())) {
        location.href = "/sybida/student/classStudent.html?pageNum=1&pageSize="+pageSize+"&userId="+userid
    } else {
            showDetail(stuName)
    }
})
var layer
layui.use('layer', function(){
    layer = layui.layer;
});

var userid=getCookie("userid")
function showDetail(stuName) {
    $.getJSON({url:url + "/student/selectstudentbyname", data:"stuName=" + stuName+"&classId="+classId,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data2) {
            if(data2== -1000){
                location.href=logindexurl
            }else{
                if (data2.code == 0){
                    layer.alert("学生不存在", {
                            skin: 'layui-layer-molv' //样式类名
                            ,closeBtn: 0
                        }
                    );
                }else {
                    $("#detailCon").css('display', '')
                    let html = ''
                    console.log(data2)
                    let list = data2.data[0]
                    if (!list.studentSex) {
                        list.studentSex = "暂无"
                    }
                    if (!list.studentIdentity) {
                        list.studentIdentity = "暂无"
                    }
                    if (!list.studentIsGraduation) {
                        list.studentIsGraduation = "暂无"
                    }
                    if (!list.studentSchool) {
                        list.studentSchool = "暂无"
                    }
                    if (!list.studentSpecialty) {
                        list.studentSpecialty = "暂无"
                    }
                    if (!list.studentWechat) {
                        list.studentWechat = "暂无"
                    }
                    if (!list.studentParentPhone) {
                        list.studentParentPhone = "暂无"
                    }
                    if (!list.studentParentName) {
                        list.studentParentName = "暂无"
                    }
                    if (!list.studentClassId) {
                        list.studentClassId = "暂无"
                    }
                    if (!list.studentPhone) {
                        list.studentPhone = "暂无"
                    }
                    if (!list.studentCity) {
                        list.studentCity = "暂无"
                    }

                    html += `<tr class="warning">
                             <td>${list.studentId}</td>
                             <td>${list.studentName}</td>
                             <td>${list.studentSex}</td>
                             <td>${list.studentIdentity}</td>
                             <td>${list.studentIsGraduation}</td>
                             <td>${list.studentSchool}</td>
                             <td>${list.studentSpecialty}</td>
                             <td>${list.studentWechat}</td>
                             <td>${list.studentCity}</td>
                             <td>${list.studentParentPhone}</td>
                             <td>${list.studentParentName}</td>
                             <td>${list.studentPhone}</td>
                             <td>${list.studentClassId}</td><td></td></tr>`
                    $("#detailedInfo").append(html)
                }

            }

    }})
}






console.log(userid+"==========================")
show();


function show() {

    $.ajax({
        url: url+"classInfo/teacheridfindclass",
        type: 'POST',
        //   timeout: '30000',
        data: "pageSize=" + pageSize + "&pageNum=" + pageNum+"&userId="+userid,
        // contentType: 'application/json;charset=utf-8',
        dataType: 'json',

        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success: function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
                if(data.code==1) {
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
                        if (!list[i].studentClassId) {
                            list[i].studentClassId = "暂无"
                        }
                        if (!list[i].studentPhone) {
                            list[i].studentPhone = "暂无"
                        }
                        if (!list[i].studentCity) {
                            list[i].studentCity = "暂无"
                        }
                        html += `<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].studentId}"></td>
                                   <td>${list[i].studentId}</td>
                                   <td>${list[i].studentName}</td>
                                   <td>${list[i].studentSex}</td>
                                   <td>${list[i].studentIdentity}</td>
                                   <td>${list[i].studentIsGraduation}</td>
                                   <td>${list[i].studentSchool}</td>
                                   <td>${list[i].studentSpecialty}</td>
                                   <td>${list[i].studentWechat}</td>
                                   <td>${list[i].studentCity}</td>
                                   <td>${list[i].studentParentPhone}</td>
                                   <td>${list[i].studentParentName}</td>
                                   <td>${list[i].studentPhone}</td>
                                   <td>${list[i].studentClassId}</td>
                                   <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].studentId}">修改</a></td>
                                   <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
                               data-id="${list[i].studentId}" data-name="${list[i].studentName}" data-target="#exampleModal" >删除</a></td></tr>`
                    }
                    // $("#showAllInfo").append(html)

                         html+=`<tr><td colspan="16"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
                         $("#showAllInfo").append(html)

                    // var deleteAll={}
                         $("#deleteBySelect").click(function (){
                             $("#exampleModalAll").attr("class","modal fade in")
                             $("#exampleModalAll").css("display","inline-block")
                         })


                    $("input[name='optionAll']").click(function (){
                        if ($(this).is(':checked')) {
                            // 如果当前框被选中，则判断是否需要勾选全选框
                            var checkbox = $("input[name='optionAll']");
                            var length = $(checkbox).length;
                            console.log(length+"=========================")
                            if (length > 0) {
                                for (var i = 0; i < length; i++) {
                                    if ($(checkbox[i]).is(":checked") != true) {
                                        break;// 如果有未勾选的选择框，不需要勾选全选，跳出循环
                                    }
                                    if (i == length - 1) {
                                        // 如果到最后一个选择框仍然是勾选状态，即所有选择框都被勾选，则勾选全选框
                                        $("#chk").prop("checked", true);
                                    }
                                }
                            }
                        } else {
                            // 如果当前选择框未勾选，则取消全选框勾选状态
                            $("#chk").prop("checked", false);
                        }
                    });
                    pageSelect(data.data)

                    $("a[name='update']").click(function (){
                        var text=$(this).text()
                        console.log("========="+text)
                        if(text.trim()=='修改'){
                            var  id =$(this).attr("value")
                            location.href="/sybida/student/updateInfoStudent.html?id="+id;
                        }
                    })
                    classId=data.message
                    $("#abtn").attr("href","http://localhost:8080/teacher/selectstudentclassid?classId="+classId);
                }
            }

            }




    })
}


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

function pageSelect(data){
    var  html=``
    if(pageNum==1){
        // classStudent.html?pageNum=1&pageSize="+pageSize+"&userId="+userid
        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/student/classStudent.html?pageNum=${pageNum-1}&pageSize=${pageSize}&userId=${userid}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/student/classStudent.html?pageNum=${i}&pageSize=${pageSize}&userId=${userid}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/student/classStudent.html?pageNum=${pa}&pageSize=${pageSize}&userId=${userid}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)
}

var idtea
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    idtea = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#messagetext').text('确认将学生-' +name+'-离职吗？')
})

var layer
layui.use('layer', function(){
    layer = layui.layer;
});
$("#deleteOneSure").click(function (){
    console.log(idtea+"======================")
    $.post({url:url+"/student/deleteonestudent",data:"studentId="+idtea,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
                if(data.code==1){
                    console.log(data.code+"======================")
                    location.href = "/sybida/student/classStudent.html?pageNum=1&pageSize="+pageSize+"&userId="+userid
                }else{
                    layer.alert("删除失败");
                }
            }

    }},"json")

    //删除写这里
})

$("#closebtn").click(function () {
    $("#detailCon").css('display', 'none')
    location.href = "/sybida/student/classStudent.html?pageNum=1&pageSize="+pageSize+"&userId="+userid
})