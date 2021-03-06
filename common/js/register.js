var selectClass=-1
var selectStudy=-1
var selectTeacher=-1
var userid=getCookie("userid")
// $.getJSON({url:url+"/register/selectClass",
//     beforeSend: function(request) {
//         request.setRequestHeader("token", userid);
//     },
//     success:function (data) {
//         if(data== -1000){
//             location.href=logindexurl
//         }else{
//     let html = ''
//     for (let i = 0; i < data.length; i++) {
//         html += `<option value="${data[i].classId}">${data[i].classNum}</option>`
//     }
//     $('select[name="selectClass"]').append(html);
//
//     var selectA1 = $('select[name="selectClass"]').find("option"); //从A1下拉框中 搜索值
//     for(var i=0;i<selectA1.length;i++){
//         var t=$(selectA1[i]).val()
//
//         if(t==selectClass){
//             $(selectA1[i]).attr("selected","selected")
//         }
//     }
//     //change事件
//     $('select[name="selectClass"]').change(
//         function (){
//             selectClass=$('select[name="selectClass"]').val()
//         }
//     )}
// }});

$.getJSON({
    url: url+"/register/selectStudy",
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else {
                let html = ''
                for (let i = 4; i < data.length; i++) {
                    html += `<option value="${data[i].studyId}">${data[i].studyAspect}</option>`
                }
                $('select[name="selectStudy"]').append(html)

                var selectA1 = $('select[name="selectStudy"]').find("option"); //从A1下拉框中 搜索值
                       if (selectStudy==-1){
                           $(selectA1[0]).attr("selected", "selected")
                           selectStudy = $('select[name="selectStudy"]').val()
                       }

                //change事件
                $('select[name="selectStudy"]').change(
                    function () {
                        selectStudy = $('select[name="selectStudy"]').val()
                    }
                )
            }
}});


$.getJSON({url:url+"/register/selectTeacher",
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else {

            let html = ''
            for (let i = 0; i < data.length; i++) {
                html += `<option value="${data[i].userId}">${data[i].userName}</option>`
            }
            $('select[name="selectTeacher"]').append(html)

            var selectA1 = $('select[name="selectTeacher"]').find("option"); //从A1下拉框中 搜索值
            if(selectTeacher==-1) {
                $(selectA1[0]).attr("selected", "selected")
                selectTeacher = $('select[name="selectTeacher"]').val()
            }

            //change事件
            $('select[name="selectTeacher"]').change(
                function () {
                    selectTeacher = $('select[name="selectTeacher"]').val()
                }
            )
        }
}});

function submitXML(){
    var fileInput = $('#reportXML').get(0).files[0];
    console.info(fileInput);
    if(fileInput){
        $("#reportXMLform").submit();
    }else{
        layer.alert('请选择上传文件！', {
                skin: 'layui-layer-molv' //样式类名
                , closeBtn: 0
            }
        );
        setTimeout(function () {
            window.location.reload();
        }, 3000);
    }
}

$("#sureregister").click(function () {
    var index = layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
    });
     let classname= $("#classCreate").val();
     if (!classname){
         layer.alert('班级名不为空！', {
                 skin: 'layui-layer-molv' //样式类名
                 , closeBtn: 0
             }
         );
         setTimeout(function () {
             window.location.reload();
         }, 3000);
         return false
     }
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
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data) {
            if (data == -1000) {
                location.href = logindexurl
            } else {
                layer.close(index);
                if (data.code == 666) {

                    layer.alert('插入成功！', {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0
                        }
                    );
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                } else if (data.code == 100000) {
                    //手机号码重复
                    layer.alert(data.message, {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0
                        }
                    );
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                } else if (data.code == -1) {
                    //Excel表有中重复的电话号码
                    layer.alert("插入失败," + data.message + "，或者其他问题", {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0
                        },function () {

                        }
                    );
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);

                } else if (data.code==99999) {
                    //数据库中存在
                    layer.alert(data.message+"已在数据库中", {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0,
                        }
                );
                        setTimeout(function () {
                            window.location.reload();
                        }, 3000);


                }else{
                    layer.alert("出现异常", {
                            skin: 'layui-layer-molv' //样式类名
                            , closeBtn: 0
                        }
                    );
                    setTimeout(function () {
                        window.location.reload();
                    }, 3000);
                }
            }
        }
    })
});

$("#templet").click(function () {
    downloadfile(Qnyurl+"muban.xlsx", "Excel模板")
})

