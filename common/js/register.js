var selectClass=-1
var selectStudy=-1
var selectTeacher=-1

$.getJSON(url+"/register/selectClass",function (data) {
    let html = ''
    for (let i = 0; i < data.length; i++) {
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
    for (let i = 4; i < data.length; i++) {
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

$("[type='button']").click(function () {
    // $("#btnSendCode1").value();
    let formData = new FormData();
    formData.append("file", $('[type="file"]')[0].files[0]);
    formData.append('classCreate',$("#classCreate").val());
    formData.append('insetManager',$("#insetManagerId").val());
    formData.append('selectStudy',selectStudy);
    formData.append('selectTeacher',selectTeacher);
    $.ajax({
        url:url+"/register/registerstudent",
        type : 'post',
        data : formData,
        cache: false,   //上传文件无需缓存
        processData: false,   // 用于对参数进行序列化处理，这里必须设为false
        contentType:false,
        dataType:"json",
        success:function (data) {
            if(data.code == 666) {
                layer.alert('插入成功！', {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }
                );
            }else if (data.code==100000){
                layer.alert(data.message, {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }
                );

            }else if (data.code==-1){
                layer.alert("插入失败,"+ data.message+"，或者其他问题", {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }
                );
            }
                else {
                layer.alert("插入失败,第"+data.code+"条班里已存在，或者其他问题", {
                        skin: 'layui-layer-molv' //样式类名
                        ,closeBtn: 0
                    }
                );
            }
        }
    })
});



