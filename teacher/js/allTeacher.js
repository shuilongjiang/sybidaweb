var pageNum=1
var pageSize=$("#pageSizeSel").val()
var userid=getCookie("userid")
var teacherStudy=-1
var search=location.search
var arr=search.split("&")
if(arr.length>1){
    pageNum1=arr[0]
    pageNum=pageNum1.split("=")[1]

    pageSize1=arr[1]
    pageSize=pageSize1.split("=")[1]

    teacherStudy1=arr[2]
    teacherStudy=teacherStudy1.split("=")[1]

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
    location.href="/sybida/teacher/allTeacher.html?pageNum=1&pageSize="+pageSize+"&teacherStudy="+teacherStudy
})
var layer
layui.use('layer', function(){
    layer = layui.layer;
});
//学习方向下拉选框
$.getJSON({
    url:url+"/teacher/selectStudy",
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data){
        if(data== -1000){
            location.href=logindexurl
        }else {
            var htm=`<option value="-1">全部</option>`
            for (var i=0;i<data.data.length;i++){
                htm+=`<option value="${data.data[i].studyId}">${data.data[i].studyAspect}</option>`
            }
            $("#teacherStudy").append(htm)
            var selectA1 = $("#teacherStudy").find("option"); //从A1下拉框中 搜索值
            for(var i=0;i<selectA1.length;i++){
                var t=$(selectA1[i]).val()
                if(t==teacherStudy){
                    $(selectA1[i]).attr("selected","selected")
                }
            }
            //change事件
            $('#teacherStudy').change(
                function (){
                    teacherStudy=$("#teacherStudy").val()
                }
            )
        }
        }})
//全选全不选
$('input[name="checkAll"]').click(function(){
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
pageshoe();
function pageshoe(){
    $.getJSON({
        url:url+"/teacher/selectpage",
        data:"pageSize="+pageSize+"&pageNum="+pageNum+"&teacherStudy="+teacherStudy,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data){
            if(data== -1000){
                location.href=logindexurl
            }else {
                let html = ''
                var le=data.data.list
                for(let i = 0; i < le.length; i++){
                    if(!le[i].teachPhoto){
                        le[i].teachPhoto="#"
                    }
                    if(!le[i].teachName){
                        le[i].teachName=""
                    }
                    if(!le[i].teachName){
                        le[i].teachName=""
                    }if(!le[i].teachSex){
                        le[i].teachSex=""
                    }if(!le[i].teachTel){
                        le[i].teachTel=""
                    }
                    if(!le[i].teachWechat){
                        le[i].teachWechat="未完善"
                    }
                    if(!le[i].teachQq){
                        le[i].teachQq="未完善"
                    }
                    if(!le[i].teachNull2){
                        le[i].teachNull2=""
                    }
                    if (i%2==0){
                        html +=`<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${le[i].teachId}"></td>
            <td><img src="${Qnyurl}${le[i].teachPhoto}" class="img-rounded" style="height:50px;width: 40px;">
</td>
            <td>${le[i].teachName}</td>
            <td>${le[i].teachSex}</td>
            <td>${le[i].teachNull2}</td>
            <td>${le[i].teachTel}</td>
            <td>${le[i].teachWechat}</td>
            <td>${le[i].teachQq}</td>
   
            <td><a class="layui-btn layui-btn-xs" lay-event="edit"  href="/sybida/teacher/updateTeacherformanager.html?userid=${le[i].teachId}">编辑</a></td>
            <td>
            
            <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
              
               data-id="${le[i].teachId}" data-name="${le[i].teachName}" data-target="#exampleModal" >离职</a></td>
        </tr>`
                    }else{
                        html +=` <tr class="info"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${le[i].teachId}"></td>
            <td><img src="${Qnyurl}${le[i].teachPhoto}" class="img-rounded" style="height:50px;width: 40px;"></td>
            <td>${le[i].teachName}</td>
            <td>${le[i].teachSex}</td>
           <td>${le[i].teachNull2}</td>
            <td>${le[i].teachTel}</td>
            <td>${le[i].teachWechat}</td>
            <td>${le[i].teachQq}</td>
          
            <td><a class="layui-btn layui-btn-xs" lay-event="edit" href="/sybida/teacher/updateTeacherformanager.html?userid=${le[i].teachId}">编辑</a></td>
            <td> <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"
              
               data-id="${le[i].teachId}" data-name="${le[i].teachName}" data-target="#exampleModal" >离职</a></td>
       </td></tr>`
                    }
                }
                html+=`<tr><td colspan="10"><button type="button" id="deleteBySelect" class="btn btn-danger">离职所选</button></td></tr>`
                $("table").append(html)

                var deleteAll={}
                $("#deleteBySelect").click(function (){
                    $("#exampleModalAll").attr("class","modal fade in")
                    $("#exampleModalAll").css("display","inline-block")
                })
                pageSelect(data.data)
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
    }})
}
function pageSelect(data){
    var  html=``
    if(pageNum==1){

        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/teacher/allTeacher.html?pageNum=${pageNum-1}&pageSize=${pageSize}&teacherStudy=${teacherStudy}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/teacher/allTeacher.html?pageNum=${i}&pageSize=${pageSize}&teacherStudy=${teacherStudy}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/teacher/allTeacher.html?pageNum=${pa}&pageSize=${pageSize}&teacherStudy=${teacherStudy}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<li><button class="btn btn-primary" type="button">
        总页数： <span class="badge">${data.pages}</span>
        </button></li>`


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
    modal.find('#messagetext').text('确认将教师-' +name+'-离职吗？')
})
$("#deleteOneSure").click(function (){
    console.log(idtea)
    $.post({
         url:url+"/teacher/deleteteacher",
         data:"deleteTeacherId="+idtea,
         dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
                if(data== -1000){
                    location.href=logindexurl
                }else {
                    if(data.code==1){
                        location.href="/sybida/teacher/allTeacher.html?pageNum=1&pageSize="+pageSize+"&teacherStudy="+teacherStudy
                    }else{
                        layer.alert("删除失败");
                    }
                }
            }
    })

    //删除写这里
})
