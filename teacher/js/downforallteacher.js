var pageNum = 1
var pageSize = $("#pageSizeSel").val()
var userid=getCookie("userid")
var classId=-1
var search = location.search
var arr = search.split("&")
if (arr.length > 1) {
    pageNum1 = arr[0]
    pageNum = pageNum1.split("=")[1]

    pageSize1 = arr[1]
    pageSize = pageSize1.split("=")[1]

    teacherStudy1=arr[2]
    classId=teacherStudy1.split("=")[1]

}
var selectA2 = $("#pageSizeSel").find("option"); //从A1下拉框中 搜索值
for (var i = 0; i < selectA2.length; i++) {
    var t = $(selectA2[i]).val()
    if (t == pageSize) {
        $(selectA2[i]).attr("selected", "selected")
    }

}

//每页条数的change事件
$('#pageSizeSel').change(
    function () {
        pageSize = $("#pageSizeSel").val()
    }
)//每页条数的change事件
$.getJSON({
    url: url+"/classInfo/selectallclass",
    data:"userId="+userid,
    beforeSend: function(request) {
        request.setRequestHeader("token", userid);
    },
    success: function(data) {
        if(data== -1000){
            location.href=logindexurl
        }else{
            if (classId==-1){
                var html = ``
                for (let i = 0; i < data.data.length; i++) {
                    html += `<option value="${data.data[i].classId}">${data.data[i].classNum}</option>`
                }
                $('#classNum').append(html);
                var selectA1 = $('#classNum').find("option"); //从A1下拉框中 搜索值
                classId=$(selectA1[0]).val()
                //change事件
                $('#classNum').change(function () {
                        classId = $('#classNum').val()
                    }
                )
            }else{
                var html = ``
                for (let i = 0; i < data.data.length; i++) {
                    html += `<option value="${data.data[i].classId}">${data.data[i].classNum}</option>`
                }
                $('#classNum').append(html);
                var selectA1 = $('#classNum').find("option"); //从A1下拉框中 搜索值
                for (var i = 0; i < selectA1.length; i++) {
                    var t=$(selectA1[i]).val()
                    if(t==classId){
                        $(selectA1[i]).attr("selected", "selected")
                    }
                }
                //change事件
                $('#classNum').change(function () {
                        classId = $('#classNum').val()
                    }
                )
            }
        }
        showtotal();
    }
});
$("#selectButt").click(function () {
    location.href = "/sybida/teacher/downforallteacher.html?pageNum=1&pageSize=" + pageSize+"&classId="+classId
})

//全选全不选
$("#checkAll").click(function () {
    //当全选按钮是选中状态
    if ($(this).is(':checked')) {
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function () {
            //将checkbox状态改为选中
            $(this).prop("checked", true);
        });
    } else {

        $('input[name="optionAll"]').each(function () {
            $(this).prop("checked", false);
        });
    }
});

$(".qwer").click(function () {
    //当全选按钮是选中状态
    if ($(this).is(':checked')) {
        //循环下面所有checkbox
        $('input[name="optionAll"]').each(function () {
            //将checkbox状态改为选中
            $(this).prop("checked", true);
        });
    } else {

        $('input[name="optionAll"]').each(function () {
            $(this).prop("checked", false);
        });
    }
});


