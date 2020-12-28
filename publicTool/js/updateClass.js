// 获取从前一个页面传递过来的参数
var search = window.location.search
var arr = search.split("=")
if(arr.length>1) {
    var id = arr[1]
}
var classNum
// 获取英雄信息并填充到页面输入框中
var userid=getCookie("userid")
// 获取员工的信息 ，已知什么条件
$.getJSON({
    url:url+"/classInfo/showOneClass?classId="+id,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }
        else{
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
    }
    if (!data.data.classAlterTime) {
        data.data.classAlterTime="未完善"
    }
    // 根据返回的数据在页面上进行展示
    if(data.code == 1) {
        if (data.data.classIsGraduate==1){
            var selectA1 = $('select[name="classIsGraduate"]').find("option"); //从A1下拉框中 搜索值
            for(var i=0;i<selectA1.length;i++){
                var t=$(selectA1[i]).val()
                if(t==1){
                    $(selectA1[i]).attr("selected","selected")
                }
            }
         }
        }else if (data.data.code == 0) {
            var selectA1 = $('select[name="classIsGraduate"]').find("option"); //从A1下拉框中 搜索值
            for(var i=0;i<selectA1.length;i++){
                var t=$(selectA1[i]).val()
                if(t==0){
                    $(selectA1[i]).attr("selected","selected")
                }
            }
        }




        $("#classId").val(data.data.classId)
        $("#className").val(data.data.classNum)

        var date = Date.parse(data.data.classTime)
        date = new Date(date)
        $("#classTime").val(date.pattern("yyyy-MM-dd HH:mm:ss"))

        $("#classIsGraduate").val(data.data.classIsGraduate)
        // var date = Date.parse(data.data.classAlterTime)
        // date = new Date(date)
        // $("#alterClass").val(date.pattern("yyyy-MM-dd HH:mm:ss"))

    var classTeachId=data.data.classTeachId

    $.getJSON({
       url: url+"/classInfo/selectTeacher",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }
            else{
        let html = ''
        for (let i = 0; i < data.data.length; i++) {
            html += `<option value="${data.data[i].teachId}">${data.data[i].teachName}</option>`
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
    }}});

    var classManagerId=data.data.classManagerId
    $.getJSON({
        url:url+"/classInfo/selectTeacher",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }
            else{
        let html = ''
        for (let i = 0; i < data.data.length; i++) {
            html += `<option value="${data.data[i].teachId}">${data.data[i].teachName}</option>`
        }
        $('select[name="managerName"]').append(html)

        var selectA1 = $('select[name="managerName"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()
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
    }}});



    var classStudyId=data.data.classStudyId
    $.getJSON({
        url:url+"/register/selectStudy",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }
            else{
        let html = ''
        for (let i = 4; i < data.length; i++) {
            html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
        }
        $('select[name="selectStudy"]').append(html)
        var selectA1 = $('select[name="selectStudy"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()
            if(t==classStudyId){
                $(selectA1[i]).attr("selected","selected")
            }
        }
    }}})
}}})

var classIsGraduate=$("#classIsGraduate").val();
var layer
layui.use('layer', function(){
    layer = layui.layer;
});
$("#btnsave").click(function () {
    let formData = new FormData();
    formData.append('classId',$("#classId").val());
    formData.append('classNum',$("#className").val());
    formData.append('classTeachId',$("#teachName").val());
    formData.append('classManagerId',$("#managerName").val());
    formData.append('classStudyId',$("#classStudy").val());
    formData.append('classTime',$("#classTime").val());
    formData.append('classNull1',classIsGraduate);
    $.ajax({
        url:url+"/classInfo/updateclassinfo",
        type : 'post',
        data : formData,
        cache: false,   //上传文件无需缓存
        processData: false,   // 用于对参数进行序列化处理，这里必须设为false
        contentType:false,
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if(data== -1000){
                location.href=logindexurl
            }else{
            if(data.code == 1) {
                layer.alert('修改成功！', {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }
                );
            }
        }}
    })
});





