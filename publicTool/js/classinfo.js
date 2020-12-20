var selectClass=-1
var selectStudy=-1

var pageNum =1
// 每页默认5条数据
var pageSize=$("#pageSizeSel").val()
// 获取传递的参数  /showhero.html?currPage=2--?currPage=2
var search=location.search
var arr=search.split("&")
if(arr.length>1){
    pageNum1=arr[0]
    pageNum=pageNum1.split("=")[1]

    pageSize1=arr[1]
    pageSize=pageSize1.split("=")[1]

    selectClass1=arr[2]
    selectClass=selectClass1.split("=")[1]
}

    // location.href="/sybida/publicTool/classInfo.html?currPage=1&pageSize="+pageSize

$("#selectButt").click(function (){
    location.href="/sybida/publicTool/classInfo.html?pageNum=1&pageSize="+pageSize+"&selectClass="+selectClass
})

$.getJSON(url+"/classInfo/selectPage","pageSize="+pageSize+"&pageNum="+pageNum+"&selectClass="+selectClass,function (data){
     let html=''
    var list= data.data.list
    for (let i=0;i<list.length;i++) {

        if (!list[i].classNum) {
            list[i].classNum = "未完善"
        }
        if (!list[i].classTeachId){
            list[i].classTeachId = "未完善"
        }
        if (!list[i].classManagerId) {
            list[i].classManagerId = "未完善"
        }
        if (!list[i].classStudyId) {
            list[i].classStudyId = "未完善"
        }
        if (!list[i].classTime) {
            list[i].classTime = "未完善"
        }
        if (list[i].classIsGraduate==1) {
            list[i].classIsGraduate ="否"
        }
        if (!list[i].classIsGraduate) {
            list[i].classIsGraduate = "未完善"
        }
        if (!list[i].classAlterTime) {
            list[i].classAlterTime = "未完善"
        }


        if (i % 2 == 0) {
            html +=`<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].classId}"></td>
        <td>${list[i].classNum}</td>
        <td>${list[i].classTeachId}</td>
        <td>${list[i].classManagerId}</td>
        <td>${list[i].classStudyId}</td>
        <td>${list[i].classTime}</td>
        <td>${list[i].classIsGraduate}</td>
        <td>${list[i].classAlterTime}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].classId}">修改</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].classId}" data-name="${list[i].classNum}" data-target="#exampleModal" >删除</a></td></tr>`
        }else{
            html +=` <tr class="info"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${list[i].classId}""></td>
        <td>${list[i].classNum}</td>
        <td>${list[i].classTeachId}</td>
        <td>${list[i].classManagerId}</td>
        <td>${list[i].classStudyId}</td>
        <td>${list[i].classTime}</td>
        <td>${list[i].classIsGraduate}</td>
        <td>${list[i].classAlterTime}</td>
        <td><a name="update" class="layui-btn layui-btn-xs" lay-event="edit" value="${list[i].classId}">修改</a></td>
        <td><a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
        data-id="${list[i].classId}" data-name="${list[i].classNum}" data-target="#exampleModal" >删除</a></td></tr>`
        }
    }
    html+=`<tr><td colspan="10"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所选</button></td></tr>`
    $("table").append(html)

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
            console.log(id+"====++++++++++++++++")
             location.href="/sybida/publicTool/updateClass.html?classId="+id;

        }
    })
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




function pageSelect(data){
    var  html=``
    if(pageNum==1){

        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/publicTool/classInfo.html?pageNum=${pageNum-1}&pageSize=${pageSize}&selectClass=${selectClass}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/publicTool/classInfo.html?pageNum=${i}&pageSize=${pageSize}&selectClass=${selectClass}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/publicTool/classInfo.html?pageNum=${pa}&pageSize=${pageSize}&selectClass=${selectClass}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}


$.getJSON(url+"/classInfo/selectClass",function (data) {
    var html=`<option value="-1">全部</option>`
    for (let i = 0; i < data.length; i++) {
        html += `<option value="${data[i].classNum}">${data[i].classNum}</option>`
    }
    $('#classNum').append(html);


    var selectA1 = $('#classNum').find("option"); //从A1下拉框中 搜索值
for(var i=0;i<selectA1.length;i++){
    var t=$(selectA1[i]).val()

    if(t==selectClass){
        $(selectA1[i]).attr("selected","selected")
    }

}
//change事件
$('#classNum').change(
    function (){
        selectClass=$('#classNum').val()
    }
)
});

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

var idtea
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    idtea = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#messagetext').text('确认将班级-' +name+'-离职吗？')
})
$("#deleteOneSure").click(function (){
    console.log(idtea+"======================")
    $.post(url+"/classInfo/deleteClass","classId="+idtea,function (data) {
        if(data.code==1){
            console.log(data.code+"======================")
            location.href="/sybida/publicTool/classInfo.html?pageNum=1&pageSize="+pageSize+"&selectClass="+selectClass
        }else{
            layer.alert("删除失败");
        }
    },"json")

    //删除写这里
})

