// 学生个人面试记录

//学生用户id
var userid=getCookie("userid")


var pageNum=1
var pageSize=$("#pageSizeSel").val()

var search=location.search
var arr=search.split("&")
if(arr.length>1){
    pageNum1=arr[0]
    pageNum=pageNum1.split("=")[1]

    pageSize1=arr[1]
    pageSize=pageSize1.split("=")[1]


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
    location.href="/sybida/student/studentAudition.html?pageNum=1&pageSize="+pageSize
})




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
var userid=getCookie("userid")
function pageshoe(){
    $.getJSON({url:url+"/audition/selectpageStudentAudition",data:"pageSize="+pageSize+"&pageNum="+pageNum+"&userid="+userid,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data){
            if(data== -1000){
                location.href=logindexurl
            }else{
                let html = ''
                var le=data.data.list
                // console.log(data)
                // console.log(data.data.list)

                for(let i = 0; i < le.length; i++){
                    // if(!le[i].id){le[i].id=""}

                    var date1 = Date.parse(le[i].auditionTime)
                    date1 = new Date(date1)
                    var date2 = Date.parse(le[i].auditionAlterTime)
                    date2 = new Date(date2)
                    if (i%2==0){
                        html +=`<tr class="warning"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${le[i].auditionId}"></td>
                                <td>${le[i].auditionFirm}</td>
                                <td>${le[i].auditionSite}</td>
                                <td>${date1.pattern("yyyy-MM-dd HH:mm:ss")}</td>
                                <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
            
                                <td><button class="layui-btn layui-btn-xs" lay-event="edit" 
                                   date-auditionId ="${le[i].auditionId}" >查看详情</button></td>
                                   <!--changeinterview()-->
                                <td>

                                <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"

                                   data-id="${le[i].auditionId}" data-name="${le[i].auditionFirm}" data-target="#exampleModal" >删除</a></td>
                            </tr>`
                     }else{
                        html +=` <tr class="info"><td style="width: 80px;"><input type="checkbox" name="optionAll" value="${le[i].auditionId}"></td>
                                <td>${le[i].auditionFirm}</td>
                                <td>${le[i].auditionSite}</td>
                                <td>${date1.pattern("yyyy-MM-dd HH:mm:ss")}</td>
                                <td>${date2.pattern("yyyy-MM-dd HH:mm:ss")}</td>
            
                                <td><button class="layui-btn layui-btn-xs" lay-event="edit" 
                                   date-auditionId ="${le[i].auditionId}">查看详情</button></td>
                                   <!--changeinterview()-->
                                <td> <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-toggle="modal"

                                   data-id="${le[i].auditionId}" data-name="${le[i].auditionFirm}" data-target="#exampleModal" >删除</a></td>
                           </td></tr>`
                    }
                }
                       html+=`<tr><td colspan="10"><button type="button" id="deleteBySelect" class="btn btn-danger">删除所有</button></td></tr>`
                                    $("table").append(html)


                                    changeinterview()
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



//分页
function pageSelect(data){
    var  html=``
    if(pageNum==1){

        html+=`<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    }else{
        html+=`<li><a href="/sybida/student/studentAudition.html?pageNum=${pageNum-1}&pageSize=${pageSize}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for(var i=data.navigateFirstPage;i<=data.navigateLastPage;i++){
        if(pageNum==i){
            html+=`<li class="active"><a href="#">${i}</a></li>`
        }else{
            html+=`<li><a href="/sybida/student/studentAudition.html?pageNum=${i}&pageSize=${pageSize}">${i}</a></li>`
        }
    }
    if((data.pages)<=pageNum){
        html+=`<li class="disabled"><a href="#">&raquo;</a></li>`
    }else{
        var pa=parseInt(pageNum)+1
        html+=`<li><a href="/sybida/student/studentAudition.html?pageNum=${pa}&pageSize=${pageSize}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html+=`<li><button class="btn btn-primary" type="button">
        总页数： <span class="badge">${data.pages}</span>
        </button></li>`

    $("#pagination").append(html)
}

//面试登记
function register(){
    $("button").click(function (){
        var text = $(this).text() // 获取按钮之间的文本内容
        // console.log("========")
        if(text.trim()=='面试登记'){
            location.href="/sybida/student/studentAuditionRegister.html";

        }
    })
}



//查看详情
function changeinterview(){
    $("button").click(function (){
        var text = $(this).text() // 获取按钮之间的文本内容
        // console.log("========")
        if(text.trim()=='查看详情'){
            let id = $(this).attr("date-auditionId")
            location.href="/sybida/student/studentAuditionDetails.html?id=" + id;

        }
    })
}







//删除
var idtea
$('#exampleModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    idtea = button.data('id') // Extract info from data-* attributes
    var name = button.data('name') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('#messagetext').text('确认删除-' +name+'公司-的面试记录吗？')
})
$("#deleteOneSure").click(function (){

    $.post({url:url+"/audition/deleteStudentAudition",data:"deleteAuditionId="+idtea,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
                if(data.code==1){
                    location.href="/sybida/student/studentAudition.html?pageNum=1&pageSize="+pageSize
                }else{
                    layer.alert("删除失败");
                }
            }
    }},"json")
})



























