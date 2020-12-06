console.log("+++")

var currPage =1
// 每页默认5条数据
var pageSize = 5
// 获取传递的参数  /showhero.html?currPage=2--?currPage=2
var search=location.search
// 按照=对参数分割
var arr = search.split("=")
// 第一次访问页面时，是没有传递参数的，只有在分页时才会传递参数
// 防止第一次出现问题
if(arr.length >1){
    currPage = arr[1]
}


$.getJSON(url+"/classInfo/selectPage","currPage="+currPage+"&pageSize="+pageSize,function (data){
     let html=''
    var list= data.data.list
    for (let i=0;i<list.length;i++){
    html+=`<tr><th scope="col"><input type="checkbox" class="chkall" name="optionAll"></th>
        <td>${list[i].classId}</td>
        <td>${list[i].classNum}</td>
        <td>${list[i].classTeachId}</td>
        <td>${list[i].classManagerId}</td>
        <td>${list[i].classStudyId}</td>
        <td>${list[i].classTime}</td>
        <td>${list[i].classIsGraduate}</td>
        <td>${list[i].classAlterTime}</td>
        <td style="width: 10%"><button type="button" class="btn btn-success" value="${list[i].classId}" >修改</button>
        <button type="button" class="btn btn-success" >删除</button></td></tr>`
    }
    $("table").append(html)

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
    generatePage(data.data.navigatepageNums, data.data.pageNum
        , data.data.pages)


    $("button").click(function (){
        var text=$(this).text()
        console.log("========="+text)
        if(text.trim()=='修改'){
            var  id =$(this).attr("value")
             location.href="/sybida/publicTool/updateClass.html?id="+id;
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



function generatePage(navigatepageNums, pageNum, pages){
 var html=''
console.log(pageNum==1)
if (pageNum==1){
html+=`<li class="disabled"><a href="#" aria-label="Previous> <span aria-hidden="true">&laquo;</span></a></li>`
}else{
html+=`<li><a href="/sybida/publicTool/classInfo.html?currPage=${pageNum-1}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
}
for (let i=0;i<navigatepageNums.length;i++){
    if (pageNum==navigatepageNums[i]){
        html+=`<li class="active"><a href="#">${navigatepageNums[i]}</a></li>`
    }else {
        html += `<li><a href="/sybida/publicTool/classInfo.html?currPage=${navigatepageNums[i]}">${navigatepageNums[i]}</a></li>`
    }
}
if (pageNum == pages){
  html+=`<li class="disabled"><a href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>`
}else{
    html += `<li><a href="/sybida/publicTool/classInfo.html?currPage=${pageNum+1}" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a></li>`
}

    $("ul").append(html)

}
