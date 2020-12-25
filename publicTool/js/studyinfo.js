
var selectStudy=-1

var pageNum =1
// 每页默认5条数据
var pageSize=$("#pageSizeSel").val()
var search=location.search
var arr=search.split("&")
if(arr.length>1){
    pageNum1=arr[0]
    pageNum=pageNum1.split("=")[1]

    pageSize1=arr[1]
    pageSize=pageSize1.split("=")[1]

    selectStudy1=arr[2]
    selectStudy=selectStudy1.split("=")[1]
}

$("#selectButt").click(function (){
    location.href="/sybida/publicTool/studyInfo.html?pageNum=1&pageSize="+pageSize+"&selectStudy="+selectStudy
})
var userid=getCookie("userid")
$.getJSON({
    url:url+"studyInfo/selectPage",
    data:"pageSize="+pageSize+"&pageNum="+pageNum+"&selectStudy="+selectStudy,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data){
        if(data== -1000){
            location.href=logindexurl
        }else{
    let html=''
    var list= data.data.list
    for (let i=0;i<list.length;i++) {

        if (!list[i].studyAspect) {
            list[i].studyAspect = "未完善"
        }
        if (!list[i].studyIntroduce){
            list[i].studyIntroduce = "未完善"
        }
        if (!list[i].userAuthority) {
            list[i].userAuthority = "未完善"
        }
        if (!list[i].classStudyId) {
            list[i].classStudyId = "未完善"
        }
        if (!list[i].studyAlterTime) {
            list[i].studyAlterTime = "未完善"
        }

        var date = Date.parse(list[i].studyAlterTime)
        date = new Date(date)

        if (i % 2 == 0) {
            html += `<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].studyId}"></td>
        <td>${list[i].studyAspect}</td>
        <td>${list[i].studyIntroduce}</td>
        <td>${list[i].userAuthority}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].studyId}">修改</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].studyId}" data-name="${list[i].studyAspect}" data-target="#exampleModal" >删除</a></td></tr>`
        } else {
            html += ` <tr class="info"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].studyId}""></td>
    <td>${list[i].studyAspect}</td>
        <td>${list[i].studyIntroduce}</td>
        <td>${list[i].userAuthority}</td>
        <td>${date.pattern("yyyy-MM-dd HH:mm:ss")}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].studyId}">修改</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].studyId}" data-name="${list[i].studyAspect}" data-target="#exampleModal" >删除</a></td></tr>`
        }

    }
    html+=`<tr><td colspan="10"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
    $("table").append(html)
    $("#deleteBySelect").click(function (){
        $("#exampleModalAll").attr("class","modal fade in")
        $("#exampleModalAll").css("display","inline-block")
    })

    $("input[name='optionAll']").click(function (){
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
            location.href="/sybida/publicTool/updateStudy.html?studyId="+id;

        }
    })
}}})

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

        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/publicTool/studyInfo.html?pageNum=${pageNum-1}&pageSize=${pageSize}&selectStudy=${selectStudy}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/publicTool/studyInfo.html?pageNum=${i}&pageSize=${pageSize}&selectStudy=${selectStudy}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/publicTool/studyInfo.html?pageNum=${pa}&pageSize=${pageSize}&selectStudy=${selectStudy}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)
}


$.getJSON({url:url+"/register/selectStudy",
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data){
        if(data== -1000){
            location.href=logindexurl
        }else{
    var html=`<option value="-1">全部</option>`
    for (let i = 0; i < data.length; i++) {
        html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
    }
    $('#selectStudy').append(html);

    var selectA1 = $('#selectStudy').find("option"); //从A1下拉框中 搜索值
    for(var i=0;i<selectA1.length;i++){
        var t=$(selectA1[i]).val()

        if(t==selectStudy){
            $(selectA1[i]).attr("selected","selected")
        }
    }
//change事件
    $('#selectStudy').change(
        function (){
            selectStudy=$('#selectStudy').val()
        }
    )
}}});

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


var studyId
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    studyId = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#messagetext').text('确认将班级-' +name+'-离职吗？')
})
$("#deleteOneSure").click(function (){
    $.post({
        url:url+"/studyInfo/deleteStudyId",
        data:"studyId="+studyId,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else {
                if (data.code == 1) {
                    location.href = "/sybida/publicTool/studyInfo.html?pageNum=1&pageSize=" + pageSize + "&selectClass=" + selectClass
                } else {
                    layer.alert("删除失败");
                }
            }
    }})

})


