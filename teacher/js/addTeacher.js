var userid=getCookie("userid")
// $.getJSON({
//     url:url+"/teacher/selectStudy",
//     beforeSend: function(request) {
//         request.setRequestHeader("token", userid);
//     },
//     success:function (data) {
//         if(data== -1000){
//             location.href=logindexurl
//         }else {
//             let html = ''
//             for (let i =0; i <4; i++){
//                 html+=``
//             }
//             $("#jobselect").append(html)
//
//         }
//     }});
layui.use('layer', function(){
    var layer = layui.layer;
});

function judge(){
    let phone=$("#userphone").val()
    if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone))) {
        $("#phonewarn").text("手机号不合法哦！")
        return false
    }else {
        $.ajax({
            type: "post",
            url: url + "/registerteacher/redistteachercheckphone",
            data: "phone="+phone,
            beforeSend: function(request) {
                request.setRequestHeader("token", userid);
            },
            success: function (data) {
                if (data == -1000) {
                    location.href = logindexurl
                }else {

                    if(data.code==0){
                        $("#phonewarn").text("")

                    }else{
                        $("#phonewarn").text("手机号已存在")

                    }
                }
            },
            error:function () {
                alert("网络出错，请重试！！");
            }
        });
    }
}
$("#userphone").blur(function () {
    judge()
})



$("#redisterall").click(function () {
    var  phone= $("#userphone").val()
    var  name= $("#username").val()
    var studyid = $("#jobselect").val()
    if(!name){layer.msg("姓名不能为空", {icon: 4,time:800});}
    else{
        if (!(/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone))) {

            layer.msg("手机号不合法哦，请重新填写！", {icon: 4,time:800});

        }else {
            $.ajax({
                type: "post",
                url: url + "/registerteacher/redistteachercheckphone",
                data: "phone="+phone,
                beforeSend: function(request) {
                    request.setRequestHeader("token", userid);
                },
                success: function (data) {
                    if (data == -1000) {
                        location.href = logindexurl
                    }else {
                        if(data.code==0){
                            $.ajax({
                                type: "post",
                                url: url + "/registerteacher/insertteacher",
                                data: "name="+name+"&phone="+phone+"&studyId="+studyid,
                                beforeSend: function(request) {
                                    request.setRequestHeader("token", userid);
                                },
                                success: function (data) {
                                    if (data == -1000) {
                                        location.href = logindexurl
                                    }else {
                                        if(data.code==1){
                                            layer.alert("注册成功",{icon: 4},function () {
                                                location.reload();
                                            });
                                        }
                                        else{
                                            layer.alert("注册失败，请重试，请重试！！");
                                        }
                                    }
                                },
                                error:function () {
                                    layer.alert("注册出错，请重试！！");
                                }
                            });
                        }else{
                            layer.msg("手机号已存在，请重新填写！！", {icon: 4,time:800});
                        }
                    }
                },
                error:function () {
                    layer.alert("网络出错，请重试！！");
                }
            });
        }
    }

})









