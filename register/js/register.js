var selectClass=-1
var selectStudy=-1
var selectTeacher=-1
//  <td>${list[i].classNum}</td>
//web06/teacher/selectStudy.do
$.getJSON(url+"/register/selectClass",function (data) {
    let html = ''
    for (let i = 0; i < data.length; i++) {
        console.log("+++++++++++++++++"+data[i].classId);
        html += `<option value="${data[i].classId}">${data[i].classNum}</option>`
    }
    $('select[name="selectClass"]').append(html);

    var selectA1 = $('select[name="selectClass"]').find("option"); //从A1下拉框中 搜索值
    for(var i=0;i<selectA1.length;i++){
        var t=$(selectA1[i]).val()

        if(t==selectClass){
            $(selectA1[i]).attr("selected","selected")
        }

    }
    //change事件
    $('select[name="selectClass"]').change(
        function (){
            selectClass=$('select[name="selectClass"]').val()
        }
    )
});

$.getJSON(url+"/register/selectStudy",function (data) {
    let html = ''
    for (let i = 0; i < data.length; i++) {
        console.log("+++++++++++++++++"+data[i].studyAspect);
        html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
    }
    $('select[name="selectStudy"]').append(html)

    var selectA1 = $('select[name="selectStudy"]').find("option"); //从A1下拉框中 搜索值
    for(var i=0;i<selectA1.length;i++){
        var t=$(selectA1[i]).val()

        if(t==selectStudy){
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


$.getJSON(url+"/register/selectTeacher",function (data) {
    let html = ''
    for (let i = 0; i < data.length; i++) {
        console.log("+++++++++++++++++"+data[i].teachName);
        html += `<option value="${data[i].teachId}">${data[i].teachName}</option>`
    }
    $('select[name="selectTeacher"]').append(html)

    var selectA1 = $('select[name="selectTeacher"]').find("option"); //从A1下拉框中 搜索值
    for(var i=0;i<selectA1.length;i++){
        var t=$(selectA1[i]).val()

        if(t==selectTeacher){
            $(selectA1[i]).attr("selected","selected")
        }
    }
    //change事件
    $('select[name="selectTeacher"]').change(
        function (){
            selectTeacher=$('select[name="selectTeacher"]').val()
        }
    )
});

// $("[type='button']").click(function () {
//     let formData = new FormData();
//     formData.append("excel", $('[type="file"]')[0].files[0]);
//     formData.append('selectClass',selectClass);
//     formData.append('selectStudy',selectStudy);
//     formData.append('selectTeacher',selectTeacher);
//     $.ajax({
//         url:url+"/register/insertTable",
//         type : 'post',
//         data : formData,
//         cache: false,   //上传文件无需缓存
//         processData: false,   // 用于对参数进行序列化处理，这里必须设为false
//         contentType:false,
//         dataType:"json",
//         success:function (data) {
//             if(data.code == 1) {
//                 location.reload()
//             } else if(data.code == 2){
//                 alert("修改失败")
//             }
//         },
//         error:function (xhr, textStatus, errorThrown) {
//             console.log('error',textStatus)
//         }
//     })
// });