function showtotal() {
    layui.use('table', function(){
        var table = layui.table;
        table.render({
            elem: '#test'
            ,url:url+'/teacher/selectallvitaeforallteacher?classId='+classId
            ,toolbar: '#toolbarDemo'
            ,title: '学生信息统计表'
            ,totalRow: true
            ,cols: [[
                {type: 'checkbox', fixed: 'left' ,sort: true, }
                ,{field:'studentName', title:'姓名', width:'10%', edit: 'text'}
                ,{field:'studentNull1', title:'学生级别', width:'10%',sort: true, totalRow: true}
                ,{field:'studyAspect', title:'简历方向', width:'10%', sort: true, totalRow: true}
                ,{field:'vitaeLevel', title:'可投递', width:'11%',templet:'#typeTp2',sort: true, totalRow: true}
                ,{field:'vitaeIsRead', title:'是否审阅', width:'11%', templet:'#typeTpl',sort: true, totalRow: true}
                ,{field:'studentPhone', title:'电话号码', width:'13%', totalRow: true}
                ,{field:'vitaeAlterTime', title:'修改时间', width:'18%',sort: true, totalRow: true, templet:'<div>{{ layui.util.toDateString(d.pressTime, "yyyy-MM-dd HH:mm:ss") }}</div>'}
            ]] , done: function(res, curr, count){

            }
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
                case 'downzip':
                    var ziip=new Array();
                    var k=0
                    var data = checkStatus.data;
                    for (let i = 0; i < data.length; i++) {
                        ziip[k++]=data[i].vitaeUrl+"="+data[i].studentName+"-"+data[i].studyAspect+"工程师-"+data[i].studentPhone
                    }

                    downzip(ziip)
                    break;
                case 'downzipcode':
                    var s=new Array();
                    var j=0
                    var data = checkStatus.data;
                    for (let i = 0; i < data.length; i++) {
                        s[j++]=data[i].vitaeUrl+"="+data[i].studentName+"-"+data[i].studyAspect+"工程师-"+data[i].studentPhone
                    }
                    downzipcode(s)
                    break;
            };
        });
      function  downzip(s){
            if(s.length>0){
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                $.post({
                    url:url+"/teacherdownload/downloadvitaezip",
                    // 告知传递参数类型为json，不可缺少
                    contentType:"application/json",
                    data:JSON.stringify(s),
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userid);
                    },
                    success:function(data){
                        if(data== -1000){
                            location.href=logindexurl
                        }else {
                            layer.close(index);
                            downloadfile(Qnyurl + data, "学生简历")
                        }
                    }
                })}else{
                layer.alert("所选数据为空！");
            }
        }
       function downzipcode(s) {
            if(s.length>0){
                var index = layer.load(1, {
                    shade: [0.1,'#fff'] //0.1透明度的白色背景
                });
                $.post({
                    url:url+"/teacherdownload/downloadvitaezip",
                    // 告知传递参数类型为json，不可缺少
                    contentType:"application/json",
                    data:JSON.stringify(s),
                    beforeSend: function(request) {
                        request.setRequestHeader("token", userid);
                    },
                    success:function(data){
                        if(data== -1000){
                            location.href=logindexurl
                        }else{
                            layer.close(index);
                            layer.open({
                                type: 2,
                                title:"扫描该二维码即可保存Zip简历",
                                closeBtn: 1, //不显示关闭按钮
                                shade: [0],
                                area: ['540px', '600px'],
                                anim: 2,
                                content: ['/sybida/common/ercode/index.html?key='+data, 'no'], //iframe的url，no代表不显示滚动条

                            });
                            // downloadfile(Qnyurl+data,"学生简历")
                        }}
                })}else{
                layer.alert("所选数据为空！");
            }
        }
    });


}
function pageSelect(data) {
    var html = ``
    if (pageNum == 1) {

        html += `<li class="disabled"><a href="#" aria-label="Previous">&laquo;</a></li>`
    } else {
        html += `<li><a href="/sybida/teacher/downforallteacher.html?pageNum=${pageNum - 1}&pageSize=${pageSize}&classId=${classId}" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>`
    }
    for (var i = data.navigateFirstPage; i <= data.navigateLastPage; i++) {
        if (pageNum == i) {
            html += `<li class="active"><a href="#">${i}</a></li>`
        } else {
            html += `<li><a href="/sybida/teacher/downforallteacher.html?pageNum=${i}&pageSize=${pageSize}&classId=${classId}">${i}</a></li>`
        }
    }
    if ((data.pages) <= pageNum) {
        html += `<li class="disabled"><a href="#">&raquo;</a></li>`
    } else {
        var pa = parseInt(pageNum) + 1
        html += `<li><a href="/sybida/teacher/downforallteacher.html?pageNum=${pa}&pageSize=${pageSize}&classId=${classId}" aria-label="Next"> <span aria-hidden="true">&raquo;</span></a></li>`
    }
    html += `<span style="font-family: '微软雅黑';font-size: 15px;margin-left:200px;padding-top: 10px;line-height: 40px">共&nbsp;${data.pages}&nbsp;页</span>`
    $("#pagination").append(html)

}


function updateVitaeLevel(vitaeId, userid, name,vitaeurl) {
    $(".updateLevel").css('display', '')
    $("#vitaeID").val(vitaeId)
    $("#vitaeEvaluateUserId").val(userid)
    $("#vitaeEvaluateUserName").val(name)
    $("#iframe3").attr("src",Qnyurl+vitaeurl)
    var userid2=getCookie("userid")
    $.post({
        url:url+"/teacherdownload/selectevaforvitae",
        // 告知传递参数类型为json，不可缺少
        // contentType:"application/json",
        data:"vitaeId="+vitaeId,
        beforeSend: function(request) {
            request.setRequestHeader("token", userid2);
        },
        success:function(data){
            if(data== -1000){
                location.href=logindexurl
            }else {

                if(data.code==1){
                    $("#vitaeEvaluateComment").val(data.data)
                }

            }
        }
    })

}



function downloadVitae(downloadUrl, name, aspect) {
    var res = name.concat("+", aspect)
    downloadfile(Qnyurl+downloadUrl,res)

}

$("#vitaeEvaluateComment").blur(function () {
    judgeSpace($(this), 0)
})

$("#vitaeEvaluatePicture").blur(function () {
    judgeSpace($(this), 1)
})

function judgeSpace(obj, index) {
    let inputValue = obj.val()
    if (!inputValue || !(inputValue.trim())) {
        $(".tips").eq(index).html("请填写信息")
        return false
    } else {
        $(".tips").eq(index).html("")
        return true
    }
}

function judgeAll() {
    if (judgeSpace($("#vitaeEvaluateComment"), 0) ) {
        return true
    }
}



////文件下载重命名
function getBlob(downloadUrl) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', downloadUrl, true);
        xhr.responseType = 'blob';
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            }
        };

        xhr.send();
    });
}

/**
 * 保存
 * @param  {Blob} blob
 * @param  {String} filename 想要保存的文件名称
 */
function saveAs(blob, filename) {
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {
        const link = document.createElement('a');
        const body = document.querySelector('body');

        link.href = window.URL.createObjectURL(blob);
        link.download = filename;

        // fix Firefox
        link.style.display = 'none';
        body.appendChild(link);

        link.click();
        body.removeChild(link);

        window.URL.revokeObjectURL(link.href);
    }
}

/**
 * 下载
 * @param  {String} url 目标文件地址
 * @param  {String} filename 想要保存的文件名称
 */
function downloadfile(downloadUrl, filename) {
    getBlob(downloadUrl).then(blob => {
        saveAs(blob, filename);
    });
}

