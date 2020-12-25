// var selectClass=-1
// var selectStudy=-1
var pageNum =1
var companyUserId
var teachName
// 每页默认5条数据
var pageSize=$("#pageSizeSel").val()
var search=location.search
var arr=search.split("&")
if(arr.length>1){
    pageNum1=arr[0]
    pageNum=pageNum1.split("=")[1]

    pageSize1=arr[1]
    pageSize=pageSize1.split("=")[1]

    // selectClass1=arr[2]
    // selectClass=selectClass1.split("=")[1]
}

var selectA2 = $("#pageSizeSel").find("option"); //从A1下拉框中 搜索值
for(var i=0;i<selectA2.length;i++){
    var t=$(selectA2[i]).val()

    if(t==pageSize){
        $(selectA2[i]).attr("selected","selected")
    }
}
//每页条数的change事件
$('#pageSizeSel').change(
    function (){
        pageSize=$("#pageSizeSel").val()
    }
)

$("#selectButt").click(function (){
    location.href="/sybida/company/companyinfo2.html?pageNum=1&pageSize="+pageSize
})

var userid=getCookie("userid")
$.getJSON({url:url+"/company/selectcompanyinfo",
    data: "pageSize="+pageSize+"&pageNum="+pageNum,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if (data == -1000) {
            location.href = logindexurl
        } else {
            let html = ''
            var list = data.data.list
            for (let i = 0; i < list.length; i++) {

                if (!list[i].companyUserId) {
                    list[i].companyUserId = "未完善"
                }
                if (!list[i].companyName) {
                    list[i].companyName = "未完善"
                }
                if (!list[i].companyStartTime) {
                    list[i].companyStartTime = "未完善"
                }
                if (!list[i].classStudyId) {
                    list[i].classStudyId = "未完善"
                }
                if (!list[i].classTime) {
                    list[i].classTime = "未完善"
                }
                if (!list[i].companyEndTime) {
                    list[i].companyEndTime = "未完善"
                }
                if (!list[i].companyStudyId) {
                    list[i].companyStudyId = "未完善"
                }
                if (!list[i].companyAddress) {
                    list[i].companyAddress = "未完善"
                }
                if (!list[i].companyRequire) {
                    list[i].companyRequire = "未完善"
                }
                if (!list[i].companyWeb) {
                    list[i].companyWeb = "未完善"
                }
                if (!list[i].companySalary) {
                    list[i].companySalary = "未完善"
                }
                if (!list[i].companyMailbox) {
                    list[i].companyMailbox = "未完善"
                }
                if (!list[i].companyPhone) {
                    list[i].companyPhone = "未完善"
                }
                var date = Date.parse(list[i].companyStartTime)
                date = new Date(date)

                var date2 = Date.parse(list[i].companyEndTime)
                date2 = new Date(date2);

                if (i % 2 == 0) {
                    html += `<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].companyId}"></td>
        <td>${list[i].teachName}</td>
        <td>${list[i].companyName}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${list[i].studyAspect}</td>
        <td>${list[i].companyAddress}</td>
        <td>${list[i].companyRequire}</td>
        <td>${list[i].companyWeb}</td>
        <td>${list[i].companySalary}</td>
        <td>${list[i].companyMailbox}</td>
        <td>${list[i].companyPhone}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].companyId}">查看详情</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].companyId}" data-name="${list[i].companyName}" data-target="#exampleModal" >删除</a></td></tr>`
                } else {
                    html += ` <tr class="info"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].companyId}""></td>
       <td>${list[i].teachName}</td>
        <td>${list[i].companyName}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${list[i].studyAspect}</td>
        <td>${list[i].companyAddress}</td>
        <td>${list[i].companyRequire}</td>
        <td>${list[i].companyWeb}</td>
        <td>${list[i].companySalary}</td>
        <td>${list[i].companyMailbox}</td>
        <td>${list[i].companyPhone}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].classId}">查看详情</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].companyId}" data-name="${list[i].companyName}" data-target="#exampleModal" >删除</a></td></tr>`
                }
            }
            html += `<tr><td colspan="14"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
            $("#allInfo").append(html)

            // var deleteAll={}
            $("#deleteBySelect").click(function () {
                $("#exampleModalAll").attr("class", "modal fade in")
                $("#exampleModalAll").css("display", "inline-block")
            })

            $("input[name='optionAll']").click(function () {
                if ($(this).is(':checked')) {
                    // 如果当前框被选中，则判断是否需要勾选全选框
                    var checkbox = $("input[name='optionAll']");
                    var length = $(checkbox).length;
                    console.log(length + "=========================")
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

            $("a[name='update']").click(function () {
                var text = $(this).text()
                console.log("=========" + text)
                if (text.trim() == '查看详情') {
                    var id = $(this).attr("value")
                    console.log(id + "====++++++++++++++++")
                    location.href = "/sybida/company/companyDetails.html?companyId=" + id;

                }
            })

        }
    }
})


function pageSelect(data){
    var  html=``
    if(pageNum==1){

        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/company/companyinfo2.html?pageNum=${pageNum-1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/company/companyinfo2.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/company/companyinfo2.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)
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

var companyId
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    companyId = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#messagetext').text('确认将公司-' +name+'-删除吗？')
})
$("#deleteOneSure").click(function (){
    $.post(url+"/company/deleteonecompany","companyId="+companyId,function (data) {
        if(data.code==1){
            location.href="/sybida/company/companyinfo2.html?pageNum=1&pageSize="+pageSize
        }else{
            layer.alert("删除失败");
        }
    },"json")

    //删除写这里
})


$("#selectButt1").click(function () {
    let stuName = $("#searcheStuId").val()
    if (!stuName || !(stuName.trim())) {
        location.href = "/sybida/company/companyinfo2.html?pageNum=1&pageSize="+pageSize
    } else {
        showDetail(stuName)
    }
})

function showDetail(stuName) {
    $.getJSON(url + "/company/selectbycompanyname", "stuName=" + stuName, function (data2) {
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
            let list = data2.data
            console.log(list+"=================")
                if (!list.companyName){
                    list.companyName = "未完善"
                }
                if (!list.companyStartTime) {
                    list.companyStartTime = "未完善"
                }
                if (!list.classStudyId) {
                    list.classStudyId = "未完善"
                }
                if (!list.classTime) {
                    list.classTime = "未完善"
                }
                if (!list.companyEndTime) {
                    list.companyEndTime = "未完善"
                }
                if (!list.companyStudyId) {
                    list.companyStudyId = "未完善"
                }
                if (!list.companyAddress) {
                    list.companyAddress = "未完善"
                }
                if (!list.companyRequire) {
                    list.companyRequire = "未完善"
                }
                if (!list.companyWeb) {
                    list.companyWeb = "未完善"
                }
                if (!list.companySalary) {
                    list.companySalary = "未完善"
                }
                if (!list.companyMailbox) {
                    list.companyMailbox = "未完善"
                }
                if (!list.companyPhone) {
                    list.companyPhone = "未完善"
                }
                var date = Date.parse(list.companyStartTime)
                date = new Date(date)

                var date2=Date.parse(list.companyEndTime)
                date2=new Date(date2);

                if (i % 2 == 0) {
                    html +=`<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].companyId}"></td>
        <td>${list.teachName}</td>
        <td>${list.companyName}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${list.studyAspect}</td>
        <td>${list.companyAddress}</td>
        <td>${list.companyRequire}</td>
        <td>${list.companyWeb}</td>
        <td>${list.companySalary}</td>
        <td>${list.companyMailbox}</td>
        <td>${list.companyPhone}</td></tr>`
                }else{
                    html +=` <tr class="info">
       <td>${list.teachName}</td>
        <td>${list.companyName}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td>${list.studyAspect}</td>
        <td>${list.companyAddress}</td>
        <td>${list.companyRequire}</td>
        <td>${list.companyWeb}</td>
        <td>${list.companySalary}</td>
        <td>${list.companyMailbox}</td>
        <td>${list.companyPhone}</td></tr>`
          $("#selecttable").append(html)
                }

        }
    })
}

$("#closebtn").click(function () {
    $("#detailCon").css('display', 'none')
    location.href = "/sybida/company/companyinfo2.html?pageNum=1&pageSize="+pageSize
})