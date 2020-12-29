var classId=-1
var layer
layui.use('layer', function(){
    layer = layui.layer;
});
var userid=getCookie("userid")
var search = location.search
if(!search){}else{
    var arr1 = search.split("?")
    var arr = arr1[1].split("=")
    if(arr[0]=="classId"){
        classId=arr[1]
    }
}

$("#selectButt").click(function () {
    location.href = "/sybida/publicTool/totalforstudent.html?classId="+classId
})
//根据权限查询班级
$.getJSON({
    url: url+"/classInfo/selectteachermuticlass",
    data:"userId="+userid,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success: function(data) {
        if(data== -1000){
            location.href=logindexurl
        }
        else{
            var html = ``
            for (let i = 0; i < data.data.length; i++) {
                html += `<option value="${data.data[i].classId}">${data.data[i].classNum}</option>`
            }
            $('#classNum').append(html);
            if (classId==-1){
                var selectA1 = $('#classNum').find("option"); //从A1下拉框中 搜索值
                classId=$(selectA1[0]).val()
                $('#classNum').change(function () {
                    classId = $('#classNum').val()
                })
            }
            else{
                var selectA1 = $('#classNum').find("option"); //从A1下拉框中 搜索值
                for (var i = 0; i < selectA1.length; i++) {
                    var t=$(selectA1[i]).val()
                    if(t==classId){
                        $(selectA1[i]).attr("selected", "selected")
                    }
                }
                $('#classNum').change(function () {
                    classId = $('#classNum').val()
                })
            }
        }

        showtotal()





    }
});

function showtotal() {
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#test'
            ,url:url+'/dototal/countstudentmessage?classId='+classId
            // ,parseData:function (res) {
            //     return{
            //         "code":0
            //         ,"msg":""
            //         ,"count":1000
            //         ,"data":res
            //     }
            // }
            ,toolbar: '#toolbarDemo'
            ,title: '学生信息统计表'
            ,totalRow: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left' ,sort: true, }
                ,{field:'num', title:'序号', width:'8%', fixed: 'left', unresize: true, sort: true, totalRowText: '合计'}
                ,{field:'studentName', title:'姓名', width:'10%', edit: 'text'}

                // ,{field:'studentNull1', title:'学生级别', width:'10%', fixed: 'left', unresize: true, sort: true, totalRowText: '合计'}
                // ,{field:'email', title:'邮箱', width:150, edit: 'text', templet: function(res){
                //         return '<em>'+ res.email +'</em>'
                //     }}
                ,{field:'studentNull1', title:'学生级别', width:'10%', sort: true, totalRow: true}
                ,{field:'offerNum', title:'Offer个数', width:'11%', sort: true, totalRow: true}
                ,{field:'auditionNum', title:'面试次数', width:'11%', sort: true, totalRow: true}
                ,{field:'haveJob', title:'是否就业', width:'11%', sort: true, totalRow: true}
                ,{field:'uploadNum', title:'上传简历次数', width:'15%', sort: true, totalRow: true}
                ,{field:'nullOne', title:'可投递简历数', width:'15%', sort: true, totalRow: true}

                // ,{field:'haveJob', title:'是否就业', width:80, sort: true, totalRow: true}
                // ,{field:'sex', title:'性别', width:80, edit: 'text', sort: true}
                // ,{field:'logins', title:'登入次数', width:100, sort: true, totalRow: true}
                // ,{field:'sign', title:'签名'}
                // ,{field:'city', title:'城市', width:100}
                // ,{field:'ip', title:'IP', width:120}
                // ,{field:'joinTime', title:'加入时间', width:120}
            ]]
            // ,page: true
        });

        //工具栏事件
        table.on('toolbar(test)', function(obj){
            var checkStatus = table.checkStatus(obj.config.id);
            switch(obj.event){
                case 'getCheckData':
                    var data = checkStatus.data;
                    let mydata=""
                    for (let i = 0; i < data.length; i++) {
                        mydata+=data[i].studentName+','
                    }
                    // var data1=data[0].studentName
                    layer.alert(mydata);
                    break;
                case 'getCheckLength':
                    var data = checkStatus.data;

                    layer.msg('选中了：'+ data.length + ' 个');
                    break;
                case 'isAll':
                    layer.msg(checkStatus.isAll ? '全选': '未全选')
                    break;
            };
        });
    });

}













