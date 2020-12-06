// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
var id = arr[1]

var classNum
// 获取英雄信息并填充到页面输入框中

// 获取员工的信息 ，已知什么条件
$.getJSON("/web06/classInfo","action=selectempbyid&id=" + id,function (data) {
    // 根据返回的数据在页面上进行展示
    if(data.code == 1) {
        $("#classId").val(data.data.classId)
        $("#className").val(data.data.classNum)
        $("#teachName").val(data.data.classTeachId)
        $("#managerName").val(data.data.classManagerId)
        $("#classStudy").val(data.data.classStudyId)
        $("#classTime").val(data.data.classTime)
        $("#classIsGraduate").val(data.data.classIsGraduate)
        $("#alterClass").val(data.data.classAlterTime)
    }
})





// 默认名称存在
var isExist = false;
// $("#heroname")
$("[name='classNum']").blur(function () {
    // let 用于声明局部变量
    if(!judgeSpace($(this), 0)){
        return
    }
    // 修改：判断是否是原来的名称，如果是就不进行重复查询判断
    if(classNum == $(this).val()){
        isExist = false
        return
    }


    $.ajax({
        url:"/web06/classInfo",
        data:"classNum=" + $(this).val() + "&action=selectbyclassNum",
        type:"get",
        dataType:"json",
        success:function (data) { // data 用于接收服务器write回写的数据
            // {code:0,message:"d",data:[{id:0,name:"加里奥"}]}
            console.log(data.code)
            // console.log(data.data[0].id)

            if(data.code == 0){
                isExist = true; // 存在
                // 已存在
                $(".tip").eq(0).html("名称重复，请重写")
            } else {
                $(".tip").eq(0).html("")
                isExist = false; // 不存在
            }
        }
    })
})








$("#teachName").blur(function (){
    judgeSpace($(this),1)
})

$("#managerName").blur(function (){
    judgeSpace($(this),2)
})
$("#classStudy").blur(function (){
    judgeSpace($(this),3)
})
$("#classTime").blur(function (){
    judgeSpace($(this),4)
})
$("#classIsGraduate").blur(function (){
    judgeSpace($(this),5)
})
$("#alterClass").blur(function (){
    judgeSpace($(this),6)
})


function judgeSpace(obj, index){
    let inputValue = obj.val()
    if(!inputValue || !(inputValue.trim())){
        $(".tip").eq(index).html("请填写信息")
        return false
    } else {
        $(".tip").eq(index).html("")
        return true
    }
}


function judgeAll() {
    if(isExist){
        return false
    }

    if(judgeSpace($("#className"),0) && judgeSpace($("#teachName"),1) &&
        judgeSpace($("#managerName"),2) && judgeSpace($("#classStudy"),3)
        && judgeSpace($("#classTime"),4) && judgeSpace($("#classIsGraduate"),5)
        && judgeSpace($("#alterClass"),6)){
        return true
    }
    return false
}
