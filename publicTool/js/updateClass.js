// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
if(arr.length>1) {
    var id = arr[1]
}
var classNum
// 获取英雄信息并填充到页面输入框中

// 获取员工的信息 ，已知什么条件
$.getJSON(url+"/classInfo/showOneClass?classId="+id,function (data) {
    if (!data.data.classNum) {
        data.data.classNum="未完善"
    }
    if (!data.data.classTeachId) {
        data.data.classTeachId="未完善"
    }
    if (!data.data.classManagerId) {
        data.data.classManagerId="未完善"
    }
    if (!data.data.classStudyId) {
        data.data.classStudyId="未完善"
    }
    if (!data.data.classTime) {
        data.data.classTime="未完善"
    }
    if (!data.data.classIsGraduate) {
        data.data.classIsGraduate="未完善"
    }
    if (!data.data.classAlterTime) {
        data.data.classAlterTime="未完善"
    }
    // 根据返回的数据在页面上进行展示
    if(data.code == 1) {
        if (data.data.classIsGraduate==1) {
            data.data.classIsGraduate ="否"
        }
        $("#classId").val(data.data.classId)
        $("#className").val(data.data.classNum)

        var date = Date.parse(data.data.classTime)
        date = new Date(date)
        $("#classTime").val(date.pattern("yyyy-MM-dd"))

        $("#classIsGraduate").val(data.data.classIsGraduate)
        var date = Date.parse(data.data.classAlterTime)
        date = new Date(date)
        $("#alterClass").val(date.pattern("yyyy-MM-dd"))
    }
    var classTeachId=data.data.classTeachId
    // $.getJSON(url+"/classInfo/selectTeacherName?classTeachId="+classTeachId,function (data) {
    //     $("#teachName").val(data.data.teachName)
    // });
    $.getJSON(url+"/register/selectTeacher",function (data) {
        let html = ''
        for (let i = 4; i < data.length; i++) {
            html += `<option value="${data[i].teachId}">${data[i].teachName}</option>`
        }
        $('select[name="teachName"]').append(html)

        var selectA1 = $('select[name="teachName"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()

            if(t==classTeachId){
                $(selectA1[i]).attr("selected","selected")
            }
        }
        //change事件
        $('select[name="selectStudy"]').change(
            function (){
                selectStudy=$('select[name="selectStudy"]').val()
            }
        )
    });

    var classManagerId=data.data.classManagerId
    $.getJSON(url+"/register/selectTeacher",function (data) {
        let html = ''
        for (let i = 4; i < data.length; i++) {
            html += `<option value="${data[i].teachId}">${data[i].teachName}</option>`
        }
        $('select[name="managerName"]').append(html)

        var selectA1 = $('select[name="managerName"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()
            console.log(classManagerId+"ppppppppppppppppppppppppppppp")
            console.log(t+"qqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
            if(t==classManagerId){
                $(selectA1[i]).attr("selected","selected")
            }
        }
        //change事件
        $('select[name="selectStudy"]').change(
            function (){
                selectStudy=$('select[name="selectStudy"]').val()
            }
        )
    });




    // $.getJSON(url+"/classInfo/selectManagerName?classManagerId="+classManagerId,function (data) {
    //     $("#managerName").val(data.data.teachName)
    // });
    var classStudyId=data.data.classStudyId
    $.getJSON(url+"/register/selectStudy",function (data) {
        let html = ''
        for (let i = 4; i < data.length; i++) {
            html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
        }
        $('select[name="selectStudy"]').append(html)

        var selectA1 = $('select[name="selectStudy"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()
            console.log(classStudyId+"==============================")
            console.log(t+"-------------------------")
            if(t==classStudyId){
                $(selectA1[i]).attr("selected","selected")
            }
        }
 })
});
//这样合理吗///////////////////////////////////////////////////////////////////

// $.getJSON(url+"/register/selectStudy",function (data) {
//     let html = ''
//     for (let i = 4; i < data.length; i++) {
//         html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
//     }
//     $('select[name="selectStudy"]').append(html)
//
//     var selectA1 = $('select[name="selectStudy"]').find("option"); //从A1下拉框中 搜索值
//     for(var i=0;i<selectA1.length;i++){
//         var t=$(selectA1[i]).val()
//
//         if(t==classStudyId){
//             $(selectA1[i]).attr("selected","selected")
//         }
//     }
//     //change事件
//     $('select[name="selectStudy"]').change(
//         function (){
//             selectStudy=$('select[name="selectStudy"]').val()
//         }
//     )
// });

// $.getJSON(url+"/register/selectTeacher",function (data) {
//     let html = ''
//     for (let i = 4; i < data.length; i++) {
//         html += `<option value="${data[i].teachId}">${data[i].teachName}</option>`
//     }
//     $('select[name="managerName"]').append(html)
//
//     var selectA1 = $('select[name="managerName"]').find("option"); //从A1下拉框中 搜索值
//     for(var i=0;i<selectA1.length;i++){
//         var t=$(selectA1[i]).val()
//
//         if(t==selectStudy){
//             $(selectA1[i]).attr("selected","selected")
//         }
//     }
//     //change事件
//     $('select[name="selectStudy"]').change(
//         function (){
//             selectStudy=$('select[name="selectStudy"]').val()
//         }
//     )
// });


// 默认名称存在
var isExist = false;
// $("#heroname")
$("input[name='classNum']").blur(function () {
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
