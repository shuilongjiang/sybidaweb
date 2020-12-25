var search = window.location.search
var arr = search.split("=")
if(arr.length>1) {
    var id = arr[1]
}
var userid=getCookie("userid")
$.getJSON({url:url+"studyInfo/showonestudy?studyId="+id,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success:function (data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
    if(data.code == 1) {
        $("#studyId").val(data.data.studyId)
        $("#studyAspect").val(data.data.studyAspect)
        $("#studyIntroduce").val(data.data.studyIntroduce)
        $("#userAuthority").val(data.data.userAuthority)

            if (data.data.userAuthority==0){
                var selectA1 = $('select[name="classIsGraduate"]').find("option"); //从A1下拉框中 搜索值
                for(var i=0;i<selectA1.length;i++){
                    var t=$(selectA1[i]).val()
                    if(t==0){
                        $(selectA1[i]).attr("selected","selected")
                    }
                }
            }
        }else if (data.data.userAuthority == 1) {
            var selectA1 = $('select[name="classIsGraduate"]').find("option"); //从A1下拉框中 搜索值
            for(var i=0;i<selectA1.length;i++){
                var t=$(selectA1[i]).val()
                if(t==1){
                    $(selectA1[i]).attr("selected","selected")
                }
            }
        }else if (data.data.userAuthority == 2) {
        var selectA1 = $('select[name="classIsGraduate"]').find("option"); //从A1下拉框中 搜索值
        for(var i=0;i<selectA1.length;i++){
            var t=$(selectA1[i]).val()
            if(t==2){
                $(selectA1[i]).attr("selected","selected")
            }
        }
    }
}}})

var layer
layui.use('layer', function(){
    layer = layui.layer;
});
$('#btnsave').click(function (){
    console.log($("#updateform").serialize())
    $.post({
        url:url+"/studyInfo/updatestudy",
        data:$("#updateform").serialize(),
        dataType:"json",
        beforeSend: function(request) {
            request.setRequestHeader("token", userid);
        },
        success:function (data){
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
})